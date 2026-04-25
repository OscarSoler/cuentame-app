import "server-only";
import { cookies } from "next/headers";
import type { LedgerType } from "./types";
import { LEDGER_COOKIE } from "./preference";

export async function readStoredLedgerType(): Promise<LedgerType | null> {
  const store = await cookies();
  const value = store.get(LEDGER_COOKIE)?.value;
  return value === "personal" || value === "business" ? value : null;
}
