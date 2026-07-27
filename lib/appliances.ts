export type Appliance = {
  slug: string;
  name: string;
  articleName: string;
  category: string;
  watts: number;
  hours: number;
  days: number;
  price: number;
  exampleCost: number;
  shortDescription: string;
  intro: string;
  range: string;
  caveat: string;
  tips: string[];
  factors: { title: string; text: string }[];
  sourceTitle: string;
  sourceUrl: string;
};

function monthlyCost(watts: number, hours: number, days: number, price = 0.3) {
  return (watts / 1000) * hours * days * price;
}

export const appliances: Appliance[] = [
  {
    slug: "aire-acondicionado",
    name: "Aire acondicionado",
    articleName: "un aire acondicionado",
    category: "Climatización",
    watts: 1000,
    hours: 4,
    days: 30,
    price: 0.3,
    exampleCost: monthlyCost(1000, 4, 30),
    shortDescription:
      "Calcula el coste por hora y entiende por qué un inverter no consume siempre lo mismo.",
    intro:
      "Un equipo doméstico puede moverse aproximadamente entre 500 y 1.500 W de potencia eléctrica mientras trabaja. En un aparato inverter el compresor regula, por lo que la potencia nominal no equivale a un consumo constante.",
    range: "500–1.500 W mientras funciona",
    caveat:
      "La temperatura exterior, el aislamiento, el tamaño de la estancia y la consigna del termostato pueden alterar mucho el resultado.",
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
    sourceTitle: "OCU — Cuánto consume el aire acondicionado",
    sourceUrl:
      "https://www.ocu.org/vivienda-y-energia/aire-acondicionado/consejos/consumo-aire-acondicionado",
  },
  {
    slug: "ventilador",
    name: "Ventilador",
    articleName: "un ventilador",
    category: "Climatización",
    watts: 50,
    hours: 8,
    days: 30,
    price: 0.3,
    exampleCost: monthlyCost(50, 8, 30),
    shortDescription:
      "Una alternativa de bajo consumo cuando mover el aire es suficiente para recuperar confort.",
    intro:
      "Un ventilador no enfría el aire: acelera la evaporación del sudor y mejora la sensación térmica. Su potencia suele ser mucho menor que la de un aire acondicionado, así que permite muchas horas de uso con un coste contenido.",
    range: "15–70 W en modelos domésticos eficientes",
    caveat:
      "La velocidad seleccionada, el tamaño, el motor y el uso de luz integrada cambian la potencia.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://www.idae.es/sites/default/files/documentos/publicaciones_idae/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "horno",
    name: "Horno eléctrico",
    articleName: "un horno eléctrico",
    category: "Cocina",
    watts: 2200,
    hours: 0.75,
    days: 15,
    price: 0.3,
    exampleCost: monthlyCost(2200, 0.75, 15),
    shortDescription:
      "Potencia alta, uso puntual: precalentado, temperatura y duración marcan la diferencia.",
    intro:
      "El horno tiene una potencia elevada, pero las resistencias se encienden y apagan para mantener la temperatura. Multiplicar toda la potencia por toda la duración suele dar una estimación conservadora.",
    range: "1.500–3.000 W de potencia nominal",
    caveat:
      "El termostato cicla las resistencias, así que un medidor de enchufe apto para esa potencia dará un consumo más real.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://www.idae.es/sites/default/files/documentos/publicaciones_idae/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "termo-electrico",
    name: "Termo eléctrico",
    articleName: "un termo eléctrico",
    category: "Agua caliente",
    watts: 1500,
    hours: 2,
    days: 30,
    price: 0.3,
    exampleCost: monthlyCost(1500, 2, 30),
    shortDescription:
      "Calcula el coste de calentar agua y separa el consumo útil de las pérdidas del depósito.",
    intro:
      "La resistencia de un termo suele trabajar a potencia completa hasta alcanzar la temperatura. Después se activa por intervalos para compensar las pérdidas de calor del depósito.",
    range: "1.200–2.500 W durante el calentamiento",
    caveat:
      "No está dos horas exactas cada día en todos los hogares: depende del volumen, el agua consumida, la temperatura de entrada y el aislamiento.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://www.idae.es/sites/default/files/documentos/publicaciones_idae/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "ordenador",
    name: "Ordenador de sobremesa",
    articleName: "un ordenador de sobremesa",
    category: "Tecnología",
    watts: 250,
    hours: 8,
    days: 22,
    price: 0.3,
    exampleCost: monthlyCost(250, 8, 22),
    shortDescription:
      "Ofimática, gaming o renderizado: la carga del equipo importa más que la potencia de la fuente.",
    intro:
      "Una fuente de alimentación de 750 W no significa que el ordenador consuma 750 W todo el tiempo. La demanda real cambia según procesador, gráfica, pantalla, periféricos y tipo de tarea.",
    range: "60–600 W según equipo y carga",
    caveat:
      "Para este aparato conviene medir en el enchufe o consultar sensores internos durante una sesión representativa.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://www.idae.es/sites/default/files/documentos/publicaciones_idae/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "secadora",
    name: "Secadora",
    articleName: "una secadora",
    category: "Lavado",
    watts: 2500,
    hours: 1.5,
    days: 12,
    price: 0.3,
    exampleCost: monthlyCost(2500, 1.5, 12),
    shortDescription:
      "Compara una resistencia tradicional con una bomba de calor y calcula por ciclos.",
    intro:
      "En una secadora importa más la energía por ciclo indicada en la etiqueta que la potencia máxima. Los modelos con bomba de calor suelen trabajar durante más tiempo, pero a menor temperatura y consumo.",
    range: "Consulta kWh/ciclo en la etiqueta energética",
    caveat:
      "La fórmula por potencia sobreestima muchos ciclos porque el calentador no permanece al máximo toda la sesión.",
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
    sourceTitle: "Comisión Europea — Etiquetado energético",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label/product-list/household-tumble-dryers_en",
  },
  {
    slug: "router-wifi",
    name: "Router wifi",
    articleName: "un router wifi",
    category: "Tecnología",
    watts: 10,
    hours: 24,
    days: 30,
    price: 0.3,
    exampleCost: monthlyCost(10, 24, 30),
    shortDescription:
      "Poca potencia, muchas horas: calcula lo que suma un dispositivo encendido todo el año.",
    intro:
      "El router tiene una potencia pequeña, pero normalmente funciona las 24 horas. Esa continuidad convierte unos pocos vatios en un consumo anual visible.",
    range: "6–20 W según modelo y funciones",
    caveat:
      "Los repetidores, sistemas mesh, decodificadores y equipos de red adicionales deben calcularse por separado.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://www.idae.es/sites/default/files/documentos/publicaciones_idae/20260123_SPAHOUSEC_III.pdf",
  },
];

export function getAppliance(slug: string) {
  return appliances.find((item) => item.slug === slug);
}
