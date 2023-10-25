import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import Table from "../components/table";
import Button from "../components/ui/button";

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
        <div class="text-right">
          <a href="/new">
            <Button variant="light">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </Button>
          </a>
        </div>
        <Table recipes={recipes} />
      </BaseHtml>
    ));
  });
