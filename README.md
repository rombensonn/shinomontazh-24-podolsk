# Шиномонтаж 24

Одностраничный лендинг для круглосуточного шиномонтажа в Подольске на Next.js 15, App Router, TypeScript и Tailwind CSS.

## Что есть в проекте

- Коммерческий лендинг с блоками: hero, срочные ситуации, услуги, цены, процесс, чек-лист контроля, отзывы, FAQ, контакты, форма и финальный CTA.
- Мобильная sticky-панель: позвонить, маршрут, заявка.
- Route Handler `/api/lead` для обработки заявок.
- Валидация через `zod`.
- Антиспам: honeypot, rate limit по IP, минимальное время заполнения формы.
- Сохранение заявок в SQLite.
- Отправка в Telegram при наличии `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
- Дублирование на email через SMTP, если заданы SMTP-переменные.
- SMS-интерфейс-заглушка без привязки к конкретному провайдеру.
- Страницы `/privacy` и `/personal-data-consent`.
- `robots.txt`, `sitemap.xml`, Open Graph, Twitter cards и JSON-LD `AutoRepair`.

## Требования

- Node.js 20+
- npm
- Сервер/VPS с правом записи в папку `data` или в путь, указанный в `SQLITE_DB_PATH`

## Запуск локально

```bash
npm install
cp .env.example .env
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Сборка и production-запуск

```bash
npm install
npm run build
npm run start
```

По умолчанию Next.js стартует на порту `3000`. Для другого порта:

```bash
PORT=8080 npm run start
```

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните нужные значения.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
SQLITE_DB_PATH=./data/leads.sqlite
LEAD_FORM_SECRET=change-me-on-production
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
LEAD_EMAIL_FROM=
LEAD_EMAIL_TO=
SMS_PROVIDER_ENDPOINT=
SMS_PROVIDER_API_KEY=
SMS_TO_PHONE=
```

Если Telegram или SMTP не настроены, форма не ломается: заявка сохраняется в SQLite, а в логах будет понятное сообщение о пропущенном канале доставки.

## SQLite

Таблица `leads` создаётся автоматически при первой заявке. Сохраняются:

- дата и время;
- имя;
- телефон;
- услуга;
- радиус;
- удобное время;
- комментарий;
- страница;
- источник;
- IP.

## Подготовка к реальному деплою

1. Указать реальный `NEXT_PUBLIC_SITE_URL`.
2. Проверить `/robots.txt` и `/sitemap.xml`: файлы в `public/` генерируются от `NEXT_PUBLIC_SITE_URL` перед `dev`, `build` и `start`.
3. Подключить Telegram Bot API и SMTP при необходимости.
4. Проверить юридические страницы с юристом и добавить реквизиты оператора персональных данных, если нужно.
5. Заменить `public/tire-service-placeholder.svg` на реальные фото, только если владелец передаст материалы.

## GitHub Pages

В репозитории есть workflow `.github/workflows/pages.yml` для публикации статической версии на GitHub Pages.

Важно: GitHub Pages не запускает Next.js Route Handler, SQLite, Telegram и SMTP. Поэтому форма заявки на Pages работает как демонстрация и предлагает срочно позвонить. Для рабочих заявок используйте VPS/Node.js-запуск из раздела production.

## Проверка

```bash
npm run typecheck
npm run lint
npm run build
```
