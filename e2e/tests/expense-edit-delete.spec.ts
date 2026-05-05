import { test, expect } from "../fixtures/auth.fixture";
import {
  seedConversation,
  seedExpense,
  seedAssistantExpenseMessage,
} from "../helpers/seed";
import { testDb, schema } from "../helpers/db";
import { eq } from "drizzle-orm";

async function setupExpenseInChat(opts: {
  ledgerId: string;
  amount: number;
  category: string;
  note: string;
  pillar: string;
}) {
  const conversation = await seedConversation({ ledgerId: opts.ledgerId });
  const expense = await seedExpense({
    ledgerId: opts.ledgerId,
    amount: opts.amount,
    category: opts.category,
    note: opts.note,
    pillar: opts.pillar,
  });
  await seedAssistantExpenseMessage({
    conversationId: conversation.id,
    toolCallId: `tc-${expense.id}`,
    expense: {
      id: expense.id,
      amount: opts.amount,
      category: opts.category,
      note: opts.note,
      pillar: opts.pillar,
      date: expense.date,
    },
  });
  return { conversation, expense };
}

test("editar un gasto desde el drawer actualiza UI y DB", async ({ page, auth }) => {
  const { userId } = await auth.signupViaOnboarding({
    name: "Editor",
    phoneNumber: "+573000000030",
    ledgerTypes: ["personal"],
  });

  const [ledger] = await testDb
    .select()
    .from(schema.ledgers)
    .where(eq(schema.ledgers.userId, userId));

  const { expense } = await setupExpenseInChat({
    ledgerId: ledger.id,
    amount: 15000,
    category: "café",
    note: "Café de la mañana",
    pillar: "optional",
  });

  // Recargamos para que el chat hidrate la conversación seedeada.
  await page.reload();
  await expect(page.getByText("Gasto registrado")).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText("Café de la mañana")).toBeVisible();

  // Abrimos el drawer haciendo click en el card.
  await page.getByText("Café de la mañana").click();
  await expect(page.getByText("Detalle del gasto")).toBeAttached();

  // Editamos monto y nota.
  const amountInput = page.locator('input[type="number"]');
  await amountInput.fill("25000");
  await page.getByPlaceholder("Descripción").fill("Café con galleta");

  await page.getByRole("button", { name: "Guardar" }).click();

  // El drawer cierra y el card refleja los cambios.
  await expect(page.getByText("Café con galleta")).toBeVisible({ timeout: 5_000 });
  await expect(page.getByText("$25.000", { exact: false })).toBeVisible();

  // DB tiene el cambio aplicado.
  const [updated] = await testDb
    .select()
    .from(schema.transactions)
    .where(eq(schema.transactions.id, expense.id));
  expect(Number(updated.amount)).toBe(25000);
  expect(updated.note).toBe("Café con galleta");
});

test("eliminar un gasto desde el drawer lo quita de UI y DB", async ({ page, auth }) => {
  const { userId } = await auth.signupViaOnboarding({
    name: "Borrador",
    phoneNumber: "+573000000031",
    ledgerTypes: ["personal"],
  });

  const [ledger] = await testDb
    .select()
    .from(schema.ledgers)
    .where(eq(schema.ledgers.userId, userId));

  const { expense } = await setupExpenseInChat({
    ledgerId: ledger.id,
    amount: 50000,
    category: "antojo",
    note: "Compra impulsiva",
    pillar: "extras",
  });

  await page.reload();
  await expect(page.getByText("Compra impulsiva")).toBeVisible({ timeout: 10_000 });

  await page.getByText("Compra impulsiva").click();
  await expect(page.getByText("Detalle del gasto")).toBeAttached();

  await page.getByRole("button", { name: "Eliminar" }).click();

  // El card desaparece tras el borrado.
  await expect(page.getByText("Compra impulsiva")).toBeHidden({ timeout: 5_000 });
  await expect(page.getByText("Gasto registrado")).toBeHidden();

  // DB ya no tiene la transacción.
  const rows = await testDb
    .select()
    .from(schema.transactions)
    .where(eq(schema.transactions.id, expense.id));
  expect(rows).toHaveLength(0);
});
