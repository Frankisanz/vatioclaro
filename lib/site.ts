export const SITE_NAME = "VatioClaro";
export const SITE_URL = "https://vatioclaro.es";
export const SITE_DESCRIPTION =
  "Calculadoras y guías claras para entender el consumo eléctrico de tu hogar, estimar costes y tomar decisiones de ahorro con criterio.";
export const CONTENT_PUBLISHED_AT = "2026-07-29";
export const CONTENT_UPDATED_AT = "2026-08-17";
export const EDITORIAL_PERSON_ID = `${SITE_URL}/sobre-vatioclaro#responsable-editorial`;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function pageTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}
