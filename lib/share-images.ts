import {
  calculateElectricity,
  formatCurrency,
  formatKwh,
} from "./electricity";
import type { Appliance } from "./appliances";
import type { EditorialGuide } from "./editorial-guides";

/**
 * Imágenes propias de cada ficha y guía (1200 × 630). Resumen las cifras o
 * claves visibles en la página para que la búsqueda por imagen, las vistas
 * previas al compartir y los resultados multimodales muestren un contenido
 * específico en lugar de la misma ilustración genérica en todas las URLs.
 */
export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function getApplianceImagePath(slug: string) {
  return `/imagenes/consumo/${slug}.png`;
}

export function getGuideImagePath(slug: string) {
  return `/imagenes/guias/${slug}.png`;
}

export function getApplianceImageFigures(item: Appliance) {
  const result = calculateElectricity(item.calculation);
  if (!result.ok) {
    throw new Error(`Configuración de cálculo inválida para ${item.slug}`);
  }

  return {
    monthKwh: formatKwh(result.value.consumption.month, 1),
    monthCost: formatCurrency(result.value.cost.month),
    yearCost: formatCurrency(result.value.cost.year),
  };
}

export function getApplianceImageAlt(item: Appliance) {
  const figures = getApplianceImageFigures(item);
  return `Resumen del consumo de ${item.articleName}: ${figures.monthKwh} y ${figures.monthCost} al mes, ${figures.yearCost} al año en el ejemplo editable de VatioClaro`;
}

export function getGuideImageAlt(guide: EditorialGuide) {
  const facts = guide.quickFacts
    .slice(0, 3)
    .map((fact) => `${fact.label}: ${fact.value}`)
    .join("; ");
  return `${guide.title}. ${facts}`;
}
