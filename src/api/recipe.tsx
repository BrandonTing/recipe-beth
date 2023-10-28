import Elysia, { t } from "elysia";
import { Recipe } from "../schema";
import Card from "../components/card";

export const recipe = new Elysia({
    prefix: "/recipe"
})
    .get('/', async function ({query: {keyword}}) {
        console.log(keyword)
        const filteredRecipes = [
            {
              name: "test",
              ingredients: ["chicken", "tofu"],
              seasonings: ["miso"],
              referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
              tags: ["simple"],
              estimatedTime: 30,
              description: "some description..."
            },
          ] satisfies Array<Recipe>;
      
        return (
            <>
                {
                    filteredRecipes.map(recipe => (
                        <Card recipe={recipe}/>
                        ))
                }
            </>
        )
    },   
    {
        query: t.Object({
            keyword: t.String(),
        }),
    },
)