import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appliances, getAppliance } from "@/lib/appliances";
import { EnergyCalculator } from "../../components/EnergyCalculator";

export function generateStaticParams() {
  return appliances.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getAppliance(slug);

  if (!item) {
    return {};
  }

  return {
    title: `Cuánto consume ${item.articleName}: calculadora y coste`,
    description: `${item.intro} Calcula su coste en euros según tu uso y tu precio de electricidad.`,
  };
}

export default async function AppliancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getAppliance(slug);

  if (!item) {
    notFound();
  }

  const monthlyKwh = (item.watts / 1000) * item.hours * item.days;
  const annualCost = item.exampleCost * 12;
  const faq = [
    {
      question: `¿Cuánto cuesta usar ${item.articleName} al mes?`,
      answer: `Con el ejemplo de ${item.watts.toLocaleString("es-ES")} W, ${item.hours} horas al día, ${item.days} días y ${item.price.toLocaleString("es-ES")} €/kWh, el coste orientativo es ${item.exampleCost.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € al mes.`,
    },
    {
      question: `¿Por qué el consumo real de ${item.articleName} puede ser distinto?`,
      answer: item.caveat,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Cuánto consume ${item.articleName}`,
    description: item.intro,
    inLanguage: "es",
    author: {
      "@type": "Organization",
      name: "VatioClaro",
    },
    publisher: {
      "@type": "Organization",
      name: "VatioClaro",
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faq.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer,
        },
      })),
    },
  };

  return (
    <main>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="article-hero">
        <div>
          <div className="eyebrow">{item.category}</div>
          <h1>¿Cuánto consume {item.articleName}?</h1>
          <p className="article-hero__intro">{item.intro}</p>
        </div>
        <aside className="quick-result">
          <small>EJEMPLO MENSUAL</small>
          <strong>
            {item.exampleCost.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </strong>
          <p>
            {item.watts.toLocaleString("es-ES")} W · {item.hours} h/día ·{" "}
            {item.days} días · {item.price.toLocaleString("es-ES")} €/kWh
          </p>
        </aside>
      </section>

      <section className="article-body">
        <div className="article-body__inner">
          <article className="article-copy">
            <h2>El cálculo, paso a paso</h2>
            <p>
              Primero convertimos la potencia a kilovatios:{" "}
              {item.watts.toLocaleString("es-ES")} W ÷ 1.000 ={" "}
              {(item.watts / 1000).toLocaleString("es-ES")} kW. Después la
              multiplicamos por las horas y días de uso.
            </p>
            <div className="formula-box">
              {(item.watts / 1000).toLocaleString("es-ES")} kW × {item.hours} h
              × {item.days} días ={" "}
              {monthlyKwh.toLocaleString("es-ES", {
                maximumFractionDigits: 1,
              })}{" "}
              kWh/mes
              <br />
              {monthlyKwh.toLocaleString("es-ES", {
                maximumFractionDigits: 1,
              })}{" "}
              kWh × {item.price.toLocaleString("es-ES")} €/kWh ={" "}
              {item.exampleCost.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €/mes
            </div>
            <p>
              Esta cuenta sirve para entender el orden de magnitud. {item.caveat}
            </p>

            <h2>Qué hace variar el consumo</h2>
            {item.factors.map((factor) => (
              <div key={factor.title}>
                <h3>{factor.title}</h3>
                <p>{factor.text}</p>
              </div>
            ))}

            <h2>Cómo gastar menos sin perder utilidad</h2>
            <ul>
              {item.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>

            <h2>Calcula tu caso</h2>
            <p>
              Sustituye los valores del ejemplo por los de la etiqueta de tu
              aparato y por tu patrón de uso.
            </p>
            <div className="article-calculator">
              <EnergyCalculator
                initialDays={item.days}
                initialHours={item.hours}
                initialName={item.name}
                initialWatts={item.watts}
              />
            </div>

            <h2>Preguntas frecuentes</h2>
            {faq.map((entry) => (
              <div key={entry.question}>
                <h3>{entry.question}</h3>
                <p>{entry.answer}</p>
              </div>
            ))}

            <div className="source-box">
              <h3>Fuente y revisión</h3>
              <p>
                La explicación se apoya en información pública y se presenta
                como estimación educativa. Revisión editorial: julio de 2026.
              </p>
              <a href={item.sourceUrl} rel="noreferrer" target="_blank">
                {item.sourceTitle} ↗
              </a>
            </div>
          </article>

          <aside className="article-aside">
            <div className="article-aside__card">
              <h3>Resumen del ejemplo</h3>
              <dl>
                <div>
                  <dt>Potencia usada</dt>
                  <dd>{item.watts.toLocaleString("es-ES")} W</dd>
                </div>
                <div>
                  <dt>Consumo mensual</dt>
                  <dd>
                    {monthlyKwh.toLocaleString("es-ES", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    kWh
                  </dd>
                </div>
                <div>
                  <dt>Coste mensual</dt>
                  <dd>
                    {item.exampleCost.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </dd>
                </div>
                <div>
                  <dt>Coste anual</dt>
                  <dd>
                    {annualCost.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
