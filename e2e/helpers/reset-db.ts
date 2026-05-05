import { sql } from "drizzle-orm";
import { testDb } from "./db";

// TRUNCATE en orden para evitar problemas de FK. CASCADE limpia dependientes.
const TABLES = [
  "messages",
  "conversations",
  "transactions",
  "budgets",
  "reflections",
  "ledgers",
  "profiles",
  "verifications",
  "sessions",
  "accounts",
  "users",
];

export async function resetDb() {
  await testDb.execute(
    sql.raw(`TRUNCATE TABLE ${TABLES.map((t) => `"${t}"`).join(", ")} RESTART IDENTITY CASCADE`)
  );
}
