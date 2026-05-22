import Link from "next/link";
import { business } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/20 bg-[#141922] pb-28 pt-8 text-white md:pb-8">
      <div className="container-page grid gap-6 text-sm leading-6 text-slate-300 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="text-lg font-black text-white">{business.name}</div>
          <p className="mt-2">
            {business.address}. Телефон:{" "}
            <a href={business.phoneHref} className="font-bold text-white hover:text-orange-200">
              {business.phone}
            </a>
            . Режим работы: {business.hours}.
          </p>
          <p className="mt-3 max-w-3xl">
            Информация на сайте носит справочный характер. Итоговая стоимость зависит
            от объёма работ и уточняется перед началом обслуживания.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 lg:justify-end">
          <Link href="/privacy" className="font-bold text-white hover:text-orange-200">
            Политика обработки персональных данных
          </Link>
          <Link href="/personal-data-consent" className="font-bold text-white hover:text-orange-200">
            Согласие на обработку персональных данных
          </Link>
        </div>
      </div>
    </footer>
  );
}
