export function IngredientInput({
    ingredientsOptions,
}: {
    ingredientsOptions: { name: string }[];
}) {
    return (
        <>
            <select
                name="ingredient"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
                <option value="">請選擇原料</option>
                {/* fetch ingredients from db */}
                {ingredientsOptions.map((option) => (
                    <option value={option.name}>{option.name}</option>
                ))}
            </select>

            <input
                class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="amount"
                type="number"
                placeholder="請輸入原料數量"
                value="0"
            />
        </>
    );
}
