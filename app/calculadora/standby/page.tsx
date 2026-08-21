import type { Metadata } from "next";
import Link from "next/link";
import { StandbyCalculator } from "../../components/StandbyCalculator";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const description =
  "Estima los kWh y euros al año de varios aparatos en standby con vatios, horas y precio editables, sin cifras alarmistas.";

export const metadata: Metadata = {
  title: "Calculadora de consumo en standby",
  description,
  alternates: { canonical: "/calculadora/standby" },
  openGraph: {
    type: "website",
    url: "/calculadora/standby",
    title: "Calculadora de standby | " + SITE_NAME,
    description,
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Calculadora de consumo en standby de VatioClaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de standby | " + SITE_NAME,
    description,
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function StandbyCalculatorPage() {
  const pageUrl = absoluteUrl("/calculadora/standby");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": pageUrl + "#app",
    name: "Calculadora de consumo en standby",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: pageUrl,
    inLanguage: "es-ES",
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <main id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="simple-hero calculator-page-hero">
        <div className="eyebrow">Consumo en espera</div>
        <h1>¿Cuánto cuesta dejar tus aparatos en standby?</h1>
        <p>
          Usa una medición o el dato declarado de tus equipos. El consumo en
          espera varía mucho entre dispositivos, modos de red y configuraciones.
        </p>
      </section>
      <section className="article-body calculator-workspace">
        <div className="simple-body__inner">
          <StandbyCalculator />
          <h2>Qué dato conviene introducir</h2>
          <p>
            La opción más precisa es medir cada aparato durante un periodo
            representativo con un medidor compatible. Si usas un promedio,
            trátalo como supuesto: multiplicar el mismo valor por muchos aparatos
            puede ampliar el error.
          </p>
          <p>
            Si algunos equipos permanecen en espera durante horas distintas,
            calcula cada grupo por separado. Lee también la guía sobre{" "}
            <Link href="/guias/consumo-fantasma">
              consumo fantasma y modos de espera
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
