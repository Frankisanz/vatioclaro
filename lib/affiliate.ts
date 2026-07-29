export const AMAZON_TRACKING_ID = "vatio-21";

export const AMAZON_ASSOCIATE_DISCLOSURE =
  "En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.";

export function amazonSearchUrl(query: string) {
  return `https://www.amazon.es/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TRACKING_ID}`;
}
