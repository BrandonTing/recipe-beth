import { logger } from "@bogeychan/elysia-logger";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import pretty from "pino-pretty";
import { api } from "./api";
import { config } from "./config";
import { index } from "./pages";

const stream = pretty({
  colorize: true,
});

const loggerConfig =
  config.env.NODE_ENV === "development"
    ? {
        level: config.env.LOG_LEVEL,
        stream,
      }
    : { level: config.env.LOG_LEVEL };

const app = new Elysia()
  .use(staticPlugin())
  .decorate("config", config)
  .use(logger(loggerConfig))
  .use(api)
  .use(index)
  .onStart(({ log }) => {
    if (log && config.env.NODE_ENV === "production") {
      log.info("Server started");
    }
    if (config.env.NODE_ENV === "development") {
      void fetch("http://localhost:3001/restart");
      // log.debug("🦊 Triggering Live Reload");
      console.log("🦊 Triggering Live Reload");
    }
  })
  .onStop(({ log }) => {
    if (log && config.env.NODE_ENV === "production") {
      log.info("Server stopped");
    }
  })
  .onRequest(({ log, request }) => {
    if (log && config.env.NODE_ENV === "production") {
      log.debug(`Request received: ${request.method}: ${request.url}`);
    }
  })
  .onResponse(({ log, request, set }) => {
    if (log && config.env.NODE_ENV === "production") {
      log.debug(`Response sent: ${request.method}: ${request.url}`);
    }
  })
  .onError(({ log, error }) => {
    if (log && config.env.NODE_ENV === "production") {
      log.error(error);
    }
  })
  .listen(3000);

export type App = typeof app;

console.log(
  `app is listening on http://${app.server?.hostname}:${app.server?.port}`,
);
