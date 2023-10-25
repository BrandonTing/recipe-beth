import Elysia from "elysia";
import { ctx } from "../context";
import { detail } from "./detail";

export const api = new Elysia({
    prefix: "/api",
})
    .use(ctx)
    .use(detail)
