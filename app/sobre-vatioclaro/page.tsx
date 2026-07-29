import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_OWNER } from "@/lib/legal";
import { CONTENT_UPDATED_AT, SITE_NAME } from "@/lib/site";

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
      { url: "/og.png", width: 1672, height: 941, alt: "Sobre VatioClaro" },
    ],
  },
};

export default function AboutPage() {
  return (
    <main id="contenido">
      <section className="simple-hero">
        <div className="eyebrow">Sobre VatioClaro</div>
        <h1>Menos jerga. Mejores decisiones en casa.</h1>
        <p>
          VatioClaro convierte datos técnicos en estimaciones que puedas revisar,
          adaptar y usar para priorizar dónde merece la pena ahorrar energía.
        </p>
      </section>
      <section className="simple-body">
        <article className="simple-body__inner article-guide">
          <p className="article-updated">Criterio editorial actualizado: {CONTENT_UPDATED_AT}</p>
          <h2>Qué hacemos</h2>
          <p>
            Publicamos calculadoras y guías sobre consumo eléctrico doméstico en
            España. Cada página parte de una fórmula visible y explica qué datos
            puedes cambiar: potencia, horas de uso, ciclos y precio por kWh.
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

          <h2>Responsabilidad editorial y correcciones</h2>
          <p>
            El responsable editorial y titular de VatioClaro es{" "}
            <strong>{LEGAL_OWNER.name}</strong>. Su función es revisar que las
            fórmulas sean visibles, que los ejemplos estén identificados como
            orientativos y que las fuentes enlazadas respalden el contexto de
            cada guía. No se atribuyen cualificaciones profesionales que no
            estén verificadas.
          </p>
          <p>
            Si detectas un enlace roto, una cifra desactualizada o una
            explicación mejorable, puedes escribir a{" "}
            <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>.
            Revisaremos la observación y actualizaremos la fecha cuando exista
            un cambio editorial significativo.
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
