import { test, expect } from "../fixtures/auth.fixture";

test("usuario existente vuelve por /login y llega a /dashboard", async ({
  page,
  context,
  auth,
}) => {
  const phoneNumber = "+573000000003";

  // Crear el usuario y su ledger via onboarding completo.
  await auth.signupViaOnboarding({
    name: "Usuario Recurrente",
    phoneNumber,
    ledgerTypes: ["personal"],
  });

  // Limpiar cookies para simular un retorno desde otro dispositivo / sesión vencida.
  await context.clearCookies();

  // Login OTP de un usuario que ya tiene ledger → loginPhoneAction redirige a /dashboard.
  await auth.loginExisting(phoneNumber);

  await expect(page).toHaveURL(/\/dashboard/);
});
