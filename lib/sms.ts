import type { StoredLead } from "@/lib/leadValidation";

export interface SmsProviderPayload {
  to: string;
  text: string;
  lead: StoredLead;
}

export type SmsProvider = (payload: SmsProviderPayload) => Promise<void>;

export async function sendSmsLead(lead: StoredLead, provider?: SmsProvider) {
  const smsToPhone = process.env.SMS_TO_PHONE;

  if (!provider || !smsToPhone) {
    console.info("SMS lead delivery skipped: SMS provider is not connected.");
    return {
      ok: false,
      skipped: true,
    };
  }

  await provider({
    to: smsToPhone,
    text: `Новая заявка Шиномонтаж 24: ${lead.phone}, ${lead.service}, ${lead.preferredTime}`,
    lead,
  });

  return {
    ok: true,
    skipped: false,
  };
}
