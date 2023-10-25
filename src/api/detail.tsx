import { Elysia, t } from "elysia";

export const detail = new Elysia().get(
  "/detail",
  async ({ query: { recipeID } }) => {
    // TODO get detail from recipeID
    const detail = {
      name: "test",
      ingredients: ["chicken", "tofu"],
      seasonings: ["miso"],
      referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
      tags: ["simple"],
      estimatedTime: 30,
    };
    return (
      <div id="detail-root" class="m-auto w-2/3 ">
        <div class="px-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900">
            <button
              hx-get="/api/list"
              hx-target="#detail-root"
              hx-trigger="click"
              hx-swap="outerHTML"
              type="button"
              class="bg-white pr-3 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none  focus:ring-4  focus:ring-gray-200 dark:bg-gray-800  dark:text-white  dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
            {detail.name}
            recipeID: {recipeID}
          </h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Add some description here
          </p>
        </div>
        {/* tabs for ingredients, seasonings, steps, reference, etc */}
        <div class="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <ul class="-mb-px flex">
            <li class="mr-2">
              <a
                href="#"
                class="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              >
                原料清單
              </a>
            </li>
            <li class="mr-2">
              <a
                href="#"
                class="active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                aria-current="page"
              >
                步驟
              </a>
            </li>
            <li class="mr-2">
              <a
                href="#"
                class="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              >
                參考資料
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  },
  {
    query: t.Object({
      recipeID: t.Numeric(),
    }),
  },
);
