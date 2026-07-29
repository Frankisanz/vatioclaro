export const AMAZON_TRACKING_ID = "vatio-21";

export const AMAZON_ASSOCIATE_DISCLOSURE =
  "En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.";

const AMAZON_ASIN_PATTERN = /^[A-Z0-9]{10}$/;

export function amazonProductUrl(asin: string) {
  const normalizedAsin = asin.trim().toUpperCase();

  if (!AMAZON_ASIN_PATTERN.test(normalizedAsin)) {
    throw new Error(`ASIN de Amazon no válido: ${asin}`);
  }

  return `https://www.amazon.es/dp/${normalizedAsin}?tag=${AMAZON_TRACKING_ID}`;
}
