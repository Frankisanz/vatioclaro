import type { Metadata } from "next";
import Link from "next/link";
import { ApplianceCard } from "./components/ApplianceCard";
import { EnergyCalculator } from "./components/EnergyCalculator";
import { appliances, getApplianceMonthlyKwh } from "@/lib/appliances";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculadora de consumo eléctrico y guías de ahorro",
  description:
    "Calcula el consumo y coste de tus aparatos en kWh y euros. Guías claras con fórmulas, ejemplos editables y fuentes para entender tu factura.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${SITE_NAME} — Calcula y entiende tu consumo eléctrico`,
    description:
      "Convierte potencia y horas de uso en kWh y euros con calculadoras editables y guías claras.",
    images: [
      {
        url: "/og.png",
        width: 1672,
        height: 941,
        alt: "VatioClaro — Calcula y entiende tu consumo eléctrico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Calcula y entiende tu consumo eléctrico`,
    description:
      "Convierte potencia y horas de uso en kWh y euros con calculadoras editables y guías claras.",
    images: ["/og.png"],
  },
};

const featured = appliances.slice(0, 6);
const heroItem = appliances[0];
const tickerSlugs = ["ventilador", "router-wifi", "horno", "termo-electrico"];
const tickerItems = tickerSlugs.map((slug) => {
  const item = appliances.find((candidate) => candidate.slug === slug);

  if (!item) {
    throw new Error(`No se ha encontrado el aparato ${slug}`);
  }

  return item;
});

const nextGuides = [
  {
    href: "/guias/como-calcular-consumo-electrico",
    number: "01",
    title: "Cómo calcular el consumo",
    text: "La fórmula, los datos que necesitas y cuándo un valor de etiqueta es mejor que los vatios.",
  },
  {
    href: "/consumo/electrodomesticos-que-mas-consumen",
    number: "02",
    title: "Qué aparatos consumen más",
    text: "Aprende a priorizar mediciones sin confiar en una lista genérica para todos los hogares.",
  },
  {
    href: "/guias/consumo-fantasma",
    number: "03",
    title: "Consumo fantasma",
    text: "Distingue el modo espera de los equipos que realmente deben seguir conectados.",
  },
] as const;

export default function Home() {
  const heroKwh = getApplianceMonthlyKwh(heroItem);

  return (
    <main id="contenido">
      <section className="hero">
        <div className="hero__copy">
          <div className="eyebrow">Energía doméstica, sin letra pequeña</div>
          <h1>
            Descubre dónde se va <em>cada euro</em> de tu factura.
          </h1>
          <p className="hero__lede">
            Convierte la potencia y tus horas de uso en un coste mensual real.
            Sin registros, sin venderte una tarifa y con la fórmula a la vista.
          </p>
          <div className="hero__actions">
            <a className="button button--dark" href="#calculadora">
              Calcular mi consumo
            </a>
            <Link className="text-link" href="/consumo">
              Explorar guías <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="trust-row" aria-label="Ventajas">
            <span>✓ Cálculo instantáneo</span>
            <span>✓ Precio editable</span>
            <span>✓ Fuentes visibles</span>
          </div>
        </div>

        <aside className="bill-card" aria-label="Ejemplo de coste mensual">
          <div className="bill-card__top">
            <span>EJEMPLO DEL MES</span>
            <span className="live-dot">SUPUESTOS VISIBLES</span>
          </div>
          <div className="bill-card__amount">
            <span>
              {Math.floor(heroItem.exampleCost).toLocaleString("es-ES")}
            </span>
            <sup>
              ,
              {Math.round((heroItem.exampleCost % 1) * 100)
                .toString()
                .padStart(2, "0")}{" "}
              €
            </sup>
          </div>
          <p>
            {heroItem.name} · {heroItem.watts.toLocaleString("es-ES")} W ·{" "}
            {heroItem.hours} h/día
          </p>
          <div className="bill-card__bar">
            <i />
          </div>
          <div className="bill-card__scale">
            <span>0 €</span>
            <span>40 €</span>
          </div>
          <div className="bill-card__note">
            <b>{heroKwh.toLocaleString("es-ES")} kWh</b>
            <span>con un ejemplo de {heroItem.price.toLocaleString("es-ES")} € / kWh</span>
          </div>
        </aside>
      </section>

      <section className="ticker" aria-label="Ejemplos mensuales">
        {tickerItems.map((item) => (
          <Link href={`/consumo/${item.slug}`} key={item.slug}>
            {item.name.toLocaleUpperCase()} ·{" "}
            {item.exampleCost.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            € / MES
          </Link>
        ))}
      </section>

      <section className="calculator-section" id="calculadora">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Calculadora universal</div>
            <h2>De vatios a euros, en segundos.</h2>
          </div>
          <p>
            Usa la potencia que aparece en la etiqueta del aparato y el precio
            total por kWh que quieras analizar.
          </p>
        </div>
        <EnergyCalculator />
      </section>

      <section className="guides-section" id="guias">
        <div className="section-heading section-heading--compact">
          <div>
            <div className="eyebrow">Biblioteca de consumo</div>
            <h2>Los aparatos que más dudas generan.</h2>
          </div>
          <Link className="text-link" href="/consumo">
            Ver todas las guías →
          </Link>
        </div>

        <div className="guide-grid">
          {featured.map((item, index) => (
            <ApplianceCard index={index} item={item} key={item.slug} />
          ))}
        </div>
        <p className="fine-print">
          Cada ejemplo muestra sus supuestos. El resultado real depende del
          modelo, el uso, el entorno y el precio que apliques.
        </p>
      </section>

      <section className="method-banner">
        <div>
          <span className="method-banner__mark">÷</span>
          <div>
            <div className="eyebrow">Nada de cifras mágicas</div>
            <h2>Te enseñamos el cálculo, no solo el resultado.</h2>
          </div>
        </div>
        <p>
          Cada estimación muestra potencia, tiempo, precio y límites. Cuando un
          aparato regula su potencia —como un frigorífico o un equipo inverter—
          te explicamos por qué la cifra puede cambiar.
        </p>
        <Link className="button button--light" href="/metodologia">
          Ver metodología
        </Link>
      </section>

      <section className="content-plan">
        <div className="content-plan__intro">
          <div className="eyebrow">Sigue aprendiendo</div>
          <h2>Una factura más fácil de entender.</h2>
          <p>
            Empieza por una guía práctica y avanza hacia el cálculo de tus propios
            hábitos. Todo está conectado para que no te quedes en una cifra suelta.
          </p>
        </div>
        <div className="content-plan__list">
          {nextGuides.map((guide) => (
            <Link href={guide.href} key={guide.href}>
              <span>{guide.number}</span>
              <h3>{guide.title}</h3>
              <p>{guide.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
