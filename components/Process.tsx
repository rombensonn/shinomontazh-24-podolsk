import { Car, CheckCircle2, ClipboardCheck, PhoneCall, Search, Wrench } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

const steps = [
  {
    title: "Вы звоните или приезжаете",
    text: "Если ситуация срочная или вы едете ночью, лучше сначала позвонить и уточнить загрузку.",
    icon: PhoneCall,
  },
  {
    title: "Мастер смотрит колесо",
    text: "Осматривает проблему: прокол, давление, балансировку, состояние шины или диска.",
    icon: Search,
  },
  {
    title: "Согласовываете работу и цену",
    text: "Стоимость лучше уточнить до начала работ: это помогает избежать недопонимания.",
    icon: ClipboardCheck,
  },
  {
    title: "Выполняется работа",
    text: "Переобувка, балансировка, ремонт прокола или другая услуга по ситуации.",
    icon: Wrench,
  },
  {
    title: "Проверяете результат",
    text: "Перед выездом можно проверить давление, отсутствие явной вибрации и задать вопросы мастеру.",
    icon: CheckCircle2,
  },
] as const;

export function Process() {
  return (
    <MotionSection className="industrial-section section">
      <div className="container-page">
        <div className="relative z-10 max-w-3xl">
          <div className="section-kicker">Технологическая линия</div>
          <h2 className="section-title">Как проходит работа</h2>
          <p className="section-lead">
            Прозрачный порядок помогает заранее понять, что будет происходить с машиной и
            за что вы платите.
          </p>
        </div>

        <div className="relative z-10 mt-8 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article key={step.title} className="industrial-card relative p-5">
                <div className="mb-5 flex items-center justify-between border-b border-slate-300 pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-card bg-graphite text-orange-200">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-3xl font-black text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-black text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </article>
            );
          })}
        </div>

        <div className="relative z-10 mt-8 flex items-center gap-3 rounded-card border border-slate-500 bg-[#151a22] p-4 text-sm font-bold text-slate-100">
          <Car aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
          Точная запись на конкретное время не указана в данных, поэтому лучше звонить и
          уточнять текущую загрузку.
        </div>
      </div>
    </MotionSection>
  );
}
