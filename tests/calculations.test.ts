import assert from "node:assert/strict";
import test from "node:test";

import {
  applyReduction,
  calculateContractedPowerReview,
  calculateElectricity,
  calculateEnergyLabel,
  calculateOwnershipComparison,
  calculateUsageScenarios,
  compareCalculations,
  costFromKwh,
  formatCurrency,
  formatElectricityPrice,
  formatKwh,
  formatWatts,
  kwhFromPower,
  kwhPerCycleFromLabel,
  parseSpanishNumber,
  roundForDisplay,
  wattsToKilowatts,
  type DomainResult,
} from "../lib/electricity.ts";

function valueOf<T>(result: DomainResult<T>): T {
  assert.equal(
    result.ok,
    true,
    result.ok ? undefined : JSON.stringify(result.errors),
  );
  if (!result.ok) {
    assert.fail("Se esperaba un resultado válido.");
  }
  return result.value;
}

function expectIssue(
  result: DomainResult<unknown>,
  code: "empty" | "invalid" | "negative" | "too_large" | "out_of_range",
  field?: string,
) {
  assert.equal(result.ok, false);
  if (result.ok) {
    assert.fail("Se esperaba un error de dominio.");
  }
  assert.ok(
    result.errors.some(
      (entry) => entry.code === code && (field === undefined || entry.field === field),
    ),
    `No se encontró ${code}${field ? ` en ${field}` : ""}: ${JSON.stringify(result.errors)}`,
  );
}

function closeTo(actual: number, expected: number, epsilon = 1e-10) {
  assert.ok(
    Math.abs(actual - expected) <= epsilon,
    `Se esperaba ${expected}, se recibió ${actual}`,
  );
}

test("parseSpanishNumber acepta coma y punto, sin confundir entradas inválidas", () => {
  assert.equal(valueOf(parseSpanishNumber(" 12,50 ")), 12.5);
  assert.equal(valueOf(parseSpanishNumber(".75")), 0.75);
  assert.equal(valueOf(parseSpanishNumber(",75")), 0.75);
  assert.equal(valueOf(parseSpanishNumber(42.25)), 42.25);
  assert.equal(valueOf(parseSpanishNumber("-0")), 0);
  assert.equal(valueOf(parseSpanishNumber(-0)), 0);

  expectIssue(parseSpanishNumber(""), "empty", "value");
  expectIssue(parseSpanishNumber("   "), "empty", "value");
  expectIssue(parseSpanishNumber("doce"), "invalid", "value");
  expectIssue(parseSpanishNumber("1e3"), "invalid", "value");
  expectIssue(parseSpanishNumber("1.2.3"), "invalid", "value");
  expectIssue(parseSpanishNumber("1.500"), "invalid", "value");
  expectIssue(parseSpanishNumber(Number.POSITIVE_INFINITY), "invalid", "value");
  expectIssue(parseSpanishNumber("9".repeat(400)), "invalid", "value");
});

test("las conversiones básicas conservan unidades y signo", () => {
  assert.equal(wattsToKilowatts(1_500), 1.5);
  assert.equal(wattsToKilowatts(0), 0);
  assert.equal(wattsToKilowatts(-500), -0.5);
  assert.equal(kwhFromPower(2_000, 1.5), 3);
  assert.equal(kwhFromPower(0, 24), 0);
  assert.equal(costFromKwh(12, 0.25), 3);
  assert.equal(costFromKwh(0, 0.25), 0);
  assert.equal(kwhPerCycleFromLabel(62), 0.62);
  assert.equal(applyReduction(100, 25), 75);
  assert.equal(applyReduction(100, 50), 50);
});

test("potencia y tiempo producen hora, día, mes y año coherentes", () => {
  const result = valueOf(
    calculateElectricity({
      method: "power",
      watts: 1_000,
      hoursPerDay: 2,
      daysPerMonth: 30,
      pricePerKwh: 0.25,
    }),
  );

  assert.equal(result.consumption.hour, 1);
  assert.equal(result.consumption.day, 2);
  assert.equal(result.consumption.month, 60);
  assert.equal(result.consumption.year, 720);
  assert.equal(result.cost.hour, 0.25);
  assert.equal(result.cost.day, 0.5);
  assert.equal(result.cost.month, 15);
  assert.equal(result.cost.year, 180);
});

