import { Recipe } from "../schema";


type ListProps = {
    recipes: Array<Recipe>
}

export default function ({ recipes }: ListProps)  {
    return (
        <table class="w-2/3 m-auto text-base text-left text-gray-500 dark:text-gray-400">
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
                    recipes.map(({name, tags, estimatedTime, referenceLinks}, i) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium cursor-pointer text-gray-900 whitespace-nowrap dark:text-white">
                                <a href={`/detail/${i}`}>
                                    {/* TODO click name, get detail content */}
                                    {name}
                                </a>
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
    )
}
  