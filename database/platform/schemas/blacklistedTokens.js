import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const blacklistedTokens = pgTable("blacklistedTokens", {
  id: text("id").primaryKey(),
  token: text("token"),
  user_id: text("user_id")
    .references(() => users.id)
    .notNull(),
  blacklistedAt: timestamp("blacklisted_at", {
    withTimezone: true,
  }).defaultNow(),
});
