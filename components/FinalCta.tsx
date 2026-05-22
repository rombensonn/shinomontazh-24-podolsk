import { MapPinned, Phone } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { business } from "@/lib/site";

export function FinalCta() {
  return (
    <MotionSection className="industrial-dark section text-white">
      <div className="container-page">
        <div className="relative z-10 grid gap-6 rounded-card border border-white/15 bg-white/5 p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <div className="section-kicker-dark">Финальный шаг</div>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Нужно решить вопрос с колесом сейчас?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              Позвоните в Шиномонтаж 24: подскажем по загрузке, ориентировочной
              стоимости и возможности подъехать.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
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
        </div>
      </div>
    </MotionSection>
  );
}
