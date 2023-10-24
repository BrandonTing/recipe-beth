import Elysia from "elysia";
import { detail } from "./detail";
import { list } from "./list";

export const api = new Elysia({
    prefix: "/api",
})
    .use(detail)
    .use(list)
