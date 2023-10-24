import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";

export const index = new Elysia()
  .use(ctx)
  .get("/", async ({ htmlStream,  }) => {
    return htmlStream(() => (
      <BaseHtml>
        <div class="flex flex-col items-center py-3">
          {/* TODO show recipe list */}
          rfwefwefwewefwefwefw
        </div>
      </BaseHtml>
    ));
  });
