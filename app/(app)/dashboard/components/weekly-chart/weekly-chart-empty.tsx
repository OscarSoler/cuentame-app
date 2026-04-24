export function WeeklyChartEmpty() {
  return (
    <div className="bg-white rounded-xl px-4 pt-3 pb-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] text-muted-foreground/70 uppercase tracking-wider">Este mes</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-primary/30" />
            <span className="text-[9px] text-muted-foreground/50">Ingresos</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-destructive/20" />
            <span className="text-[9px] text-muted-foreground/50">Gastos</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center h-16">
        <span className="text-[11px] text-muted-foreground/60">
          Aún no hay movimientos este mes
        </span>
      </div>
    </div>
  );
}
