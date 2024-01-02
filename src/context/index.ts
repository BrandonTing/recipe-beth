import { logger } from "@bogeychan/elysia-logger";
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
    .use(logger(loggerConfig))
    .use(bethStack());
