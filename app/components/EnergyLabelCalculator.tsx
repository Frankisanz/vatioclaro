"use client";

import {
  calculateEnergyLabel,
  EXAMPLE_ELECTRICITY_PRICE,
  formatCurrency,
  formatElectricityPrice,
  formatKwh,
  type EnergyLabelResult,
} from "@/lib/electricity";
import { useEffect, useMemo, useState } from "react";
import {
  DecimalField,
  EmptyResult,
  issuesToFieldErrors,
  parseFields,
  useCalculatorTracking,
  useFieldPrefix,
  type FieldErrors,
} from "./CalculatorPrimitives";

type LabelMode = "annual" | "cycles";

type RawLabel = {
  annualKwh: string;
  cyclesPerMonth: string;
  kwhPer100Cycles: string;
  pricePerKwh: string;
};

type LabelOutcome =
  | { errors: FieldErrors; result: EnergyLabelResult }
  | { errors: FieldErrors; result: null };

function calculate(mode: LabelMode, raw: RawLabel): LabelOutcome {
  const parsed =
    mode === "annual"
      ? parseFields({
          annualKwh: raw.annualKwh,
          pricePerKwh: raw.pricePerKwh,
        })
      : parseFields({
          kwhPer100Cycles: raw.kwhPer100Cycles,
          cyclesPerMonth: raw.cyclesPerMonth,
          pricePerKwh: raw.pricePerKwh,
        });
  if (!parsed.ok) return { errors: parsed.errors, result: null };

  const values = parsed.values;
  const result = calculateEnergyLabel(
    mode === "annual"
      ? {
          mode,
          annualKwh: values.annualKwh,
          pricePerKwh: values.pricePerKwh,
        }
      : {
          mode,
          kwhPer100Cycles: values.kwhPer100Cycles,
          cyclesPerMonth: values.cyclesPerMonth,
          pricePerKwh: values.pricePerKwh,
        },
  );

  return result.ok
    ? { errors: {}, result: result.value }
    : { errors: issuesToFieldErrors(result.errors), result: null };
}

export function EnergyLabelCalculator() {
  const [mode, setMode] = useState<LabelMode>("annual");
  const [raw, setRaw] = useState<RawLabel>({
    annualKwh: "",
    cyclesPerMonth: "",
    kwhPer100Cycles: "",
    pricePerKwh: String(EXAMPLE_ELECTRICITY_PRICE),
  });
  const [interacted, setInteracted] = useState(false);
  const prefix = useFieldPrefix("label-calculator");
  const {
    complete: trackComplete,
    method: trackMethod,
    start: trackStart,
  } = useCalculatorTracking("calculator", "energy-label");
  const outcome = useMemo(() => calculate(mode, raw), [mode, raw]);

  useEffect(() => {
    if (interacted && outcome.result) trackComplete();
  }, [interacted, outcome.result, trackComplete]);

  function change(field: keyof RawLabel, value: string) {
    setRaw((current) => ({ ...current, [field]: value }));
    setInteracted(true);
    trackStart(mode === "annual" ? "label-annual" : "label-100-cycles");
  }

  function selectMode(nextMode: LabelMode) {
    if (nextMode === mode) return;
    setMode(nextMode);
    setInteracted(true);
    trackMethod(nextMode === "annual" ? "label-annual" : "label-100-cycles");
  }

  const errors = interacted ? outcome.errors : {};
  const result = outcome.result;

  return (
    <div className="energy-calculator label-calculator">
      <div>
        <div className="calculator-context">
          <span>USA LA ETIQUETA DE TU MODELO</span>
          <p>
            No precargamos un consumo universal. Copia el dato declarado y añade
            tu frecuencia de uso cuando la unidad sea por 100 ciclos. El precio
            inicial de {formatElectricityPrice(EXAMPLE_ELECTRICITY_PRICE)} es
            ilustrativo, no un precio oficial ni actual de España.
          </p>
        </div>
        <div
          aria-label="Tipo de dato de la etiqueta"
          className="preset-list"
          role="group"
        >
          <button
            aria-pressed={mode === "annual"}
            className={"preset" + (mode === "annual" ? " preset--active" : "")}
            onClick={() => selectMode("annual")}
            type="button"
          >
            kWh al año
          </button>
          <button
            aria-pressed={mode === "cycles"}
            className={"preset" + (mode === "cycles" ? " preset--active" : "")}
            onClick={() => selectMode("cycles")}
            type="button"
          >
            kWh por 100 ciclos
          </button>
        </div>

        <div className="calculator-fields">
          {mode === "annual" ? (
            <DecimalField
              error={errors.annualKwh}
              id={prefix + "-annual"}
              label="Consumo indicado en la etiqueta"
              onChange={(value) => change("annualKwh", value)}
              unit="kWh/año"
              value={raw.annualKwh}
            />
          ) : (
            <>
              <DecimalField
                error={errors.kwhPer100Cycles}
                id={prefix + "-100-cycles"}
                label="Consumo indicado en la etiqueta"
                onChange={(value) => change("kwhPer100Cycles", value)}
                unit="kWh/100 ciclos"
                value={raw.kwhPer100Cycles}
              />
              <DecimalField
                error={errors.cyclesPerMonth}
                id={prefix + "-cycles"}
                label="Ciclos que haces al mes"
                onChange={(value) => change("cyclesPerMonth", value)}
                unit="ciclos"
                value={raw.cyclesPerMonth}
              />
            </>
          )}
          <DecimalField
            error={errors.pricePerKwh}
            help="Precio ilustrativo inicial y editable; la proyección lo mantiene constante."
            id={prefix + "-price"}
            label="Precio que quieres analizar"
            onChange={(value) => change("pricePerKwh", value)}
            unit="€/kWh"
            value={raw.pricePerKwh}
          />
        </div>
        <p className="calculator-note">
          No incluye potencia contratada, impuestos, servicios ni otros cargos
          fijos. Cinco y diez años son proyecciones matemáticas, no predicciones
          del precio futuro.
        </p>
      </div>

      {result ? (
        <div className="calculator-output" aria-live="polite">
          <div className="calculator-result">
            <span className="calculator-result__label">
              COSTE ESTIMADO AL AÑO
            </span>
            <strong className="calculator-result__amount">
              {formatCurrency(result.calculation.cost.year)}
            </strong>
            <div className="calculator-result__meta">
              <div>
                <small>CONSUMO ANUAL</small>
                <b>{formatKwh(result.calculation.consumption.year)}</b>
              </div>
              <div>
                <small>COSTE AL MES</small>
                <b>{formatCurrency(result.calculation.cost.month)}</b>
              </div>
              {result.costPerCycle !== null ? (
                <div>
                  <small>COSTE POR CICLO</small>
                  <b>{formatCurrency(result.costPerCycle)}</b>
                </div>
              ) : null}
            </div>
          </div>
          <div className="projection-grid" aria-label="Proyección del coste">
            <div>
              <span>1 año</span>
              <strong>{formatCurrency(result.calculation.cost.year)}</strong>
            </div>
            <div>
              <span>5 años</span>
              <strong>{formatCurrency(result.costFiveYears)}</strong>
            </div>
            <div>
              <span>10 años</span>
              <strong>{formatCurrency(result.costTenYears)}</strong>
            </div>
          </div>
        </div>
      ) : (
        <EmptyResult>
          Introduce el dato de tu etiqueta. La herramienta acepta coma o punto
          decimal y validará los límites antes de calcular.
        </EmptyResult>
      )}
    </div>
  );
}
