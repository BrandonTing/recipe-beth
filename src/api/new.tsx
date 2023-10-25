import Elysia, { t } from "elysia";

export const createNew = new Elysia({
    prefix: "/new"
})
    .post('/', async function ({body,set}) {
        // TODO create new recipe 
        return set.redirect = "/"
    },   
    {
        body: t.Object({
            "first-name": t.String(),
            "last-name": t.String(),
            "email": t.String(),
            "country": t.String(),
            "street-address": t.String(),
            "city": t.String(),
            "region": t.String(),
            "postal-code": t.String(),

        }),
    })
    .get('/emailInput', async function () {
        // TODO create new recipe 
        return <input id="email" name="email" type="email" autocomplete="email" class="mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    },   
)