import 'dotenv/config';
import {drizzle} from "drizzle-orm/node-postgres";
import pkg from "pg";

const {Pool} = pkg;

async function main() {
    const pool = new Pool({
        connectionString:`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${parseInt(process.env.DB_PORT?? '0')}/${process.env.DB_NAME}`
    });
    const db = drizzle(pool);
}

main();