import type { Metadata } from "next";
import Link from "next/link";
import { appliances } from "@/lib/appliances";
import { EnergyCalculator } from "./components/EnergyCalculator";

export const metadata: Metadata = {
  title: "VatioClaro — Calcula cuánto consumen tus electrodomésticos",
  description:
    "Calculadoras y guías claras para convertir vatios y horas de uso en kWh y euros. Descubre qué aparatos pesan más en tu factura.",
};

const featured = appliances.slice(0, 6);

export default function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero__copy">
            <div className="eyebrow">Energía doméstica, sin letra pequeña</div>
            <h1>
              Descubre dónde se va <em>cada euro</em> de tu factura.
            </h1>
            <p className="hero__lede">
              Convierte la potencia y tus horas de uso en un coste mensual real.
              Sin registros, sin venderte una tarifa y con la fórmula a la vista.
            </p>
            <div className="hero__actions">
              <a className="button button--dark" href="#calculadora">
                Calcular mi consumo
              </a>
              <a className="text-link" href="#guias">
                Ver guías <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="trust-row" aria-label="Ventajas">
              <span>✓ Cálculo instantáneo</span>
              <span>✓ Precio editable</span>
              <span>✓ Fuentes visibles</span>
            </div>
          </div>

          <aside className="bill-card" aria-label="Ejemplo de coste mensual">
            <div className="bill-card__top">
              <span>ESTIMACIÓN DEL MES</span>
              <span className="live-dot">EN DIRECTO</span>
            </div>
            <div className="bill-card__amount">
              <span>36</span>
              <sup>,00 €</sup>
            </div>
            <p>Aire acondicionado · 1.000 W · 4 h/día</p>
            <div className="bill-card__bar">
              <i />
            </div>
            <div className="bill-card__scale">
              <span>0 €</span>
              <span>45 €</span>
            </div>
            <div className="bill-card__note">
              <b>120 kWh</b>
              <span>con electricidad a 0,30 €/kWh</span>
            </div>
          </aside>
        </section>

        <section className="ticker" aria-label="Ejemplos rápidos">
          <span>VENTILADOR · 1,80 €/MES</span>
          <span>ROUTER · 2,16 €/MES</span>
          <span>HORNO · 11,14 €/MES</span>
          <span>TERMO · 27,00 €/MES</span>
        </section>

        <section className="calculator-section" id="calculadora">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Calculadora universal</div>
              <h2>De vatios a euros, en segundos.</h2>
            </div>
            <p>
              Usa la potencia que aparece en la etiqueta del aparato y el precio
              total por kWh de tu factura.
            </p>
          </div>
          <EnergyCalculator />
        </section>

        <section className="guides-section" id="guias">
          <div className="section-heading section-heading--compact">
            <div>
              <div className="eyebrow">Biblioteca de consumo</div>
              <h2>Los aparatos que más dudas generan.</h2>
            </div>
            <Link className="text-link" href="/calculadora">
              Abrir calculadora completa →
            </Link>
          </div>

          <div className="guide-grid">
            {featured.map((item, index) => (
              <Link
                className={`guide-card guide-card--${(index % 3) + 1}`}
                href={`/consumo/${item.slug}`}
                key={item.slug}
              >
                <div className="guide-card__number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <span className="guide-card__category">{item.category}</span>
                  <h3>¿Cuánto consume {item.articleName}?</h3>
                  <p>{item.shortDescription}</p>
                </div>
                <div className="guide-card__footer">
                  <span>{item.exampleCost.toFixed(2).replace(".", ",")} €/mes*</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="fine-print">
            *Ejemplos orientativos con los supuestos indicados en cada guía. El
            resultado real depende del modelo, el uso y la tarifa.
          </p>
        </section>

        <section className="method-banner">
          <div>
            <span className="method-banner__mark">÷</span>
            <div>
              <div className="eyebrow">Nada de cifras mágicas</div>
              <h2>Te enseñamos el cálculo, no solo el resultado.</h2>
            </div>
          </div>
          <p>
            Cada estimación muestra potencia, tiempo, precio y límites. Cuando
            un aparato regula su potencia —como un frigorífico o un equipo
            inverter— te explicamos por qué la cifra puede cambiar.
          </p>
          <Link className="button button--light" href="/metodologia">
            Ver metodología
          </Link>
        </section>

        <section className="content-plan">
          <div className="content-plan__intro">
            <div className="eyebrow">Próximamente</div>
            <h2>Una factura más fácil de entender.</h2>
            <p>
              Estamos preparando comparativas que ayuden a decidir antes de
              comprar, instalar o encender.
            </p>
          </div>
          <div className="content-plan__list">
            <div>
              <span>01</span>
              <h3>Aerotermia vs. gas</h3>
              <p>Coste anual, amortización y escenarios por zona climática.</p>
            </div>
            <div>
              <span>02</span>
              <h3>¿Compensan las placas?</h3>
              <p>Una estimación transparente según consumo y orientación.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Tarifa fija o por horas</h3>
              <p>Cómo comparar usando tu consumo, no la oferta destacada.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
