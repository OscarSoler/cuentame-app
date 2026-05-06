/**
 * delete-user.ts — Script CLI para eliminar un usuario por número de teléfono.
 *
 * Borra el usuario y TODOS sus datos asociados:
 *   - profile
 *   - sessions y accounts (better-auth)
 *   - ledgers del usuario
 *   - transactions, budgets, reflections de esos ledgers
 *   - conversations y messages de esos ledgers
 *
 * El borrado se ejecuta dentro de una transacción de Postgres: si algo falla,
 * no se elimina nada. Antes de borrar pide confirmación escribiendo "borrar".
 *
 * Requisitos:
 *   - Variable de entorno DATABASE_URL definida (se lee de .env automáticamente).
 *   - El teléfono debe ser un móvil colombiano válido (validado con
 *     `validateColombianMobile`); se normaliza a formato E.164 antes de buscar.
 *
 * Uso:
 *
 *   # Modo interactivo (pregunta el teléfono):
 *   npm run delete-user
 *
 *   # Pasando el teléfono como argumento:
 *   npm run delete-user -- 3001234567
 *   npm run delete-user -- "+57 300 123 4567"
 *
 *   # Invocación directa (sin npm):
 *   npx tsx --tsconfig tsconfig.json scripts/delete-user.ts 3001234567
 *
 * Salidas:
 *   - 0  → usuario eliminado, o cancelado por el usuario.
 *   - 1  → teléfono inválido, usuario no encontrado, o error de BD.
 */

import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, sessions, accounts } from "@/lib/db/auth-schema";
import {
  profiles,
  ledgers,
  transactions,
  budgets,
  reflections,
  conversations,
  messages,
} from "@/lib/db/schema";

type PhoneValidation =
  | { valid: true; e164: string }
  | { valid: false; error: string };

function validateColombianMobile(input: string): PhoneValidation {
  const digits = input.replace(/[^\d]/g, "");
  if (!digits) return { valid: false, error: "Ingresa un número" };

  const national = digits.startsWith("57") ? digits.slice(2) : digits;
  if (!/^3\d{9}$/.test(national)) {
    return {
      valid: false,
      error: "Debe ser un móvil colombiano (10 dígitos empezando por 3)",
    };
  }
  return { valid: true, e164: `+57${national}` };
}

async function main() {
  const rl = createInterface({ input, output });

  const argPhone = process.argv.slice(2).find((a) => a && a !== "--");
  const rawPhone =
    argPhone?.trim() || (await rl.question("Número de teléfono (CO): "));

  const validation = validateColombianMobile(rawPhone);
  if (!validation.valid) {
    console.error(`✗ ${validation.error}`);
    rl.close();
    process.exit(1);
  }

  const phone = validation.e164;
  console.log(`\nBuscando usuario con teléfono ${phone}...`);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.phoneNumber, phone))
    .limit(1);

  if (!user) {
    console.error(`✗ No se encontró ningún usuario con el teléfono ${phone}`);
    rl.close();
    process.exit(1);
  }

  const userLedgers = await db
    .select({ id: ledgers.id, name: ledgers.name })
    .from(ledgers)
    .where(eq(ledgers.userId, user.id));

  const ledgerIds = userLedgers.map((l) => l.id);

  const txCount = ledgerIds.length
    ? (
        await db
          .select({ id: transactions.id })
          .from(transactions)
          .where(inArray(transactions.ledgerId, ledgerIds))
      ).length
    : 0;

  console.log(`\nUsuario encontrado:`);
  console.log(`  id:    ${user.id}`);
  console.log(`  name:  ${user.name}`);
  console.log(`  email: ${user.email}`);
  console.log(`  phone: ${user.phoneNumber}`);
  console.log(`  ledgers: ${userLedgers.length}`);
  console.log(`  transactions: ${txCount}`);

  const confirm = await rl.question(
    `\n¿Eliminar este usuario y todos sus datos? (escribe "borrar" para confirmar): `
  );
  rl.close();

  if (confirm.trim().toLowerCase() !== "borrar") {
    console.log("Cancelado.");
    process.exit(0);
  }

  await db.transaction(async (tx) => {
    if (ledgerIds.length) {
      const conv = await tx
        .select({ id: conversations.id })
        .from(conversations)
        .where(inArray(conversations.ledgerId, ledgerIds));
      const conversationIds = conv.map((c) => c.id);

      if (conversationIds.length) {
        await tx
          .delete(messages)
          .where(inArray(messages.conversationId, conversationIds));
        await tx
          .delete(conversations)
          .where(inArray(conversations.id, conversationIds));
      }

      await tx
        .delete(transactions)
        .where(inArray(transactions.ledgerId, ledgerIds));
      await tx.delete(budgets).where(inArray(budgets.ledgerId, ledgerIds));
      await tx
        .delete(reflections)
        .where(inArray(reflections.ledgerId, ledgerIds));
      await tx.delete(ledgers).where(eq(ledgers.userId, user.id));
    }

    await tx.delete(profiles).where(eq(profiles.id, user.id));
    await tx.delete(sessions).where(eq(sessions.userId, user.id));
    await tx.delete(accounts).where(eq(accounts.userId, user.id));
    await tx.delete(users).where(eq(users.id, user.id));
  });

  console.log(`\n✓ Usuario ${phone} eliminado junto con sus ledgers y transacciones.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("\n✗ Error:", err);
  process.exit(1);
});
