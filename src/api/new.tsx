import { eq, inArray } from "drizzle-orm";
import Elysia, { t } from "elysia";
import {
    IngredientInput,
    IngredientUnitInput,
    ReferenceInput,
    StepInput,
} from "../components/form/inputs";
import { ctx } from "../context";
import { db } from "../db";
import {
    Ingredient,
    ingredients,
    RecipeIngredient,
    recipeIngredients,
    recipes,
    Step,
    steps,
} from "../db/schema";
import { TagsInput } from "../components/form/tagsInput";

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
                if (newIngredientKinds.length) {
                    await db.insert(ingredients).values(newIngredientKinds);
                    log.info(
                        `added new ingredients: ${newIngredientKinds
                            .map((kind) => kind.name + ": " + kind.unit)
                            .join(", ")}`,
                    );
                }
                const recipe = await db
                    .insert(recipes)
                    .values({
                        title,
                        description,
                        estimatedTime,
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
                await db.insert(steps).values(
                    recipeSteps.map((step) => ({
                        ...step,
                        recipeID,
                    })),
                );
                return (set.redirect = "/");
            } catch (err) {
                console.error(`[create new recipe] error: ${err as string}`);
                throw Error("Failed to create new recipe");
            }
        },
        {
            body: t.Intersect([
                t.Object({
                    title: t.String(),
                    description: t.String(),
                    estimatedTime: t.Numeric(),
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
    );
