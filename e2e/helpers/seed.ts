import { testDb, schema } from "./db";

export interface SeedLedger {
  type: "personal" | "business";
  name: string;
  businessName?: string;
  businessType?: string;
}

/**
 * Inserta un ledger directamente en DB para usuarios ya autenticados.
 * Útil cuando el test no necesita probar el onboarding completo.
 *
 * El usuario lo crea better-auth durante el primer login OTP — esta función
 * solo añade el ledger requerido para acceder a /(app)/*.
 */
export async function seedLedger(userId: string, ledger: SeedLedger) {
  const [row] = await testDb
    .insert(schema.ledgers)
    .values({
      userId,
      name: ledger.name,
      type: ledger.type,
      businessName: ledger.businessName,
      businessType: ledger.businessType,
    })
    .returning();
  return row;
}

export interface SeedConversation {
  ledgerId: string;
  title?: string;
}

export async function seedConversation(input: SeedConversation) {
  const [row] = await testDb
    .insert(schema.conversations)
    .values({ ledgerId: input.ledgerId, title: input.title })
    .returning();
  return row;
}

export interface SeedMessage {
  conversationId: string;
  role: "user" | "assistant";
  text: string;
}

export async function seedMessage(input: SeedMessage) {
  const [row] = await testDb
    .insert(schema.messages)
    .values({
      conversationId: input.conversationId,
      role: input.role,
      parts: [{ type: "text", text: input.text }],
    })
    .returning();
  return row;
}

export interface SeedAssistantExpenseMessage {
  conversationId: string;
  toolCallId: string;
  expense: {
    id: string;
    amount: number;
    category: string;
    note: string;
    pillar: string;
    date: string;
  };
}

/**
 * Inserta un mensaje assistant con una tool-part `registerExpense` en estado
 * `output-available` — el mismo shape que produce el AI SDK tras un tool-call
 * exitoso.
 */
export async function seedAssistantExpenseMessage(input: SeedAssistantExpenseMessage) {
  const [row] = await testDb
    .insert(schema.messages)
    .values({
      conversationId: input.conversationId,
      role: "assistant",
      parts: [
        {
          type: "tool-registerExpense",
          toolCallId: input.toolCallId,
          state: "output-available",
          input: {
            amount: input.expense.amount,
            category: input.expense.category,
            note: input.expense.note,
            pillar: input.expense.pillar,
          },
          output: {
            id: input.expense.id,
            amount: input.expense.amount,
            type: "expense",
            category: input.expense.category,
            note: input.expense.note,
            pillar: input.expense.pillar,
            date: input.expense.date,
            status: "registered",
          },
        },
      ],
    })
    .returning();
  return row;
}

export interface SeedExpense {
  ledgerId: string;
  amount: number;
  category: string;
  note: string;
  pillar: string;
  date?: string;
}

/**
 * Inserta una transacción tipo "expense" directamente en DB.
 * Útil para emular el side-effect del tool registerExpense cuando se
 * mockea el endpoint /api/chat.
 */
export async function seedExpense(input: SeedExpense) {
  const [row] = await testDb
    .insert(schema.transactions)
    .values({
      ledgerId: input.ledgerId,
      amount: String(input.amount),
      type: "expense",
      category: input.category,
      note: input.note,
      pillar: input.pillar,
      date: input.date ?? new Date().toISOString().slice(0, 10),
    })
    .returning();
  return row;
}
