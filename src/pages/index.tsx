import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import RecipeTable from "../components/table";
import { getRecipes } from "../api/list";

export const index = new Elysia()
  .use(ctx)
  .get("/", async ({ htmlStream,  }) => {
    const RecipeTable = getRecipes()
    return htmlStream(() => (
      <BaseHtml>
        <div class="flex flex-col items-center py-3">
          {RecipeTable}
        </div>
      </BaseHtml>
    ));
  });
