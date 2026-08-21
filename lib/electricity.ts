/**
 * Pure electricity domain for VatioClaro.
 *
 * Keep calculations independent from React, localized strings and browser APIs.
 * Values are stored as numbers and formatted only at the presentation boundary.
 */

export const EXAMPLE_ELECTRICITY_PRICE = 0.25;
export const EXTERNAL_ELECTRICITY_PRICE: number | null = null;
export const ELECTRICITY_LOCALE = "es-ES";
export const ELECTRICITY_CURRENCY = "EUR";

const DAYS_PER_YEAR = 365;
const MONTHS_PER_YEAR = 12;
const WEEKS_PER_YEAR = 52;

export const CALCULATION_LIMITS = Object.freeze({
  contractedPowerKw: 100_000,
  cycles: 1_000_000,
  daysPerMonth: 31,
  daysPerYear: 366,
  deviceCount: 100_000,
  energyKwh: 1_000_000_000,
  hoursPerDay: 24,
  marginPercentage: 100,
  pricePerKwh: 1_000,
  purchasePrice: 1_000_000_000,
  watts: 10_000_000,
});

export type CalculationMethod =
  | "power"
  | "cycle"
  | "annual"
  | "daily"
  | "standby";

export type CyclePeriod = "week" | "month";

export type PowerCalculationInput = {
  method: "power";
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  pricePerKwh: number;
};

export type CycleCalculationInput = {
  method: "cycle";
  kwhPerCycle: number;
  cycles: number;
  cyclePeriod: CyclePeriod;
  pricePerKwh: number;
};

export type AnnualCalculationInput = {
  method: "annual";
  annualKwh: number;
  pricePerKwh: number;
};

export type DailyCalculationInput = {
  method: "daily";
  dailyKwh: number;
  pricePerKwh: number;
};

export type StandbyCalculationInput = {
  method: "standby";
  watts: number;
  hoursPerDay: number;
  daysPerYear: number;
  deviceCount: number;
  pricePerKwh: number;
};

export type CalculationInput =
  | PowerCalculationInput
  | CycleCalculationInput
  | AnnualCalculationInput
  | DailyCalculationInput
  | StandbyCalculationInput;

export type DomainIssueCode =
  | "empty"
  | "invalid"
  | "negative"
  | "too_large"
  | "out_of_range";

export type DomainIssue = {
  code: DomainIssueCode;
  field: string;
  message: string;
};

export type DomainResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: DomainIssue[] };

export type PeriodBreakdown = {
  hour: number | null;
  use: number | null;
  day: number;
  month: number;
  year: number;
};

export type CalculationResult = {
  method: CalculationMethod;
  consumption: PeriodBreakdown;
  cost: PeriodBreakdown;
};

export type UsageScenarios = {
  current: CalculationResult;
  reduction25: CalculationResult;
  reduction50: CalculationResult;
};

export type CalculationComparison = {
  first: CalculationResult;
  second: CalculationResult;
  differenceSecondMinusFirst: {
    consumption: PeriodBreakdown;
    cost: PeriodBreakdown;
  };
  lowerCost: "first" | "second" | "equal";
};

export type EnergyLabelInput =
  | {
      mode: "annual";
      annualKwh: number;
      pricePerKwh: number;
    }
  | {
      mode: "cycles";
      kwhPer100Cycles: number;
      cyclesPerMonth: number;
      pricePerKwh: number;
    };

export type EnergyLabelResult = {
  calculation: CalculationResult;
  kwhPerCycle: number | null;
  costPerCycle: number | null;
  costFiveYears: number;
  costTenYears: number;
};

export type OwnershipComparisonInput = {
  productA: { purchasePrice: number; annualKwh: number };
  productB: { purchasePrice: number; annualKwh: number };
  pricePerKwh: number;
};

export type OwnershipProductResult = {
  purchasePrice: number;
  annualKwh: number;
  annualEnergyCost: number;
  totalCostOneYear: number;
  totalCostFiveYears: number;
  totalCostTenYears: number;
};

export type OwnershipComparisonResult = {
  productA: OwnershipProductResult;
  productB: OwnershipProductResult;
  purchaseDifferenceBMinusA: number;
  annualEnergySavingWithB: number;
  paybackStatus:
    | "calculable"
    | "no_purchase_premium"
    | "no_energy_saving"
    | "equivalent";
  paybackYears: number | null;
};

