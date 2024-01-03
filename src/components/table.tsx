import { Recipes } from "../db/schema";
import { GetEstimatedTimeText } from "../lib/util";
import { Tags } from "./tags";

interface ListProps {
    recipes: Pick<Recipes, "id" | "title" | "description" | "estimatedTime">[];
}

export default function ({ recipes }: ListProps) {
    return recipes.length ? (
        <table
            class="w-full text-base text-left text-gray-500 dark:text-gray-400"
            id="cardsContainer"
        >
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
                            <a href={`/detail/${recipe.id}`} class="underline">
                                {/* TODO click name, get detail content */}
                                {recipe.title}
                            </a>
                        </th>
                        <td class="px-6 py-4 flex gap-1">
                            <Tags tags={["simple", "fast"]} />
                        </td>
                        <td class="px-6 py-4">
                            {GetEstimatedTimeText(recipe.estimatedTime)}
                        </td>
                        <td class="px-6 py-4">
                            <div class="w-6">
                                <svg
                                    class="cursor-pointer"
                                    hx-swap="none"
                                    hx-post={`/api/recipe/remove/${recipe.id}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    {" "}
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
    ) : (
        <p>目前尚未登錄任何食譜，踏出成為料理王的第一步吧！</p>
    );
}
