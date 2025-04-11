import { integer, pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";

export const iotDevices = pgTable("iotDevices", {
  id: serial("id").primaryKey(),
  bloodPressure: text("blood_pressure").notNull(),
  heartRate: text("heart_rate").notNull(),
  temperature: text("temperature").notNull(),
  gsr: text("gsr").notNull(),
  oxygenSaturation: text("oxygen_saturation").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
