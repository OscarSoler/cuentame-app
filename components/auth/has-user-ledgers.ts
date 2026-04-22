import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";

export async function hasUserLedgers(): Promise<boolean> {
  const { data } = await getUserLedgersAction();
  return !!data && data.length > 0;
}
