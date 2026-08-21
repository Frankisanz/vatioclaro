import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Appliance } from "@/lib/appliances";

type ApplianceCardProps = {
  item: Appliance;
  index: number;
};

export function ApplianceCard({ item, index }: ApplianceCardProps) {
  return (
    <Link
      className={`guide-card guide-card--${(index % 3) + 1}`}
      href={`/consumo/${item.slug}`}
      prefetch={false}
    >
      <div className="guide-card__number">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <span className="guide-card__category">{item.category}</span>
        <h3>¿Cuánto consume {item.articleName}?</h3>
        <p>{item.shortDescription}</p>
      </div>
      <div className="guide-card__footer">
        <span>
          {item.exampleCost.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {" € / mes"}
        </span>
        <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
      </div>
    </Link>
  );
}
