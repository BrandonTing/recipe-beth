import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
    server: {
        LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
        // DATABASE_CONNECTION_TYPE: z.enum(["local", "remote", "local-replica"]),
        DATABASE_URL: z.string().min(1),
        DATABASE_AUTH_TOKEN: z.string(),
        NODE_ENV: z.enum(["development", "production"]),
        UPLOADTHING_SECRET: z.string().min(1),
        UPLOADTHING_APP_ID: z.string().min(1),
    },
    runtimeEnv: process.env,
});

const args = {
    // watch: process.argv.includes("--watch"),
    // liveReload: true,
};

export const config = {
    env,
    args,
};

export const PAGE_SIZE = 10;
