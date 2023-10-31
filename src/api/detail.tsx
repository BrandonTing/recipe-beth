import Elysia, { t } from "elysia";
import Ingredients from "../components/ingredients";
import Steps from "../components/steps";
import Reference from "../components/reference";
import Tabs from "../components/tabs";

export const detail = new Elysia({
    prefix: "/detail"
})
    .get('/content/:id', async function ({query: {type}}) {
        const detail = {
            name: "test",
            ingredients: [{name: "雞胸肉", amount: 100, unit: '克'}, {name: "豆腐", amount: 2, unit: '塊'}],
            seasonings: [{name: "味噌", amount: 2, unit: '匙'}],
            referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
            tags: ["simple"],
            estimatedTime: 30,
          };
      
        switch (type) {
            case "ingredients":
                // get ingredients 
                return (
                    <>
                        <Tabs activeType="ingredients" />
                        <div class="pt-2 w-full">
                            <img
                                src="/public/placeholder.svg"
                                alt="Step 1"
                                class="rounded-md object-cover w-1/3 inline-block mr-5"
                                style="aspect-ratio: 100 / 100; object-fit: cover;"
                            />
                            <Ingredients ingredients={detail.ingredients} seasonings={detail.seasonings}/>
                        </div>
                    </> 
                )
            case "steps": 
                return (
                    <>
                        <Tabs activeType="steps" />
                        <div class="pt-2 w-full">
                        <img
                            src="/public/placeholder.svg"
                            alt="Step 1"
                            class="rounded-md object-cover w-1/3 inline-block mr-5"
                            style="aspect-ratio: 100 / 100; object-fit: cover;"
                        /> 
                            <Steps />
                        </div>
                    </> 
                )
            case "references": 
                return (
                    <>
                        <Tabs activeType="references" />
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
    },
)