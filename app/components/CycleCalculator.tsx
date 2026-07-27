"use client";

import { useMemo, useState } from "react";

type CycleCalculatorProps = {
  initialCycles: number;
  initialKwhPerCycle: number;
  initialName: string;
  initialPrice?: number;
};

function toNonNegativeNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

export function CycleCalculator({
  initialCycles,
  initialKwhPerCycle,
  initialName,
  initialPrice = 0.25,
}: CycleCalculatorProps) {
  const [kwhPerCycle, setKwhPerCycle] = useState(initialKwhPerCycle);
  const [cycles, setCycles] = useState(initialCycles);
  const [price, setPrice] = useState(initialPrice);

  const result = useMemo(() => {
    const kwh = kwhPerCycle * cycles;
    return { cost: kwh * price, kwh };
  }, [cycles, kwhPerCycle, price]);

  return (
    <div className="energy-calculator cycle-calculator">
      <div>
        <div className="calculator-context">
          <span>CALCULADORA POR CICLO</span>
          <p>
            Usa los kWh por ciclo que aparecen en la etiqueta energética de tu
            {" "}
            {initialName.toLocaleLowerCase()}.
          </p>
        </div>
        <div className="calculator-fields">
          <div className="field">
            <label htmlFor="kwh-per-cycle">Consumo por ciclo</label>
            <div className="input-wrap">
              <input
                id="kwh-per-cycle"
                inputMode="decimal"
                min="0"
                onChange={(event) =>
                  setKwhPerCycle(toNonNegativeNumber(event.target.value))
                }
                step="0.01"
                type="number"
                value={kwhPerCycle}
              />
              <span>kWh/ciclo</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="cycles-per-month">Ciclos al mes</label>
            <div className="input-wrap">
              <input
                id="cycles-per-month"
                inputMode="numeric"
                min="0"
                onChange={(event) => setCycles(toNonNegativeNumber(event.target.value))}
                type="number"
                value={cycles}
              />
              <span>ciclos</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="cycle-price">Precio de la energía</label>
            <div className="input-wrap">
              <input
                id="cycle-price"
                inputMode="decimal"
                min="0"
                onChange={(event) => setPrice(toNonNegativeNumber(event.target.value))}
                step="0.01"
                type="number"
                value={price}
              />
              <span>€ / kWh</span>
            </div>
          </div>
        </div>
        <p className="calculator-note">
          El dato de etiqueta se refiere a un programa estandarizado. Usa tus
          ciclos reales para adaptar el resultado a tu hogar.
        </p>
      </div>
      <div className="calculator-result" aria-live="polite">
        <span className="calculator-result__label">COSTE ESTIMADO AL MES</span>
        <strong className="calculator-result__amount">
          {result.cost.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          €
        </strong>
        <div className="calculator-result__meta">
          <div>
            <small>CONSUMO</small>
            <b>
              {result.kwh.toLocaleString("es-ES", {
                maximumFractionDigits: 1,
              })}{" "}
              kWh
            </b>
          </div>
          <div>
            <small>COSTE ANUAL</small>
            <b>
              {(result.cost * 12).toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              €
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}
