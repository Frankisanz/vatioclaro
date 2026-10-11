import {
  buildPriceSensitivity,
  formatCurrency,
  formatElectricityPrice,
  type CalculationInput,
} from "@/lib/electricity";

type PriceSensitivityTableProps = {
  calculation: CalculationInput;
  label: string;
  useLabel?: string;
};

/**
 * Recalcula el escenario visible de una guía con varios precios por kWh para
 * que el lector encuentre la fila más parecida a su factura sin tocar la
 * calculadora. El consumo es el mismo en todas las filas.
 */
export function PriceSensitivityTable({
  calculation,
  label,
  useLabel = "Por uso",
}: PriceSensitivityTableProps) {
  const rows = buildPriceSensitivity(calculation);
  const showHour = rows.every((row) => row.hour !== null);
  const showUse = !showHour && rows.every((row) => row.use !== null);

  return (
    <div
      aria-label={`Coste de ${label} según el precio por kWh`}
      className="table-scroll"
      role="region"
      tabIndex={0}
    >
      <table className="comparison-table">
        <caption className="comparison-table__caption">
          Mismo consumo del ejemplo con distintos precios por kWh
        </caption>
        <thead>
          <tr>
            <th scope="col">Precio por kWh</th>
            {showHour ? <th scope="col">Por hora</th> : null}
            {showUse ? <th scope="col">{useLabel}</th> : null}
            <th scope="col">Por día</th>
            <th scope="col">Por mes</th>
            <th scope="col">Por año</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.pricePerKwh}>
              <th scope="row">{formatElectricityPrice(row.pricePerKwh)}</th>
              {showHour ? <td>{formatCurrency(row.hour ?? 0)}</td> : null}
              {showUse ? <td>{formatCurrency(row.use ?? 0)}</td> : null}
              <td>{formatCurrency(row.day)}</td>
              <td>{formatCurrency(row.month)}</td>
              <td>{formatCurrency(row.year)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
