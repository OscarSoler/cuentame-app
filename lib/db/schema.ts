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
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./auth-schema";
import { sql } from "drizzle-orm";

// ─── Profiles ────────────────────────────────────────────
// Datos de negocio del usuario — better-auth gestiona la tabla "users"
export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // mismo id que better-auth users.id
  phone: varchar("phone").unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Ledgers ─────────────────────────────────────────────
export const ledgers = pgTable("ledgers", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // personal | business
  businessName: varchar("business_name"),
  businessType: varchar("business_type"), // tienda | restaurante | servicios | freelancer | otro
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
  taxType: varchar("tax_type"), // iva | retefuente | ica
  taxAmount: numeric("tax_amount"),
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

// ─── Conversations ───────────────────────────────────────
export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    ledgerId: uuid("ledger_id")
      .notNull()
      .references(() => ledgers.id, { onDelete: "cascade" }),
    title: varchar("title"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("conversations_ledger_idx").on(t.ledgerId, t.updatedAt)]
);

// ─── Messages ────────────────────────────────────────────
export const messages = pgTable(
  "messages",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    role: varchar("role").notNull(), // user | assistant | system
    parts: jsonb("parts").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("messages_conversation_idx").on(t.conversationId, t.createdAt)]
);
