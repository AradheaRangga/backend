CREATE TABLE "blacklistedTokens" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text,
	"user_id" text NOT NULL,
	"blacklisted_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "histories" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"device_id" integer NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "iotDevices" (
	"id" serial PRIMARY KEY NOT NULL,
	"bloodPressure" text NOT NULL,
	"heartRate" text NOT NULL,
	"temperature" text NOT NULL,
	"gsr" text NOT NULL,
	"oxygenSaturation" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" text,
	"gender" text,
	"address" text,
	"phone" text,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"phone" text NOT NULL,
	"patient_id" integer
);
--> statement-breakpoint
ALTER TABLE "blacklistedTokens" ADD CONSTRAINT "blacklistedTokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "histories" ADD CONSTRAINT "histories_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "histories" ADD CONSTRAINT "histories_device_id_iotDevices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."iotDevices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;