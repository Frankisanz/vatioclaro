import type { Metadata } from "next";
import Link from "next/link";
import {
  LEGAL_ADDRESS,
  LEGAL_OWNER,
  VERCEL_PRIVACY_NOTICE,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata VatioClaro los datos personales y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="contenido">
      <section className="simple-hero">
        <div className="eyebrow">Información</div>
        <h1>Política de privacidad.</h1>
        <p>
          Información clara sobre el tratamiento de datos personales en
          VatioClaro.
        </p>
      </section>
      <section className="simple-body">
        <div className="simple-body__inner">
          <div className="callout">
            Última actualización: {LEGAL_OWNER.updatedAt}. Si escribes al
            titular, trataremos únicamente los datos necesarios para responder
            a tu consulta.
          </div>

          <h2>1. Responsable del tratamiento</h2>
          <dl className="legal-facts">
            <div>
              <dt>Responsable</dt>
              <dd>{LEGAL_OWNER.name}</dd>
            </div>
            <div>
              <dt>NIF</dt>
              <dd>{LEGAL_OWNER.taxId}</dd>
            </div>
            <div>
              <dt>Dirección</dt>
              <dd>{LEGAL_ADDRESS}</dd>
            </div>
            <div>
              <dt>Correo de privacidad</dt>
              <dd>
                <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>
              </dd>
            </div>
          </dl>

          <h2>2. Datos y finalidades</h2>
          <p>
            Las operaciones de las calculadoras se realizan en el navegador. No
            creamos cuentas de usuario ni guardamos en una base de datos propia
            los valores que introduces en ellas.
          </p>
          <ul>
            <li>
              <strong>Consultas por correo electrónico.</strong> Si nos escribes,
              podremos tratar tu nombre, dirección de correo, mensaje y los
              datos que incluyas para responderte. La base jurídica es el interés
              legítimo de atender la consulta y, cuando proceda, las medidas
              solicitadas por la propia persona usuaria.
            </li>
            <li>
              <strong>Datos técnicos de acceso.</strong> El proveedor de
              alojamiento puede procesar datos técnicos como dirección IP,
              fecha, navegador, registros de seguridad y recurso solicitado para
              prestar, mantener y proteger el sitio. No los usamos para elaborar
              perfiles publicitarios.
            </li>
            <li>
              <strong>Obligaciones legales.</strong> Podremos conservar los datos
              imprescindibles cuando una norma aplicable lo exija.
            </li>
          </ul>

          <h2>3. Conservación</h2>
          <p>
            Los mensajes se conservarán durante el tiempo necesario para atender
            la consulta y, como máximo, doce meses, salvo que sea necesario un
            plazo mayor para cumplir una obligación legal o atender una posible
            reclamación. Los datos técnicos se conservan conforme a la
            configuración y política del proveedor de alojamiento.
          </p>

          <h2>4. Destinatarios y transferencias</h2>
          <p>
            VatioClaro se aloja en Vercel. Este proveedor puede procesar datos
            técnicos necesarios para la prestación y seguridad de su servicio.
            Sus propios tratamientos, subencargados y posibles transferencias
            internacionales se rigen por su{" "}
            <a href={VERCEL_PRIVACY_NOTICE} rel="noreferrer" target="_blank">
              aviso de privacidad
            </a>
            . Vercel informa de que sus instalaciones principales de tratamiento
            están en Estados Unidos y de que puede recurrir a mecanismos de
            transferencia previstos por la normativa aplicable.
          </p>
          <p>
            No vendemos datos personales ni enviamos datos de las calculadoras a
            redes publicitarias, herramientas de analítica o plataformas de
            redes sociales en esta versión del sitio.
          </p>

          <h2>5. Derechos</h2>
          <p>
            Puedes solicitar acceso, rectificación, supresión, oposición,
            limitación del tratamiento y, cuando corresponda, portabilidad,
            escribiendo a{" "}
            <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>.
            También puedes presentar una reclamación ante la Agencia Española de
            Protección de Datos si consideras que tus derechos no han sido
            atendidos.
          </p>

          <h2>6. Analítica, publicidad y cookies</h2>
          <p>
            No se han activado herramientas de analítica ni publicidad en esta
            versión. Antes de incorporar Google AdSense u otros terceros se
            actualizarán esta política y la <Link href="/cookies">Política de
            cookies</Link>, se identificarán los proveedores y se habilitará el
            mecanismo de consentimiento que corresponda.
          </p>

          <h2>7. Actualizaciones</h2>
          <p>
            Esta política se revisará antes de cualquier cambio que implique una
            nueva finalidad, medición de audiencia, personalización o publicidad.
          </p>
        </div>
      </section>
    </main>
  );
}
