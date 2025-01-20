CREATE TABLE "onboarding_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"step_one" text[] NOT NULL,
	"step_two" text[] NOT NULL,
	"step_three" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"about_me" text,
	"street_address" text,
	"city" text,
	"state" text,
	"zip_code" text,
	"birthdate" date,
	"step_number" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
