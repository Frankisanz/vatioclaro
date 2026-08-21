import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonChart } from "@/app/components/ComparisonChart";
import {
  EXAMPLE_ELECTRICITY_PRICE,
  formatCurrency,
  formatElectricityPrice,
} from "@/lib/electricity";
import { EditorialIllustration } from "@/app/components/EditorialIllustration";
import { appliances, getApplianceMonthlyKwh } from "@/lib/appliances";
import { LEGAL_OWNER } from "@/lib/legal";
import {
  absoluteUrl,
  CONTENT_PUBLISHED_AT,
  CONTENT_UPDATED_AT,
  EDITORIAL_PERSON_ID,
  SITE_NAME,
} from "@/lib/site";

const examplePrice = EXAMPLE_ELECTRICITY_PRICE;
const formattedExamplePrice = formatElectricityPrice(examplePrice);
const hourlyExamples = [100, 500, 1000, 2000].map((watts) => ({
  watts,
  kwh: watts / 1000,
  cost: (watts / 1000) * examplePrice,
}));

function describeChartCalculation(
  calculation: (typeof appliances)[number]["calculation"],
) {
  if (calculation.method === "power") {
    return `${calculation.watts.toLocaleString("es-ES")} W × ${calculation.hoursPerDay.toLocaleString("es-ES")} h/día × ${calculation.daysPerMonth.toLocaleString("es-ES")} días`;
  }
  if (calculation.method === "cycle") {
    return `${calculation.kwhPerCycle.toLocaleString("es-ES")} kWh/ciclo × ${calculation.cycles.toLocaleString("es-ES")} ciclos/mes`;
  }
  if (calculation.method === "annual") {
    return `${calculation.annualKwh.toLocaleString("es-ES")} kWh/año`;
  }
  if (calculation.method === "daily") {
    return `${calculation.dailyKwh.toLocaleString("es-ES")} kWh/día`;
  }
  return `${calculation.watts.toLocaleString("es-ES")} W en espera`;
}

const chartAppliances = [
  "ventilador",
  "router-wifi",
  "ordenador",
  "termo-electrico",
].map((slug) => {
  const item = appliances.find((candidate) => candidate.slug === slug);

  if (!item) {
    throw new Error(`No se ha encontrado el aparato ${slug}`);
  }

  return {
    label: item.name,
    value: getApplianceMonthlyKwh(item),
    note: describeChartCalculation(item.calculation),
  };
});

const faq = [
  {
    question: "¿Cuánto consume un aparato de 1.000 W en una hora?",
    answer: `Si mantiene 1.000 W durante una hora, consume 1 kWh. A un precio usado como ejemplo de ${formattedExamplePrice}, esa hora de energía costaría ${formatCurrency(examplePrice)}. Un termostato o regulador puede reducir la potencia media real.`,
  },
  {
    question: "¿Cuánto gastan 2.000 W durante 30 minutos?",
    answer:
      "Treinta minutos son 0,5 horas. El cálculo es 2 kW × 0,5 h = 1 kWh. Para obtener euros, multiplica ese kWh por el precio que quieras analizar.",
  },
  {
    question: "¿Cómo paso de consumo diario a mensual?",
    answer:
      "Multiplica los kWh diarios por los días reales de uso. Si el patrón cambia entre laborables y fines de semana, calcula cada grupo por separado y súmalos.",
  },
  {
    question: "¿La potencia de la etiqueta es el consumo real?",
    answer:
      "No siempre. Puede ser potencia nominal o máxima. Los equipos con termostato, compresor, programas o fuente de alimentación regulan; en ellos conviene usar etiqueta energética, kWh por ciclo o medición representativa.",
  },
];

