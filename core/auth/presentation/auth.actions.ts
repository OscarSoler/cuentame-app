"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/app/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/auth-schema";
import { DrizzleLedgerRepository } from "@/core/ledger/infrastructure/drizzle-ledger.repository";
import { GetLedger } from "@/core/ledger/application/get-ledger";
import { CreateLedger } from "@/core/ledger/application/create-ledger";
import { validateColombianMobile } from "@/lib/phone";

export async function sendPhoneOtpAction(phoneNumber: string) {
  const validation = validateColombianMobile(phoneNumber);
  if (!validation.valid) {
    return { success: false as const, error: validation.error };
  }

  try {
    await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber: validation.e164 },
      headers: await headers(),
    });
    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "No se pudo enviar el código",
    };
  }
}

export async function loginPhoneAction(input: { phoneNumber: string; code: string }) {
  const validation = validateColombianMobile(input.phoneNumber);
  if (!validation.valid) {
    return { success: false as const, error: validation.error };
  }

  let userId: string;
  try {
    const result = await auth.api.verifyPhoneNumber({
      body: { phoneNumber: validation.e164, code: input.code },
      headers: await headers(),
    });
    console.log("[loginPhoneAction] verify result:", JSON.stringify(result));
    if (!result?.user?.id) {
      return { success: false as const, error: "No se pudo crear la sesión" };
    }
    userId = result.user.id;
  } catch (error) {
    console.error("[loginPhoneAction] verify threw:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Código incorrecto",
    };
  }

  const ledgers = await new GetLedger({
    repository: new DrizzleLedgerRepository(),
  }).byUserId(userId);

  redirect(ledgers.length > 0 ? "/dashboard" : "/setup/ledger");
}

export async function signupPhoneAction(input: {
  phoneNumber: string;
  code: string;
  name: string;
  ledgerTypes: Array<"personal" | "business">;
  businessName?: string;
  businessType?: string;
}) {
  const validation = validateColombianMobile(input.phoneNumber);
  if (!validation.valid) {
    return { success: false as const, error: validation.error };
  }

  const trimmedName = input.name.trim();
  if (!trimmedName) {
    return { success: false as const, error: "El nombre es requerido" };
  }

  const types = input.ledgerTypes.length > 0 ? input.ledgerTypes : ["personal" as const];

  let userId: string;
  try {
    const result = await auth.api.verifyPhoneNumber({
      body: { phoneNumber: validation.e164, code: input.code },
      headers: await headers(),
    });
    if (!result?.user?.id) {
      return { success: false as const, error: "No se pudo crear la sesión" };
    }
    userId = result.user.id;
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Código incorrecto",
    };
  }

  // Better Auth crea el usuario con name = phone (getTempName). Lo sobrescribimos
  // por Drizzle directo: auth.api.updateUser exigiría sessionMiddleware y la cookie
  // recién emitida no llega a este request.
  await db
    .update(users)
    .set({ name: trimmedName })
    .where(eq(users.id, userId));

  const createLedger = new CreateLedger({ repository: new DrizzleLedgerRepository() });
  await Promise.all(
    types.map((type) =>
      createLedger.execute({
        userId,
        name: type === "business" ? (input.businessName?.trim() || trimmedName) : trimmedName,
        type,
        businessName: type === "business" ? input.businessName?.trim() ?? null : null,
        businessType: type === "business" ? input.businessType?.trim() ?? null : null,
      }),
    ),
  );

  revalidateTag(`user-ledgers:${userId}`, "max");

  redirect("/chat");
}
