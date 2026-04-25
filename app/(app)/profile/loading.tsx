export default function ProfileLoading() {
  return (
    <div className="flex flex-col h-full px-6 pt-12 pb-6 gap-8 animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-border/30" />
        <div className="flex flex-col items-center gap-1.5">
          <div className="h-3 w-32 rounded-full bg-border/40" />
          <div className="h-2 w-40 rounded-full bg-border/25" />
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-white/60 p-4">
        <div className="h-2 w-14 rounded-full bg-border/30 mb-1" />
        <div className="flex items-center gap-3 py-2">
          <div className="w-5 h-5 rounded-md bg-border/20" />
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 w-20 rounded-full bg-border/30" />
            <div className="h-2 w-28 rounded-full bg-border/20" />
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="h-10 w-full rounded-md bg-destructive/30" />
      </div>
    </div>
  );
}
