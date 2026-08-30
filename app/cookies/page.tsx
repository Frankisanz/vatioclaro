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
            agregada de Cloudflare sin cookies ni almacenamiento local. La
            verificación del dominio ante Google AdSense se realiza con una
            etiqueta meta y el fichero ads.txt, sin cargar scripts
            publicitarios, mostrar anuncios ni instalar cookies en esta fase.
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
            VatioClaro utiliza Cloudflare Web Analytics para obtener
            estadísticas agregadas de visitas y medir Core Web Vitals. Según
            Cloudflare, esta herramienta no utiliza cookies, almacenamiento
            local ni técnicas de huella digital. Tampoco registra las cadenas
            de consulta de las URL. La verificación del sitio ante Google
            AdSense se limita a una etiqueta meta en la cabecera y al fichero
            ads.txt: no se carga el script publicitario de AdSense y en esta
            fase no se muestran bloques de anuncios ni formatos publicitarios
            automáticos (Auto Ads). No
            cargamos Google Analytics, eventos analíticos personalizados,
            etiquetas publicitarias de terceros ni widgets de redes sociales.
            Las calculadoras funcionan en el navegador y sus valores no se
            envían a estas herramientas.
          </p>
          <p>
            Algunas guías contienen enlaces de afiliado identificados hacia
            Amazon.es. Son enlaces externos y no cargan cookies, píxeles,
            imágenes ni scripts de Amazon dentro de VatioClaro. Al pulsarlos
            abandonas esta web y el sitio de destino puede utilizar sus propias
            cookies conforme a sus políticas y opciones de consentimiento.
          </p>
          <dl className="legal-facts legal-facts--compact">
            <div>
              <dt>Cookies analíticas</dt>
              <dd>No se utilizan</dd>
            </div>
            <div>
              <dt>Cloudflare Web Analytics</dt>
              <dd>Visitas y rendimiento real sin cookies</dd>
            </div>
            <div>
              <dt>Google AdSense</dt>
              <dd>
                Etiqueta de verificación del dominio (sin scripts ni anuncios
                en esta fase)
              </dd>
            </div>
            <div>
              <dt>Cookies publicitarias</dt>
              <dd>No activadas (sin anuncios en esta fase)</dd>
            </div>
            <div>
              <dt>Enlaces de afiliado</dt>
              <dd>Navegación externa, sin cookies de Amazon en VatioClaro</dd>
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
            Cloudflare puede tratar información técnica para servir y proteger
            el sitio, pero esta web no instala actualmente cookies opcionales
            desde su código. La medición puede incluir la ruta visitada sin sus
            parámetros de consulta, página de procedencia, país, dispositivo,
            navegador, sistema operativo y métricas de rendimiento, sin los
            valores introducidos en las calculadoras. Puedes consultar más
            detalles sobre el tratamiento de datos en la{" "}
            <Link href="/privacidad">Política de privacidad</Link>.
          </p>

          <h2>3. Por qué no aparece un banner de consentimiento</h2>
          <p>
            Las herramientas de medición configuradas funcionan sin cookies ni
            identificadores persistentes en tu dispositivo, y la verificación
            de Google AdSense se limita a una etiqueta meta que no carga
            scripts ni emite anuncios o perfiles. Por ello no se requiere
            consentimiento para acceder a los contenidos. Antes de activar la
            publicación de anuncios, publicidad personalizada o cualquier
            tecnología que requiera consentimiento según la normativa, se
            habilitará la correspondiente Plataforma de Gestión del Consentimiento
            (CMP) para recabar y gestionar las elecciones de las personas
            usuarias.
          </p>

          <h2>4. Cambios futuros</h2>
          <p>
            Antes de activar la publicación efectiva de anuncios mediante
            Google AdSense, publicidad personalizada o cualquier otra tecnología
            no esencial, actualizaremos esta política con los proveedores,
            finalidades y plazos aplicables. Asimismo, se desplegará una
            Plataforma de Gestión del Consentimiento (CMP) certificada antes de
            que dichas tecnologías se activen.
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
