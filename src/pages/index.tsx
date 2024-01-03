import { Elysia } from "elysia";
import { detail } from "./detail";
import { list } from "./list";
import { createNew } from "./new";

export const index = new Elysia().use(list).use(detail).use(createNew);
