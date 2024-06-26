import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { config } from "../src/config";

export const client = createClient({
    url: config.env.DATABASE_URL,
    authToken: config.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);

async function main() {
    try {
        await migrate(db, {
            migrationsFolder: "drizzle/migrations",
        });
        console.log("Tables migrated!");
        process.exit(0);
    } catch (error) {
        console.error("Error performing migration: ", error);
        process.exit(1);
    }
}

await main();
