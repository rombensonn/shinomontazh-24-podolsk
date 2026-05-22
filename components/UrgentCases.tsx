import { CircleGauge, Gauge, LifeBuoy, Phone, RotateCw, Wind } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { business } from "@/lib/site";

const cases = [
  {
    title: "Спускает колесо",
    text: "Проверим причину, подскажем вариант ремонта и стоимость до начала работы.",
    icon: Wind,
  },
  {
    title: "Пробило колесо",
    text: "Можно обратиться для ремонта прокола, вулканизации или подбора решения по ситуации.",
    icon: LifeBuoy,
  },
  {
    title: "Бьёт руль после переобувки",
    text: "Проведём балансировку и проверим колесо, чтобы понять причину биения.",
    icon: CircleGauge,
  },
  {
    title: "Нужно срочно переобуться",
    text: "Работаем круглосуточно. В сезон лучше заранее уточнить очередь по телефону.",
    icon: RotateCw,
  },
  {
    title: "Нужно просто проверить давление",
    text: "Можно заехать для проверки и подкачки шин.",
    icon: Gauge,
  },
] as const;

export function UrgentCases() {
  return (
    <MotionSection className="industrial-section section">
      <div className="container-page relative z-10">
        <div className="max-w-3xl">
          <div className="section-kicker">Срочный заезд</div>
          <h2 className="section-title">Поможем, если с колесом проблема прямо сейчас</h2>
          <p className="section-lead">
            Если ситуация срочная, проще сразу позвонить, описать проблему и уточнить
            текущую загрузку перед приездом.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {cases.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="industrial-card p-5">
                <div className="mb-5 flex items-center justify-between border-b border-slate-300 pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-card bg-graphite text-orange-200">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <span className="technical-label">SOS</span>
                </div>
                <h3 className="text-lg font-black text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-card border border-slate-400 bg-[#151a22] p-4 sm:inline-flex">
          <a href={business.phoneHref} className="btn-primary">
            <Phone aria-hidden="true" className="h-5 w-5" />
            Позвонить и уточнить, можно ли подъехать сейчас
          </a>
        </div>
      </div>
    </MotionSection>
  );
}
