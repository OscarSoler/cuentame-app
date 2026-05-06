import { test as base, expect, type Page } from "@playwright/test";
import { resetDb } from "../helpers/reset-db";
import { readOtp } from "../helpers/otp";
import { seedLedger } from "../helpers/seed";
import { testDb, authSchema } from "../helpers/db";
import { eq } from "drizzle-orm";

export interface AuthHelpers {
  /**
   * Recorre todo el onboarding (steps welcome → ready) y deja al usuario
   * dentro de la app autenticado con un ledger personal.
   * Devuelve los datos del usuario creado.
   */
  signupViaOnboarding: (input: {
    name: string;
    phoneNumber: string;
    ledgerTypes?: Array<"personal" | "business">;
    business?: { name: string; type: string };
  }) => Promise<{ userId: string; phoneNumber: string }>;

  /**
   * Login de un usuario que ya existe (con ledger ya creado en DB).
   */
  loginExisting: (phoneNumber: string) => Promise<void>;
}

type Fixtures = {
  cleanDb: void;
  auth: AuthHelpers;
};

export const test = base.extend<Fixtures>({
  cleanDb: [
    async ({}, use) => {
      await resetDb();
      await use();
    },
    { auto: true },
  ],

  auth: async ({ page }, use) => {
    const helpers: AuthHelpers = {
      async signupViaOnboarding({ name, phoneNumber, ledgerTypes = ["personal"], business }) {
        await page.goto("/");

        // Step 0: Welcome
        await page.getByRole("button", { name: "Empezar Mi Camino" }).click();

        // Step 1: Philosophy
        await page.getByRole("button", { name: "Continuar" }).click();

        // Step 2: Name
        await page.getByPlaceholder("Tu nombre").fill(name);
        await page.getByRole("button", { name: "Continuar" }).click();

        // Step 3: Ledger type
        if (ledgerTypes.includes("personal")) {
          await page.getByRole("button", { name: /Finanzas personales/ }).click();
        }
        if (ledgerTypes.includes("business")) {
          await page.getByRole("button", { name: /Negocio o emprendimiento/ }).click();
        }
        await page.getByRole("button", { name: "Continuar" }).click();

        // Step 4 (sólo si hay business): BusinessSetup
        if (ledgerTypes.includes("business") && business) {
          await page.getByPlaceholder(/nombre/i).first().fill(business.name);
          // El selector exacto del businessType depende del componente — se ajusta cuando lo escribamos.
          await page.getByRole("button", { name: business.type }).click();
          await page.getByRole("button", { name: "Continuar" }).click();
        }

        // Step 5: Phone — el form prefija +57, sólo escribimos los 10 dígitos nacionales.
        await page.locator('input[type="tel"]').fill(phoneNumber.replace(/^\+57/, ""));
        await page.getByRole("button", { name: "Continuar" }).click();

        // OTP
        const code = await readOtp(phoneNumber);
        await fillOtp(page, code);

        // Step 6: Ready → /setup → /chat
        await page.getByRole("button", { name: "Comenzar" }).click();
        await page.waitForURL("**/chat", { timeout: 15_000 });

        const [user] = await testDb
          .select()
          .from(authSchema.users)
          .where(eq(authSchema.users.phoneNumber, phoneNumber))
          .limit(1);
        if (!user) throw new Error(`Usuario ${phoneNumber} no creado tras onboarding`);

        return { userId: user.id, phoneNumber };
      },

      async loginExisting(phoneNumber) {
        await page.goto("/login");
        await page.locator('input[type="tel"]').fill(phoneNumber.replace(/^\+57/, ""));
        await page.getByRole("button", { name: "Continuar" }).click();
        const code = await readOtp(phoneNumber);
        await fillOtp(page, code);
        await page.waitForURL((url) => !url.pathname.startsWith("/login"), {
          timeout: 15_000,
        });
      },
    };

    await use(helpers);
  },
});

export { expect, seedLedger };

async function fillOtp(page: Page, code: string) {
  // input-otp expone un único <input> nativo con autocomplete="one-time-code"
  // que acepta toda la cadena de una vez.
  await page.locator("input[autocomplete='one-time-code']").first().fill(code);
}
