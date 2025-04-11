ALTER TABLE "iotDevices" RENAME COLUMN "bloodPressure" TO "blood_pressure";--> statement-breakpoint
ALTER TABLE "iotDevices" RENAME COLUMN "heartRate" TO "heart_rate";--> statement-breakpoint
ALTER TABLE "iotDevices" RENAME COLUMN "oxygenSaturation" TO "oxygen_saturation";--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "body_weight" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "body_height" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "blood_type" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "allergies" text;--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "patients" DROP COLUMN "email";