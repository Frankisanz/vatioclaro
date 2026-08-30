"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  UniversalCalculator,
  type SharedCalculationValues,
} from "../components/UniversalCalculator";

function firstSafeValue(
  params: URLSearchParams,
  name: string,
  maxLength = 32,
) {
  return params.get(name)?.slice(0, maxLength);
}

function useSharedCalculationNoindex(isSharedCalculation: boolean) {
  useEffect(() => {
    if (!isSharedCalculation) return;

    const existing = document.head.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const previousContent = existing?.content;
    const robots = existing ?? document.createElement("meta");

    if (!existing) {
      robots.name = "robots";
      robots.dataset.vatioclaroSharedCalculation = "true";
      document.head.append(robots);
    }

    robots.content = "noindex, follow";

    return () => {
      if (!existing) {
        robots.remove();
      } else if (previousContent !== undefined) {
        robots.content = previousContent;
      }
    };
  }, [isSharedCalculation]);
}

export function CalculatorFromUrl() {
  const searchParams = useSearchParams();
  const serializedParams = searchParams.toString();
  const initialValues = useMemo<SharedCalculationValues>(() => {
    const params = new URLSearchParams(serializedParams);

    return {
      method: firstSafeValue(params, "metodo"),
      watts: firstSafeValue(params, "watts"),
      hours: firstSafeValue(params, "horas"),
      days: firstSafeValue(params, "dias"),
      price: firstSafeValue(params, "precio"),
      kwhPerCycle: firstSafeValue(params, "kwh_ciclo"),
      cycles: firstSafeValue(params, "ciclos"),
      cyclePeriod: firstSafeValue(params, "periodo"),
      kwhPerYear: firstSafeValue(params, "kwh_anio"),
      kwhPerDay: firstSafeValue(params, "kwh_dia"),
      applianceName: firstSafeValue(params, "aparato", 80),
    };
  }, [serializedParams]);

  useSharedCalculationNoindex(serializedParams.length > 0);

  return <UniversalCalculator initialValues={initialValues} />;
}
