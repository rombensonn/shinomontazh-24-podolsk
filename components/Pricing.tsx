import { Phone } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { business } from "@/lib/site";

const priceRows = [
  ["Переобуть все колёса", "1500-2000 ₽"],
  ["Балансировка", "стоимость уточняется по радиусу"],
  ["Ремонт прокола", "стоимость уточняется после осмотра"],
  ["Проверка давления", "уточнить по телефону"],
  ["Хранение шин", "уточнить условия"],
  ["Утилизация шин", "уточнить наличие и стоимость"],
  ["Прокатка дисков", "уточнить наличие услуги"],
] as const;

export function Pricing() {
  return (
    <MotionSection id="pricing" className="industrial-dark section">
      <div className="container-page">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="section-kicker-dark">Прайс-табло</div>
            <h2 className="section-title text-white">Ориентиры по стоимости</h2>
            <p className="section-lead text-slate-200">
              Итоговая цена зависит от радиуса колёс, состояния шин и объёма работ.
              Перед началом работ лучше уточнить стоимость у мастера.
            </p>
            <div className="mt-6 rounded-card border border-warning/60 bg-warning/10 p-4">
              <p className="text-base font-black text-orange-100">
                Чтобы избежать недопонимания, уточните стоимость до начала работ.
              </p>
            </div>
            <a href={business.phoneHref} className="btn-primary mt-6">
              <Phone aria-hidden="true" className="h-5 w-5" />
              Уточнить цену по телефону
            </a>
          </div>

          <div className="overflow-hidden rounded-card border border-white/15 bg-[#151a22] shadow-card">
            <div className="hazard-strip h-3" aria-hidden="true" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <caption className="sr-only">Ориентиры по стоимости услуг шиномонтажа</caption>
                <thead className="bg-white/10 text-sm text-slate-200">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-black">
                      Услуга
                    </th>
                    <th scope="col" className="px-5 py-4 font-black">
                      Ориентир
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {priceRows.map(([service, price]) => (
                    <tr key={service}>
                      <th scope="row" className="px-5 py-4 font-bold text-white">
                        {service}
                      </th>
                      <td className="px-5 py-4 font-mono text-slate-200">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
