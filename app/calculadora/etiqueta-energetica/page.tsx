import type { Metadata } from "next";
import Link from "next/link";
import { EnergyLabelCalculator } from "../../components/EnergyLabelCalculator";
import { absoluteUrl, OPEN_GRAPH_DEFAULTS, SITE_NAME } from "@/lib/site";

const description =
  "Convierte los kWh/100 ciclos o kWh/año de una etiqueta energética en coste mensual, anual, a 5 años y a 10 años.";

export const metadata: Metadata = {
  title: "Calculadora de coste con la etiqueta energética",
  description,
  alternates: { canonical: "/calculadora/etiqueta-energetica" },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
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

          <h2>Dos ejemplos resueltos</h2>
          <p>
            Los valores siguientes son ejemplos para mostrar la fórmula; usa los
            de la etiqueta de tu modelo.
          </p>
          <div className="formula-box">
            Etiqueta anual: 200 kWh/año × 0,25 €/kWh = 50 € al año
            <br />
            A 5 años: 250 € · A 10 años: 500 € (precio constante)
          </div>
          <div className="formula-box">
            Etiqueta por ciclos: 55 kWh/100 ciclos ÷ 100 = 0,55 kWh/ciclo
            <br />
            0,55 kWh × 20 ciclos/mes × 12 meses = 132 kWh/año → 33 € al año
          </div>

          <h2>Preguntas frecuentes sobre la etiqueta energética</h2>
          <h3>¿Dónde encuentro los datos si ya no tengo la etiqueta?</h3>
          <p>
            Las etiquetas europeas actuales incluyen un código QR que enlaza con
            la base de datos EPREL, donde puedes consultar la ficha del modelo.
            También puedes buscar la marca y el modelo exacto, que aparecen en
            la placa de características del aparato, en la propia base de datos
            EPREL o en el manual.
          </p>
          <h3>¿Por qué ya no hay clases A+++?</h3>
          <p>
            La Unión Europea reescaló las etiquetas a una escala de A a G. En
            frigoríficos, lavadoras, lavavajillas y pantallas, el cambio llegó
            en marzo de 2021, y en secadoras en julio de 2025. Un aparato A+++
            antiguo puede aparecer ahora en una clase inferior sin haber
            cambiado su consumo, por lo que conviene comparar los kWh y no solo
            la letra.
          </p>
          <h3>¿Basta con la clase energética para comparar dos modelos?</h3>
          <p>
            No. La clase depende del consumo relativo al tamaño o la capacidad
            del aparato. Un frigorífico grande con buena clase puede consumir
            más kWh al año que uno pequeño con una clase peor. Si lo que quieres
            saber es cuánto pagarás, compara los kWh que declara cada etiqueta
            con esta calculadora.
          </p>
        </div>
      </section>
    </main>
  );
}
