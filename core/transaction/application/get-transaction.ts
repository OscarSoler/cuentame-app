import { Transaction } from "../domain/transaction.entity";
import {
  DailyTotal,
  MonthSummary,
  PillarSpent,
  TransactionRepository,
  WeeklyTotal,
} from "../domain/transaction.repository";

interface GetTransactionConfig {
  repository: TransactionRepository;
}

export class GetTransaction {
  constructor(private config: GetTransactionConfig) {}

  async byId(id: string): Promise<Transaction | null> {
    if (!id?.trim()) throw new Error("El id es requerido");
    return this.config.repository.getById(id);
  }

  async byLedger(ledgerId: string): Promise<Transaction[]> {
    if (!ledgerId?.trim()) throw new Error("El ledgerId es requerido");
    return this.config.repository.getByLedgerId(ledgerId);
  }

  async recent(ledgerId: string, limit = 10): Promise<Transaction[]> {
    if (!ledgerId?.trim()) throw new Error("El ledgerId es requerido");
    if (limit <= 0) throw new Error("El limit debe ser mayor a 0");
    return this.config.repository.getRecent(ledgerId, limit);
  }

  async recentByMonth(
    ledgerId: string,
    year: number,
    month: number,
    limit = 10,
  ): Promise<Transaction[]> {
    this.assertMonth(year, month);
    if (limit <= 0) throw new Error("El limit debe ser mayor a 0");
    return this.config.repository.getRecentByMonth(ledgerId, year, month, limit);
  }

  async byMonth(ledgerId: string, year: number, month: number): Promise<Transaction[]> {
    this.assertMonth(year, month);
    return this.config.repository.getByMonth(ledgerId, year, month);
  }

  async monthSummary(ledgerId: string, year: number, month: number): Promise<MonthSummary> {
    this.assertMonth(year, month);
    return this.config.repository.getMonthSummary(ledgerId, year, month);
  }

  async pillarsSpentByMonth(
    ledgerId: string,
    year: number,
    month: number,
  ): Promise<PillarSpent[]> {
    this.assertMonth(year, month);
    return this.config.repository.getPillarsSpentByMonth(ledgerId, year, month);
  }

  async weeklyTotalsByMonth(
    ledgerId: string,
    year: number,
    month: number,
  ): Promise<WeeklyTotal[]> {
    this.assertMonth(year, month);
    return this.config.repository.getWeeklyTotalsByMonth(ledgerId, year, month);
  }

  async dailyTotalsLastNDays(ledgerId: string, days = 7): Promise<DailyTotal[]> {
    if (!ledgerId?.trim()) throw new Error("El ledgerId es requerido");
    if (days <= 0 || days > 90) throw new Error("days debe estar entre 1 y 90");
    return this.config.repository.getDailyTotalsLastNDays(ledgerId, days);
  }

  private assertMonth(year: number, month: number): void {
    if (!year || year < 1970) throw new Error("El año es inválido");
    if (month < 1 || month > 12) throw new Error("El mes debe estar entre 1 y 12");
  }
}
