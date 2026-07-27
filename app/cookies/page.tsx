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
            Última revisión: {LEGAL_OWNER.updatedAt}. La web utiliza medición
            anónima de Vercel sin cookies. No se instalan cookies de publicidad,
            redes sociales ni personalización.
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
            VatioClaro utiliza Vercel Web Analytics para obtener estadísticas
            agregadas de visitas y Speed Insights para medir Core Web Vitals.
            Según Vercel, ambas herramientas funcionan sin instalar cookies ni
            utilizar almacenamiento local. No cargamos Google Analytics, Google
            AdSense, etiquetas publicitarias ni widgets de redes sociales. Las
            calculadoras funcionan en el navegador y sus valores no se envían a
            estas herramientas.
          </p>
          <dl className="legal-facts legal-facts--compact">
            <div>
              <dt>Cookies analíticas</dt>
              <dd>No se utilizan</dd>
            </div>
            <div>
              <dt>Vercel Web Analytics</dt>
              <dd>Medición agregada sin cookies</dd>
            </div>
            <div>
              <dt>Vercel Speed Insights</dt>
              <dd>Rendimiento real sin cookies</dd>
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
            servir, proteger y medir el sitio, pero esta web no instala
            actualmente cookies opcionales desde su código. La medición puede
            incluir URL visitada, página de procedencia, país, dispositivo,
            navegador, sistema operativo y métricas de rendimiento, sin los
            valores introducidos en las calculadoras. Puedes consultar más
            detalles sobre el tratamiento de datos en la{" "}
            <Link href="/privacidad">Política de privacidad</Link>.
          </p>

          <h2>3. Por qué no aparece un banner de consentimiento</h2>
          <p>
            Las herramientas de medición configuradas no guardan ni leen cookies
            o identificadores persistentes en tu dispositivo. Por ello no
            solicitamos consentimiento para instalarlas y no condicionamos el
            acceso a los contenidos a aceptar tecnologías opcionales. Si esta
            configuración cambia, mostraremos el mecanismo de consentimiento
            antes de activar cualquier tecnología que lo requiera.
          </p>

          <h2>4. Cambios futuros</h2>
          <p>
            Antes de añadir publicidad —incluido Google AdSense—, analítica con
            identificadores persistentes o cualquier otra tecnología no
            esencial, actualizaremos esta política con los proveedores,
            finalidades y plazos aplicables. También mostraremos el mecanismo de
            consentimiento correspondiente antes de que esas tecnologías se
            activen.
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