export type ContractedPowerReviewInput = {
  currentPeakKw: number;
  currentValleyKw: number;
  demandPeakKw: number;
  demandValleyKw: number;
  marginPercentage: number;
};

export type ContractedPowerReviewResult = ContractedPowerReviewInput & {
  referencePeakKw: number;
  referenceValleyKw: number;
};

const success = <T>(value: T): DomainResult<T> => ({ ok: true, value });
const failure = <T = never>(errors: DomainIssue[]): DomainResult<T> => ({
  ok: false,
  errors,
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeZero(value: number) {
  return Object.is(value, -0) ? 0 : value;
}

function normalizedFinite(value: number) {
  return Number.isFinite(value) ? normalizeZero(value) : 0;
}

type NumberOptions = {
  integer?: boolean;
  maximum: number;
  maximumMessage?: string;
};

function readNumber(
  source: Record<string, unknown>,
  field: string,
  options: NumberOptions,
  errors: DomainIssue[],
) {
  const raw = source[field];

  if (raw === "" || raw === null || raw === undefined) {
    errors.push({
      code: "empty",
      field,
      message: "Este campo es obligatorio.",
    });
    return null;
  }

  if (typeof raw !== "number" || !Number.isFinite(raw)) {
    errors.push({
      code: "invalid",
      field,
      message: "Introduce un número válido y finito.",
    });
    return null;
  }

  const value = normalizeZero(raw);
  if (value < 0) {
    errors.push({
      code: "negative",
      field,
      message: "El valor no puede ser negativo.",
    });
    return null;
  }

  if (value > options.maximum) {
    errors.push({
      code: "too_large",
      field,
      message:
        options.maximumMessage ??
        `El valor es demasiado grande; no puede superar ${options.maximum.toLocaleString(ELECTRICITY_LOCALE)}.`,
    });
    return null;
  }

  if (options.integer && !Number.isInteger(value)) {
    errors.push({
      code: "out_of_range",
      field,
      message: "Introduce un número entero dentro del intervalo permitido.",
    });
    return null;
  }

  return value;
}

function validateCalculationInput(input: unknown): DomainResult<CalculationInput> {
  if (!isRecord(input)) {
    return failure([
      {
        code: "empty",
        field: "input",
        message: "Faltan los datos necesarios para calcular.",
      },
    ]);
  }

  const errors: DomainIssue[] = [];
  const pricePerKwh = readNumber(
    input,
    "pricePerKwh",
    { maximum: CALCULATION_LIMITS.pricePerKwh },
    errors,
  );

  if (input.method === "power") {
    const watts = readNumber(input, "watts", { maximum: CALCULATION_LIMITS.watts }, errors);
    const hoursPerDay = readNumber(
      input,
      "hoursPerDay",
      {
        maximum: CALCULATION_LIMITS.hoursPerDay,
        maximumMessage: "Las horas al día no pueden superar 24.",
      },
      errors,
    );
    const daysPerMonth = readNumber(
      input,
      "daysPerMonth",
      {
        maximum: CALCULATION_LIMITS.daysPerMonth,
        maximumMessage: "Los días al mes no pueden superar 31.",
      },
      errors,
    );

    return errors.length || watts === null || hoursPerDay === null || daysPerMonth === null || pricePerKwh === null
      ? failure(errors)
      : success({ method: "power", watts, hoursPerDay, daysPerMonth, pricePerKwh });
  }

  if (input.method === "cycle") {
    const kwhPerCycle = readNumber(input, "kwhPerCycle", { maximum: CALCULATION_LIMITS.energyKwh }, errors);
    const cycles = readNumber(input, "cycles", { maximum: CALCULATION_LIMITS.cycles }, errors);
    const cyclePeriod = input.cyclePeriod;
    if (cyclePeriod !== "week" && cyclePeriod !== "month") {
      errors.push({
        code: "out_of_range",
        field: "cyclePeriod",
        message: "El periodo debe ser semanal o mensual.",
      });
    }

    return errors.length || kwhPerCycle === null || cycles === null || pricePerKwh === null
      ? failure(errors)
      : success({ method: "cycle", kwhPerCycle, cycles, cyclePeriod: cyclePeriod as CyclePeriod, pricePerKwh });
  }

  if (input.method === "annual") {
    const annualKwh = readNumber(input, "annualKwh", { maximum: CALCULATION_LIMITS.energyKwh }, errors);
    return errors.length || annualKwh === null || pricePerKwh === null
      ? failure(errors)
      : success({ method: "annual", annualKwh, pricePerKwh });
  }

  if (input.method === "daily") {
    const dailyKwh = readNumber(input, "dailyKwh", { maximum: CALCULATION_LIMITS.energyKwh }, errors);
    return errors.length || dailyKwh === null || pricePerKwh === null
      ? failure(errors)
      : success({ method: "daily", dailyKwh, pricePerKwh });
  }

  if (input.method === "standby") {
    const watts = readNumber(input, "watts", { maximum: CALCULATION_LIMITS.watts }, errors);
    const hoursPerDay = readNumber(
      input,
      "hoursPerDay",
      { maximum: CALCULATION_LIMITS.hoursPerDay, maximumMessage: "Las horas al día no pueden superar 24." },
      errors,
    );
    const daysPerYear = readNumber(
      input,
      "daysPerYear",
      { maximum: CALCULATION_LIMITS.daysPerYear, maximumMessage: "Los días al año no pueden superar 366." },
      errors,
    );
    const deviceCount = readNumber(
      input,
      "deviceCount",
      { integer: true, maximum: CALCULATION_LIMITS.deviceCount },
      errors,
    );

    return errors.length || watts === null || hoursPerDay === null || daysPerYear === null || deviceCount === null || pricePerKwh === null
      ? failure(errors)
      : success({ method: "standby", watts, hoursPerDay, daysPerYear, deviceCount, pricePerKwh });
  }

  return failure([
    ...errors,
    { code: "out_of_range", field: "method", message: "Selecciona un método de cálculo válido." },
  ]);
}

function makePeriod(
  hour: number | null,
  use: number | null,
  day: number,
  month: number,
  year: number,
): PeriodBreakdown {
  return {
    hour: hour === null ? null : normalizeZero(hour),
    use: use === null ? null : normalizeZero(use),
    day: normalizeZero(day),
    month: normalizeZero(month),
    year: normalizeZero(year),
  };
}

function costPeriod(consumption: PeriodBreakdown, pricePerKwh: number) {
  return makePeriod(
    consumption.hour === null ? null : consumption.hour * pricePerKwh,
    consumption.use === null ? null : consumption.use * pricePerKwh,
    consumption.day * pricePerKwh,
    consumption.month * pricePerKwh,
    consumption.year * pricePerKwh,
  );
}

function hasNonFinite(period: PeriodBreakdown) {
  return Object.values(period).some((value) => value !== null && !Number.isFinite(value));
}

function calculationResult(
  method: CalculationMethod,
  consumption: PeriodBreakdown,
  pricePerKwh: number,
): DomainResult<CalculationResult> {
  const cost = costPeriod(consumption, pricePerKwh);
  if (hasNonFinite(consumption) || hasNonFinite(cost)) {
    return failure([
      { code: "too_large", field: "result", message: "El resultado es demasiado grande para calcularlo con seguridad." },
    ]);
  }
  return success({ method, consumption, cost });
}

export function calculateElectricity(input: unknown): DomainResult<CalculationResult> {
  const validated = validateCalculationInput(input);
  if (!validated.ok) return validated;

  const value = validated.value;
  if (value.method === "power") {
    const hour = wattsToKilowatts(value.watts);
    const day = hour * value.hoursPerDay;
    const month = day * value.daysPerMonth;
    return calculationResult(value.method, makePeriod(hour, null, day, month, month * MONTHS_PER_YEAR), value.pricePerKwh);
  }

  if (value.method === "cycle") {
    const month = value.cyclePeriod === "month"
      ? value.kwhPerCycle * value.cycles
      : (value.kwhPerCycle * value.cycles * WEEKS_PER_YEAR) / MONTHS_PER_YEAR;
    const year = month * MONTHS_PER_YEAR;
    return calculationResult(value.method, makePeriod(null, value.kwhPerCycle, year / DAYS_PER_YEAR, month, year), value.pricePerKwh);
  }

  if (value.method === "annual") {
    return calculationResult(
      value.method,
      makePeriod(null, null, value.annualKwh / DAYS_PER_YEAR, value.annualKwh / MONTHS_PER_YEAR, value.annualKwh),
      value.pricePerKwh,
    );
  }

  if (value.method === "daily") {
    const year = value.dailyKwh * DAYS_PER_YEAR;
    return calculationResult(value.method, makePeriod(null, null, value.dailyKwh, year / MONTHS_PER_YEAR, year), value.pricePerKwh);
  }

  const hour = wattsToKilowatts(value.watts) * value.deviceCount;
  const day = hour * value.hoursPerDay;
  const year = day * value.daysPerYear;
  return calculationResult(value.method, makePeriod(hour, null, day, year / MONTHS_PER_YEAR, year), value.pricePerKwh);
}

function scalePeriod(period: PeriodBreakdown, multiplier: number): PeriodBreakdown {
  return makePeriod(period.hour, period.use, period.day * multiplier, period.month * multiplier, period.year * multiplier);
}

function scaleCalculation(result: CalculationResult, multiplier: number): CalculationResult {
  return {
    method: result.method,
    consumption: scalePeriod(result.consumption, multiplier),
    cost: scalePeriod(result.cost, multiplier),
  };
}

export function calculateUsageScenarios(input: unknown): DomainResult<UsageScenarios> {
  const calculation = calculateElectricity(input);
  if (!calculation.ok) return calculation;
  return success({
    current: calculation.value,
    reduction25: scaleCalculation(calculation.value, 0.75),
    reduction50: scaleCalculation(calculation.value, 0.5),
  });
}

function differencePeriod(first: PeriodBreakdown, second: PeriodBreakdown): PeriodBreakdown {
  return makePeriod(
    first.hour === null || second.hour === null ? null : second.hour - first.hour,
    first.use === null || second.use === null ? null : second.use - first.use,
    second.day - first.day,
    second.month - first.month,
    second.year - first.year,
  );
}

function prefixErrors(errors: DomainIssue[], prefix: string) {
  return errors.map((issue) => ({ ...issue, field: `${prefix}.${issue.field}` }));
}

export function compareCalculations(firstInput: unknown, secondInput: unknown): DomainResult<CalculationComparison> {
  const first = calculateElectricity(firstInput);
  const second = calculateElectricity(secondInput);
  if (!first.ok || !second.ok) {
    return failure([
      ...(!first.ok ? prefixErrors(first.errors, "first") : []),
      ...(!second.ok ? prefixErrors(second.errors, "second") : []),
    ]);
  }
  return success({
    first: first.value,
    second: second.value,
    differenceSecondMinusFirst: {
      consumption: differencePeriod(first.value.consumption, second.value.consumption),
      cost: differencePeriod(first.value.cost, second.value.cost),
    },
    lowerCost:
      first.value.cost.year === second.value.cost.year
        ? "equal"
        : first.value.cost.year < second.value.cost.year
          ? "first"
          : "second",
  });
}

export function calculateEnergyLabel(input: unknown): DomainResult<EnergyLabelResult> {
  if (!isRecord(input)) {
    return failure([{ code: "empty", field: "input", message: "Faltan los datos de la etiqueta." }]);
  }

  let calculation: DomainResult<CalculationResult>;
  let kwhPerCycle: number | null = null;
  let costPerCycle: number | null = null;
  if (input.mode === "annual") {
    calculation = calculateElectricity({ method: "annual", annualKwh: input.annualKwh, pricePerKwh: input.pricePerKwh });
  } else if (input.mode === "cycles") {
    const labelErrors: DomainIssue[] = [];
    const labelValue = readNumber(input, "kwhPer100Cycles", { maximum: CALCULATION_LIMITS.energyKwh }, labelErrors);
    if (labelErrors.length || labelValue === null) return failure(labelErrors);
    kwhPerCycle = kwhPerCycleFromLabel(labelValue);
    calculation = calculateElectricity({
      method: "cycle",
      kwhPerCycle,
      cycles: input.cyclesPerMonth,
      cyclePeriod: "month",
      pricePerKwh: input.pricePerKwh,
    });
  } else {
    return failure([{ code: "out_of_range", field: "mode", message: "Selecciona un tipo de etiqueta válido." }]);
  }

  if (!calculation.ok) {
    return failure(calculation.errors.map((issue) => ({
      ...issue,
      field: issue.field === "cycles" ? "cyclesPerMonth" : issue.field,
    })));
  }

  if (kwhPerCycle !== null) {
    costPerCycle = costFromKwh(kwhPerCycle, typeof input.pricePerKwh === "number" ? input.pricePerKwh : 0);
  }
  return success({
    calculation: calculation.value,
    kwhPerCycle,
    costPerCycle,
    costFiveYears: normalizeZero(calculation.value.cost.year * 5),
    costTenYears: normalizeZero(calculation.value.cost.year * 10),
  });
}

function readProduct(value: unknown, prefix: "productA" | "productB", errors: DomainIssue[]) {
  if (!isRecord(value)) {
    errors.push({ code: "empty", field: prefix, message: "Faltan los datos del producto." });
    return null;
  }
  const localErrors: DomainIssue[] = [];
  const purchasePrice = readNumber(value, "purchasePrice", { maximum: CALCULATION_LIMITS.purchasePrice }, localErrors);
  const annualKwh = readNumber(value, "annualKwh", { maximum: CALCULATION_LIMITS.energyKwh }, localErrors);
  errors.push(...prefixErrors(localErrors, prefix));
  return purchasePrice === null || annualKwh === null ? null : { purchasePrice, annualKwh };
}

export function calculateOwnershipComparison(input: unknown): DomainResult<OwnershipComparisonResult> {
  if (!isRecord(input)) {
    return failure([{ code: "empty", field: "input", message: "Faltan los datos de la comparación." }]);
  }
  const errors: DomainIssue[] = [];
  const productA = readProduct(input.productA, "productA", errors);
  const productB = readProduct(input.productB, "productB", errors);
  const pricePerKwh = readNumber(input, "pricePerKwh", { maximum: CALCULATION_LIMITS.pricePerKwh }, errors);
  if (errors.length || !productA || !productB || pricePerKwh === null) return failure(errors);

  function productResult(product: OwnershipComparisonInput["productA"]): OwnershipProductResult {
    const annualEnergyCost = normalizeZero(product.annualKwh * pricePerKwh!);
    return {
      ...product,
      annualEnergyCost,
      totalCostOneYear: normalizeZero(product.purchasePrice + annualEnergyCost),
      totalCostFiveYears: normalizeZero(product.purchasePrice + annualEnergyCost * 5),
      totalCostTenYears: normalizeZero(product.purchasePrice + annualEnergyCost * 10),
    };
  }

  const resultA = productResult(productA);
  const resultB = productResult(productB);
  const purchaseDifferenceBMinusA = normalizeZero(resultB.purchasePrice - resultA.purchasePrice);
  const annualEnergySavingWithB = normalizeZero(resultA.annualEnergyCost - resultB.annualEnergyCost);
  let paybackStatus: OwnershipComparisonResult["paybackStatus"];
  let paybackYears: number | null = null;
  if (purchaseDifferenceBMinusA === 0 && annualEnergySavingWithB === 0) {
    paybackStatus = "equivalent";
  } else if (purchaseDifferenceBMinusA <= 0) {
    paybackStatus = "no_purchase_premium";
  } else if (annualEnergySavingWithB <= 0) {
    paybackStatus = "no_energy_saving";
  } else {
    const candidatePaybackYears =
      purchaseDifferenceBMinusA / annualEnergySavingWithB;
    if (!Number.isFinite(candidatePaybackYears)) {
      return failure([
        {
          code: "too_large",
          field: "productB.annualKwh",
          message:
            "La diferencia de consumo es demasiado pequeña para calcular un plazo finito.",
        },
      ]);
    }
    paybackStatus = "calculable";
    paybackYears = normalizeZero(candidatePaybackYears);
  }

  return success({ productA: resultA, productB: resultB, purchaseDifferenceBMinusA, annualEnergySavingWithB, paybackStatus, paybackYears });
}

export function calculateContractedPowerReview(input: unknown): DomainResult<ContractedPowerReviewResult> {
  if (!isRecord(input)) {
    return failure([{ code: "empty", field: "input", message: "Faltan los datos de potencia." }]);
  }
  const errors: DomainIssue[] = [];
  const currentPeakKw = readNumber(input, "currentPeakKw", { maximum: CALCULATION_LIMITS.contractedPowerKw }, errors);
  const currentValleyKw = readNumber(input, "currentValleyKw", { maximum: CALCULATION_LIMITS.contractedPowerKw }, errors);
  const demandPeakKw = readNumber(input, "demandPeakKw", { maximum: CALCULATION_LIMITS.contractedPowerKw }, errors);
  const demandValleyKw = readNumber(input, "demandValleyKw", { maximum: CALCULATION_LIMITS.contractedPowerKw }, errors);
  const marginPercentage = readNumber(
    input,
    "marginPercentage",
    { maximum: CALCULATION_LIMITS.marginPercentage, maximumMessage: "El margen debe estar entre 0 y 100 %." },
    errors,
  );
  if (errors.length || currentPeakKw === null || currentValleyKw === null || demandPeakKw === null || demandValleyKw === null || marginPercentage === null) {
    return failure(errors);
  }
  const multiplier = 1 + marginPercentage / 100;
  const referencePeakKw = roundUpToTenth(demandPeakKw * multiplier);
  const referenceValleyKw = roundUpToTenth(demandValleyKw * multiplier);
  if (!Number.isFinite(referencePeakKw) || !Number.isFinite(referenceValleyKw)) {
    return failure([{ code: "too_large", field: "result", message: "El resultado es demasiado grande para calcularlo con seguridad." }]);
  }
  return success({ currentPeakKw, currentValleyKw, demandPeakKw, demandValleyKw, marginPercentage, referencePeakKw, referenceValleyKw });
}

function roundUpToTenth(value: number) {
  const scaled = value * 10;
  const floatingPointTolerance =
    Number.EPSILON * Math.max(1, Math.abs(scaled)) * 4;
  return normalizeZero(
    Math.ceil(scaled - floatingPointTolerance) / 10,
  );
}

export function parseSpanishNumber(input: unknown): DomainResult<number> {
  if (input === "" || input === null || input === undefined) {
    return failure([{ code: "empty", field: "value", message: "Este campo es obligatorio." }]);
  }
  if (typeof input === "number") {
    return Number.isFinite(input)
      ? success(normalizeZero(input))
      : failure([{ code: "invalid", field: "value", message: "Introduce un número válido y finito." }]);
  }
  if (typeof input !== "string") {
    return failure([{ code: "invalid", field: "value", message: "Introduce un número válido." }]);
  }
  const raw = input.trim();
  if (!raw) {
    return failure([{ code: "empty", field: "value", message: "Este campo es obligatorio." }]);
  }
  if (/^[+-]?\d+\.\d{3}$/.test(raw)) {
    return failure([{
      code: "invalid",
      field: "value",
      message: "No uses separadores de miles: escribe 1500. Para tres decimales, usa coma.",
    }]);
  }
  if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)) {
    return failure([{ code: "invalid", field: "value", message: "Introduce un número válido." }]);
  }
  const value = Number(raw.replace(",", "."));
  return Number.isFinite(value)
    ? success(normalizeZero(value))
    : failure([{ code: "invalid", field: "value", message: "Introduce un número válido y finito." }]);
}

