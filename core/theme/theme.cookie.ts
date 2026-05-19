import { cookies } from "next/headers";

export type Theme = "default" | "editorial" | "vibrant" | "aurora";

export async function getTheme(): Promise<Theme> {
  const value = (await cookies()).get("theme")?.value;
  if (value === "editorial") return "editorial";
  if (value === "vibrant") return "vibrant";
  if (value === "aurora") return "aurora";
  return "default";
}
