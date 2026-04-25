import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import * as authSchema from "@/lib/db/auth-schema";
import { createOtpSender } from "@/core/otp/infrastructure/otp-sender.factory";

const otpSender = createOtpSender();

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
        await otpSender.send({ phoneNumber, code });
      },
      signUpOnVerification: {
        getTempEmail: (phone) => `${phone.replace("+", "")}@temp.cuentame.app`,
        getTempName: (phone) => phone,
      },
      otpLength: 6,
      expiresIn: 300, // 5 minutos
    }),
    nextCookies(), // debe ir último — propaga Set-Cookie a Server Actions
  ],
});
