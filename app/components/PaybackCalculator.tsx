"use client";

import {
  calculateOwnershipComparison,
  EXAMPLE_ELECTRICITY_PRICE,
  formatCurrency,
  formatElectricityPrice,
  type OwnershipComparisonResult,
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

type RawOwnership = {
  aAnnualKwh: string;
  aPurchasePrice: string;
  bAnnualKwh: string;
  bPurchasePrice: string;
  pricePerKwh: string;
};

type OwnershipOutcome =
  | { errors: FieldErrors; result: OwnershipComparisonResult }
  | { errors: FieldErrors; result: null };

function calculate(raw: RawOwnership): OwnershipOutcome {
  const parsed = parseFields(raw);
  if (!parsed.ok) return { errors: parsed.errors, result: null };

  const values = parsed.values;
  const result = calculateOwnershipComparison({
    productA: {
      purchasePrice: values.aPurchasePrice,
      annualKwh: values.aAnnualKwh,
    },
    productB: {
      purchasePrice: values.bPurchasePrice,
      annualKwh: values.bAnnualKwh,
    },
    pricePerKwh: values.pricePerKwh,
  });

  return result.ok
    ? { errors: {}, result: result.value }
    : {
        errors: issuesToFieldErrors(result.errors, {
          "productA.purchasePrice": "aPurchasePrice",
          "productA.annualKwh": "aAnnualKwh",
          "productB.purchasePrice": "bPurchasePrice",
          "productB.annualKwh": "bAnnualKwh",
        }),
        result: null,
      };
}

function paybackExplanation(result: OwnershipComparisonResult) {
  if (result.paybackStatus === "calculable" && result.paybackYears !== null) {
    const months = result.paybackYears * 12;
    const paybackPeriod =
      months < 1
        ? "menos de un mes"
        : result.paybackYears < 1
          ? `${months.toLocaleString("es-ES", {
              maximumFractionDigits: 1,
            })} ${Math.round(months * 10) / 10 === 1 ? "mes" : "meses"}`
          : `${result.paybackYears.toLocaleString("es-ES", {
              maximumFractionDigits: 1,
            })} ${result.paybackYears === 1 ? "año" : "años"}`;

    return (
      <>
        La diferencia de compra se igualaría matemáticamente en{" "}
        <strong>{paybackPeriod}</strong>{" "}
        si consumo y precio permanecieran constantes.
      </>
    );
  }

  if (result.paybackStatus === "no_purchase_premium") {
    return "El producto B no tiene una prima de compra positiva que recuperar frente a A.";
  }
  if (result.paybackStatus === "no_energy_saving") {
    return "Con estos datos, B no genera un ahorro energético anual con el que recuperar su mayor precio.";
  }
  return "Ambos productos tienen el mismo precio de compra y coste energético en estos datos.";
}

export function PaybackCalculator() {
  const [raw, setRaw] = useState<RawOwnership>({
    aAnnualKwh: "",
    aPurchasePrice: "",
    bAnnualKwh: "",
    bPurchasePrice: "",
    pricePerKwh: String(EXAMPLE_ELECTRICITY_PRICE),
  });
  const [interacted, setInteracted] = useState(false);
  const prefix = useFieldPrefix("payback-calculator");
  const { complete: trackComplete, start: trackStart } =
    useCalculatorTracking("comparison", "ownership");
  const outcome = useMemo(() => calculate(raw), [raw]);

  useEffect(() => {
    if (interacted && outcome.result) trackComplete();
  }, [interacted, outcome.result, trackComplete]);

  function change(field: keyof RawOwnership, value: string) {
    setRaw((current) => ({ ...current, [field]: value }));
    setInteracted(true);
    trackStart();
  }

  const errors = interacted ? outcome.errors : {};
  const result = outcome.result;
  const annualDifferenceLabel = result
    ? result.annualEnergySavingWithB > 0
      ? "Ahorro anual estimado con B"
      : result.annualEnergySavingWithB < 0
        ? "Sobrecoste anual estimado con B"
        : "Diferencia anual estimada"
    : "Diferencia anual estimada";

  return (
    <div className="ownership-calculator">
      <div className="calculator-context calculator-context--paper">
        <span>DATOS DE DOS MODELOS COMPARABLES</span>
        <p>
          No precargamos precios de compra ni consumos. Copia los datos de los
          productos que estés valorando. El precio inicial de{" "}
          {formatElectricityPrice(EXAMPLE_ELECTRICITY_PRICE)} es ilustrativo,
          no un precio oficial ni actual de España.
        </p>
      </div>
      <div className="comparison-calculator__inputs">
        <fieldset>
          <legend>Producto A</legend>
          <div className="calculator-fields">
            <DecimalField
              error={errors.aPurchasePrice}
              id={prefix + "-a-price"}
              label="Precio de compra"
              onChange={(value) => change("aPurchasePrice", value)}
              unit="€"
              value={raw.aPurchasePrice}
            />
            <DecimalField
              error={errors.aAnnualKwh}
              id={prefix + "-a-kwh"}
              label="Consumo declarado"
              onChange={(value) => change("aAnnualKwh", value)}
              unit="kWh/año"
              value={raw.aAnnualKwh}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Producto B</legend>
          <div className="calculator-fields">
            <DecimalField
              error={errors.bPurchasePrice}
              id={prefix + "-b-price"}
              label="Precio de compra"
              onChange={(value) => change("bPurchasePrice", value)}
              unit="€"
              value={raw.bPurchasePrice}
            />
            <DecimalField
              error={errors.bAnnualKwh}
              id={prefix + "-b-kwh"}
              label="Consumo declarado"
              onChange={(value) => change("bAnnualKwh", value)}
              unit="kWh/año"
              value={raw.bAnnualKwh}
            />
          </div>
        </fieldset>
      </div>
      <div className="comparison-calculator__price">
        <DecimalField
          error={errors.pricePerKwh}
          help="Precio ilustrativo inicial y editable; la proyección lo mantiene constante durante 5 y 10 años."
          id={prefix + "-electricity-price"}
          label="Precio de la energía"
          onChange={(value) => change("pricePerKwh", value)}
          unit="€/kWh"
          value={raw.pricePerKwh}
        />
      </div>

      {result ? (
        <div className="ownership-result" aria-live="polite">
          <div className="comparison-result__options">
            {[
              ["Producto A", result.productA],
              ["Producto B", result.productB],
            ].map(([label, product]) => {
              const item = product as OwnershipComparisonResult["productA"];
              return (
                <section key={label as string}>
                  <span>{label as string}</span>
                  <strong>{formatCurrency(item.annualEnergyCost)}/año</strong>
                  <dl>
                    <dt>Compra</dt>
                    <dd>{formatCurrency(item.purchasePrice)}</dd>
                    <dt>Total a 5 años</dt>
                    <dd>{formatCurrency(item.totalCostFiveYears)}</dd>
                    <dt>Total a 10 años</dt>
                    <dd>{formatCurrency(item.totalCostTenYears)}</dd>
                  </dl>
                </section>
              );
            })}
          </div>
          <div className="ownership-result__payback">
            <span>CUENTA DE RECUPERACIÓN</span>
            <p>{paybackExplanation(result)}</p>
            <dl>
              <dt>Diferencia de compra B − A</dt>
              <dd>{formatCurrency(result.purchaseDifferenceBMinusA)}</dd>
              <dt>{annualDifferenceLabel}</dt>
              <dd>{formatCurrency(Math.abs(result.annualEnergySavingWithB))}</dd>
            </dl>
          </div>
          <p className="calculator-disclaimer">
            Este resultado muestra matemáticas, no una recomendación. Comprueba
            que ambos modelos cubren la misma necesidad y valora vida útil,
            reparación, prestaciones y condiciones de uso.
          </p>
        </div>
      ) : (
        <EmptyResult>
          Introduce precio y kWh/año de ambos productos. No se mostrarán plazos
          con datos vacíos, negativos, infinitos o fuera de rango.
        </EmptyResult>
      )}
    </div>
  );
}
