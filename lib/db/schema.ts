import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  numeric,
  text,
  date,
  integer,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ─── Users ───────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name"),
  phone: varchar("phone").unique(),
  authProvider: varchar("auth_provider").default("otp"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Ledgers ─────────────────────────────────────────────
export const ledgers = pgTable("ledgers", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // personal | business
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Transactions ────────────────────────────────────────
export const transactions = pgTable("transactions", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  ledgerId: uuid("ledger_id")
    .notNull()
    .references(() => ledgers.id),
  amount: numeric("amount").notNull(),
  type: varchar("type").notNull(), // income | expense
  pillar: varchar("pillar"), // survival | optional | culture | extras
  category: varchar("category"),
  emotion: varchar("emotion"), // happy | neutral | sad
  note: text("note"),
  date: date("date").notNull(),
  isRecurring: boolean("is_recurring").default(false).notNull(),
  recurringDay: integer("recurring_day"), // 1–31, día del mes en que se repite
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Budgets ─────────────────────────────────────────────
export const budgets = pgTable(
  "budgets",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    ledgerId: uuid("ledger_id")
      .notNull()
      .references(() => ledgers.id),
    pillar: varchar("pillar").notNull(), // survival | optional | culture | extras
    year: integer("year").notNull(),
    month: integer("month").notNull(), // 1–12
    planned: numeric("planned").notNull(),
  },
  (t) => [
    uniqueIndex("budgets_ledger_pillar_year_month_idx").on(
      t.ledgerId,
      t.pillar,
      t.year,
      t.month
    ),
  ]
);

// ─── Reflections (Diario mensual Kakebo) ─────────────────
export const reflections = pgTable(
  "reflections",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    ledgerId: uuid("ledger_id")
      .notNull()
      .references(() => ledgers.id),
    year: integer("year").notNull(),
    month: integer("month").notNull(), // 1–12
    incomeTotal: numeric("income_total"),
    expenseTotal: numeric("expense_total"),
    savingsGoal: numeric("savings_goal"),
    savingsActual: numeric("savings_actual"),
    overallEmotion: varchar("overall_emotion"), // happy | neutral | sad
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    uniqueIndex("reflections_ledger_year_month_idx").on(
      t.ledgerId,
      t.year,
      t.month
    ),
  ]
);
