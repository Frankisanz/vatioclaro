import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonCalculator } from "../../components/ComparisonCalculator";
import { absoluteUrl, OPEN_GRAPH_DEFAULTS, SITE_NAME } from "@/lib/site";

const description =
  "Compara el consumo y coste de dos escenarios con potencia, horas y días de uso editables. La misma tarea y todos los supuestos a la vista.";

export const metadata: Metadata = {
  title: "Comparar el consumo eléctrico de dos aparatos",
  description,
  alternates: { canonical: "/calculadora/comparar" },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
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

          <h2>Ejemplo resuelto</h2>
          <p>
            La calculadora arranca con dos opciones de ejemplo: un aparato de
            1.500 W usado 2 horas al día y otro de 800 W usado 3 horas al día,
            ambos durante 30 días y con el mismo precio de 0,25 €/kWh.
          </p>
          <div className="formula-box">
            A: 1.500 W ÷ 1.000 × 2 h × 30 días = 90 kWh/mes → 22,50 €
            <br />
            B: 800 W ÷ 1.000 × 3 h × 30 días = 72 kWh/mes → 18,00 €
            <br />
            Diferencia: 18 kWh/mes → 4,50 € al mes, 54 € al año
          </div>
          <p>
            La opción B consume menos aunque funciona más horas, porque su
            potencia es casi la mitad. Lo que se paga es la energía: potencia
            por tiempo.
          </p>

          <h2>Preguntas frecuentes sobre comparar aparatos</h2>
          <h3>¿Por qué un aparato de más vatios puede gastar menos?</h3>
          <p>
            Porque termina antes. Un hervidor de alta potencia puede calentar el
            agua en menos minutos que una placa de menos potencia, y una
            freidora de aire puede cocinar una ración antes que un horno grande.
            Si mides el tiempo real de cada uno para la misma tarea, la
            calculadora te dirá cuál usa menos energía.
          </p>
          <h3>¿Qué hago con aparatos que tienen termostato?</h3>
          <p>
            Los equipos con termostato o compresor no trabajan a potencia
            máxima todo el tiempo. En lugar de la potencia de la placa, usa la
            potencia media medida con un medidor de enchufe durante una sesión
            completa, o los kWh que indique su etiqueta.
          </p>
          <h3>¿Puedo comparar el ventilador con el aire acondicionado?</h3>
          <p>
            Sí, siempre que ambos te den el confort que buscas. La calculadora
            muestra la diferencia de coste, pero un ventilador no baja la
            temperatura de la estancia. Consulta las guías de{" "}
            <Link href="/consumo/ventilador">ventilador</Link> y{" "}
            <Link href="/consumo/aire-acondicionado">aire acondicionado</Link>{" "}
            para entender qué hace cada uno.
          </p>
        </div>
      </section>
    </main>
  );
}
