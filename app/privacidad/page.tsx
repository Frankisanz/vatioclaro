import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="simple-hero">
        <div className="eyebrow">Información</div>
        <h1>Política de privacidad.</h1>
        <p>Versión inicial para una web que todavía no recopila datos personales.</p>
      </section>
      <section className="simple-body">
        <div className="simple-body__inner">
          <div className="callout">
            Antes del lanzamiento comercial deben completarse la identidad y los
            datos de contacto del titular.
          </div>
          <h2>Datos tratados</h2>
          <p>
            En esta versión, las operaciones de la calculadora se realizan en el
            navegador y no se guardan en una cuenta ni se envían a una base de
            datos propia.
          </p>
          <h2>Analítica, publicidad y cookies</h2>
          <p>
            No se han activado herramientas de analítica ni publicidad en esta
            primera versión. Antes de incorporar Google AdSense u otros terceros
            se implementará una plataforma de consentimiento, se detallarán los
            proveedores y se ofrecerán controles para aceptar o rechazar usos no
            esenciales conforme a la normativa aplicable.
          </p>
          <h2>Actualizaciones</h2>
          <p>
            Esta política se actualizará antes de cualquier cambio que implique
            recogida de datos, medición de audiencia, personalización o
            publicidad.
          </p>
        </div>
      </section>
    </main>
  );
}
