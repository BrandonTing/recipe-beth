import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";

export const ctx = new Elysia({
  name: "@app/ctx",
})
  .use(bethStack())
