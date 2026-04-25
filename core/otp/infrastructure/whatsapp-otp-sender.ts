import { OtpSender } from "../domain/otp-sender";

const TEMPLATE_NAME = "otp";
const TEMPLATE_LANGUAGE = "es_CO";

interface WhatsAppOtpSenderConfig {
  accessToken: string;
  phoneNumberId: string;
}

export class WhatsAppOtpSender implements OtpSender {
  constructor(private config: WhatsAppOtpSenderConfig) {}

  async send({ phoneNumber, code }: { phoneNumber: string; code: string }) {
    const url = `https://graph.facebook.com/v21.0/${this.config.phoneNumberId}/messages`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "template",
        template: {
          name: TEMPLATE_NAME,
          language: { code: TEMPLATE_LANGUAGE },
          components: [
            {
              type: "body",
              parameters: [{ type: "text", text: code }],
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [{ type: "text", text: code }],
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `WhatsApp API error ${response.status}: ${JSON.stringify(error)}`
      );
    }
  }
}
