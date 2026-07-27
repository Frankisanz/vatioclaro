import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <main>
      <section className="simple-hero">
        <div className="eyebrow">Información</div>
        <h1>Aviso legal.</h1>
        <p>
          Condiciones básicas de uso de las calculadoras y contenidos de
          VatioClaro.
        </p>
      </section>
      <section className="simple-body">
        <div className="simple-body__inner">
          <div className="callout">
            Antes del lanzamiento comercial deben completarse los datos
            identificativos y de contacto del titular.
          </div>
          <h2>Finalidad informativa</h2>
          <p>
            Los resultados son estimaciones educativas basadas en los datos
            introducidos y en supuestos visibles. No sustituyen una medición
            profesional, la documentación del fabricante ni las condiciones de
            tu contrato energético.
          </p>
          <h2>Responsabilidad del usuario</h2>
          <p>
            Comprueba que la potencia, el tiempo de uso y el precio por kWh
            corresponden a tu caso. No realices cambios en instalaciones
            eléctricas sin una persona profesional autorizada.
          </p>
          <h2>Propiedad intelectual</h2>
          <p>
            Los textos, la estructura visual y las herramientas propias de
            VatioClaro no pueden reproducirse de forma íntegra para crear un
            servicio sustancialmente idéntico. Las fuentes externas conservan
            sus respectivos derechos.
          </p>
        </div>
      </section>
    </main>
  );
}
