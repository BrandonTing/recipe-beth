import { like } from "drizzle-orm";
import Elysia, { t } from "elysia";
import {
    IngredientInput,
    ReferenceInput,
    StepInput,
} from "../components/form/inputs";
import { TagsInput } from "../components/form/tagsInput";
import { ctx } from "../context";
import { db } from "../db";
import {
    RecipeIngredient,
    Step,
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
                ingredientAmount,
                ingredientName,
                stepTitle,
                tags,
                image,
            },
            set,
            log,
        }) {
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
                ? stepTitle.map((title) => {
                      return {
                          title,
                      };
                  })
                : [
                      {
                          title: stepTitle,
                      },
                  ];

            try {
                if (tags) {
                    const tagList = tags
                        .split(",")
                        .map((tag) => ({ label: tag }));
                    if (tagList.length) {
                        await db
                            .insert(tagsTable)
                            .values(tagList)
                            .onConflictDoNothing();
                    }
                    await db.insert(recipeTags).values(
                        tagList.map((tag) => ({
                            ...tag,
                            recipeID,
                        })),
                    );
                    log.info("created new recipeTags");
                }
                const recipe = await db
                    .insert(recipes)
                    .values({
                        title,
                        imageUrl: image?.name ?? "",
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

                await db.insert(steps).values(
                    recipeSteps.map((step) => ({
                        ...step,
                        recipeID,
                    })),
                );
                log.info("created new steps");
                if (!image) {
                    set.headers["HX-Redirect"] = "/";
                    return;
                }

                const { error } = await upload(image);
                if (error) {
                    throw Error("Failed to create upload image");
                }
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
                    tags: t.Optional(t.String()),
                    image: t.Optional(
                        t.File({
                            type: "image/jpeg",
                        }),
                    ),
                }),
                t.Optional(
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
                ),
                t.Optional(
                    t.Union([
                        t.Object({
                            ingredientUnit: t.Optional(t.Array(t.String())),
                        }),
                        t.Object({
                            ingredientUnit: t.Optional(t.String()),
                        }),
                    ]),
                ),
                t.Optional(
                    t.Union([
                        t.Object({
                            stepTitle: t.Array(t.String()),
                        }),
                        t.Object({
                            stepTitle: t.String(),
                        }),
                    ]),
                ),
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
