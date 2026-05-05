import { test, expect } from "../fixtures/auth.fixture";
import { testDb, schema, authSchema } from "../helpers/db";
import { eq } from "drizzle-orm";

test("usuario nuevo completa onboarding personal y entra al chat", async ({ page, auth }) => {
  const phoneNumber = "+573000000001";
  const name = "Oscar Test";

  const { userId } = await auth.signupViaOnboarding({
    name,
    phoneNumber,
    ledgerTypes: ["personal"],
  });

  await expect(page).toHaveURL(/\/chat/);

  // Validamos en DB que el usuario existe con teléfono verificado
  const [user] = await testDb
    .select()
    .from(authSchema.users)
    .where(eq(authSchema.users.id, userId));
  expect(user?.phoneNumberVerified).toBe(true);
  expect(user?.phoneNumber).toBe(phoneNumber);

  // Y que tiene exactamente un ledger personal
  const ledgers = await testDb
    .select()
    .from(schema.ledgers)
    .where(eq(schema.ledgers.userId, userId));
  expect(ledgers).toHaveLength(1);
  expect(ledgers[0].type).toBe("personal");
});
