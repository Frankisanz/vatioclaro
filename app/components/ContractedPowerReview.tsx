"use client";

import {
  calculateContractedPowerReview,
  type ContractedPowerReviewResult,
} from "@/lib/electricity";
import { useMemo, useState } from "react";
import {
  DecimalField,
  EmptyResult,
  issuesToFieldErrors,
  parseFields,
  useFieldPrefix,
  type FieldErrors,
} from "./CalculatorPrimitives";

type RawPowerReview = {
  currentPeakKw: string;
  currentValleyKw: string;
  demandPeakKw: string;
  demandValleyKw: string;
  marginPercentage: string;
};

type PowerReviewOutcome =
  | { errors: FieldErrors; result: ContractedPowerReviewResult }
  | { errors: FieldErrors; result: null };

function calculate(raw: RawPowerReview): PowerReviewOutcome {
  const parsed = parseFields(raw);
  if (!parsed.ok) return { errors: parsed.errors, result: null };

  const result = calculateContractedPowerReview({
    currentPeakKw: parsed.values.currentPeakKw,
    currentValleyKw: parsed.values.currentValleyKw,
    demandPeakKw: parsed.values.demandPeakKw,
    demandValleyKw: parsed.values.demandValleyKw,
    marginPercentage: parsed.values.marginPercentage,
  });

  return result.ok
    ? { errors: {}, result: result.value }
    : { errors: issuesToFieldErrors(result.errors), result: null };
}

function getReviewMessage(current: number, reference: number) {
  const difference = current - reference;

  if (difference >= 0.5) {
    return "Hay margen aparente para revisar este periodo.";
  }

  if (difference >= 0) {
    return "La potencia actual está cerca de la referencia calculada.";
  }

  return "La referencia con margen supera la potencia contratada actual.";
}

function formatKw(value: number) {
  return `${value.toLocaleString("es-ES", {
    maximumFractionDigits: 1,
    useGrouping: "always",
  })} kW`;
}

export function ContractedPowerReview() {
  const [raw, setRaw] = useState<RawPowerReview>({
    currentPeakKw: "4.6",
    currentValleyKw: "4.6",
    demandPeakKw: "3.2",
    demandValleyKw: "2.4",
    marginPercentage: "10",
  });
  const [interacted, setInteracted] = useState(false);
  const prefix = useFieldPrefix("contracted-power-review");
  const outcome = useMemo(() => calculate(raw), [raw]);
  const errors = interacted ? outcome.errors : {};

  function change(field: keyof RawPowerReview, value: string) {
    setRaw((current) => ({ ...current, [field]: value }));
    setInteracted(true);
  }

  const fields = [
    {
      field: "currentPeakKw",
      label: "Contratada en punta/llano",
      unit: "kW",
    },
    {
      field: "demandPeakKw",
      label: "Máxima demandada en punta/llano",
      unit: "kW",
    },
    { field: "currentValleyKw", label: "Contratada en valle", unit: "kW" },
    {
      field: "demandValleyKw",
      label: "Máxima demandada en valle",
      unit: "kW",
    },
    {
      field: "marginPercentage",
      label: "Margen de seguridad",
      unit: "%",
      help: "Entre 0 y 100 %. Es un supuesto editable, no un margen recomendado.",
    },
  ] as const;

  return (
    <div className="energy-calculator power-review">
      <div>
        <div className="calculator-context">
          <span>REVISIÓN ORIENTATIVA</span>
          <p>
            Copia de tu factura o área de la distribuidora la potencia
            contratada y la máxima demandada de un periodo representativo.
          </p>
        </div>
        <div className="calculator-fields">
          {fields.map((item) => (
            <DecimalField
              error={errors[item.field]}
              help={"help" in item ? item.help : undefined}
              id={`${prefix}-${item.field}`}
              key={item.field}
              label={item.label}
              onChange={(value) => change(item.field, value)}
              unit={item.unit}
              value={raw[item.field]}
            />
          ))}
        </div>
        <p className="calculator-note">
          La referencia no es una recomendación contractual. Revisa al menos un
          año, los aparatos que coinciden, posibles cambios de hábitos y la
          potencia máxima admisible antes de solicitar una modificación.
        </p>
      </div>

      {outcome.result ? (
        <div aria-live="polite" className="calculator-result power-review__result">
          <span className="calculator-result__label">REFERENCIA CON MARGEN</span>
          <div className="power-review__figures">
            <div>
              <small>PUNTA / LLANO</small>
              <strong>{formatKw(outcome.result.referencePeakKw)}</strong>
              <p>
                {getReviewMessage(
                  outcome.result.currentPeakKw,
                  outcome.result.referencePeakKw,
                )}
              </p>
            </div>
            <div>
              <small>VALLE</small>
              <strong>{formatKw(outcome.result.referenceValleyKw)}</strong>
              <p>
                {getReviewMessage(
                  outcome.result.currentValleyKw,
                  outcome.result.referenceValleyKw,
                )}
              </p>
            </div>
          </div>
          <p className="power-review__warning">
            No solicites una bajada basándote solo en este cálculo.
          </p>
        </div>
      ) : (
        <EmptyResult>
          Revisa los campos señalados. No se calculan entradas vacías,
          negativas, infinitas ni fuera de los límites de esta herramienta.
        </EmptyResult>
      )}
    </div>
  );
}
