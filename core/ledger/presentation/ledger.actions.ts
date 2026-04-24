"use server";

import { cache } from "react";
import { requireSession, wrapAction } from "@/core/_shared/action";
import { DrizzleLedgerRepository } from "../infrastructure/drizzle-ledger.repository";
import { GetLedger } from "../application/get-ledger";
import { CreateLedger } from "../application/create-ledger";

const loadUserLedgers = cache(async () => {
  const session = await requireSession();
  const getLedger = new GetLedger({ repository: new DrizzleLedgerRepository() });
  const ledgers = await getLedger.byUserId(session.user.id);
  return ledgers.map((l) => ({ id: l.id, type: l.type, name: l.name }));
});

export async function getUserLedgersAction() {
  return wrapAction(loadUserLedgers);
}

interface CreateLedgerInput {
  name: string;
  type: "personal" | "business";
  businessName?: string;
  businessType?: string;
}

export async function createLedgerAction(input: CreateLedgerInput) {
  return wrapAction(async () => {
    const session = await requireSession();
    const createLedger = new CreateLedger({ repository: new DrizzleLedgerRepository() });
    const ledger = await createLedger.execute({
      userId: session.user.id,
      name: input.name,
      type: input.type,
      businessName: input.businessName ?? null,
      businessType: input.businessType ?? null,
    });
    return { id: ledger.id };
  });
}
