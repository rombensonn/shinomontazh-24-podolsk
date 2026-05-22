import Image from "next/image";
import { BadgeCheck, CreditCard, MapPinned, Phone, Star, Wrench } from "lucide-react";
import { business, withBasePath } from "@/lib/site";
import { MotionSection } from "@/components/MotionSection";

const heroBullets = [
  "24/7: удобно при срочной проблеме с колесом",
  "Оплата картой, наличными или переводом",
  "Переобуть все колёса: ориентир 1500-2000 ₽",
] as const;

export function Hero() {
  return (
    <MotionSection id="top" className="industrial-dark section pt-8 sm:pt-12">
      <div className="container-page relative z-10 grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="section-kicker-dark">
            <Wrench aria-hidden="true" className="h-4 w-4" />
            Круглосуточный шиномонтаж в Подольске
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] text-white sm:text-5xl lg:text-7xl">
            Круглосуточный шиномонтаж в Подольске
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
            Переобувка, балансировка, ремонт проколов и проверка давления на ул.
            Академика Доллежаля, 42. Работаем 24 часа: можно приехать днём,
            вечером или ночью.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {heroBullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-3 rounded-card border border-white/15 bg-white/10 p-3"
              >
                <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                <span className="text-sm font-bold leading-6 text-slate-100">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 hidden flex-col gap-3 sm:flex sm:flex-row sm:flex-wrap">
            <a href={business.phoneHref} className="btn-primary">
              <Phone aria-hidden="true" className="h-5 w-5" />
              Позвонить сейчас
            </a>
            <a href="#lead" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15">
              Оставить заявку
            </a>
            <a href={business.routeUrl} target="_blank" rel="noreferrer" className="btn-route">
              <MapPinned aria-hidden="true" className="h-5 w-5" />
              Построить маршрут
            </a>
          </div>

          <p className="mt-4 border-l-4 border-warning pl-3 text-sm font-bold text-slate-300">
            В сезон переобувки лучше уточнить очередь по телефону.
          </p>
        </div>

        <div className="industrial-panel overflow-hidden">
          <div className="hazard-strip h-3" aria-hidden="true" />
          <div className="grid gap-0 sm:grid-cols-[1fr_190px] lg:grid-cols-1">
            <div className="relative aspect-[4/3] bg-slate-900">
              <Image
                src={withBasePath("/hero-tire-service-phone.webp")}
                alt="Фото-образ шиномонтажного поста с колесом на балансировочном станке"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 rounded-card border border-white/15 bg-black/45 px-3 py-2 text-xs font-black uppercase text-orange-100">
                Фото-образ
              </div>
            </div>
            <div className="grid gap-3 border-t border-white/10 bg-[#151a22] p-5 sm:border-l sm:border-t-0 lg:border-l-0 lg:border-t">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <span className="technical-label-dark">Рейтинг</span>
                <span className="flex items-center gap-1 text-2xl font-black text-white">
                  <Star aria-hidden="true" className="h-5 w-5 fill-primary text-primary" />
                  {business.rating}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                <span>Оценок</span>
                <strong>{business.ratingsCount}</strong>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                <span>Отзывов</span>
                <strong>{business.reviewsCount}</strong>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                <span>Оплата</span>
                <strong className="inline-flex items-center gap-1">
                  <CreditCard aria-hidden="true" className="h-4 w-4 text-primary" />
                  карта / наличные
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
