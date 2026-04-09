ALTER TABLE "ledgers" ADD COLUMN "business_name" varchar;--> statement-breakpoint
ALTER TABLE "ledgers" ADD COLUMN "business_type" varchar;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "tax_type" varchar;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "tax_amount" numeric;