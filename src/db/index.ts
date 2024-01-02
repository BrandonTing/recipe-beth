import { createClient, type Config } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { config } from "../config";
import * as schema from "./schema";

const options = {
    url: config.env.DATABASE_URL,
    authToken: config.env.DATABASE_AUTH_TOKEN,
} satisfies Config;

export const client = createClient(options);

export const db = drizzle(client, { schema, logger: true });
