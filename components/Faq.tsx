import { HelpCircle } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

const faqItems = [
  {
    question: "Вы действительно работаете ночью?",
    answer:
      "Да, шиномонтаж работает круглосуточно. Если едете ночью или в сезон переобувки, лучше заранее позвонить и уточнить загрузку.",
  },
  {
    question: "Можно ли оплатить картой?",
    answer: "Да, доступна оплата картой. Также указаны наличные и банковский перевод.",
  },
  {
    question: "Сколько стоит переобуть колёса?",
    answer:
      "В карточке указан ориентир 1500-2000 ₽ за переобувку всех колёс. Итоговая цена зависит от радиуса и объёма работ, поэтому её лучше уточнить до начала.",
  },
  {
    question: "Делаете балансировку?",
    answer:
      "Да, балансировка указана среди услуг. Если есть биение руля, расскажите мастеру, на какой скорости оно появляется.",
  },
  {
    question: "Можно приехать с проколом?",
    answer:
      "Да, можно обратиться по поводу прокола или спускающего колеса. Возможность ремонта зависит от повреждения.",
  },
  {
    question: "Есть хранение шин?",
    answer:
      "Да, хранение шин указано среди особенностей. Условия и стоимость лучше уточнить по телефону.",
  },
  {
    question: "Есть ли гарантия?",
    answer:
      "Гарантия указана среди особенностей сервиса. Конкретные условия лучше уточнить у мастера перед работой.",
  },
  {
    question: "Есть ли запись?",
    answer:
      "Точная запись не подтверждена владельцем. Лучше позвонить и уточнить текущую загрузку.",
  },
] as const;

export function Faq() {
  return (
    <MotionSection className="section bg-[#f7f4ed]">
      <div className="container-page">
        <div className="max-w-3xl">
          <div className="section-kicker">Перед звонком</div>
          <h2 className="section-title">Вопросы и ответы</h2>
          <p className="section-lead">
            Короткие ответы на вопросы, которые обычно возникают перед звонком или приездом.
          </p>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          {faqItems.map((item) => (
            <details key={item.question} className="industrial-card group p-5 open:border-primary">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-black text-foreground">
                <span className="flex gap-3">
                  <HelpCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item.question}
                </span>
                <span className="mt-1 font-mono text-primary transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-4 pl-8 text-sm leading-6 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
