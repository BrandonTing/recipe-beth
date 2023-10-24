import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import {index} from "./pages";
import { config } from "./config";
import { api } from "./api";

const app = new Elysia()
  .use(staticPlugin())
  .use(api)
  .use(index)
  .onStart(({ log }) => {
    if (config.env.NODE_ENV === "development") {
      void fetch("http://localhost:3001/restart");
      // log.debug("🦊 Triggering Live Reload");
      console.log("🦊 Triggering Live Reload");
    }
  })
  .onError(({ code, error, request, log }) => {
    // log.error(` ${request.method} ${request.url}`, code, error);
    console.error(error);
  })
  .listen(3000);

export type App = typeof app;

console.log(
  `app is listening on http://${app.server?.hostname}:${app.server?.port}`,
);
