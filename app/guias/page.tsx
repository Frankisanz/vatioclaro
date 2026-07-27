import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const guides = [
  {
    href: "/guias/como-calcular-consumo-electrico",
    eyebrow: "Empezar por aquí",
    title: "Cómo calcular el consumo eléctrico de cualquier aparato",
    text: "La fórmula, los datos que necesitas y cuándo no conviene usar la potencia máxima como consumo real.",
  },
  {
    href: "/consumo/electrodomesticos-que-mas-consumen",
    eyebrow: "Prioriza",
    title: "Qué electrodomésticos consumen más en casa",
    text: "Aprende a detectar los aparatos que merece la pena medir y compara ejemplos con supuestos claros.",
  },
  {
    href: "/guias/consumo-fantasma",
    eyebrow: "Uso continuo",
    title: "Consumo fantasma: qué es y cómo comprobarlo",
    text: "Distingue el modo espera real de los equipos que deben permanecer conectados y calcula su impacto anual.",
  },
] as const;

export const metadata: Metadata = {
  title: "Guías para entender y reducir el consumo eléctrico",
  description:
    "Guías prácticas sobre consumo eléctrico, coste por kWh y ahorro doméstico. Explicaciones claras, fuentes y calculadoras editables.",
  alternates: { canonical: "/guias" },
  openGraph: {
    type: "website",
    url: "/guias",
    title: `Guías de ahorro y consumo eléctrico | ${SITE_NAME}`,
    description:
      "Aprende a calcular el consumo de tu hogar y toma mejores decisiones antes de comprar, instalar o encender.",
    images: [
      { url: "/og.png", width: 1672, height: 941, alt: "Guías de ahorro energético de VatioClaro" },
    ],
  },
};

export default function GuidesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guías para entender el consumo eléctrico",
    url: absoluteUrl("/guias"),
    inLanguage: "es-ES",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: absoluteUrl(guide.href),
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
        <div className="eyebrow">Guías prácticas</div>
        <h1>Entiende tu consumo antes de intentar reducirlo.</h1>
        <p>
          Explicamos las fórmulas, los límites de cada estimación y los datos que
          merece la pena buscar en una etiqueta o factura.
        </p>
      </section>
      <section className="guide-directory">
        {guides.map((guide, index) => (
          <Link className="editorial-card" href={guide.href} key={guide.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <div className="eyebrow">{guide.eyebrow}</div>
              <h2>{guide.title}</h2>
              <p>{guide.text}</p>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
