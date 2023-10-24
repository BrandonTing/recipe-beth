import Elysia from "elysia";
import { detail } from "./detail";

export const api = new Elysia({
    prefix: "/api",
}).use(detail)
