import { UniversalCalculator } from "./UniversalCalculator";
import { EXAMPLE_ELECTRICITY_PRICE } from "@/lib/electricity";

type CalculatorProps = {
  initialDays?: number;
  initialHours?: number;
  initialName?: string;
  initialPrice?: number;
  initialWatts?: number;
};

export function EnergyCalculator({
  initialDays = 30,
  initialHours = 4,
  initialName = "Aire acondicionado",
  initialPrice = EXAMPLE_ELECTRICITY_PRICE,
  initialWatts = 1000,
}: CalculatorProps) {
  return (
    <UniversalCalculator
      initialInput={{
        method: "power",
        watts: initialWatts,
        hoursPerDay: initialHours,
        daysPerMonth: initialDays,
        pricePerKwh: initialPrice,
      }}
      initialName={initialName}
      lockedMethod
      shareable={false}
    />
  );
}