test("los ciclos mensuales y semanales se anualizan con su periodo explícito", () => {
  const monthly = valueOf(
    calculateElectricity({
      method: "cycle",
      kwhPerCycle: 1.2,
      cycles: 10,
      cyclePeriod: "month",
      pricePerKwh: 0.25,
    }),
  );
  assert.equal(monthly.consumption.use, 1.2);
  assert.equal(monthly.consumption.month, 12);
  assert.equal(monthly.consumption.year, 144);
  assert.equal(monthly.cost.use, 0.3);

  const weekly = valueOf(
    calculateElectricity({
      method: "cycle",
      kwhPerCycle: 2,
      cycles: 3,
      cyclePeriod: "week",
      pricePerKwh: 0.2,
    }),
  );
  assert.equal(weekly.consumption.month, 26);
  assert.equal(weekly.consumption.year, 312);
  closeTo(weekly.cost.year, 62.4);
});

test("la etiqueta por 100 ciclos convierte antes de calcular costes", () => {
  const result = valueOf(
    calculateEnergyLabel({
      mode: "cycles",
      kwhPer100Cycles: 60,
      cyclesPerMonth: 20,
      pricePerKwh: 0.25,
    }),
  );

  assert.equal(result.kwhPerCycle, 0.6);
  assert.equal(result.costPerCycle, 0.15);
  assert.equal(result.calculation.consumption.month, 12);
  assert.equal(result.calculation.consumption.year, 144);
  assert.equal(result.costFiveYears, 180);
  assert.equal(result.costTenYears, 360);

  expectIssue(
    calculateEnergyLabel({
      mode: "cycles",
      kwhPer100Cycles: 60,
      cyclesPerMonth: -1,
      pricePerKwh: 0.25,
    }),
    "negative",
    "cyclesPerMonth",
  );
});

test("el método anual conserva el dato de etiqueta y deriva el mes", () => {
  const result = valueOf(
    calculateElectricity({
      method: "annual",
      annualKwh: 1_200,
      pricePerKwh: 0.25,
    }),
  );

  assert.equal(result.consumption.hour, null);
  assert.equal(result.consumption.month, 100);
  assert.equal(result.consumption.year, 1_200);
  closeTo(result.consumption.day, 1_200 / 365);
  assert.equal(result.cost.year, 300);
});

test("el método diario anualiza sobre 365 días", () => {
  const result = valueOf(
    calculateElectricity({
      method: "daily",
      dailyKwh: 2,
      pricePerKwh: 0.2,
    }),
  );

  assert.equal(result.consumption.day, 2);
  closeTo(result.consumption.month, 730 / 12);
  assert.equal(result.consumption.year, 730);
  assert.equal(result.cost.day, 0.4);
  assert.equal(result.cost.year, 146);
});

test("standby contempla potencia, tiempo anual y número entero de aparatos", () => {
  const result = valueOf(
    calculateElectricity({
      method: "standby",
      watts: 5,
      hoursPerDay: 20,
      daysPerYear: 365,
      deviceCount: 2,
      pricePerKwh: 0.25,
    }),
  );

  assert.equal(result.consumption.hour, 0.01);
  assert.equal(result.consumption.day, 0.2);
  assert.equal(result.consumption.year, 73);
  closeTo(result.consumption.month, 73 / 12);
  assert.equal(result.cost.year, 18.25);

  expectIssue(
    calculateElectricity({
      method: "standby",
      watts: 5,
      hoursPerDay: 20,
      daysPerYear: 365,
      deviceCount: 1.5,
      pricePerKwh: 0.25,
    }),
    "out_of_range",
    "deviceCount",
  );
});

