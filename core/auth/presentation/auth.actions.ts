"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { DrizzleLedgerRepository } from "@/core/ledger/infrastructure/drizzle-ledger.repository";
import { GetLedger } from "@/core/ledger/application/get-ledger";
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
  name?: string;
}) {
  const validation = validateColombianMobile(input.phoneNumber);
  if (!validation.valid) {
    return { success: false as const, error: validation.error };
  }

  let userId: string;
  let userName: string;
  try {
    const result = await auth.api.verifyPhoneNumber({
      body: { phoneNumber: validation.e164, code: input.code },
      headers: await headers(),
    });
    if (!result?.user?.id) {
      return { success: false as const, error: "No se pudo crear la sesión" };
    }
    userId = result.user.id;
    userName = result.user.name;
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Código incorrecto",
    };
  }

  const trimmed = input.name?.trim();
  const isFreshUser = userName === validation.e164;
  if (trimmed && isFreshUser) {
    try {
      await auth.api.updateUser({
        body: { name: trimmed },
        headers: await headers(),
      });
    } catch (error) {
      console.error("[signupPhoneAction] no se pudo actualizar el nombre:", error);
    }
  }

  const ledgers = await new GetLedger({
    repository: new DrizzleLedgerRepository(),
  }).byUserId(userId);

  return { success: true as const, hasLedgers: ledgers.length > 0 };
}
