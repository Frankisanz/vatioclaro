"use client";

import { track } from "@vercel/analytics";
import {
  formatCurrency,
  formatKwh,
  parseSpanishNumber,
  type CalculationResult,
  type DomainIssue,
  type UsageScenarios,
} from "@/lib/electricity";
import {
  useCallback,
  useId,
  useRef,
  type ChangeEvent,
  type ReactNode,
} from "react";

export type FieldErrors = Record<string, string>;

type DecimalFieldProps = {
  error?: string;
  help?: string;
  id: string;
  inputMode?: "decimal" | "numeric";
  label: string;
  onChange: (value: string) => void;
  unit: string;
  value: string;
};

export function DecimalField({
  error,
  help,
  id,
  inputMode = "decimal",
  label,
  onChange,
  unit,
  value,
}: DecimalFieldProps) {
  const descriptionIds = [
    id + "-unit",
    help ? id + "-help" : null,
    error ? id + "-error" : null,
  ]
    .filter(Boolean)
    .join(" ");

  function change(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className={"input-wrap" + (error ? " input-wrap--error" : "")}>
        <input
          aria-describedby={descriptionIds || undefined}
          aria-invalid={Boolean(error)}
          autoComplete="off"
          id={id}
          inputMode={inputMode}
          maxLength={24}
          onChange={change}
          spellCheck={false}
          type="text"
          value={value}
        />
        <span id={id + "-unit"}>{unit}</span>
      </div>
      {help ? (
        <small className="field-help" id={id + "-help"}>
          {help}
        </small>
      ) : null}
      {error ? (
        <small className="field-error" id={id + "-error"} role="alert">
          {error}
        </small>
      ) : null}
    </div>
  );
}

export function useFieldPrefix(name: string) {
  const reactId = useId().replace(/:/g, "");
  return name + "-" + reactId;
}

export function parseFields(
  rawValues: Record<string, string>,
): { ok: true; values: Record<string, number> } | { ok: false; errors: FieldErrors } {
  const values: Record<string, number> = {};
  const errors: FieldErrors = {};

  for (const [field, rawValue] of Object.entries(rawValues)) {
    const parsed = parseSpanishNumber(rawValue);
    if (parsed.ok) {
      values[field] = parsed.value;
    } else {
      errors[field] = parsed.errors[0]?.message ?? "Introduce un valor válido.";
    }
  }

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, values };
}

export function issuesToFieldErrors(
  issues: DomainIssue[],
  aliases: Record<string, string> = {},
) {
  return issues.reduce<FieldErrors>((errors, issue) => {
    const field = aliases[issue.field] ?? issue.field;
    errors[field] ??= issue.message;
    return errors;
  }, {});
}

export function useCalculatorTracking(
  scope: "calculator" | "comparison",
  tool: string,
) {
  const started = useRef(false);
  const completed = useRef(false);
  const activeMethod = useRef<string | null>(null);

  const start = useCallback((methodName?: string) => {
    if (methodName) activeMethod.current = methodName;
    if (started.current) return;
    started.current = true;
    track(scope === "comparison" ? "comparison_start" : "calculator_start", {
      tool,
      ...(methodName ? { method: methodName } : {}),
    });
  }, [scope, tool]);

  const complete = useCallback(() => {
    if (!started.current || completed.current) return;
    completed.current = true;
    track(
      scope === "comparison" ? "comparison_complete" : "calculator_complete",
      {
        tool,
        ...(activeMethod.current ? { method: activeMethod.current } : {}),
      },
    );
  }, [scope, tool]);

  const method = useCallback(
    (nextMethod: string) => {
      start(nextMethod);
      completed.current = false;
      track("calculator_method", { method: nextMethod });
    },
    [start],
  );

  return { complete, method, start };
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <small>{label}</small>
      <b>{value}</b>
    </div>
  );
}

