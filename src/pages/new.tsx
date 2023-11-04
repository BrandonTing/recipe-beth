import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import {IngredientInput, ReferenceInput, StepInput} from '../components/form/inputs'
import Button from "../components/ui/button";
export const createNew = new Elysia()
  .use(ctx)
  .get("/new", async ({ htmlStream,  }) => {
    
    return htmlStream(() => (
      <BaseHtml>
          <div class="flex items-center justify-center px-4 py-6 sm:px-0">
            <a href="/">
              <Button>
                Back
              </Button>
            </a>
            <h1 class="text-4xl font-bold text-gray-900 mx-auto">建立新食譜</h1>
          </div>
        <form class="border-b border-gray-900/10 pb-10"  method="POST" action="/api/new" >
          <div class="mt-4 flex flex-col gap-2">
            <div>
              <label for="title" class="block text-base font-medium leading-6 text-gray-900">名稱</label>
              <div class="mt-2">
                <input placeholder="請輸入食譜名稱" type="text" name="name" id="name"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"/>
              </div>
            </div>

            <div>
              <label for="description" class="block text-base font-medium leading-6 text-gray-900">描述</label>
              <div class="mt-2">
                <textarea placeholder="請簡單描述這份食譜" name="description" id="description"  class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            {/* TODO add estimated time  */}

            <div>
              <label for="ingredients" class="block text-base font-medium leading-6 text-gray-900">原料</label>
              <div class="mt-2">
                <IngredientInput />
                <button  
                  hx-target="previous fieldset"
                  hx-get="/api/new/ingredientInput"
                  hx-trigger="click"
                  hx-swap="afterend"
                  type="button" class="w-full border-dashed  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex justify-center" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
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

            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </form>

      </BaseHtml>
    ));
  });
