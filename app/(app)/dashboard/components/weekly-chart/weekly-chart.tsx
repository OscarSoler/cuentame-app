import { formatCurrencyCompact } from "@/lib/utils";
import { WeeklyChartEmpty } from "./weekly-chart-empty";

interface WeekData {
  name: string;
  ingresos: number;
  gastos: number;
  isToday?: boolean;
}

interface WeeklyChartProps {
  data: WeekData[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const totalExpenses = data.reduce((acc, d) => acc + d.gastos, 0);
  const totalIncome = data.reduce((acc, d) => acc + d.ingresos, 0);

  if (data.length === 0 || (totalExpenses === 0 && totalIncome === 0)) {
    return <WeeklyChartEmpty />;
  }

  const max = Math.max(...data.flatMap((d) => [d.ingresos, d.gastos]), 1);
  const H = 72;

  return (
    <div className="bg-white rounded-xl px-4 pt-3 pb-2.5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <span className="text-[9px] text-muted-foreground/70 uppercase tracking-wider leading-none">
            Últimos 7 días
          </span>
          <span className="text-[10px] text-muted-foreground/60 mt-1 leading-none">
            {formatCurrencyCompact(totalExpenses)} gastados
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-primary/70" />
            <span className="text-[9px] text-muted-foreground/50">Ingresos</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-destructive/30" />
            <span className="text-[9px] text-muted-foreground/50">Gastos</span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-1.5">
        {data.map((d, i) => {
          const incomeH = Math.round((d.ingresos / max) * H);
          const expenseH = Math.round((d.gastos / max) * H);
          const isEmpty = d.ingresos === 0 && d.gastos === 0;
          return (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
              <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: H }}>
                {isEmpty ? (
                  <div className="w-1 h-1 rounded-full bg-border/30 self-end mb-0.5" />
                ) : (
                  <>
                    <div
                      className="w-2.5 rounded-t-sm bg-primary/70"
                      style={{ height: incomeH }}
                    />
                    <div
                      className="w-2.5 rounded-t-sm bg-destructive/30"
                      style={{ height: expenseH }}
                    />
                  </>
                )}
              </div>
              <span
                className={`text-[9px] tabular-nums ${
                  d.isToday
                    ? "text-primary font-semibold"
                    : "text-muted-foreground/70"
                }`}
              >
                {d.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
