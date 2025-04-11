import {defineConfig} from "drizzle-kit";

export default defineConfig({
    schema: 'database/platform/schemas/*',
    out: 'database/platform/out',
    dialect: 'postgresql',
    dbCredentials: {
        url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    },
});
