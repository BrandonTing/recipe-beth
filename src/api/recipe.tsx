import { desc, eq, like, not, sql } from "drizzle-orm";
import Elysia, { t } from "elysia";
import RecipeList, { renderListFromQs } from "../components/recipeList";
import { IngredientInput } from "../components/search/ingredient";
import Button from "../components/ui/button";
import { PAGE_SIZE } from "../config";
import { ctx } from "../context";
import { db } from "../db";
import {
    recipeIngredients,
    recipeTags,
    recipes,
    steps,
    tags,
} from "../db/schema";
import { getRecipesFilteredByIngredientsAndTag } from "../lib/util";

export const recipe = new Elysia({
    prefix: "/recipe",
})
    .use(ctx)
    .get(
        "/",
        async function ({ query: { keyword }, set }) {
            const [count] = await db
                .select({
                    count: sql`count(*)`.mapWith(Number).as("count"),
                })
                .from(recipes)
                .where(like(recipes.title, `%${keyword}%`));
            const filteredRecipes = await db.query.recipes.findMany({
                where: like(recipes.title, `%${keyword}%`),
                orderBy: [desc(recipes.createdAt)],
                limit: PAGE_SIZE,
                offset: 0,
                columns: {
                    id: true,
                    title: true,
                    description: true,
                    estimatedTime: true,
                    imageUrl: true,
                },
                with: {
                    tags: {
                        columns: {
                            label: true,
                        },
                    },
                },
            });
            set.headers["HX-Push-Url"] = `/?keyword=${encodeURIComponent(
                keyword,
            )}`;
            return (
                <RecipeList
                    page={1}
                    total={count?.count ?? 0}
                    recipes={filteredRecipes}
                />
            );
        },
        {
            query: t.Object({
                keyword: t.String(),
            }),
        },
    )
    .get("/advanced", async function () {
        const ingredientsOptions = await db.query.ingredients.findMany();
        const tagOptions = await db.query.tags.findMany({
            where: not(eq(tags.label, "")),
        });
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
                            method="GET"
                            hx-get="/api/recipe/advanceSearch"
                            hx-trigger="submit"
                            hx-target="#advancedSearchModal"
                            hx-swap="delete"
                        >
                            <div>
                                <label
                                    class="px-1 text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="tag"
                                >
                                    Tag
                                </label>
                                <select
                                    name="tag"
                                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" disabled selected="true">
                                        請選擇查詢tag
                                    </option>

                                    {tagOptions.map((tag) => {
                                        return (
                                            <option value={tag.label}>
                                                {tag.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                {/* add search by tags */}
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
    .get(
        "/advanceSearch",
        async ({ query: { ingredient, amount, tag }, set, log }) => {
            log.info(tag);

            const ingredientFilters = new Map<string, number>();
            if (Array.isArray(ingredient)) {
                ingredient.forEach((name, i) => {
                    ingredientFilters.set(name, (amount as number[])[i]!);
                });
            } else if (ingredient) {
                ingredientFilters.set(ingredient, amount as number);
            }

            const { count, recipes } =
                await getRecipesFilteredByIngredientsAndTag(
                    ingredientFilters,
                    tag,
                    1,
                );
            const filterEntries = [...ingredientFilters.entries()];
            const qs = filterEntries
                .map(
                    ([name, amount]) => `${encodeURIComponent(name)}_${amount}`,
                )
                .join(",");

            set.headers["HX-Push-Url"] =
                `/?ingredients=${qs}&tag=${encodeURIComponent(tag)}`;

            return (
                <div id="listContainer" hx-swap-oob="true">
                    <p class="py-2">
                        目前查詢條件：
                        {filterEntries.map(([name, amount]) => (
                            <span class="mr-2 rounded border px-2 py-1">
                                {name}: {amount}
                            </span>
                        ))}
                        {tag && (
                            <span class="mr-2 rounded border px-2 py-1">
                                Tag: {tag}
                            </span>
                        )}
                    </p>

                    <RecipeList recipes={recipes} page={1} total={count ?? 0} />
                </div>
            );
        },
        {
            query: t.Object({
                tag: t.String(),
                ingredient: t.Union([t.String(), t.Array(t.String())]),
                amount: t.Union([t.Numeric(), t.Array(t.Numeric())]),
            }),
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
                await db.delete(recipeTags).where(eq(recipeTags.recipeID, id));
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
    )
    .get(
        "/page",
        async ({ query: { page }, headers }) => {
            const currentPageQs = new URLSearchParams(
                headers["hx-current-url"]?.split("?")[1],
            );
            return await renderListFromQs(currentPageQs, page);
        },
        {
            query: t.Object({
                page: t.Numeric(),
                keyword: t.Optional(t.String()),
                ingredients: t.Optional(t.String()),
            }),
        },
    );
