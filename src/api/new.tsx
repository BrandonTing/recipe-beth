import Elysia, { t } from "elysia";
import {IngredientInput, IngredientUnitInput, ReferenceInput, StepInput } from '../components/form/inputs'
export type Ingredient = {
    name: string, 
    amount: number,
    unit: string
}
export const createNew = new Elysia({
    prefix: "/new"
})
    .post('/', async function ({body: {ingredientAmount, ingredientName, ingredientUnit},set}) {
        const ingredients: Array<Ingredient> = Array.isArray(ingredientName) ? ingredientName.map((name, i) => {
            return {
                name,
                amount: Number((ingredientAmount as Array<number>)[i]!),
                unit: ingredientUnit[i]!,
            }
        }) : [
            {
                name: ingredientName,
                amount: Number(ingredientAmount) as number,
                unit: ingredientUnit as string
            }
        ]
        console.log(ingredients)
        // TODO create new recipe 
        return set.redirect = "/"
    },   
    {
        body: t.Intersect([
            t.Object({
                "name": t.String(),
                "description": t.String(),
                steps:t.Union([t.Array(t.String()), t.String()]) ,
                "reference": t.Union([t.Array(t.String()), t.String()]) ,
            }),
            t.Union([
                t.Object({
                    "ingredientName":t.Array(t.String()),
                    "ingredientAmount":t.Array(t.Numeric()),
                    "ingredientUnit":t.Array(t.String()),    
                }),
                t.Object({
                    "ingredientName":t.String(),
                    "ingredientAmount":t.Numeric(),
                    "ingredientUnit":t.String(),
                })
            ])
        ]),
    })
    .get('/ingredientInput', async function () {
        return <IngredientInput />
    })
    .get('/referenceInput', async function () {
        return (
            <ReferenceInput />
        )
    })
    .get('/stepsInput', async function ({query: {count}}) {
        return (
            <StepInput count={count} />
        )
    }, {
        query: t.Object({
            count: t.Numeric()
        })
    })
    .get('/ingredient/info', async function ({query: {ingredientName}}) {
        return (
            <IngredientUnitInput value="顆" disabled={true} />
        )
    }, {
        query: t.Object({
            ingredientName: t.String()
        })
    })
