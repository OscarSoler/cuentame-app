export interface OtpSender {
  send(params: { phoneNumber: string; code: string }): Promise<void>;
}
