import prexit from 'prexit'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../database/platform/index.js';

const client = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  max: parseInt(process.env.DB_MAXCONN ?? '10'),
})

prexit(async () => {
  await client.end({ timeout: 10 })
})

export const db = drizzle(client, { schema })
