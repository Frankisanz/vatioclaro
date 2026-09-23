import type { Metadata } from "next";
import Link from "next/link";
import { PaybackCalculator } from "../../components/PaybackCalculator";
import { absoluteUrl, OPEN_GRAPH_DEFAULTS, SITE_NAME } from "@/lib/site";

const description =
  "Compara precio de compra y coste energético de dos productos. Muestra diferencias y plazo matemático de recuperación sin recomendar una compra.";

export const metadata: Metadata = {
  title: "Calculadora de amortización: compra y consumo",
  description,
  alternates: { canonical: "/calculadora/amortizacion" },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
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

          <h2>Ejemplo resuelto</h2>
          <p>
            Supongamos dos modelos que cubren la misma necesidad: A cuesta 400 €
            y declara 250 kWh/año; B cuesta 550 € y declara 150 kWh/año. Son
            cifras de ejemplo con un precio de 0,25 €/kWh.
          </p>
          <div className="formula-box">
            Energía A: 250 kWh × 0,25 €/kWh = 62,50 €/año
            <br />
            Energía B: 150 kWh × 0,25 €/kWh = 37,50 €/año
            <br />
            Sobrecoste de B: 550 € − 400 € = 150 €
            <br />
            Plazo de recuperación: 150 € ÷ 25 €/año = 6 años
          </div>
          <p>
            Si esperas usar el aparato bastante más de seis años, el modelo B
            acabaría costando menos en total con estos datos. Si lo cambiarás
            antes, o si en tu casa se usará menos que en el ensayo de la
            etiqueta, la diferencia se reduce.
          </p>

          <h2>Preguntas frecuentes sobre la amortización</h2>
          <h3>¿Qué pasa si cambia el precio de la electricidad?</h3>
          <p>
            El plazo cambia en proporción inversa. En el ejemplo, con 0,20
            €/kWh el ahorro anual baja a 20 € y el plazo sube a 7,5 años; con
            0,30 €/kWh, el ahorro sube a 30 € y el plazo baja a 5 años. Prueba
            varios precios para ver lo sensible que es tu decisión.
          </p>
          <h3>¿Por qué la calculadora dice que no hay plazo de recuperación?</h3>
          <p>
            Porque el modelo más caro no consume menos energía, o porque el
            modelo que consume menos también es el más barato. En el primer
            caso no hay ahorro que recupere el sobrecoste; en el segundo no hay
            sobrecoste que recuperar.
          </p>
          <h3>¿Debo elegir siempre el que se amortiza antes?</h3>
          <p>
            No necesariamente. La cuenta solo mide energía y precio de compra.
            Capacidad, ruido, fiabilidad, garantía y cómo encaja el aparato en
            tu casa pueden pesar más. Úsala para saber cuánto vale la diferencia
            de eficiencia, no como recomendación de compra.
          </p>
        </div>
      </section>
    </main>
  );
}
