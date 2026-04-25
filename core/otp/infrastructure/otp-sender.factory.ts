import { OtpSender } from "../domain/otp-sender";
import { ConsoleOtpSender } from "./console-otp-sender";
import { WhatsAppOtpSender } from "./whatsapp-otp-sender";

export function createOtpSender(): OtpSender {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (process.env.NODE_ENV === "development" && !process.env.WHATSAPP_FORCE) {
    return new ConsoleOtpSender();
  }

  if (!accessToken || !phoneNumberId) {
    throw new Error(
      "Faltan variables de entorno: WHATSAPP_ACCESS_TOKEN y WHATSAPP_PHONE_NUMBER_ID"
    );
  }

  return new WhatsAppOtpSender({ accessToken, phoneNumberId });
}
