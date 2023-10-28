import Elysia from "elysia";
import { ctx } from "../context";
import { detail } from "./detail";
import { createNew } from "./new";
import { recipe } from "./recipe";

export const api = new Elysia({
    prefix: "/api",
})
    .use(ctx)
    .use(recipe)
    .use(detail)
    .use(createNew)
