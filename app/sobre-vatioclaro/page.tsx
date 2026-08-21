import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_OWNER } from "@/lib/legal";
import {
  absoluteUrl,
  EDITORIAL_PERSON_ID,
  SITE_NAME,
} from "@/lib/site";

const ABOUT_UPDATED_AT = "2026-08-17";

export const metadata: Metadata = {
  title: "Sobre VatioClaro y su criterio editorial",
  description:
    "Conoce el propósito de VatioClaro, cómo se elaboran las calculadoras y qué límites tienen las estimaciones de consumo eléctrico.",
  alternates: { canonical: "/sobre-vatioclaro" },
  openGraph: {
    type: "website",
    url: "/sobre-vatioclaro",
    title: `Sobre ${SITE_NAME} y su criterio editorial`,
    description:
      "Una web de calculadoras y guías claras para entender el consumo eléctrico doméstico.",
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sobre VatioClaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sobre ${SITE_NAME} y su criterio editorial`,
    description:
      "Una web de calculadoras y guías claras para entender el consumo eléctrico doméstico.",
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function AboutPage() {
  const pageUrl = absoluteUrl("/sobre-vatioclaro");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profile-page`,
    url: pageUrl,
    name: `Sobre ${SITE_NAME} y su responsable editorial`,
    dateModified: ABOUT_UPDATED_AT,
    mainEntity: {
      "@type": "Person",
      "@id": EDITORIAL_PERSON_ID,
      name: LEGAL_OWNER.name,
      url: pageUrl,
      jobTitle: `Responsable editorial de ${SITE_NAME}`,
    },
  };

  return (
    <main id="contenido">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="simple-hero">
        <div className="eyebrow">Sobre VatioClaro</div>
        <h1>Menos jerga. Mejores decisiones en casa.</h1>
        <p>
          VatioClaro es un proyecto editorial independiente que convierte datos
          técnicos en estimaciones que puedas revisar, adaptar y usar para
          priorizar dónde merece la pena ahorrar energía.
        </p>
      </section>
      <section className="simple-body">
        <article className="simple-body__inner article-guide">
          <p className="article-updated">
            Criterio editorial actualizado: {ABOUT_UPDATED_AT}
          </p>
          <h2>Qué hacemos</h2>
          <p>
            Publicamos calculadoras y guías sobre consumo eléctrico doméstico en
            España. Cada cálculo o estimación parte de una fórmula visible y explica qué datos
            puedes cambiar: potencia, horas de uso, ciclos y precio por kWh.
          </p>

          <h2>Qué significa que seamos independientes</h2>
          <p>
            VatioClaro no es una comercializadora eléctrica, una distribuidora,
            una administración pública ni un servicio de instalación. Su función
            es ayudarte a interpretar datos y comparar escenarios, no venderte
            una tarifa ni sustituir el criterio de un profesional cuando sea
            necesario.
          </p>
          <p>
            Una relación comercial futura no podrá comprar una conclusión,
            retirar una limitación relevante ni convertir una fuente débil en
            válida. Las fuentes, fórmulas y supuestos se eligen antes de decidir
            si una página admite alguna vía de financiación.
          </p>

          <h2>Qué no prometemos</h2>
          <p>
            No damos una cifra universal para todos los hogares ni recomendamos
            tarifas, instalaciones o productos como si fueran adecuados para
            cualquier persona. Un aparato puede regular su potencia, una vivienda
            puede tener necesidades distintas y el precio de la energía varía.
          </p>

          <h2>Cómo revisamos el contenido</h2>
          <ul>
            <li>Priorizamos etiquetas energéticas, documentación de fabricantes y organismos públicos.</li>
            <li>Mostramos ejemplos orientativos y explicamos cuándo medir es mejor que estimar.</li>
            <li>Indicamos una fecha de revisión y enlazamos la fuente principal de cada guía.</li>
            <li>Actualizamos las páginas cuando encontramos un dato obsoleto, una fórmula mejorable o una fuente más sólida.</li>
          </ul>

          <h2>Autoría y responsabilidad editorial honestas</h2>
          <p>
            El responsable editorial y titular de VatioClaro es{" "}
            <strong>{LEGAL_OWNER.name}</strong>. Su función es revisar que las
            fórmulas sean visibles, que los ejemplos estén identificados como
            orientativos y que las fuentes enlazadas respalden el contexto de
            cada guía. No se atribuyen cualificaciones profesionales que no
            estén verificadas.
          </p>
          <p>
            {LEGAL_OWNER.name} coordina el calendario editorial,
            comprueba que cada ejemplo pueda reproducirse con la fórmula
            publicada, revisa que las afirmaciones importantes estén limitadas
            por sus fuentes y decide si una corrección exige actualizar el texto
            y su fecha. Esta responsabilidad editorial no equivale a una
            acreditación como instalador, técnico electricista, auditor
            energético ni asesor profesional.
          </p>

          <h2>Cómo proponer una corrección</h2>
          <p>
            Si detectas un enlace roto, una cifra desactualizada o una
            explicación mejorable, puedes escribir a{" "}
            <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>.
            Ayuda incluir la URL, el fragmento cuestionado y una fuente primaria
            que permita comprobarlo. Revisaremos la observación, corregiremos el
            dato si procede y actualizaremos la fecha cuando exista un cambio
            editorial significativo.
          </p>
          <p>
            Una corrección no se rechaza porque contradiga una recomendación o
            reduzca una oportunidad de monetización. Si no podemos verificar una
            cifra, la retiramos, la limitamos o la identificamos como supuesto en
            lugar de defenderla como un hecho.
          </p>

          <h2>Cómo documentamos una comparación</h2>
          <p>
            Antes de comparar dos tecnologías separamos datos observables de
            ejemplos calculados. Las etiquetas, manuales y páginas de organismos
            públicos respaldan el marco técnico; los escenarios en euros se
            identifican como supuestos y muestran potencia, tiempo, rendimiento
            o precio utilizados. No presentamos una simulación como si fuera una
            prueba de laboratorio propia.
          </p>
          <ul>
            <li>La respuesta breve resume la decisión sin ocultar sus límites.</li>
            <li>Las tablas comparan el mismo criterio en las dos alternativas.</li>
            <li>Los ejemplos numéricos incluyen la operación que permite repetirlos.</li>
            <li>Las fuentes primarias se enlazan al final y se revisan al actualizar.</li>
          </ul>

          <h2>Separación entre edición y monetización</h2>
          <p>
            La selección editorial se realiza antes de valorar si existe un
            enlace de afiliado útil. Un producto puede desaparecer si su ficha
            deja de ser verificable, aunque genere comisiones. También publicamos
            alternativas sin compra y explicamos cuándo una medición, un manual
            o una revisión de la factura resuelven mejor la duda.
          </p>

          <h2>Cómo financiamos el proyecto</h2>
          <p>
            Algunas guías incluyen enlaces de afiliado a productos relacionados
            con la medición y el ahorro doméstico. Si una compra cumple las
            condiciones del programa, VatioClaro puede recibir una comisión sin
            coste adicional para la persona compradora. La comisión no decide
            qué perfiles aparecen ni su orden.
          </p>
          <p>
            En el momento de esta revisión no mostramos espacios de publicidad.
            La arquitectura permite activarlos más adelante sin colocarlos sobre
            controles ni impedir acceder a un resultado. También podrían
            estudiarse otros afiliados o contactos con proveedores de servicios
            relevantes, siempre con identificación clara, revisión legal y
            separación editorial.
          </p>
          <p>
            No damos por implantada ninguna vía futura ni prometemos que vaya a
            utilizarse. Si cambia la financiación, esta página y la documentación
            legal deberán actualizarse antes o al mismo tiempo. Explicamos cuándo
            no comprar, mostramos las limitaciones y distinguimos el análisis
            documental de una prueba propia. Puedes consultar los detalles
            actuales en la{" "}
            <Link href="/afiliacion">política de afiliación</Link>.
          </p>

          <h2>Cómo usar la web</h2>
          <p>
            Empieza por la <Link href="/calculadora">calculadora de consumo</Link> si ya conoces tus
            datos, o visita la <Link href="/consumo">biblioteca de guías</Link> si necesitas saber qué
            dato buscar para un aparato concreto. Para entender las limitaciones,
            revisa nuestra <Link href="/metodologia">metodología</Link>.
          </p>

          <div className="callout">
            <b>Transparencia antes que atajos:</b> una buena estimación sirve para
            decidir qué medir o qué hábito revisar. No sustituye el manual del
            fabricante, la factura ni la intervención de una persona profesional
            cuando sea necesaria.
          </div>
        </article>
      </section>
    </main>
  );
}
