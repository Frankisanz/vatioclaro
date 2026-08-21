import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplianceCard } from "@/app/components/ApplianceCard";
import { SourceLink } from "@/app/components/SourceLink";
import { UniversalCalculator } from "@/app/components/UniversalCalculator";
import { UseYourLabel } from "@/app/components/UseYourLabel";
import {
  appliances,
  getAppliance,
  getApplianceUpdatedAt,
  getRelatedAppliances,
  getRelatedGuideLinks,
  type Appliance,
} from "@/lib/appliances";
import { getBuyingGuideForAppliance } from "@/lib/buying-guides";
import { isIndexableEditorialGuideHref } from "@/lib/editorial-guides";
import {
  calculateElectricity,
  formatCurrency,
  formatKwh,
} from "@/lib/electricity";
import { LEGAL_OWNER } from "@/lib/legal";
import {
  absoluteUrl,
  CONTENT_PUBLISHED_AT,
  EDITORIAL_PERSON_ID,
  SITE_NAME,
} from "@/lib/site";

const calculationMethodLabels: Record<
  Appliance["calculation"]["method"],
  string
> = {
  annual: "Consumo anual de etiqueta",
  cycle: "Consumo por ciclo",
  daily: "Consumo diario",
  power: "Potencia y tiempo de uso",
  standby: "Potencia en espera",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return appliances.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getAppliance(slug);

  if (!item) return {};

  const path = `/consumo/${item.slug}`;
  const title =
    item.seoTitle ?? `Cuánto consume ${item.articleName}: coste y calculadora`;
  const description = `Calcula cuánto consume ${item.articleName} con el dato adecuado de su etiqueta, tus hábitos y un precio editable. Fórmula, supuestos y fuentes visibles.`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: item.indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "article",
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
      publishedTime: CONTENT_PUBLISHED_AT,
      modifiedTime: getApplianceUpdatedAt(item),
      images: [
        {
          url: "/images/vatioclaro-hogar-energia-og.jpg",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME}: ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/images/vatioclaro-hogar-energia-og.jpg"],
    },
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function describeInputs(item: Appliance) {
  const input = item.calculation;

  switch (input.method) {
    case "power":
      return `${input.watts.toLocaleString("es-ES")} W · ${input.hoursPerDay.toLocaleString("es-ES")} h/día · ${input.daysPerMonth.toLocaleString("es-ES")} días/mes · ${input.pricePerKwh.toLocaleString("es-ES")} €/kWh`;
    case "cycle":
      return item.labelKwhPer100Cycles
        ? `${item.labelKwhPer100Cycles.toLocaleString("es-ES")} kWh/100 ciclos · ${input.cycles.toLocaleString("es-ES")} ciclos/mes · ${input.pricePerKwh.toLocaleString("es-ES")} €/kWh`
        : `${input.kwhPerCycle.toLocaleString("es-ES")} kWh/ciclo · ${input.cycles.toLocaleString("es-ES")} ciclos/${input.cyclePeriod === "week" ? "semana" : "mes"} · ${input.pricePerKwh.toLocaleString("es-ES")} €/kWh`;
    case "annual":
      return `${input.annualKwh.toLocaleString("es-ES")} kWh/año · ${input.pricePerKwh.toLocaleString("es-ES")} €/kWh`;
    case "daily":
      return `${input.dailyKwh.toLocaleString("es-ES")} kWh/día · ${input.pricePerKwh.toLocaleString("es-ES")} €/kWh`;
    case "standby":
      return `${input.watts.toLocaleString("es-ES")} W · ${input.deviceCount.toLocaleString("es-ES")} aparatos · ${input.hoursPerDay.toLocaleString("es-ES")} h/día`;
  }
}

function CalculationFormula({ item }: { item: Appliance }) {
  const input = item.calculation;

  switch (input.method) {
    case "power":
      return (
        <>
          <p>
            La potencia permite estimar aparatos relativamente estables. En
            equipos que modulan o ciclan, este escenario no equivale a una
            medición real durante todo el periodo.
          </p>
          <div className="formula-box">
            {input.watts.toLocaleString("es-ES")} W ÷ 1.000 ×{" "}
            {input.hoursPerDay.toLocaleString("es-ES")} h/día ×{" "}
            {input.daysPerMonth.toLocaleString("es-ES")} días/mes
            <br />
            Consumo mensual × {input.pricePerKwh.toLocaleString("es-ES")} €/kWh
            = coste mensual
          </div>
        </>
      );
    case "cycle":
      return (
        <>
          <p>
            Para un programa completo usamos energía por ciclo. Cuando la
            etiqueta muestra kWh/100 ciclos, dividimos ese dato entre 100 antes
            de multiplicar por los ciclos del hogar.
          </p>
          <div className="formula-box">
            {item.labelKwhPer100Cycles
              ? `${item.labelKwhPer100Cycles.toLocaleString("es-ES")} kWh/100 ciclos ÷ 100`
              : `${input.kwhPerCycle.toLocaleString("es-ES")} kWh/ciclo`}{" "}
            × {input.cycles.toLocaleString("es-ES")} ciclos/mes
            <br />
            Consumo mensual × {input.pricePerKwh.toLocaleString("es-ES")} €/kWh
            = coste mensual
          </div>
        </>
      );
    case "annual":
      return (
        <>
          <p>
            El consumo anual de la etiqueta describe mejor un aparato que
            funciona y regula durante todo el año que su potencia instantánea.
            La media mensual no implica que todos los meses sean iguales.
          </p>
          <div className="formula-box">
            {input.annualKwh.toLocaleString("es-ES")} kWh/año ÷ 12 = media
            mensual
            <br />
            {input.annualKwh.toLocaleString("es-ES")} kWh/año ×{" "}
            {input.pricePerKwh.toLocaleString("es-ES")} €/kWh = coste anual
          </div>
        </>
      );
    case "daily":
      return (
        <div className="formula-box">
          {input.dailyKwh.toLocaleString("es-ES")} kWh/día × 365 días = consumo
          anual
          <br />
          Consumo × {input.pricePerKwh.toLocaleString("es-ES")} €/kWh = coste
        </div>
      );
    case "standby":
      return null;
  }
}

export default async function AppliancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getAppliance(slug);

  if (!item) notFound();

  const calculation = calculateElectricity(item.calculation);
  if (!calculation.ok) {
    throw new Error(`La configuración de ${item.slug} no supera la validación`);
  }

  const result = calculation.value;
  const path = `/consumo/${item.slug}`;
  const pageUrl = absoluteUrl(path);
  const lastUpdated = getApplianceUpdatedAt(item);
  const related = getRelatedAppliances(item);
  const relatedGuideLinks = getRelatedGuideLinks(item).filter((guide) =>
    isIndexableEditorialGuideHref(guide.href),
  );
  const buyingGuide = getBuyingGuideForAppliance(item.slug);
  const exampleInputs = describeInputs(item);
  const labelMetric =
    item.calculation.method === "annual"
      ? "annual"
      : item.calculation.method === "cycle"
        ? "cycles"
        : "power";
  const faq = [
    {
      question: `¿Cuánto cuesta usar ${item.articleName} al mes?`,
      answer: `Con el escenario visible (${exampleInputs}), el coste energético estimado es ${formatCurrency(result.cost.month)} al mes. Sustituye las entradas por las de tu aparato y uso; no incluye los cargos fijos de la factura.`,
    },
    {
      question: `¿Por qué el consumo real de ${item.articleName} puede ser distinto?`,
      answer: item.caveat,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: `Cuánto consume ${item.articleName}`,
        description: item.shortDescription,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: "es-ES",
        datePublished: CONTENT_PUBLISHED_AT,
        dateModified: lastUpdated,
        image: absoluteUrl("/images/vatioclaro-hogar-energia-og.jpg"),
        author: { "@id": EDITORIAL_PERSON_ID },
        editor: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        citation: item.sources.map((source) => source.url),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guías de consumo",
            item: absoluteUrl("/consumo"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Cuánto consume ${item.articleName}`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="article-hero">
        <div>
          <nav aria-label="Migas de pan" className="breadcrumbs">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/consumo">Guías de consumo</Link>
            <span aria-hidden="true">/</span>
            <span>{item.name}</span>
          </nav>
          <div className="eyebrow">{item.category}</div>
          <h1>¿Cuánto consume {item.articleName}?</h1>
          <p className="article-hero__intro">{item.intro}</p>
          <p className="article-updated">
            Revisado el {formatDate(lastUpdated)} · Responsable editorial:{" "}
            <Link href="/sobre-vatioclaro">{LEGAL_OWNER.name}</Link> ·{" "}
            <Link href="/metodologia">Método y criterios</Link>
          </p>
        </div>
        <aside className="quick-result" aria-label="Ejemplo de coste mensual">
          <small>
            {item.exampleKind === "official-statistic"
              ? "REFERENCIA HISTÓRICA"
              : "EJEMPLO EDUCATIVO"}
          </small>
          <strong>{formatCurrency(result.cost.month)}</strong>
          <p>{exampleInputs}</p>
        </aside>
      </section>

      <section className="article-body">
        <div className="article-body__inner">
          <article className="article-copy">
            <div
              className="article-key-facts"
              aria-label="Datos rápidos del ejemplo"
            >
              <div>
                <span>DATO QUE DEBES BUSCAR</span>
                <b>{item.range}</b>
              </div>
              <div>
                <span>CONSUMO DEL ESCENARIO</span>
                <b>{formatKwh(result.consumption.month, 1)}/mes</b>
              </div>
              <div>
                <span>COSTE ENERGÉTICO ANUAL</span>
                <b>{formatCurrency(result.cost.year)}</b>
              </div>
            </div>

            <aside className="assumption-box" aria-labelledby="assumption-title">
              <span>SUPUESTOS VISIBLES</span>
              <h2 id="assumption-title">Ejemplo utilizado</h2>
              <p>
                <strong>{exampleInputs}</strong>
              </p>
              <p>{item.assumptionRationale}</p>
            </aside>

            <h2>Calcula tu caso</h2>
            <p>
              Estos campos cargan el ejemplo anterior. Sustitúyelos por el dato
              de tu etiqueta, tu rutina y el precio que quieras analizar.
            </p>
            <div className="article-calculator">
              <UniversalCalculator
                initialInput={item.calculation}
                initialName={item.name}
                lockedMethod
                shareable={false}
              />
            </div>

            <UseYourLabel metric={labelMetric} />

            <h2>El cálculo, paso a paso</h2>
            <CalculationFormula item={item} />
            <p>
              Esta cuenta explica el orden de magnitud y sus límites.{" "}
              {item.caveat}
            </p>

            <h2>Qué hace variar el consumo</h2>
            {item.factors.map((factor) => (
              <div key={factor.title}>
                <h3>{factor.title}</h3>
                <p>{factor.text}</p>
              </div>
            ))}

            <h2>Cómo gastar menos sin perder utilidad</h2>
            <ul>
              {item.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>

            <div className="measurement-note">
              <h3>Qué dato conviene usar</h3>
              <p>
                {item.measurement ??
                  "Busca la potencia de entrada en la etiqueta o mide varios días con un medidor adecuado para la potencia del aparato."}
              </p>
            </div>

            <h2>Preguntas frecuentes</h2>
            {faq.map((entry) => (
              <div key={entry.question}>
                <h3>{entry.question}</h3>
                <p>{entry.answer}</p>
              </div>
            ))}

            {buyingGuide ? (
              <aside className="contextual-recommendation">
                <div>
                  <span>GUÍA DE COMPRA RELACIONADA</span>
                  <h2>Una herramienta para comprobar antes de decidir</h2>
                  <p>
                    Compara funciones, compatibilidad y límites. Incluye enlaces
                    de afiliado identificados y alternativas sin compra.
                  </p>
                </div>
                <Link href={buyingGuide.href} prefetch={false}>
                  {buyingGuide.title} <span aria-hidden="true">→</span>
                </Link>
              </aside>
            ) : null}

            <section
              aria-labelledby="related-guides-title"
              className="related-guides"
            >
              <div className="section-heading section-heading--compact">
                <div>
                  <div className="eyebrow">Sigue explorando</div>
                  <h2 id="related-guides-title">Guías relacionadas</h2>
                </div>
                <Link className="text-link" href="/consumo">
                  Ver biblioteca completa →
                </Link>
              </div>
              <div className="appliance-topic-links">
                {relatedGuideLinks.map((guide) => (
                  <Link href={guide.href} key={guide.href} prefetch={false}>
                    <span>{guide.title}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
              <div className="guide-grid guide-grid--related">
                {related.map((relatedItem, index) => (
                  <ApplianceCard
                    index={index}
                    item={relatedItem}
                    key={relatedItem.slug}
                  />
                ))}
              </div>
            </section>

            <div className="source-box">
              <h2>Fuentes, alcance y revisión</h2>
              <p>
                Revisado el {formatDate(lastUpdated)}. Una fuente sobre la unidad
                o el contexto no convierte automáticamente el ejemplo en un dato
                oficial del aparato. Comprueba siempre tu modelo.
              </p>
              <ul className="source-list">
                {item.sources.map((source) => (
                  <li key={source.id}>
                    <SourceLink
                      context={item.slug}
                      href={source.url}
                      sourceId={source.id}
                    >
                      {source.title} ↗
                    </SourceLink>
                    <p>{source.scope}</p>
                  </li>
                ))}
              </ul>
              <p>
                <Link href="/sobre-vatioclaro">
                  ¿Has encontrado un dato incorrecto? Envíanos una corrección.
                </Link>
              </p>
            </div>
          </article>

          <aside className="article-aside">
            <div className="article-aside__card">
              <h3>Resumen del escenario</h3>
              <dl>
                <div>
                  <dt>Método</dt>
                  <dd>{calculationMethodLabels[item.calculation.method]}</dd>
                </div>
                <div>
                  <dt>Consumo mensual</dt>
                  <dd>{formatKwh(result.consumption.month, 1)}</dd>
                </div>
                <div>
                  <dt>Coste mensual</dt>
                  <dd>{formatCurrency(result.cost.month)}</dd>
                </div>
                <div>
                  <dt>Coste anual</dt>
                  <dd>{formatCurrency(result.cost.year)}</dd>
                </div>
              </dl>
              <Link className="article-aside__link" href="/calculadora">
                Abrir calculadora completa →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
