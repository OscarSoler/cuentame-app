import { getDailyTotalsAction } from "@/core/transaction/presentation/transaction.actions";
import { unwrap } from "@/core/_shared/action";
import { buildDailyChartData } from "../../lib/presenters";
import { WeeklyChart } from "../weekly-chart";

interface ChartSectionProps {
  ledgerId: string;
}

export async function ChartSection({ ledgerId }: ChartSectionProps) {
  const daily = unwrap(await getDailyTotalsAction(ledgerId, 7), []);
  return <WeeklyChart data={buildDailyChartData(daily, 7)} />;
}
