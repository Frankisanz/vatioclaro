import type { Metadata } from "next";
import Link from "next/link";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/lib/affiliate";
import { buyingGuides } from "@/lib/buying-guides";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Productos para medir y reducir el consumo con criterio",
  description:
    "Guías de compra sobre medidores, enchufes inteligentes, regletas y termómetros. Criterios verificables, límites y enlaces de afiliado transparentes.",
  alternates: { canonical: "/recomendaciones" },
  openGraph: {
    type: "website",
    url: "/recomendaciones",
    title: `Productos útiles para medir y ahorrar | ${SITE_NAME}`,
    description:
      "Compara funciones y compatibilidad antes de comprar herramientas para medir o controlar el consumo doméstico.",
    images: [
      {
        url: "/og.png",
        width: 1672,
        height: 941,
        alt: "Recomendaciones de medición y ahorro de VatioClaro",
      },
    ],
  },
};

export default function RecommendationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Productos útiles para medir y reducir el consumo",
    url: absoluteUrl("/recomendaciones"),
    inLanguage: "es-ES",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: buyingGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: absoluteUrl(`/recomendaciones/${guide.slug}`),
      })),
    },
  };

  return (
    <main id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="simple-hero recommendation-hub-hero">
        <div className="eyebrow">Recomendaciones con método</div>
        <h1>Compra solo la herramienta que resuelve tu duda.</h1>
        <p>
          Comparamos funciones, compatibilidad y límites antes de enlazar un
          producto. Sin precios caducados, rankings artificiales ni promesas de
          ahorro.
        </p>
        <div className="recommendation-principles" aria-label="Criterios editoriales">
          <span>✓ Documentación del fabricante</span>
          <span>✓ Cuándo no comprar</span>
          <span>✓ Afiliación visible</span>
        </div>
      </section>

      <section className="recommendation-directory">
        <div className="recommendation-directory__intro">
          <div>
            <div className="eyebrow">Biblioteca de compra</div>
            <h2>Empieza por el problema, no por el producto.</h2>
          </div>
          <p>
            Cada guía explica qué dato mirar, para quién sirve cada perfil y qué
            limitación puede convertir una compra en innecesaria o insegura.
          </p>
        </div>

        <div className="recommendation-grid">
          {buyingGuides.map((guide, index) => (
            <Link
              className="recommendation-card"
              href={`/recomendaciones/${guide.slug}`}
              key={guide.slug}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className="eyebrow">{guide.eyebrow}</div>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
              <b>
                Ver guía <span aria-hidden="true">→</span>
              </b>
            </Link>
          ))}
        </div>
      </section>

      <section className="affiliate-method-summary">
        <div>
          <div className="eyebrow">Transparencia comercial</div>
          <h2>La comisión no decide la recomendación.</h2>
        </div>
        <div>
          <p>{AMAZON_ASSOCIATE_DISCLOSURE}</p>
          <p>
            Si compras después de utilizar uno de nuestros enlaces, podemos
            recibir una comisión sin coste adicional para ti. Amazon determina
            precio, disponibilidad, envío y condiciones.{" "}
            <Link href="/afiliacion">Consulta cómo funciona la afiliación</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
