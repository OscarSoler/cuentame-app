import { desc, eq } from "drizzle-orm";
import { testDb, authSchema } from "./db";

/**
 * Lee el OTP más reciente de la tabla `verifications` para un phoneNumber.
 * Better-auth guarda el código como `${code}:${attempts}` cuando se envía vía
 * sendPhoneNumberOTP, así que extraemos la parte antes del `:`.
 *
 * Hace un poll porque la inserción ocurre dentro del Server Action y la UI
 * vuelve antes de que el commit sea visible.
 */
export async function readOtp(
  phoneNumber: string,
  opts: { timeoutMs?: number; pollMs?: number } = {}
): Promise<string> {
  const timeoutMs = opts.timeoutMs ?? 5_000;
  const pollMs = opts.pollMs ?? 100;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const [row] = await testDb
      .select()
      .from(authSchema.verifications)
      .where(eq(authSchema.verifications.identifier, phoneNumber))
      .orderBy(desc(authSchema.verifications.createdAt))
      .limit(1);

    if (row?.value) {
      const code = row.value.split(":")[0];
      if (/^\d+$/.test(code)) return code;
    }
    await new Promise((r) => setTimeout(r, pollMs));
  }

  throw new Error(
    `No se encontró OTP en \`verifications\` para ${phoneNumber} en ${timeoutMs}ms`
  );
}
