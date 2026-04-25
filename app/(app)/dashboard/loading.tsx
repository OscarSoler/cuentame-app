import { SummarySkeleton } from "./components/skeletons/summary-skeleton";
import { ChartSkeleton } from "./components/skeletons/chart-skeleton";
import { PillarsSkeleton } from "./components/skeletons/pillars-skeleton";
import { RecentSkeleton } from "./components/skeletons/recent-skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-2 w-20 rounded-full bg-border/30" />
          <div className="h-6 w-32 rounded-full bg-border/40" />
        </div>
        <div className="h-7 w-24 rounded-lg bg-border/20" />
      </div>

      <div className="flex bg-black/5 rounded-xl p-1 gap-1">
        <div className="flex-1 h-8 rounded-lg bg-white/60" />
        <div className="flex-1 h-8 rounded-lg" />
      </div>

      <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-border/20" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-2 w-24 rounded-full bg-border/30" />
          <div className="h-2.5 w-16 rounded-full bg-border/40" />
        </div>
      </div>

      <SummarySkeleton />
      <ChartSkeleton />
      <PillarsSkeleton />
      <RecentSkeleton />
    </div>
  );
}
