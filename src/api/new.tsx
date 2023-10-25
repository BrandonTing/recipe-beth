import Elysia, { t } from "elysia";

export const createNew = new Elysia()
    .post('/new', async function ({body,set}) {
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
    },
)