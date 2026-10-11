import { getApplianceFaqs } from "./appliance-faqs";
import { CONTENT_UPDATED_AT } from "./site";
import {
  calculateElectricity,
  EXAMPLE_ELECTRICITY_PRICE,
  type CalculationInput,
} from "./electricity";
import {
  SOURCE_CATALOG,
  type SourceReference,
} from "./sources";

/** @deprecated Usa EXAMPLE_ELECTRICITY_PRICE desde lib/electricity. */
export const DEFAULT_ELECTRICITY_PRICE = EXAMPLE_ELECTRICITY_PRICE;

export type ApplianceSeed = {
  slug: string;
  indexable: boolean;
  name: string;
  articleName: string;
  seoTitle?: string;
  category: string;
  calculation: CalculationInput;
  labelKwhPer100Cycles?: number;
  shortDescription: string;
  intro: string;
  range: string;
  caveat: string;
  tips: string[];
  factors: { title: string; text: string }[];
  sourceTitle: string;
  sourceUrl: string;
  updatedAt?: string;
  measurement?: string;
  /** Explicación propia del cálculo por ciclo cuando el ciclo no es un programa de etiqueta. */
  cycleNote?: string;
  /** false oculta la ayuda para leer la etiqueta energética cuando el aparato no la tiene. */
  showLabelGuide?: boolean;
};

export type Appliance = ApplianceSeed & {
  assumptionRationale: string;
  exampleCost: number;
  exampleKind: "educational-example" | "official-statistic";
  reviewedAt: string;
  sources: SourceReference[];
};

export function getApplianceMonthlyKwh(item: Appliance) {
  const result = calculateElectricity(item.calculation);

  if (!result.ok) {
    throw new Error(
      `Configuración de cálculo inválida para ${item.slug}: ${result.errors
        .map((entry) => `${entry.field}: ${entry.message}`)
        .join(", ")}`,
    );
  }

  return result.value.consumption.month;
}

export function getApplianceUpdatedAt(item: Appliance) {
  return item.updatedAt ?? CONTENT_UPDATED_AT;
}

const relatedApplianceSlugs: Record<string, string[]> = {
  "aire-acondicionado": [
    "aire-acondicionado-portatil",
    "ventilador",
    "deshumidificador",
  ],
  "aire-acondicionado-portatil": [
    "aire-acondicionado",
    "ventilador",
    "deshumidificador",
  ],
  ventilador: [
    "aire-acondicionado",
    "aire-acondicionado-portatil",
    "deshumidificador",
  ],
  deshumidificador: [
    "aire-acondicionado",
    "aire-acondicionado-portatil",
    "calefactor-electrico",
  ],
  "calefactor-electrico": [
    "termo-electrico",
    "aire-acondicionado",
    "deshumidificador",
  ],
  horno: ["freidora-de-aire", "vitroceramica", "microondas"],
  "freidora-de-aire": ["horno", "microondas", "vitroceramica"],
  microondas: ["horno", "freidora-de-aire", "vitroceramica"],
  vitroceramica: ["horno", "freidora-de-aire", "microondas"],
  lavadora: ["secadora", "lavavajillas", "termo-electrico"],
  secadora: ["lavadora", "lavavajillas", "deshumidificador"],
  lavavajillas: ["lavadora", "secadora", "termo-electrico"],
  "termo-electrico": ["calefactor-electrico", "lavavajillas", "lavadora"],
  frigorifico: ["congelador", "router-wifi", "aire-acondicionado"],
  congelador: ["frigorifico", "router-wifi", "aire-acondicionado"],
  ordenador: ["router-wifi", "televisor", "frigorifico"],
  televisor: ["ordenador", "router-wifi", "frigorifico"],
  "router-wifi": ["ordenador", "televisor", "frigorifico"],
  "radiador-de-aceite": [
    "emisor-termico",
    "calefactor-electrico",
    "manta-electrica",
  ],
  "emisor-termico": [
    "radiador-de-aceite",
    "calefactor-electrico",
    "aire-acondicionado",
  ],
  "manta-electrica": [
    "brasero-electrico",
    "calefactor-electrico",
    "radiador-de-aceite",
  ],
  "brasero-electrico": [
    "manta-electrica",
    "calefactor-electrico",
    "radiador-de-aceite",
  ],
  "coche-electrico": ["termo-electrico", "aire-acondicionado", "secadora"],
  "placa-de-induccion": ["vitroceramica", "horno", "hervidor-de-agua"],
  cafetera: ["hervidor-de-agua", "microondas", "freidora-de-aire"],
  "hervidor-de-agua": ["cafetera", "placa-de-induccion", "microondas"],
  plancha: ["secadora", "lavadora", "secador-de-pelo"],
  "secador-de-pelo": ["plancha", "aspiradora", "termo-electrico"],
  aspiradora: ["plancha", "secador-de-pelo", "router-wifi"],
  "bombilla-led": ["televisor", "router-wifi", "ordenador"],
  "consola-videojuegos": ["televisor", "ordenador", "router-wifi"],
};

export function getRelatedAppliances(item: Appliance, limit = 3) {
  const configured = (relatedApplianceSlugs[item.slug] ?? [])
    .map((slug) => appliances.find((candidate) => candidate.slug === slug))
    .filter(
      (candidate): candidate is Appliance => Boolean(candidate?.indexable),
    );

  if (configured.length >= limit) {
    return configured.slice(0, limit);
  }

  const currentIndex = appliances.findIndex(
    (candidate) => candidate.slug === item.slug,
  );
  const orderedCandidates =
    currentIndex >= 0
      ? [
          ...appliances.slice(currentIndex + 1).filter((candidate) => candidate.indexable),
          ...appliances.slice(0, currentIndex).filter((candidate) => candidate.indexable),
        ]
      : appliances.filter(
          (candidate) => candidate.indexable && candidate.slug !== item.slug,
        );
  const sameCategory = orderedCandidates.filter(
    (candidate) => candidate.category === item.category && candidate.slug !== item.slug,
  );
  const otherGuides = orderedCandidates.filter(
    (candidate) => candidate.category !== item.category && candidate.slug !== item.slug,
  );

  return [...new Map(
    [...configured, ...sameCategory, ...otherGuides].map((candidate) => [
      candidate.slug,
      candidate,
    ]),
  ).values()].slice(0, limit);
}

export type RelatedGuideLink = {
  href: string;
  title: string;
};

const labelGuideSlugs = new Set([
  "frigorifico",
  "congelador",
  "lavadora",
  "lavavajillas",
  "secadora",
  "televisor",
]);
const continuousGuideSlugs = new Set([
  "router-wifi",
  "consola-videojuegos",
  "cafetera",
  "televisor",
  "ordenador",
  "frigorifico",
  "congelador",
]);
const highPowerGuideSlugs = new Set([
  "aire-acondicionado",
  "radiador-de-aceite",
  "emisor-termico",
  "coche-electrico",
  "placa-de-induccion",
  "aire-acondicionado-portatil",
  "calefactor-electrico",
  "horno",
  "termo-electrico",
  "vitroceramica",
  "secadora",
]);

const comparisonGuideLinks: Record<string, RelatedGuideLink[]> = {
  vitroceramica: [
    {
      href: "/guias/induccion-vs-vitroceramica-consumo",
      title: "Comparar inducción y vitrocerámica para la misma receta",
    },
  ],
  horno: [
    {
      href: "/guias/horno-vs-freidora-aire-consumo",
      title: "Comparar horno y freidora de aire por ración",
    },
  ],
  "freidora-de-aire": [
    {
      href: "/guias/horno-vs-freidora-aire-consumo",
      title: "Comparar freidora de aire y horno por ración",
    },
  ],
  "aire-acondicionado": [
    {
      href: "/guias/aire-acondicionado-split-vs-portatil",
      title: "Comparar aire acondicionado split y portátil",
    },
    {
      href: "/guias/radiador-electrico-vs-bomba-calor",
      title: "Comparar bomba de calor y resistencia eléctrica",
    },
  ],
  "aire-acondicionado-portatil": [
    {
      href: "/guias/aire-acondicionado-split-vs-portatil",
      title: "Comparar aire portátil y split en la misma estancia",
    },
  ],
  "calefactor-electrico": [
    {
      href: "/guias/radiador-electrico-vs-bomba-calor",
      title: "Comparar resistencia eléctrica y bomba de calor",
    },
  ],
  "radiador-de-aceite": [
    {
      href: "/guias/radiador-electrico-vs-bomba-calor",
      title: "Comparar radiador eléctrico y bomba de calor",
    },
  ],
  "emisor-termico": [
    {
      href: "/guias/radiador-electrico-vs-bomba-calor",
      title: "Comparar emisores de resistencia y bomba de calor",
    },
  ],
  "placa-de-induccion": [
    {
      href: "/guias/induccion-vs-vitroceramica-consumo",
      title: "Comparar inducción y vitrocerámica para la misma receta",
    },
  ],
  "coche-electrico": [
    {
      href: "/guias/como-entender-factura-luz",
      title: "Entender los periodos y conceptos de la factura",
    },
  ],
};

