import nodemailer from "nodemailer";
import type { StoredLead } from "@/lib/leadValidation";

function hasEmailConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.LEAD_EMAIL_FROM &&
      process.env.LEAD_EMAIL_TO,
  );
}

function formatEmailText(lead: StoredLead) {
  return [
    "Новая заявка с сайта Шиномонтаж 24",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Услуга: ${lead.service}`,
    `Радиус: ${lead.radius}`,
    `Когда удобно: ${lead.preferredTime}`,
    `Комментарий: ${lead.comment || "не указан"}`,
    `Страница: ${lead.page || "не указана"}`,
    `Дата и время: ${lead.createdAt}`,
    `Источник: ${lead.source || "site"}`,
    `IP: ${lead.ip}`,
  ].join("\n");
}

export async function sendEmailLead(lead: StoredLead) {
  if (!hasEmailConfig()) {
    console.info("Email lead delivery skipped: SMTP variables are not fully configured.");
    return {
      ok: false,
      skipped: true,
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });

  await transporter.sendMail({
    from: process.env.LEAD_EMAIL_FROM,
    to: process.env.LEAD_EMAIL_TO,
    subject: "Новая заявка с сайта Шиномонтаж 24",
    text: formatEmailText(lead),
  });

  return {
    ok: true,
    skipped: false,
  };
}
