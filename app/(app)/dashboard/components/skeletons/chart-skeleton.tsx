export function ChartSkeleton() {
  const heights = [28, 46, 18, 54, 34, 22, 40];

  return (
    <div className="bg-white rounded-xl px-4 pt-3 pb-2.5 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-20 rounded-full bg-border/30" />
          <div className="h-1.5 w-14 rounded-full bg-border/20" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-border/30" />
            <div className="h-1.5 w-10 rounded-full bg-border/30" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-border/30" />
            <div className="h-1.5 w-8 rounded-full bg-border/30" />
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-1.5">
        {heights.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
            <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: 72 }}>
              <div className="w-2.5 rounded-t-sm bg-border/30" style={{ height: h }} />
              <div className="w-2.5 rounded-t-sm bg-border/20" style={{ height: Math.max(h - 10, 8) }} />
            </div>
            <div className="h-1.5 w-3 rounded-full bg-border/25" />
          </div>
        ))}
      </div>
    </div>
  );
}
