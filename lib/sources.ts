export type ReferenceKind =
  | "regulation"
  | "official-guidance"
  | "official-statistics"
  | "manufacturer"
  | "educational-example";

export type SourceReference = {
  id: string;
  title: string;
  url: string;
  kind: ReferenceKind;
  scope: string;
  publishedAt?: string;
  effectiveFrom?: string;
  accessedAt: string;
};

const ACCESSED_AT = "2026-08-17";

export const SOURCE_CATALOG = {
  euAirConditioners: {
    id: "eu-air-conditioners-comfort-fans",
    title: "Comisión Europea — Acondicionadores de aire y ventiladores",
    url: "https://energy-efficient-products.ec.europa.eu/product-list/air-conditioners-and-comfort-fans_en",
    kind: "official-guidance",
    scope:
      "Etiqueta, potencia eléctrica de entrada, SEER, SCOP y consumo anual declarado de equipos de climatización.",
    accessedAt: ACCESSED_AT,
  },
  euDishwashers: {
    id: "eu-dishwashers",
    title: "Comisión Europea — Etiqueta energética de lavavajillas",
    url: "https://energy-efficient-products.ec.europa.eu/product-list/dishwashers_en",
    kind: "official-guidance",
    scope: "Unidad de etiqueta en kWh por 100 ciclos del programa eco.",
    accessedAt: ACCESSED_AT,
  },
  euDisplays: {
    id: "eu-electronic-displays",
    title: "Comisión Europea — Etiqueta energética de pantallas",
    url: "https://energy-efficient-products.ec.europa.eu/product-list/electronic-displays_en",
    kind: "official-guidance",
    scope: "Información de etiqueta energética de televisores y pantallas.",
    accessedAt: ACCESSED_AT,
  },
  euDomesticOvens: {
    id: "eu-domestic-ovens",
    title: "Comisión Europea — Hornos domésticos y etiqueta energética",
    url: "https://energy-efficient-products.ec.europa.eu/product-list/domestic-ovens_en",
    kind: "official-guidance",
    scope: "Información de ecodiseño y etiqueta energética de hornos domésticos.",
    accessedAt: ACCESSED_AT,
  },
  euFridges: {
    id: "eu-fridges-freezers",
    title: "Comisión Europea — Etiqueta de frigoríficos y congeladores",
    url: "https://energy-efficient-products.ec.europa.eu/product-list/fridges-and-freezers_en",
    kind: "official-guidance",
    scope: "Consumo anual en kWh mostrado en la etiqueta energética.",
    accessedAt: ACCESSED_AT,
  },
  euLocalSpaceHeaters: {
    id: "eu-local-space-heaters",
    title: "Comisión Europea — Calefactores locales",
    url: "https://energy-efficient-products.ec.europa.eu/product-list/local-space-heaters_en",
    kind: "official-guidance",
    scope: "Marco de ecodiseño y etiqueta aplicable a calefactores locales.",
    accessedAt: ACCESSED_AT,
  },
  euTumbleDryers: {
    id: "eu-tumble-dryers",
    title: "Comisión Europea — Nueva etiqueta energética de secadoras",
    url: "https://energy-efficient-products.ec.europa.eu/product-list/tumble-dryers_en",
    kind: "official-guidance",
    scope:
      "Etiqueta A–G vigente desde el 1 de julio de 2025 y consumo ponderado en kWh por 100 ciclos.",
    effectiveFrom: "2025-07-01",
    accessedAt: ACCESSED_AT,
  },
  euWashingMachines: {
    id: "eu-washing-machines",
    title: "Comisión Europea — Etiqueta energética de lavadoras",
    url: "https://energy-efficient-products.ec.europa.eu/product-list/washing-machines_en",
    kind: "official-guidance",
    scope: "Unidad de etiqueta en kWh por 100 ciclos del programa Eco 40-60.",
    accessedAt: ACCESSED_AT,
  },
  eurLexStandby: {
    id: "eu-regulation-2023-826-standby",
    title: "EUR-Lex — Reglamento (UE) 2023/826 sobre modos de bajo consumo",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R0826",
    kind: "regulation",
    scope: "Definiciones y requisitos de apagado, espera y espera en red.",
    publishedAt: "2023-04-17",
    accessedAt: ACCESSED_AT,
  },
  idaeEnergyGuide: {
    id: "idae-practical-energy-guide",
    title: "IDAE — Guía práctica de la energía",
    url: "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
    kind: "official-guidance",
    scope: "Contexto general de uso eficiente y responsable de energía doméstica.",
    accessedAt: ACCESSED_AT,
  },
  idaeHeatPumps: {
    id: "idae-heat-pump-guide-2023",
    title: "IDAE — Guía de la bomba de calor (2023)",
    url: "https://www.idae.es/sites/default/files/documentos/publicaciones_idae/Guias_IDAE_La_Bomba_de_calor_2023_V11.pdf",
    kind: "official-guidance",
    scope: "Funcionamiento, COP y rendimiento estacional de bombas de calor.",
    publishedAt: "2023",
    accessedAt: ACCESSED_AT,
  },
  idaeSpahousec: {
    id: "idae-spahousec-iii-2026",
    title: "IDAE — SPAHOUSEC III (2026)",
    url: "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
    kind: "official-statistics",
    scope:
      "Metodología y contexto del consumo residencial español; no acredita por sí solo rangos de potencia de modelos concretos.",
    publishedAt: "2026-01-23",
    accessedAt: ACCESSED_AT,
  },
} as const satisfies Record<string, SourceReference>;

function validateSourceCatalog() {
  const ids = new Set<string>();

  for (const source of Object.values(SOURCE_CATALOG)) {
    if (ids.has(source.id)) {
      throw new Error(`Identificador de fuente duplicado: ${source.id}`);
    }

    ids.add(source.id);

    const url = new URL(source.url);
    if (url.protocol !== "https:") {
      throw new Error(`La fuente ${source.id} debe usar HTTPS`);
    }

    if (!/^\d{4}(?:-\d{2}-\d{2})?$/.test(source.accessedAt)) {
      throw new Error(`Fecha de consulta inválida en ${source.id}`);
    }

    if (
      "publishedAt" in source &&
      source.publishedAt &&
      !/^\d{4}(?:-\d{2}-\d{2})?$/.test(source.publishedAt)
    ) {
      throw new Error(`Fecha de publicación inválida en ${source.id}`);
    }

    if (
      "effectiveFrom" in source &&
      source.effectiveFrom &&
      !/^\d{4}(?:-\d{2}-\d{2})?$/.test(source.effectiveFrom)
    ) {
      throw new Error(`Fecha de vigencia inválida en ${source.id}`);
    }
  }
}

validateSourceCatalog();

export function getSource(id: keyof typeof SOURCE_CATALOG): SourceReference {
  return SOURCE_CATALOG[id];
}
