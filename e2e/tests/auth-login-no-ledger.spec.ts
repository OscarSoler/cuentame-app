import { test, expect } from "../fixtures/auth.fixture";
import { testDb, schema, authSchema } from "../helpers/db";
import { eq } from "drizzle-orm";

test("usuario sin ledger al hacer login es enviado a /setup/ledger y termina en /chat", async ({
  page,
  context,
  auth,
}) => {
  const phoneNumber = "+573000000050";

  // Onboarding completo crea usuario + ledger.
  await auth.signupViaOnboarding({
    name: "Sin Ledger",
    phoneNumber,
    ledgerTypes: ["personal"],
  });

  // Simulamos un usuario que abandonó antes de crear ledger: borramos los suyos.
  const [user] = await testDb
    .select({ id: authSchema.users.id })
    .from(authSchema.users)
    .where(eq(authSchema.users.phoneNumber, phoneNumber))
    .limit(1);
  if (!user) throw new Error("Usuario no encontrado tras onboarding");
  await testDb.delete(schema.ledgers).where(eq(schema.ledgers.userId, user.id));

  // Sesión nueva (cookie limpia) → login OTP.
  await context.clearCookies();
  await auth.loginExisting(phoneNumber);

  // Sin ledger → loginPhoneAction redirige a /onboarding/setup/ledger.
  await expect(page).toHaveURL(/\/onboarding\/setup\/ledger/);

  // Completamos el setup mínimo: sólo personal.
  await page.getByRole("button", { name: /Finanzas personales/ }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  // Tras crear el ledger debe ir a /chat.
  await page.waitForURL("**/chat", { timeout: 15_000 });

  // Y la DB debe tener exactamente un ledger personal del usuario.
  const ledgers = await testDb
    .select()
    .from(schema.ledgers)
    .where(eq(schema.ledgers.userId, user.id));
  expect(ledgers).toHaveLength(1);
  expect(ledgers[0].type).toBe("personal");
});
