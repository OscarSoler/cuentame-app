import { generateDrizzleJson, generateMigration } from "drizzle-kit/api";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";
import * as authSchema from "@/lib/db/auth-schema";

export default async function globalSetup() {
  const url = process.env.TEST_DATABASE_URL;
  if (!url) {
    throw new Error(
      "TEST_DATABASE_URL no está definido. Revisa e2e/.env.test (usa .env.test.example como plantilla).",
    );
  }

  const current = generateDrizzleJson({ ...schema, ...authSchema });
  const empty = generateDrizzleJson({});
  const statements = await generateMigration(empty, current);

  const client = postgres(url, { max: 1, onnotice: () => {} });
  try {
    await client.unsafe("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
    for (const statement of statements) {
      const trimmed = statement.trim();
      if (trimmed) await client.unsafe(trimmed);
    }
  } catch (err) {
    const cause = err instanceof AggregateError ? err.errors[0] : err;
    const msg = cause instanceof Error ? cause.message : String(cause);
    throw new Error(
      `Fallo aplicando schema de tests en ${url}: ${msg}. ` +
        `¿Está corriendo el contenedor? \`pnpm test:e2e:db:up\``,
    );
  } finally {
    await client.end();
  }
}
