import { Elysia, t } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import Ingredients from "../components/ingredients";
import Button from "../components/ui/button";
import Tabs from "../components/tabs";

export const detail = new Elysia()
  .use(ctx)
  .get("/detail/:id", async ({ htmlStream, params: {id} }) => {
    const detail = {
      name: "test",
      ingredients: [{name: "雞胸肉", amount: 100, unit: '克'}, {name: "豆腐", amount: 2, unit: '塊'}],
      seasonings: [{name: "味噌", amount: 2, unit: '匙'}],
      referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
      tags: ["simple"],
      estimatedTime: 30,
    };
    // TODO get ingredients data
    return htmlStream(() => (
      <BaseHtml>
        <div class="px-4">
          <div class="flex items-center justify-center px-4 py-6 sm:px-0">
            <a href="#">
              <Button>
                Back
              </Button>
            </a>
            <h1 class="text-4xl font-bold text-gray-900 mx-auto">Delicious Apple Pie</h1>
          </div>
          <p class="mt-1 text-lg text-gray-500 text-center">
            This is a step by step guide to make the perfect apple pie for your family and friends.
          </p>
        </div>
        <div>
          <Tabs activeType="ingredients" />
          <Ingredients ingredients={detail.ingredients} seasonings={detail.seasonings}/>
        </div>
      </BaseHtml>
    ));
  }
);
