import { ClipboardList, MapPinned, Phone } from "lucide-react";
import { business } from "@/lib/site";

export function StickyMobileCta() {
  return (
    <nav
      aria-label="Быстрые действия"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/40 bg-[#141922] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.22)] md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a href={business.phoneHref} className="btn-primary min-h-14 flex-col gap-1 px-1 py-2 text-xs leading-none">
          <Phone aria-hidden="true" className="h-5 w-5" />
          Позвонить
        </a>
        <a
          href={business.routeUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-route min-h-14 flex-col gap-1 px-1 py-2 text-xs leading-none"
        >
          <MapPinned aria-hidden="true" className="h-5 w-5" />
          Маршрут
        </a>
        <a href="#lead" className="btn-secondary min-h-14 flex-col gap-1 border-white/20 bg-white/10 px-1 py-2 text-xs leading-none text-white hover:bg-white/15">
          <ClipboardList aria-hidden="true" className="h-5 w-5" />
          Заявка
        </a>
      </div>
    </nav>
  );
}
