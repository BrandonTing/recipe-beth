import { Elysia, t } from "elysia";
import { ctx } from "../context";
import Button from "../components/ui/button";

export const detail = new Elysia()
  .get(
    "/detail",
    async ({query: {recipeID}}) => {
        // TODO get detail from recipeID
        const detail = {
          name: "test",
          ingredients: ["chicken", "tofu"],
          seasonings: ["miso"],
          referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
          tags: ["simple"],
          estimatedTime: 30
        }  
        return (
          <div id="detail-root" class="w-2/3 m-auto ">
            <div class="px-4">
              <h3 class="text-base font-semibold leading-7 text-gray-900">
                <button hx-get="/api/list" hx-target="#detail-root"  hx-trigger="click" hx-swap="outerHTML" type="button" class="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium  text-sm  dark:bg-gray-800 dark:text-white  dark:hover:bg-gray-700  dark:focus:ring-gray-700 pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                  </svg>
                </button>
                {detail.name}
              </h3>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Add some description here</p>
            </div>
            {/* tabs for ingredients, seasonings, steps, reference, etc */}
            <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex -mb-px">
                    <li class="mr-2">
                        <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">原料清單</a>
                    </li>
                    <li class="mr-2">
                        <a href="#" class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">步驟</a>
                    </li>
                    <li class="mr-2">
                        <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">參考資料</a>
                    </li>
                </ul>
            </div>
          </div>
        )

    },
    {
      query: t.Object({
        recipeID: t.Numeric(),
      }),
    },
  )
;
