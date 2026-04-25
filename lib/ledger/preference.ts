import type { LedgerType } from "./types";

export const LEDGER_COOKIE = "cuentame_ledger_type";
const ONE_YEAR = 60 * 60 * 24 * 365;

function isLedgerType(value: string | undefined | null): value is LedgerType {
  return value === "personal" || value === "business";
}

export function getStoredLedgerType(): LedgerType | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LEDGER_COOKIE}=`));
  if (!match) return null;
  const value = decodeURIComponent(match.split("=")[1] ?? "");
  return isLedgerType(value) ? value : null;
}

export function setStoredLedgerType(type: LedgerType): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LEDGER_COOKIE}=${type}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}
