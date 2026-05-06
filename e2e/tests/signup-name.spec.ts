import { test, expect } from "../fixtures/auth.fixture";
import { testDb, schema, authSchema } from "../helpers/db";
import { eq } from "drizzle-orm";

test("signup persiste el nombre real (no el teléfono) y crea ledger personal", async ({
  page,
  auth,
}) => {
  const phoneNumber = "+573000000060";
  const name = "Oscar Test";

  await auth.signupViaOnboarding({ name, phoneNumber, ledgerTypes: ["personal"] });

  await expect(page).toHaveURL(/\/chat/);

  const [user] = await testDb
    .select()
    .from(authSchema.users)
    .where(eq(authSchema.users.phoneNumber, phoneNumber))
    .limit(1);
  if (!user) throw new Error("Usuario no encontrado en DB");

  expect(user.name).toBe(name);
  expect(user.phoneNumber).toBe(phoneNumber);

  const ledgers = await testDb
    .select()
    .from(schema.ledgers)
    .where(eq(schema.ledgers.userId, user.id));

  expect(ledgers).toHaveLength(1);
  expect(ledgers[0].type).toBe("personal");
  expect(ledgers[0].name).toBe(name);
});
