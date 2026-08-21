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

function toSafeId(value: string) {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug || "editorial";
}

export function EditorialComparisonTable({
  comparison,
}: {
  comparison: EditorialComparison;
}) {
  const comparisonId = `comparacion-${toSafeId(comparison.title)}`;
  const titleId = `${comparisonId}-titulo`;
  const scrollHintId = `${comparisonId}-desplazamiento`;

  return (
    <section aria-labelledby={titleId} className="editorial-comparison">
      <div className="eyebrow">Comparación directa</div>
      <h2 id={titleId}>{comparison.title}</h2>
      <p>{comparison.description}</p>
      <p className="visually-hidden" id={scrollHintId}>
        Desplaza horizontalmente para consultar todas las columnas de la tabla.
      </p>
      <div
        aria-describedby={scrollHintId}
        aria-labelledby={titleId}
        className="table-scroll"
        role="region"
        tabIndex={0}
      >
        <table className="comparison-table">
          <caption className="comparison-table__caption">
            {comparison.title}. Comparación entre {comparison.firstLabel} y{" "}
            {comparison.secondLabel}.
          </caption>
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
