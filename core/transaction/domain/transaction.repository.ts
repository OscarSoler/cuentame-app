import {
  Transaction,
  TransactionConfig,
  TransactionPillar,
} from "./transaction.entity";

export type CreateTransactionData = Omit<TransactionConfig, "id" | "createdAt">;
export type UpdateTransactionData = Partial<Omit<TransactionConfig, "id" | "ledgerId" | "createdAt">>;

export interface MonthSummary {
  income: number;
  expenses: number;
}

export interface PillarSpent {
  pillar: TransactionPillar;
  spent: number;
}

export interface WeeklyTotal {
  weekIndex: number; // 1..5
  income: number;
  expenses: number;
}

export interface DailyTotal {
  date: string; // YYYY-MM-DD
  income: number;
  expenses: number;
}

export interface TransactionRepository {
  getById(id: string): Promise<Transaction | null>;
  getByLedgerId(ledgerId: string): Promise<Transaction[]>;
  getRecent(ledgerId: string, limit: number): Promise<Transaction[]>;
  getRecentByMonth(
    ledgerId: string,
    year: number,
    month: number,
    limit: number,
  ): Promise<Transaction[]>;
  getByMonth(ledgerId: string, year: number, month: number): Promise<Transaction[]>;
  getMonthSummary(ledgerId: string, year: number, month: number): Promise<MonthSummary>;
  getPillarsSpentByMonth(ledgerId: string, year: number, month: number): Promise<PillarSpent[]>;
  getWeeklyTotalsByMonth(ledgerId: string, year: number, month: number): Promise<WeeklyTotal[]>;
  getDailyTotalsLastNDays(ledgerId: string, days: number): Promise<DailyTotal[]>;
  getActiveDates(ledgerId: string, sinceDays: number): Promise<string[]>;
  getCount(ledgerId: string): Promise<number>;
  create(data: CreateTransactionData): Promise<Transaction>;
  update(id: string, data: UpdateTransactionData): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
