import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";

export async function hasUserLedgers(): Promise<boolean> {
  const result = await getUserLedgersAction();
  return result.success && result.data.length > 0;
}
