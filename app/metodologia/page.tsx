import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_OWNER } from "@/lib/legal";
import { SITE_NAME } from "@/lib/site";

const METHODOLOGY_UPDATED_AT = "2026-08-17";

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
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "Metodología de VatioClaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Metodología de cálculo y fuentes | ${SITE_NAME}`,
    description:
      "Cómo calcula VatioClaro el consumo eléctrico, qué supuestos utiliza y por qué una estimación puede diferir de una medición real.",
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

export default function MethodPage() {
  return (
    <main id="contenido">
      <section className="simple-hero">
        <div className="eyebrow">Transparencia</div>
        <h1>Cómo convertimos datos técnicos en estimaciones.</h1>
        <p>
          Una estimación solo es útil si puedes reproducirla, cambiar sus
          supuestos y saber qué parte procede de una fuente y qué parte depende
          de tu uso.
        </p>
      </section>
      <section className="simple-body">
        <article className="simple-body__inner article-guide">
          <p className="article-updated">
            Revisión editorial: {METHODOLOGY_UPDATED_AT}
          </p>

          <h2>Qué significa «estimación»</h2>
          <p>
            Una estimación es el resultado de aplicar una fórmula conocida a
            datos declarados, medidos o introducidos por el usuario. No es una
            lectura del contador ni garantiza el importe final de una factura.
            Temperatura, programa, carga, mantenimiento, regulación del aparato
            y precio contratado pueden cambiar el resultado real.
          </p>
          <div className="callout">
            <b>Regla práctica:</b> para entender una posibilidad, usa un ejemplo
            claramente identificado. Para decidir sobre tu aparato, sustituye
            sus valores por la etiqueta, el manual, una medición compatible o
            tus datos de uso.
          </div>

          <h2>Jerarquía de datos y fuentes</h2>
          <p>
            La fuente adecuada depende de la pregunta. Para calcular un modelo
            concreto, su etiqueta o una medición representativa suele describir
            mejor el caso que un promedio nacional. Para explicar obligaciones,
            métricas o contexto general seguimos este orden orientativo:
          </p>
          <ol>
            <li>
              Normativa y organismos públicos: Comisión Europea, EUR-Lex, BOE,
              CNMC, IDAE, Red Eléctrica y bases públicas como EPREL.
            </li>
            <li>
              Etiqueta energética, ficha de producto, manual y documentación
              primaria del fabricante para el modelo y mercado correctos.
            </li>
            <li>
              Mediciones propias o de terceros cuando explican equipo, método,
              condiciones y límites de forma reproducible.
            </li>
            <li>
              Fuentes secundarias solventes para aportar contexto, nunca para
              reemplazar una fuente primaria disponible.
            </li>
          </ol>
          <p>
            Una fuente oficial sobre el método de etiquetado no convierte en
            oficial un valor elegido para enseñar una fórmula. En cada guía
            intentamos enlazar la fuente junto a la afirmación que respalda y
            conservar su fecha de revisión.
          </p>

          <h2>Datos oficiales frente a ejemplos educativos</h2>
          <ul>
            <li>
              Un <b>dato declarado</b> mantiene su unidad, periodo, programa y
              modelo. No se generaliza a todos los aparatos de la categoría.
            </li>
            <li>
              Un <b>ejemplo educativo</b> muestra entradas, operación y precio
              utilizados. Sirve para aprender o ensayar un escenario, no para
              afirmar un consumo típico.
            </li>
            <li>
              Un <b>dato del usuario</b> sustituye el supuesto del ejemplo, pero
              el resultado continúa siendo una estimación si no representa todo
              el periodo que se quiere proyectar.
            </li>
          </ul>

          <h2>Métodos de cálculo</h2>
          <p>
            Elegimos el método que mejor representa el dato disponible. En todos
            ellos, el coste de energía se obtiene multiplicando kWh por el precio
            en €/kWh introducido para el escenario.
          </p>

          <h3>Potencia y tiempo de uso</h3>
          <div className="formula-box">
            Consumo (kWh) = potencia (W) ÷ 1.000 × horas de uso
            <br />
            Coste (€) = consumo (kWh) × precio de la energía (€/kWh)
          </div>
          <p>
            Es apropiado cuando la potencia es una aproximación razonable al uso,
            por ejemplo en una carga relativamente estable. Para proyectar día,
            mes o año se multiplica por la frecuencia indicada. La potencia
            máxima de la placa no demuestra que el aparato la mantenga durante
            todo ese tiempo.
          </p>

          <h3>kWh por ciclo y kWh por 100 ciclos</h3>
          <div className="formula-box">
            Consumo = kWh/ciclo × número de ciclos
            <br />
            Si la etiqueta indica kWh/100 ciclos: kWh/ciclo = kWh/100 ciclos ÷ 100
          </div>
          <p>
            Este método evita fingir que lavadoras, lavavajillas o secadoras
            consumen su potencia nominal durante todo el programa. Hay que usar
            la métrica y el programa que figuran en la etiqueta o ficha, indicar
            los ciclos reales y no mezclar consumos de agua con energía.
          </p>

          <h3>Consumo anual declarado</h3>
          <div className="formula-box">
            Coste anual (€) = consumo declarado (kWh/año) × precio (€/kWh)
          </div>
          <p>
            Es el punto de partida preferente para frigoríficos, congeladores u
            otros equipos cuya etiqueta ofrezca kWh/año. Dividir entre doce o
            entre 365 produce una media contable, no demuestra que todos los
            meses o días consuman lo mismo.
          </p>

          <h3>Consumo diario medido o declarado</h3>
          <div className="formula-box">
            Consumo del periodo = kWh/día × número de días
          </div>
          <p>
            Una medición diaria debe abarcar días representativos antes de
            proyectarse. Un día de calor, una ausencia o un ciclo excepcional no
            representa necesariamente todo el año.
          </p>

          <h3>Standby</h3>
          <div className="formula-box">
            Consumo (kWh) = potencia en standby (W) ÷ 1.000 × horas × días
          </div>
          <p>
            Si hay varios equipos, calculamos cada consumo y los sumamos. Solo se
            multiplica una potencia media por el número de aparatos cuando todos
            comparten ese supuesto visible. Suspensión, espera en red y apagado
            pueden ser estados distintos.
          </p>

          <h2>Termostatos, compresores y potencia variable</h2>
          <p>
            La cifra de la placa técnica es un punto de partida, no una promesa
            de consumo constante. Termostatos, compresores, fuentes de
            alimentación, resistencias y programas automáticos alternan estados
            o modulan potencia. No asignamos un porcentaje de funcionamiento sin
            una fuente o medición que lo justifique.
          </p>
          <p>
            Para hornos, climatización, termos y equipos con ciclos, una cuenta
            con potencia nominal durante todo el tiempo puede servir como límite
            del escenario, pero no como consumo real garantizado. Preferimos
            energía medida durante varios ciclos comparables, consumo de etiqueta
            o información técnica adecuada al aparato.
          </p>
          <div className="callout">
            <b>La mejor comprobación:</b> mide varios días representativos con
            un medidor adecuado para la potencia del aparato y compáralos con la
            curva de consumo de tu distribuidora. Consulta los{" "}
            <Link href="/recomendaciones/medidores-consumo-electrico-enchufe">
              criterios para elegir un medidor
            </Link>{" "}
            sin superar sus límites.
          </div>

          <h2>Cómo tratamos el precio del kWh</h2>
          <p>
            El precio es editable porque no existe una única cifra válida para
            todos los contratos y periodos. Cuando una página usa un precio de
            ejemplo, debe mostrarlo como «precio utilizado en este ejemplo»; no
            lo presenta como precio actual de España.
          </p>
          <ul>
            <li>
              Incluimos la energía asociada al uso introducido y el precio que el
              usuario quiere analizar.
            </li>
            <li>
              No añadimos automáticamente potencia contratada, alquiler de
              contador, servicios, impuestos u otros términos de la factura.
            </li>
            <li>
              Si el contrato tiene varios periodos, un único precio es una
              simplificación. Para más precisión hay que repartir los kWh entre
              los precios correspondientes.
            </li>
          </ul>

          <h2>Etiquetas energéticas y secadoras desde el 1 de julio de 2025</h2>
          <p>
            La métrica se lee literalmente antes de calcular. No deducimos kWh
            solo a partir de la letra de eficiencia ni comparamos letras de
            escalas diferentes como si fueran equivalentes. El QR y la ficha de
            producto permiten comprobar el modelo y sus parámetros declarados.
          </p>
          <p>
            Para secadoras domésticas, la nueva etiqueta aplicable desde el 1 de
            julio de 2025 usa la escala A–G y muestra el consumo medio ponderado
            por 100 ciclos de secado en kWh. Por tanto, VatioClaro divide ese dato
            entre 100 y lo multiplica por los ciclos del usuario. Documentación o
            unidades anteriores pueden conservar una etiqueta previa: en ese
            caso se usa la unidad que realmente figure y se identifica la versión,
            sin convertir una clase antigua en una nueva por aproximación.
          </p>
          <ul>
            <li>
              <a
                href="https://energy-efficient-products.ec.europa.eu/product-list/tumble-dryers_en"
                rel="noopener noreferrer"
                target="_blank"
              >
                Comisión Europea — secadoras y nueva etiqueta desde 2025
              </a>
            </li>
            <li>
              <a
                href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32023R2534"
                rel="noopener noreferrer"
                target="_blank"
              >
                EUR-Lex — Reglamento Delegado (UE) 2023/2534
              </a>
            </li>
          </ul>

          <h2>Revisión, actualización y correcciones</h2>
          <p>
            Revisamos una página cuando cambia la normativa o la etiqueta, deja
            de funcionar una fuente, aparece documentación primaria mejor, se
            corrige una fórmula o un lector aporta una observación verificable.
            Un cambio significativo debe actualizar su fecha; una cifra variable
            debe mantener fuente o fecha de referencia.
          </p>
          <p>
            Si encuentras un error, escribe a{" "}
            <a href={"mailto:" + LEGAL_OWNER.email}>{LEGAL_OWNER.email}</a> e
            indica la URL, el dato cuestionado y, si la tienes, la fuente que
            permite comprobarlo. Corregimos el contenido, no el resultado para
            que encaje con una conclusión comercial.
          </p>

          <h2>Fuentes generales de la metodología</h2>
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
                Comisión Europea — ecodiseño y etiqueta energética
              </a>
            </li>
          </ul>
          <p>
            Consulta también nuestra{" "}
            <Link href="/sobre-vatioclaro">responsabilidad editorial</Link> y la
            explicación práctica sobre{" "}
            <Link href="/guias/como-calcular-consumo-electrico">
              cómo calcular el consumo eléctrico
            </Link>.
          </p>
        </article>
      </section>
    </main>
  );
}
