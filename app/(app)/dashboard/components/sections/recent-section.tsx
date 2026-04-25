import { getRecentTransactionsByMonthAction } from "@/core/transaction/presentation/transaction.actions";
import { unwrap } from "@/core/_shared/action";
import { buildRecentTransactions } from "../../lib/presenters";
import { RecentTransactions } from "../recent-transactions";

interface RecentSectionProps {
  ledgerId: string;
  year: number;
  month: number;
  limit?: number;
}

export async function RecentSection({ ledgerId, year, month, limit = 6 }: RecentSectionProps) {
  const rows = unwrap(
    await getRecentTransactionsByMonthAction(ledgerId, year, month, limit),
    [],
  );
  return <RecentTransactions transactions={buildRecentTransactions(rows)} />;
}
