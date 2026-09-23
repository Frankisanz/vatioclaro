import type { Metadata } from "next";
import Link from "next/link";
import { StandbyCalculator } from "../../components/StandbyCalculator";
import { absoluteUrl, OPEN_GRAPH_DEFAULTS, SITE_NAME } from "@/lib/site";

const description =
  "Estima los kWh y euros al año de varios aparatos en standby con vatios, horas y precio editables, sin cifras alarmistas.";

export const metadata: Metadata = {
  title: "Calculadora de consumo en standby",
  description,
  alternates: { canonical: "/calculadora/standby" },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
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
          <h2 className="visually-hidden">Calculadora de standby</h2>
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

          <h2>Ejemplo resuelto</h2>
          <p>
            Los valores iniciales de la calculadora representan ocho aparatos
            que consumen 1 W cada uno en espera durante 20 horas al día, todo el
            año. Son un ejemplo editable, no una medición de ningún hogar:
          </p>
          <div className="formula-box">
            8 aparatos × 1 W × 20 h/día × 365 días = 58.400 Wh = 58,4 kWh/año
            <br />
            58,4 kWh/año × 0,25 €/kWh = 14,60 € al año
          </div>
          <p>
            El resultado muestra por qué el standby merece una revisión aunque
            cada aparato consuma poco: el coste procede de las horas acumuladas,
            no de la potencia. Con 3 W por aparato, la misma cuenta triplica el
            resultado.
          </p>

          <h2>Preguntas frecuentes sobre el consumo en espera</h2>
          <h3>¿Qué aparatos suelen quedarse en espera?</h3>
          <p>
            Televisores, decodificadores, consolas, barras de sonido, equipos de
            música, microondas y hornos con reloj, impresoras, cargadores
            enchufados y altavoces inteligentes. El router y los equipos de
            alarma o domótica también consumen de forma continua, pero no
            conviene apagarlos si dan servicio.
          </p>
          <h3>¿Cómo mido un consumo tan pequeño?</h3>
          <p>
            Con un medidor de enchufe. Muchos medidores domésticos pierden
            precisión por debajo de unos pocos vatios, así que es útil medir
            juntos todos los aparatos de una regleta durante un día completo y
            dividir los kWh registrados entre las horas. Así obtienes la
            potencia media del grupo.
          </p>
          <h3>¿Compensa comprar una regleta con interruptor?</h3>
          <p>
            Compara su precio con el ahorro anual que calcule esta herramienta
            para los aparatos que realmente puedes apagar. Si el ahorro es de
            pocos euros al año, la regleta tardará en compensar; si agrupa
            equipos con un consumo en espera alto, puede recuperarse antes.
          </p>
        </div>
      </section>
    </main>
  );
}
