import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as authSchema from "@/lib/db/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: authSchema.users,
      session: authSchema.sessions,
      account: authSchema.accounts,
      verification: authSchema.verifications,
    },
  }),
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`[DEV OTP] ${phoneNumber} → ${code}`);
          return;
        }
        // TODO: enviar código via WhatsApp Business API
      },
      signUpOnVerification: {
        getTempEmail: (phone) => `${phone.replace("+", "")}@temp.cuentame.app`,
        getTempName: (phone) => phone,
      },
      otpLength: 6,
      expiresIn: 300, // 5 minutos
    }),
  ],
});
