import {
  ArrowUpRight,
  Banknote,
  CircleDot,
  CreditCard,
  Gauge,
  PackageCheck,
  Recycle,
  RotateCw,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

const services = [
  {
    title: "Сезонная переобувка",
    text: "Замена летних шин на зимние или зимних на летние. В сезон возможна живая очередь.",
    icon: RotateCw,
    tag: "Смена сезона",
    layout: "feature",
  },
  {
    title: "Балансировка",
    text: "Нужна, если после замены шин появилась вибрация, руль бьёт на скорости или машина стала ехать менее ровно.",
    icon: CircleDot,
    tag: "Вибрация руля",
    layout: "feature",
  },
  {
    title: "Ремонт прокола",
    text: "Подходит, если колесо постепенно спускает или вы заметили саморез, гвоздь или похожую проблему в шине.",
    icon: Wrench,
    tag: "Спускает колесо",
    layout: "feature",
  },
  {
    title: "Вулканизация",
    text: "Вариант ремонта повреждения шины. Возможность ремонта зависит от состояния и места повреждения.",
    icon: ShieldCheck,
    tag: "Ремонт шины",
    layout: "standard",
  },
  {
    title: "Проверка давления",
    text: "Можно заехать, чтобы проверить давление и подкачать шины.",
    icon: Gauge,
    tag: "Быстрая проверка",
    layout: "standard",
  },
  {
    title: "Хранение шин",
    text: "Услуга указана среди особенностей сервиса. Условия и стоимость лучше уточнить по телефону.",
    icon: PackageCheck,
    tag: "Условия по телефону",
    layout: "standard",
  },
  {
    title: "Утилизация шин",
    text: "Дополнительная услуга. Уточните наличие и стоимость перед приездом.",
    icon: Recycle,
    tag: "Уточнить наличие",
    layout: "standard",
  },
  {
    title: "Прокатка дисков",
    text: "Дополнительная услуга. Уточните наличие услуги по телефону.",
    icon: CircleDot,
    tag: "Уточнить наличие",
    layout: "standard",
  },
  {
    title: "Оплата",
    text: "Доступны карта, наличные и банковский перевод.",
    icon: CreditCard,
    tag: "Карта / наличные",
    layout: "standard",
  },
  {
    title: "Скидки и кешбэк",
    text: "Указаны скидки и кешбэк на покупки 5%. Условия лучше уточнить перед оплатой.",
    icon: Banknote,
    tag: "Условия перед оплатой",
    layout: "wide",
  },
] as const;

export function Services() {
  return (
    <MotionSection id="services" className="section bg-[#f7f4ed]">
      <div className="container-page">
        <div className="max-w-3xl">
          <div className="section-kicker">Рабочие посты</div>
          <h2 className="section-title">Услуги шиномонтажа</h2>
          <p className="section-lead">
            Простыми словами: что можно сделать и в какой ситуации обычно обращаются.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFeature = service.layout === "feature";
            const isWide = service.layout === "wide";

            return (
              <article
                key={service.title}
                className={
                  isFeature
                    ? "group relative overflow-hidden rounded-card border border-slate-700 bg-gradient-to-br from-[#101722] via-[#172131] to-[#273545] text-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-soft sm:col-span-2 lg:col-span-4"
                    : `group relative overflow-hidden rounded-card border border-slate-300 bg-[#fffdf7] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-700 hover:shadow-soft ${
                        isWide ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-3"
                      }`
                }
              >
                {isFeature ? (
                  <>
                    <div className="hazard-strip h-2" aria-hidden="true" />
                    <div className="relative p-5">
                      <div
                        className="absolute -right-10 -top-12 h-32 w-32 rounded-full border border-white/10"
                        aria-hidden="true"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="font-mono text-xs font-black text-orange-200">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="mt-3 inline-flex rounded-card border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase text-slate-200">
                            {service.tag}
                          </div>
                        </div>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card border border-white/15 bg-white/10 text-orange-200">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </div>
                      </div>
                      <h3 className="mt-6 text-2xl font-black leading-tight text-white">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{service.text}</p>
                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-black uppercase text-slate-300">
                        <span>Когда обычно обращаются</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="technical-label">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-3 text-xl font-black leading-tight text-foreground">
                          {service.title}
                        </h3>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-slate-300 bg-slate-900 text-orange-200 shadow-sm">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{service.text}</p>
                    <div className="mt-auto pt-5">
                      <span className="inline-flex rounded-card border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-black uppercase text-orange-800">
                        {service.tag}
                      </span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
