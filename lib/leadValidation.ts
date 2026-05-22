import { z } from "zod";

export const serviceOptions = [
  "переобуть колёса",
  "балансировка",
  "ремонт прокола",
  "спускает колесо",
  "проверить давление",
  "хранение шин",
  "другое",
] as const;

export const radiusOptions = [
  "R13",
  "R14",
  "R15",
  "R16",
  "R17",
  "R18",
  "R19+",
  "не знаю",
] as const;

export const preferredTimeOptions = [
  "сейчас",
  "сегодня",
  "ночью",
  "завтра",
  "хочу уточнить",
] as const;

const phoneDigitsRegex = /^(\+?7|8)?[\s\-()]*\d{3}[\s\-()]*\d{3}[\s\-()]*\d{2}[\s\-()]*\d{2}$/;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя")
    .max(80, "Имя слишком длинное"),
  phone: z
    .string()
    .trim()
    .min(7, "Укажите телефон")
    .max(32, "Телефон слишком длинный")
    .regex(phoneDigitsRegex, "Укажите телефон в российском формате"),
  service: z.enum(serviceOptions),
  radius: z.enum(radiusOptions),
  preferredTime: z.enum(preferredTimeOptions),
  comment: z.string().trim().max(1000, "Комментарий слишком длинный").optional().default(""),
  personalDataConsent: z
    .boolean()
    .refine((value) => value, "Нужно согласие на обработку персональных данных"),
  privacyPolicyConsent: z
    .boolean()
    .refine((value) => value, "Нужно согласие с политикой обработки персональных данных"),
  company: z.string().max(120).optional().default(""),
  formStartedAt: z.number().int().positive(),
  formToken: z.string().min(20, "Обновите страницу и отправьте форму ещё раз"),
  page: z.string().max(500).optional().default(""),
  source: z.string().max(120).optional().default("site"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface StoredLead {
  name: string;
  phone: string;
  service: (typeof serviceOptions)[number];
  radius: (typeof radiusOptions)[number];
  preferredTime: (typeof preferredTimeOptions)[number];
  comment: string;
  page: string;
  source: string;
  ip: string;
  createdAt: string;
}
