export type EditorialComparison = {
  title: string;
  description: string;
  firstLabel: string;
  secondLabel: string;
  rows: {
    criterion: string;
    first: string;
    second: string;
  }[];
};

export function EditorialComparisonTable({
  comparison,
}: {
  comparison: EditorialComparison;
}) {
  return (
    <section aria-labelledby="comparison-title" className="editorial-comparison">
      <div className="eyebrow">Comparación directa</div>
      <h2 id="comparison-title">{comparison.title}</h2>
      <p>{comparison.description}</p>
      <div className="table-scroll">
        <table className="comparison-table">
          <thead>
            <tr>
              <th scope="col">Criterio</th>
              <th scope="col">{comparison.firstLabel}</th>
              <th scope="col">{comparison.secondLabel}</th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.criterion}>
                <th scope="row">{row.criterion}</th>
                <td>{row.first}</td>
                <td>{row.second}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
