import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_OWNER } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Información sobre cookies y tecnologías similares en VatioClaro.",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <main id="contenido">
      <section className="simple-hero">
        <div className="eyebrow">Información</div>
        <h1>Política de cookies.</h1>
        <p>
          Qué tecnologías utiliza VatioClaro hoy y cómo cambiaremos esta
          información si se añaden nuevos servicios.
        </p>
      </section>
      <section className="simple-body">
        <div className="simple-body__inner">
          <div className="callout">
            Última revisión: {LEGAL_OWNER.updatedAt}. En esta versión no se
            instalan cookies de analítica, publicidad, redes sociales ni
            personalización.
          </div>

          <h2>1. Qué son las cookies</h2>
          <p>
            Las cookies y tecnologías similares son pequeños archivos o datos
            que un sitio web puede almacenar o consultar en tu dispositivo.
            Pueden ser necesarias para prestar un servicio o utilizarse para
            medir audiencias, personalizar contenidos o mostrar publicidad.
          </p>

          <h2>2. Tecnologías utilizadas actualmente</h2>
          <p>
            Tras la revisión técnica de esta versión, VatioClaro no carga Google
            Analytics, Google AdSense ni otras etiquetas de publicidad, análisis
            o redes sociales. Las calculadoras funcionan en el navegador y no
            crean perfiles de navegación.
          </p>
          <dl className="legal-facts legal-facts--compact">
            <div>
              <dt>Cookies analíticas</dt>
              <dd>No se utilizan</dd>
            </div>
            <div>
              <dt>Cookies publicitarias</dt>
              <dd>No se utilizan</dd>
            </div>
            <div>
              <dt>Cookies de redes sociales</dt>
              <dd>No se utilizan</dd>
            </div>
            <div>
              <dt>Preferencias no esenciales</dt>
              <dd>No se utilizan</dd>
            </div>
          </dl>
          <p>
            El proveedor de alojamiento puede tratar información técnica para
            servir y proteger el sitio, pero esta web no instala actualmente
            cookies opcionales desde su código. Puedes consultar más detalles
            sobre el tratamiento de datos en la{" "}
            <Link href="/privacidad">Política de privacidad</Link>.
          </p>

          <h2>3. Por qué no aparece un banner de consentimiento</h2>
          <p>
            Al no utilizar tecnologías no esenciales, no es necesario solicitar
            consentimiento para categorías de analítica o publicidad. No
            condicionamos el acceso a los contenidos a aceptar tecnologías
            opcionales.
          </p>

          <h2>4. Cambios futuros</h2>
          <p>
            Antes de añadir analítica, publicidad —incluido Google AdSense— o
            cualquier tecnología no esencial, actualizaremos esta política con
            los proveedores, finalidades y plazos aplicables. También
            mostraremos el mecanismo de consentimiento correspondiente antes de
            que esas tecnologías se activen.
          </p>

          <h2>5. Cómo controlar las cookies</h2>
          <p>
            Puedes eliminar o bloquear cookies desde la configuración de tu
            navegador. Ten en cuenta que, cuando una web utiliza cookies
            técnicas necesarias, bloquearlas puede afectar a algunas funciones.
            Si en el futuro añadimos categorías opcionales, podrás revisarlas y
            retirar tu decisión desde un enlace permanente de esta página.
          </p>

          <h2>6. Contacto</h2>
          <p>
            Para cualquier cuestión sobre esta política, escribe a{" "}
            <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
