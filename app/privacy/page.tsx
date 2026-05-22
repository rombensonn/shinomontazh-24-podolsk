import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных | Шиномонтаж 24",
  description: "Политика обработки персональных данных для формы заявки сайта Шиномонтаж 24.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-background py-10">
      <article className="container-page max-w-4xl">
        <Link href="/" className="font-bold text-primary hover:text-primary-hover">
          Вернуться на главную
        </Link>
        <div className="card mt-6 p-6 sm:p-8">
          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Политика обработки персональных данных
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Эта страница подготовлена как базовый шаблон для сайта локального сервиса.
            Владельцу сайта нужно проверить текст с юристом и добавить реквизиты
            оператора, если они должны быть опубликованы.
          </p>

          <section className="mt-8 space-y-4 text-base leading-7 text-slate-700">
            <h2 className="text-2xl font-extrabold text-foreground">1. Какие данные обрабатываются</h2>
            <p>
              Через форму заявки могут обрабатываться имя, телефон, выбранная услуга,
              радиус колёс, удобное время, комментарий, страница отправки, источник
              перехода, дата и время отправки, IP-адрес.
            </p>

            <h2 className="text-2xl font-extrabold text-foreground">2. Цель обработки</h2>
            <p>
              Данные используются для связи с заявителем, уточнения задачи по
              шиномонтажу, ориентировочной стоимости, текущей загрузки и возможности
              подъезда.
            </p>

            <h2 className="text-2xl font-extrabold text-foreground">3. Передача данных</h2>
            <p>
              Данные могут направляться владельцу сервиса через Telegram Bot API и
              SMTP-почту, если эти каналы подключены в настройках сайта. Также заявки
              сохраняются в SQLite на сервере сайта.
            </p>

            <h2 className="text-2xl font-extrabold text-foreground">4. Срок хранения</h2>
            <p>
              Срок хранения заявок определяется владельцем сайта. TODO: владельцу
              указать фактический срок хранения и порядок удаления данных.
            </p>

            <h2 className="text-2xl font-extrabold text-foreground">5. Контакты</h2>
            <p>
              По вопросам обработки данных можно обратиться по телефону {business.phone}.
              Адрес сервиса: {business.address}.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
