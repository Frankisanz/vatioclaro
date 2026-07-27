import { CONTENT_UPDATED_AT } from "./site";

export const DEFAULT_ELECTRICITY_PRICE = 0.25;

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
  updatedAt?: string;
  measurement?: string;
  calculationMode?: "power" | "cycle";
  kwhPerCycle?: number;
  cyclesPerMonth?: number;
};

function monthlyCost(
  watts: number,
  hours: number,
  days: number,
  price = DEFAULT_ELECTRICITY_PRICE,
) {
  return (watts / 1000) * hours * days * price;
}

function monthlyCycleCost(
  kwhPerCycle: number,
  cycles: number,
  price = DEFAULT_ELECTRICITY_PRICE,
) {
  return kwhPerCycle * cycles * price;
}

export function getApplianceMonthlyKwh(item: Appliance) {
  if (item.calculationMode === "cycle" && item.kwhPerCycle && item.cyclesPerMonth) {
    return item.kwhPerCycle * item.cyclesPerMonth;
  }

  return (item.watts / 1000) * item.hours * item.days;
}

export function getApplianceUpdatedAt(item: Appliance) {
  return item.updatedAt ?? CONTENT_UPDATED_AT;
}

export function getRelatedAppliances(item: Appliance, limit = 3) {
  const sameCategory = appliances.filter(
    (candidate) => candidate.category === item.category && candidate.slug !== item.slug,
  );
  const otherGuides = appliances.filter(
    (candidate) => candidate.category !== item.category && candidate.slug !== item.slug,
  );

  return [...sameCategory, ...otherGuides].slice(0, limit);
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
    price: DEFAULT_ELECTRICITY_PRICE,
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
    price: DEFAULT_ELECTRICITY_PRICE,
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
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "horno",
    name: "Horno eléctrico",
    articleName: "un horno eléctrico",
    category: "Cocina",
    watts: 2200,
    hours: 0.75,
    days: 15,
    price: DEFAULT_ELECTRICITY_PRICE,
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
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "termo-electrico",
    name: "Termo eléctrico",
    articleName: "un termo eléctrico",
    category: "Agua caliente",
    watts: 1500,
    hours: 2,
    days: 30,
    price: DEFAULT_ELECTRICITY_PRICE,
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
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "ordenador",
    name: "Ordenador de sobremesa",
    articleName: "un ordenador de sobremesa",
    category: "Tecnología",
    watts: 250,
    hours: 8,
    days: 22,
    price: DEFAULT_ELECTRICITY_PRICE,
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
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "secadora",
    name: "Secadora",
    articleName: "una secadora",
    category: "Lavado",
    watts: 2500,
    hours: 1.5,
    days: 12,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCycleCost(1.4, 12),
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
    calculationMode: "cycle",
    kwhPerCycle: 1.4,
    cyclesPerMonth: 12,
    measurement:
      "En secadoras, usa preferentemente los kWh por ciclo o por 100 ciclos de la etiqueta energética de tu modelo.",
  },
  {
    slug: "router-wifi",
    name: "Router wifi",
    articleName: "un router wifi",
    category: "Tecnología",
    watts: 10,
    hours: 24,
    days: 30,
    price: DEFAULT_ELECTRICITY_PRICE,
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
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "frigorifico",
    name: "Frigorífico",
    articleName: "un frigorífico",
    category: "Cocina",
    watts: 70,
    hours: 8,
    days: 30,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(70, 8, 30),
    shortDescription:
      "Está encendido todo el año: entiende por qué la etiqueta en kWh/año es más útil que la potencia puntual.",
    intro:
      "Un frigorífico no mantiene el compresor funcionando de forma continua. Alterna periodos de marcha y pausa para conservar la temperatura, de modo que su consumo depende más de los kWh anuales de la etiqueta, la apertura de puertas y la temperatura ambiente que de un único valor de vatios.",
    range: "Consulta los kWh/año de la etiqueta energética; la potencia instantánea varía durante cada ciclo.",
    caveat:
      "La cifra del ejemplo representa horas equivalentes de funcionamiento, no que el compresor esté encendido ocho horas seguidas. Para comparar modelos, usa los kWh/año declarados en su etiqueta.",
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
    sourceTitle: "Comisión Europea — Etiqueta energética y ecodiseño",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en",
    measurement:
      "Para estimar tu modelo, divide los kWh/año de su etiqueta entre 12 y multiplícalos por el precio de tu electricidad.",
  },
  {
    slug: "lavadora",
    name: "Lavadora",
    articleName: "una lavadora",
    category: "Lavado",
    watts: 2000,
    hours: 1,
    days: 16,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCycleCost(0.6, 16),
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
    sourceTitle: "Comisión Europea — Etiqueta energética y ecodiseño",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en",
    calculationMode: "cycle",
    kwhPerCycle: 0.6,
    cyclesPerMonth: 16,
    measurement:
      "Divide los kWh por 100 ciclos que aparecen en la etiqueta entre 100 e introdúcelos como kWh por ciclo.",
  },
  {
    slug: "lavavajillas",
    name: "Lavavajillas",
    articleName: "un lavavajillas",
    category: "Cocina",
    watts: 1800,
    hours: 1.5,
    days: 16,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCycleCost(0.85, 16),
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
    sourceTitle: "Comisión Europea — Etiqueta energética y ecodiseño",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en",
    calculationMode: "cycle",
    kwhPerCycle: 0.85,
    cyclesPerMonth: 16,
    measurement:
      "Divide los kWh por 100 ciclos del programa Eco entre 100 e introdúcelos como kWh por ciclo.",
  },
  {
    slug: "vitroceramica",
    name: "Vitrocerámica o inducción",
    articleName: "una vitrocerámica o placa de inducción",
    category: "Cocina",
    watts: 1500,
    hours: 0.75,
    days: 20,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(1500, 0.75, 20),
    shortDescription:
      "La potencia es alta, pero cada zona regula: calcula el coste por uso y aprende qué cambia entre inducción y vitro.",
    intro:
      "Una placa puede alcanzar potencias elevadas, especialmente con la función de refuerzo, pero regula la entrega de energía al mantener el hervor. El recipiente, el tamaño de la zona y el tiempo efectivo de cocción pesan más que el máximo de vatios impreso en el manual.",
    range: "1.200–3.000 W por zona, según tamaño, nivel de potencia y función de refuerzo.",
    caveat:
      "El ejemplo supone una zona de 1.500 W durante 45 minutos al día. Si la resistencia o la inducción se regula durante la cocción, el consumo real será distinto.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "microondas",
    name: "Microondas",
    articleName: "un microondas",
    category: "Cocina",
    watts: 1000,
    hours: 0.25,
    days: 20,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(1000, 0.25, 20),
    shortDescription:
      "Tiene una potencia considerable, pero suele usarse pocos minutos: mira el coste por calentamiento y por mes.",
    intro:
      "El microondas concentra bastante potencia en sesiones cortas. Para recalentar o descongelar pequeñas cantidades puede ser una forma eficiente de aportar energía porque evita calentar una cavidad grande durante demasiado tiempo.",
    range: "700–1.200 W de potencia eléctrica aproximada, según modelo y modo de uso.",
    caveat:
      "Los minutos indicados en el panel no siempre se traducen en potencia máxima: los niveles bajos pueden alternar periodos de encendido y pausa.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "televisor",
    name: "Televisor",
    articleName: "un televisor",
    category: "Tecnología",
    watts: 100,
    hours: 4,
    days: 30,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(100, 4, 30),
    shortDescription:
      "Tamaño, brillo y horas de pantalla determinan el coste mucho más que el consumo en espera.",
    intro:
      "El consumo de un televisor cambia con el tamaño del panel, el brillo, el contenido mostrado y las horas de uso. En una pantalla moderna el gasto durante la reproducción suele pesar más que el modo de espera, aunque ambos se pueden comprobar en la ficha técnica.",
    range: "40–200 W durante el uso, según tamaño, tecnología, brillo y modo de imagen.",
    caveat:
      "El ejemplo usa 100 W durante cuatro horas al día. Un modelo grande con brillo alto, consola conectada o barra de sonido necesita un cálculo separado para cada equipo.",
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
    sourceTitle: "Comisión Europea — Etiqueta energética y ecodiseño",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en",
  },
  {
    slug: "calefactor-electrico",
    name: "Calefactor eléctrico",
    articleName: "un calefactor eléctrico",
    category: "Climatización",
    watts: 1500,
    hours: 4,
    days: 30,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(1500, 4, 30),
    shortDescription:
      "Es una forma rápida de calentar una estancia pequeña, pero sus horas de uso se traducen pronto en euros.",
    intro:
      "Los calefactores eléctricos de resistencia convierten casi toda la electricidad que consumen en calor en la estancia, pero no multiplican la energía: mantener varios kilovatios durante horas puede tener un coste elevado. El aislamiento y el termostato marcan cuánto tiempo necesita funcionar.",
    range: "1.000–2.000 W en muchos modelos domésticos mientras la resistencia está activa.",
    caveat:
      "El ejemplo presupone 1.500 W durante cuatro horas al día. Si el termostato corta con frecuencia o solo se usa de forma puntual, el consumo real será menor.",
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
    sourceTitle: "IDAE — Recomendaciones de ahorro energético",
    sourceUrl: "https://www.idae.es/",
  },
  {
    slug: "deshumidificador",
    name: "Deshumidificador",
    articleName: "un deshumidificador",
    category: "Climatización",
    watts: 250,
    hours: 8,
    days: 20,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(250, 8, 20),
    shortDescription:
      "Su coste depende de la humedad inicial, la temperatura y el ajuste de humedad que marques.",
    intro:
      "Un deshumidificador extrae agua del aire mediante un ciclo de refrigeración o, en equipos pequeños, con otros sistemas. No consume lo mismo todo el día: el higrostato debería detenerlo o reducir su trabajo al acercarse a la humedad objetivo.",
    range: "150–500 W mientras el compresor o el sistema de extracción está activo.",
    caveat:
      "El ejemplo supone 250 W durante ocho horas en veinte días. Un sótano húmedo, la ropa tendida dentro de casa o una temperatura baja pueden cambiar mucho el tiempo real de funcionamiento.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
  {
    slug: "aire-acondicionado-portatil",
    name: "Aire acondicionado portátil",
    articleName: "un aire acondicionado portátil",
    category: "Climatización",
    watts: 1200,
    hours: 4,
    days: 30,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(1200, 4, 30),
    shortDescription:
      "Entiende el coste por hora de un equipo portátil y por qué la evacuación del aire caliente importa tanto.",
    intro:
      "Un aire acondicionado portátil reúne el compresor en la propia habitación y expulsa calor mediante un tubo. La instalación de ese tubo, el sellado de la ventana y la carga térmica de la estancia pueden hacer que necesite más tiempo para lograr el mismo confort que un equipo fijo bien dimensionado.",
    range: "800–1.500 W de potencia eléctrica aproximada mientras el compresor funciona.",
    caveat:
      "El ejemplo usa 1.200 W durante cuatro horas al día. La potencia real y los ciclos del compresor cambian con el modelo, la temperatura exterior y el aislamiento.",
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
    sourceTitle: "OCU — Consejos sobre aire acondicionado",
    sourceUrl:
      "https://www.ocu.org/vivienda-y-energia/aire-acondicionado/consejos/consumo-aire-acondicionado",
  },
  {
    slug: "congelador",
    name: "Congelador",
    articleName: "un congelador",
    category: "Cocina",
    watts: 80,
    hours: 7,
    days: 30,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(80, 7, 30),
    shortDescription:
      "Al funcionar todo el año, su etiqueta en kWh/año es la mejor pista para estimar el coste mensual.",
    intro:
      "Como un frigorífico, un congelador alterna ciclos de compresor para mantener una temperatura baja. El consumo anual declarado en la etiqueta ofrece una comparación más fiable entre modelos que la potencia instantánea, que solo describe un momento de arranque o funcionamiento.",
    range: "Consulta los kWh/año de la etiqueta energética; el compresor no trabaja de manera constante.",
    caveat:
      "El ejemplo representa horas equivalentes de compresor, no un consumo continuo. La temperatura ambiente, la escarcha y las aperturas de puerta pueden modificar el resultado.",
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
    sourceTitle: "Comisión Europea — Etiqueta energética y ecodiseño",
    sourceUrl:
      "https://energy-efficient-products.ec.europa.eu/ecodesign-and-energy-label_en",
    measurement:
      "Divide los kWh/año de la etiqueta entre 12 y multiplícalos por el precio por kWh de tu factura.",
  },
  {
    slug: "freidora-de-aire",
    name: "Freidora de aire",
    articleName: "una freidora de aire",
    category: "Cocina",
    watts: 1500,
    hours: 0.4,
    days: 20,
    price: DEFAULT_ELECTRICITY_PRICE,
    exampleCost: monthlyCost(1500, 0.4, 20),
    shortDescription:
      "Calcula el coste por cocinado y compárala con un horno sin confundir potencia máxima con consumo total.",
    intro:
      "Una freidora de aire es un horno compacto con circulación de aire caliente. Puede tener una potencia alta, pero al calentar un volumen menor y durante menos tiempo puede reducir la energía total en algunas recetas. La comparación útil se hace por plato y tiempo de cocción, no solo por vatios.",
    range: "1.000–2.000 W de potencia nominal, según capacidad y programa.",
    caveat:
      "El ejemplo usa 1.500 W durante 24 minutos en veinte usos mensuales. El termostato puede alternar la resistencia y algunas recetas requieren precalentado o varias tandas.",
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
    sourceTitle: "IDAE — Estudio SPAHOUSEC III (2026)",
    sourceUrl:
      "https://informesweb.idae.es/descargas/20260123_SPAHOUSEC_III.pdf",
  },
];

export function getAppliance(slug: string) {
  return appliances.find((item) => item.slug === slug);
}
