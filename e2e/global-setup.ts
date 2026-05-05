import { execSync } from "node:child_process";
import path from "node:path";

export default async function globalSetup() {
  const url = process.env.TEST_DATABASE_URL;
  if (!url) {
    throw new Error(
      "TEST_DATABASE_URL no está definido. Revisa e2e/.env.test (usa .env.test.example como plantilla)."
    );
  }

  // drizzle-kit push aplica el schema directamente — no usamos migrate porque
  // este proyecto no commitea migraciones generadas.
  execSync("pnpm exec drizzle-kit push --force", {
    cwd: path.resolve(__dirname, ".."),
    env: { ...process.env, DATABASE_URL: url },
    stdio: "inherit",
  });
}