const formattedUpdatedAt = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${CONTENT_UPDATED_AT}T12:00:00Z`));

export const metadata: Metadata = {
  title: "Cómo calcular consumo eléctrico: fórmula y coste",
  description:
    "Aprende a calcular el consumo eléctrico de un aparato en kWh y euros. Te explicamos la fórmula, un ejemplo y los errores más frecuentes.",
  alternates: { canonical: "/guias/como-calcular-consumo-electrico" },
  openGraph: {
    type: "article",
    url: "/guias/como-calcular-consumo-electrico",
    title: `Cómo calcular el consumo eléctrico | ${SITE_NAME}`,
    description:
      "Fórmula, ejemplo y límites para pasar de vatios y horas de uso a kWh y euros.",
    publishedTime: CONTENT_PUBLISHED_AT,
    modifiedTime: CONTENT_UPDATED_AT,
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cómo calcular el consumo eléctrico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cómo calcular el consumo eléctrico | VatioClaro",
    description:
      "Fórmula, ejemplo y límites para pasar de vatios y horas de uso a kWh y euros.",
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function HowToCalculateConsumptionPage() {
  const path = "/guias/como-calcular-consumo-electrico";
  const pageUrl = absoluteUrl(path);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Cómo calcular el consumo eléctrico: fórmula, kWh y euros",
        description:
          "Guía práctica para calcular el consumo de un aparato a partir de potencia, tiempo de uso y precio por kWh.",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: "es-ES",
        datePublished: CONTENT_PUBLISHED_AT,
        dateModified: CONTENT_UPDATED_AT,
        author: { "@id": EDITORIAL_PERSON_ID },
        editor: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        image: absoluteUrl("/images/vatioclaro-hogar-energia-og.jpg"),
        citation: [
          "https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en",
          "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
        ],
      },
      {
        "@type": "HowTo",
        name: "Calcular el consumo eléctrico de un aparato",
        description:
          "Pasos para convertir vatios y horas de uso en kilovatios hora y coste estimado.",
        inLanguage: "es-ES",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Busca la potencia o el consumo por ciclo",
            text: "Localiza los vatios en la etiqueta técnica o los kWh por ciclo en la etiqueta energética cuando el aparato funciona por programas.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Calcula los kWh",
            text: "Divide los vatios entre 1.000 y multiplica por las horas y los días de uso. Para ciclos, multiplica los kWh por ciclo por el número de ciclos.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Convierte los kWh en euros",
            text: "Multiplica los kWh por el precio por kWh que quieras analizar.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guías",
            item: absoluteUrl("/guias"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Cómo calcular el consumo eléctrico",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="simple-hero">
        <nav aria-label="Migas de pan" className="breadcrumbs">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/guias">Guías</Link>
          <span aria-hidden="true">/</span>
          <span>Cómo calcular el consumo eléctrico</span>
        </nav>
        <div className="eyebrow">Guía base</div>
        <h1>Cómo calcular el consumo eléctrico de cualquier aparato.</h1>
        <p>
          Con tres datos puedes hacer una estimación útil: potencia o consumo por
          ciclo, tiempo de uso y precio por kWh. La clave es saber qué dato sirve
          para cada aparato.
        </p>
      </section>

      <section className="simple-body">
        <article className="simple-body__inner article-guide">
          <p className="article-updated">
            Revisado el {formattedUpdatedAt} · Responsable editorial:{" "}
            <Link href="/sobre-vatioclaro">{LEGAL_OWNER.name}</Link> ·{" "}
            <Link href="/metodologia">Método y criterios</Link>
          </p>

          <EditorialIllustration caption="Ilustración editorial de distintos usos eléctricos del hogar. Los valores de esta guía proceden de fórmulas visibles, no de la imagen ni de una medición de esa vivienda." />

          <div className="guide-answer">
            <span>RESPUESTA RÁPIDA</span>
            <p>
              Divide los vatios entre 1.000, multiplica por las horas reales y
              obtendrás kWh. Después multiplica los kWh por el precio analizado.
              Si el aparato regula, funciona por ciclos o muestra kWh en su
              etiqueta, usa ese dato en vez de mantener la potencia máxima en
              todas las horas.
            </p>
          </div>

          <h2>La fórmula para aparatos que funcionan por horas</h2>
          <p>
            Si conoces la potencia en vatios (W), conviértela primero a kilovatios
            (kW): divide entre 1.000. Después multiplica por las horas de uso y,
            si buscas una cifra mensual, por los días de uso.
          </p>
          <div className="formula-box">
            Consumo (kWh) = potencia (W) ÷ 1.000 × horas de uso × días
            <br />
            Coste (€) = consumo (kWh) × precio (€ / kWh)
          </div>

          <h2>Ejemplo: un aparato de 1.000 W</h2>
          <p>
            Si un aparato de 1.000 W funciona cuatro horas al día durante 30
            días, el cálculo es: 1 kW × 4 horas × 30 días = 120 kWh al mes. Si
            pruebas un precio de {formattedExamplePrice}, el coste estimado de
            esa energía es {formatCurrency(120 * examplePrice)} al mes.
          </p>
          <p>
            El ejemplo no pretende decir que todos los equipos de 1.000 W estén
            encendidos cuatro horas ni que ese sea el precio de tu contrato. La
            utilidad está en cambiar los valores por los tuyos.
          </p>

          <ComparisonChart
            description="Todos los valores salen de potencia × horas × días en las fichas actuales de VatioClaro. Sirven para comprobar cómo el tiempo puede pesar más que los vatios."
            items={chartAppliances}
            title="Cuatro ejemplos mensuales calculados con la misma fórmula"
            unit="kWh/mes"
          />

          <h2>Cuánto consumen 100, 500, 1.000 o 2.000 W durante una hora</h2>
          <p>
            Estas búsquedas expresan potencia y tiempo, así que pueden resolverse
            sin asumir un aparato concreto. Durante una hora, 1.000 W equivalen
            a 1 kWh. Para media hora multiplica por 0,5; para quince minutos, por
            0,25. La tabla aplica un precio de ejemplo de {formattedExamplePrice},
            que debes sustituir por el que quieras estudiar.
          </p>
          <div
            aria-label="Conversión de potencia durante una hora"
            className="table-scroll"
            role="region"
            tabIndex={0}
          >
            <table className="comparison-table">
              <caption className="comparison-table__caption">
                Conversión de vatios a kWh y coste durante una hora
              </caption>
              <thead>
                <tr>
                  <th scope="col">Potencia durante 1 hora</th>
                  <th scope="col">Energía</th>
                  <th scope="col">Coste con {formattedExamplePrice}</th>
                </tr>
              </thead>
              <tbody>
                {hourlyExamples.map((example) => (
                  <tr key={example.watts}>
                    <th scope="row">{example.watts.toLocaleString("es-ES")} W</th>
                    <td>{example.kwh.toLocaleString("es-ES")} kWh</td>
                    <td>
                      {example.cost.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 3,
                      })} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Cómo calcular minutos, uso diario, mensual y anual</h2>
          <h3>Pasar minutos a horas</h3>
          <p>
            Divide los minutos entre 60. Diez minutos son 0,167 horas; quince
            minutos son 0,25; treinta minutos son 0,5 y cuarenta y cinco son
            0,75. Un aparato de 2.000 W durante treinta minutos consume 2 kW ×
            0,5 h = 1 kWh. No multipliques 2 kW por «30» porque mezclarías horas
            y minutos.
          </p>
          <h3>De una sesión al día y al mes</h3>
          <p>
            Calcula primero los kWh de una sesión. Multiplícalos por las veces
            que lo usas al día y por los días reales del periodo. Si solo lo usas
            entre semana, veinte o veintidós días puede describir mejor el mes
            que treinta. Para estimar un año con climatización, separa temporadas
            en lugar de multiplicar un mes extremo por doce.
          </p>
          <h3>Cuánto cuesta dejar 100 W encendidos 24 horas</h3>
          <p>
            El cálculo teórico es 0,1 kW × 24 h = 2,4 kWh al día. Durante 30 días
            serían 72 kWh; con {formattedExamplePrice},{" "}
            {formatCurrency(72 * examplePrice)}. Antes de aplicarlo a un equipo,
            verifica que realmente mantenga 100 W de forma continua: un
            frigorífico, un ordenador o una fuente de alimentación suelen variar.
          </p>

          <div className="measurement-note">
            <h3>Atajo para comprobar una respuesta</h3>
            <p>
              Si duplicas la potencia, el tiempo, los días o el precio, el
              resultado se duplica; si reduces uno a la mitad, se reduce a la
              mitad. Esta comprobación detecta muchos errores de unidades.
            </p>
          </div>

          <h2>Cuándo no conviene multiplicar vatios por todas las horas</h2>
          <h3>Aparatos con termostato o compresor</h3>
          <p>
            Un frigorífico, un aire acondicionado o un horno pueden alternar
            periodos de funcionamiento y pausa. La potencia nominal marca un
            máximo de referencia, no una promesa de consumo continuo. Mide varios
            días o consulta los datos de etiqueta cuando estén disponibles.
          </p>
          <h3>Aparatos que funcionan por programas</h3>
          <p>
            Para lavadoras, lavavajillas y secadoras, los <b>kWh por ciclo</b> o
            los kWh por 100 ciclos de la etiqueta energética son normalmente más
            útiles. Divide el valor por 100 si hace falta y multiplícalo por tus
            ciclos mensuales.
          </p>
          <div className="formula-box">
            Consumo mensual (kWh) = kWh/ciclo × ciclos al mes
            <br />
            Coste mensual (€) = consumo mensual × precio (€ / kWh)
          </div>

          <h2>Dónde encontrar cada dato</h2>
          <ul>
            <li>
              <b>Vatios:</b> en la placa de características, junto al cable, en
              el manual o en la ficha técnica del fabricante.
            </li>
            <li>
              <b>kWh por ciclo o por año:</b> en la etiqueta energética de los
              aparatos que la incorporan.
            </li>
            <li>
              <b>Horas y días:</b> observa una semana representativa de tu rutina
              en lugar de adivinar un uso ideal.
            </li>
            <li>
              <b>Precio por kWh:</b> usa el coste que quieras analizar y recuerda
              que los cargos fijos no cambian por encender un aparato.
            </li>
          </ul>

          <h2>Errores que hacen que la estimación falle</h2>
          <ul>
            <li>Usar la potencia máxima de una fuente de alimentación como si fuera el consumo real constante.</li>
            <li>Olvidar los días de uso al pasar de una estimación diaria a una mensual.</li>
            <li>Comparar programas de lavadora o lavavajillas solo por duración, sin mirar sus kWh por ciclo.</li>
            <li>Confundir el coste de la energía del aparato con el importe completo de la factura.</li>
            <li>Usar W y kW como si fueran la misma unidad: 1 kW son 1.000 W.</li>
            <li>Presentar una potencia nominal calculada como si fuera una medición real.</li>
          </ul>

          <h2>Ejemplos según el tipo de aparato</h2>
          <p>
            La fórmula base funciona bien para una carga estable. En otros casos
            hay un dato más representativo. En un{" "}
            <Link href="/consumo/horno">horno con termostato</Link> interesa el
            ciclo completo; en una{" "}
            <Link href="/consumo/lavadora">lavadora</Link> o un{" "}
            <Link href="/consumo/lavavajillas">lavavajillas</Link>, los kWh por
            ciclo; y en un{" "}
            <Link href="/consumo/aire-acondicionado">aire acondicionado inverter</Link>,
            varias horas o días que incluyan su regulación.
          </p>
          <p>
            Las comparativas aplican este principio a decisiones concretas:
            revisa{" "}
            <Link href="/guias/induccion-vs-vitroceramica-consumo">
              inducción frente a vitrocerámica
            </Link>
            ,{" "}
            <Link href="/guias/horno-vs-freidora-aire-consumo">
              horno frente a freidora de aire
            </Link>
            ,{" "}
            <Link href="/guias/aire-acondicionado-split-vs-portatil">
              split frente a aire portátil
            </Link>{" "}
            y{" "}
            <Link href="/guias/radiador-electrico-vs-bomba-calor">
              radiador eléctrico frente a bomba de calor
            </Link>
            . En todas se compara la misma tarea y se identifican los supuestos.
          </p>

          <h2>Cómo usar el precio de tu factura sin confundir conceptos</h2>
          <p>
            Si quieres valorar una decisión de uso, introduce el precio de
            energía que corresponda al periodo que estudias. Una factura puede
            aplicar varios periodos, descuentos o un precio indexado. El coste
            marginal de un aparato no incluye automáticamente potencia
            contratada, alquiler, servicios e impuestos fijos; por eso el
            resultado de esta fórmula no debe presentarse como el total del
            recibo.
          </p>
          <p>
            Para una comprobación rápida puedes dividir el importe variable de
            energía entre sus kWh, siempre que sepas qué conceptos estás
            incluyendo. Para revisar todos los apartados, utiliza la guía sobre{" "}
            <Link href="/guias/como-entender-factura-luz">
              cómo entender la factura de la luz
            </Link>
            . Si el objetivo es comparar tarifas, usa condiciones anuales y
            herramientas oficiales, no solo un precio destacado.
          </p>

          <section aria-labelledby="calculation-faq-title" className="guide-faq">
            <div className="eyebrow">Preguntas frecuentes</div>
            <h2 id="calculation-faq-title">Respuestas para comprobar tu cálculo</h2>
            {faq.map((entry) => (
              <div className="guide-faq__item" key={entry.question}>
                <h3>{entry.question}</h3>
                <p>{entry.answer}</p>
              </div>
            ))}
          </section>

          <div className="article-cta">
            <div>
              <div className="eyebrow">Pruébalo ahora</div>
              <h2>Haz el cálculo con tus propios datos.</h2>
              <p>
                La calculadora muestra consumo mensual, coste por hora y coste
                anual para que puedas comparar decisiones.
              </p>
            </div>
            <Link className="button button--dark" href="/calculadora">
              Abrir calculadora
            </Link>
          </div>

          <div className="source-box">
            <h2>Fuentes y criterio</h2>
            <p>
              VatioClaro prioriza las etiquetas energéticas y los datos del
              fabricante para cada modelo. Las fórmulas explican una estimación,
              no sustituyen una medición real en aparatos que regulan su potencia.
            </p>
            <ul className="source-list">
              <li>
                <a
                  href="https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Comisión Europea — Etiqueta energética y ecodiseño ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  IDAE — Guía práctica de la energía ↗
                </a>
              </li>
            </ul>
          </div>
        </article>
      </section>
    </main>
  );
}
