import { db } from "@/lib/db";
import { transactions } from "@/lib/db/schema";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import {
  Transaction,
  TransactionEmotion,
  TransactionPillar,
  TransactionTaxType,
  TransactionType,
} from "../domain/transaction.entity";
import {
  CreateTransactionData,
  DailyTotal,
  MonthSummary,
  PillarSpent,
  TransactionRepository,
  UpdateTransactionData,
  WeeklyTotal,
} from "../domain/transaction.repository";

type TransactionRow = typeof transactions.$inferSelect;

function toEntity(row: TransactionRow): Transaction {
  return new Transaction({
    id: row.id,
    ledgerId: row.ledgerId,
    amount: Number(row.amount),
    type: row.type as TransactionType,
    date: new Date(row.date),
    pillar: (row.pillar ?? null) as TransactionPillar | null,
    category: row.category ?? null,
    emotion: (row.emotion ?? null) as TransactionEmotion | null,
    note: row.note ?? null,
    isRecurring: row.isRecurring,
    recurringDay: row.recurringDay ?? null,
    taxType: (row.taxType ?? null) as TransactionTaxType | null,
    taxAmount: row.taxAmount != null ? Number(row.taxAmount) : null,
    createdAt: row.createdAt ?? null,
  });
}

function monthBounds(year: number, month: number) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { start, end };
}

