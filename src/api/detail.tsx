import Elysia, { NotFoundError, t } from "elysia";
import Ingredients from "../components/ingredients";
import Steps from "../components/steps";
import Reference from "../components/reference";
import Tabs from "../components/tabs";
import { db } from "../db";
import { recipes } from "../db/schema";
import { eq } from "drizzle-orm";

export const detail = new Elysia({
    prefix: "/detail"
})
    .get('/content/:id', async function ({query: {type}, params: {id}}) {
        const detail =  await db.query.recipes.findFirst({
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
        if(!detail) {
          throw new NotFoundError("Target recipe does not exist! Please try again.")
        }
      
        switch (type) {
            case "ingredients":
                // get ingredients 
                return (
                    <>
                        <Tabs activeType="ingredients" recipeId={id}  />
                        <div class="pt-2 w-full">
                            <img
                                src="/public/placeholder.svg"
                                alt="Step 1"
                                class="rounded-md object-cover w-1/3 inline-block mr-5"
                                style="aspect-ratio: 100 / 100; object-fit: cover;"
                            />
                            {/* FIXME */}
                            <Ingredients ingredients={detail.ingredients} seasonings={[]}/>
                        </div>
                    </> 
                )
            case "steps": 
                return (
                    <>
                        <Tabs activeType="steps" recipeId={id} />
                        <div class="pt-2 w-full">
                        <img
                            src="/public/placeholder.svg"
                            alt="Step 1"
                            class="rounded-md object-cover w-1/3 inline-block mr-5"
                            style="aspect-ratio: 100 / 100; object-fit: cover;"
                        /> 
                            <Steps steps={detail.steps}  />
                        </div>
                    </> 
                )
            case "references": 
                return (
                    <>
                        <Tabs activeType="references" recipeId={id}  />
                        <div class="pt-2 w-full">
                            <img
                            src="/public/placeholder.svg"
                            alt="Step 1"
                            class="rounded-md object-cover w-1/3 inline-block mr-5"
                            style="aspect-ratio: 100 / 100; object-fit: cover;"
                            /> 
                            <Reference />
                        </div>
                    </> 
                )
        }
    },   
    {
        query: t.Object({
            type: t.Union([t.Literal("ingredients"), t.Literal("steps"), t.Literal("references")]),
        }),
        params: t.Object({
            id: t.Numeric()
        }),
    },
)