export function getRelatedGuideLinks(item: Appliance): RelatedGuideLink[] {
  const links: RelatedGuideLink[] = [
    ...(comparisonGuideLinks[item.slug] ?? []),
  ];

  if (labelGuideSlugs.has(item.slug)) {
    links.push({
      href: "/guias/etiqueta-energetica-a-euros",
      title: "Convertir la etiqueta energética en euros",
    });
  }

  if (continuousGuideSlugs.has(item.slug)) {
    links.push({
      href: "/guias/consumo-fantasma",
      title: "Comprobar el consumo continuo y en espera",
    });
  }

  if (highPowerGuideSlugs.has(item.slug)) {
    links.push({
      href: "/guias/potencia-contratada",
      title: "Revisar potencia contratada y simultaneidad",
    });
  }

  links.push({
    href: "/guias/como-calcular-consumo-electrico",
    title: "Aprender la fórmula de kWh y coste",
  });

  return links.slice(0, 3);
}

const applianceSeeds: ApplianceSeed[] = [
  {
    slug: "aire-acondicionado",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Aire acondicionado",
    articleName: "un aire acondicionado",
    seoTitle: "Cuánto consume un aire acondicionado: coste",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 1000,
      hoursPerDay: 4,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste por hora y entiende por qué un inverter no consume siempre lo mismo.",
    intro:
      "En un aparato inverter el compresor regula, por lo que la potencia nominal no equivale a un consumo constante. La calculadora parte de un ejemplo educativo que puedes sustituir por la potencia eléctrica de entrada de tu equipo.",
    range:
      "Consulta la potencia eléctrica de entrada y el consumo declarado en la etiqueta o ficha del modelo; varían según el equipo y el modo.",
    caveat:
      "Los 1.000 W y las cuatro horas diarias son un escenario educativo editable. La temperatura exterior, el aislamiento, el tamaño de la estancia y la consigna pueden alterar mucho el resultado.",
    tips: [
      "Busca la potencia eléctrica de entrada, no la potencia térmica ni los BTU.",
      "Evita bajar la consigna de golpe: no enfría más rápido y puede alargar el trabajo del compresor.",
      "Limpia los filtros y limita la entrada de calor con persianas o toldos.",
    ],
    factors: [
      {
        title: "Tecnología inverter",
        text: "Reduce la potencia cuando alcanza la temperatura objetivo; por eso medir varias horas ofrece una cifra más fiable que leer un pico instantáneo.",
      },
      {
        title: "Aislamiento y orientación",
        text: "Un cerramiento deficiente o el sol directo obligan al equipo a compensar calor continuamente.",
      },
      {
        title: "Tipo de equipo",
        text: "Los portátiles suelen perder eficiencia al expulsar aire caliente y pueden gastar más para el mismo confort.",
      },
    ],
    sourceTitle: "Comisión Europea — Acondicionadores de aire y ventiladores",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/air-conditioners-and-comfort-fans_en",
  },
  {
    slug: "ventilador",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Ventilador",
    articleName: "un ventilador",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 50,
      hoursPerDay: 8,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Una alternativa de bajo consumo cuando mover el aire es suficiente para recuperar confort.",
    intro:
      "Un ventilador no enfría el aire: acelera la evaporación del sudor y mejora la sensación térmica. La calculadora ofrece un ejemplo educativo editable para convertir la potencia indicada por el fabricante en coste.",
    range:
      "Consulta la potencia eléctrica de entrada en la etiqueta o el manual; varía por modelo, velocidad y funciones.",
    caveat:
      "Los 50 W y las ocho horas diarias son un escenario educativo editable. La velocidad seleccionada, el tamaño, el motor y el uso de luz integrada cambian la potencia.",
    tips: [
      "Apágalo al salir: si no hay personas, mover el aire no aporta confort.",
      "En ventiladores de techo, usa el sentido de giro recomendado para verano.",
      "Combínalo con ventilación nocturna y sombreado durante las horas de sol.",
    ],
    factors: [
      {
        title: "Velocidad",
        text: "Las velocidades altas aumentan el consumo, aunque el salto suele ser pequeño en euros frente a equipos de refrigeración.",
      },
      {
        title: "Motor DC o AC",
        text: "Los motores DC modernos suelen ofrecer más regulación y menor potencia, especialmente a velocidades bajas.",
      },
      {
        title: "Uso real",
        text: "El ahorro frente al aire acondicionado solo existe si el ventilador cubre tu necesidad de confort.",
      },
    ],
    sourceTitle: "Comisión Europea — Acondicionadores de aire y ventiladores",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/air-conditioners-and-comfort-fans_en",
  },
  {
    slug: "horno",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Horno eléctrico",
    articleName: "un horno eléctrico",
    seoTitle: "Cuánto consume un horno eléctrico: coste",
    category: "Cocina",
    calculation: {
      method: "cycle",
      kwhPerCycle: 1.1,
      cycles: 15,
      cyclePeriod: "month",
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Potencia alta, uso puntual: precalentado, temperatura y duración marcan la diferencia.",
    intro:
      "El horno tiene una potencia elevada, pero las resistencias se encienden y apagan para mantener la temperatura. Multiplicar toda la potencia por toda la duración suele dar una estimación conservadora.",
    range:
      "Consulta la potencia eléctrica de entrada y el consumo por ciclo en la etiqueta o el manual; varían por modelo y función.",
    caveat:
      "El ejemplo usa 1,10 kWh por ciclo y quince ciclos al mes como demostración editable, no como dato típico ni de fabricante. Copia el kWh/ciclo de la etiqueta o mide una cocción completa comparable.",
    tips: [
      "Evita abrir la puerta durante la cocción para no perder calor.",
      "Aprovecha el espacio y cocina varias preparaciones compatibles a la vez.",
      "No precalientes cuando la receta no lo necesite.",
    ],
    factors: [
      {
        title: "Temperatura",
        text: "Alcanzar y mantener 240 °C exige más energía que una cocción suave.",
      },
      {
        title: "Volumen y aislamiento",
        text: "Un horno compacto o mejor aislado puede calentar menos masa y perder menos energía.",
      },
      {
        title: "Tiempo de precalentado",
        text: "Es uno de los periodos de mayor demanda porque las resistencias trabajan de forma continua.",
      },
    ],
    sourceTitle: "Comisión Europea — Hornos domésticos y etiqueta energética",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/domestic-ovens_en",
  },
  {
    slug: "termo-electrico",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Termo eléctrico",
    articleName: "un termo eléctrico",
    seoTitle: "Cuánto consume un termo eléctrico: coste",
    category: "Agua caliente",
    calculation: {
      method: "power",
      watts: 1500,
      hoursPerDay: 2,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste de calentar agua y separa el consumo útil de las pérdidas del depósito.",
    intro:
      "La resistencia de un termo suele trabajar a potencia completa hasta alcanzar la temperatura. Después se activa por intervalos para compensar las pérdidas de calor del depósito.",
    range:
      "Consulta la potencia eléctrica de entrada en la etiqueta o el manual; varía por volumen, modelo y modo de control.",
    caveat:
      "Los 1.500 W y las dos horas diarias son un escenario educativo editable, no un uso universal. El resultado depende del volumen, el agua consumida, la temperatura de entrada y el aislamiento.",
    tips: [
      "Ajusta la temperatura sin comprometer las recomendaciones sanitarias del fabricante.",
      "Revisa si el tamaño del depósito está sobredimensionado para el hogar.",
      "Programa el calentamiento cuando el patrón de uso sea previsible.",
    ],
    factors: [
      {
        title: "Litros de agua",
        text: "Cuanto mayor es el depósito y el consumo diario de agua caliente, más energía hay que aportar.",
      },
      {
        title: "Temperatura de entrada",
        text: "En invierno el agua de red llega más fría y requiere más energía para alcanzar la misma consigna.",
      },
      {
        title: "Pérdidas en espera",
        text: "El aislamiento del depósito y las tuberías determina cuánto calor se pierde incluso sin abrir un grifo.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "ordenador",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Ordenador de sobremesa",
    articleName: "un ordenador de sobremesa",
    seoTitle: "Cuánto consume un ordenador: coste y cálculo",
    category: "Tecnología",
    calculation: {
      method: "power",
      watts: 250,
      hoursPerDay: 8,
      daysPerMonth: 22,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Ofimática, gaming o renderizado: la carga del equipo importa más que la potencia de la fuente.",
    intro:
      "Una fuente de alimentación de 750 W no significa que el ordenador consuma 750 W todo el tiempo. La demanda real cambia según procesador, gráfica, pantalla, periféricos y tipo de tarea.",
    range:
      "Consulta la potencia eléctrica de entrada en la etiqueta o el manual y mide una sesión representativa; varía por equipo y carga.",
    caveat:
      "Los 250 W y las ocho horas son un escenario educativo editable. Para este aparato conviene medir el conjunto en el enchufe durante una sesión representativa.",
    tips: [
      "Activa la suspensión automática en pausas cortas.",
      "Limita los fotogramas por segundo si la gráfica trabaja sin aportar una mejora visible.",
      "Incluye monitor y periféricos si quieres calcular el puesto completo.",
    ],
    factors: [
      {
        title: "Carga de CPU y GPU",
        text: "Navegar o escribir consume mucho menos que jugar, renderizar vídeo o entrenar modelos.",
      },
      {
        title: "Pantalla",
        text: "El tamaño, brillo y tecnología del monitor añaden un consumo independiente.",
      },
      {
        title: "Horas en reposo",
        text: "Un equipo encendido sin trabajar puede acumular más horas que las sesiones intensivas.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "secadora",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Secadora",
    articleName: "una secadora",
    category: "Lavado",
    calculation: {
      method: "cycle",
      kwhPerCycle: 1.4,
      cycles: 12,
      cyclePeriod: "month",
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    labelKwhPer100Cycles: 140,
    shortDescription:
      "Compara una resistencia tradicional con una bomba de calor y calcula por ciclos.",
    intro:
      "En una secadora importa más la energía indicada en la etiqueta que la potencia máxima. La etiqueta A–G vigente desde julio de 2025 expresa el consumo ponderado en kWh por 100 ciclos.",
    range:
      "Consulta los kWh por 100 ciclos en la etiqueta energética vigente de tu modelo.",
    caveat:
      "El valor de 1,4 kWh por ciclo es un escenario educativo editable, equivalente a 140 kWh por 100 ciclos. La fórmula por potencia sobreestima muchos ciclos.",
    tips: [
      "Centrifuga bien la ropa antes de pasarla a la secadora.",
      "Limpia filtros y condensador según las instrucciones del fabricante.",
      "Compara kWh por 100 ciclos, no solo la duración del programa.",
    ],
    factors: [
      {
        title: "Tecnología",
        text: "La bomba de calor recupera energía y suele reducir el consumo frente a una resistencia convencional.",
      },
      {
        title: "Humedad inicial",
        text: "Una velocidad de centrifugado mayor reduce el agua que la secadora debe evaporar.",
      },
      {
        title: "Carga y programa",
        text: "Sobrecargar, mezclar tejidos o elegir secado extra puede alargar el ciclo.",
      },
    ],
    sourceTitle: "Comisión Europea — Nueva etiqueta energética de secadoras",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/tumble-dryers_en",
    measurement:
      "Divide los kWh por 100 ciclos de la etiqueta entre 100 para obtener los kWh de un ciclo antes de estimar el coste.",
  },
  {
    slug: "router-wifi",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Router wifi",
    articleName: "un router wifi",
    seoTitle: "Cuánto consume un router wifi: coste y cálculo",
    category: "Tecnología",
    calculation: {
      method: "power",
      watts: 10,
      hoursPerDay: 24,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Poca potencia, muchas horas: calcula lo que suma un dispositivo encendido todo el año.",
    intro:
      "El router tiene una potencia pequeña, pero normalmente funciona las 24 horas. Esa continuidad convierte unos pocos vatios en un consumo anual visible.",
    range:
      "Consulta la potencia eléctrica de entrada en la etiqueta o el manual; varía por modelo, funciones y equipos asociados.",
    caveat:
      "Los 10 W durante 24 horas son un escenario educativo editable. Los repetidores, sistemas mesh, decodificadores y equipos de red adicionales deben calcularse por separado.",
    tips: [
      "No lo apagues si afecta a alarmas, domótica o telefonía conectada.",
      "Retira repetidores que ya no sean necesarios.",
      "Agrupa todos los nodos de una red mesh para calcular el sistema completo.",
    ],
    factors: [
      {
        title: "Número de radios",
        text: "Bandas adicionales, antenas activas y redes mesh pueden elevar el consumo.",
      },
      {
        title: "Servicios conectados",
        text: "Telefonía, almacenamiento USB o equipos de domótica pueden requerir funcionamiento continuo.",
      },
      {
        title: "Equipos asociados",
        text: "La ONT de fibra o un decodificador suelen ser dispositivos separados con su propio consumo.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "frigorifico",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Frigorífico",
    articleName: "un frigorífico",
    seoTitle: "Cuánto consume un frigorífico: coste y cálculo",
    category: "Frío",
    calculation: {
      method: "annual",
      annualKwh: 181,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Está encendido todo el año: entiende por qué la etiqueta en kWh/año es más útil que la potencia puntual.",
    intro:
      "Un frigorífico no mantiene el compresor funcionando de forma continua. Alterna periodos de marcha y pausa para conservar la temperatura, de modo que su consumo depende más de los kWh anuales de la etiqueta, la apertura de puertas y la temperatura ambiente que de un único valor de vatios.",
    range: "Consulta los kWh/año de la etiqueta energética; la potencia instantánea varía durante cada ciclo.",
    caveat:
      "El escenario parte de una referencia anual histórica y la reparte para mostrar medias de coste. No predice el consumo de cada mes ni sustituye los kWh/año declarados en la etiqueta de tu modelo.",
    tips: [
      "Ajusta el frigorífico a una temperatura de conservación adecuada y evita abrirlo más tiempo del necesario.",
      "Deja espacio para que el aire circule por la parte trasera y limpia el polvo de la rejilla cuando el fabricante lo recomiende.",
      "No introduzcas comida muy caliente: obligará al compresor a trabajar más para recuperar la temperatura.",
    ],
    factors: [
      {
        title: "Etiqueta en kWh/año",
        text: "Es la referencia más práctica para estimar el consumo anual de un modelo concreto, porque ya considera un ciclo de funcionamiento estandarizado.",
      },
      {
        title: "Temperatura ambiente",
        text: "Una cocina cálida, la cercanía al horno o una mala ventilación aumentan el calor que el frigorífico debe expulsar.",
      },
      {
        title: "Uso y capacidad",
        text: "La frecuencia de apertura, el volumen y el estado de las juntas de la puerta influyen en las pérdidas de frío.",
      },
    ],
    sourceTitle: "Comisión Europea — Etiqueta de frigoríficos y congeladores",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/fridges-and-freezers_en",
    measurement:
      "Para estimar tu modelo, divide los kWh/año de su etiqueta entre 12 y multiplícalos por el precio de tu electricidad.",
  },
  {
    slug: "lavadora",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Lavadora",
    articleName: "una lavadora",
    category: "Lavado",
    calculation: {
      method: "cycle",
      kwhPerCycle: 0.6,
      cycles: 16,
      cyclePeriod: "month",
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    labelKwhPer100Cycles: 60,
    shortDescription:
      "Para este aparato, los kWh por ciclo de la etiqueta describen mejor el gasto que la potencia máxima.",
    intro:
      "La lavadora necesita picos de potencia para calentar agua o centrifugar, pero no los mantiene durante todo el programa. Por eso el dato más útil para estimar el coste es el consumo del programa Eco 40-60 expresado en kWh por ciclo o por 100 ciclos.",
    range: "Consulta los kWh por 100 ciclos del programa Eco 40-60 en la etiqueta energética.",
    caveat:
      "El ejemplo usa 0,6 kWh por ciclo y 16 lavados al mes solo como escenario editable. Los programas rápidos, la temperatura, la carga y el centrifugado pueden cambiar el resultado.",
    tips: [
      "Llena el tambor sin apelmazar la ropa y elige programas de baja temperatura cuando la prenda lo permita.",
      "Usa el programa eco si puedes esperar: suele durar más, pero reduce el gasto de calentamiento de agua.",
      "Evita repetir lavados por exceso de detergente o una carga mal repartida.",
    ],
    factors: [
      {
        title: "Temperatura de lavado",
        text: "Calentar agua suele ser una de las partes que más energía requiere; un programa a menor temperatura puede reducir ese componente.",
      },
      {
        title: "Programa y carga",
        text: "Los datos de etiqueta se obtienen en un programa concreto. Un ciclo corto o una media carga no tiene por qué consumir proporcionalmente menos.",
      },
      {
        title: "Centrifugado",
        text: "Un centrifugado eficaz deja menos agua en la ropa y puede disminuir el trabajo posterior de la secadora.",
      },
    ],
    sourceTitle: "Comisión Europea — Etiqueta energética de lavadoras",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/washing-machines_en",
    measurement:
      "Divide los kWh por 100 ciclos que aparecen en la etiqueta entre 100 e introdúcelos como kWh por ciclo.",
  },
  {
    slug: "lavavajillas",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Lavavajillas",
    articleName: "un lavavajillas",
    seoTitle: "Cuánto consume un lavavajillas: coste y cálculo",
    category: "Cocina",
    calculation: {
      method: "cycle",
      kwhPerCycle: 0.85,
      cycles: 16,
      cyclePeriod: "month",
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    labelKwhPer100Cycles: 85,
    shortDescription:
      "Calcula por ciclo: el programa eco puede durar más y, a la vez, usar menos energía.",
    intro:
      "En un lavavajillas, el calentamiento del agua y el secado concentran buena parte del consumo. La potencia nominal solo describe un momento del ciclo; los kWh por ciclo de la etiqueta permiten acercarse mejor al coste de tus lavados habituales.",
    range: "Consulta los kWh por 100 ciclos del programa Eco en la etiqueta energética.",
    caveat:
      "El ejemplo usa 0,85 kWh por ciclo y 16 ciclos al mes. El programa elegido, la temperatura de entrada del agua y la carga real pueden variar el gasto.",
    tips: [
      "Ponlo en marcha cuando esté lleno y retira solo los restos grandes de comida antes de cargarlo.",
      "Elige el programa eco para la vajilla cotidiana si no necesitas un ciclo intenso.",
      "Mantén limpios el filtro y los brazos aspersores para que el aparato no alargue el ciclo por un mal lavado.",
    ],
    factors: [
      {
        title: "Programa seleccionado",
        text: "Los ciclos intensivos elevan la temperatura y el tiempo de lavado. El eco está diseñado para reducir el consumo de agua y energía en condiciones normales.",
      },
      {
        title: "Número de servicios",
        text: "Usar un ciclo a media carga puede duplicar el coste por plato frente a esperar a tener una carga completa.",
      },
      {
        title: "Secado",
        text: "Abrir la puerta al finalizar, cuando el fabricante lo permita, puede facilitar el secado sin añadir tiempo de calentamiento.",
      },
    ],
    sourceTitle: "Comisión Europea — Etiqueta energética de lavavajillas",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/dishwashers_en",
    measurement:
      "Divide los kWh por 100 ciclos del programa Eco entre 100 e introdúcelos como kWh por ciclo.",
  },
  {
    slug: "vitroceramica",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Vitrocerámica o inducción",
    articleName: "una vitrocerámica o placa de inducción",
    seoTitle: "Cuánto consume una vitrocerámica: coste y cálculo",
    category: "Cocina",
    calculation: {
      method: "power",
      watts: 1500,
      hoursPerDay: 0.75,
      daysPerMonth: 20,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "La potencia es alta, pero cada zona regula: calcula el coste por uso y aprende qué cambia entre inducción y vitro.",
    intro:
      "Una placa puede alcanzar potencias elevadas, especialmente con la función de refuerzo, pero regula la entrega de energía al mantener el hervor. El recipiente, el tamaño de la zona y el tiempo efectivo de cocción pesan más que el máximo de vatios impreso en el manual.",
    range:
      "Consulta la potencia eléctrica de la zona en la etiqueta o el manual; varía por tamaño, nivel y función de refuerzo.",
    caveat:
      "El ejemplo educativo editable supone una zona de 1.500 W durante 45 minutos al día. Si la resistencia o la inducción se regula durante la cocción, el consumo real será distinto.",
    tips: [
      "Usa una olla con base plana y del diámetro de la zona para aprovechar mejor el calor.",
      "Tapa los recipientes cuando la receta lo permita y usa el calor residual al final de la cocción.",
      "Evita usar el refuerzo más tiempo del necesario: sirve para arrancar rápido, no para cocinar todo el proceso.",
    ],
    factors: [
      {
        title: "Tecnología de la placa",
        text: "La inducción calienta el recipiente directamente cuando es compatible; la eficiencia final depende también de la batería de cocina y del uso.",
      },
      {
        title: "Diámetro del recipiente",
        text: "Una olla mucho más pequeña que la zona reduce el aprovechamiento de la energía entregada.",
      },
      {
        title: "Tiempo a máxima potencia",
        text: "Llevar agua a ebullición demanda más energía que mantener una cocción suave tras alcanzar la temperatura.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "microondas",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Microondas",
    articleName: "un microondas",
    category: "Cocina",
    calculation: {
      method: "power",
      watts: 1000,
      hoursPerDay: 0.25,
      daysPerMonth: 20,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Tiene una potencia considerable, pero suele usarse pocos minutos: mira el coste por calentamiento y por mes.",
    intro:
      "El microondas concentra bastante potencia en sesiones cortas. Para recalentar o descongelar pequeñas cantidades puede ser una forma eficiente de aportar energía porque evita calentar una cavidad grande durante demasiado tiempo.",
    range:
      "Consulta la potencia eléctrica de entrada en la etiqueta o el manual; varía por modelo y modo de uso.",
    caveat:
      "Los 1.000 W y los 15 minutos son un escenario educativo editable. Los niveles bajos pueden alternar periodos de encendido y pausa.",
    tips: [
      "Usa recipientes aptos y tapa la comida para reducir salpicaduras y pérdidas de humedad.",
      "Ajusta el tiempo a la cantidad que vas a calentar; sobrecalentar aumenta el gasto y empeora el resultado.",
      "Descongela con antelación en la nevera cuando sea posible para acortar el uso intensivo.",
    ],
    factors: [
      {
        title: "Tiempo de uso",
        text: "En este aparato, unos pocos minutos al día cambian más el coste que pequeñas diferencias en la potencia nominal.",
      },
      {
        title: "Nivel seleccionado",
        text: "Los niveles de potencia pueden modular el funcionamiento del magnetrón según el diseño del equipo.",
      },
      {
        title: "Cantidad de comida",
        text: "Calentar una ración individual requiere menos energía que una fuente grande, aunque conviene repartir el calor y remover cuando corresponda.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "televisor",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Televisor",
    articleName: "un televisor",
    category: "Tecnología",
    calculation: {
      method: "power",
      watts: 100,
      hoursPerDay: 4,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Tamaño, brillo y horas de pantalla determinan el coste mucho más que el consumo en espera.",
    intro:
      "El consumo de un televisor cambia con el tamaño del panel, el brillo, el contenido mostrado y las horas de uso. En una pantalla moderna el gasto durante la reproducción suele pesar más que el modo de espera, aunque ambos se pueden comprobar en la ficha técnica.",
    range:
      "Consulta el consumo declarado en la etiqueta o ficha del modelo; varía con el tamaño, el brillo y el modo de imagen.",
    caveat:
      "El ejemplo educativo editable usa 100 W durante cuatro horas al día. Una consola, un decodificador o una barra de sonido necesitan un cálculo separado.",
    tips: [
      "Reduce el brillo excesivo y desactiva los modos de imagen más luminosos si no los necesitas.",
      "Activa el apagado automático para evitar que quede encendido sin que nadie lo esté viendo.",
      "Revisa el consumo de consolas, decodificadores y barras de sonido por separado.",
    ],
    factors: [
      {
        title: "Tamaño y tecnología",
        text: "Un panel mayor requiere más superficie iluminada. La tecnología y la configuración del brillo modifican el consumo de cada modelo.",
      },
      {
        title: "Modo de imagen",
        text: "Los perfiles dinámicos o de tienda suelen elevar la luminosidad y pueden aumentar la demanda eléctrica.",
      },
      {
        title: "Equipos conectados",
        text: "Consolas, receptores y decodificadores no forman parte del consumo del televisor y deben sumarse de forma independiente.",
      },
    ],
    sourceTitle: "Comisión Europea — Etiqueta energética de pantallas",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/electronic-displays_en",
  },
  {
    slug: "calefactor-electrico",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Calefactor eléctrico",
    articleName: "un calefactor eléctrico",
    seoTitle: "Cuánto consume un calefactor eléctrico: coste",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 1500,
      hoursPerDay: 4,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Es una forma rápida de calentar una estancia pequeña, pero sus horas de uso se traducen pronto en euros.",
    intro:
      "Los calefactores eléctricos de resistencia convierten casi toda la electricidad que consumen en calor en la estancia, pero no multiplican la energía: mantener varios kilovatios durante horas puede tener un coste elevado. El aislamiento y el termostato marcan cuánto tiempo necesita funcionar.",
    range:
      "Consulta la potencia eléctrica de entrada en la etiqueta o el manual; varía por modelo y nivel seleccionado.",
    caveat:
      "El ejemplo educativo editable presupone 1.500 W durante cuatro horas al día. Si el termostato corta con frecuencia o el uso es puntual, el consumo real será menor.",
    tips: [
      "Úsalo para calentar una zona concreta y evita climatizar espacios vacíos.",
      "Cierra puertas y limita las fugas de aire antes de aumentar la potencia o prolongar las horas de uso.",
      "No cubras el calefactor ni uses alargadores inadecuados: sigue siempre las instrucciones de seguridad del fabricante.",
    ],
    factors: [
      {
        title: "Potencia seleccionada",
        text: "Un cambio de 1.000 a 2.000 W duplica la energía por cada hora de resistencia encendida.",
      },
      {
        title: "Aislamiento de la estancia",
        text: "Una habitación con filtraciones de aire o paredes frías necesita más tiempo de aportación de calor para el mismo confort.",
      },
      {
        title: "Termostato y hábitos",
        text: "Una consigna estable y el apagado al salir reducen horas innecesarias de funcionamiento.",
      },
    ],
    sourceTitle: "Comisión Europea — Calefactores locales",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/local-space-heaters_en",
  },
  {
    slug: "deshumidificador",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Deshumidificador",
    articleName: "un deshumidificador",
    seoTitle: "Cuánto consume un deshumidificador: coste",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 250,
      hoursPerDay: 8,
      daysPerMonth: 20,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Su coste depende de la humedad inicial, la temperatura y el ajuste de humedad que marques.",
    intro:
      "Un deshumidificador extrae agua del aire mediante un ciclo de refrigeración o, en equipos pequeños, con otros sistemas. No consume lo mismo todo el día: el higrostato debería detenerlo o reducir su trabajo al acercarse a la humedad objetivo.",
    range:
      "Consulta la potencia eléctrica de entrada en la etiqueta o el manual; varía por modelo, temperatura y modo.",
    caveat:
      "El ejemplo educativo editable supone 250 W durante ocho horas en veinte días. La humedad, la ropa tendida o una temperatura baja pueden cambiar mucho el tiempo real de funcionamiento.",
    tips: [
      "Ajusta una humedad objetivo razonable y deja que el higrostato pare el equipo cuando la alcance.",
      "Cierra puertas y ventanas de la estancia que quieras tratar para no deshumidificar aire exterior continuamente.",
      "Limpia el filtro y vacía el depósito o revisa el desagüe según el manual del modelo.",
    ],
    factors: [
      {
        title: "Humedad inicial",
        text: "Cuanta más agua haya en el aire, más tiempo tendrá que trabajar el aparato antes de llegar al objetivo.",
      },
      {
        title: "Temperatura",
        text: "La eficacia de los modelos con compresor puede variar con el frío; consulta las condiciones de funcionamiento del fabricante.",
      },
      {
        title: "Volumen de la estancia",
        text: "Una habitación grande o conectada a otras estancias exige más trabajo que un espacio cerrado de menor tamaño.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "aire-acondicionado-portatil",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Aire acondicionado portátil",
    articleName: "un aire acondicionado portátil",
    seoTitle: "Consumo de aire acondicionado portátil: coste",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 1200,
      hoursPerDay: 4,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Entiende el coste por hora de un equipo portátil y por qué la evacuación del aire caliente importa tanto.",
    intro:
      "Un aire acondicionado portátil reúne el compresor en la propia habitación y expulsa calor mediante un tubo. La instalación de ese tubo, el sellado de la ventana y la carga térmica de la estancia pueden hacer que necesite más tiempo para lograr el mismo confort que un equipo fijo bien dimensionado.",
    range:
      "Consulta la potencia eléctrica de entrada y el consumo declarado en la etiqueta o ficha; varían por modelo y modo.",
    caveat:
      "El ejemplo educativo editable usa 1.200 W durante cuatro horas al día. La potencia real y los ciclos del compresor cambian con el modelo, la temperatura exterior y el aislamiento.",
    tips: [
      "Sella bien la ventana alrededor del tubo para limitar la entrada de aire caliente desde el exterior.",
      "Reduce la radiación solar con persianas o toldos antes de encender el equipo.",
      "Limpia los filtros y deja espacio alrededor del aparato para que pueda mover aire correctamente.",
    ],
    factors: [
      {
        title: "Sellado de la ventana",
        text: "Una abertura mal sellada permite entrar aire caliente y obliga al equipo a compensar continuamente esa ganancia de calor.",
      },
      {
        title: "Tamaño de la estancia",
        text: "Un aparato con capacidad insuficiente puede funcionar muchas más horas sin alcanzar una temperatura cómoda.",
      },
      {
        title: "Tipo de equipo",
        text: "Los diseños de doble tubo y los sistemas fijos pueden tener un comportamiento distinto; compara siempre la ficha de eficiencia y las condiciones de instalación.",
      },
    ],
    sourceTitle: "Comisión Europea — Acondicionadores de aire y ventiladores",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/air-conditioners-and-comfort-fans_en",
  },
  {
    slug: "congelador",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Congelador",
    articleName: "un congelador",
    category: "Frío",
    calculation: {
      method: "annual",
      annualKwh: 200,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Al funcionar todo el año, su etiqueta en kWh/año es la mejor pista para estimar el coste mensual.",
    intro:
      "Como un frigorífico, un congelador alterna ciclos de compresor para mantener una temperatura baja. El consumo anual declarado en la etiqueta ofrece una comparación más fiable entre modelos que la potencia instantánea, que solo describe un momento de arranque o funcionamiento.",
    range: "Consulta los kWh/año de la etiqueta energética; el compresor no trabaja de manera constante.",
    caveat:
      "El escenario anual es un supuesto educativo y se reparte para mostrar medias de coste. La etiqueta de tu modelo, la temperatura ambiente, la escarcha y las aperturas pueden dar un resultado distinto.",
    tips: [
      "Mantén el congelador con una temperatura adecuada y revisa el cierre de la puerta.",
      "Descongela cuando la acumulación de hielo sea importante, siguiendo las indicaciones del fabricante.",
      "Organiza los alimentos para abrir la puerta menos tiempo y no introducir productos calientes.",
    ],
    factors: [
      {
        title: "Etiqueta energética",
        text: "Los kWh/año permiten calcular una estimación mensual directa y comparar aparatos de tamaño parecido.",
      },
      {
        title: "Escarcha y ventilación",
        text: "La acumulación de hielo y una mala evacuación del calor alrededor del aparato pueden obligar a trabajar más al compresor.",
      },
      {
        title: "Ubicación",
        text: "Un garaje o una cocina con temperaturas extremas puede apartarse de las condiciones en las que se declara el consumo de etiqueta.",
      },
    ],
    sourceTitle: "Comisión Europea — Etiqueta de frigoríficos y congeladores",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/fridges-and-freezers_en",
    measurement:
      "Divide los kWh/año de la etiqueta entre 12 y multiplícalos por el precio por kWh de tu factura.",
  },
  {
    slug: "freidora-de-aire",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Freidora de aire",
    articleName: "una freidora de aire",
    seoTitle: "Cuánto consume una freidora de aire: coste",
    category: "Cocina",
    calculation: {
      method: "power",
      watts: 1500,
      hoursPerDay: 0.4,
      daysPerMonth: 20,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste por cocinado y compárala con un horno sin confundir potencia máxima con consumo total.",
    intro:
      "Una freidora de aire es un horno compacto con circulación de aire caliente. Puede tener una potencia alta, pero al calentar un volumen menor y durante menos tiempo puede reducir la energía total en algunas recetas. La comparación útil se hace por plato y tiempo de cocción, no solo por vatios.",
    range:
      "Consulta la potencia eléctrica de entrada en la etiqueta o el manual; varía por capacidad, modelo y programa.",
    caveat:
      "El ejemplo educativo editable usa 1.500 W durante 24 minutos en veinte usos mensuales. El termostato puede alternar la resistencia y algunas recetas requieren precalentado o varias tandas.",
    tips: [
      "No la uses para una cantidad que obligue a cocinar muchas tandas si el horno ya está encendido para otros platos.",
      "Evita precalentar más tiempo del necesario y adapta el tiempo a la cantidad de comida.",
      "Mantén limpia la cesta y deja circulación de aire para conseguir el resultado deseado sin alargar el ciclo.",
    ],
    factors: [
      {
        title: "Capacidad y tandas",
        text: "Cocinar en varias tandas puede aumentar el tiempo total de resistencia encendida y reducir la ventaja frente a un horno cargado.",
      },
      {
        title: "Precalentado",
        text: "El volumen pequeño suele permitir un calentamiento rápido, pero el consumo adicional depende de si la receta realmente lo necesita.",
      },
      {
        title: "Receta elegida",
        text: "El ahorro potencial cambia si sustituyes un horno grande, una sartén o un microondas; compara siempre tiempos y cantidades equivalentes.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "radiador-de-aceite",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Radiador de aceite",
    articleName: "un radiador de aceite",
    seoTitle: "Cuánto consume un radiador de aceite: coste",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 2000,
      hoursPerDay: 3,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste por hora y por noche sin creer que el aceite multiplica el calor que pagas.",
    intro:
      "Un radiador de aceite es un calefactor de resistencia: la electricidad calienta un aceite sellado que reparte el calor y lo conserva un rato después de apagarse. Esa inercia mejora el confort, pero no crea energía: cada kWh que entra sale como un kWh de calor, igual que en cualquier otro aparato de resistencia.",
    range:
      "Consulta la potencia máxima y los niveles intermedios en la placa de características o el manual; muchos modelos permiten elegir entre dos o tres potencias.",
    caveat:
      "El ejemplo educativo editable supone 2.000 W durante tres horas al día con la resistencia siempre encendida. Si el termostato corta al alcanzar la temperatura o usas un nivel inferior, el consumo real será menor.",
    tips: [
      "Usa el termostato en lugar de dejarlo siempre a máxima potencia: cuando corta, deja de consumir.",
      "Calienta solo la estancia ocupada y cierra la puerta para no pagar el calor que se va a otras habitaciones.",
      "No lo cubras con ropa ni lo conectes a regletas o alargadores no preparados para su potencia.",
    ],
    factors: [
      {
        title: "Nivel de potencia",
        text: "Pasar de 1.000 a 2.000 W duplica la energía de cada hora con la resistencia encendida. El nivel bajo tarda más en calentar, pero consume la mitad mientras funciona.",
      },
      {
        title: "Termostato",
        text: "El consumo real depende de cuánto tiempo permanece encendida la resistencia, no de las horas que el radiador está enchufado.",
      },
      {
        title: "Pérdidas de la estancia",
        text: "Ventanas sin estanqueidad, paredes frías o techos altos obligan a mantener la resistencia encendida durante más tiempo.",
      },
    ],
    sourceTitle: "Comisión Europea — Calefactores locales",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/local-space-heaters_en",
  },
  {
    slug: "emisor-termico",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Emisor térmico",
    articleName: "un emisor térmico",
    seoTitle: "Cuánto consume un emisor térmico: coste real",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 1000,
      hoursPerDay: 5,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Convierte la potencia de tus emisores en euros y separa lo que ahorra la programación de lo que promete el marketing.",
    intro:
      "Los emisores térmicos, secos o de fluido, calientan mediante resistencias eléctricas. Su diferencia con otros calefactores está en la inercia, el reparto del calor y la electrónica de control, no en la conversión de energía: un kWh eléctrico produce como máximo un kWh de calor. Lo que sí cambia la factura es cuántas horas funciona la resistencia.",
    range:
      "Consulta la potencia de cada emisor en su placa o ficha técnica; si tienes varios, calcula cada uno y suma el resultado.",
    caveat:
      "El ejemplo educativo editable supone un emisor de 1.000 W con la resistencia encendida cinco horas al día. Con termostato y programación, la resistencia alterna periodos encendida y apagada, por lo que las horas reales pueden ser menos que las horas de uso.",
    tips: [
      "Programa los horarios para no calentar habitaciones vacías y usa una consigna moderada.",
      "Si tienes discriminación horaria, concentra parte del uso en las horas más baratas cuando sea compatible con tu confort.",
      "Mide un emisor durante varios días con un medidor o con los datos horarios de tu distribuidora para conocer sus horas reales.",
    ],
    factors: [
      {
        title: "Número de emisores",
        text: "Tres emisores de 1.000 W encendidos a la vez demandan 3 kW: multiplica el coste de uno por el número de aparatos que funcionan simultáneamente.",
      },
      {
        title: "Programación y consigna",
        text: "Cada grado y cada hora que reduces en una habitación desocupada disminuye el tiempo de resistencia encendida.",
      },
      {
        title: "Inercia",
        text: "El fluido o el material acumulador suaviza la temperatura y prolonga la sensación de calor, pero ese calor se pagó antes como electricidad.",
      },
    ],
    sourceTitle: "Comisión Europea — Calefactores locales",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/local-space-heaters_en",
  },
  {
    slug: "manta-electrica",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Manta eléctrica",
    articleName: "una manta eléctrica",
    seoTitle: "Cuánto consume una manta eléctrica: coste",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 100,
      hoursPerDay: 2,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula cuánto cuesta calentar la cama o el sofá y compáralo con calentar toda la habitación.",
    intro:
      "Una manta o un calientacamas eléctrico aporta calor directamente a la persona, no al aire de la estancia. Por eso su potencia suele ser mucho menor que la de un calefactor. Es una de las formas más baratas de ganar confort cuando el objetivo es estar caliente en un punto concreto.",
    range:
      "Consulta la potencia en la etiqueta cosida o en el manual; suele indicarse la máxima, y los niveles intermedios consumen menos.",
    caveat:
      "El ejemplo educativo editable usa 100 W durante dos horas diarias a máxima potencia. Muchos modelos tienen varios niveles y apagado automático, así que el consumo real puede ser inferior.",
    tips: [
      "Úsala para precalentar la cama y bájala o apágala al acostarte si el manual lo recomienda.",
      "No la dobles mientras funciona, no la uses mojada y revisa el cable y el mando antes de cada temporada.",
      "Combínala con una consigna de calefacción más baja en lugar de usar ambas a la vez a plena potencia.",
    ],
    factors: [
      {
        title: "Nivel seleccionado",
        text: "Los niveles bajos regulan la potencia media; el máximo solo es necesario para el calentamiento inicial.",
      },
      {
        title: "Aislamiento de la cama o el sofá",
        text: "Un edredón o una manta encima retienen el calor y reducen el tiempo que necesita estar encendida.",
      },
      {
        title: "Apagado automático",
        text: "El temporizador evita que funcione toda la noche si te duermes con ella encendida.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "brasero-electrico",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Brasero eléctrico",
    articleName: "un brasero eléctrico",
    seoTitle: "Cuánto consume un brasero eléctrico: coste",
    category: "Climatización",
    calculation: {
      method: "power",
      watts: 800,
      hoursPerDay: 3,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste de la mesa camilla según el nivel de potencia y las horas que la usas.",
    intro:
      "El brasero eléctrico calienta un espacio pequeño y cerrado bajo la mesa camilla. Si las faldas retienen el calor, puede dar confort a varias personas sin calentar toda la habitación. Su consumo depende sobre todo del nivel elegido y de cuánto tiempo permanece encendida la resistencia.",
    range:
      "Consulta la potencia de cada posición en la base o el manual; muchos modelos tienen dos niveles.",
    caveat:
      "El ejemplo educativo editable supone 800 W durante tres horas al día. Si usas el nivel bajo o el termostato corta, el consumo real será menor.",
    tips: [
      "Usa faldas gruesas y que lleguen al suelo para no perder el calor acumulado bajo la mesa.",
      "Empieza en el nivel alto unos minutos y baja al nivel inferior cuando el espacio esté caliente.",
      "Mantén las telas separadas de la resistencia y apágalo siempre al levantarte de la mesa.",
    ],
    factors: [
      {
        title: "Nivel de potencia",
        text: "En un brasero de dos posiciones, el nivel bajo consume una fracción de la potencia del alto. Comprueba los vatios de cada posición en tu modelo e introdúcelos por separado.",
      },
      {
        title: "Faldas y estancia",
        text: "Cuanto mejor cerrada está la mesa, menos tiempo necesita la resistencia para mantener la temperatura.",
      },
      {
        title: "Tipo de resistencia",
        text: "Las resistencias halógenas, de cuarzo o de carbono cambian cómo se percibe el calor, pero todas convierten la electricidad en calor en la misma proporción.",
      },
    ],
    sourceTitle: "Comisión Europea — Calefactores locales",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/local-space-heaters_en",
  },
  {
    slug: "coche-electrico",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Coche eléctrico",
    articleName: "un coche eléctrico",
    seoTitle: "Cuánto cuesta cargar un coche eléctrico en casa",
    category: "Movilidad",
    calculation: {
      method: "cycle",
      kwhPerCycle: 30,
      cycles: 6,
      cyclePeriod: "month",
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste por recarga, por mes y por 100 km con los kWh que mide tu enchufe y tu precio real.",
    intro:
      "Para saber cuánto cuesta cargar un coche eléctrico en casa importa la energía que sale de la red, no solo la que entra en la batería: parte se pierde en el cargador y el cableado. Aquí cada «ciclo» es una recarga, medida en kWh en el contador o en el punto de recarga.",
    range:
      "Consulta los kWh de cada sesión en tu punto de recarga, en la aplicación del coche o en los datos horarios de tu distribuidora. El consumo homologado del vehículo aparece en su ficha técnica en kWh/100 km.",
    caveat:
      "El ejemplo educativo editable supone seis recargas al mes de 30 kWh medidos en la toma, unos 180 kWh mensuales. La velocidad, la temperatura, la calefacción del habitáculo y la potencia de carga cambian el consumo real.",
    tips: [
      "Programa la carga en las horas más baratas de tu tarifa si tienes discriminación horaria.",
      "Compara los kWh que indica el coche con los del contador o el punto de recarga para conocer tus pérdidas reales.",
      "Precalienta o climatiza el coche mientras está enchufado para no gastar batería al arrancar en días fríos.",
    ],
    factors: [
      {
        title: "Kilómetros y consumo del vehículo",
        text: "La energía mensual es aproximadamente kilómetros × kWh/100 km ÷ 100, más las pérdidas de carga. Un uso en autopista o con frío consume más que en ciudad con temperaturas suaves.",
      },
      {
        title: "Potencia de carga",
        text: "Un enchufe doméstico a 10 A entrega unos 2,3 kW y un punto de 32 A monofásico unos 7,4 kW. La potencia cambia el tiempo de carga y la potencia contratada que necesitas, no tanto los kWh totales.",
      },
      {
        title: "Precio y horario",
        text: "El mismo kWh puede costar distinto según el periodo horario de tu contrato. Introduce el precio del periodo en el que cargas realmente.",
      },
    ],
    sourceTitle:
      "BOE — Real Decreto 1053/2014, ITC-BT-52 de infraestructura para la recarga de vehículos eléctricos",
    sourceUrl: "https://www.boe.es/eli/es/rd/2014/12/12/1053",
    measurement:
      "Anota los kWh de varias recargas completas en el punto de recarga o en el contador y usa su media como kWh por ciclo.",
    cycleNote:
      "Aquí un ciclo es una recarga: multiplicamos los kWh medidos en la toma en cada recarga por las recargas del mes. Si conoces tus kilómetros, también puedes estimar los kWh mensuales como kilómetros × kWh/100 km ÷ 100 y sumar las pérdidas de carga.",
    showLabelGuide: false,
  },
  {
    slug: "placa-de-induccion",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Placa de inducción",
    articleName: "una placa de inducción",
    seoTitle: "Cuánto consume una placa de inducción: coste",
    category: "Cocina",
    calculation: {
      method: "power",
      watts: 1500,
      hoursPerDay: 1,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste de cocinar a diario sin confundir la potencia máxima de la placa con su consumo real.",
    intro:
      "La placa de inducción calienta directamente el recipiente mediante un campo magnético, por lo que pierde menos calor en la propia superficie. Su potencia total puede superar los 7 kW, pero rara vez se usan todas las zonas al máximo: el gasto real depende del nivel medio y del tiempo de cocción.",
    range:
      "La potencia máxima de cada zona y de la placa completa aparece en la placa de características y en el manual. El consumo medio de cada receta solo se conoce midiendo.",
    caveat:
      "El ejemplo educativo editable supone una potencia media de 1.500 W durante una hora diaria. Hervir a máxima potencia y luego mantener a fuego bajo puede consumir más o menos que ese promedio.",
    tips: [
      "Tapa las ollas: alcanzan antes la ebullición y necesitan menos potencia para mantenerla.",
      "Usa recipientes con base plana y del tamaño de la zona para no desaprovechar potencia.",
      "Baja el nivel en cuanto hierva y aprovecha el calor residual del recipiente en los últimos minutos.",
    ],
    factors: [
      {
        title: "Nivel y modulación",
        text: "La placa regula la potencia entregada según el nivel elegido; mantener un guiso a fuego bajo consume mucho menos por hora que hervir agua.",
      },
      {
        title: "Recipientes",
        text: "Un fondo deformado o pequeño respecto a la zona reduce el acoplamiento y alarga el tiempo de cocción.",
      },
      {
        title: "Potencia contratada",
        text: "Varias zonas a máxima potencia junto al horno o el termo pueden superar la potencia contratada; muchas placas permiten limitar su potencia total.",
      },
    ],
    sourceTitle: "Comisión Europea — Placas de cocción",
    sourceUrl: "https://energy-efficient-products.ec.europa.eu/product-list/hobs_en",
  },
  {
    slug: "cafetera",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Cafetera eléctrica",
    articleName: "una cafetera eléctrica",
    seoTitle: "Cuánto consume una cafetera: coste por café",
    category: "Cocina",
    calculation: {
      method: "power",
      watts: 1400,
      hoursPerDay: 0.1,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula cuánto cuesta cada café y cuánto se va en mantenerla caliente o en espera.",
    intro:
      "Una cafetera de cápsulas o espresso necesita mucha potencia durante poco tiempo para calentar el agua. Lo que puede encarecer su consumo no es el café en sí, sino el tiempo que permanece caliente, la placa calefactora de una cafetera de goteo o una espera prolongada.",
    range:
      "Consulta la potencia en la base o el manual. El tiempo de calentamiento y de apagado automático suele venir descrito en las instrucciones.",
    caveat:
      "El ejemplo educativo editable supone 1.400 W durante seis minutos de resistencia encendida al día. Una cafetera que se mantiene caliente durante horas o una de goteo con placa calefactora pueden consumir bastante más.",
    tips: [
      "Activa el apagado automático más corto que permita tu modelo.",
      "En cafeteras de goteo, pasa el café a un termo en lugar de dejarlo sobre la placa calefactora.",
      "Descalcifica según el manual: la cal en la resistencia alarga el calentamiento.",
    ],
    factors: [
      {
        title: "Tipo de cafetera",
        text: "Las de cápsulas y espresso calientan agua a demanda; las de goteo pueden mantener una placa encendida, y las superautomáticas pueden incluir ciclos de enjuague.",
      },
      {
        title: "Tiempo encendida",
        text: "Si la dejas encendida entre café y café, la resistencia vuelve a encenderse periódicamente para mantener la temperatura.",
      },
      {
        title: "Espera y apagado",
        text: "Los modos de espera consumen poco por hora, pero se acumulan durante todo el año si la cafetera no se apaga del todo.",
      },
    ],
    sourceTitle: "EUR-Lex — Reglamento (UE) 2023/826 sobre modos de bajo consumo",
    sourceUrl:
      "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R0826",
  },
  {
    slug: "hervidor-de-agua",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Hervidor de agua",
    articleName: "un hervidor de agua",
    seoTitle: "Cuánto consume un hervidor de agua: coste",
    category: "Cocina",
    calculation: {
      method: "power",
      watts: 2000,
      hoursPerDay: 0.1,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula cuánto cuesta hervir un litro y por qué la cantidad de agua importa más que la potencia.",
    intro:
      "Un hervidor tiene mucha potencia, pero funciona pocos minutos y se apaga solo al hervir. La energía que necesita depende sobre todo de cuánta agua calientas y de su temperatura inicial: calentar el doble de agua requiere aproximadamente el doble de energía, sea cual sea la potencia del aparato.",
    range:
      "Consulta la potencia en la base o el manual. Un hervidor más potente tarda menos, pero la energía para calentar la misma agua es muy parecida.",
    caveat:
      "El ejemplo educativo editable supone 2.000 W durante seis minutos al día. Hervir solo la cantidad necesaria puede reducir mucho ese tiempo.",
    tips: [
      "Calienta solo el agua que vas a usar: el indicador de nivel ayuda a no llenar de más.",
      "Descalcifica el hervidor cuando aparezca cal en la resistencia o la base.",
      "Si necesitas agua a 70-80 °C para infusiones, usa un modelo con temperatura regulable en lugar de hervir y esperar.",
    ],
    factors: [
      {
        title: "Cantidad de agua",
        text: "Es el factor principal: un litro necesita aproximadamente el doble de energía que medio litro para el mismo salto de temperatura.",
      },
      {
        title: "Temperatura inicial y final",
        text: "En invierno el agua del grifo sale más fría y necesita más energía para llegar a ebullición.",
      },
      {
        title: "Cal y pérdidas",
        text: "La cal y un cuerpo poco aislado alargan el calentamiento y aumentan la energía perdida hacia el ambiente.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "plancha",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Plancha de ropa",
    articleName: "una plancha",
    seoTitle: "Cuánto consume una plancha de ropa: coste",
    category: "Hogar",
    calculation: {
      method: "power",
      watts: 2200,
      hoursPerDay: 1,
      daysPerMonth: 8,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula cuánto cuesta cada sesión de plancha y cómo reducirla sin renunciar al resultado.",
    intro:
      "La plancha tiene una resistencia potente que se enciende y se apaga para mantener la temperatura elegida. Por eso consume menos que su potencia máxima durante toda la sesión, pero las sesiones largas y frecuentes se notan. Los centros de planchado añaden una caldera que también necesita calentarse.",
    range:
      "Consulta la potencia en la plancha o el manual; en un centro de planchado, revisa también la potencia de la caldera.",
    caveat:
      "El ejemplo educativo editable supone 2.200 W durante una hora, ocho días al mes, con la resistencia siempre encendida. Como el termostato corta a ratos, el consumo real suele ser menor.",
    tips: [
      "Plancha en una sola sesión semanal para calentar la plancha menos veces.",
      "Empieza por los tejidos que necesitan más temperatura y termina con los delicados usando el calor residual al apagarla.",
      "Centrifuga bien y tiende la ropa estirada para reducir arrugas y tiempo de plancha.",
    ],
    factors: [
      {
        title: "Temperatura elegida",
        text: "Los tejidos que requieren más temperatura obligan a mantener la resistencia encendida durante más tiempo.",
      },
      {
        title: "Vapor y caldera",
        text: "Generar vapor exige calentar agua; un centro de planchado puede consumir más por sesión aunque planche más rápido.",
      },
      {
        title: "Duración de la sesión",
        text: "Los minutos de calentamiento inicial se repiten cada vez que enciendes la plancha; agrupar la ropa los reduce.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "secador-de-pelo",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Secador de pelo",
    articleName: "un secador de pelo",
    seoTitle: "Cuánto consume un secador de pelo: coste",
    category: "Hogar",
    calculation: {
      method: "power",
      watts: 2000,
      hoursPerDay: 0.15,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste de cada secado y cuánto cambia entre aire caliente, templado y frío.",
    intro:
      "Casi toda la potencia de un secador se va en la resistencia que calienta el aire; el motor consume una parte pequeña. Por eso el nivel de calor y los minutos de uso determinan el gasto. El secado en frío consume mucho menos, aunque suele tardar más.",
    range:
      "Consulta la potencia máxima en el mango o el manual; corresponde al nivel de calor más alto con la velocidad máxima.",
    caveat:
      "El ejemplo educativo editable supone 2.000 W durante nueve minutos al día. Los niveles templado y frío consumen menos que el máximo.",
    tips: [
      "Retira el exceso de agua con una toalla antes de usar el secador.",
      "Usa el calor máximo solo al principio y termina con un nivel templado o frío.",
      "Limpia la rejilla de entrada de aire: si se obstruye, el secador tarda más y puede sobrecalentarse.",
    ],
    factors: [
      {
        title: "Nivel de calor",
        text: "La resistencia es la parte de mayor consumo; bajar un nivel de calor reduce la potencia más que bajar la velocidad.",
      },
      {
        title: "Longitud y humedad del pelo",
        text: "Más agua que evaporar significa más minutos de secado y, por tanto, más energía.",
      },
      {
        title: "Concentrador y difusor",
        text: "Dirigir bien el flujo de aire puede acortar el secado sin necesidad de usar más calor.",
      },
    ],
    sourceTitle:
      "IDAE — Guía práctica de la energía (contexto de eficiencia; no origen del ejemplo)",
    sourceUrl:
      "https://www.idae.es/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
  },
  {
    slug: "aspiradora",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Aspiradora",
    articleName: "una aspiradora",
    seoTitle: "Cuánto consume una aspiradora: escoba y robot",
    category: "Hogar",
    calculation: {
      method: "power",
      watts: 700,
      hoursPerDay: 0.5,
      daysPerMonth: 8,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el gasto de una aspiradora de trineo, una escoba sin cable o un robot con su base.",
    intro:
      "Una aspiradora con cable consume mientras funciona; una escoba sin cable o un robot consumen al cargar la batería y, en el caso del robot, también la base mientras espera. En casi todos los hogares es un gasto pequeño, pero conviene calcularlo con el dato adecuado para cada tipo.",
    range:
      "En aspiradoras con cable, consulta la potencia nominal. En modelos con batería, multiplica la tensión (V) por la capacidad (Ah) para obtener los Wh por carga.",
    caveat:
      "El ejemplo educativo editable supone una aspiradora con cable de 700 W durante media hora, ocho días al mes. Para modelos con batería, introduce los Wh de una carga como consumo por ciclo.",
    tips: [
      "Vacía el depósito o cambia la bolsa a tiempo: un filtro saturado reduce la aspiración y alarga la limpieza.",
      "Usa la potencia máxima solo en alfombras; en suelos duros suele bastar un nivel inferior.",
      "Si tienes robot, mide también el consumo de la base en espera durante un día completo.",
    ],
    factors: [
      {
        title: "Tipo de aspiradora",
        text: "Con cable, el gasto depende de la potencia y el tiempo. Con batería, de los Wh de cada carga y de las pérdidas del cargador.",
      },
      {
        title: "Potencia frente a aspiración",
        text: "Más vatios no garantizan más capacidad de limpieza: el diseño del cepillo, los filtros y el flujo de aire influyen en el resultado.",
      },
      {
        title: "Espera de la base",
        text: "Una base de carga o de vaciado automático enchufada todo el día suma horas de consumo en espera.",
      },
    ],
    sourceTitle: "EUR-Lex — Reglamento (UE) 2023/826 sobre modos de bajo consumo",
    sourceUrl:
      "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R0826",
  },
  {
    slug: "bombilla-led",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Bombilla LED",
    articleName: "una bombilla LED",
    seoTitle: "Cuánto consume una bombilla LED: coste y ahorro",
    category: "Iluminación",
    calculation: {
      method: "power",
      watts: 8,
      hoursPerDay: 5,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula el coste de cada punto de luz y el ahorro real al sustituir una bombilla antigua comparando lúmenes.",
    intro:
      "La etiqueta energética de las fuentes de luz indica el consumo en kWh por cada 1.000 horas de uso, que en la práctica coincide con los vatios de la bombilla. Para comparar dos bombillas hay que fijarse en los lúmenes, que miden la luz emitida, y no en los vatios.",
    range:
      "Consulta los vatios y los lúmenes en el envase o en la etiqueta energética; la etiqueta enlaza con la base de datos europea EPREL mediante un código QR.",
    caveat:
      "El ejemplo educativo editable supone una bombilla de 8 W encendida cinco horas al día. Para toda la vivienda, suma los vatios de las bombillas que se encienden a la vez o calcula cada estancia por separado.",
    tips: [
      "Compara bombillas por lúmenes y elige la temperatura de color que necesites antes de fijarte en el precio.",
      "Sustituye primero las bombillas que más horas pasan encendidas: es donde el ahorro se nota antes.",
      "Apaga la luz al salir de una habitación: en las LED no hay un pico de arranque que lo desaconseje.",
    ],
    factors: [
      {
        title: "Horas de uso",
        text: "Una bombilla del salón encendida cinco horas al día gasta muchas veces más al año que la del trastero, aunque tengan la misma potencia.",
      },
      {
        title: "Lúmenes por vatio",
        text: "La eficacia luminosa indica cuánta luz da cada vatio; a igualdad de lúmenes, menos vatios significa menos consumo.",
      },
      {
        title: "Reguladores y equipos",
        text: "Las bombillas regulables, los transformadores o las tiras LED con fuente de alimentación pueden tener consumo adicional en espera.",
      },
    ],
    sourceTitle: "Comisión Europea — Fuentes de luz",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/product-list/light-sources_en",
  },
  {
    slug: "consola-videojuegos",
    indexable: true,
    updatedAt: "2026-10-11",
    name: "Consola de videojuegos",
    articleName: "una consola de videojuegos",
    seoTitle: "Cuánto consume una consola: jugando y en reposo",
    category: "Tecnología",
    calculation: {
      method: "power",
      watts: 150,
      hoursPerDay: 2,
      daysPerMonth: 30,
      pricePerKwh: DEFAULT_ELECTRICITY_PRICE,
    },
    shortDescription:
      "Calcula cuánto cuesta jugar y cuánto se va en el modo reposo con descargas activadas.",
    intro:
      "Una consola consume según lo que hace: un juego exigente, un menú, una película en streaming o el modo reposo con descargas y carga de mandos. Por eso conviene medirla en cada situación. El modo reposo consume poco por hora, pero puede estar activo casi todo el día.",
    range:
      "Consulta la potencia máxima en la fuente de alimentación o el manual; el consumo real jugando suele ser menor y varía según el juego.",
    caveat:
      "El ejemplo educativo editable supone 150 W durante dos horas diarias de juego. No incluye el televisor ni el consumo en reposo, que puedes calcular aparte con la calculadora de consumo fantasma.",
    tips: [
      "Revisa en los ajustes de energía si el modo reposo mantiene descargas, conexión o carga de mandos y desactiva lo que no necesites.",
      "Apaga la consola del todo si no vas a usarla en varios días.",
      "Mide con un medidor de enchufe jugando, en menús y en reposo para saber dónde está el gasto.",
    ],
    factors: [
      {
        title: "Tipo de juego y modo gráfico",
        text: "Los juegos exigentes y los modos de rendimiento suben la potencia frente a menús, juegos sencillos o reproducción de vídeo.",
      },
      {
        title: "Modo reposo",
        text: "Unos pocos vatios durante veinte horas al día pueden sumar una cantidad comparable a la de las horas de juego.",
      },
      {
        title: "Televisor y periféricos",
        text: "La pantalla, la barra de sonido o los mandos cargando forman parte del gasto real de una sesión de juego.",
      },
    ],
    sourceTitle: "EUR-Lex — Reglamento (UE) 2023/826 sobre modos de bajo consumo",
    sourceUrl:
      "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R0826",
  },
];

function buildAssumptionRationale(item: ApplianceSeed) {
  if (item.slug === "frigorifico") {
    return "Referencia histórica de contexto: 181 kWh/año es la media indicada por la Comisión Europea para frigoríficos-congeladores vendidos en 2020. No representa todos los modelos actuales; usa la etiqueta de tu aparato.";
  }

  if (item.slug === "congelador") {
    return "200 kWh/año es un escenario educativo redondo para mostrar la fórmula. No es un promedio oficial ni describe todos los congeladores; sustitúyelo por la etiqueta del modelo.";
  }

  if (item.slug === "coche-electrico") {
    return "30 kWh por recarga y seis recargas al mes forman un escenario educativo editable de unos 180 kWh mensuales medidos en la toma. No es un dato de fabricante: sustitúyelo por los kWh que registre tu punto de recarga o tu contador.";
  }

  if (item.labelKwhPer100Cycles !== undefined) {
    return `${item.labelKwhPer100Cycles.toLocaleString("es-ES")} kWh/100 ciclos es un escenario educativo editable. La fuente explica la unidad de etiqueta; el valor real debe copiarse de la etiqueta del modelo y programa correspondiente.`;
  }

  if (item.calculation.method === "power") {
    return `${item.calculation.watts.toLocaleString("es-ES")} W, ${item.calculation.hoursPerDay.toLocaleString("es-ES")} h/día y ${item.calculation.daysPerMonth.toLocaleString("es-ES")} días/mes forman un escenario educativo editable. La fuente aporta contexto o método, no certifica esas entradas para todos los modelos.`;
  }

  if (item.calculation.method === "cycle") {
    return `${item.calculation.kwhPerCycle.toLocaleString("es-ES")} kWh/ciclo y ${item.calculation.cycles.toLocaleString("es-ES")} ciclos/mes forman un escenario educativo editable. No es un dato de fabricante: sustitúyelo por la etiqueta o por una medición de una tarea comparable.`;
  }

  if (item.calculation.method === "annual") {
    return `${item.calculation.annualKwh.toLocaleString("es-ES")} kWh/año es un escenario educativo editable. Sustitúyelo por el consumo anual de la etiqueta del modelo.`;
  }

  return "Escenario educativo editable. Sustituye las entradas por datos de tu aparato y uso antes de tomar una decisión.";
}

const sourceByUrl = new Map<string, SourceReference>(
  Object.values(SOURCE_CATALOG).map((source) => [source.url, { ...source }]),
);

function buildSource(item: ApplianceSeed): SourceReference {
  const catalogSource = sourceByUrl.get(item.sourceUrl);
  if (catalogSource) {
    return catalogSource;
  }

  return {
    id: `appliance-${item.slug}`,
    title: item.sourceTitle,
    url: item.sourceUrl,
    kind: "official-guidance",
    scope:
      "Fuente de contexto enlazada por la guía; no acredita por sí sola el escenario educativo.",
    accessedAt: CONTENT_UPDATED_AT,
  };
}

function enrichAppliance(item: ApplianceSeed): Appliance {
  const result = calculateElectricity(item.calculation);

  if (!result.ok) {
    throw new Error(
      `No se puede publicar ${item.slug}: ${result.errors
        .map((entry) => `${entry.field}: ${entry.message}`)
        .join(", ")}`,
    );
  }

  return {
    ...item,
    exampleCost: result.value.cost.month,
    assumptionRationale: buildAssumptionRationale(item),
    exampleKind:
      item.slug === "frigorifico"
        ? "official-statistic"
        : "educational-example",
    reviewedAt: item.updatedAt ?? CONTENT_UPDATED_AT,
    sources: [buildSource(item)],
  };
}

export const appliances: Appliance[] = applianceSeeds.map(enrichAppliance);

function validateAppliances(items: Appliance[]) {
  const slugs = new Set<string>();

  for (const item of items) {
    if (slugs.has(item.slug)) {
      throw new Error(`Slug de aparato duplicado: ${item.slug}`);
    }
    slugs.add(item.slug);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) {
      throw new Error(`Slug de aparato inválido: ${item.slug}`);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.reviewedAt)) {
      throw new Error(`Fecha de revisión inválida para ${item.slug}`);
    }

    if (item.sources.length === 0) {
      throw new Error(`El aparato ${item.slug} no tiene fuentes`);
    }

    if (item.indexable && getApplianceFaqs(item.slug).length < 3) {
      throw new Error(
        `El aparato indexable ${item.slug} necesita al menos tres preguntas propias`,
      );
    }

    for (const source of item.sources) {
      if (new URL(source.url).protocol !== "https:") {
        throw new Error(`Fuente no HTTPS en ${item.slug}: ${source.url}`);
      }
    }
  }
}

validateAppliances(appliances);

export function getAppliance(slug: string) {
  return appliances.find((item) => item.slug === slug);
}
