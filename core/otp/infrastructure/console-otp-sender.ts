import { OtpSender } from "../domain/otp-sender";

export class ConsoleOtpSender implements OtpSender {
  async send({ phoneNumber, code }: { phoneNumber: string; code: string }) {
    console.log(`[DEV OTP] ${phoneNumber} → ${code}`);
  }
}
