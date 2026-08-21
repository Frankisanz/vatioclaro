import { UniversalCalculator } from "./UniversalCalculator";
import { EXAMPLE_ELECTRICITY_PRICE } from "@/lib/electricity";

type CycleCalculatorProps = {
  initialCycles: number;
  initialKwhPerCycle: number;
  initialName: string;
  initialPrice?: number;
};

export function CycleCalculator({
  initialCycles,
  initialKwhPerCycle,
  initialName,
  initialPrice = EXAMPLE_ELECTRICITY_PRICE,
}: CycleCalculatorProps) {
  return (
    <UniversalCalculator
      initialInput={{
        method: "cycle",
        kwhPerCycle: initialKwhPerCycle,
        cycles: initialCycles,
        cyclePeriod: "month",
        pricePerKwh: initialPrice,
      }}
      initialName={initialName}
      lockedMethod
      shareable={false}
    />
  );
}
