export type LedgerType = "personal" | "business";

export interface Ledger {
  id: string;
  type: LedgerType;
  name: string;
}

export function isLedgerType(value: string | undefined): value is LedgerType {
  return value === "personal" || value === "business";
}
