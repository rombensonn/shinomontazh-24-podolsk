import { Clock3, MapPinned, Phone } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { business } from "@/lib/site";

export function Contacts() {
  return (
    <MotionSection id="contacts" className="industrial-dark section">
      <div className="container-page">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <div className="section-kicker-dark">Как добраться</div>
            <h2 className="section-title text-white">Контакты</h2>
            <p className="section-lead text-slate-200">
              Перед приездом в сезон лучше уточнить очередь по телефону.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="industrial-panel p-5">
                <div className="technical-label-dark">Название</div>
                <div className="mt-1 text-xl font-black text-white">{business.name}</div>
              </div>
              <div className="industrial-panel p-5">
                <div className="flex items-start gap-3">
                  <MapPinned aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <div className="technical-label-dark">Адрес</div>
                    <div className="mt-1 text-lg font-black text-white">{business.address}</div>
                  </div>
                </div>
              </div>
              <div className="industrial-panel p-5">
                <div className="flex items-start gap-3">
                  <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <div className="technical-label-dark">Телефон</div>
                    <a
                      href={business.phoneHref}
                      className="focus-ring mt-1 inline-block rounded-card text-lg font-black text-white hover:text-orange-200"
                    >
                      {business.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="industrial-panel p-5">
                <div className="flex items-start gap-3">
                  <Clock3 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <div className="technical-label-dark">Режим</div>
                    <div className="mt-1 text-lg font-black text-white">{business.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={business.phoneHref} className="btn-primary">
                <Phone aria-hidden="true" className="h-5 w-5" />
                Позвонить
              </a>
              <a href={business.routeUrl} target="_blank" rel="noreferrer" className="btn-route">
                <MapPinned aria-hidden="true" className="h-5 w-5" />
                Построить маршрут
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-card border border-white/15 bg-[#151a22] shadow-card">
            <div className="hazard-strip h-3" aria-hidden="true" />
            <div className="relative h-full min-h-[420px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-slate-300">
                <MapPinned aria-hidden="true" className="h-10 w-10 text-primary" />
                <div className="text-lg font-black text-white">Загружается Яндекс Карта</div>
                <p className="max-w-md text-sm leading-6">
                  Карточка организации {business.name}: {business.address}
                </p>
              </div>
              <iframe
                title="Яндекс Карта: Шиномонтаж 24, ул. Академика Доллежаля, 42, корп. 1, Подольск"
                src={business.mapEmbedUrl}
                className="absolute inset-0 z-10 h-full w-full border-0 bg-transparent"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