export function wattsToKilowatts(watts: number) {
  return normalizeZero(watts / 1_000);
}

export function kwhFromPower(watts: number, hours: number) {
  return normalizeZero(wattsToKilowatts(watts) * hours);
}

export function costFromKwh(kwh: number, pricePerKwh: number) {
  return normalizeZero(kwh * pricePerKwh);
}

export function kwhPerCycleFromLabel(kwhPer100Cycles: number) {
  return normalizeZero(kwhPer100Cycles / 100);
}

export function applyReduction(value: number, reductionPercentage: number) {
  return normalizeZero(value * (1 - reductionPercentage / 100));
}

export function roundForDisplay(value: number, fractionDigits = 2) {
  if (!Number.isFinite(value)) return 0;
  const safeDigits = Math.min(8, Math.max(0, Math.trunc(fractionDigits)));
  const factor = 10 ** safeDigits;
  const rounded = Math.sign(value) * (Math.round((Math.abs(value) + Number.EPSILON) * factor) / factor);
  return normalizeZero(rounded);
}

function formatNumber(value: number, options: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(ELECTRICITY_LOCALE, {
    useGrouping: "always",
    ...options,
  }).format(normalizedFinite(value));
}

export function formatWatts(value: number, maximumFractionDigits = 2) {
  return `${formatNumber(value, { maximumFractionDigits: Math.min(8, Math.max(0, maximumFractionDigits)) })} W`;
}

export function formatKwh(value: number, maximumFractionDigits = 3) {
  return `${formatNumber(value, { maximumFractionDigits: Math.min(8, Math.max(0, maximumFractionDigits)) })} kWh`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat(ELECTRICITY_LOCALE, {
    currency: ELECTRICITY_CURRENCY,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency",
    useGrouping: "always",
  }).format(normalizedFinite(value));
}

export function formatElectricityPrice(value: number) {
  return `${formatNumber(value, { maximumFractionDigits: 4, minimumFractionDigits: 2 })} €/kWh`;
}
