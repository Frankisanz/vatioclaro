/**
 * Plantilla de las imágenes 1200 × 630 que se generan en la compilación.
 * Satori solo admite estilos en línea y exige `display: flex` en cada
 * contenedor con varios hijos.
 */
type ShareImageCardProps = {
  eyebrow: string;
  title: string;
  stats: { label: string; value: string }[];
  footer: string;
};

const INK = "#10312b";
const LIME = "#dff36b";
const CORAL = "#f2674f";

export function ShareImageCard({ eyebrow, title, stats, footer }: ShareImageCardProps) {
  return (
    <div
      style={{
        background: INK,
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "56px 64px",
        width: "100%",
      }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
        <div
          style={{
            background: LIME,
            borderRadius: 999,
            display: "flex",
            height: 28,
            width: 28,
          }}
        />
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>VatioClaro</div>
        <div
          style={{
            color: LIME,
            display: "flex",
            fontSize: 24,
            letterSpacing: 2,
            marginLeft: 24,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: title.length > 48 ? 54 : 64,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderTop: `6px solid ${LIME}`,
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 8,
              padding: "20px 24px",
            }}
          >
            <div style={{ color: "#cfe0da", display: "flex", fontSize: 22 }}>
              {stat.label}
            </div>
            <div style={{ display: "flex", fontSize: stat.value.length > 16 ? 28 : 40, fontWeight: 700 }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ alignItems: "center", color: "#cfe0da", display: "flex", fontSize: 22, gap: 12 }}>
        <div style={{ background: CORAL, borderRadius: 999, display: "flex", height: 12, width: 12 }} />
        <div style={{ display: "flex" }}>{footer}</div>
      </div>
    </div>
  );
}