test("los escenarios reducen consumo y coste un 25 % y un 50 %", () => {
  const scenarios = valueOf(
    calculateUsageScenarios({
      method: "annual",
      annualKwh: 400,
      pricePerKwh: 0.25,
    }),
  );

  assert.equal(scenarios.current.consumption.year, 400);
  assert.equal(scenarios.current.cost.year, 100);
  assert.equal(scenarios.reduction25.consumption.year, 300);
  assert.equal(scenarios.reduction25.cost.year, 75);
  assert.equal(scenarios.reduction50.consumption.year, 200);
  assert.equal(scenarios.reduction50.cost.year, 50);

  const perUse = valueOf(
    calculateUsageScenarios({
      method: "cycle",
      kwhPerCycle: 1.2,
      cycles: 10,
      cyclePeriod: "month",
      pricePerKwh: 0.25,
    }),
  );
  assert.equal(perUse.reduction25.consumption.use, 1.2);
  assert.equal(perUse.reduction25.cost.use, 0.3);
  assert.equal(perUse.reduction25.consumption.month, 9);

  const perHour = valueOf(
    calculateUsageScenarios({
      method: "power",
      watts: 1_000,
      hoursPerDay: 2,
      daysPerMonth: 30,
      pricePerKwh: 0.25,
    }),
  );
  assert.equal(perHour.reduction50.consumption.hour, 1);
  assert.equal(perHour.reduction50.cost.hour, 0.25);
  assert.equal(perHour.reduction50.consumption.month, 30);
});

test("la comparación conserva el signo segundo menos primero y detecta el menor", () => {
  const comparison = valueOf(
    compareCalculations(
      { method: "annual", annualKwh: 400, pricePerKwh: 0.25 },
      { method: "annual", annualKwh: 250, pricePerKwh: 0.25 },
    ),
  );

  assert.equal(comparison.lowerCost, "second");
  assert.equal(comparison.differenceSecondMinusFirst.consumption.year, -150);
  assert.equal(comparison.differenceSecondMinusFirst.cost.year, -37.5);

  const equal = valueOf(
    compareCalculations(
      { method: "daily", dailyKwh: 1, pricePerKwh: 0.25 },
      { method: "daily", dailyKwh: 1, pricePerKwh: 0.25 },
    ),
  );
  assert.equal(equal.lowerCost, "equal");
});

test("el coste de propiedad calcula amortización solo cuando hay prima y ahorro", () => {
  const result = valueOf(
    calculateOwnershipComparison({
      productA: { purchasePrice: 500, annualKwh: 300 },
      productB: { purchasePrice: 650, annualKwh: 150 },
      pricePerKwh: 0.25,
    }),
  );

  assert.equal(result.purchaseDifferenceBMinusA, 150);
  assert.equal(result.annualEnergySavingWithB, 37.5);
  assert.equal(result.paybackStatus, "calculable");
  assert.equal(result.paybackYears, 4);
  assert.equal(result.productA.totalCostFiveYears, 875);
  assert.equal(result.productB.totalCostTenYears, 1_025);

  const noSaving = valueOf(
    calculateOwnershipComparison({
      productA: { purchasePrice: 500, annualKwh: 200 },
      productB: { purchasePrice: 650, annualKwh: 300 },
      pricePerKwh: 0.25,
    }),
  );
  assert.equal(noSaving.paybackStatus, "no_energy_saving");
  assert.equal(noSaving.paybackYears, null);
});

test("la revisión de potencia valida entradas y redondea el margen", () => {
  const result = valueOf(
    calculateContractedPowerReview({
      currentPeakKw: 4.6,
      currentValleyKw: 4.6,
      demandPeakKw: 3.2,
      demandValleyKw: 2.4,
      marginPercentage: 10,
    }),
  );

  assert.equal(result.referencePeakKw, 3.6);
  assert.equal(result.referenceValleyKw, 2.7);

  const exactTenth = valueOf(
    calculateContractedPowerReview({
      currentPeakKw: 5,
      currentValleyKw: 3,
      demandPeakKw: 3.2,
      demandValleyKw: 1.5,
      marginPercentage: 50,
    }),
  );
  assert.equal(exactTenth.referencePeakKw, 4.8);
  assert.equal(exactTenth.referenceValleyKw, 2.3);

  expectIssue(
    calculateContractedPowerReview({
      currentPeakKw: 4.6,
      currentValleyKw: 4.6,
      demandPeakKw: -1,
      demandValleyKw: 2.4,
      marginPercentage: 10,
    }),
    "negative",
    "demandPeakKw",
  );
  expectIssue(
    calculateContractedPowerReview({
      currentPeakKw: 4.6,
      currentValleyKw: 4.6,
      demandPeakKw: 3.2,
      demandValleyKw: 2.4,
      marginPercentage: 101,
    }),
    "too_large",
    "marginPercentage",
  );
  expectIssue(
    calculateContractedPowerReview({
      currentPeakKw: Number.MAX_VALUE,
      currentValleyKw: 4.6,
      demandPeakKw: 3.2,
      demandValleyKw: 2.4,
      marginPercentage: 10,
    }),
    "too_large",
    "currentPeakKw",
  );
});

