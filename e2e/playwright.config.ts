import { defineConfig, devices } from "@playwright/test";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env.test") });

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  globalSetup: require.resolve("./global-setup"),
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    viewport: { width: 390, height: 844 },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: `next dev -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 120_000,
    cwd: path.resolve(__dirname, ".."),
    env: {
      DATABASE_URL: process.env.TEST_DATABASE_URL!,
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
      BETTER_AUTH_URL: BASE_URL,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "sk-test-fake",
      NEXT_PUBLIC_APP_URL: BASE_URL,
      NODE_ENV: "development",
      WHATSAPP_FORCE: "false",
    },
  },
});
