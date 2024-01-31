import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { api } from "./api";
import { config } from "./config";
import { index } from "./pages";

import { createRouteHandler } from "uploadthing/server";

import { uploadRouter } from "./api/uploadThing";

const { GET, POST } = createRouteHandler({
    router: uploadRouter,
    config: {
        uploadthingSecret: config.env.UPLOADTHING_SECRET,
        uploadthingId: config.env.UPLOADTHING_APP_ID,
    },
});

const app = new Elysia()
    .use(staticPlugin())
    .use(api)
    .use(index)
    .group("/api/uploadthing", (app) =>
        app
            .post("/", (context) => POST(context.request))
            .get("/", (context) => GET(context.request)),
    )
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
    .onResponse(({ log, request }) => {
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
