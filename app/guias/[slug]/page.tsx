import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContractedPowerReview } from "@/app/components/ContractedPowerReview";
import { ComparisonCalculator } from "@/app/components/ComparisonCalculator";
import { EditorialComparisonTable } from "@/app/components/EditorialComparisonTable";
import { EditorialIllustration } from "@/app/components/EditorialIllustration";
import { EnergyLabelCalculator } from "@/app/components/EnergyLabelCalculator";
import { SourceLink } from "@/app/components/SourceLink";
import { isIndexableBuyingGuideHref } from "@/lib/buying-guides";
import {
  editorialGuides,
  getEditorialGuide,
  isIndexableEditorialGuideHref,
} from "@/lib/editorial-guides";
import { LEGAL_OWNER } from "@/lib/legal";
import { absoluteUrl, EDITORIAL_PERSON_ID, SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

const powerAndTimeComparisonGuides = new Set([
  "induccion-vs-vitroceramica-consumo",
]);

export function generateStaticParams() {
  return editorialGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getEditorialGuide(slug);

  if (!guide) {
    return {};
  }

  const path = `/guias/${guide.slug}`;

  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: path },
    robots: guide.indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "article",
      url: path,
      title: `${guide.seoTitle} | ${SITE_NAME}`,
      description: guide.description,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: [
        {
          url: "/images/vatioclaro-hogar-energia-og.jpg",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME}: ${guide.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.seoTitle} | ${SITE_NAME}`,
      description: guide.description,
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

export default async function EditorialGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getEditorialGuide(slug);

  if (!guide) {
    notFound();
  }

  const path = `/guias/${guide.slug}`;
  const pageUrl = absoluteUrl(path);
  const supportsPowerAndTimeComparison = powerAndTimeComparisonGuides.has(
    guide.slug,
  );
  const related = guide.related.filter(
    (item) =>
      isIndexableEditorialGuideHref(item.href) &&
      isIndexableBuyingGuideHref(item.href),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: guide.title,
        description: guide.description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: "es-ES",
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt,
        image: absoluteUrl("/images/vatioclaro-hogar-energia-og.jpg"),
        author: { "@id": EDITORIAL_PERSON_ID },
        editor: { "@id": EDITORIAL_PERSON_ID },
        publisher: {
          "@id": `${absoluteUrl("/")}#organization`,
        },
        citation: guide.sources.map((source) => source.url),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: guide.faq.map((entry) => ({
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
            name: "Guías",
            item: absoluteUrl("/guias"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
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
      <section className="simple-hero guide-hero">
        <nav aria-label="Migas de pan" className="breadcrumbs">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/guias">Guías</Link>
          <span aria-hidden="true">/</span>
          <span>{guide.title}</span>
        </nav>
        <div className="eyebrow">{guide.eyebrow}</div>
        <h1>{guide.title}</h1>
        <p>{guide.intro}</p>
      </section>

      <section className="simple-body">
        <article className="simple-body__inner article-guide">
          <p className="article-updated">
            Revisado el {formatDate(guide.updatedAt)} · Responsable editorial:{" "}
            <Link href="/sobre-vatioclaro">{LEGAL_OWNER.name}</Link> ·{" "}
            <Link href="/metodologia">Método y criterios</Link>
          </p>

          <EditorialIllustration />

          <div className="guide-answer">
            <span>RESPUESTA RÁPIDA</span>
            <p>{guide.directAnswer}</p>
          </div>

          <div
            aria-label="Claves de la guía"
            className="article-key-facts guide-key-facts"
          >
            {guide.quickFacts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <b>{fact.value}</b>
              </div>
            ))}
          </div>

          {guide.comparison ? (
            <>
              <EditorialComparisonTable comparison={guide.comparison} />
              {supportsPowerAndTimeComparison ? (
                <section
                  aria-labelledby="guide-comparison-calculator-title"
                  className="embedded-tool embedded-comparison-tool"
                >
                  <div className="eyebrow">Calcula tus dos escenarios</div>
                  <h2 id="guide-comparison-calculator-title">
                    Sustituye el ejemplo por una tarea comparable
                  </h2>
                  <p>
                    Introduce la potencia y el tiempo de cada alternativa. El
                    resultado compara energía, no prestaciones ni rendimiento útil.
                  </p>
                  <ComparisonCalculator />
                </section>
              ) : (
                <section
                  aria-labelledby="guide-comparison-method-title"
                  className="measurement-note"
                >
                  <h2 id="guide-comparison-method-title">
                    Compara el mismo servicio, no solo vatios y horas
                  </h2>
                  <p>
                    {guide.slug === "horno-vs-freidora-aire-consumo"
                      ? "En esta comparación no incrustamos el comparador simple: potencia por tiempo no captura el termostato, el precalentado ni las tandas. Usa los kWh medidos de la comida completa y conserva visibles cantidad y resultado."
                      : "En climatización no incrustamos el comparador simple porque no modela COP, SCOP, carga térmica ni condiciones exteriores. Usa kWh medidos o declarados para un servicio equivalente y conserva visibles las condiciones de cada dato."}
                  </p>
                </section>
              )}
            </>
          ) : null}

          {guide.sections.map((section, index) => (
            <section className="guide-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.callout ? (
                <div className="callout">{section.callout}</div>
              ) : null}

              {guide.slug === "potencia-contratada" && index === 1 ? (
                <div className="embedded-tool">
                  <ContractedPowerReview />
                </div>
              ) : null}
              {guide.slug === "etiqueta-energetica-a-euros" && index === 1 ? (
                <div className="embedded-tool">
                  <EnergyLabelCalculator />
                </div>
              ) : null}
            </section>
          ))}

          <section aria-labelledby="guide-faq-title" className="guide-faq">
            <div className="eyebrow">Preguntas habituales</div>
            <h2 id="guide-faq-title">Respuestas breves antes de decidir</h2>
            {guide.faq.map((entry) => (
              <div className="guide-faq__item" key={entry.question}>
                <h3>{entry.question}</h3>
                <p>{entry.answer}</p>
              </div>
            ))}
          </section>

          {related.length ? (
            <section
              aria-labelledby="related-reading-title"
              className="related-reading"
            >
              <div className="eyebrow">Sigue con el siguiente paso</div>
              <h2 id="related-reading-title">
                Lecturas y herramientas relacionadas
              </h2>
              <div className="related-reading__grid">
                {related.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <span>{item.title}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="source-box">
            <h2>Fuentes oficiales y criterio de revisión</h2>
            <p>
              Esta guía explica escenarios generales y no sustituye tu contrato,
              una medición completa, el asesoramiento de una persona instaladora
              autorizada ni la información vigente del organismo competente.
            </p>
            <ul className="source-list">
              {guide.sources.map((source, index) => (
                <li key={source.url}>
                  <SourceLink
                    context={guide.slug}
                    href={source.url}
                    sourceId={`${guide.slug}:${index + 1}`}
                  >
                    {source.title} ↗
                  </SourceLink>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </main>
  );
}
