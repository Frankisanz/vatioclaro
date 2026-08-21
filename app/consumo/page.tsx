import type { Metadata } from "next";
import Link from "next/link";
import { ApplianceCard } from "@/app/components/ApplianceCard";
import { appliances } from "@/lib/appliances";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consumo de electrodomésticos: guías y costes",
  description:
    "Consulta cuánto consumen electrodomésticos, climatización y tecnología. Cada guía incluye coste, fórmula, factores y calculadora editable.",
  alternates: { canonical: "/consumo" },
  openGraph: {
    type: "website",
    url: "/consumo",
    title: `Guías de consumo eléctrico por aparato | ${SITE_NAME}`,
    description:
      "Calcula cuánto consumen tus aparatos y descubre los factores que más cambian el coste.",
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Biblioteca de consumo de VatioClaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Guías de consumo eléctrico por aparato | ${SITE_NAME}`,
    description:
      "Calcula cuánto consumen tus aparatos y descubre los factores que más cambian el coste.",
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function ConsumptionLibraryPage() {
  const indexableAppliances = appliances.filter((item) => item.indexable);
  const byCategory = indexableAppliances.reduce<Record<string, typeof appliances>>(
    (groups, item) => {
      groups[item.category] ??= [];
      groups[item.category].push(item);
      return groups;
    },
    {},
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/consumo")}#collection`,
    name: "Guías de consumo eléctrico por aparato",
    url: absoluteUrl("/consumo"),
    inLanguage: "es-ES",
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: indexableAppliances.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Cuánto consume ${item.articleName}`,
        url: absoluteUrl(`/consumo/${item.slug}`),
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
        <div className="eyebrow">Biblioteca de consumo</div>
        <h1>Calcula qué aparatos pesan más en tu factura.</h1>
        <p>
          Elige un aparato para ver un ejemplo editable, la fórmula y los
          factores que hacen que su consumo real suba o baje.
        </p>
        <div className="content-hub-hero__actions">
          <Link className="button button--dark" href="/calculadora">
            Calcular otro aparato
          </Link>
          <Link className="text-link" href="/consumo/electrodomesticos-que-mas-consumen">
            Ver cuáles consumen más →
          </Link>
        </div>
      </section>

      <section className="guide-library">
        {Object.entries(byCategory).map(([category, items]) => (
          <section className="guide-category" key={category}>
            <div className="section-heading section-heading--compact">
              <div>
                <div className="eyebrow">{category}</div>
                <h2>Guías de {category.toLocaleLowerCase()}</h2>
              </div>
              <p>{items.length} calculadoras y explicaciones prácticas.</p>
            </div>
            <div className="guide-grid">
              {items.map((item, index) => (
                <ApplianceCard index={index} item={item} key={item.slug} />
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
