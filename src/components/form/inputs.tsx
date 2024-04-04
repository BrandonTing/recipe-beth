export function IngredientUnitInput({
    value,
    disabled,
}: {
    value: string;
    disabled?: boolean;
}) {
    return (
        <input
            required="true"
            value={value}
            disabled={disabled}
            placeholder="單位"
            id="ingredientUnit"
            name="ingredientUnit"
            class="mb-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed sm:text-sm sm:leading-6"
        />
    );
}

export function IngredientInput() {
    return (
        <fieldset class="flex gap-1 max-w-60">
            <input
                placeholder="名稱"
                name="ingredientName"
                class="mb-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
                placeholder="量"
                type="number"
                min="0"
                name="ingredientAmount"
                class="mb-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </fieldset>
    );
}

export function ReferenceInput() {
    return (
        <div class="my-2">
            <input
                type="text"
                placeholder="請輸入參考連結"
                name="reference"
                class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    );
}

export function StepInput({ count }: { count: number }) {
    return (
        <>
            <label
                for="steps"
                class="block text-base font-medium leading-6 text-gray-900"
            >
                步驟{count}
            </label>
            <div class="my-2">
                <input
                    type="text"
                    placeholder="為步驟加上一個好懂的名稱"
                    name="stepTitle"
                    class="mb-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            <div>
                <button
                    hx-target="closest div"
                    hx-get={`/api/new/stepsInput?count=${count + 1}`}
                    hx-trigger="click"
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
            </div>
        </>
    );
}
