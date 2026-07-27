"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const presets = [
  {
    name: "Aire acondicionado",
    watts: 1000,
    hours: 4,
    days: 30,
    slug: "aire-acondicionado",
  },
  { name: "Ventilador", watts: 50, hours: 8, days: 30, slug: "ventilador" },
  { name: "Horno", watts: 2200, hours: 0.75, days: 15, slug: "horno" },
  {
    name: "Termo eléctrico",
    watts: 1500,
    hours: 2,
    days: 30,
    slug: "termo-electrico",
  },
  {
    name: "Ordenador",
    watts: 250,
    hours: 8,
    days: 22,
    slug: "ordenador",
  },
] as const;

type CalculatorProps = {
  initialDays?: number;
  initialHours?: number;
  initialName?: string;
  initialPrice?: number;
  initialWatts?: number;
};

function toNonNegativeNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

export function EnergyCalculator({
  initialDays = 30,
  initialHours = 4,
  initialName = "Aire acondicionado",
  initialPrice = 0.25,
  initialWatts = 1000,
}: CalculatorProps) {
  const [name, setName] = useState(initialName);
  const [watts, setWatts] = useState(initialWatts);
  const [hours, setHours] = useState(initialHours);
  const [days, setDays] = useState(initialDays);
  const [price, setPrice] = useState(initialPrice);

  const result = useMemo(() => {
    const costPerHour = (watts / 1000) * price;
    const kwh = (watts / 1000) * hours * days;
    const cost = kwh * price;

    return { cost, kwh, costPerHour };
  }, [watts, hours, days, price]);

  const activePreset = presets.find((preset) => preset.name === name);

  function applyPreset(preset: (typeof presets)[number]) {
    setName(preset.name);
    setWatts(preset.watts);
    setHours(preset.hours);
    setDays(preset.days);
  }

  return (
    <div className="energy-calculator">
      <div>
        <div
          className="preset-list"
          aria-label="Ejemplos de aparatos"
          role="group"
        >
          {presets.map((preset) => (
            <button
              aria-pressed={name === preset.name}
              className={`preset ${name === preset.name ? "preset--active" : ""}`}
              key={preset.name}
              onClick={() => applyPreset(preset)}
              type="button"
            >
              {preset.name}
            </button>
          ))}
        </div>
        <div className="calculator-fields">
          <div className="field">
            <label htmlFor="watts">Potencia del aparato</label>
            <div className="input-wrap">
              <input
                aria-describedby="calculator-help"
                id="watts"
                inputMode="decimal"
                min="0"
                onChange={(event) => setWatts(toNonNegativeNumber(event.target.value))}
                type="number"
                value={watts}
              />
              <span>vatios (W)</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="hours">Uso cada día</label>
            <div className="input-wrap">
              <input
                aria-describedby="calculator-help"
                id="hours"
                inputMode="decimal"
                min="0"
                onChange={(event) => setHours(toNonNegativeNumber(event.target.value))}
                step="0.25"
                type="number"
                value={hours}
              />
              <span>horas</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="days">Días de uso al mes</label>
            <div className="input-wrap">
              <input
                aria-describedby="calculator-help"
                id="days"
                inputMode="numeric"
                max="31"
                min="0"
                onChange={(event) => setDays(toNonNegativeNumber(event.target.value))}
                type="number"
                value={days}
              />
              <span>días</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="price">Precio total por kWh</label>
            <div className="input-wrap">
              <input
                aria-describedby="calculator-help"
                id="price"
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
        <p className="calculator-note" id="calculator-help">
          Usa el coste variable que quieras probar. El resultado estima la
          energía del aparato: no suma potencia contratada, alquiler de contador
          ni otros cargos fijos de la factura.
        </p>
        {activePreset ? (
          <Link className="calculator-guide-link" href={`/consumo/${activePreset.slug}`}>
            Ver guía y consejos sobre {activePreset.name.toLocaleLowerCase()} →
          </Link>
        ) : null}
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
            <b>{result.kwh.toLocaleString("es-ES", { maximumFractionDigits: 1 })} kWh</b>
          </div>
          <div>
            <small>COSTE POR HORA</small>
            <b>
              {result.costPerHour.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              €
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
