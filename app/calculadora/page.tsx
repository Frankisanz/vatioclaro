import type { Metadata } from "next";
import Link from "next/link";
import { UniversalCalculator } from "../components/UniversalCalculator";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type SearchParams = Record<string, string | string[] | undefined>;
type CalculatorPageProps = { searchParams: Promise<SearchParams> };

const description =
  "Calcula consumo y coste con vatios y tiempo, kWh por ciclo, kWh al año o consumo diario. Edita todos los supuestos y compara escenarios.";

function hasSearchParams(searchParams: SearchParams) {
  return Object.values(searchParams).some((value) => value !== undefined);
}

function firstSafeValue(value: string | string[] | undefined, maxLength = 32) {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate?.slice(0, maxLength);
}

export async function generateMetadata({
  searchParams,
}: CalculatorPageProps): Promise<Metadata> {
  const values = await searchParams;
  const isSharedCalculation = hasSearchParams(values);

  return {
    title: "Calculadora de consumo eléctrico en euros",
    description,
    alternates: { canonical: "/calculadora" },
    ...(isSharedCalculation
      ? { robots: { index: false, follow: true } }
      : undefined),
    openGraph: {
      type: "website",
      url: "/calculadora",
      title: "Calculadora de consumo eléctrico | " + SITE_NAME,
      description,
      images: [
        {
          url: "/images/vatioclaro-hogar-energia-og.jpg",
          width: 1200,
          height: 630,
          alt: "Calculadora de consumo eléctrico de VatioClaro",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Calculadora de consumo eléctrico | " + SITE_NAME,
      description,
      images: ["/images/vatioclaro-hogar-energia-og.jpg"],
    },
  };
}

export default async function CalculatorPage({
  searchParams,
}: CalculatorPageProps) {
  const query = await searchParams;
  const initialValues = {
    method: firstSafeValue(query.metodo),
    watts: firstSafeValue(query.watts),
    hours: firstSafeValue(query.horas),
    days: firstSafeValue(query.dias),
    price: firstSafeValue(query.precio),
    kwhPerCycle: firstSafeValue(query.kwh_ciclo),
    cycles: firstSafeValue(query.ciclos),
    cyclePeriod: firstSafeValue(query.periodo),
    kwhPerYear: firstSafeValue(query.kwh_anio),
    kwhPerDay: firstSafeValue(query.kwh_dia),
    applianceName: firstSafeValue(query.aparato, 80),
  };
  const pageUrl = absoluteUrl("/calculadora");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": pageUrl + "#app",
    name: "Calculadora de consumo eléctrico de VatioClaro",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: pageUrl,
    inLanguage: "es-ES",
    description,
    featureList: [
      "Cálculo por potencia y tiempo",
      "Cálculo por kWh por ciclo",
      "Cálculo por kWh al año",
      "Cálculo por consumo diario",
      "Escenarios de reducción de uso",
    ],
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <main id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="simple-hero calculator-page-hero">
        <div className="eyebrow">Herramienta gratuita · sin registro</div>
        <h1>Convierte el consumo de tu aparato en euros.</h1>
        <p>
          Elige el dato que realmente tienes —potencia, ciclos, etiqueta anual o
          consumo diario— y sustituye el ejemplo por tus propios valores.
        </p>
      </section>
      <section className="article-body calculator-workspace">
        <div className="simple-body__inner">
          <UniversalCalculator initialValues={initialValues} />

          <nav aria-label="Otras calculadoras" className="calculator-tools-grid">
            <Link href="/calculadora/comparar" prefetch={false}>
              <span>Comparar</span>
              <strong>Dos escenarios A/B</strong>
              <small>Potencia, tiempo y diferencia anual.</small>
            </Link>
            <Link href="/calculadora/standby" prefetch={false}>
              <span>Standby</span>
              <strong>Consumo en espera</strong>
              <small>Aparatos, horas y coste anual.</small>
            </Link>
            <Link href="/calculadora/etiqueta-energetica" prefetch={false}>
              <span>Etiqueta</span>
              <strong>kWh declarados</strong>
              <small>Coste a 1, 5 y 10 años.</small>
            </Link>
            <Link href="/calculadora/amortizacion" prefetch={false}>
              <span>Compra + energía</span>
              <strong>Coste de propiedad</strong>
              <small>Compara las cuentas, sin recomendar por ti.</small>
            </Link>
          </nav>

          <div className="calculator-explainer">
            <div>
              <span>01</span>
              <h2>Elige el método adecuado</h2>
              <p>
                Usa potencia y tiempo cuando el consumo sea relativamente
                estable. Para programas o aparatos con etiqueta, prioriza los
                kWh por ciclo, por 100 ciclos o al año.
              </p>
            </div>
            <div>
              <span>02</span>
              <h2>Sustituye el ejemplo</h2>
              <p>
                Busca los W o kWh en la placa, etiqueta o manual y usa el precio
                variable por kWh que quieras analizar. Ningún valor inicial se
                presenta como universal.
              </p>
            </div>
            <div>
              <span>03</span>
              <h2>Lee el resultado como estimación</h2>
              <p>
                Termostatos, compresores, modos de uso y condiciones exteriores
                pueden cambiar el consumo real. Los costes fijos de la factura no
                se atribuyen al aparato.
              </p>
            </div>
          </div>

          <h2>Fórmulas visibles</h2>
          <div className="formula-box">
            Potencia: W ÷ 1.000 × horas × días
            <br />
            Ciclos: kWh/ciclo × número de ciclos
            <br />
            Coste: energía (kWh) × precio introducido (€/kWh)
          </div>
          <p>
            Los escenarios del 25 % y 50 % menos reducen proporcionalmente el
            uso introducido; no prometen ese ahorro en un caso real. Consulta
            también nuestra guía para{" "}
            <Link href="/guias/como-calcular-consumo-electrico">
              calcular y comprobar cada paso
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
