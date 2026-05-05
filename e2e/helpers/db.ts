import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";
import * as authSchema from "@/lib/db/auth-schema";

const url = process.env.TEST_DATABASE_URL;
if (!url) {
  throw new Error("TEST_DATABASE_URL no está definido en el entorno de tests.");
}

const client = postgres(url, { max: 4 });
export const testDb = drizzle(client, { schema: { ...schema, ...authSchema } });
export { schema, authSchema };
