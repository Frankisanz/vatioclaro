import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplianceCard } from "@/app/components/ApplianceCard";
import { CycleCalculator } from "@/app/components/CycleCalculator";
import { EnergyCalculator } from "@/app/components/EnergyCalculator";
import {
  appliances,
  getAppliance,
  getApplianceMonthlyKwh,
  getApplianceUpdatedAt,
  getRelatedAppliances,
  getRelatedGuideLinks,
} from "@/lib/appliances";
import { getBuyingGuideForAppliance } from "@/lib/buying-guides";
import { LEGAL_OWNER } from "@/lib/legal";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

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

  if (!item) {
    return {};
  }

  const path = `/consumo/${item.slug}`;
  const title =
    item.seoTitle ?? `Cuánto consume ${item.articleName}: coste y calculadora`;
  const description = `Calcula cuánto consume ${item.articleName} y cuánto cuesta con tus datos. Incluye ejemplo, fórmula, factores y consejos para gastar menos.`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
      publishedTime: getApplianceUpdatedAt(item),
      modifiedTime: getApplianceUpdatedAt(item),
      images: [
        {
          url: "/og.png",
          width: 1672,
          height: 941,
          alt: `${SITE_NAME}: ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function AppliancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getAppliance(slug);

  if (!item) {
    notFound();
  }

  const path = `/consumo/${item.slug}`;
  const pageUrl = absoluteUrl(path);
  const lastUpdated = getApplianceUpdatedAt(item);
  const monthlyKwh = getApplianceMonthlyKwh(item);
  const annualCost = item.exampleCost * 12;
  const isCycleCalculation = item.calculationMode === "cycle";
  const related = getRelatedAppliances(item);
  const relatedGuideLinks = getRelatedGuideLinks(item);
  const buyingGuide = getBuyingGuideForAppliance(item.slug);
  const faq = [
    {
      question: `¿Cuánto cuesta usar ${item.articleName} al mes?`,
      answer: isCycleCalculation
        ? `Con el ejemplo de ${item.kwhPerCycle?.toLocaleString("es-ES")} kWh por ciclo, ${item.cyclesPerMonth} ciclos al mes y ${item.price.toLocaleString("es-ES")} €/kWh, el coste orientativo es ${item.exampleCost.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € al mes.`
        : `Con el ejemplo de ${item.watts.toLocaleString("es-ES")} W, ${item.hours} horas al día, ${item.days} días y ${item.price.toLocaleString("es-ES")} €/kWh, el coste orientativo es ${item.exampleCost.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € al mes.`,
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
        datePublished: lastUpdated,
        dateModified: lastUpdated,
        image: absoluteUrl("/og.png"),
        author: {
          "@type": "Organization",
          name: SITE_NAME,
          url: absoluteUrl("/"),
        },
        publisher: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
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
            Actualizado: {lastUpdated} · Responsable editorial:{" "}
            <Link href="/sobre-vatioclaro">{LEGAL_OWNER.name}</Link>
          </p>
        </div>
        <aside className="quick-result" aria-label="Ejemplo de coste mensual">
          <small>EJEMPLO ORIENTATIVO</small>
          <strong>
            {item.exampleCost.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </strong>
          <p>
            {isCycleCalculation
              ? `${item.kwhPerCycle?.toLocaleString("es-ES")} kWh/ciclo · ${item.cyclesPerMonth} ciclos · ${item.price.toLocaleString("es-ES")} €/kWh`
              : `${item.watts.toLocaleString("es-ES")} W · ${item.hours} h/día · ${item.days} días · ${item.price.toLocaleString("es-ES")} €/kWh`}
          </p>
        </aside>
      </section>

      <section className="article-body">
        <div className="article-body__inner">
          <article className="article-copy">
            <div className="article-key-facts" aria-label="Datos rápidos del ejemplo">
              <div>
                <span>RANGO DE REFERENCIA</span>
                <b>{item.range}</b>
              </div>
              <div>
                <span>CONSUMO DEL EJEMPLO</span>
                <b>
                  {monthlyKwh.toLocaleString("es-ES", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  kWh/mes
                </b>
              </div>
              <div>
                <span>COSTE ANUAL ORIENTATIVO</span>
                <b>
                  {annualCost.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </b>
              </div>
            </div>

            <h2>El cálculo, paso a paso</h2>
            {isCycleCalculation ? (
              <>
                <p>
                  Para los aparatos que completan programas, el dato de etiqueta
                  en kWh por ciclo describe mejor el consumo que la potencia
                  máxima. Multiplicamos ese consumo por tus ciclos mensuales y
                  por el precio por kWh.
                </p>
                <div className="formula-box">
                  {item.kwhPerCycle?.toLocaleString("es-ES")} kWh/ciclo ×{" "}
                  {item.cyclesPerMonth} ciclos ={" "}
                  {monthlyKwh.toLocaleString("es-ES", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  kWh/mes
                  <br />
                  {monthlyKwh.toLocaleString("es-ES", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  kWh × {item.price.toLocaleString("es-ES")} €/kWh ={" "}
                  {item.exampleCost.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €/mes
                </div>
              </>
            ) : (
              <>
                <p>
                  Primero convertimos la potencia a kilovatios:{" "}
                  {item.watts.toLocaleString("es-ES")} W ÷ 1.000 ={" "}
                  {(item.watts / 1000).toLocaleString("es-ES")} kW. Después la
                  multiplicamos por las horas y días de uso.
                </p>
                <div className="formula-box">
                  {(item.watts / 1000).toLocaleString("es-ES")} kW × {item.hours} h
                  × {item.days} días ={" "}
                  {monthlyKwh.toLocaleString("es-ES", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  kWh/mes
                  <br />
                  {monthlyKwh.toLocaleString("es-ES", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  kWh × {item.price.toLocaleString("es-ES")} €/kWh ={" "}
                  {item.exampleCost.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €/mes
                </div>
              </>
            )}
            <p>
              Esta cuenta sirve para entender el orden de magnitud. {item.caveat}
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
                  "Busca la potencia de entrada en la etiqueta o mide varios días con un medidor de enchufe adecuado para la potencia del aparato."}
              </p>
            </div>

            <h2>Calcula tu caso</h2>
            <p>
              Sustituye los valores del ejemplo por los de tu etiqueta, tu rutina
              y el precio por kWh que quieras analizar.
            </p>
            <div className="article-calculator">
              {isCycleCalculation && item.kwhPerCycle && item.cyclesPerMonth ? (
                <CycleCalculator
                  initialCycles={item.cyclesPerMonth}
                  initialKwhPerCycle={item.kwhPerCycle}
                  initialName={item.name}
                  initialPrice={item.price}
                />
              ) : (
                <EnergyCalculator
                  initialDays={item.days}
                  initialHours={item.hours}
                  initialName={item.name}
                  initialPrice={item.price}
                  initialWatts={item.watts}
                />
              )}
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
                    de afiliado identificados y alternativas para saber cuándo
                    no necesitas comprar.
                  </p>
                </div>
                <Link href={buyingGuide.href}>
                  {buyingGuide.title} <span aria-hidden="true">→</span>
                </Link>
              </aside>
            ) : null}

            <section aria-labelledby="related-guides-title" className="related-guides">
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
                  <Link href={guide.href} key={guide.href}>
                    <span>{guide.title}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
              <div className="guide-grid guide-grid--related">
                {related.map((relatedItem, index) => (
                  <ApplianceCard index={index} item={relatedItem} key={relatedItem.slug} />
                ))}
              </div>
            </section>

            <div className="source-box">
              <h3>Fuente y revisión</h3>
              <p>
                Esta guía es una estimación educativa revisada el {lastUpdated}.
                Compara siempre con la etiqueta, el manual y la medición de tu
                propio equipo antes de tomar una decisión de compra o instalación.
              </p>
              <a href={item.sourceUrl} rel="noopener noreferrer" target="_blank">
                {item.sourceTitle} ↗
              </a>
            </div>
          </article>

          <aside className="article-aside">
            <div className="article-aside__card">
              <h3>Resumen del ejemplo</h3>
              <dl>
                <div>
                  <dt>{isCycleCalculation ? "Consumo por ciclo" : "Potencia usada"}</dt>
                  <dd>
                    {isCycleCalculation
                      ? `${item.kwhPerCycle?.toLocaleString("es-ES")} kWh`
                      : `${item.watts.toLocaleString("es-ES")} W`}
                  </dd>
                </div>
                <div>
                  <dt>{isCycleCalculation ? "Ciclos al mes" : "Uso diario"}</dt>
                  <dd>{isCycleCalculation ? item.cyclesPerMonth : `${item.hours} h/día`}</dd>
                </div>
                <div>
                  <dt>Consumo mensual</dt>
                  <dd>
                    {monthlyKwh.toLocaleString("es-ES", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    kWh
                  </dd>
                </div>
                <div>
                  <dt>Coste mensual</dt>
                  <dd>
                    {item.exampleCost.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </dd>
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
