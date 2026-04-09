CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"phone" varchar,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "profiles_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "ledgers" DROP CONSTRAINT "ledgers_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "ledgers" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "ledgers" ADD CONSTRAINT "ledgers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;