import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import Table from "../components/table";
import { detail } from "./detail";

export const list = new Elysia()
  .use(ctx)
  .get("/", async ({ htmlStream,  }) => {
    const recipes = [
      {
        name: "test",
        ingredients: ["chicken", "tofu"],
        seasonings: ["miso"],
        referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
        tags: ["simple"],
        estimatedTime: 30,
      },
      {
        name: "test2",
        ingredients: ["beef", "beer"],
        seasonings: ["love"],
        referenceLinks: ["https://github.com/BrandonTing/recipe-beth"],
        tags: ["beer"],
        estimatedTime: 160,
      },
    ];
      return htmlStream(() => (
      <BaseHtml>
        <div class="flex flex-col items-center py-3">
          <div class="relative w-full">
            <Table recipes={recipes} />
          </div>
        </div>
      </BaseHtml>
    ));
  });
