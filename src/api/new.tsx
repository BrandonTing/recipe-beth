import Elysia, { t } from "elysia";

export const createNew = new Elysia({
    prefix: "/new"
})
    .post('/', async function ({body,set}) {
        console.log(body)
        // TODO create new recipe 
        return set.redirect = "/"
    },   
    {
        body: t.Object({
            "name": t.String(),
            "description": t.String(),
            "ingredientName":t.Union([t.Array(t.String()), t.String()]) ,
            "ingredientAmount":t.Union([t.Array(t.Numeric()), t.Numeric()]) ,
            "ingredientUnit":t.Union([t.Array(t.String()), t.String()]) ,
            steps:t.Union([t.Array(t.String()), t.String()]) ,
            "reference": t.Union([t.Array(t.String()), t.String()]) ,
        }),
    })
    .get('/emailInput', async function () {
        // TODO create new recipe 
        return (
            <fieldset class="flex gap-1">
                  <input hx-get='/api/new/ingredient/info' hx-trigger="change" hx-target="next #ingredientUnit" hx-swap="outerHTML" placeholder="名稱" name="ingredientName" class="px-2 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  <input placeholder="量" type="number" min="0" name="ingredientAmount" class="px-2 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  <input placeholder="單位" id="ingredientUnit" name="ingredientUnit" class="disabled:cursor-not-allowed px-2 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </fieldset>
        )
    })
    .get('/referenceInput', async function () {
        // TODO create new recipe 
        return (
            <div class="my-2">
                <input type="text" placeholder="請輸入參考連結" name="reference" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
        )
    })
    .get('/stepsInput', async function () {
        // TODO create new recipe 
        return (
            <div class="my-2">
                <textarea placeholder="請簡述食譜步驟" name="steps" id="steps"  class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
        )
    })
    .get('/ingredient/info', async function ({query: {ingredientName}}) {
        return (
            <input value="顆" disabled placeholder="單位" id="ingredientUnit" name="ingredientUnit" class="disabled:cursor-not-allowed px-2 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        )
    }, {
        query: t.Object({
            ingredientName: t.String()
        })
    })
