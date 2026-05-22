import { MessageSquareQuote, Star } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { business } from "@/lib/site";

const reviews = [
  {
    name: "Александр Дмитриевич С.",
    text: "Отмечал, что после другого шиномонтажа нашли причину биения руля и исправили проблему.",
  },
  {
    name: "Евгений Зубков",
    text: "Писал, что колесо постоянно спускало, а проблему решили примерно за 15 минут.",
  },
  {
    name: "Сергей Воробьев",
    text: "Выделял скорость работы, круглосуточный режим и адекватные цены в сезон.",
  },
  {
    name: "Георгий Райков",
    text: "Отмечал, что после снятия машины с домкратов болты протянули динамометрическим ключом.",
  },
  {
    name: "Алексей Яковлевич М.",
    text: "Писал, что обслуживается много лет и ему удобно, что сервис работает 24/7.",
  },
  {
    name: "Евгения Ильина",
    text: "Отмечала, что утром быстро поменяли колёса, а круглосуточный режим оказался удобным.",
  },
  {
    name: "Трусов Павел",
    text: "Указывал, что делал переобувку ночью и сервис действительно работает 24 часа.",
  },
] as const;

export function Reviews() {
  return (
    <MotionSection id="reviews" className="industrial-section section">
      <div className="container-page">
        <div className="relative z-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="section-kicker">Социальное доказательство</div>
            <h2 className="section-title">Отзывы клиентов</h2>
            <p className="section-lead">
              Отзывы на картах разные, но чаще клиенты отмечают круглосуточный режим,
              скорость и помощь при срочных проблемах.
            </p>
          </div>
          <div className="industrial-panel flex items-center gap-3 px-5 py-4">
            <Star aria-hidden="true" className="h-6 w-6 fill-warning text-warning" />
            <div>
              <div className="text-2xl font-black text-white">{business.rating}</div>
              <div className="text-sm font-bold text-slate-300">
                {business.ratingsCount} оценок, {business.reviewsCount} отзывов
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="industrial-card p-5">
              <div className="flex items-center justify-between border-b border-slate-300 pb-4">
                <MessageSquareQuote aria-hidden="true" className="h-6 w-6 text-primary" />
                <span className="technical-label">Карты</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">{review.text}</p>
              <h3 className="mt-4 text-base font-black text-foreground">{review.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
