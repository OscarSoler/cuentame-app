"use server";

import { unstable_cache, revalidateTag } from "next/cache";
import { requireSession, wrapAction } from "@/core/_shared/action";
import { DrizzleLedgerRepository } from "../infrastructure/drizzle-ledger.repository";
import { GetLedger } from "../application/get-ledger";
import { CreateLedger } from "../application/create-ledger";

const loadUserLedgersCached = (userId: string) =>
  unstable_cache(
    async () => {
      const repo = new DrizzleLedgerRepository();
      const getLedger = new GetLedger({ repository: repo });
      const ledgers = await getLedger.byUserId(userId);
      return ledgers.map((l) => ({ id: l.id, type: l.type, name: l.name }));
    },
    ["user-ledgers", userId],
    { tags: [`user-ledgers:${userId}`], revalidate: 3600 },
  )();

export async function getUserLedgersAction() {
  return wrapAction(async () => {
    const session = await requireSession();
    return loadUserLedgersCached(session.user.id);
  });
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
    revalidateTag(`user-ledgers:${session.user.id}`, "max");
    return { id: ledger.id };
  });
}
