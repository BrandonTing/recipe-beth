import { desc, eq, inArray, like } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { IngredientInput } from "../components/search/ingredient";
import Table from "../components/table";
import Button from "../components/ui/button";
import { ctx } from "../context";
import { db } from "../db";
import { recipeIngredients, Recipes, recipes, steps } from "../db/schema";

export const recipe = new Elysia({
    prefix: "/recipe",
})
    .use(ctx)
    .get(
        "/",
        async function ({ query: { keyword } }) {
            const filteredRecipes = await db.query.recipes.findMany({
                where: like(recipes.title, `%${keyword}%`),
                orderBy: [desc(recipes.createdAt)],
                // FIXME add pagination
                limit: 10,
                columns: {
                    id: true,
                    title: true,
                    description: true,
                    estimatedTime: true,
                },
            });

            return <Table recipes={filteredRecipes} />;
        },
        {
            query: t.Object({
                keyword: t.String(),
            }),
        },
    )
    .get("/advanced", async function () {
        const ingredientsOptions = await db.query.ingredients.findMany();

        return (
            <div
                id="advancedSearchModal"
                class="fixed left-0 top-40 flex h-screen w-screen items-baseline justify-center "
            >
                <div class="border bg-white p-5 opacity-100 shadow-lg ">
                    <div class="flex items-start justify-between">
                        <h2 class="text-2xl font-semibold">Advanced Search</h2>
                        <button
                            hx-get="/api/recipe/deleteSelf"
                            hx-target="#advancedSearchModal"
                            hx-swap="delete"
                            class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class=" h-6 w-6"
                            >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <form
                            id="ingredientForm"
                            class="grid gap-4"
                            method="POST"
                            hx-post="/api/recipe/searchByIngredient"
                            hx-trigger="submit"
                            hx-target="#advancedSearchModal"
                            hx-swap="delete"
                        >
                            <div class="grid grid-cols-2 gap-2">
                                {/* TODO add search by tags */}
                                <label
                                    class="px-1 text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="ingredient"
                                >
                                    原料
                                </label>
                                <label
                                    class="px-1 text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="amount"
                                >
                                    數量
                                </label>
                                <IngredientInput
                                    ingredientsOptions={ingredientsOptions}
                                />
                            </div>
                            <button
                                hx-target="previous div"
                                hx-get="/api/recipe/ingredientInput"
                                hx-trigger="click"
                                hx-swap="beforeend"
                                type="button"
                                class="flex w-full  justify-center rounded-lg border border-dashed border-gray-300 bg-white py-2.5 text-base font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-plus"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </button>
                            <Button type="submit">Search</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    })
    .get("/ingredientInput", async function () {
        const ingredientsOptions = await db.query.ingredients.findMany();

        return <IngredientInput ingredientsOptions={ingredientsOptions} />;
    })
    .post(
        "/searchByIngredient",
        async function ({ body: { ingredient, amount } }) {
            const filters = new Map<string, number>();
            if (Array.isArray(ingredient)) {
                ingredient.forEach((name, i) => {
                    filters.set(name, (amount as number[])[i]!);
                });
            } else {
                filters.set(ingredient, amount as number);
            }

            const rawdRecipes = await db
                .select()
                .from(recipes)
                .leftJoin(
                    recipeIngredients,
                    eq(recipeIngredients.recipeID, recipes.id),
                )
                .where(inArray(recipeIngredients.name, [...filters.keys()]));

            const filteredRecipesMap = new Map<
                string,
                Pick<
                    Recipes,
                    "id" | "title" | "description" | "estimatedTime"
                > & {
                    ingredients: Record<string, number>;
                }
            >();
            rawdRecipes.forEach((recipe) => {
                if (recipe.recipe_ingredients) {
                    if (filteredRecipesMap.has(recipe.recipes.id)) {
                        const {
                            id,
                            ingredients,
                            title,
                            description,
                            estimatedTime,
                        } = filteredRecipesMap.get(recipe.recipes.id)!;
                        filteredRecipesMap.set(recipe.recipes.id, {
                            id,
                            title,
                            description,
                            ingredients: {
                                ...ingredients,
                                [recipe.recipe_ingredients?.name]:
                                    recipe.recipe_ingredients?.amount,
                            },
                            estimatedTime,
                        });
                    } else {
                        const { id, title, description, estimatedTime } =
                            recipe.recipes;
                        filteredRecipesMap.set(id, {
                            id,
                            title,
                            description,
                            ingredients: {
                                [recipe.recipe_ingredients?.name]:
                                    recipe.recipe_ingredients?.amount,
                            },
                            estimatedTime,
                        });
                    }
                }
            });

            const filteredRecipes = [...filteredRecipesMap.values()].filter(
                (recipe) => {
                    let valid = true;
                    const { ingredients } = recipe;
                    filters.forEach((value, key) => {
                        const targetIngredient = ingredients[key];
                        // 沒有完整條件或數量不足
                        if (!targetIngredient) {
                            valid = false;
                        } else if (targetIngredient > value) {
                            valid = false;
                        }
                    });
                    return valid;
                },
            );
            return (
                <div id="tableContainer" hx-swap-oob="true">
                    <p class="py-2">
                        目前查詢條件：
                        {[...filters.entries()].map(([name, amount]) => (
                            <span class="mr-2 rounded border px-2 py-1">
                                {name}: {amount}
                            </span>
                        ))}
                    </p>

                    <Table recipes={filteredRecipes} />
                </div>
            );
        },
        {
            body: t.Union([
                t.Object({
                    ingredient: t.String(),
                    amount: t.Numeric(),
                }),
                t.Object({
                    ingredient: t.Array(t.String()),
                    amount: t.Array(t.Numeric()),
                }),
            ]),
        },
    )
    .get("/deleteSelf", () => {
        return;
    })
    .post(
        "/remove/:id",
        async ({ params: { id }, log, set }) => {
            try {
                await db
                    .delete(recipeIngredients)
                    .where(eq(recipeIngredients.recipeID, id));
                await db.delete(steps).where(eq(steps.recipeID, id));
                await db.delete(recipes).where(eq(recipes.id, id));
                set.headers["HX-Refresh"] = "true";
            } catch (err) {
                log.error(err);
            }

            return "";
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        },
    );
