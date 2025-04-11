import { pgTable, text, timestamp, integer, serial } from "drizzle-orm/pg-core";
import { patients } from "./patients.js";
import { iotDevices } from "./iotDevices.js";

export const histories = pgTable("histories", {
  id: serial("id").primaryKey(),
  patient_id: text("patient_id")
    .references(() => patients.id)
    .notNull(),
  device_id: integer("device_id")
    .references(() => iotDevices.id)
    .notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
