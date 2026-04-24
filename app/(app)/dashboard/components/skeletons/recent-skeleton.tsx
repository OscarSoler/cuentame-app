export function RecentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-1.5 w-14 rounded-full bg-border/30" />
        <div className="h-1.5 w-16 rounded-full bg-border/25" />
      </div>

      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-border/10"
            style={{ opacity: 1 - i * 0.2 }}
          >
            <div className="flex items-center gap-3 px-3.5 py-3">
              <div className="w-10 h-10 rounded-xl bg-border/20 shrink-0" />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-2 w-2/3 rounded-full bg-border/30" />
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-14 rounded-full bg-border/20" />
                  <div className="h-1.5 w-10 rounded-full bg-border/20" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="h-2.5 w-16 rounded-full bg-border/30" />
                <div className="h-1.5 w-10 rounded-full bg-border/25" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
