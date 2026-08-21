import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/app/components/AffiliateLink";
import {
  AMAZON_ASSOCIATE_DISCLOSURE,
  amazonProductUrl,
} from "@/lib/affiliate";
import {
  buyingGuides,
  getBuyingGuide,
  isIndexableBuyingGuideHref,
} from "@/lib/buying-guides";
import { isIndexableEditorialGuideHref } from "@/lib/editorial-guides";
import { LEGAL_OWNER } from "@/lib/legal";
import { absoluteUrl, EDITORIAL_PERSON_ID, SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return buyingGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBuyingGuide(slug);

  if (!guide) {
    return {};
  }

  const path = `/recomendaciones/${guide.slug}`;

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

export default async function BuyingGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getBuyingGuide(slug);

  if (!guide) {
    notFound();
  }

  const path = `/recomendaciones/${guide.slug}`;
  const pageUrl = absoluteUrl(path);
  const related = guide.related.filter(
    (item) =>
      isIndexableBuyingGuideHref(item.href) &&
      isIndexableEditorialGuideHref(item.href),
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
            name: "Recomendaciones",
            item: absoluteUrl("/recomendaciones"),
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
      <section className="simple-hero buying-guide-hero">
        <nav aria-label="Migas de pan" className="breadcrumbs">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/recomendaciones">Recomendaciones</Link>
          <span aria-hidden="true">/</span>
          <span>{guide.title}</span>
        </nav>
        <div className="eyebrow">{guide.eyebrow}</div>
        <h1>{guide.title}</h1>
        <p>{guide.intro}</p>
      </section>

      <section className="simple-body">
        <article className="simple-body__inner buying-guide">
          <p className="article-updated">
            Revisado el {formatDate(guide.updatedAt)} · Responsable editorial:{" "}
            <Link href="/sobre-vatioclaro">{LEGAL_OWNER.name}</Link> ·{" "}
            <Link href="/metodologia">Método y criterios</Link>
          </p>

          <div className="guide-answer">
            <span>RESPUESTA RÁPIDA</span>
            <p>{guide.directAnswer}</p>
          </div>

          <div className="affiliate-disclosure" role="note">
            <b>Transparencia · publicidad y enlaces de afiliado</b>
            <p>
              {AMAZON_ASSOCIATE_DISCLOSURE} Si realizas una compra desde los
              enlaces señalados, podemos recibir una comisión sin coste
              adicional para ti. La comisión no modifica nuestros criterios.
            </p>
          </div>

          <div
            aria-label="Claves de la guía"
            className="article-key-facts guide-key-facts"
          >
            {guide.facts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <b>{fact.value}</b>
              </div>
            ))}
          </div>

          <section className="buying-criteria" aria-labelledby="criteria-title">
            <div className="eyebrow">Antes de comparar</div>
            <h2 id="criteria-title">Los criterios que sí cambian la compra</h2>
            <div className="buying-criteria__grid">
              {guide.criteria.map((criterion, index) => (
                <div key={criterion.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{criterion.title}</h3>
                  <p>{criterion.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="product-profiles" aria-labelledby="profiles-title">
            <div className="eyebrow">
              {guide.profiles.length} perfiles verificados, no un podio
            </div>
            <h2 id="profiles-title">Qué opción encaja con cada necesidad</h2>
            <p className="product-profiles__intro">
              No ordenamos por popularidad ni por comisión. Seleccionamos
              perfiles con documentación primaria y mostramos qué debes verificar
              antes de decidir. No mostramos precios porque pueden cambiar.
            </p>
            <div className="product-profile-list">
              {guide.profiles.map((profile) => (
                <article className="product-profile" key={profile.name}>
                  <div className="product-profile__heading">
                    <div>
                      <span>{profile.label}</span>
                      <h3>{profile.name}</h3>
                    </div>
                    <p>
                      <b>Para quién:</b> {profile.bestFor}
                    </p>
                  </div>
                  <p>{profile.summary}</p>
                  <ul>
                    {profile.checks.map((check) => (
                      <li key={check}>{check}</li>
                    ))}
                  </ul>
                  <div className="product-profile__limitation">
                    <b>Límite que debes conocer</b>
                    <p>{profile.limitation}</p>
                  </div>
                  <div className="product-profile__actions">
                    <div>
                      <span>Publicidad · enlace de afiliado</span>
                      <AffiliateLink
                        context={guide.slug}
                        href={amazonProductUrl(profile.amazonAsin)}
                        label={`Ver ficha de ${profile.name} en Amazon`}
                        product={profile.name}
                      />
                    </div>
                    {profile.source ? (
                      <a
                        className="manufacturer-link"
                        href={profile.source.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {profile.source.title} ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {guide.sections.map((section) => (
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
            </section>
          ))}

          <section aria-labelledby="guide-faq-title" className="guide-faq">
            <div className="eyebrow">Preguntas habituales</div>
            <h2 id="guide-faq-title">Respuestas antes de decidir</h2>
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
              <div className="eyebrow">Siguiente paso</div>
              <h2 id="related-reading-title">Mide, calcula y decide</h2>
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
            <h2>Fuentes y criterio de revisión</h2>
            <p>
              Esta guía combina documentación de fabricante con criterios
              editoriales propios. No sustituye el manual del producto ni el
              asesoramiento de una persona profesional cuando existe una
              instalación o un riesgo eléctrico.
            </p>
            <ul className="source-list">
              {guide.sources.map((source) => (
                <li key={source.url}>
                  {source.url.startsWith("/") ? (
                    <Link href={source.url}>{source.title}</Link>
                  ) : (
                    <a
                      href={source.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {source.title} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <p>
              Consulta también nuestra{" "}
              <Link href="/afiliacion">política de afiliación y selección</Link>.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
