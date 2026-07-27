"use client";

import { useMemo, useState } from "react";

const presets = [
  { name: "Aire acondicionado", watts: 1000, hours: 4, days: 30 },
  { name: "Ventilador", watts: 50, hours: 8, days: 30 },
  { name: "Horno", watts: 2200, hours: 0.75, days: 15 },
  { name: "Termo eléctrico", watts: 1500, hours: 2, days: 30 },
  { name: "Ordenador", watts: 250, hours: 8, days: 22 },
];

type CalculatorProps = {
  initialName?: string;
  initialWatts?: number;
  initialHours?: number;
  initialDays?: number;
};

export function EnergyCalculator({
  initialName = "Aire acondicionado",
  initialWatts = 1000,
  initialHours = 4,
  initialDays = 30,
}: CalculatorProps) {
  const [name, setName] = useState(initialName);
  const [watts, setWatts] = useState(initialWatts);
  const [hours, setHours] = useState(initialHours);
  const [days, setDays] = useState(initialDays);
  const [price, setPrice] = useState(0.3);

  const result = useMemo(() => {
    const kwh = (Math.max(watts, 0) / 1000) * Math.max(hours, 0) * Math.max(days, 0);
    return { kwh, cost: kwh * Math.max(price, 0) };
  }, [watts, hours, days, price]);

  function applyPreset(preset: (typeof presets)[number]) {
    setName(preset.name);
    setWatts(preset.watts);
    setHours(preset.hours);
    setDays(preset.days);
  }

  return (
    <div className="energy-calculator">
      <div>
        <div className="preset-list" aria-label="Ejemplos de aparatos">
          {presets.map((preset) => (
            <button
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
                id="watts"
                inputMode="decimal"
                min="0"
                onChange={(event) => setWatts(Number(event.target.value))}
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
                id="hours"
                inputMode="decimal"
                min="0"
                onChange={(event) => setHours(Number(event.target.value))}
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
                id="days"
                inputMode="numeric"
                max="31"
                min="0"
                onChange={(event) => setDays(Number(event.target.value))}
                type="number"
                value={days}
              />
              <span>días</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="price">Precio de la energía</label>
            <div className="input-wrap">
              <input
                id="price"
                inputMode="decimal"
                min="0"
                onChange={(event) => setPrice(Number(event.target.value))}
                step="0.01"
                type="number"
                value={price}
              />
              <span>€/kWh</span>
            </div>
          </div>
        </div>
        <p className="calculator-note">
          Consejo: usa el coste total por kWh de tu factura. Los cargos fijos no
          se incluyen porque no dependen directamente del tiempo de uso.
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
            <b>{result.kwh.toLocaleString("es-ES", { maximumFractionDigits: 1 })} kWh</b>
          </div>
          <div>
            <small>COSTE DIARIO</small>
            <b>
              {(days ? result.cost / days : 0).toLocaleString("es-ES", {
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
