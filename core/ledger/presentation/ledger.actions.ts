"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { DrizzleLedgerRepository } from "../infrastructure/drizzle-ledger.repository";
import { GetLedger } from "../application/get-ledger";
import { CreateLedger } from "../application/create-ledger";

function repo() {
  return new DrizzleLedgerRepository();
}

export async function getUserLedgersAction() {
  try {
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });

    if (!session) return { success: false, error: "No autenticado" };

    const getLedger = new GetLedger({ repository: repo() });
    const ledgers = await getLedger.byUserId(session.user.id);

    return { success: true, data: ledgers.map((l) => ({ id: l.id })) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
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
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });

    if (!session) return { success: false, error: "No autenticado" };

    const createLedger = new CreateLedger({ repository: repo() });
    const ledger = await createLedger.execute({
      userId: session.user.id,
      name: input.name,
      type: input.type,
      businessName: input.businessName ?? null,
      businessType: input.businessType ?? null,
    });

    return { success: true, data: { id: ledger.id } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
