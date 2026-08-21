import type { Metadata } from "next";
import Link from "next/link";
import { PaybackCalculator } from "../../components/PaybackCalculator";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const description =
  "Compara precio de compra y coste energético de dos productos. Muestra diferencias y plazo matemático de recuperación sin recomendar una compra.";

export const metadata: Metadata = {
  title: "Calculadora de compra y consumo de un electrodoméstico",
  description,
  alternates: { canonical: "/calculadora/amortizacion" },
  openGraph: {
    type: "website",
    url: "/calculadora/amortizacion",
    title: "Compra y consumo: compara el coste total | " + SITE_NAME,
    description,
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Comparación de precio de compra y consumo en VatioClaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compra y consumo: compara el coste total | " + SITE_NAME,
    description,
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function PaybackCalculatorPage() {
  const pageUrl = absoluteUrl("/calculadora/amortizacion");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": pageUrl + "#app",
    name: "Calculadora de coste de compra y consumo",
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
        <div className="eyebrow">Coste de propiedad</div>
        <h1>Compara el precio de compra y el consumo.</h1>
        <p>
          Introduce el precio y los kWh/año de dos productos. Verás el coste
          energético y, si existe, el plazo matemático para recuperar una mayor
          inversión mediante menor consumo.
        </p>
      </section>
      <section className="article-body calculator-workspace">
        <div className="simple-body__inner">
          <PaybackCalculator />
          <h2>Qué no incluye esta cuenta</h2>
          <p>
            La herramienta no valora vida útil, reparación, capacidad,
            prestaciones, financiación, precio futuro de la energía ni impacto
            ambiental. Tampoco afirma que el producto con menor coste calculado
            sea la mejor compra para ti.
          </p>
          <p>
            Usa los kWh/año declarados para modelos comparables y revisa que ambos
            cubran la misma necesidad. Puedes comprobar los cálculos básicos en
            la <Link href="/calculadora">calculadora universal</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
