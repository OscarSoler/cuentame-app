interface ChatSkeletonProps {
  isDrawer?: boolean;
}

export function ChatSkeleton({ isDrawer = false }: ChatSkeletonProps) {
  return (
    <div className="flex flex-col w-full h-full animate-pulse">
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col gap-5 px-4 py-5">
          <div className="flex justify-end">
            <div className="h-9 w-44 rounded-2xl rounded-br-md bg-primary/15" />
          </div>

          <div className="flex flex-col gap-1.5 items-start max-w-[92%]">
            <div className="w-7 h-7 rounded-full bg-border/30" />
            <div className="h-9 w-56 rounded-2xl rounded-tl-md bg-cream/80 border border-border/30" />
            <div className="h-7 w-40 rounded-2xl rounded-tl-md bg-cream/80 border border-border/30" />
          </div>

          <div className="flex justify-end">
            <div className="h-7 w-32 rounded-2xl rounded-br-md bg-primary/15" />
          </div>

          <div className="flex flex-col gap-1.5 items-start max-w-[92%]">
            <div className="w-7 h-7 rounded-full bg-border/30" />
            <div className="h-9 w-60 rounded-2xl rounded-tl-md bg-cream/80 border border-border/30" />
          </div>
        </div>
      </div>

      <div className={`px-4 pt-2 ${isDrawer ? "pb-3" : "pb-[calc(0.75rem+env(safe-area-inset-bottom))]"}`}>
        <div className="flex flex-col gap-2 rounded-xl px-3 py-2.5 bg-white/50 shadow-[0_0_0_1px_rgba(45,80,22,0.08)]">
          <div className="h-7 w-full rounded-md bg-border/20" />
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 rounded-full bg-accent/40" />
            <div className="w-8 h-8 rounded-full bg-primary/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
