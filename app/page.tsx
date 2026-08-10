import type { Metadata } from "next";
import Link from "next/link";
import { ApplianceCard } from "./components/ApplianceCard";
import { EditorialIllustration } from "./components/EditorialIllustration";
import { EnergyCalculator } from "./components/EnergyCalculator";
import { appliances, getApplianceMonthlyKwh } from "@/lib/appliances";
import { buyingGuides } from "@/lib/buying-guides";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consumo eléctrico en casa: calcula cuánto gastas",
  description:
    "Descubre qué consume más en casa, calcula costes en kWh y euros y encuentra respuestas claras para revisar tu factura eléctrica.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${SITE_NAME} — Calcula y entiende tu consumo eléctrico`,
    description:
      "Convierte potencia y horas de uso en kWh y euros con calculadoras editables y guías claras.",
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "VatioClaro — Calcula y entiende tu consumo eléctrico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Calcula y entiende tu consumo eléctrico`,
    description:
      "Convierte potencia y horas de uso en kWh y euros con calculadoras editables y guías claras.",
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

const featured = appliances.slice(0, 6);
const featuredBuyingGuideSlugs = [
  "medidores-consumo-electrico-enchufe",
  "temporizadores-regletas-consumo-fantasma",
  "termometros-frigorifico-congelador",
] as const;
const featuredBuyingGuides = featuredBuyingGuideSlugs.map((slug) => {
  const guide = buyingGuides.find((candidate) => candidate.slug === slug);

  if (!guide) {
    throw new Error(`No se ha encontrado la guía de compra ${slug}`);
  }

  return guide;
});
const heroItem = appliances[0];
const tickerSlugs = [
  "ventilador",
  "router-wifi",
  "horno",
  "termo-electrico",
  "secadora",
];
const tickerItems = tickerSlugs.map((slug) => {
  const item = appliances.find((candidate) => candidate.slug === slug);

  if (!item) {
    throw new Error(`No se ha encontrado el aparato ${slug}`);
  }

  return item;
});

const nextGuides = [
  {
    href: "/guias/por-que-ha-subido-factura-luz",
    number: "01",
    title: "¿Por qué ha subido mi factura?",
    text: "Una comprobación ordenada para separar consumo, precio, potencia, días facturados y servicios añadidos.",
  },
  {
    href: "/guias/potencia-contratada",
    number: "02",
    title: "Revisa tu potencia contratada",
    text: "Compara potencia contratada y máxima demandada en punta y valle con una herramienta prudente.",
  },
  {
    href: "/guias/etiqueta-energetica-a-euros",
    number: "03",
    title: "Convierte la etiqueta en euros",
    text: "Pasa de kWh al año o por 100 ciclos a un coste mensual y anual comparable.",
  },
  {
    href: "/guias/como-entender-factura-luz",
    number: "04",
    title: "Entiende cada línea de la factura",
    text: "Identifica contrato, potencia, energía, lecturas, servicios, impuestos y el QR oficial de la CNMC.",
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

      <section className="home-editorial-visual">
        <div className="home-editorial-visual__copy">
          <div className="eyebrow">Del dato a una decisión</div>
          <h2>Compara la misma tarea, no dos promesas.</h2>
          <p>
            Cocinar una ración, enfriar una habitación o aportar la misma
            cantidad de calor: nuestras comparativas fijan primero la tarea y
            después muestran qué dato medir. Así puedes repetir el cálculo y
            saber dónde termina la fuente y empieza el ejemplo.
          </p>
          <div className="home-editorial-visual__links">
            <Link href="/guias/induccion-vs-vitroceramica-consumo">
              Inducción o vitrocerámica <span aria-hidden="true">→</span>
            </Link>
            <Link href="/guias/horno-vs-freidora-aire-consumo">
              Horno o freidora de aire <span aria-hidden="true">→</span>
            </Link>
            <Link href="/guias/aire-acondicionado-split-vs-portatil">
              Split o aire portátil <span aria-hidden="true">→</span>
            </Link>
            <Link href="/guias/radiador-electrico-vs-bomba-calor">
              Radiador o bomba de calor <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <EditorialIllustration caption="Ilustración editorial de los usos de energía que conectan las guías de VatioClaro. No representa mediciones de una vivienda real." />
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

      <section className="home-recommendations">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Medir antes de comprar</div>
            <h2>Herramientas útiles, con sus límites a la vista.</h2>
          </div>
          <p>
            Selecciones basadas en funciones y documentación. Te explicamos
            cuándo sirven, cuándo no y qué debes comprobar antes de pagar.
          </p>
        </div>
        <div className="home-recommendations__grid">
          {featuredBuyingGuides.map((guide) => (
            <Link
              href={`/recomendaciones/${guide.slug}`}
              key={guide.slug}
            >
              <div className="eyebrow">{guide.eyebrow}</div>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <b>
                Ver guía <span aria-hidden="true">→</span>
              </b>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/recomendaciones">
          Ver todas las recomendaciones →
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
