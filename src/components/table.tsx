import { desc, like, sql } from "drizzle-orm";
import { db } from "../db";
import { Recipes, recipes } from "../db/schema";
import {
    getEstimatedTimeText,
    getRecipesFilteredByIngredientsAndTag,
} from "../lib/util";
import { Pagination } from "./pagination";
import { Tags } from "./tags";
import { PAGE_SIZE } from "../config";

interface IListProps {
    recipes: (Pick<
        Recipes,
        "id" | "title" | "description" | "estimatedTime"
    > & {
        tags: { label: string }[] | null;
    })[];
    page: number;
    total: number;
}

export default function Table({ recipes, page, total }: IListProps) {
    if (!recipes.length) {
        return <p>目前尚未登錄任何食譜，踏出成為料理王的第一步吧！</p>;
    }
    return (
        <>
            <table class="w-full text-base text-center text-gray-500 dark:text-gray-400">
                <thead class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            食譜名稱
                        </th>
                        <th scope="col" class="px-6 py-3">
                            食譜類別
                        </th>
                        <th scope="col" class="px-6 py-3">
                            預計花費時間(分鐘)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                                scope="row"
                                class="px-6 py-4 font-medium cursor-pointer text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <a
                                    href={`/detail/${recipe.id}`}
                                    class="underline"
                                >
                                    {recipe.title}
                                </a>
                            </th>
                            <td class="px-6 py-4">
                                <Tags tags={recipe.tags ?? []} />
                            </td>

                            <td class="px-6 py-4">
                                {getEstimatedTimeText(recipe.estimatedTime)}
                            </td>
                            <td class="px-6 py-4">
                                <div class="w-6 mx-auto">
                                    <svg
                                        class="cursor-pointer"
                                        hx-swap="none"
                                        hx-post={`/api/recipe/remove/${recipe.id}`}
                                        hx-confirm="你確定要刪除此食譜嗎？"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g>
                                            {" "}
                                            <path
                                                fill="none"
                                                d="M0 0h24v24H0z"
                                            />{" "}
                                            <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />{" "}
                                        </g>{" "}
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* TODO pagination  */}
            <Pagination
                curPageCounts={recipes.length}
                page={page}
                total={total}
            />
        </>
    );
}

export async function renderTableFromQs(
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
            // FIXME
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

                <Table recipes={recipes} page={page} total={count ?? 0} />
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
        <Table
            page={page}
            total={count?.count ?? 0}
            recipes={filteredRecipes}
        />
    );
}
