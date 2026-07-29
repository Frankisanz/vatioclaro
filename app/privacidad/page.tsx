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
              <strong>Medición de audiencia y rendimiento.</strong> Utilizamos
              Vercel Web Analytics y Speed Insights para conocer, de forma
              agregada, qué páginas reciben visitas y cómo funciona la web en
              dispositivos reales. Estas herramientas pueden tratar la URL
              visitada, la página de procedencia, fecha y hora aproximadas, país,
              tipo de dispositivo, navegador, sistema operativo y métricas de
              rendimiento. No usamos esta información para identificarte,
              seguirte entre sitios ni crear perfiles publicitarios. La base
              jurídica es nuestro interés legítimo en medir y mejorar un servicio
              gratuito, limitado mediante una configuración sin cookies.
            </li>
            <li>
              <strong>Clics en enlaces de afiliado.</strong> Podemos medir de
              forma agregada qué tipo de recomendación se abre para evaluar la
              utilidad del contenido. El evento identifica la guía y el perfil
              de producto, no incluye los valores de las calculadoras ni nos
              permite conocer la identidad de quien compra en Amazon.
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
            No vendemos datos personales ni enviamos los valores introducidos en
            las calculadoras a Vercel Analytics, redes publicitarias o
            plataformas sociales. No utilizamos Google Analytics ni Google
            AdSense en esta versión del sitio.
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
            Vercel Web Analytics y Speed Insights están activos para medir
            páginas vistas y métricas web esenciales. Según la documentación de
            Vercel, funcionan sin cookies ni almacenamiento local y generan
            estadísticas agregadas; por eso no se muestra un banner para estas
            mediciones. Puedes consultar el detalle técnico y las formas de
            contacto en la <Link href="/cookies">Política de cookies</Link>.
          </p>
          <p>
            No hay anuncios de display ni Google AdSense activos. Sí existen
            enlaces de afiliado identificados que llevan a Amazon.es. Estos son
            enlaces externos normales: no cargamos en VatioClaro píxeles,
            anuncios ni scripts de Amazon. Al pulsarlos abandonas este sitio y
            se aplican la privacidad y las tecnologías del destino. Consulta
            nuestra <Link href="/afiliacion">política de afiliación</Link>.
          </p>
          <p>
            Antes de incorporar Google AdSense u otro proveedor publicitario
            actualizaremos esta política, identificaremos a los proveedores y
            habilitaremos el mecanismo de consentimiento previo que corresponda.
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
