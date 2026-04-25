import { ActivityStats } from "../domain/streak.entity";
import { TransactionRepository } from "../domain/transaction.repository";

interface GetActivityStatsConfig {
  repository: TransactionRepository;
}

const POINTS_PER_TRANSACTION = 10;
const POINTS_PER_STREAK_DAY = 5;
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
    const today = new Date();

    const currentStreak = computeCurrentStreak(activeSet, today);
    const activeDaysThisWeek = computeActiveDaysThisWeek(activeSet, today);
    const score = totalTxs * POINTS_PER_TRANSACTION + currentStreak * POINTS_PER_STREAK_DAY;

    return new ActivityStats({ score, currentStreak, activeDaysThisWeek });
  }
}

function toLocalISODate(date: Date): string {
  // en-CA renders as YYYY-MM-DD in local timezone, matching how DATE columns are stored.
  return date.toLocaleDateString("en-CA");
}

function addDays(date: Date, delta: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + delta);
  return next;
}

function computeCurrentStreak(activeSet: Set<string>, today: Date): number {
  let cursor = today;
  if (!activeSet.has(toLocalISODate(cursor))) {
    cursor = addDays(cursor, -1);
    if (!activeSet.has(toLocalISODate(cursor))) return 0;
  }

  let streak = 0;
  while (activeSet.has(toLocalISODate(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function computeActiveDaysThisWeek(activeSet: Set<string>, today: Date): number[] {
  // JS getDay(): 0=Sun..6=Sat. We want Monday-first (0=Mon..6=Sun).
  const dow = today.getDay();
  const offsetFromMonday = (dow + 6) % 7;
  const monday = addDays(today, -offsetFromMonday);

  const active: number[] = [];
  for (let i = 0; i < 7; i += 1) {
    const day = addDays(monday, i);
    if (activeSet.has(toLocalISODate(day))) active.push(i);
  }
  return active;
}
