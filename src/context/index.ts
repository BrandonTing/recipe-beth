import { logger } from "@bogeychan/elysia-logger";
import { Logger } from "@bogeychan/elysia-logger/types";
import { cron } from "@elysiajs/cron";
import { HoltLogger } from "@tlscipher/holt";
import { bethStack } from "beth-stack/elysia";
import { Elysia } from "elysia";
import pretty from "pino-pretty";
import { config } from "../config";

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

export const ctx = new Elysia({
  name: "@app/ctx",
})
  .decorate("config", config)
  .use(bethStack())
  .use(logger(loggerConfig))
  .onStart(({ log }) => {
    if (log && config.env.NODE_ENV === "production") {
      log.info("Server started");
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
  });
