import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_OWNER } from "@/lib/legal";
import { OPEN_GRAPH_DEFAULTS, SITE_NAME } from "@/lib/site";

const description =
  "Cómo contactar con VatioClaro para proponer correcciones, sugerir guías o ejercer tus derechos de privacidad.";

export const metadata: Metadata = {
  title: "Contacto",
  description,
  alternates: { canonical: "/contacto" },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    type: "website",
    url: "/contacto",
    title: `Contacto | ${SITE_NAME}`,
    description,
  },
};

export default function ContactPage() {
  const mailto = `mailto:${LEGAL_OWNER.email}`;

  return (
    <main id="contenido">
      <section className="simple-hero">
        <div className="eyebrow">Contacto</div>
        <h1>Escríbenos.</h1>
        <p>
          VatioClaro es un proyecto editorial independiente. La forma de
          contactar es el correo electrónico; no hay formularios ni te pedimos
          datos para usar las calculadoras.
        </p>
      </section>
      <section className="simple-body">
        <div className="simple-body__inner">
          <dl className="legal-facts">
            <div>
              <dt>Correo electrónico</dt>
              <dd>
                <a href={mailto}>{LEGAL_OWNER.email}</a>
              </dd>
            </div>
            <div>
              <dt>Responsable</dt>
              <dd>{LEGAL_OWNER.name}</dd>
            </div>
          </dl>

          <h2>Correcciones de datos o cálculos</h2>
          <p>
            Si una cifra está desactualizada, un enlace no funciona o una
            explicación puede mejorarse, indícanos la URL de la página, el
            fragmento concreto y, si la tienes, una fuente primaria que permita
            comprobarlo: la etiqueta energética, el manual o la ficha del
            fabricante, EPREL o una publicación oficial. Revisamos cada
            observación y, si procede, corregimos la página y actualizamos su
            fecha de revisión. El proceso se explica en la{" "}
            <Link href="/metodologia">metodología</Link>.
          </p>

          <h2>Sugerencias de guías y calculadoras</h2>
          <p>
            Cuéntanos qué aparato o qué duda de tu factura quieres entender.
            Priorizamos los temas en los que podemos aportar una fórmula
            verificable, fuentes y una herramienta útil, no el volumen de
            páginas.
          </p>

          <h2>Privacidad</h2>
          <p>
            Para ejercer tus derechos de acceso, rectificación, supresión u
            oposición, escribe al mismo correo. Los detalles están en la{" "}
            <Link href="/privacidad">política de privacidad</Link>.
          </p>

          <h2>Lo que no podemos resolver</h2>
          <p>
            No somos una comercializadora ni una distribuidora eléctrica, por lo
            que no podemos gestionar contratos, lecturas, cortes de suministro
            ni reclamaciones de una factura concreta. Para esos casos, contacta
            con tu comercializadora o tu distribuidora; su teléfono aparece en
            la factura. Tampoco ofrecemos asesoramiento profesional
            individualizado.
          </p>
        </div>
      </section>
    </main>
  );
}
