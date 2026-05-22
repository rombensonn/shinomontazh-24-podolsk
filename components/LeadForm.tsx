"use client";

import { useEffect, useId, useState } from "react";
import { Loader2, Send } from "lucide-react";
import {
  preferredTimeOptions,
  radiusOptions,
  serviceOptions,
  type LeadInput,
} from "@/lib/leadValidation";
import { business, withBasePath } from "@/lib/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: Record<string, string[] | undefined>;
}

const inputClassName =
  "focus-ring min-h-12 w-full rounded-card border border-slate-400 bg-[#fffdf7] px-4 py-3 text-base text-foreground outline-none transition placeholder:text-slate-400 hover:border-slate-700";

const labelClassName = "text-sm font-extrabold text-foreground";
const helperClassName = "mt-1 text-sm leading-5 text-slate-600";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

function getSourceFromLocation() {
  if (typeof window === "undefined") {
    return "site";
  }

  const params = new URLSearchParams(window.location.search);

  return params.get("utm_source") || params.get("source") || "site";
}

export function LeadForm() {
  const formId = useId();
  const [formStartedAt, setFormStartedAt] = useState(Date.now());
  const [formToken, setFormToken] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  useEffect(() => {
    if (isStaticExport) {
      setFormStartedAt(Date.now());
      setFormToken("static-export");
      return;
    }

    async function fetchFormToken() {
      try {
        const response = await fetch("/api/lead-token", {
          cache: "no-store",
        });
        const result = (await response.json()) as {
          formStartedAt: number;
          formToken: string;
        };

        setFormStartedAt(result.formStartedAt);
        setFormToken(result.formToken);
      } catch {
        setSubmitState("error");
        setMessage("Не удалось подготовить форму. Если вопрос срочный, лучше позвонить.");
      }
    }

    void fetchFormToken();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (isStaticExport) {
      setSubmitState("error");
      setMessage(
        "На GitHub Pages форма работает как демонстрация без отправки заявки. Если вопрос срочный, лучше сразу позвонить: +7 (964) 701-00-10.",
      );
      setFieldErrors({});
      return;
    }

    const leadPayload: LeadInput = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? serviceOptions[0]) as LeadInput["service"],
      radius: String(formData.get("radius") ?? "не знаю") as LeadInput["radius"],
      preferredTime: String(formData.get("preferredTime") ?? "хочу уточнить") as LeadInput["preferredTime"],
      comment: String(formData.get("comment") ?? ""),
      personalDataConsent: formData.get("personalDataConsent") === "on",
      privacyPolicyConsent: formData.get("privacyPolicyConsent") === "on",
      company: String(formData.get("company") ?? ""),
      formStartedAt,
      formToken,
      page: window.location.href,
      source: getSourceFromLocation(),
    };

    setSubmitState("submitting");
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadPayload),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.success) {
        setSubmitState("error");
        setMessage(result.error || "Не удалось отправить заявку. Можно позвонить по телефону.");
        setFieldErrors(result.details ?? {});
        return;
      }

      form.reset();
      setSubmitState("success");
      setMessage(
        result.message ||
          "Заявка отправлена. Если вопрос срочный, лучше сразу позвонить: +7 (964) 701-00-10.",
      );
      try {
        const tokenResponse = await fetch("/api/lead-token", {
          cache: "no-store",
        });
        const tokenResult = (await tokenResponse.json()) as {
          formStartedAt: number;
          formToken: string;
        };
        setFormStartedAt(tokenResult.formStartedAt);
        setFormToken(tokenResult.formToken);
      } catch {
        setFormToken("");
      }
    } catch {
      setSubmitState("error");
      setMessage("Не удалось отправить заявку. Если вопрос срочный, лучше сразу позвонить.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <section id="lead" className="section bg-[#f7f4ed]">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <div className="section-kicker">Заявка в работу</div>
            <h2 className="section-title">Оставить заявку</h2>
            <p className="section-lead">
              Напишите, что случилось с колесом. Если вопрос срочный, быстрее сразу
              позвонить:{" "}
              <a href={business.phoneHref} className="font-extrabold text-primary hover:text-primary-hover">
                {business.phone}
              </a>
              .
            </p>
            <div className="mt-6 overflow-hidden rounded-card border border-slate-500 bg-[#151a22] text-sm leading-6 text-slate-200">
              <div className="hazard-strip h-3" aria-hidden="true" />
              <div className="p-4">
              Форма не обещает запись на точное время. Мастер сможет перезвонить,
              уточнить задачу, загрузку и ориентировочную стоимость.
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="industrial-card p-5 sm:p-6" noValidate>
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="technical-label">Форма заявки</div>
                <p className="mt-1 text-lg font-black text-foreground">Минимум данных для обратного звонка</p>
              </div>
              <a href={business.phoneHref} className="font-mono text-sm font-black text-primary hover:text-primary-hover">
                {business.phone}
              </a>
            </div>
            <div className="hidden" aria-hidden="true">
              <label htmlFor={`${formId}-company`}>Компания</label>
              <input id={`${formId}-company`} name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${formId}-name`} className={labelClassName}>
                  Имя *
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  className={inputClassName}
                  autoComplete="name"
                  required
                  maxLength={80}
                />
                {fieldErrors.name?.[0] && (
                  <p className="mt-2 text-sm font-semibold text-red-700" role="alert">
                    {fieldErrors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${formId}-phone`} className={labelClassName}>
                  Телефон *
                </label>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  className={inputClassName}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 964 701-00-10"
                  required
                  maxLength={32}
                />
                {fieldErrors.phone?.[0] && (
                  <p className="mt-2 text-sm font-semibold text-red-700" role="alert">
                    {fieldErrors.phone[0]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${formId}-service`} className={labelClassName}>
                  Что нужно сделать *
                </label>
                <select id={`${formId}-service`} name="service" className={inputClassName} required>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`${formId}-radius`} className={labelClassName}>
                  Радиус колёс
                </label>
                <select id={`${formId}-radius`} name="radius" className={inputClassName} defaultValue="не знаю">
                  {radiusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <p className={helperClassName}>Если не знаете, выберите вариант «не знаю».</p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-preferred-time`} className={labelClassName}>
                  Когда удобно *
                </label>
                <select
                  id={`${formId}-preferred-time`}
                  name="preferredTime"
                  className={inputClassName}
                  defaultValue="хочу уточнить"
                  required
                >
                  {preferredTimeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-comment`} className={labelClassName}>
                  Комментарий
                </label>
                <textarea
                  id={`${formId}-comment`}
                  name="comment"
                  className={`${inputClassName} min-h-28 resize-y`}
                  maxLength={1000}
                  placeholder="Например: колесо спускает, есть саморез, бьёт руль на 90 км/ч"
                />
              </div>
            </div>

            <fieldset className="mt-5 grid gap-3">
              <legend className="sr-only">Согласия</legend>
              <label className="flex items-start gap-3 rounded-card border border-slate-300 bg-white/70 p-4 text-sm font-semibold leading-6 text-slate-700">
                <input
                  name="personalDataConsent"
                  type="checkbox"
                  required
                  className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
                />
                <span>Я согласен на обработку персональных данных.</span>
              </label>
              {fieldErrors.personalDataConsent?.[0] && (
                <p className="text-sm font-semibold text-red-700" role="alert">
                  {fieldErrors.personalDataConsent[0]}
                </p>
              )}
              <label className="flex items-start gap-3 rounded-card border border-slate-300 bg-white/70 p-4 text-sm font-semibold leading-6 text-slate-700">
                <input
                  name="privacyPolicyConsent"
                  type="checkbox"
                  required
                  className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
                />
                <span>
                  Я ознакомлен с{" "}
                  <a href={withBasePath("/privacy")} className="text-primary underline-offset-4 hover:underline">
                    политикой обработки персональных данных
                  </a>
                  . Также доступно{" "}
                  <a
                    href={withBasePath("/personal-data-consent")}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    согласие на обработку персональных данных
                  </a>
                  .
                </span>
              </label>
              {fieldErrors.privacyPolicyConsent?.[0] && (
                <p className="text-sm font-semibold text-red-700" role="alert">
                  {fieldErrors.privacyPolicyConsent[0]}
                </p>
              )}
            </fieldset>

            {message && (
              <div
                className={`mt-5 rounded-card border p-4 text-sm font-semibold leading-6 ${
                  submitState === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
                role="status"
                aria-live="polite"
              >
                {message}
              </div>
            )}

            <button type="submit" className="btn-primary mt-6 w-full" disabled={isSubmitting || !formToken}>
              {isSubmitting ? (
                <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
              ) : (
                <Send aria-hidden="true" className="h-5 w-5" />
              )}
              {isSubmitting ? "Отправляем..." : "Отправить заявку"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
