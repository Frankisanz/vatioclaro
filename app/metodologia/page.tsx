import type { Metadata } from "next";
import { CONTENT_UPDATED_AT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Metodología de cálculo y fuentes",
  description:
    "Cómo calcula VatioClaro el consumo eléctrico, qué supuestos utiliza y por qué una estimación puede diferir de una medición real.",
  alternates: { canonical: "/metodologia" },
  openGraph: {
    type: "website",
    url: "/metodologia",
    title: `Metodología de cálculo y fuentes | ${SITE_NAME}`,
    description:
      "Cómo calcula VatioClaro el consumo eléctrico, qué supuestos utiliza y por qué una estimación puede diferir de una medición real.",
    images: [
      { url: "/og.png", width: 1672, height: 941, alt: "Metodología de VatioClaro" },
    ],
  },
};

export default function MethodPage() {
  return (
    <main id="contenido">
      <section className="simple-hero">
        <div className="eyebrow">Transparencia</div>
        <h1>Cómo hacemos las cuentas.</h1>
        <p>
          Una estimación solo es útil si puedes entenderla, cambiar sus supuestos
          y conocer sus límites.
        </p>
      </section>
      <section className="simple-body">
        <div className="simple-body__inner">
          <p className="article-updated">Revisión editorial: {CONTENT_UPDATED_AT}</p>
          <h2>La fórmula base</h2>
          <div className="formula-box">
            Consumo (kWh) = potencia (W) ÷ 1.000 × horas de uso
            <br />
            Coste (€) = consumo (kWh) × precio de la energía (€/kWh)
          </div>
          <p>
            Para una estimación mensual añadimos los días de uso. Para un ciclo
            de lavadora, lavavajillas o secadora es preferible usar los kWh por
            ciclo que muestra la etiqueta energética.
          </p>

          <h2>Qué incluimos y qué no</h2>
          <ul>
            <li>
              Incluimos la energía activa asociada al uso que introduces en la
              calculadora.
            </li>
            <li>
              No añadimos potencia contratada, alquiler de contador u otros
              conceptos fijos.
            </li>
            <li>
              El precio por kWh es editable para que puedas usar el coste de tu
              contrato y periodo.
            </li>
          </ul>

          <h2>Potencia nominal frente a consumo real</h2>
          <p>
            La cifra de la placa técnica es un punto de partida, no una promesa
            de consumo constante. Termostatos, compresores, fuentes de
            alimentación y programas automáticos regulan la potencia. Por eso
            las guías explican cuándo conviene medir o usar kWh por ciclo.
          </p>
          <div className="callout">
            <b>La mejor comprobación:</b> mide varios días representativos con
            un medidor adecuado para la potencia del aparato y compáralos con la
            curva de consumo de tu distribuidora.
          </div>

          <h2>Fuentes</h2>
          <p>
            Priorizamos organismos públicos, documentación europea, etiquetas
            de producto y asociaciones de consumidores. Como referencia general
            del hogar español usamos el estudio SPAHOUSEC III del IDAE,
            publicado en enero de 2026.
          </p>
          <ul>
            <li>
              <a
                href="https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                IDAE — SPAHOUSEC III: consumo energético residencial en España
              </a>
            </li>
            <li>
              <a
                href="https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en"
                rel="noopener noreferrer"
                target="_blank"
              >
                Comisión Europea — Ecodiseño y etiqueta energética
              </a>
            </li>
            <li>
              <a
                href="https://www.ocu.org/vivienda-y-energia/aire-acondicionado/consejos/consumo-aire-acondicionado"
                rel="noopener noreferrer"
                target="_blank"
              >
                OCU — Consumo del aire acondicionado
              </a>
            </li>
          </ul>

          <h2>Política editorial</h2>
          <p>
            Las cifras de ejemplo se etiquetan como tales. Indicamos fecha de
            revisión y enlazamos la principal fuente utilizada. Las páginas no
            deben publicarse de forma masiva cambiando solo una palabra: cada
            guía debe responder a las particularidades del aparato y aportar una
            herramienta o comparación útil.
          </p>
        </div>
      </section>
    </main>
  );
}
