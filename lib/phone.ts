import { parsePhoneNumberFromString } from "libphonenumber-js";

// e164: número en formato internacional estándar E.164 (ej. "+573001234567"),
// el formato que Better Auth y WhatsApp esperan. national: formato local legible (ej. "300 1234567").
export type PhoneValidation =
  | { valid: true; e164: string; national: string }
  | { valid: false; error: string };

export function validateColombianMobile(input: string): PhoneValidation {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, error: "Ingresa tu número de WhatsApp" };
  }

  const parsed = parsePhoneNumberFromString(trimmed, "CO");
  if (!parsed || !parsed.isValid() || parsed.country !== "CO") {
    return { valid: false, error: "Ingresa un número colombiano válido" };
  }

  // Móviles CO empiezan por 3 (10 dígitos nacionales). No usamos getType()
  // porque la versión "core" de libphonenumber-js no incluye metadata de tipo
  // para CO y devuelve undefined incluso para móviles reales.
  if (!/^3\d{9}$/.test(parsed.nationalNumber)) {
    return { valid: false, error: "Debe ser un número móvil colombiano" };
  }

  return {
    valid: true,
    e164: parsed.number,
    national: parsed.formatNational(),
  };
}
