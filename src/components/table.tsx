import { Recipes } from "../db/schema"


type ListProps = {
    recipes: Array<Pick<Recipes, "id" | "title" | "description" | "estimatedTime" >>
}

export default function ({ recipes }: ListProps)  {
    return recipes.length ? (
        <table class="w-full text-base text-left text-gray-500 dark:text-gray-400" id="cardsContainer">
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
                        參考連結
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    recipes.map((recipe, i) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium cursor-pointer text-gray-900 whitespace-nowrap dark:text-white">
                                <a href={`/detail/${i}`}>
                                    {/* TODO click name, get detail content */}
                                    {recipe.title}
                                </a>
                            </th>
                            <td class="px-6 py-4">
                                tags
                            </td>
                            <td class="px-6 py-4">
                                { 
                                    recipe.estimatedTime >= 60 ? `${Math.floor(recipe.estimatedTime / 60)}小時 ` : ''
                                }
                                {recipe.estimatedTime % 60} 分鐘
                            </td>
                            <td class="px-6 py-4">
                                Links
                            </td>
                        </tr>    
                    ))
                }
            </tbody>
        </table>
    ) :  <p>目前尚未登錄任何食譜，踏出成為料理王的第一步吧！</p>
}
  