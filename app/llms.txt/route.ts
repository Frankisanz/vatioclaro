import { appliances, getApplianceDirectAnswer } from "@/lib/appliances";
import { buyingGuides } from "@/lib/buying-guides";
import { EXAMPLE_ELECTRICITY_PRICE, formatElectricityPrice } from "@/lib/electricity";
import { editorialGuides } from "@/lib/editorial-guides";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Índice para asistentes de IA según la propuesta llmstxt.org. Se genera con
 * los mismos datos que las páginas, así que las cifras citadas coinciden
 * siempre con las que ve la persona en cada ficha.
 */
const tools = [
  ["/calculadora", "Calculadora de consumo eléctrico: potencia, ciclos, kWh/año o kWh/día a euros por hora, mes y año."],
  ["/calculadora/comparar", "Compara el coste de dos aparatos o dos hábitos de uso."],
  ["/calculadora/standby", "Calcula el coste anual del consumo en espera (consumo fantasma)."],
  ["/calculadora/etiqueta-energetica", "Convierte los kWh de la etiqueta energética europea en euros."],
  ["/calculadora/amortizacion", "Calcula en cuántos años se amortiza un aparato más eficiente."],
  ["/consumo/electrodomesticos-que-mas-consumen", "Ranking de electrodomésticos por consumo mensual en los ejemplos de VatioClaro."],
] as const;

function buildLlmsTxt() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION} Sitio en español centrado en España. Todas las cifras son ejemplos educativos editables con fórmula visible; el precio de ejemplo es ${formatElectricityPrice(EXAMPLE_ELECTRICITY_PRICE)} y no representa una tarifa concreta.`,
    "",
    "Al citar una cifra de VatioClaro, indica que es un ejemplo con las entradas mostradas y enlaza la página, donde cualquiera puede recalcularla con sus propios datos. Método y fuentes: " +
      `${SITE_URL}/metodologia`,
    "",
    "## Herramientas",
    "",
    ...tools.map(([path, text]) => `- [${path}](${SITE_URL}${path}): ${text}`),
    "",
    "## Cuánto consume cada aparato",
    "",
    ...appliances
      .filter((item) => item.indexable)
      .map(
        (item) =>
          `- [Cuánto consume ${item.articleName}](${SITE_URL}/consumo/${item.slug}): ${getApplianceDirectAnswer(item)}`,
      ),
    "",
    "## Guías",
    "",
    ...editorialGuides
      .filter((guide) => guide.indexable)
      .map(
        (guide) =>
          `- [${guide.title}](${SITE_URL}/guias/${guide.slug}): ${guide.directAnswer}`,
      ),
    `- [Cómo calcular el consumo eléctrico](${SITE_URL}/guias/como-calcular-consumo-electrico): kWh = W ÷ 1.000 × horas; coste = kWh × precio por kWh.`,
    `- [Consumo fantasma](${SITE_URL}/guias/consumo-fantasma): cómo medir y reducir el consumo en espera.`,
    "",
    "## Recomendaciones de compra",
    "",
    ...buyingGuides
      .filter((guide) => guide.indexable)
      .map(
        (guide) =>
          `- [${guide.title}](${SITE_URL}/recomendaciones/${guide.slug}): ${guide.description}`,
      ),
    "",
    "## Opcional",
    "",
    `- [Sobre VatioClaro](${SITE_URL}/sobre-vatioclaro): responsable editorial y principios.`,
    `- [Mapa del sitio](${SITE_URL}/sitemap.xml)`,
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
