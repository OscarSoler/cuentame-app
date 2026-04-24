import { getRecentTransactionsAction } from "@/core/transaction/presentation/transaction.actions";
import { unwrap } from "@/core/_shared/action";
import { buildRecentTransactions } from "../../lib/presenters";
import { RecentTransactions } from "../recent-transactions";

interface RecentSectionProps {
  ledgerId: string;
  limit?: number;
}

export async function RecentSection({ ledgerId, limit = 6 }: RecentSectionProps) {
  const rows = unwrap(await getRecentTransactionsAction(ledgerId, limit), []);
  return <RecentTransactions transactions={buildRecentTransactions(rows)} />;
}
