type ComparisonChartItem = {
  label: string;
  value: number;
  note: string;
};

type ComparisonChartProps = {
  description: string;
  items: ComparisonChartItem[];
  title: string;
  unit: string;
};

export function ComparisonChart({
  description,
  items,
  title,
  unit,
}: ComparisonChartProps) {
  const maximum = Math.max(...items.map((item) => item.value), 1);

  return (
    <figure className="calculation-chart">
      <figcaption>
        <strong>{title}</strong>
        <span>{description}</span>
      </figcaption>
      <div className="calculation-chart__plot">
        {items.map((item) => (
          <div className="calculation-chart__row" key={item.label}>
            <div className="calculation-chart__label">
              <span>{item.label}</span>
              <b>
                {item.value.toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                })} {unit}
              </b>
            </div>
            <div className="calculation-chart__track" aria-hidden="true">
              <span style={{ width: `${(item.value / maximum) * 100}%` }} />
            </div>
            <small>{item.note}</small>
          </div>
        ))}
      </div>
    </figure>
  );
}
