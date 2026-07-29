import type { Metadata } from "next";
import Link from "next/link";
import { EnergyCalculator } from "../components/EnergyCalculator";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculadora de consumo eléctrico en euros",
  description:
    "Calcula cuántos kWh consume un aparato y cuánto cuesta por hora, al mes y al año a partir de su potencia y tiempo de uso.",
  alternates: { canonical: "/calculadora" },
  openGraph: {
    type: "website",
    url: "/calculadora",
    title: `Calculadora de consumo eléctrico | ${SITE_NAME}`,
    description:
      "Convierte vatios y horas de uso en kWh, coste por hora, coste mensual y coste anual.",
    images: [
      { url: "/og.png", width: 1672, height: 941, alt: "Calculadora de consumo eléctrico" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Calculadora de consumo eléctrico | ${SITE_NAME}`,
    description:
      "Convierte vatios y horas de uso en kWh, coste por hora, coste mensual y coste anual.",
    images: ["/og.png"],
  },
};

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de consumo eléctrico de VatioClaro",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: absoluteUrl("/calculadora"),
    inLanguage: "es-ES",
    description:
      "Herramienta gratuita para estimar el consumo eléctrico y el coste de un aparato a partir de vatios, horas, días y precio por kWh.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <main id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="simple-hero">
        <div className="eyebrow">Herramienta gratuita</div>
        <h1>Calculadora de consumo eléctrico.</h1>
        <p>
          Introduce los vatios del aparato, el tiempo de uso y el precio por kWh
          que quieras probar. El resultado se actualiza al instante.
        </p>
      </section>
      <section className="article-body">
        <div className="simple-body__inner">
          <EnergyCalculator />

          <div className="calculator-explainer">
            <div>
              <span>01</span>
              <h2>Busca el dato correcto</h2>
              <p>
                La potencia suele aparecer en la etiqueta técnica, cerca del cable
                o en el manual. Si solo ves kilovatios, multiplica por 1.000: 1,5
                kW son 1.500 W.
              </p>
            </div>
            <div>
              <span>02</span>
              <h2>Usa tu rutina real</h2>
              <p>
                Anota horas y días de una semana normal. Para aparatos por
                programas, como lavadora o lavavajillas, es preferible usar los
                kWh por ciclo de la etiqueta.
              </p>
            </div>
            <div>
              <span>03</span>
              <h2>Interpreta el resultado</h2>
              <p>
                El cálculo estima la energía asociada al aparato. Los cargos fijos
                y otros conceptos de tu factura no cambian por cada hora de uso.
              </p>
            </div>
          </div>

          <h2>La fórmula que usa la calculadora</h2>
          <div className="formula-box">
            Consumo (kWh) = potencia (W) ÷ 1.000 × horas de uso × días
            <br />
            Coste (€) = consumo (kWh) × precio (€ / kWh)
          </div>

          <h2>Cuándo la estimación puede desviarse</h2>
          <ul>
            <li>Un termostato, compresor o resistencia puede encenderse y apagarse durante el uso.</li>
            <li>La potencia máxima de una fuente o cargador no siempre es el consumo real del dispositivo.</li>
            <li>Los programas eco pueden durar más y, aun así, consumir menos energía.</li>
          </ul>
          <p>
            Para una cifra más precisa, mide varios días con un medidor de enchufe
            adecuado para la potencia del aparato y usa una muestra representativa
            de tu rutina. Antes de comprar, revisa nuestra{" "}
            <Link href="/recomendaciones/medidores-consumo-electrico-enchufe">
              guía para elegir un medidor de consumo
            </Link>.
          </p>
          <p>
            Si quieres entender cada paso, lee la guía sobre{" "}
            <Link href="/guias/como-calcular-consumo-electrico">
              cómo calcular el consumo eléctrico
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
