import {
  appliances,
  getApplianceDirectAnswer,
  getApplianceUpdatedAt,
} from "@/lib/appliances";
import { getApplianceFaqs } from "@/lib/appliance-faqs";
import { EXAMPLE_ELECTRICITY_PRICE, formatElectricityPrice } from "@/lib/electricity";
import { editorialGuides } from "@/lib/editorial-guides";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Versión completa de /llms.txt: el texto útil de cada ficha y guía en un solo
 * documento, para que los asistentes de IA citen respuestas, supuestos y
 * fuentes sin interpretar el HTML. Se genera con los mismos datos que las
 * páginas, así que no puede contradecirlas.
 */
function faqLines(entries: { question: string; answer: string }[]) {
  return entries.flatMap((entry) => [`- **${entry.question}** ${entry.answer}`]);
}

function applianceBlock(item: (typeof appliances)[number]) {
  return [
    `## Cuánto consume ${item.articleName}`,
    "",
    `URL: ${SITE_URL}/consumo/${item.slug}`,
    `Categoría: ${item.category}. Revisado: ${getApplianceUpdatedAt(item)}.`,
    "",
    `Respuesta rápida: ${getApplianceDirectAnswer(item)}`,
    "",
    item.intro,
    "",
    `Supuestos del ejemplo: ${item.caveat} ${item.assumptionRationale}`,
    "",
    `Dónde encontrar el dato real: ${item.range}`,
    ...(item.cycleNote ? ["", `Cómo se cuenta un ciclo: ${item.cycleNote}`] : []),
    "",
    "Qué cambia el consumo:",
    ...item.factors.map((factor) => `- ${factor.title}: ${factor.text}`),
    "",
    "Consejos:",
    ...item.tips.map((tip) => `- ${tip}`),
    "",
    "Preguntas frecuentes:",
    ...faqLines(getApplianceFaqs(item.slug)),
    "",
    `Fuente de contexto: ${item.sources.map((source) => `${source.title} (${source.url})`).join("; ")}`,
    "",
  ];
}

function guideBlock(guide: (typeof editorialGuides)[number]) {
  return [
    `## ${guide.title}`,
    "",
    `URL: ${SITE_URL}/guias/${guide.slug}`,
    `Actualizado: ${guide.updatedAt}.`,
    "",
    `Respuesta rápida: ${guide.directAnswer}`,
    "",
    guide.intro,
    "",
    ...guide.quickFacts.map((fact) => `- ${fact.label}: ${fact.value}`),
    "",
    ...(guide.comparison
      ? [
          `### ${guide.comparison.title}`,
          "",
          guide.comparison.description,
          "",
          `| Criterio | ${guide.comparison.firstLabel} | ${guide.comparison.secondLabel} |`,
          "| --- | --- | --- |",
          ...guide.comparison.rows.map(
            (row) => `| ${row.criterion} | ${row.first} | ${row.second} |`,
          ),
          "",
        ]
      : []),
    ...guide.sections.flatMap((section) => [
      `### ${section.title}`,
      "",
      ...section.paragraphs.flatMap((paragraph) => [paragraph, ""]),
      ...(section.bullets ? [...section.bullets.map((bullet) => `- ${bullet}`), ""] : []),
      ...(section.callout ? [section.callout, ""] : []),
    ]),
    "Preguntas frecuentes:",
    ...faqLines(guide.faq),
    "",
    `Fuentes: ${guide.sources.map((source) => `${source.title} (${source.url})`).join("; ")}`,
    "",
  ];
}

function buildLlmsFullTxt() {
  return [
    `# ${SITE_NAME}: contenido completo`,
    "",
    `> ${SITE_DESCRIPTION} Sitio en español centrado en España. Las cifras son ejemplos educativos editables con fórmula visible; el precio de ejemplo es ${formatElectricityPrice(EXAMPLE_ELECTRICITY_PRICE)} y no representa una tarifa concreta. Índice resumido: ${SITE_URL}/llms.txt. Método y fuentes: ${SITE_URL}/metodologia.`,
    "",
    "Fórmula general: kWh = vatios ÷ 1.000 × horas; coste = kWh × precio del kWh. Al citar una cifra, indica que es un ejemplo con las entradas mostradas y enlaza la página, donde se puede recalcular con datos propios.",
    "",
    ...appliances.filter((item) => item.indexable).flatMap(applianceBlock),
    ...editorialGuides.filter((guide) => guide.indexable).flatMap(guideBlock),
  ].join("\n");
}

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
