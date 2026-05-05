import { test, expect } from "../fixtures/auth.fixture";
import {
  seedConversation,
  seedMessage,
} from "../helpers/seed";
import { testDb, schema } from "../helpers/db";
import { eq } from "drizzle-orm";

test("la conversación previa se rehidrata al volver al chat", async ({
  page,
  auth,
}) => {
  const phoneNumber = "+573000000004";
  const { userId } = await auth.signupViaOnboarding({
    name: "Tester Historial",
    phoneNumber,
    ledgerTypes: ["personal"],
  });

  const [ledger] = await testDb
    .select()
    .from(schema.ledgers)
    .where(eq(schema.ledgers.userId, userId));

  // Pre-seedeamos una conversación con dos mensajes para emular el resultado
  // de un chat anterior persistido por onFinish del endpoint real.
  const conversation = await seedConversation({ ledgerId: ledger.id });
  await seedMessage({
    conversationId: conversation.id,
    role: "user",
    text: "¿cuánto gasté esta semana?",
  });
  await seedMessage({
    conversationId: conversation.id,
    role: "assistant",
    text: "Gastaste $80.000 esta semana.",
  });

  // Recargamos /chat — getOrCreateLatestConversationAction debe traer la
  // conversación existente, y getConversationMessagesAction sus mensajes.
  await page.reload();
  await expect(page).toHaveURL(/\/chat/);

  await expect(page.getByText("¿cuánto gasté esta semana?")).toBeVisible({
    timeout: 10_000,
  });
  await expect(page.getByText("Gastaste $80.000 esta semana.")).toBeVisible();
});
