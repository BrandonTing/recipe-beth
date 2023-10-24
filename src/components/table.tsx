import { Recipe } from "../schema";


type ListProps = {
    recipes: Array<Recipe>
}

export default function ({ recipes }: ListProps)  {
    return (
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        recipes.map(({name, tags, estimatedTime, referenceLinks}) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" hx-get="/api/detail" hx-target="table" hx-swap="outerHTML" hx-hx-trigger="click"  class="px-6 py-4 font-medium cursor-pointer text-gray-900 whitespace-nowrap dark:text-white">
                                    {/* TODO click name, get detail content */}
                                    {name}
                                </th>
                                <td class="px-6 py-4">
                                    {tags.join(', ')}
                                </td>
                                <td class="px-6 py-4">
                                    {Math.floor(estimatedTime / 60)}小時 {estimatedTime % 60} 分鐘
                                </td>
                                <td class="px-6 py-4">
                                    {referenceLinks.map((link, i) => (
                                        <a href={link} target="_blank">link {i + 1}</a>
                                    ))}
                                </td>
                            </tr>    
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
  