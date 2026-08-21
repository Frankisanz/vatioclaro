"use client";

import {
  compareCalculations,
  EXAMPLE_ELECTRICITY_PRICE,
  formatCurrency,
  formatKwh,
  type CalculationComparison,
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

type RawComparison = {
  aDays: string;
  aHours: string;
  aWatts: string;
  bDays: string;
  bHours: string;
  bWatts: string;
  pricePerKwh: string;
};

type ComparisonOutcome =
  | { comparison: CalculationComparison; errors: FieldErrors }
  | { comparison: null; errors: FieldErrors };

function calculate(raw: RawComparison): ComparisonOutcome {
  const parsed = parseFields(raw);
  if (!parsed.ok) return { comparison: null, errors: parsed.errors };

  const values = parsed.values;
  const result = compareCalculations(
    {
      method: "power",
      watts: values.aWatts,
      hoursPerDay: values.aHours,
      daysPerMonth: values.aDays,
      pricePerKwh: values.pricePerKwh,
    },
    {
      method: "power",
      watts: values.bWatts,
      hoursPerDay: values.bHours,
      daysPerMonth: values.bDays,
      pricePerKwh: values.pricePerKwh,
    },
  );

  return result.ok
    ? { comparison: result.value, errors: {} }
    : {
        comparison: null,
        errors: issuesToFieldErrors(result.errors, {
          "first.watts": "aWatts",
          "first.hoursPerDay": "aHours",
          "first.daysPerMonth": "aDays",
          "first.pricePerKwh": "pricePerKwh",
          "second.watts": "bWatts",
          "second.hoursPerDay": "bHours",
          "second.daysPerMonth": "bDays",
          "second.pricePerKwh": "pricePerKwh",
        }),
      };
}

export function ComparisonCalculator() {
  const [raw, setRaw] = useState<RawComparison>({
    aDays: "30",
    aHours: "2",
    aWatts: "1500",
    bDays: "30",
    bHours: "3",
    bWatts: "800",
    pricePerKwh: String(EXAMPLE_ELECTRICITY_PRICE),
  });
  const [interacted, setInteracted] = useState(false);
  const prefix = useFieldPrefix("comparison-calculator");
  const { complete: trackComplete, start: trackStart } =
    useCalculatorTracking("comparison", "power-ab");
  const outcome = useMemo(() => calculate(raw), [raw]);

  useEffect(() => {
    if (interacted && outcome.comparison) trackComplete();
  }, [interacted, outcome.comparison, trackComplete]);

  function change(field: keyof RawComparison, value: string) {
    setRaw((current) => ({ ...current, [field]: value }));
    setInteracted(true);
    trackStart();
  }

  const errors = interacted ? outcome.errors : {};
  const comparison = outcome.comparison;
  const lowerLabel =
    comparison?.lowerCost === "first"
      ? "El escenario A tiene menor coste energético en estos supuestos."
      : comparison?.lowerCost === "second"
        ? "El escenario B tiene menor coste energético en estos supuestos."
        : "Ambos escenarios tienen el mismo coste energético en estos supuestos.";

  return (
    <div className="comparison-calculator">
      <div className="calculator-context calculator-context--paper">
        <span>EJEMPLO EDUCATIVO EDITABLE</span>
        <p>
          Las cifras iniciales solo enseñan cómo funciona la comparación. Cambia
          potencia, tiempo y días por condiciones equivalentes de tu caso.
        </p>
      </div>
      <div className="comparison-calculator__inputs">
        <fieldset>
          <legend>Escenario A</legend>
          <div className="calculator-fields">
            <DecimalField
              error={errors.aWatts}
              id={prefix + "-a-watts"}
              label="Potencia eléctrica"
              onChange={(value) => change("aWatts", value)}
              unit="W"
              value={raw.aWatts}
            />
            <DecimalField
              error={errors.aHours}
              id={prefix + "-a-hours"}
              label="Horas de uso al día"
              onChange={(value) => change("aHours", value)}
              unit="h/día"
              value={raw.aHours}
            />
            <DecimalField
              error={errors.aDays}
              id={prefix + "-a-days"}
              inputMode="numeric"
              label="Días al mes"
              onChange={(value) => change("aDays", value)}
              unit="días"
              value={raw.aDays}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Escenario B</legend>
          <div className="calculator-fields">
            <DecimalField
              error={errors.bWatts}
              id={prefix + "-b-watts"}
              label="Potencia eléctrica"
              onChange={(value) => change("bWatts", value)}
              unit="W"
              value={raw.bWatts}
            />
            <DecimalField
              error={errors.bHours}
              id={prefix + "-b-hours"}
              label="Horas de uso al día"
              onChange={(value) => change("bHours", value)}
              unit="h/día"
              value={raw.bHours}
            />
            <DecimalField
              error={errors.bDays}
              id={prefix + "-b-days"}
              inputMode="numeric"
              label="Días al mes"
              onChange={(value) => change("bDays", value)}
              unit="días"
              value={raw.bDays}
            />
          </div>
        </fieldset>
      </div>
      <div className="comparison-calculator__price">
        <DecimalField
          error={errors.pricePerKwh}
          help="Precio ilustrativo inicial; sustitúyelo por el que quieras analizar."
          id={prefix + "-price"}
          label="Precio de la energía para ambos"
          onChange={(value) => change("pricePerKwh", value)}
          unit="€/kWh"
          value={raw.pricePerKwh}
        />
      </div>

      {comparison ? (
        <div className="comparison-result" aria-live="polite">
          <div className="comparison-result__options">
            {[
              ["Escenario A", comparison.first],
              ["Escenario B", comparison.second],
            ].map(([label, result]) => {
              const calculation = result as CalculationComparison["first"];
              return (
                <section key={label as string}>
                  <span>{label as string}</span>
                  <strong>{formatCurrency(calculation.cost.month)}/mes</strong>
                  <dl>
                    <dt>Consumo mensual</dt>
                    <dd>{formatKwh(calculation.consumption.month)}</dd>
                    <dt>Coste anual</dt>
                    <dd>{formatCurrency(calculation.cost.year)}</dd>
                  </dl>
                </section>
              );
            })}
          </div>
          <div className="comparison-result__difference">
            <span>DIFERENCIA B − A</span>
            <strong>
              {formatCurrency(
                comparison.differenceSecondMinusFirst.cost.month,
              )}
              /mes
            </strong>
            <p>
              {formatCurrency(
                comparison.differenceSecondMinusFirst.cost.year,
              )}
              /año. {lowerLabel}
            </p>
          </div>
          <p className="calculator-disclaimer">
            Es una comparación energética, no una recomendación de compra. La
            opción con más horas o menos potencia puede realizar una tarea
            diferente.
          </p>
        </div>
      ) : (
        <EmptyResult>
          Corrige los campos señalados para comparar ambos escenarios sin
          resultados incompletos o fuera de rango.
        </EmptyResult>
      )}
    </div>
  );
}
