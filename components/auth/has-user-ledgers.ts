import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";

export async function hasUserLedgers(): Promise<boolean> {
  const result = await getUserLedgersAction();
  if (!result.success) {
    console.error("[hasUserLedgers] action failed:", result.error);
    return false;
  }
  return result.data.length > 0;
}
