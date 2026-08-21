"use client";

import {
  calculateElectricity,
  EXAMPLE_ELECTRICITY_PRICE,
  type CalculationResult,
} from "@/lib/electricity";
import { useEffect, useMemo, useState } from "react";
import {
  CalculationResultPanel,
  DecimalField,
  EmptyResult,
  issuesToFieldErrors,
  parseFields,
  useCalculatorTracking,
  useFieldPrefix,
  type FieldErrors,
} from "./CalculatorPrimitives";

type RawStandby = {
  daysPerYear: string;
  deviceCount: string;
  hoursPerDay: string;
  pricePerKwh: string;
  watts: string;
};

type StandbyOutcome =
  | { errors: FieldErrors; result: CalculationResult }
  | { errors: FieldErrors; result: null };

function calculate(raw: RawStandby): StandbyOutcome {
  const parsed = parseFields(raw);
  if (!parsed.ok) return { errors: parsed.errors, result: null };

  const values = parsed.values;
  const result = calculateElectricity({
    method: "standby",
    watts: values.watts,
    hoursPerDay: values.hoursPerDay,
    daysPerYear: values.daysPerYear,
    deviceCount: values.deviceCount,
    pricePerKwh: values.pricePerKwh,
  });

  return result.ok
    ? { errors: {}, result: result.value }
    : { errors: issuesToFieldErrors(result.errors), result: null };
}

export function StandbyCalculator() {
  const [raw, setRaw] = useState<RawStandby>({
    daysPerYear: "365",
    deviceCount: "8",
    hoursPerDay: "20",
    pricePerKwh: String(EXAMPLE_ELECTRICITY_PRICE),
    watts: "1",
  });
  const [interacted, setInteracted] = useState(false);
  const prefix = useFieldPrefix("standby-calculator");
  const { complete: trackComplete, start: trackStart } =
    useCalculatorTracking("calculator", "standby");
  const outcome = useMemo(() => calculate(raw), [raw]);

  useEffect(() => {
    if (interacted && outcome.result) trackComplete();
  }, [interacted, outcome.result, trackComplete]);

  function change(field: keyof RawStandby, value: string) {
    setRaw((current) => ({ ...current, [field]: value }));
    setInteracted(true);
    trackStart();
  }

  const errors = interacted ? outcome.errors : {};

  return (
    <div className="energy-calculator standby-calculator">
      <div>
        <div className="calculator-context">
          <span>EJEMPLO EDUCATIVO EDITABLE</span>
          <p>
            El ejemplo usa el mismo supuesto para ocho aparatos. Mide o consulta
            cada dispositivo cuando puedas: modos de red, pantallas y ajustes
            pueden producir consumos muy distintos.
          </p>
        </div>
        <div className="calculator-fields">
          <DecimalField
            error={errors.deviceCount}
            id={prefix + "-count"}
            inputMode="numeric"
            label="Número de aparatos"
            onChange={(value) => change("deviceCount", value)}
            unit="aparatos"
            value={raw.deviceCount}
          />
          <DecimalField
            error={errors.watts}
            help="Potencia media en espera por aparato, no potencia máxima."
            id={prefix + "-watts"}
            label="Consumo medio por aparato"
            onChange={(value) => change("watts", value)}
            unit="W"
            value={raw.watts}
          />
          <DecimalField
            error={errors.hoursPerDay}
            id={prefix + "-hours"}
            label="Horas en espera al día"
            onChange={(value) => change("hoursPerDay", value)}
            unit="h/día"
            value={raw.hoursPerDay}
          />
          <DecimalField
            error={errors.daysPerYear}
            id={prefix + "-days"}
            inputMode="numeric"
            label="Días al año"
            onChange={(value) => change("daysPerYear", value)}
            unit="días"
            value={raw.daysPerYear}
          />
          <DecimalField
            error={errors.pricePerKwh}
            help="Precio ilustrativo inicial; introduce el que quieras analizar."
            id={prefix + "-price"}
            label="Precio de la energía"
            onChange={(value) => change("pricePerKwh", value)}
            unit="€/kWh"
            value={raw.pricePerKwh}
          />
        </div>
        <p className="calculator-note">
          Si los aparatos no comparten potencia u horario, repite el cálculo por
          grupos. El resultado no presupone que desconectarlos sea seguro o
          recomendable.
        </p>
      </div>
      {outcome.result ? (
        <CalculationResultPanel result={outcome.result} />
      ) : (
        <EmptyResult>
          Revisa los campos señalados. El número de aparatos debe ser entero y
          las horas no pueden superar las 24 de un día.
        </EmptyResult>
      )}
    </div>
  );
}
