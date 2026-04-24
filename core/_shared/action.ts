import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/app/lib/auth";

/**
 * Obtiene la sesión actual o lanza si no hay usuario autenticado.
 * Cacheado a nivel de request con `React.cache` — múltiples llamadas en el
 * mismo render comparten una sola lectura de cookies + query de sesión.
 */
export const requireSession = cache(async () => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session) throw new Error("No autenticado");
  return session;
});

/**
 * Normaliza cualquier error a string para devolver al cliente.
 */
export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Envuelve el cuerpo de un Server Action en el shape estándar
 * `{ success, data?, error? }` sin que cada action lo repita.
 *
 * @example
 * export const getFooAction = () =>
 *   wrapAction(async () => {
 *     await requireSession();
 *     return useCase.execute();
 *   });
 */
export async function wrapAction<T>(
  fn: () => Promise<T>,
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: errorMessage(error) };
  }
}

/**
 * Desenvuelve el resultado de un action y devuelve el `data` o el `fallback`
 * si la acción falló. Complemento client-side de `wrapAction`.
 */
export function unwrap<T, F>(
  result: { success: true; data: T } | { success: false; error: string },
  fallback: F,
): T | F {
  return result.success ? result.data : fallback;
}
