export function PillarsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-baseline justify-between mb-3">
        <div className="h-1.5 w-14 rounded-full bg-border/30" />
        <div className="h-1.5 w-16 rounded-full bg-border/25" />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm p-2.5 flex flex-col justify-between min-h-[110px]"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="w-8 h-8 rounded-lg bg-border/25" />
              <div className="h-3 w-7 rounded-full bg-border/25" />
            </div>
            <div>
              <div className="h-1.5 w-10 rounded-full bg-border/30 mb-1.5" />
              <div className="h-3 w-14 rounded-full bg-border/35 mb-1.5" />
              <div className="h-1 w-full rounded-full bg-border/25" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
