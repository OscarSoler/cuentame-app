import { ActivityStats } from "../domain/streak.entity";
import { TransactionRepository } from "../domain/transaction.repository";
import { POINTS_PER_TRANSACTION, POINTS_PER_STREAK_DAY } from "../domain/scoring";
import { localDateISO } from "@/lib/utils";

interface GetActivityStatsConfig {
  repository: TransactionRepository;
}

const LOOKBACK_DAYS = 90;

export class GetActivityStats {
  constructor(private config: GetActivityStatsConfig) {}

  async byLedger(ledgerId: string): Promise<ActivityStats> {
    if (!ledgerId?.trim()) throw new Error("El ledgerId es requerido");

    const [activeDates, totalTxs] = await Promise.all([
      this.config.repository.getActiveDates(ledgerId, LOOKBACK_DAYS),
      this.config.repository.getCount(ledgerId),
    ]);

    const activeSet = new Set(activeDates);
    const todayISO = localDateISO();

    const currentStreak = computeCurrentStreak(activeSet, todayISO);
    const activeDaysThisWeek = computeActiveDaysThisWeek(activeSet, todayISO);
    const score = totalTxs * POINTS_PER_TRANSACTION + currentStreak * POINTS_PER_STREAK_DAY;

    return new ActivityStats({ score, currentStreak, activeDaysThisWeek });
  }
}

function addDaysISO(iso: string, delta: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
}

function dayOfWeekISO(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function computeCurrentStreak(activeSet: Set<string>, todayISO: string): number {
  let cursor = todayISO;
  if (!activeSet.has(cursor)) {
    cursor = addDaysISO(cursor, -1);
    if (!activeSet.has(cursor)) return 0;
  }

  let streak = 0;
  while (activeSet.has(cursor)) {
    streak += 1;
    cursor = addDaysISO(cursor, -1);
  }
  return streak;
}

function computeActiveDaysThisWeek(activeSet: Set<string>, todayISO: string): number[] {
  // getUTCDay(): 0=Sun..6=Sat. We want Monday-first (0=Mon..6=Sun).
  const dow = dayOfWeekISO(todayISO);
  const offsetFromMonday = (dow + 6) % 7;
  const mondayISO = addDaysISO(todayISO, -offsetFromMonday);

  const active: number[] = [];
  for (let i = 0; i < 7; i += 1) {
    const dayISO = addDaysISO(mondayISO, i);
    if (activeSet.has(dayISO)) active.push(i);
  }
  return active;
}
