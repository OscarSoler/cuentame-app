import { test, expect } from "../fixtures/auth.fixture";
import { mockAi } from "../fixtures/mock-ai";
import { seedExpense } from "../helpers/seed";
import { testDb, schema, authSchema } from "../helpers/db";
import { eq } from "drizzle-orm";

test("usuario registra un gasto desde el chat y aparece la tarjeta", async ({
  page,
  auth,
}) => {
  // 1. Onboarding — deja al usuario autenticado en /chat con un ledger personal.
  const phoneNumber = "+573000000002";
  const { userId } = await auth.signupViaOnboarding({
    name: "Tester Gasto",
    phoneNumber,
    ledgerTypes: ["personal"],
  });

  // 2. Buscamos el ledger creado para usar su id.
  const [ledger] = await testDb
    .select()
    .from(schema.ledgers)
    .where(eq(schema.ledgers.userId, userId));
  expect(ledger).toBeDefined();

  // 3. El tool real (registerExpense) escribe la fila en DB durante el stream.
  //    Como interceptamos /api/chat, emulamos ese side-effect insertando la
  //    transacción y devolvemos su id en el output del mock.
  const expense = await seedExpense({
    ledgerId: ledger.id,
    amount: 20000,
    category: "almuerzo",
    note: "Almuerzo del día",
    pillar: "survival",
  });

  // 4. Programamos el mock antes de enviar el mensaje.
  await mockAi(page, {
    text: "Listo, registré tu gasto.",
    toolCalls: [
      {
        name: "registerExpense",
        input: {
          amount: 20000,
          category: "almuerzo",
          note: "gasté 20.000 en almuerzo",
          pillar: "survival",
        },
        output: {
          id: expense.id,
          amount: 20000,
          type: "expense",
          category: "almuerzo",
          note: "Almuerzo del día",
          pillar: "survival",
          date: expense.date,
          status: "registered",
        },
      },
    ],
  });

  // 5. El usuario ya está en /chat. Escribimos el mensaje.
  await page.getByPlaceholder("Escribe un mensaje...").fill("gasté 20.000 en almuerzo");
  await page.locator('button[type="submit"]').click();

  // 6. Validamos que aparece la ExpenseCard.
  await expect(page.getByText("Gasto registrado")).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText("$20.000", { exact: false })).toBeVisible();
  await expect(page.getByText("Almuerzo del día")).toBeVisible();
  await expect(page.getByText("#almuerzo")).toBeVisible();

  // 7. Verificamos en DB que la transacción quedó persistida.
  const rows = await testDb
    .select()
    .from(schema.transactions)
    .where(eq(schema.transactions.ledgerId, ledger.id));
  expect(rows).toHaveLength(1);
  expect(rows[0].type).toBe("expense");
  expect(rows[0].category).toBe("almuerzo");
  expect(Number(rows[0].amount)).toBe(20000);
});
