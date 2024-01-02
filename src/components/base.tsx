import { liveReloadScript } from "beth-stack/dev";
import { type PropsWithChildren } from "beth-stack/jsx";
import { config } from "../config";

const safeScript =
    config.env.NODE_ENV === "development" ? liveReloadScript() : "";

export const BaseHtml = ({ children }: PropsWithChildren) => (
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <title>RECIPE COLLECTIONS</title>
            <script src="https://unpkg.com/htmx.org@1.9.6"></script>
            <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
            <link rel="stylesheet" href="/public/dist/styles.css" />
            <script>{safeScript}</script>
        </head>
        <body hx-boost="true" class="h-screen text-base">
            <h1 class=" bg-blue-500 p-5 text-center text-3xl font-bold text-white shadow-md">
                Recipe Collections
            </h1>
            <div class="flex flex-col items-center py-3">
                <div class="relative m-auto w-3/4">{children}</div>
            </div>
        </body>
    </html>
);
