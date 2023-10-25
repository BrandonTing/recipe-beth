import Elysia from "elysia";
import { detail } from "./detail";
import { list } from "./list";
import { ctx } from "../context";

export const api = new Elysia({
    prefix: "/api",
})
    .use(ctx)
    .use(detail)
    .use(list)
