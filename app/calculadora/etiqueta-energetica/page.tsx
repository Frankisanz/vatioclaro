import type { Metadata } from "next";
import Link from "next/link";
import { EnergyLabelCalculator } from "../../components/EnergyLabelCalculator";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const description =
  "Convierte los kWh/100 ciclos o kWh/año de una etiqueta energética en coste mensual, anual, a 5 años y a 10 años.";

export const metadata: Metadata = {
  title: "Calculadora de coste con la etiqueta energética",
  description,
  alternates: { canonical: "/calculadora/etiqueta-energetica" },
  openGraph: {
    type: "website",
    url: "/calculadora/etiqueta-energetica",
    title: "Calculadora de etiqueta energética | " + SITE_NAME,
    description,
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Calculadora de etiqueta energética de VatioClaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de etiqueta energética | " + SITE_NAME,
    description,
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function EnergyLabelCalculatorPage() {
  const pageUrl = absoluteUrl("/calculadora/etiqueta-energetica");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": pageUrl + "#app",
    name: "Calculadora de etiqueta energética",
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
        <div className="eyebrow">Datos declarados del modelo</div>
        <h1>Convierte la etiqueta energética en coste de uso.</h1>
        <p>
          Introduce exactamente los kWh que aparecen en la etiqueta y tu propio
          precio de análisis. La proyección mantiene ambos valores constantes
          para que puedas comparar, no para predecir precios futuros.
        </p>
      </section>
      <section className="article-body calculator-workspace">
        <div className="simple-body__inner">
          <EnergyLabelCalculator />
          <h2>Dos métricas distintas</h2>
          <p>
            En aparatos que muestran kWh/100 ciclos, añade los ciclos que haces
            al mes. En frigoríficos y otros productos que declaran kWh/año, no
            conviertas la potencia nominal en 24 horas de uso: introduce el dato
            anual de ese modelo.
          </p>
          <p>
            La etiqueta usa condiciones normalizadas y permite comparar modelos.
            Tu consumo puede variar por programa, carga, temperatura, instalación
            y hábitos. Consulta la{" "}
            <Link href="/metodologia">metodología de los cálculos</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
