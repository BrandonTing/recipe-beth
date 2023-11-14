import { Elysia, NotFoundError, t } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import Ingredients from "../components/ingredients";
import Button from "../components/ui/button";
import Tabs from "../components/tabs";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { recipes } from "../db/schema";

export const detail = new Elysia()
  .use(ctx)
  .get("/detail/:id", async ({ htmlStream, params: {id} }) => {
    const recipeDetail = await db.query.recipes.findFirst({
      where: eq(recipes.id, id),
      with: {
        ingredients: {
          with: {
            ingredient: true
          }
        },
        steps: true
      }
    })
    if(!recipeDetail) {
      throw new NotFoundError("Target recipe does not exist! Please try again.")
    }
    // TODO get ingredients data
    return htmlStream(() => (
      <BaseHtml>
        <div class="px-4">
          <div class="flex items-center justify-center px-4 py-6 sm:px-0">
            <a href="/">
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
        <div id="contentContainer">
          <Tabs activeType="ingredients" recipeId={id} />
          <div class="pt-2 w-full">
            <img
              src="/public/placeholder.svg"
              alt="Step 1"
              class="rounded-md object-cover w-1/3 inline-block mr-5"
              style="aspect-ratio: 100 / 100; object-fit: cover;"
            /> 
            {/* FIXME */}
            <Ingredients ingredients={recipeDetail.ingredients} seasonings={[]}/>
          </div>
        </div>
      </BaseHtml>
    ));
  },
  {
    params: t.Object({
      id: t.String()
    }),
  },
);
