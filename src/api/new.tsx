import Elysia, { t } from "elysia";
import {IngredientInput, IngredientUnitInput, ReferenceInput, StepInput } from '../components/form/inputs'
import { Ingredient, RecipeIngredient, Step, ingredients, recipeIngredients, recipes, steps } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const createNew = new Elysia({
    prefix: "/new"
})
    .post('/', async function ({body: {title, description, estimatedTime, ingredientAmount, ingredientName, ingredientUnit, stepTitle, stepDescription},set}) {
        const newIngredientKinds: Array<Ingredient> = ingredientUnit && Array.isArray(ingredientName) ? ingredientName.map((name, i) => {
            const unit = (ingredientUnit as Array<string>)[i];
            if(!unit) return
            return {
                name,
                unit,
            }
        }).filter(Boolean) : [
            {
                name: ingredientName as string,
                unit: ingredientUnit as string,
            }
        ]
        const newRecipeIngredients: Array<Omit<RecipeIngredient, "recipeID">> = Array.isArray(ingredientName) ? ingredientName.map((name, i) => {
            return {
                name,
                amount: Number((ingredientAmount as Array<number>)[i]!),
            }
        }) : [
            {
                name: ingredientName,
                amount: Number(ingredientAmount) as number,
            }
        ]
        const recipeSteps: Array<Step> = Array.isArray(stepTitle) ? stepTitle.map((title, i) => {
            return {
                title,
                description: (stepTitle as Array<string>)[i]!
            }
        }) : [
            {
                title: stepTitle,
                description: stepDescription as string
            }
        ]
        try {
            await db.insert(ingredients).values(newIngredientKinds);
            console.log(`added new ingredients: ${newIngredientKinds.map(kind => kind.name + ': ' + kind.unit).join(", ")}`)            
            const recipe = await db.insert(recipes).values({
                title,
                description,
                estimatedTime
            }).returning()
            const recipeID = recipe[0]!.id
            console.log(`created new recipe ${title}, id: ${recipeID}`)            
            await db.insert(recipeIngredients).values(newRecipeIngredients.map(ingre => ({
                ...ingre,
                recipeID
            })));
            await db.insert(steps).values(recipeSteps.map(step => ({
                ...step,
                recipeID
            })));
            return set.redirect = "/"
        } catch (err) {
            console.error(`[create new recipe] error: ${err}`);
            throw Error("Failed to create new recipe")
        }
    },   
    {
        body: t.Intersect([
            t.Object({
                "title": t.String(),
                "description": t.String(),
                estimatedTime: t.Numeric()
            }),
            t.Union([
                t.Object({
                    "ingredientName":t.Array(t.String()),
                    "ingredientAmount":t.Array(t.Numeric()),
                    "ingredientUnit":t.Optional(t.Array(t.String())),    
                }),
                t.Object({
                    "ingredientName":t.String(),
                    "ingredientAmount":t.Numeric(),
                    "ingredientUnit":t.Optional(t.String()),
                })
            ]),
            t.Union([
                t.Object({
                    "stepTitle":t.Array(t.String()),
                    "stepDescription":t.Array(t.String()),
                }),
                t.Object({
                    "stepTitle":t.String(),
                    "stepDescription":t.String(),
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
    .get('/ingredient/unit', async function ({query: {ingredientName}}) {
        try {
            const ingredient = await db.query.ingredients.findFirst({
                where: eq(ingredients.name, ingredientName)
            })
            const unit = ingredient?.unit ?? ""
            return (
                <IngredientUnitInput value={unit} disabled={Boolean(unit)}  />
            )    
        } catch (err) {
            console.error(err);
            return (
                <IngredientUnitInput value=""  />
            )        
        }
    }, {
        query: t.Object({
            ingredientName: t.String()
        })
    })
