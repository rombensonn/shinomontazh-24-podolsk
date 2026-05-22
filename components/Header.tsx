import { Clock3, MapPinned, Phone } from "lucide-react";
import { business, navItems } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/20 bg-[#141922]/95 text-white backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-4 py-3">
        <a href="#top" className="focus-ring rounded-card">
          <span className="block text-lg font-black leading-tight text-white">
            {business.name}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
            {business.tagline}
          </span>
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-card border border-transparent px-2 py-1 text-sm font-black text-slate-200 transition hover:border-white/20 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={business.phoneHref}
            className="focus-ring rounded-card px-3 py-2 text-sm font-black text-white transition hover:text-orange-200"
          >
            {business.phone}
          </a>
          <a href={business.phoneHref} className="btn-primary">
            <Phone aria-hidden="true" className="h-5 w-5" />
            Позвонить
          </a>
          <a
            href={business.routeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15"
          >
            <MapPinned aria-hidden="true" className="h-5 w-5" />
            Маршрут
          </a>
        </div>

        <a href={business.phoneHref} className="btn-primary md:hidden" aria-label="Позвонить">
          <Phone aria-hidden="true" className="h-5 w-5" />
          Звонок
        </a>
      </div>
    </header>
  );
}
