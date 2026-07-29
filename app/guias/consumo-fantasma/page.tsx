import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, CONTENT_UPDATED_AT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consumo fantasma: qué es y cómo calcularlo",
  description:
    "Aprende qué es el consumo fantasma, qué equipos conviene revisar y cómo calcular el coste anual del modo espera sin apagar servicios importantes.",
  alternates: { canonical: "/guias/consumo-fantasma" },
  openGraph: {
    type: "article",
    url: "/guias/consumo-fantasma",
    title: `Consumo fantasma: qué es y cómo calcularlo | ${SITE_NAME}`,
    description:
      "Una guía para diferenciar el modo espera de los equipos que deben estar conectados y priorizar qué medir.",
    images: [
      { url: "/og.png", width: 1672, height: 941, alt: "Consumo fantasma del hogar" },
    ],
  },
};

export default function PhantomConsumptionGuidePage() {
  const pageUrl = absoluteUrl("/guias/consumo-fantasma");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: "Consumo fantasma: qué es y cómo calcularlo",
    description:
      "Guía práctica para identificar equipos en espera, estimar su coste anual y decidir cuáles conviene desconectar.",
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    inLanguage: "es-ES",
    datePublished: CONTENT_UPDATED_AT,
    dateModified: CONTENT_UPDATED_AT,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    image: absoluteUrl("/og.png"),
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
          <span>Consumo fantasma</span>
        </nav>
        <div className="eyebrow">Uso continuo</div>
        <h1>Consumo fantasma: qué es y cómo comprobarlo.</h1>
        <p>
          Algunos equipos siguen gastando energía aunque no los estés usando. El
          ahorro real está en distinguir los que pueden desconectarse de los que
          prestan un servicio útil las 24 horas.
        </p>
      </section>

      <section className="simple-body">
        <article className="simple-body__inner article-guide">
          <p className="article-updated">Actualizado: {CONTENT_UPDATED_AT}</p>
          <h2>Qué significa “consumo fantasma”</h2>
          <p>
            Se suele usar esta expresión para los aparatos que permanecen en modo
            espera o aparentemente apagados, pero siguen conectados para mostrar
            una luz, recibir una señal, mantener una memoria o cargar más rápido.
            Unos pocos vatios parecen irrelevantes hasta que se multiplican por
            24 horas y 365 días.
          </p>
          <div className="formula-box">
            Consumo anual (kWh) = potencia en espera (W) ÷ 1.000 × 24 × 365
            <br />
            Coste anual (€) = consumo anual × precio (€ / kWh)
          </div>

          <h2>No todo lo conectado es un desperdicio</h2>
          <p>
            Un router, una alarma, un equipo médico, una caldera conectada o la
            domótica pueden necesitar permanecer encendidos. En esos casos el
            objetivo no es apagar por apagar: es conocer el consumo y decidir si
            el servicio justifica ese gasto.
          </p>
          <p>
            Por ejemplo, consulta la guía de <Link href="/consumo/router-wifi">consumo de un router wifi</Link> antes
            de desconectarlo por la noche si afecta a llamadas, seguridad o
            automatizaciones de casa.
          </p>

          <h2>Qué aparatos conviene revisar primero</h2>
          <ul>
            <li>Televisores, consolas, decodificadores y barras de sonido que quedan con una luz de espera.</li>
            <li>Cargadores y regletas con transformadores que siguen enchufados aunque no haya ningún dispositivo cargando.</li>
            <li>Impresoras, monitores y equipos de oficina que permanecen disponibles de forma continua.</li>
            <li>Repetidores de red, altavoces inteligentes y accesorios conectados que quizá ya no se usan.</li>
          </ul>

          <h2>Cómo medirlo sin equivocarte</h2>
          <ol>
            <li>Elige un medidor de enchufe compatible con la potencia del aparato y sigue sus instrucciones de seguridad.</li>
            <li>Déjalo varias horas o un día completo si el consumo varía por tareas automáticas.</li>
            <li>Apunta los kWh acumulados, no solo una lectura instantánea en vatios.</li>
            <li>Prueba el coste anual en la <Link href="/calculadora">calculadora de consumo</Link> con 24 horas y 365 días.</li>
          </ol>
          <p>
            Si todavía no tienes uno, consulta cómo elegir un{" "}
            <Link href="/recomendaciones/medidores-consumo-electrico-enchufe">
              medidor de consumo eléctrico de enchufe
            </Link>{" "}
            y qué límites debes revisar antes de conectarlo.
          </p>

          <h2>Acciones simples que sí tienen sentido</h2>
          <h3>Usa una regleta con interruptor para grupos seguros</h3>
          <p>
            Un conjunto de periféricos de escritorio puede apagarse con un solo
            gesto si no depende de actualizaciones, alarmas o accesos remotos.
            No agrupes equipos con necesidades distintas sin revisar antes qué
            dejas sin servicio.
          </p>
          <h3>Elimina duplicados, no funciones útiles</h3>
          <p>
            Un repetidor wifi olvidado o un viejo decodificador conectado puede
            ser un mejor candidato que un aparato esencial. Prioriza lo que no
            aporta valor a diario.
          </p>
          <h3>Comprueba el modo eco real</h3>
          <p>
            Algunos equipos ofrecen ajustes de ahorro, apagado automático o
            suspensión profunda. Revísalos en el menú del fabricante y confirma
            después el resultado con una medición.
          </p>

          <div className="article-cta">
            <div>
              <div className="eyebrow">Calcula el coste anual</div>
              <h2>Unos pocos vatios también se pueden medir.</h2>
              <p>
                Introduce potencia, 24 horas de uso y 365 días para convertir un
                consumo continuo en euros al año.
              </p>
            </div>
            <Link className="button button--dark" href="/calculadora">
              Calcular ahora
            </Link>
          </div>

          <div className="source-box">
            <h3>Fuente y límites</h3>
            <p>
              Los consumos en espera dependen de cada modelo y de sus funciones
              conectadas. Para decisiones concretas, prioriza la ficha técnica y
              una medición de tu propio equipo.
            </p>
            <a
              href="https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              IDAE — SPAHOUSEC III (2026) ↗
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
