import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_ADDRESS, LEGAL_OWNER } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Información del titular y condiciones de uso de VatioClaro.",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <main id="contenido">
      <section className="simple-hero">
        <div className="eyebrow">Información</div>
        <h1>Aviso legal.</h1>
        <p>
          Información del titular, condiciones de uso y alcance de los
          contenidos de VatioClaro.
        </p>
      </section>
      <section className="simple-body">
        <div className="simple-body__inner">
          <div className="callout">
            Última actualización: {LEGAL_OWNER.updatedAt}. Este aviso está
            disponible de forma permanente, directa y gratuita.
          </div>

          <h2>1. Titularidad del sitio</h2>
          <p>
            En cumplimiento de la Ley 34/2002, de servicios de la sociedad de
            la información y de comercio electrónico, se informa de que el
            titular de <strong>vatioclaro.es</strong> es:
          </p>
          <dl className="legal-facts">
            <div>
              <dt>Titular</dt>
              <dd>{LEGAL_OWNER.name}</dd>
            </div>
            <div>
              <dt>NIF</dt>
              <dd>{LEGAL_OWNER.taxId}</dd>
            </div>
            <div>
              <dt>Domicilio</dt>
              <dd>{LEGAL_ADDRESS}</dd>
            </div>
            <div>
              <dt>Contacto</dt>
              <dd>
                <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>
              </dd>
            </div>
          </dl>
          <p>
            VatioClaro es una web informativa de acceso gratuito. En la fecha
            de esta versión no vende productos ni servicios, no ofrece una
            profesión regulada a través del sitio y no requiere autorización
            administrativa previa para su actividad editorial.
          </p>

          <h2>2. Finalidad informativa y uso correcto</h2>
          <p>
            Los resultados son estimaciones educativas basadas en los datos
            introducidos y en supuestos visibles. No sustituyen una medición
            profesional, la documentación del fabricante ni las condiciones de
            tu contrato energético.
          </p>
          <p>
            Comprueba que la potencia, el tiempo de uso y el precio por kWh
            corresponden a tu caso. No realices cambios en instalaciones
            eléctricas sin una persona profesional autorizada. La persona
            usuaria se compromete a utilizar el sitio de forma lícita y a no
            interferir en su funcionamiento, seguridad ni derechos de terceros.
          </p>

          <h2>3. Propiedad intelectual y fuentes</h2>
          <p>
            Salvo indicación expresa, los textos, la estructura visual y las
            herramientas propias de VatioClaro están protegidos por la
            normativa de propiedad intelectual. No se permite su reproducción
            o explotación más allá de los usos permitidos por la ley sin la
            autorización correspondiente. Las fuentes externas conservan sus
            respectivos derechos.
          </p>

          <h2>4. Enlaces externos</h2>
          <p>
            Los enlaces a sitios de terceros se facilitan como referencia. El
            titular no controla ni responde por sus contenidos, disponibilidad
            o políticas. Antes de facilitar datos personales en ellos, consulta
            sus condiciones y políticas aplicables.
          </p>

          <h2>5. Privacidad y cookies</h2>
          <p>
            El tratamiento de datos personales se explica en la{" "}
            <Link href="/privacidad">Política de privacidad</Link>. El uso de
            cookies y tecnologías similares se detalla en la{" "}
            <Link href="/cookies">Política de cookies</Link>.
          </p>

          <h2>6. Legislación aplicable</h2>
          <p>
            Este aviso se rige por la normativa española. Cualquier conflicto
            se someterá a los juzgados y tribunales que correspondan conforme a
            la normativa aplicable, respetando en todo caso los derechos de las
            personas consumidoras cuando proceda.
          </p>
        </div>
      </section>
    </main>
  );
}
