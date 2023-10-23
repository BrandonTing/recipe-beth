import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import {index} from "./pages";

const app = new Elysia()
  .use(staticPlugin())
  .use(index)
  .onError(({ code, error, request, log }) => {
    // log.error(` ${request.method} ${request.url}`, code, error);
    console.error(error);
  })
  .listen(3000);

export type App = typeof app;

console.log(
  `app is listening on http://${app.server?.hostname}:${app.server?.port}`,
);
