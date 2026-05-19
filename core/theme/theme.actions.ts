"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import type { Theme } from "./theme.cookie";

export async function setThemeAction(theme: Theme) {
  try {
    const cookieStore = await cookies();
    cookieStore.set("theme", theme, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
