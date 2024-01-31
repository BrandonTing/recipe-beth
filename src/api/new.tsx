import { eq, inArray, like } from "drizzle-orm";
import Elysia, { t } from "elysia";
import {
    IngredientInput,
    IngredientUnitInput,
    ReferenceInput,
    StepInput,
} from "../components/form/inputs";
import { TagsInput } from "../components/form/tagsInput";
import { ctx } from "../context";
import { db } from "../db";
import {
    Ingredient,
    RecipeIngredient,
    Step,
    ingredients,
    recipeIngredients,
    recipeTags,
    recipes,
    steps,
    tags as tagsTable,
} from "../db/schema";
import { upload } from "../storage";

export const createNew = new Elysia({
    prefix: "/new",
})
    .use(ctx)
    .post(
        "/",
        async function ({
            body: {
                title,
                description,
                estimatedTime,
                ingredientAmount,
                ingredientName,
                ingredientUnit,
                stepTitle,
                stepDescription,
                tags,
                image,
            },
            set,
            log,
        }) {
            let newIngredientKinds: Ingredient[] = [];
            if (ingredientUnit) {
                if (!Array.isArray(ingredientName)) {
                    newIngredientKinds = [
                        {
                            name: ingredientName,
                            unit: ingredientUnit as string,
                        },
                    ];
                } else {
                    // get existing ingredients
                    const existingIngredientKinds =
                        await db.query.ingredients.findMany({
                            columns: {
                                name: true,
                            },
                            where: inArray(ingredients.name, ingredientName),
                        });

                    newIngredientKinds = ingredientName
                        .filter(
                            (name) =>
                                !existingIngredientKinds.find(
                                    (kind) => kind.name === name,
                                ),
                        )
                        .map((name, i) => {
                            const unit = (ingredientUnit as string[])[i];
                            if (!unit) return;
                            return {
                                name,
                                unit,
                            };
                        })
                        .filter(Boolean);
                }
            }
            const newRecipeIngredients: Omit<RecipeIngredient, "recipeID">[] =
                Array.isArray(ingredientName)
                    ? ingredientName.map((name, i) => {
                          return {
                              name,
                              amount: Number(
                                  (ingredientAmount as number[])[i]!,
                              ),
                          };
                      })
                    : [
                          {
                              name: ingredientName,
                              amount: Number(ingredientAmount),
                          },
                      ];
            const recipeSteps: Step[] = Array.isArray(stepTitle)
                ? stepTitle.map((title, i) => {
                      return {
                          title,
                          description: stepTitle[i]!,
                      };
                  })
                : [
                      {
                          title: stepTitle,
                          description: stepDescription as string,
                      },
                  ];

            try {
                const { error } = await upload(image);
                if (error) {
                    throw Error("Failed to create upload image");
                }

                if (newIngredientKinds.length) {
                    await db.insert(ingredients).values(newIngredientKinds);
                    log.info(
                        `added new ingredients: ${newIngredientKinds
                            .map((kind) => kind.name + ": " + kind.unit)
                            .join(", ")}`,
                    );
                }
                const tagList = tags.split(",").map((tag) => ({ label: tag }));
                if (tagList.length) {
                    await db
                        .insert(tagsTable)
                        .values(tagList)
                        .onConflictDoNothing();
                }
                const recipe = await db
                    .insert(recipes)
                    .values({
                        title,
                        description,
                        estimatedTime,
                        imageUrl: image.name,
                    })
                    .returning();
                const recipeID = recipe[0]!.id;
                log.info(`created new recipe ${title}, id: ${recipeID}`);
                await db.insert(recipeIngredients).values(
                    newRecipeIngredients.map((ingre) => ({
                        ...ingre,
                        recipeID,
                    })),
                );
                log.info("created new recipeIngredients");
                await db.insert(recipeTags).values(
                    tagList.map((tag) => ({
                        ...tag,
                        recipeID,
                    })),
                );
                log.info("created new recipeTags");
                await db.insert(steps).values(
                    recipeSteps.map((step) => ({
                        ...step,
                        recipeID,
                    })),
                );
                log.info("created new steps");

                set.headers["HX-Redirect"] = "/";
            } catch (err) {
                log.error(`[create new recipe] error: ${err as string}`);
                throw Error("Failed to create new recipe");
            }
        },
        {
            body: t.Intersect([
                t.Object({
                    title: t.String(),
                    description: t.String(),
                    estimatedTime: t.Numeric(),
                    tags: t.String(),
                    image: t.File({
                        type: "image/jpeg",
                    }),
                }),
                t.Union([
                    t.Object({
                        ingredientName: t.Array(t.String()),
                        ingredientAmount: t.Array(t.Numeric()),
                    }),
                    t.Object({
                        ingredientName: t.String(),
                        ingredientAmount: t.Numeric(),
                    }),
                ]),
                t.Union([
                    t.Object({
                        ingredientUnit: t.Optional(t.Array(t.String())),
                    }),
                    t.Object({
                        ingredientUnit: t.Optional(t.String()),
                    }),
                ]),
                t.Union([
                    t.Object({
                        stepTitle: t.Array(t.String()),
                        stepDescription: t.Array(t.String()),
                    }),
                    t.Object({
                        stepTitle: t.String(),
                        stepDescription: t.String(),
                    }),
                ]),
            ]),
        },
    )
    .get("/ingredientInput", async function () {
        return <IngredientInput />;
    })
    .get("/referenceInput", async function () {
        return <ReferenceInput />;
    })
    .get(
        "/stepsInput",
        async function ({ query: { count } }) {
            return <StepInput count={count} />;
        },
        {
            query: t.Object({
                count: t.Numeric(),
            }),
        },
    )
    .get(
        "/ingredient/unit",
        async function ({ query: { ingredientName }, log }) {
            try {
                // FIXME 如果有兩個input 僅有一個加上新unit會出錯
                const ingredient = await db.query.ingredients.findFirst({
                    where: eq(ingredients.name, ingredientName),
                });
                const unit = ingredient?.unit ?? "";
                console.log(unit);
                return (
                    <IngredientUnitInput
                        value={unit}
                        disabled={Boolean(unit)}
                    />
                );
            } catch (err) {
                log.error(err);
                return <IngredientUnitInput value="" />;
            }
        },
        {
            query: t.Object({
                ingredientName: t.String(),
            }),
        },
    )
    .post(
        "/addTag/:newTag",
        function ({ body: { tags }, params: { newTag } }) {
            // ignore existing tag
            const existingTags = new Set<string>(tags ? tags.split(",") : []);
            if (!existingTags.has(newTag)) {
                existingTags.add(newTag);
            }
            return <TagsInput tags={Array.from(existingTags)} />;
        },
        {
            body: t.Object({
                tags: t.String(),
            }),
            params: t.Object({
                newTag: t.String(),
            }),
        },
    )
    .post(
        "/addTag",
        function ({ body: { newTag, tags } }) {
            // ignore existing tag
            const existingTags = new Set<string>(tags ? tags.split(",") : []);
            if (!existingTags.has(newTag)) {
                existingTags.add(newTag);
            }
            return <TagsInput tags={Array.from(existingTags)} />;
        },
        {
            body: t.Object({
                newTag: t.String(),
                tags: t.String(),
            }),
        },
    )
    .get(
        "/tagOptions",
        async function ({ query: { newTag } }) {
            try {
                const relatedTags = await db
                    .select()
                    .from(tagsTable)
                    .where(like(tagsTable.label, `%${newTag}%`));
                if (!relatedTags.length) {
                    return "";
                }
                return (
                    <div class="bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 border ">
                        <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            {relatedTags.map(({ label }) => (
                                <li
                                    hx-trigger="click"
                                    hx-post={`/api/new/addTag/${label}`}
                                    hx-params="tags"
                                    hx-target="#tagsInputContainer"
                                    hx-swap="outerHtml"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                >
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            } catch (err) {
                return "";
            }
        },
        {
            query: t.Object({
                newTag: t.String(),
            }),
        },
    );
