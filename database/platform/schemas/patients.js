import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: text("age"),
  gender: text("gender"),
  address: text("address"),
  bodyWeight: text("bodyWeight"),
  bodyHeight: text("bodyHeight"),
  bloodType: text("bloodType"),
  allergies: text("allergies"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
