"use client";

import {
  calculateUsageScenarios,
  EXAMPLE_ELECTRICITY_PRICE,
  formatElectricityPrice,
  type CalculationInput,
  type CalculationMethod,
  type UsageScenarios,
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

type UniversalMethod = Exclude<CalculationMethod, "standby">;

export type SharedCalculationValues = {
  applianceName?: string;
  cyclePeriod?: string;
  cycles?: string;
  days?: string;
  hours?: string;
  kwhPerCycle?: string;
  kwhPerDay?: string;
  kwhPerYear?: string;
  method?: string;
  price?: string;
  watts?: string;
};

export type UniversalCalculatorProps = {
  initialInput?: CalculationInput;
  initialName?: string;
  initialValues?: SharedCalculationValues;
  lockedMethod?: boolean;
  shareable?: boolean;
};

type RawState = {
  annualKwh: string;
  cyclePeriod: "week" | "month";
  cycles: string;
  dailyKwh: string;
  daysPerMonth: string;
  hoursPerDay: string;
  kwhPerCycle: string;
  pricePerKwh: string;
  watts: string;
};

type ValidOutcome = {
  errors: FieldErrors;
  input: CalculationInput;
  scenarios: UsageScenarios;
};

type InvalidOutcome = {
  errors: FieldErrors;
  input: null;
  scenarios: null;
};

const methods: Array<{
  id: UniversalMethod;
  label: string;
  short: string;
}> = [
  { id: "power", label: "Potencia y tiempo", short: "W × horas" },
  { id: "cycle", label: "Consumo por ciclo", short: "kWh/ciclo" },
  { id: "annual", label: "Etiqueta anual", short: "kWh/año" },
  { id: "daily", label: "Consumo diario", short: "kWh/día" },
];

const queryMethodToDomain: Record<string, UniversalMethod> = {
  annual: "annual",
  anual: "annual",
  cycle: "cycle",
  ciclo: "cycle",
  daily: "daily",
  diario: "daily",
  power: "power",
  potencia: "power",
};

function safeMethod(value: string | undefined): UniversalMethod {
  return value ? (queryMethodToDomain[value] ?? "power") : "power";
}

function stringify(value: number | undefined) {
  return value === undefined ? "" : String(value);
}

function initialState(
  input: CalculationInput | undefined,
  shared: SharedCalculationValues | undefined,
): { method: UniversalMethod; raw: RawState } {
  const defaultPrice =
    shared?.price ?? stringify(input?.pricePerKwh) ?? String(EXAMPLE_ELECTRICITY_PRICE);
  const base: RawState = {
    annualKwh: shared?.kwhPerYear ?? "",
    cyclePeriod: shared?.cyclePeriod === "semana" || shared?.cyclePeriod === "week"
      ? "week"
      : "month",
    cycles: shared?.cycles ?? "",
    dailyKwh: shared?.kwhPerDay ?? "",
    daysPerMonth: shared?.days ?? "30",
    hoursPerDay: shared?.hours ?? "4",
    kwhPerCycle: shared?.kwhPerCycle ?? "",
    pricePerKwh: defaultPrice || String(EXAMPLE_ELECTRICITY_PRICE),
    watts: shared?.watts ?? "1000",
  };

  if (!input || input.method === "standby") {
    return { method: safeMethod(shared?.method), raw: base };
  }

  if (input.method === "power") {
    return {
      method: "power",
      raw: {
        ...base,
        watts: stringify(input.watts),
        hoursPerDay: stringify(input.hoursPerDay),
        daysPerMonth: stringify(input.daysPerMonth),
        pricePerKwh: stringify(input.pricePerKwh),
      },
    };
  }

  if (input.method === "cycle") {
    return {
      method: "cycle",
      raw: {
        ...base,
        kwhPerCycle: stringify(input.kwhPerCycle),
        cycles: stringify(input.cycles),
        cyclePeriod: input.cyclePeriod,
        pricePerKwh: stringify(input.pricePerKwh),
      },
    };
  }

  if (input.method === "annual") {
    return {
      method: "annual",
      raw: {
        ...base,
        annualKwh: stringify(input.annualKwh),
        pricePerKwh: stringify(input.pricePerKwh),
      },
    };
  }

  return {
    method: "daily",
    raw: {
      ...base,
      dailyKwh: stringify(input.dailyKwh),
      pricePerKwh: stringify(input.pricePerKwh),
    },
  };
}

function calculate(
  method: UniversalMethod,
  raw: RawState,
): ValidOutcome | InvalidOutcome {
  const common = { pricePerKwh: raw.pricePerKwh };
  const rawFields =
    method === "power"
      ? {
          ...common,
          watts: raw.watts,
          hoursPerDay: raw.hoursPerDay,
          daysPerMonth: raw.daysPerMonth,
        }
      : method === "cycle"
        ? {
            ...common,
            kwhPerCycle: raw.kwhPerCycle,
            cycles: raw.cycles,
          }
        : method === "annual"
          ? { ...common, annualKwh: raw.annualKwh }
          : { ...common, dailyKwh: raw.dailyKwh };
  const parsed = parseFields(rawFields);
  if (!parsed.ok) {
    return { errors: parsed.errors, input: null, scenarios: null };
  }

  const values = parsed.values;
  const input: CalculationInput =
    method === "power"
      ? {
          method,
          watts: values.watts,
          hoursPerDay: values.hoursPerDay,
          daysPerMonth: values.daysPerMonth,
          pricePerKwh: values.pricePerKwh,
        }
      : method === "cycle"
        ? {
            method,
            kwhPerCycle: values.kwhPerCycle,
            cycles: values.cycles,
            cyclePeriod: raw.cyclePeriod,
            pricePerKwh: values.pricePerKwh,
          }
        : method === "annual"
          ? {
              method,
              annualKwh: values.annualKwh,
              pricePerKwh: values.pricePerKwh,
            }
          : {
              method,
              dailyKwh: values.dailyKwh,
              pricePerKwh: values.pricePerKwh,
            };
  const result = calculateUsageScenarios(input);

  return result.ok
    ? { errors: {}, input, scenarios: result.value }
    : {
        errors: issuesToFieldErrors(result.errors),
        input: null,
        scenarios: null,
      };
}

function queryMethod(method: UniversalMethod) {
  return {
    power: "potencia",
    cycle: "ciclo",
    annual: "anual",
    daily: "diario",
  }[method];
}

export function UniversalCalculator({
  initialInput,
  initialName,
  initialValues,
  lockedMethod = false,
  shareable = true,
}: UniversalCalculatorProps) {
  const [first] = useState(() => initialState(initialInput, initialValues));
  const [method, setMethod] = useState<UniversalMethod>(first.method);
  const [raw, setRaw] = useState<RawState>(first.raw);
  const [interacted, setInteracted] = useState(
    () =>
      Boolean(initialValues) &&
      Object.values(initialValues ?? {}).some((value) => Boolean(value)),
  );
  const [shareStatus, setShareStatus] = useState("");
  const prefix = useFieldPrefix("universal-calculator");
  const {
    complete: trackComplete,
    method: trackMethod,
    start: trackStart,
  } = useCalculatorTracking("calculator", "universal");
  const outcome = useMemo(() => calculate(method, raw), [method, raw]);

  useEffect(() => {
    if (interacted && outcome.scenarios) trackComplete();
  }, [interacted, outcome.scenarios, trackComplete]);

  function changeField(field: keyof RawState, value: string) {
    setRaw((current) => ({ ...current, [field]: value }));
    setInteracted(true);
    setShareStatus("");
    trackStart(method);
  }

  function selectMethod(nextMethod: UniversalMethod) {
    if (nextMethod === method) return;
    setMethod(nextMethod);
    setInteracted(true);
    setShareStatus("");
    trackMethod(nextMethod);
  }

  async function shareCalculation() {
    if (!outcome.input) return;

    const params = new URLSearchParams({
      metodo: queryMethod(method),
      precio: String(outcome.input.pricePerKwh),
    });
    if (outcome.input.method === "power") {
      params.set("watts", String(outcome.input.watts));
      params.set("horas", String(outcome.input.hoursPerDay));
      params.set("dias", String(outcome.input.daysPerMonth));
    } else if (outcome.input.method === "cycle") {
      params.set("kwh_ciclo", String(outcome.input.kwhPerCycle));
      params.set("ciclos", String(outcome.input.cycles));
      params.set(
        "periodo",
        outcome.input.cyclePeriod === "week" ? "semana" : "mes",
      );
    } else if (outcome.input.method === "annual") {
      params.set("kwh_anio", String(outcome.input.annualKwh));
    } else if (outcome.input.method === "daily") {
      params.set("kwh_dia", String(outcome.input.dailyKwh));
    }
    if (initialName) params.set("aparato", initialName.slice(0, 80));

    const relativeUrl = "/calculadora?" + params.toString();
    window.history.replaceState(null, "", relativeUrl);
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("Enlace copiado. La página compartida no se indexará.");
    } catch {
      setShareStatus(
        "Enlace preparado en la barra del navegador para que puedas copiarlo.",
      );
    }
  }

  const errors = interacted ? outcome.errors : {};
  const title =
    method === "cycle"
      ? "CALCULADORA POR CICLO"
      : method === "annual"
        ? "CALCULADORA POR CONSUMO ANUAL"
        : method === "daily"
          ? "CALCULADORA POR CONSUMO DIARIO"
          : "CALCULADORA POR POTENCIA";

  return (
    <div className="universal-calculator">
      <div className="energy-calculator universal-calculator__form">
        <div>
          <div className="calculator-context">
            <span>{title}</span>
            <p>
              {initialName
                ? "Valores de ejemplo para " + initialName.toLocaleLowerCase("es-ES") +
                  ". Sustitúyelos por los de tu etiqueta, manual o medición."
                : initialValues?.applianceName
                  ? "Prepara el cálculo de " + initialValues.applianceName +
                    " con sus datos reales."
                  : "Ejemplo educativo editable. El precio inicial es " +
                    formatElectricityPrice(EXAMPLE_ELECTRICITY_PRICE) +
                    " y no representa un precio oficial de España."}
            </p>
          </div>

          {!lockedMethod ? (
            <div
              aria-label="Método de cálculo"
              className="calculator-methods"
              role="group"
            >
              {methods.map((item) => (
                <button
                  aria-controls={prefix + "-fields"}
                  aria-pressed={method === item.id}
                  className={
                    "calculator-method" +
                    (method === item.id ? " calculator-method--active" : "")
                  }
                  key={item.id}
                  onClick={() => selectMethod(item.id)}
                  type="button"
                >
                  <strong>{item.label}</strong>
                  <span>{item.short}</span>
                </button>
              ))}
            </div>
          ) : null}

          <div className="calculator-fields" id={prefix + "-fields"}>
            {method === "power" ? (
              <>
                <DecimalField
                  error={errors.watts}
                  id={prefix + "-watts"}
                  label="Potencia eléctrica"
                  onChange={(value) => changeField("watts", value)}
                  unit="W"
                  value={raw.watts}
                />
                <DecimalField
                  error={errors.hoursPerDay}
                  id={prefix + "-hours"}
                  label="Horas de uso al día"
                  onChange={(value) => changeField("hoursPerDay", value)}
                  unit="h/día"
                  value={raw.hoursPerDay}
                />
                <DecimalField
                  error={errors.daysPerMonth}
                  id={prefix + "-days"}
                  inputMode="numeric"
                  label="Días de uso al mes"
                  onChange={(value) => changeField("daysPerMonth", value)}
                  unit="días"
                  value={raw.daysPerMonth}
                />
              </>
            ) : null}

            {method === "cycle" ? (
              <>
                <DecimalField
                  error={errors.kwhPerCycle}
                  help="Si la etiqueta indica kWh/100 ciclos, divide ese dato entre 100."
                  id={prefix + "-cycle-kwh"}
                  label="Consumo por ciclo"
                  onChange={(value) => changeField("kwhPerCycle", value)}
                  unit="kWh/ciclo"
                  value={raw.kwhPerCycle}
                />
                <DecimalField
                  error={errors.cycles}
                  id={prefix + "-cycles"}
                  label={
                    raw.cyclePeriod === "week"
                      ? "Ciclos por semana"
                      : "Ciclos al mes"
                  }
                  onChange={(value) => changeField("cycles", value)}
                  unit="ciclos"
                  value={raw.cycles}
                />
                <fieldset className="calculator-inline-options">
                  <legend>Periodo de los ciclos</legend>
                  <label>
                    <input
                      checked={raw.cyclePeriod === "week"}
                      name={prefix + "-period"}
                      onChange={() => changeField("cyclePeriod", "week")}
                      type="radio"
                    />
                    Semana
                  </label>
                  <label>
                    <input
                      checked={raw.cyclePeriod === "month"}
                      name={prefix + "-period"}
                      onChange={() => changeField("cyclePeriod", "month")}
                      type="radio"
                    />
                    Mes
                  </label>
                </fieldset>
              </>
            ) : null}

            {method === "annual" ? (
              <DecimalField
                error={errors.annualKwh}
                help="Copia los kWh/año declarados para tu modelo."
                id={prefix + "-annual"}
                label="Consumo de la etiqueta"
                onChange={(value) => changeField("annualKwh", value)}
                unit="kWh/año"
                value={raw.annualKwh}
              />
            ) : null}

            {method === "daily" ? (
              <DecimalField
                error={errors.dailyKwh}
                id={prefix + "-daily"}
                label="Consumo medido cada día"
                onChange={(value) => changeField("dailyKwh", value)}
                unit="kWh/día"
                value={raw.dailyKwh}
              />
            ) : null}

            <DecimalField
              error={errors.pricePerKwh}
              help="Usa el coste variable total por kWh que quieras analizar."
              id={prefix + "-price"}
              label="Precio de la energía"
              onChange={(value) => changeField("pricePerKwh", value)}
              unit="€/kWh"
              value={raw.pricePerKwh}
            />
          </div>

          <p className="calculator-note">
            Acepta coma o punto decimal. No incluye potencia contratada, alquiler
            de contador ni otros cargos que no dependan de los kWh de este uso.
          </p>
          {shareable && outcome.input ? (
            <div className="calculator-share">
              <button
                className="button button--light"
                onClick={shareCalculation}
                type="button"
              >
                Copiar enlace del cálculo
              </button>
              <span aria-live="polite">{shareStatus}</span>
            </div>
          ) : null}
        </div>

        {outcome.scenarios ? (
          <CalculationResultPanel
            result={outcome.scenarios.current}
            scenarios={outcome.scenarios}
          />
        ) : (
          <EmptyResult>
            Revisa los campos señalados. La herramienta no mostrará valores
            incompletos, infinitos ni fuera de sus límites.
          </EmptyResult>
        )}
      </div>
    </div>
  );
}
