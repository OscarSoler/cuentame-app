import { db } from "@/lib/db";
import { ledgers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Ledger, LedgerConfig } from "../domain/ledger.entity";
import { LedgerRepository } from "../domain/ledger.repository";

export class DrizzleLedgerRepository implements LedgerRepository {
  async getByUserId(userId: string): Promise<Ledger[]> {
    const rows = await db
      .select()
      .from(ledgers)
      .where(eq(ledgers.userId, userId));

    return rows.map((row) => new Ledger(row as LedgerConfig));
  }

  async create(data: Omit<LedgerConfig, "id" | "createdAt">): Promise<Ledger> {
    const [row] = await db
      .insert(ledgers)
      .values({
        userId: data.userId,
        name: data.name,
        type: data.type,
        businessName: data.businessName ?? null,
        businessType: data.businessType ?? null,
      })
      .returning();

    return new Ledger(row as LedgerConfig);
  }
}