export function CalculationResultPanel({
  result,
  scenarios,
}: {
  result: CalculationResult;
  scenarios?: UsageScenarios;
}) {
  const isAverageDay = result.method === "annual" || result.method === "cycle";
  const dayLabel = isAverageDay ? "Media diaria" : "Por día";

  return (
    <div className="calculator-output" aria-live="polite">
      <div className="calculator-result">
        <span className="calculator-result__label">
          COSTE ESTIMADO AL MES
        </span>
        <strong className="calculator-result__amount">
          {formatCurrency(result.cost.month)}
        </strong>
        <div className="calculator-result__meta">
          <Metric label="CONSUMO AL MES" value={formatKwh(result.consumption.month)} />
          <Metric
            label={isAverageDay ? "COSTE MEDIO AL DÍA" : "COSTE POR DÍA"}
            value={formatCurrency(result.cost.day)}
          />
          <Metric label="COSTE ANUAL" value={formatCurrency(result.cost.year)} />
        </div>
      </div>

      <div className="result-periods" aria-label="Desglose del resultado">
        <div>
          <h3>Consumo estimado</h3>
          <dl>
            {result.consumption.hour !== null ? (
              <>
                <dt>Por hora</dt>
                <dd>{formatKwh(result.consumption.hour)}</dd>
              </>
            ) : null}
            {result.consumption.use !== null ? (
              <>
                <dt>Por uso o ciclo</dt>
                <dd>{formatKwh(result.consumption.use)}</dd>
              </>
            ) : null}
            <dt>{dayLabel}</dt>
            <dd>{formatKwh(result.consumption.day)}</dd>
            <dt>Por mes</dt>
            <dd>{formatKwh(result.consumption.month)}</dd>
            <dt>Por año</dt>
            <dd>{formatKwh(result.consumption.year)}</dd>
          </dl>
        </div>
        <div>
          <h3>Coste estimado</h3>
          <dl>
            {result.cost.hour !== null ? (
              <>
                <dt>Por hora</dt>
                <dd>{formatCurrency(result.cost.hour)}</dd>
              </>
            ) : null}
            {result.cost.use !== null ? (
              <>
                <dt>Por uso o ciclo</dt>
                <dd>{formatCurrency(result.cost.use)}</dd>
              </>
            ) : null}
            <dt>{dayLabel}</dt>
            <dd>{formatCurrency(result.cost.day)}</dd>
            <dt>Por mes</dt>
            <dd>{formatCurrency(result.cost.month)}</dd>
            <dt>Por año</dt>
            <dd>{formatCurrency(result.cost.year)}</dd>
          </dl>
        </div>
      </div>

      {scenarios ? (
        <section aria-labelledby="usage-scenarios-title" className="usage-scenarios">
          <div>
            <span className="calculator-kicker">Escenarios de uso</span>
            <h3 id="usage-scenarios-title">Qué cambia al reducir el uso</h3>
          </div>
          <div className="usage-scenarios__grid">
            {[
              ["Uso actual", scenarios.current, "100%"],
              ["Uso −25 %", scenarios.reduction25, "75%"],
              ["Uso −50 %", scenarios.reduction50, "50%"],
            ].map(([label, scenario, width]) => {
              const typedScenario = scenario as CalculationResult;
              return (
                <div key={label as string}>
                  <span>{label as string}</span>
                  <strong>{formatCurrency(typedScenario.cost.month)}/mes</strong>
                  <small>{formatCurrency(typedScenario.cost.year)}/año</small>
                  <i aria-hidden="true" style={{ width: width as string }} />
                </div>
              );
            })}
          </div>
          <p>
            Proyección proporcional sobre el uso introducido. No presupone que
            puedas reducirlo ni que el equipo mantenga el mismo comportamiento.
          </p>
        </section>
      ) : null}
    </div>
  );
}

export function EmptyResult({ children }: { children: ReactNode }) {
  return (
    <div className="calculator-result calculator-result--empty" aria-live="polite">
      <span className="calculator-result__label">RESULTADO PENDIENTE</span>
      <strong>Completa los datos</strong>
      <p>{children}</p>
    </div>
  );
}
