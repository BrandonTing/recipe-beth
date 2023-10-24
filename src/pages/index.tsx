import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import RecipeTable from "../components/table";

export const index = new Elysia()
  .use(ctx)
  .get("/", async ({ htmlStream,  }) => {
    // TODO get recipes from DB
    const recipes = [
      {
        name: "test",
        ingredients: ["chicken", "tofu"],
        seasonings: ["miso"],
        referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
        tags: ["simple"],
        estimatedTime: 30
      },
      {
        name: "test2",
        ingredients: ["beef", "beer"],
        seasonings: ["love"],
        referenceLinks: ["https://github.com/BrandonTing/recipe-beth"],
        tags: ["beer"],
        estimatedTime: 160
      }
    ]
    return htmlStream(() => (
      <BaseHtml>
        <div class="flex flex-col items-center py-3">
          <RecipeTable recipes={recipes} />
        </div>
      </BaseHtml>
    ));
  });
