import type { Metadata } from "next";
import { EnergyCalculator } from "../components/EnergyCalculator";

export const metadata: Metadata = {
  title: "Calculadora de consumo eléctrico en euros",
  description:
    "Calcula cuántos kWh consume un aparato y cuánto cuesta al día, al mes y al año a partir de su potencia y tiempo de uso.",
};

export default function CalculatorPage() {
  return (
    <main>
      <section className="simple-hero">
        <div className="eyebrow">Herramienta gratuita</div>
        <h1>Calculadora de consumo eléctrico.</h1>
        <p>
          Introduce los vatios del aparato, cuánto tiempo lo usas y el precio de
          tu energía. El resultado se actualiza al instante.
        </p>
      </section>
      <section className="article-body">
        <div className="simple-body__inner">
          <EnergyCalculator />

          <h2>Cómo encontrar los datos correctos</h2>
          <p>
            La potencia suele aparecer en la etiqueta técnica, cerca del cable,
            o en el manual. Busca una cifra seguida de <b>W</b> (vatios). Si solo
            aparece en kilovatios, multiplica por 1.000: 1,5 kW son 1.500 W.
          </p>
          <p>
            En la factura, divide el importe asociado a la energía entre los kWh
            del mismo periodo para obtener una referencia práctica en €/kWh. El
            precio cambia según contrato, impuestos y periodo.
          </p>

          <div className="formula-box">
            Consumo (kWh) = potencia (W) ÷ 1.000 × horas de uso × días
            <br />
            Coste (€) = consumo (kWh) × precio (€/kWh)
          </div>

          <h2>Cuándo la estimación puede desviarse</h2>
          <ul>
            <li>
              Un termostato, compresor o resistencia puede encenderse y apagarse
              durante el uso.
            </li>
            <li>
              La potencia máxima de una fuente o cargador no siempre es el
              consumo real del dispositivo.
            </li>
            <li>
              Los programas eco pueden durar más y, aun así, consumir menos
              energía.
            </li>
          </ul>
          <p>
            Para una cifra precisa, mide varios días con un medidor de enchufe
            homologado y usa una muestra representativa de tu rutina.
          </p>
        </div>
      </section>
    </main>
  );
}
