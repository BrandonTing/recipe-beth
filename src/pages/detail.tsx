import { Elysia, t } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import Tab, { type TabProps } from "../components/tab";
import Ingredients from "../components/ingredients";

const Tabs: Array<Omit<TabProps, "active">> = [
  {
    label: "原料清單",
    type: "ingredients"
  },
  {
    label: "步驟",
    type: "steps"
  },
  {
    label: "參考資料",
    type: "references"
  }

]

export const detail = new Elysia()
  .use(ctx)
  .get("/detail/:id", async ({ htmlStream, params: {id} }) => {
    const detail = {
      name: "test",
      ingredients: ["chicken", "tofu"],
      seasonings: ["miso"],
      referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
      tags: ["simple"],
      estimatedTime: 30,
    };
    // TODO get ingredients data
    return htmlStream(() => (
      <BaseHtml>
        <div class="px-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900">
            <a
              href="/"
              class="bg-white text-sm font-medium text-gray-900 inline-block mr-2 align-middle"
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
            </a>
            {detail.name}
            recipeID: {id}
          </h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Add some description here
          </p>
        </div>
        {/* tabs for ingredients, seasonings, steps, reference, etc */}
        <ul class="-mb-px flex gap-2 border-b border-gray-200 text-center text-base font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          {
            Tabs.map(({type, label}, i) => (
              <Tab label={label} type={type} active={i===0} />
            ))
          }
        </ul>
        <div>
          <Ingredients/>
        </div>
      </BaseHtml>
    ));
  }
);
