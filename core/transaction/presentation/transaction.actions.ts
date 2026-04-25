"use server";

import { requireSession, wrapAction } from "@/core/_shared/action";
import { DrizzleTransactionRepository } from "../infrastructure/drizzle-transaction.repository";
import {
  CreateTransaction,
  DeleteTransaction,
  GetActivityStats,
  GetTransaction,
  UpdateTransaction,
} from "../application";
import {
  Transaction,
  TransactionEmotion,
  TransactionPillar,
  TransactionTaxType,
  TransactionType,
} from "../domain/transaction.entity";
import { UpdateTransactionData } from "../domain/transaction.repository";

function useCases() {
  const repository = new DrizzleTransactionRepository();
  return {
    get: new GetTransaction({ repository }),
    create: new CreateTransaction({ repository }),
    update: new UpdateTransaction({ repository }),
    delete: new DeleteTransaction({ repository }),
    activityStats: new GetActivityStats({ repository }),
  };
}

function toDTO(tx: Transaction) {
  return {
    id: tx.id,
    ledgerId: tx.ledgerId,
    amount: tx.amount,
    type: tx.type,
    date: tx.date.toISOString().slice(0, 10),
    pillar: tx.pillar,
    category: tx.category,
    emotion: tx.emotion,
    note: tx.note,
    isRecurring: tx.isRecurring,
    recurringDay: tx.recurringDay,
    taxType: tx.taxType,
    taxAmount: tx.taxAmount,
  };
}

export interface CreateTransactionInput {
  ledgerId: string;
  amount: number;
  type: TransactionType;
  date: string;
  pillar?: TransactionPillar | null;
  category?: string | null;
  emotion?: TransactionEmotion | null;
  note?: string | null;
  isRecurring?: boolean;
  recurringDay?: number | null;
  taxType?: TransactionTaxType | null;
  taxAmount?: number | null;
}

export async function createTransactionAction(input: CreateTransactionInput) {
  return wrapAction(async () => {
    await requireSession();
    const tx = await useCases().create.execute({
      ...input,
      date: new Date(input.date),
      pillar: input.pillar ?? null,
      category: input.category ?? null,
      emotion: input.emotion ?? null,
      note: input.note ?? null,
      isRecurring: input.isRecurring ?? false,
      recurringDay: input.recurringDay ?? null,
      taxType: input.taxType ?? null,
      taxAmount: input.taxAmount ?? null,
    });
    return { id: tx.id };
  });
}

export interface UpdateTransactionInput {
  amount?: number;
  type?: TransactionType;
  date?: string;
  pillar?: TransactionPillar | null;
  category?: string | null;
  emotion?: TransactionEmotion | null;
  note?: string | null;
  isRecurring?: boolean;
  recurringDay?: number | null;
  taxType?: TransactionTaxType | null;
  taxAmount?: number | null;
}

export async function updateTransactionAction(id: string, input: UpdateTransactionInput) {
  return wrapAction(async () => {
    await requireSession();
    const { date, ...rest } = input;
    const updates: UpdateTransactionData = { ...rest };
    if (date !== undefined) updates.date = new Date(date);
    const tx = await useCases().update.execute(id, updates);
    return { id: tx.id };
  });
}

export async function updateTransactionEmotionAction(
  id: string,
  emotion: TransactionEmotion | null,
) {
  return wrapAction(async () => {
    await requireSession();
    await useCases().update.execute(id, { emotion });
    return { id };
  });
}

export async function deleteTransactionAction(id: string) {
  return wrapAction(async () => {
    await requireSession();
    await useCases().delete.execute(id);
    return { id };
  });
}

export async function getRecentTransactionsAction(ledgerId: string, limit = 10) {
  return wrapAction(async () => {
    await requireSession();
    const txs = await useCases().get.recent(ledgerId, limit);
    return txs.map(toDTO);
  });
}

export async function getMonthSummaryAction(ledgerId: string, year: number, month: number) {
  return wrapAction(async () => {
    await requireSession();
    return useCases().get.monthSummary(ledgerId, year, month);
  });
}

export async function getPillarsSpentAction(ledgerId: string, year: number, month: number) {
  return wrapAction(async () => {
    await requireSession();
    return useCases().get.pillarsSpentByMonth(ledgerId, year, month);
  });
}

export async function getWeeklyTotalsAction(ledgerId: string, year: number, month: number) {
  return wrapAction(async () => {
    await requireSession();
    return useCases().get.weeklyTotalsByMonth(ledgerId, year, month);
  });
}

export async function getDailyTotalsAction(ledgerId: string, days = 7) {
  return wrapAction(async () => {
    await requireSession();
    return useCases().get.dailyTotalsLastNDays(ledgerId, days);
  });
}

export async function getActivityStatsAction(ledgerId: string) {
  return wrapAction(async () => {
    await requireSession();
    const stats = await useCases().activityStats.byLedger(ledgerId);
    return {
      score: stats.score,
      currentStreak: stats.currentStreak,
      activeDaysThisWeek: stats.activeDaysThisWeek,
    };
  });
}
