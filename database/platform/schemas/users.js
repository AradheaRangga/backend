import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import { patients } from "./patients.js";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  phone: text("phone").notNull(),
  patient_id: integer("patient_id").references(() => patients.id),
});
