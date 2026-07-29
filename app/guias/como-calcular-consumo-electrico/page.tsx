import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, CONTENT_UPDATED_AT, SITE_NAME } from "@/lib/site";

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
    images: [
      { url: "/og.png", width: 1672, height: 941, alt: "Cómo calcular el consumo eléctrico" },
    ],
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
        datePublished: CONTENT_UPDATED_AT,
        dateModified: CONTENT_UPDATED_AT,
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: { "@type": "Organization", name: SITE_NAME },
        image: absoluteUrl("/og.png"),
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
          <p className="article-updated">Actualizado: {CONTENT_UPDATED_AT}</p>
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
            pruebas un precio de 0,25 € / kWh, el coste estimado de esa energía es
            30 € al mes.
          </p>
          <p>
            El ejemplo no pretende decir que todos los equipos de 1.000 W estén
            encendidos cuatro horas ni que ese sea el precio de tu contrato. La
            utilidad está en cambiar los valores por los tuyos.
          </p>

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
          </ul>

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
            <h3>Fuentes y criterio</h3>
            <p>
              VatioClaro prioriza las etiquetas energéticas y los datos del
              fabricante para cada modelo. Las fórmulas explican una estimación,
              no sustituyen una medición real en aparatos que regulan su potencia.
            </p>
            <a
              href="https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en"
              rel="noopener noreferrer"
              target="_blank"
            >
              Comisión Europea — Etiqueta energética y ecodiseño ↗
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
