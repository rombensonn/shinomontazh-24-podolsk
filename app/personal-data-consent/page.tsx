import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | Шиномонтаж 24",
  description: "Текст согласия на обработку персональных данных для формы заявки сайта Шиномонтаж 24.",
  alternates: {
    canonical: "/personal-data-consent",
  },
};

export default function PersonalDataConsentPage() {
  return (
    <main className="min-h-dvh bg-background py-10">
      <article className="container-page max-w-4xl">
        <Link href="/" className="font-bold text-primary hover:text-primary-hover">
          Вернуться на главную
        </Link>
        <div className="card mt-6 p-6 sm:p-8">
          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Согласие на обработку персональных данных
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Это базовый текст согласия для формы заявки. Владельцу сайта нужно
            проверить его с юристом и дополнить реквизитами оператора, если требуется.
          </p>

          <section className="mt-8 space-y-4 text-base leading-7 text-slate-700">
            <p>
              Отправляя форму заявки на сайте {business.name}, пользователь даёт
              согласие на обработку указанных им персональных данных: имени, телефона,
              выбранной услуги, радиуса колёс, удобного времени, комментария, страницы
              отправки, источника перехода, даты и времени отправки, IP-адреса.
            </p>
            <p>
              Цель обработки: связь с пользователем, уточнение задачи по шиномонтажу,
              ориентировочной стоимости, текущей загрузки и возможности подъезда.
            </p>
            <p>
              Данные могут быть обработаны с использованием сайта, SQLite-хранилища,
              Telegram Bot API и SMTP-почты, если эти каналы подключены владельцем
              сайта.
            </p>
            <p>
              Согласие действует до достижения цели обработки или до отзыва согласия.
              Для вопросов и отзыва согласия можно обратиться по телефону {business.phone}.
            </p>
            <p>
              Адрес сервиса: {business.address}. Режим работы: {business.hours}.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
