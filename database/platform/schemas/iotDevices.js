import { integer, pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";

export const iotDevices = pgTable("iotDevices", {
  id: serial("id").primaryKey(),
  bloodPressure: text("bloodPressure").notNull(),
  heartRate: text("heartRate").notNull(),
  temperature: text("temperature").notNull(),
  gsr: text("gsr").notNull(),
  oxygenSaturation: text("oxygenSaturation").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
