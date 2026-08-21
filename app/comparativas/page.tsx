import type { Metadata } from "next";
import Link from "next/link";
import { editorialGuides } from "@/lib/editorial-guides";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const comparisonSlugs = [
  "horno-vs-freidora-aire-consumo",
  "induccion-vs-vitroceramica-consumo",
  "aire-acondicionado-split-vs-portatil",
  "radiador-electrico-vs-bomba-calor",
] as const;

const comparisons = comparisonSlugs.map((slug) => {
  const guide = editorialGuides.find((candidate) => candidate.slug === slug);

  if (!guide) {
    throw new Error(`Falta la comparativa editorial ${slug}`);
  }

  return guide;
}).filter((guide) => guide.indexable);

export const metadata: Metadata = {
  title: "Comparativas de consumo eléctrico para la misma tarea",
  description:
    "Compara el consumo de dos alternativas con la misma tarea, supuestos visibles y una calculadora A/B reutilizable.",
  alternates: { canonical: "/comparativas" },
  openGraph: {
    type: "website",
    url: "/comparativas",
    title: `Comparativas de consumo eléctrico | ${SITE_NAME}`,
    description:
      "Horno o freidora de aire, inducción o vitrocerámica y climatización comparadas sin confundir potencia con trabajo útil.",
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Comparativas de consumo de VatioClaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Comparativas de consumo eléctrico | ${SITE_NAME}`,
    description:
      "Horno o freidora de aire, inducción o vitrocerámica y climatización comparadas sin confundir potencia con trabajo útil.",
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function ComparisonsPage() {
  const pageUrl = absoluteUrl("/comparativas");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Comparativas de consumo eléctrico",
    url: pageUrl,
    inLanguage: "es-ES",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: comparisons.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: absoluteUrl(`/guias/${guide.slug}`),
      })),
    },
  };

  return (
    <main id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="simple-hero content-hub-hero">
        <div className="eyebrow">Comparar con criterio</div>
        <h1>Dos opciones, una misma tarea y las cuentas a la vista.</h1>
        <p>
          Fijamos primero qué necesitas conseguir y después comparamos energía,
          tiempo y coste. La potencia nominal por sí sola no decide qué opción
          consume menos.
        </p>
        <div className="content-hub-hero__actions">
          <Link className="button button--dark" href="/calculadora/comparar">
            Comparar mis dos escenarios
          </Link>
          <Link className="text-link" href="/metodologia">
            Cómo hacemos las comparaciones →
          </Link>
        </div>
      </section>

      <section className="guide-directory" aria-labelledby="comparativas-listado">
        <div className="section-heading section-heading--compact">
          <div>
            <div className="eyebrow">Biblioteca inicial</div>
            <h2 id="comparativas-listado">Comparativas publicadas</h2>
          </div>
          <p>
            Solo publicamos una comparación cuando puede explicar sus límites y
            usar datos que el lector pueda sustituir por los de su caso.
          </p>
        </div>
        {comparisons.map((guide, index) => (
          <Link
            className="editorial-card"
            href={`/guias/${guide.slug}`}
            key={guide.slug}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <div className="eyebrow">{guide.eyebrow}</div>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
