export function ScoreSkeleton() {
  return (
    <div className="bg-white rounded-xl px-3.5 py-2.5 flex items-center gap-3 shadow-sm animate-pulse">
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="w-3 h-3 rounded-sm bg-border/30" />
        <div className="h-2 w-6 rounded-full bg-border/30" />
        <div className="h-1.5 w-3 rounded-full bg-border/20" />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-20 rounded-full bg-border/30" />
          <div className="h-1.5 w-10 rounded-full bg-border/20" />
        </div>
        <div className="h-1 bg-border/30 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-border/40 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-1 bg-orange-50/60 rounded-full px-2 py-0.5 shrink-0">
        <div className="w-2.5 h-2.5 rounded-sm bg-orange-200" />
        <div className="h-2 w-3 rounded-full bg-orange-200" />
      </div>

      <div className="flex items-center gap-0.5 shrink-0">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-sm bg-border/20" />
        ))}
      </div>
    </div>
  );
}
