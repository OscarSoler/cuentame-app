export function SummarySkeleton() {
  return (
    <div className="flex gap-2.5 animate-pulse">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 flex-1 bg-white rounded-xl px-3.5 py-3 shadow-sm"
        >
          <div className="w-7 h-7 rounded-full bg-border/20 shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div className="h-1.5 w-12 rounded-full bg-border/30" />
            <div className="h-2.5 w-16 rounded-full bg-border/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