export class DrizzleTransactionRepository implements TransactionRepository {
  async getById(id: string): Promise<Transaction | null> {
    const [row] = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, id))
      .limit(1);

    return row ? toEntity(row) : null;
  }

  async getByLedgerId(ledgerId: string): Promise<Transaction[]> {
    const rows = await db
      .select()
      .from(transactions)
      .where(eq(transactions.ledgerId, ledgerId))
      .orderBy(desc(transactions.date), desc(transactions.createdAt));

    return rows.map(toEntity);
  }

  async getRecent(ledgerId: string, limit: number): Promise<Transaction[]> {
    const rows = await db
      .select()
      .from(transactions)
      .where(eq(transactions.ledgerId, ledgerId))
      .orderBy(desc(transactions.date), desc(transactions.createdAt))
      .limit(limit);

    return rows.map(toEntity);
  }

  async getByMonth(ledgerId: string, year: number, month: number): Promise<Transaction[]> {
    const { start, end } = monthBounds(year, month);
    const rows = await db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.ledgerId, ledgerId),
          gte(transactions.date, start),
          lte(transactions.date, end),
        ),
      )
      .orderBy(desc(transactions.date), desc(transactions.createdAt));

    return rows.map(toEntity);
  }

  async getRecentByMonth(
    ledgerId: string,
    year: number,
    month: number,
    limit: number,
  ): Promise<Transaction[]> {
    const { start, end } = monthBounds(year, month);
    const rows = await db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.ledgerId, ledgerId),
          gte(transactions.date, start),
          lte(transactions.date, end),
        ),
      )
      .orderBy(desc(transactions.date), desc(transactions.createdAt))
      .limit(limit);

    return rows.map(toEntity);
  }

  async getMonthSummary(ledgerId: string, year: number, month: number): Promise<MonthSummary> {
    const { start, end } = monthBounds(year, month);

    const [result] = await db
      .select({
        income: sql<string>`coalesce(sum(case when ${transactions.type} = 'income' then ${transactions.amount} else 0 end), 0)`,
        expenses: sql<string>`coalesce(sum(case when ${transactions.type} = 'expense' then ${transactions.amount} else 0 end), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.ledgerId, ledgerId),
          gte(transactions.date, start),
          lte(transactions.date, end),
        ),
      );

    return {
      income: Number(result?.income ?? 0),
      expenses: Number(result?.expenses ?? 0),
    };
  }

  async getPillarsSpentByMonth(
    ledgerId: string,
    year: number,
    month: number,
  ): Promise<PillarSpent[]> {
    const { start, end } = monthBounds(year, month);

    const rows = await db
      .select({
        pillar: transactions.pillar,
        spent: sql<string>`coalesce(sum(${transactions.amount}), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.ledgerId, ledgerId),
          eq(transactions.type, "expense"),
          gte(transactions.date, start),
          lte(transactions.date, end),
        ),
      )
      .groupBy(transactions.pillar);

    return rows
      .filter((r): r is { pillar: string; spent: string } => r.pillar != null)
      .map((r) => ({
        pillar: r.pillar as PillarSpent["pillar"],
        spent: Number(r.spent),
      }));
  }

  async getWeeklyTotalsByMonth(
    ledgerId: string,
    year: number,
    month: number,
  ): Promise<WeeklyTotal[]> {
    const { start, end } = monthBounds(year, month);

    const rows = await db
      .select({
        weekIndex: sql<number>`cast(floor((extract(day from ${transactions.date}) - 1) / 7) + 1 as int)`,
        income: sql<string>`coalesce(sum(case when ${transactions.type} = 'income' then ${transactions.amount} else 0 end), 0)`,
        expenses: sql<string>`coalesce(sum(case when ${transactions.type} = 'expense' then ${transactions.amount} else 0 end), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.ledgerId, ledgerId),
          gte(transactions.date, start),
          lte(transactions.date, end),
        ),
      )
      .groupBy(sql`floor((extract(day from ${transactions.date}) - 1) / 7) + 1`);

    return rows.map((r) => ({
      weekIndex: Number(r.weekIndex),
      income: Number(r.income),
      expenses: Number(r.expenses),
    }));
  }

  async getDailyTotalsLastNDays(ledgerId: string, days: number): Promise<DailyTotal[]> {
    const rows = await db
      .select({
        date: sql<string>`to_char(${transactions.date}, 'YYYY-MM-DD')`,
        income: sql<string>`coalesce(sum(case when ${transactions.type} = 'income' then ${transactions.amount} else 0 end), 0)`,
        expenses: sql<string>`coalesce(sum(case when ${transactions.type} = 'expense' then ${transactions.amount} else 0 end), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.ledgerId, ledgerId),
          gte(transactions.date, sql`current_date - make_interval(days => ${days - 1})`),
          lte(transactions.date, sql`current_date`),
        ),
      )
      .groupBy(transactions.date);

    return rows.map((r) => ({
      date: r.date,
      income: Number(r.income),
      expenses: Number(r.expenses),
    }));
  }

  async getActiveDates(ledgerId: string, sinceDays: number): Promise<string[]> {
    const rows = await db
      .selectDistinct({
        date: sql<string>`to_char(${transactions.date}, 'YYYY-MM-DD')`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.ledgerId, ledgerId),
          gte(transactions.date, sql`current_date - make_interval(days => ${sinceDays - 1})`),
          lte(transactions.date, sql`current_date`),
        ),
      )
      .orderBy(sql`1 desc`);

    return rows.map((r) => r.date);
  }

  async getCount(ledgerId: string): Promise<number> {
    const [row] = await db
      .select({ count: sql<string>`count(*)` })
      .from(transactions)
      .where(eq(transactions.ledgerId, ledgerId));

    return Number(row?.count ?? 0);
  }

  async create(data: CreateTransactionData): Promise<Transaction> {
    const [row] = await db
      .insert(transactions)
      .values({
        ledgerId: data.ledgerId,
        amount: String(data.amount),
        type: data.type,
        date: data.date.toISOString().slice(0, 10),
        pillar: data.pillar ?? null,
        category: data.category ?? null,
        emotion: data.emotion ?? null,
        note: data.note ?? null,
        isRecurring: data.isRecurring ?? false,
        recurringDay: data.recurringDay ?? null,
        taxType: data.taxType ?? null,
        taxAmount: data.taxAmount != null ? String(data.taxAmount) : null,
      })
      .returning();

    return toEntity(row);
  }

  async update(id: string, data: UpdateTransactionData): Promise<Transaction> {
    const values: Record<string, unknown> = {};
    if (data.amount !== undefined) values.amount = String(data.amount);
    if (data.type !== undefined) values.type = data.type;
    if (data.date !== undefined) values.date = data.date.toISOString().slice(0, 10);
    if (data.pillar !== undefined) values.pillar = data.pillar;
    if (data.category !== undefined) values.category = data.category;
    if (data.emotion !== undefined) values.emotion = data.emotion;
    if (data.note !== undefined) values.note = data.note;
    if (data.isRecurring !== undefined) values.isRecurring = data.isRecurring;
    if (data.recurringDay !== undefined) values.recurringDay = data.recurringDay;
    if (data.taxType !== undefined) values.taxType = data.taxType;
    if (data.taxAmount !== undefined) {
      values.taxAmount = data.taxAmount != null ? String(data.taxAmount) : null;
    }

    const [row] = await db
      .update(transactions)
      .set(values)
      .where(eq(transactions.id, id))
      .returning();

    if (!row) throw new Error("Transacción no encontrada");
    return toEntity(row);
  }

  async delete(id: string): Promise<void> {
    const rows = await db
      .delete(transactions)
      .where(eq(transactions.id, id))
      .returning({ id: transactions.id });

    if (rows.length === 0) throw new Error("Transacción no encontrada");
  }
}
