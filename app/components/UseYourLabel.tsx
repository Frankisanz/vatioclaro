type LabelMetric = "power" | "annual" | "cycles";

const metricCopy: Record<
  LabelMetric,
  { value: string; unit: string; help: string }
> = {
  power: {
    value: "1 500",
    unit: "W",
    help: "Busca potencia de entrada o input power, no potencia térmica ni capacidad.",
  },
  annual: {
    value: "—",
    unit: "kWh/año",
    help: "Copia el consumo anual declarado para tu modelo y divide solo al calcular medias.",
  },
  cycles: {
    value: "—",
    unit: "kWh/100 ciclos",
    help: "Respeta el programa y la unidad de la etiqueta; la calculadora divide entre 100.",
  },
};

export function UseYourLabel({ metric }: { metric: LabelMetric }) {
  const copy = metricCopy[metric];

  return (
    <aside className="use-your-label" aria-labelledby="use-your-label-title">
      <div className="use-your-label__mock" aria-hidden="true">
        <span>MODELO / MODEL</span>
        <b>ABC-123</b>
        <span>ENERGÍA / INPUT</span>
        <strong>
          {copy.value} <small>{copy.unit}</small>
        </strong>
      </div>
      <div>
        <div className="eyebrow">Usa la etiqueta de tu aparato</div>
        <h3 id="use-your-label-title">Dónde encontrar el dato real</h3>
        <p>{copy.help}</p>
        <p>
          Anota también marca, modelo y programa. La ilustración es genérica y
          no reproduce la etiqueta de ningún fabricante.
        </p>
      </div>
    </aside>
  );
}
