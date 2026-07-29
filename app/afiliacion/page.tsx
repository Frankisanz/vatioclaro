import type { Metadata } from "next";
import Link from "next/link";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/lib/affiliate";
import { LEGAL_OWNER } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de afiliación y selección de productos",
  description:
    "Cómo funcionan los enlaces de afiliado de VatioClaro y qué criterios utilizamos para seleccionar productos.",
  alternates: { canonical: "/afiliacion" },
  robots: { index: false, follow: true },
};

export default function AffiliatePolicyPage() {
  return (
    <main id="contenido">
      <section className="simple-hero">
        <div className="eyebrow">Transparencia comercial</div>
        <h1>Política de afiliación.</h1>
        <p>
          Cómo se financia una parte de VatioClaro y qué límites aplicamos para
          que la comisión no sustituya al criterio editorial.
        </p>
      </section>
      <section className="simple-body">
        <article className="simple-body__inner article-guide">
          <div className="callout">
            <b>{AMAZON_ASSOCIATE_DISCLOSURE}</b>
          </div>

          <h2>1. Qué es un enlace de afiliado</h2>
          <p>
            Algunos enlaces llevan a Amazon.es e incluyen el identificador de
            seguimiento <strong>vatio-21</strong>. Si una persona realiza una
            compra que cumple las condiciones del programa, el titular de
            VatioClaro puede recibir una comisión. La persona compradora no paga
            un recargo por utilizar el enlace.
          </p>
          <p>
            Amazon es quien determina el precio, la disponibilidad, el vendedor,
            la entrega, las devoluciones y cualquier garantía comercial. VatioClaro
            no interviene en el pago ni recibe los datos de la compra individual.
          </p>

          <h2>2. Cómo identificamos estos enlaces</h2>
          <p>
            Antes del primer bloque comercial de cada guía aparece un aviso de
            afiliación. Junto a cada botón se muestra «Publicidad · enlace de
            afiliado», y el texto del botón indica expresamente que conduce a
            Amazon. No utilizamos redirecciones ocultas.
          </p>

          <h2>3. Criterio editorial</h2>
          <ul>
            <li>
              Partimos del problema que debe resolverse y explicamos cuándo no
              es necesario comprar.
            </li>
            <li>
              Comparamos funciones, límites, compatibilidad y documentación del
              fabricante; no ordenamos por la comisión.
            </li>
            <li>
              No presentamos como prueba propia una revisión basada únicamente
              en documentación.
            </li>
            <li>
              No copiamos valoraciones, estrellas, textos ni fotografías de
              clientes de Amazon.
            </li>
          </ul>

          <h2>4. Precios, disponibilidad e imágenes</h2>
          <p>
            Mientras no dispongamos de una integración autorizada con datos
            actualizados, no mostramos precios, disponibilidad, Prime, descuentos
            ni valoraciones de Amazon. Los enlaces abren la ficha concreta que
            hemos verificado para que la persona usuaria compruebe directamente
            el modelo, el vendedor y la oferta vigente.
          </p>

          <h2>5. Medición y privacidad</h2>
          <p>
            Podemos registrar de forma agregada que se ha pulsado un tipo de
            enlace para saber qué guías resultan útiles. No recibimos de Amazon
            el nombre ni la identidad de quien compra. Al abandonar VatioClaro,
            se aplican las condiciones y la política de privacidad del sitio de
            destino. Consulta nuestra <Link href="/privacidad">privacidad</Link>{" "}
            y <Link href="/cookies">política de cookies</Link>.
          </p>

          <h2>6. Correcciones y contacto</h2>
          <p>
            Si detectas una incompatibilidad, una ficha desactualizada o una
            recomendación que no explica bien sus límites, escribe a{" "}
            <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>.
            Revisaremos la documentación y corregiremos el contenido cuando
            corresponda.
          </p>
        </article>
      </section>
    </main>
  );
}
