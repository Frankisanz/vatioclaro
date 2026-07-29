"use client";

import { useMemo, useState } from "react";

type LabelMode = "annual" | "cycles";

function toNonNegativeNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

export function EnergyLabelCalculator() {
  const [mode, setMode] = useState<LabelMode>("annual");
  const [labelValue, setLabelValue] = useState(180);
  const [cyclesPerMonth, setCyclesPerMonth] = useState(16);
  const [price, setPrice] = useState(0.25);

  const result = useMemo(() => {
    const kwhPerUse = mode === "cycles" ? labelValue / 100 : 0;
    const annualKwh =
      mode === "annual" ? labelValue : kwhPerUse * cyclesPerMonth * 12;
    const annualCost = annualKwh * price;

    return {
      annualCost,
      annualKwh,
      costPerUse: kwhPerUse * price,
      monthlyCost: annualCost / 12,
    };
  }, [cyclesPerMonth, labelValue, mode, price]);

  function selectMode(nextMode: LabelMode) {
    setMode(nextMode);
    setLabelValue(nextMode === "annual" ? 180 : 55);
  }

  return (
    <div className="energy-calculator label-calculator">
      <div>
        <div
          aria-label="Tipo de dato de la etiqueta"
          className="preset-list"
          role="group"
        >
          <button
            aria-pressed={mode === "annual"}
            className={`preset ${mode === "annual" ? "preset--active" : ""}`}
            onClick={() => selectMode("annual")}
            type="button"
          >
            kWh al año
          </button>
          <button
            aria-pressed={mode === "cycles"}
            className={`preset ${mode === "cycles" ? "preset--active" : ""}`}
            onClick={() => selectMode("cycles")}
            type="button"
          >
            kWh por 100 ciclos
          </button>
        </div>

        <div className="calculator-fields">
          <div className="field">
            <label htmlFor="label-energy">
              {mode === "annual"
                ? "Consumo indicado en la etiqueta"
                : "Consumo por 100 ciclos"}
            </label>
            <div className="input-wrap">
              <input
                id="label-energy"
                inputMode="decimal"
                min="0"
                onChange={(event) =>
                  setLabelValue(toNonNegativeNumber(event.target.value))
                }
                step="0.1"
                type="number"
                value={labelValue}
              />
              <span>{mode === "annual" ? "kWh/año" : "kWh/100 ciclos"}</span>
            </div>
          </div>

          {mode === "cycles" ? (
            <div className="field">
              <label htmlFor="label-cycles">Usos o ciclos al mes</label>
              <div className="input-wrap">
                <input
                  id="label-cycles"
                  inputMode="numeric"
                  min="0"
                  onChange={(event) =>
                    setCyclesPerMonth(toNonNegativeNumber(event.target.value))
                  }
                  type="number"
                  value={cyclesPerMonth}
                />
                <span>ciclos</span>
              </div>
            </div>
          ) : null}

          <div className="field">
            <label htmlFor="label-price">Precio que quieres analizar</label>
            <div className="input-wrap">
              <input
                id="label-price"
                inputMode="decimal"
                min="0"
                onChange={(event) =>
                  setPrice(toNonNegativeNumber(event.target.value))
                }
                step="0.01"
                type="number"
                value={price}
              />
              <span>€ / kWh</span>
            </div>
          </div>
        </div>

        <p className="calculator-note">
          Introduce el dato de tu modelo y el precio que quieras comparar. No
          suma potencia contratada, impuestos, servicios ni otros conceptos
          fijos de la factura.
        </p>
      </div>

      <div aria-live="polite" className="calculator-result">
        <span className="calculator-result__label">
          COSTE ESTIMADO AL AÑO
        </span>
        <strong className="calculator-result__amount">
          {result.annualCost.toLocaleString("es-ES", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
          €
        </strong>
        <div className="calculator-result__meta">
          <div>
            <small>CONSUMO ANUAL</small>
            <b>
              {result.annualKwh.toLocaleString("es-ES", {
                maximumFractionDigits: 1,
              })}{" "}
              kWh
            </b>
          </div>
          <div>
            <small>COSTE AL MES</small>
            <b>
              {result.monthlyCost.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
              €
            </b>
          </div>
          {mode === "cycles" ? (
            <div>
              <small>COSTE POR CICLO</small>
              <b>
                {result.costPerUse.toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
                €
              </b>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
