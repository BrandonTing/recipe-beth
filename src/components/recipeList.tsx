import { desc, like, sql } from "drizzle-orm";
import { PAGE_SIZE } from "../config";
import { db } from "../db";
import { Recipes, recipes } from "../db/schema";
import { getRecipesFilteredByIngredientsAndTag } from "../lib/util";
import Card from "./card";
import { Pagination } from "./pagination";

interface IRecipeListProps {
    recipes: (Pick<
        Recipes,
        "id" | "title" | "description" | "estimatedTime"
    > & {
        tags: { label: string }[] | null;
    })[];
    page: number;
    total: number;
}

export default function RecipeList({ recipes, page, total }: IRecipeListProps) {
    if (!recipes.length) {
        return <p>目前尚未登錄任何食譜，踏出成為料理王的第一步吧！</p>;
    }
    return (
        <>
            <div class=" grid grid-cols-1 md:grid-cols-2 gap-8">
                {recipes.map((recipe) => (
                    <Card recipe={recipe} />
                ))}
            </div>
            <Pagination
                curPageCounts={recipes.length}
                page={page}
                total={total}
            />
        </>
    );
}

export async function renderListFromQs(
    currentPageQs: URLSearchParams,
    page: number,
) {
    if (currentPageQs.has("ingredients")) {
        // query by ingredients and set page
        const ingredientFilterQs = currentPageQs.get("ingredients");
        const ingredientFilters = new Map<string, number>();
        const filterEntries =
            ingredientFilterQs
                ?.split(",")
                .map((ingredientEntry) => {
                    if (!ingredientEntry) return;
                    return ingredientEntry.split("_");
                })
                .filter(Boolean) ?? [];
        filterEntries.forEach(([name, amount]) => {
            if (name && amount) {
                ingredientFilters.set(name, Number(amount));
            }
        });
        const tag = currentPageQs.get("tag") ?? "";
        const { count, recipes } = await getRecipesFilteredByIngredientsAndTag(
            ingredientFilters,
            tag,
            page,
        );
        return (
            <>
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

                <RecipeList recipes={recipes} page={page} total={count ?? 0} />
            </>
        );
    }
    const keyword = currentPageQs.get("keyword") ?? "";
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
        offset: (page - 1) * PAGE_SIZE,
        columns: {
            id: true,
            title: true,
            description: true,
            estimatedTime: true,
        },
        with: {
            tags: {
                columns: {
                    label: true,
                },
            },
        },
    });

    // query by keyword and set page
    return (
        <RecipeList
            page={page}
            total={count?.count ?? 0}
            recipes={filteredRecipes}
        />
    );
}
