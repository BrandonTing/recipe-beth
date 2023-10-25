import { Elysia } from "elysia";
import { detail } from "./detail";
import { list } from "./list";

export const index = new Elysia()
  .use(list)
  .use(detail);
