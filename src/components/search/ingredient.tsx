import { Ingredient } from "../../db/schema"

export function IngredientInput ({ingredientsOptions}: {
    ingredientsOptions: Array<Ingredient>
}) {
    return (
        <>
            <select required="true" name="ingredient" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">請選擇原料</option>
                {/* fetch ingredients from db */}
                {
                    ingredientsOptions.map(option => <option value={option.name}>{option.name}({option.unit})</option>)
                }
            </select>

            <input
                required="true"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="amount"
                type="number"
                placeholder="請輸入原料數量"                                
            />
        </>
    )
}