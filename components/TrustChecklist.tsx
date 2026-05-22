import { CheckCircle2, Phone, ShieldCheck, Star } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { business } from "@/lib/site";

const checklist = [
  "уточнить итоговую стоимость до начала работ",
  "после переобувки проверить давление",
  "после установки колёс уточнить, всё ли затянуто",
  "при балансировке рассказать мастеру, на какой скорости появляется вибрация",
  "при ремонте прокола уточнить, какой способ ремонта применён",
  "если колесо продолжает спускать: сразу вернуться и показать проблему",
] as const;

const trustFacts = [
  `Рейтинг ${business.rating}`,
  `${business.ratingsCount} оценок`,
  `${business.reviewsCount} отзывов`,
  "круглосуточный режим",
  "оплата картой",
  "гарантия указана среди особенностей, условия уточняются на месте",
] as const;

export function TrustChecklist() {
  return (
    <MotionSection className="section bg-[#f7f4ed]">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="section-kicker">Контрольный лист</div>
          <h2 className="section-title">Что важно проверить перед выездом</h2>
          <p className="section-lead">
            Это не критика сервиса, а понятный контроль результата для водителя. Так
            проще избежать недопонимания по цене, давлению и балансировке.
          </p>

          <ul className="mt-8 grid gap-3">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3 rounded-card border border-slate-400 bg-white/80 p-4">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="font-bold leading-6 text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="industrial-panel p-6">
          <div className="hazard-strip -mx-6 -mt-6 mb-6 h-3" aria-hidden="true" />
          <div className="flex h-12 w-12 items-center justify-center rounded-card bg-primary text-white">
            <ShieldCheck aria-hidden="true" className="h-7 w-7" />
          </div>
          <h3 className="mt-5 text-2xl font-black text-white">Факты, которые указаны в карточке</h3>
          <div className="mt-5 grid gap-3">
            {trustFacts.map((fact) => (
              <div key={fact} className="flex items-start gap-3 text-sm font-bold text-slate-200">
                <Star aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                {fact}
              </div>
            ))}
          </div>
          <a href={business.phoneHref} className="btn-secondary mt-6 w-full border-white/20 bg-white/10 text-white hover:bg-white/15">
            <Phone aria-hidden="true" className="h-5 w-5" />
            Если вопрос срочный, позвонить мастеру
          </a>
        </aside>
      </div>
    </MotionSection>
  );
}
