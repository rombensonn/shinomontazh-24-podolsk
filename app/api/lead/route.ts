import { NextResponse } from "next/server";
import { leadSchema, type StoredLead } from "@/lib/leadValidation";
import { saveLead } from "@/lib/db";
import { sendEmailLead } from "@/lib/email";
import { verifyFormToken } from "@/lib/formToken";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendSmsLead } from "@/lib/sms";
import { sendTelegramLead } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FORM_FILL_TIME_MS = 2500;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

async function parseRequestBody(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = await parseRequestBody(request);

  if (!body) {
    return NextResponse.json(
      {
        success: false,
        error: "Некорректный формат заявки.",
      },
      { status: 400 },
    );
  }

  const parsedLead = leadSchema.safeParse(body);

  if (!parsedLead.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Проверьте поля формы.",
        details: parsedLead.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsedLead.data.company) {
    console.warn("Lead rejected by honeypot field.");

    return NextResponse.json({
      success: true,
      message:
        "Заявка отправлена. Если вопрос срочный, лучше сразу позвонить: +7 (964) 701-00-10.",
    });
  }

  const verifiedFormToken = verifyFormToken(parsedLead.data.formToken);

  if (!verifiedFormToken.ok || verifiedFormToken.timestamp !== parsedLead.data.formStartedAt) {
    console.warn("Lead rejected by invalid form token.");

    return NextResponse.json(
      {
        success: false,
        error: "Обновите страницу и отправьте заявку ещё раз.",
      },
      { status: 400 },
    );
  }

  if (Date.now() - verifiedFormToken.timestamp < MIN_FORM_FILL_TIME_MS) {
    console.warn("Lead rejected by minimum form fill time.");

    return NextResponse.json(
      {
        success: false,
        error: "Пожалуйста, проверьте данные и отправьте заявку ещё раз.",
      },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);
  const rateLimitResult = checkRateLimit(ip);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Слишком много заявок подряд. Попробуйте позже или позвоните.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
        },
      },
    );
  }

  const lead: StoredLead = {
    name: parsedLead.data.name,
    phone: parsedLead.data.phone,
    service: parsedLead.data.service,
    radius: parsedLead.data.radius,
    preferredTime: parsedLead.data.preferredTime,
    comment: parsedLead.data.comment,
    page: parsedLead.data.page || request.headers.get("referer") || "",
    source: parsedLead.data.source || "site",
    ip,
    createdAt: new Date().toISOString(),
  };

  try {
    saveLead(lead);
  } catch (error) {
    console.error("SQLite lead save failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Не удалось сохранить заявку. Если вопрос срочный, лучше позвоните.",
      },
      { status: 500 },
    );
  }

  const notificationResults = await Promise.allSettled([
    sendTelegramLead(lead),
    sendEmailLead(lead),
    sendSmsLead(lead),
  ]);

  notificationResults.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Lead notification failed:", result.reason);
    }
  });

  return NextResponse.json({
    success: true,
    message:
      "Заявка отправлена. Если вопрос срочный, лучше сразу позвонить: +7 (964) 701-00-10.",
  });
}
