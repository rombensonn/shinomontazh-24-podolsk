const yandexOrgId = "217391429634";
const yandexOrgPoint = "37.481938%2C55.412361";
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function withBasePath(path: `/${string}`) {
  return `${basePath}${path}`;
}

export const business = {
  name: "Шиномонтаж 24",
  tagline: "Круглосуточно в Подольске",
  phone: "+7 (964) 701-00-10",
  phoneHref: "tel:+79647010010",
  address: "ул. Академика Доллежаля, 42, корп. 1, Подольск",
  hours: "Круглосуточно / 24 часа",
  rating: "4,6",
  ratingsCount: "260",
  reviewsCount: "108",
  yandexOrgId,
  routeUrl:
    "https://yandex.ru/maps/?mode=routes&rtext=~55.412361%2C37.481938&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D217391429634&rtt=auto",
  mapEmbedUrl: `https://yandex.ru/map-widget/v1/?ll=${yandexOrgPoint}&mode=search&ol=biz&oid=${yandexOrgId}&z=17`,
} as const;

export const navItems = [
  { href: "#services", label: "Услуги" },
  { href: "#pricing", label: "Цены" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
] as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const metadataTitle =
  "Шиномонтаж 24 в Подольске — круглосуточно, ул. Академика Доллежаля";

export const metadataDescription =
  "Круглосуточный шиномонтаж в Подольске: переобувка, балансировка, ремонт проколов, проверка давления и хранение шин. Адрес: ул. Академика Доллежаля, 42, корп. 1. Телефон: +7 (964) 701-00-10.";
