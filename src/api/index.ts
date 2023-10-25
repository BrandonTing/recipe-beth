import Elysia from "elysia";
import { ctx } from "../context";
import { detail } from "./detail";
import { createNew } from "./new";

export const api = new Elysia({
    prefix: "/api",
})
    .use(ctx)
    .use(detail)
    .use(createNew)
