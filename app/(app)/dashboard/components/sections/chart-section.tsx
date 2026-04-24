import { getWeeklyTotalsAction } from "@/core/transaction/presentation/transaction.actions";
import { unwrap } from "@/core/_shared/action";
import { buildChartData } from "../../lib/presenters";
import { WeeklyChart } from "../weekly-chart";

interface ChartSectionProps {
  ledgerId: string;
  year: number;
  month: number;
}

export async function ChartSection({ ledgerId, year, month }: ChartSectionProps) {
  const weeks = unwrap(await getWeeklyTotalsAction(ledgerId, year, month), []);
  return <WeeklyChart data={buildChartData(weeks)} />;
}
