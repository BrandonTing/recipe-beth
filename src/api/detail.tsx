import Elysia, { t } from "elysia";
import Ingredients from "../components/ingredients";
import Steps from "../components/steps";
import Reference from "../components/reference";

export const detail = new Elysia({
    prefix: "/detail"
})
    .get('/', async function ({query: {type}}) {
        switch (type) {
            case "ingredients":
                return <Ingredients />
            case "steps": 
                return <Steps />
            case "references": 
                return <Reference />
        }
    },   
    {
        query: t.Object({
            type: t.Union([t.Literal("ingredients"), t.Literal("steps"), t.Literal("references")]),
        }),
    },
)