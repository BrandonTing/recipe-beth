import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { IngredientInput, StepInput } from "../components/form/inputs";
import Button from "../components/ui/button";
import { ctx } from "../context";
import { TagsInput } from "../components/form/tagsInput";

export const createNew = new Elysia().use(ctx).get("/new", ({ htmlStream }) => {
    return htmlStream(() => (
        <BaseHtml>
            <div class="flex items-center justify-center px-4 py-4 sm:px-0">
                <a href="/">
                    <Button>上一頁</Button>
                </a>
                <h1 class="mx-auto text-4xl font-bold text-gray-900">
                    建立新食譜
                </h1>
            </div>
            <form
                class="border-b border-gray-900/10 pb-10"
                hx-trigger="submit"
                hx-post="/api/new"
            >
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="title"
                            class="block text-base font-medium leading-6 text-gray-900"
                        >
                            名稱
                        </label>
                        <div class="mt-2">
                            <input
                                placeholder="請輸入食譜名稱"
                                type="text"
                                name="title"
                                id="title"
                                class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="description"
                            class="block text-base font-medium leading-6 text-gray-900"
                        >
                            描述
                        </label>
                        <div class="mt-2">
                            <textarea
                                placeholder="請簡單描述這份食譜"
                                name="description"
                                id="description"
                                class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            for="tags"
                            class="block text-base font-medium leading-6 text-gray-900"
                        >
                            標籤
                        </label>

                        <TagsInput />
                    </div>
                    <div>
                        <label
                            for="estimatedTime"
                            class="block text-base font-medium leading-6 text-gray-900"
                        >
                            預估時間
                        </label>
                        <div class="mt-2">
                            <input
                                placeholder="預估花費時間（分鐘）"
                                type="number"
                                min="0"
                                name="estimatedTime"
                                class="mb-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="ingredients"
                            class="block text-base font-medium leading-6 text-gray-900"
                        >
                            原料
                        </label>
                        <div class="mt-2">
                            <IngredientInput />
                            <button
                                hx-target="previous fieldset"
                                hx-get="/api/new/ingredientInput"
                                hx-trigger="click"
                                hx-swap="afterend"
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
                    </div>

                    <div>
                        <StepInput count={1} />
                    </div>
                    {/* 20231104 先不做參考資料 */}
                    {/* 
            <div>
              <label for="reference" class="block text-base font-medium leading-6 text-gray-900">參考資料</label>
              <ReferenceInput/>
              <button  
                  hx-target="previous div"
                  hx-get="/api/new/referenceInput"
                  hx-trigger="click"
                  hx-swap="afterend"
                  type="button" class="w-full border-dashed  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex justify-center" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                </button>
            </div> */}

                    <button
                        type="submit"
                        class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </BaseHtml>
    ));
});
