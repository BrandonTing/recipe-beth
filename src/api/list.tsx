import { Elysia, t } from "elysia";
import { ctx } from "../context";
import Button from "../components/ui/button";
import Table from "../components/table";

export async function getRecipes () {
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
    return (
      <Table recipes={recipes} />
    )

}

export const list = new Elysia()
//   .use(ctx)
  .get(
    "/list",
    getRecipes
  )
;
