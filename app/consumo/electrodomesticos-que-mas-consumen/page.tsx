import type { Metadata } from "next";
import Link from "next/link";
import { appliances } from "@/lib/appliances";
import { LEGAL_OWNER } from "@/lib/legal";
import {
  absoluteUrl,
  CONTENT_PUBLISHED_AT,
  CONTENT_UPDATED_AT,
  EDITORIAL_PERSON_ID,
  SITE_NAME,
} from "@/lib/site";

const selectedSlugs = [
  "calefactor-electrico",
  "aire-acondicionado",
  "termo-electrico",
  "horno",
  "frigorifico",
  "lavadora",
] as const;

const examples = selectedSlugs.map((slug) => {
  const item = appliances.find((candidate) => candidate.slug === slug);

  if (!item) {
    throw new Error(`No se ha encontrado la guía ${slug}`);
  }

  return item;
});

export const metadata: Metadata = {
  title: "Qué electrodomésticos consumen más y cómo calcularlo",
  description:
    "Descubre qué aparatos pueden tener mayor impacto en tu factura según sus horas de uso, aprende a comparar ejemplos y calcula tu caso real.",
  alternates: { canonical: "/consumo/electrodomesticos-que-mas-consumen" },
  openGraph: {
    type: "article",
    url: "/consumo/electrodomesticos-que-mas-consumen",
    title: `Qué electrodomésticos consumen más | ${SITE_NAME}`,
    description:
      "Compara ejemplos, entiende qué variables cambian el coste y calcula el consumo de tu hogar.",
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "VatioClaro: consumo eléctrico del hogar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Qué electrodomésticos consumen más | ${SITE_NAME}`,
    description:
      "Compara ejemplos, entiende qué variables cambian el coste y calcula el consumo de tu hogar.",
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function HighestConsumptionGuidePage() {
  const pageUrl = absoluteUrl("/consumo/electrodomesticos-que-mas-consumen");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Qué electrodomésticos consumen más y cómo calcularlo",
        description:
          "Guía para comparar el consumo de los aparatos domésticos según potencia, tiempo de uso y precio por kWh.",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: "es-ES",
        datePublished: CONTENT_PUBLISHED_AT,
        dateModified: CONTENT_UPDATED_AT,
        author: { "@id": EDITORIAL_PERSON_ID },
        editor: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        image: absoluteUrl("/images/vatioclaro-hogar-energia-og.jpg"),
        citation:
          "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guías de consumo",
            item: absoluteUrl("/consumo"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Qué electrodomésticos consumen más",
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
      <section className="simple-hero">
        <nav aria-label="Migas de pan" className="breadcrumbs">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/consumo">Guías de consumo</Link>
          <span aria-hidden="true">/</span>
          <span>Qué electrodomésticos consumen más</span>
        </nav>
        <div className="eyebrow">Guía práctica</div>
        <h1>Qué electrodomésticos consumen más en casa.</h1>
        <p>
          No hay una lista universal: el coste depende de la potencia, pero sobre
          todo de cuántas horas funciona cada aparato. Esta guía te ayuda a mirar
          los datos que de verdad cambian tu factura.
        </p>
      </section>

      <section className="simple-body">
        <article className="simple-body__inner article-guide">
          <p className="article-updated">
            Actualizado: {CONTENT_UPDATED_AT} · Responsable editorial:{" "}
            <Link href="/sobre-vatioclaro">{LEGAL_OWNER.name}</Link> ·{" "}
            <Link href="/metodologia">Método y criterios</Link>
          </p>
          <h2>La respuesta corta: busca potencia alta y muchas horas</h2>
          <p>
            Un calefactor de resistencia, un aire acondicionado o un termo
            eléctrico pueden sumar bastante cuando funcionan varias horas. Un
            frigorífico consume menos potencia en cada momento, pero está activo
            todo el año. En cambio, un horno puede tener una potencia alta y un
            coste moderado si se utiliza solo de forma puntual.
          </p>
          <div className="callout">
            <b>La fórmula útil:</b> consumo (kWh) = potencia (kW) × horas de uso.
            Después, multiplica los kWh por el precio que quieras usar. Para
            lavadoras, lavavajillas y secadoras, mira mejor los kWh por ciclo de
            la etiqueta energética.
          </div>

          <h2>Ejemplos comparables, no una clasificación universal</h2>
          <p>
            La tabla aplica los supuestos visibles de cada guía y un precio de
            ejemplo editable. Sirve para decidir qué aparatos merece la pena
            medir primero; no representa el gasto de todos los hogares.
          </p>
          <div className="table-scroll">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Aparato</th>
                  <th scope="col">Supuesto del ejemplo</th>
                  <th scope="col">Coste mensual orientativo</th>
                  <th scope="col">Qué comprobar</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((item) => (
                  <tr key={item.slug}>
                    <th scope="row">
                      <Link href={`/consumo/${item.slug}`}>{item.name}</Link>
                    </th>
                    <td>
                      {item.calculationMode === "cycle"
                        ? `${item.kwhPerCycle?.toLocaleString("es-ES")} kWh/ciclo · ${item.cyclesPerMonth} ciclos/mes`
                        : `${item.watts.toLocaleString("es-ES")} W · ${item.hours} h/día`}
                    </td>
                    <td>
                      {item.exampleCost.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </td>
                    <td>{item.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Cómo encontrar los aparatos que más pesan en tu caso</h2>
          <ol>
            <li>
              Haz una lista de los equipos que calientan, enfrían, secan o están
              encendidos muchas horas.
            </li>
            <li>
              Revisa la etiqueta, la placa de características o los kWh por ciclo
              antes de usar una potencia máxima como si fuera constante.
            </li>
            <li>
              Prueba tu rutina en la <Link href="/calculadora">calculadora de consumo</Link> y
              convierte el resultado a coste anual para priorizar.
            </li>
            <li>
              Si la decisión es importante, mide varios días con un medidor apto
              para la potencia del aparato o revisa su consumo de etiqueta.
            </li>
          </ol>

          <h2>Evita estas comparaciones engañosas</h2>
          <h3>Comparar solo la potencia máxima</h3>
          <p>
            Un horno o un calentador pueden anunciar muchos vatios y no consumir
            esa cifra de forma constante. Los termostatos y resistencias regulan
            el funcionamiento durante el ciclo.
          </p>
          <h3>Olvidar las horas de funcionamiento</h3>
          <p>
            Un aparato pequeño que trabaja las 24 horas puede acumular más kWh al
            año que otro potente que se usa pocas veces. Por eso conviene mirar
            el mes y el año, no solo el coste de una hora.
          </p>
          <h3>Confundir el coste del aparato con toda la factura</h3>
          <p>
            Esta estimación calcula la energía asociada al uso. La factura
            incluye también conceptos que no dependen directamente de encender un
            aparato, como la potencia contratada y otros cargos.
          </p>

          <div className="article-cta">
            <div>
              <div className="eyebrow">Siguiente paso</div>
              <h2>Convierte tus propios hábitos en euros.</h2>
              <p>
                Ajusta potencia, horas, días y precio por kWh. Es más útil que
                basarse en una lista genérica.
              </p>
            </div>
            <Link className="button button--dark" href="/calculadora">
              Abrir calculadora
            </Link>
          </div>

          <div className="source-box">
            <h3>Fuente y alcance</h3>
            <p>
              Para entender el consumo residencial se ha tomado como referencia
              el estudio SPAHOUSEC III del IDAE. Las cifras de esta página son
              ejemplos didácticos y se enlazan a una guía específica para cada
              aparato.
            </p>
            <a
              href="https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              IDAE — SPAHOUSEC III (2026) ↗
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
