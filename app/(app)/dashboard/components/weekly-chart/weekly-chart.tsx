import { WeeklyChartEmpty } from "./weekly-chart-empty";

interface WeekData {
  name: string;
  ingresos: number;
  gastos: number;
}

interface WeeklyChartProps {
  data: WeekData[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  if (data.length === 0) {
    return <WeeklyChartEmpty />;
  }

  const max = Math.max(...data.flatMap((d) => [d.ingresos, d.gastos]));
  const H = 72;

  return (
    <div className="bg-white rounded-xl px-4 pt-3 pb-2.5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] text-muted-foreground/70 uppercase tracking-wider">Este mes</span>
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

      <div className="flex items-end justify-between gap-2">
        {data.map((d) => {
          const incomeH = Math.round((d.ingresos / max) * H);
          const expenseH = Math.round((d.gastos / max) * H);
          return (
            <div key={d.name} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: H }}>
                <div className="w-3 rounded-t-sm bg-primary/70" style={{ height: incomeH }} />
                <div className="w-3 rounded-t-sm bg-destructive/30" style={{ height: expenseH }} />
              </div>
              <span className="text-[9px] text-muted-foreground/70">{d.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
