"use server";

import { db } from "@/lib/db";
import { ledgers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function getUserLedgersAction() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "No autenticado" };

    const result = await db
      .select()
      .from(ledgers)
      .where(eq(ledgers.userId, session.user.id));

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

interface CreateLedgerInput {
  name: string;
  type: "personal" | "business";
  businessName?: string;
  businessType?: string;
}

export async function createLedgerAction(input: CreateLedgerInput) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "No autenticado" };

    const [ledger] = await db
      .insert(ledgers)
      .values({
        userId: session.user.id,
        name: input.name,
        type: input.type,
        businessName: input.businessName,
        businessType: input.businessType,
      })
      .returning();

    return { success: true, data: ledger };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