test("los formateadores presentan decimales españoles y neutralizan no finitos", () => {
  const currency = formatCurrency(1_234.5);
  assert.match(currency, /^1\.234,50\s?€$/u);
  assert.equal(formatKwh(12.5), "12,5 kWh");
  assert.equal(formatKwh(1_500), "1.500 kWh");
  assert.equal(formatWatts(1_234.5), "1.234,5 W");
  assert.equal(formatElectricityPrice(0.2575), "0,2575 €/kWh");
  assert.equal(formatCurrency(Number.POSITIVE_INFINITY), formatCurrency(0));
  assert.equal(formatKwh(Number.NaN), "0 kWh");
});

test("el redondeo es estable y limita la precisión solicitada", () => {
  assert.equal(roundForDisplay(1.005, 2), 1.01);
  assert.equal(roundForDisplay(10.49, -3), 10);
  assert.equal(roundForDisplay(1.2345678912, 20), 1.23456789);
  assert.equal(roundForDisplay(Number.POSITIVE_INFINITY), 0);
});

test("cero es válido y los negativos se rechazan en los cálculos", () => {
  const zero = valueOf(
    calculateElectricity({
      method: "power",
      watts: 0,
      hoursPerDay: 0,
      daysPerMonth: 0,
      pricePerKwh: 0,
    }),
  );
  assert.equal(zero.consumption.year, 0);
  assert.equal(zero.cost.year, 0);
  assert.equal(Object.is(zero.consumption.year, -0), false);

  const signedZero = valueOf(
    calculateElectricity({
      method: "annual",
      annualKwh: -0,
      pricePerKwh: -0,
    }),
  );
  assert.equal(Object.is(signedZero.consumption.year, -0), false);
  assert.equal(Object.is(signedZero.cost.year, -0), false);

  expectIssue(
    calculateElectricity({
      method: "annual",
      annualKwh: -1,
      pricePerKwh: 0.25,
    }),
    "negative",
    "annualKwh",
  );
  expectIssue(
    calculateOwnershipComparison({
      productA: { purchasePrice: -1, annualKwh: 100 },
      productB: { purchasePrice: 500, annualKwh: 90 },
      pricePerKwh: 0.25,
    }),
    "negative",
    "productA.purchasePrice",
  );
});

test("los máximos documentados siguen siendo finitos y los excesos fallan", () => {
  const maximum = valueOf(
    calculateElectricity({
      method: "power",
      watts: 10_000_000,
      hoursPerDay: 24,
      daysPerMonth: 31,
      pricePerKwh: 1_000,
    }),
  );
  assert.ok(Number.isFinite(maximum.consumption.year));
  assert.ok(Number.isFinite(maximum.cost.year));

  expectIssue(
    calculateElectricity({
      method: "power",
      watts: 10_000_001,
      hoursPerDay: 24,
      daysPerMonth: 31,
      pricePerKwh: 0.25,
    }),
    "too_large",
    "watts",
  );
  expectIssue(
    calculateElectricity({
      method: "power",
      watts: Number.MAX_VALUE,
      hoursPerDay: 24,
      daysPerMonth: 31,
      pricePerKwh: 0.25,
    }),
    "too_large",
    "watts",
  );
  expectIssue(
    calculateElectricity({
      method: "annual",
      annualKwh: Number.POSITIVE_INFINITY,
      pricePerKwh: 0.25,
    }),
    "invalid",
    "annualKwh",
  );

  expectIssue(
    calculateOwnershipComparison({
      productA: { purchasePrice: 0, annualKwh: Number.MIN_VALUE },
      productB: { purchasePrice: 1, annualKwh: 0 },
      pricePerKwh: 1,
    }),
    "too_large",
    "productB.annualKwh",
  );
});
