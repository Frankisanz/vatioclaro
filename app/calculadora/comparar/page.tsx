import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonCalculator } from "../../components/ComparisonCalculator";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const description =
  "Compara el consumo y coste de dos escenarios con potencia, horas y días de uso editables. La misma tarea y todos los supuestos a la vista.";

export const metadata: Metadata = {
  title: "Comparar el consumo eléctrico de dos aparatos",
  description,
  alternates: { canonical: "/calculadora/comparar" },
  openGraph: {
    type: "website",
    url: "/calculadora/comparar",
    title: "Calculadora comparativa de consumo | " + SITE_NAME,
    description,
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Comparación de consumo eléctrico en VatioClaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora comparativa de consumo | " + SITE_NAME,
    description,
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function ComparisonCalculatorPage() {
  const pageUrl = absoluteUrl("/calculadora/comparar");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": pageUrl + "#app",
    name: "Calculadora comparativa de consumo eléctrico",
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
        <div className="eyebrow">Comparación A/B</div>
        <h1>Compara dos usos eléctricos con la misma tarea.</h1>
        <p>
          Introduce potencia y tiempo de cada opción. La herramienta calcula la
          diferencia, pero no decide cuál te conviene: rendimiento, capacidad y
          resultado útil también importan.
        </p>
      </section>
      <section className="article-body calculator-workspace">
        <div className="simple-body__inner">
          <ComparisonCalculator />
          <h2>Cómo hacer una comparación justa</h2>
          <p>
            Compara condiciones equivalentes: la misma cantidad de comida, la
            misma temperatura o una tarea de duración comparable. Los W indican
            potencia eléctrica, no eficiencia ni trabajo útil por sí solos.
          </p>
          <p>
            Para cálculos por etiqueta o consumo diario, usa la{" "}
            <Link href="/calculadora">calculadora universal</Link>. Para entender
            nuestras condiciones y límites, consulta la{" "}
            <Link href="/metodologia">metodología editorial</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
