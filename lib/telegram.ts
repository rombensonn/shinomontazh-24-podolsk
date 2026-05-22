import type { StoredLead } from "@/lib/leadValidation";

function formatLeadMessage(lead: StoredLead) {
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

export async function sendTelegramLead(lead: StoredLead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram lead delivery skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.");
    return {
      ok: false,
      skipped: true,
    };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadMessage(lead),
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram lead delivery failed: ${response.status} ${errorText}`);
  }

  return {
    ok: true,
    skipped: false,
  };
}
