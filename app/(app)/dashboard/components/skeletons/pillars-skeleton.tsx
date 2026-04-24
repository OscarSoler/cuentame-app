export function PillarsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-1.5 w-14 rounded-full bg-border/30 mb-3" />
      <div className="grid grid-cols-4 gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 bg-white rounded-xl px-2 pt-3 pb-2.5 shadow-sm"
          >
            <div className="w-14 h-14 rounded-full border-[2.5px] border-border/20" />
            <div className="flex flex-col items-center gap-1">
              <div className="h-1.5 w-10 rounded-full bg-border/30" />
              <div className="h-1 w-7 rounded-full bg-border/25" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
