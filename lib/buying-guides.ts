export type BuyingGuideFact = {
  label: string;
  value: string;
};

export type BuyingGuideCriterion = {
  title: string;
  text: string;
};

export type BuyingGuideProfile = {
  label: string;
  name: string;
  bestFor: string;
  summary: string;
  checks: string[];
  limitation: string;
  amazonQuery: string;
  source?: {
    title: string;
    url: string;
  };
};

export type BuyingGuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
};

export type BuyingGuideFaq = {
  question: string;
  answer: string;
};

export type BuyingGuideSource = {
  title: string;
  url: string;
};

export type BuyingGuideLink = {
  href: string;
  title: string;
};

export type BuyingGuide = {
  slug: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  updatedAt: string;
  intro: string;
  directAnswer: string;
  facts: BuyingGuideFact[];
  criteria: BuyingGuideCriterion[];
  profiles: BuyingGuideProfile[];
  sections: BuyingGuideSection[];
  faq: BuyingGuideFaq[];
  sources: BuyingGuideSource[];
  related: BuyingGuideLink[];
};

export const buyingGuides: BuyingGuide[] = [
  {
    slug: "medidores-consumo-electrico-enchufe",
    eyebrow: "Medición doméstica",
    title: "Medidores de consumo eléctrico de enchufe: cómo elegir",
    seoTitle: "Medidores de consumo eléctrico de enchufe: guía 2026",
    description:
      "Compara un vatímetro con pantalla, un enchufe con historial y un medidor avanzado. Aprende qué carga, precisión y datos debes comprobar antes de comprar.",
    updatedAt: "2026-07-29",
    intro:
      "Un medidor de enchufe permite observar la potencia instantánea y acumular kWh de un aparato conectado. Es útil para comprobar un frigorífico, un televisor, un ordenador o pequeños equipos, pero no sirve para instalaciones fijas ni debe usarse por encima de la carga admitida. La elección depende de si quieres una lectura puntual, historial en el móvil o integración domótica.",
    directAnswer:
      "Para una comprobación ocasional, elige un medidor con pantalla que muestre W y kWh acumulados. Si necesitas varios días de historial, busca una aplicación que conserve los datos y comprueba si permite exportarlos. Antes de conectar nada, revisa amperios, potencia máxima, uso interior y las limitaciones del aparato que vas a medir.",
    facts: [
      { label: "Dato imprescindible", value: "kWh acumulados" },
      { label: "Comprobación previa", value: "Carga máxima y tipo de aparato" },
      { label: "Para consumos variables", value: "Medir varios días completos" },
      { label: "No apto", value: "Circuitos fijos o conexión directa" },
    ],
    criteria: [
      {
        title: "Rango y carga admitida",
        text: "Compara los amperios y vatios que declara el fabricante con la etiqueta del aparato. La cifra máxima no convierte el medidor en adecuado para cualquier motor, compresor, calefactor o carga prolongada.",
      },
      {
        title: "W instantáneos y kWh acumulados",
        text: "Los vatios muestran una fotografía del momento; los kWh integran el consumo durante horas o días. Para estimar una factura interesa especialmente el acumulado.",
      },
      {
        title: "Memoria e historial",
        text: "Una pantalla puede bastar para una prueba puntual. Para comparar horarios o ciclos conviene que los datos persistan y que el fabricante explique dónde se guardan.",
      },
      {
        title: "Consumo bajo y documentación",
        text: "Si vas a medir standby, revisa el rango mínimo declarado. Prioriza manual, marcado, instrucciones de seguridad y especificaciones verificables frente a cifras sin contexto.",
      },
    ],
    profiles: [
      {
        label: "Lectura directa",
        name: "Brennenstuhl PM 231 E",
        bestFor: "Medir sin crear una cuenta ni depender de una aplicación",
        summary:
          "Muestra tensión, corriente, potencia, factor de potencia y kWh. El fabricante declara hasta 16 A y 3.600 W, dos tarifas configurables y memoria mediante pilas.",
        checks: [
          "Uso interior IP20 y enchufe accesible para leer la pantalla.",
          "La documentación declara un rango de potencia de 0,2 a 3.600 W.",
          "Los datos permanecen en el propio dispositivo y no se exportan.",
        ],
        limitation:
          "La pantalla y los botones son menos cómodos en tomas bajas o escondidas. Comprueba siempre la carga real y el manual del equipo conectado.",
        amazonQuery: "Brennenstuhl PM 231 E medidor consumo",
        source: {
          title: "Especificaciones oficiales de Brennenstuhl",
          url: "https://service.brennenstuhl.com/hc/es/articles/8867312023453--Cu%C3%A1les-son-las-caracter%C3%ADsticas-de-medici%C3%B3n-y-consumo-del-contador-de-energ%C3%ADa-PM-231-E-de-Primera-Line",
        },
      },
      {
        label: "Historial sencillo",
        name: "TP-Link Tapo P110",
        bestFor: "Consultar consumo en el móvil y programar encendidos",
        summary:
          "Combina monitorización energética, horarios y control remoto. La ficha española declara Wi‑Fi de 2,4 GHz, 16 A y 3.680 W como carga máxima.",
        checks: [
          "Necesita la aplicación y una red Wi‑Fi compatible.",
          "Permite observar potencia y consumo desde el ecosistema Tapo.",
          "Mantiene el botón físico para control manual.",
        ],
        limitation:
          "El límite máximo no garantiza compatibilidad con cualquier carga. Confirma también requisitos de privacidad, cuenta y conexión antes de elegirlo.",
        amazonQuery: "TP-Link Tapo P110 enchufe medidor consumo",
        source: {
          title: "Ficha oficial Tapo P110",
          url: "https://www.tapo.com/es/product/smart-plug/tapo-p110/",
        },
      },
      {
        label: "Medición avanzada",
        name: "Shelly Plug PM Gen3",
        bestFor: "Quien prioriza monitorización, alertas e integración local",
        summary:
          "Está orientado a medir cargas de forma continuada. Shelly declara medición en tiempo real, alertas de consumo y hasta 16 A o 3.680 W para carga resistiva.",
        checks: [
          "Este modelo PM está diseñado para medir y no incorpora relé de encendido.",
          "Ofrece Wi‑Fi, Bluetooth, interfaz y opciones de automatización.",
          "Distingue este modelo de otros Shelly Plug con límites distintos.",
        ],
        limitation:
          "No es la opción adecuada si necesitas cortar la alimentación desde la aplicación. Verifica el nombre exacto del modelo antes de comprar.",
        amazonQuery: "Shelly Plug PM Gen3 medidor consumo",
        source: {
          title: "Comparador oficial de enchufes Shelly",
          url: "https://www.shelly.com/pages/shelly-smart-plugs",
        },
      },
    ],
    sections: [
      {
        title: "Cómo medir para obtener un dato útil",
        paragraphs: [
          "Un aparato que regula su potencia no se entiende mirando unos segundos. Deja que complete ciclos representativos: un frigorífico necesita varios días; una lavadora, el programa completo; un ordenador, una sesión normal. Anota el tiempo exacto y usa los kWh acumulados.",
          "Reinicia la medición antes de cada prueba y evita cambiar hábitos a mitad del periodo. Después introduce los kWh y tu precio en la calculadora de VatioClaro. El medidor aporta el dato; la factura sigue siendo la referencia para el coste final.",
        ],
        bullets: [
          "Conecta únicamente equipos con enchufe compatibles con el medidor.",
          "No encadenes adaptadores ni regletas sin revisar sus límites.",
          "Mantén ventilación y acceso a la toma.",
          "Interrumpe la prueba ante calor, olor, ruido o daño visible.",
        ],
      },
      {
        title: "Cuándo no comprar un medidor de enchufe",
        paragraphs: [
          "No lo necesitas si la etiqueta energética ya ofrece un consumo por ciclo fiable y solo quieres comparar dos modelos. Tampoco solucionará una diferencia contractual, una lectura estimada o un error de facturación: en esos casos debes revisar recibo, contrato y datos de distribuidora.",
          "Una pinza amperimétrica o un medidor de cuadro puede cubrir más circuitos, pero su instalación y uso implican riesgos diferentes. No abras cuadros ni intervengas en cableado si no eres una persona cualificada.",
        ],
        callout:
          "Un medidor puede ayudarte a localizar consumo; no certifica la seguridad ni diagnostica por sí solo una avería.",
      },
      {
        title: "Nuestra metodología de selección",
        paragraphs: [
          "Comparamos funciones que pueden verificarse en documentación del fabricante: magnitudes mostradas, carga declarada, almacenamiento, control manual y conectividad. No usamos estrellas, precios ni posiciones de Amazon para ordenar los perfiles.",
          "Esta primera selección se basa en análisis documental, no en una prueba de laboratorio propia. Por eso mostramos limitaciones y enlazamos las fichas oficiales. Actualizaremos la guía cuando podamos realizar mediciones comparables con varios equipos.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Un medidor de 16 A sirve para cualquier electrodoméstico?",
        answer:
          "No. Debes comprobar potencia, tipo de carga, picos de arranque, uso continuado y límites indicados por ambos fabricantes. Una cifra máxima aislada no demuestra compatibilidad.",
      },
      {
        question: "¿Cuánto tiempo debo medir un frigorífico?",
        answer:
          "Varios días completos ofrecen una referencia más representativa que unas horas porque el compresor cicla y cambia con temperatura, aperturas y carga.",
      },
      {
        question: "¿Puedo medir un horno o un termo eléctrico?",
        answer:
          "Solo si el aparato utiliza un enchufe accesible, su fabricante lo permite y todos los límites son compatibles. Muchos hornos, termos y equipos de climatización tienen conexión fija: no deben adaptarse para esta prueba.",
      },
      {
        question: "¿El medidor calcula exactamente mi factura?",
        answer:
          "No. Mide energía del aparato. La factura puede incluir potencia, impuestos, servicios, periodos y precios distintos. Usa el kWh medido como una parte del cálculo.",
      },
    ],
    sources: [
      {
        title: "Brennenstuhl — especificaciones PM 231 E",
        url: "https://service.brennenstuhl.com/hc/es/articles/8867312023453--Cu%C3%A1les-son-las-caracter%C3%ADsticas-de-medici%C3%B3n-y-consumo-del-contador-de-energ%C3%ADa-PM-231-E-de-Primera-Line",
      },
      {
        title: "TP-Link — ficha Tapo P110",
        url: "https://www.tapo.com/es/product/smart-plug/tapo-p110/",
      },
      {
        title: "Shelly — comparación de enchufes con medición",
        url: "https://www.shelly.com/pages/shelly-smart-plugs",
      },
    ],
    related: [
      { href: "/calculadora", title: "Calcular el coste con los kWh medidos" },
      { href: "/guias/consumo-fantasma", title: "Comprobar el consumo en espera" },
      { href: "/metodologia", title: "Cómo construimos las estimaciones" },
    ],
  },
  {
    slug: "enchufes-inteligentes-medidor-consumo",
    eyebrow: "Control y automatización",
    title: "Enchufes inteligentes con medidor de consumo: qué comparar",
    seoTitle: "Enchufes inteligentes con medidor de consumo: guía",
    description:
      "Tapo P110, P110M y Shelly Plug S Gen3 comparados por medición, Matter, carga, funcionamiento local y límites. Elige sin pagar por funciones que no usarás.",
    updatedAt: "2026-07-29",
    intro:
      "Un enchufe inteligente con monitorización combina un medidor con un interruptor controlable. Puede registrar consumo, ejecutar horarios y cortar determinadas cargas, pero añade aplicación, conectividad y condiciones de compatibilidad. No debe elegirse únicamente por los amperios impresos en un anuncio.",
    directAnswer:
      "Elige primero por la función que necesitas: historial de consumo, programación sencilla o integración Matter y domótica local. Después verifica carga resistiva admitida, picos, Wi‑Fi, botón físico y qué ocurre si se pierde Internet. Para medir sin automatizar, un vatímetro convencional suele ser más simple.",
    facts: [
      { label: "Wi‑Fi habitual", value: "2,4 GHz" },
      { label: "Función clave", value: "Historial de energía, no solo W actuales" },
      { label: "Matter", value: "Compatibilidad; no garantiza medición en cada app" },
      { label: "Antes de comprar", value: "Carga, tamaño y dependencia de nube" },
    ],
    criteria: [
      {
        title: "Medición disponible en la app",
        text: "Comprueba si muestra potencia instantánea, kWh diarios y mensuales y si permite descargar datos. Algunas plataformas de terceros no exponen todas las métricas.",
      },
      {
        title: "Control local y manual",
        text: "Un botón físico y horarios almacenados en el dispositivo evitan depender totalmente del móvil. Revisa qué funciones continúan sin Internet.",
      },
      {
        title: "Ecosistema y Matter",
        text: "Matter facilita control entre plataformas compatibles, pero las funciones avanzadas pueden seguir en la aplicación del fabricante y requerir un controlador.",
      },
      {
        title: "Forma, temperatura y carga",
        text: "El cuerpo no debería bloquear tomas cercanas. Respeta el entorno de uso, la ventilación y los límites de corriente y potencia declarados.",
      },
    ],
    profiles: [
      {
        label: "Ecosistema sencillo",
        name: "TP-Link Tapo P110",
        bestFor: "Medición, horarios y control desde una aplicación conocida",
        summary:
          "Ofrece seguimiento energético, programación, temporizador y botón físico. Funciona sobre Wi‑Fi de 2,4 GHz y no necesita un concentrador Tapo.",
        checks: [
          "La ficha española declara 16 A y 3.680 W como máximo.",
          "Control por aplicación, Alexa y Google Assistant.",
          "No incorpora Matter; para ello existe el P110M.",
        ],
        limitation:
          "La cuenta y la aplicación forman parte del uso. Valora privacidad, soporte y permanencia del ecosistema además de las funciones visibles.",
        amazonQuery: "TP-Link Tapo P110 enchufe inteligente consumo",
        source: {
          title: "Ficha oficial Tapo P110",
          url: "https://www.tapo.com/es/product/smart-plug/tapo-p110/",
        },
      },
      {
        label: "Compatibilidad Matter",
        name: "TP-Link Tapo P110M",
        bestFor: "Integrarlo en Apple Home, Alexa, Google Home o SmartThings",
        summary:
          "Añade Matter a la monitorización de energía de Tapo. La ficha oficial distingue entre el control compatible y el detalle energético disponible en la aplicación.",
        checks: [
          "Para Matter se necesita un controlador de la plataforma elegida.",
          "Revisa qué datos de consumo muestra cada ecosistema.",
          "Mantiene horarios, control manual y funciones de seguridad declaradas.",
        ],
        limitation:
          "Matter no elimina todos los requisitos de la aplicación ni garantiza que cada plataforma muestre el mismo historial energético.",
        amazonQuery: "TP-Link Tapo P110M Matter medidor consumo",
        source: {
          title: "Ficha oficial Tapo P110M",
          url: "https://www.tapo.com/es/product/smart-plug/tapo-p110m/",
        },
      },
      {
        label: "Automatización flexible",
        name: "Shelly Plug S Gen3",
        bestFor: "Matter, acciones locales e integración domótica avanzada",
        summary:
          "Shelly declara medición, horarios, acciones locales, Matter y compatibilidad con varios sistemas. El modelo S Gen3 admite hasta 12 A o 2.500 W de carga resistiva.",
        checks: [
          "Su límite es distinto del Shelly Plug PM Gen3.",
          "Matter y scripting tienen condiciones de uso que conviene revisar.",
          "La aplicación en la nube es opcional para varias funciones locales.",
        ],
        limitation:
          "Requiere más atención a configuración y modelo exacto. No lo elijas por automatización avanzada si solo quieres leer kWh una vez.",
        amazonQuery: "Shelly Plug S Gen3 Matter enchufe",
        source: {
          title: "Ficha oficial Shelly Plug S Gen3",
          url: "https://www.shelly.com/products/shelly-plug-s-gen3",
        },
      },
    ],
    sections: [
      {
        title: "Enchufe inteligente o medidor con pantalla",
        paragraphs: [
          "El enchufe inteligente es útil cuando quieres conservar historial, programar un aparato compatible o revisar datos sin agacharte hasta la toma. A cambio, incorpora radio, software, cuenta y actualizaciones. El medidor con pantalla es más directo y puede funcionar sin servicios externos.",
          "No uses la automatización para encender equipos que requieran supervisión, una secuencia propia o confirmación manual. La posibilidad técnica de cortar corriente no convierte esa práctica en recomendable.",
        ],
      },
      {
        title: "Errores de compra frecuentes",
        paragraphs: [
          "No confundas control remoto con monitorización: muchos enchufes inteligentes no miden consumo. Tampoco supongas que «16 A» significa que acepta de forma indefinida cualquier calefactor o motor. Consulta carga resistiva, picos y manual.",
          "Comprueba dimensiones si usarás dos tomas contiguas y asegúrate de que existe un botón físico accesible. Si el objetivo es reducir standby, calcula primero el ahorro posible: a veces el consumo propio del enchufe y su precio superan durante años la energía evitada.",
        ],
        callout:
          "Automatizar puede aportar comodidad; el ahorro solo existe si reduce un consumo real y medido.",
      },
      {
        title: "Cómo hemos comparado los modelos",
        paragraphs: [
          "La selección representa tres necesidades y se apoya en fichas del fabricante. Comparamos medición, conectividad, control local, límites y dependencia del ecosistema. No reproducimos valoraciones ni descripciones de Amazon.",
          "No hemos sometido estos tres modelos a una prueba eléctrica propia equivalente. Antes de comprar, abre la documentación enlazada y comprueba que la versión disponible en España coincide con la ficha.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Necesitan Internet para seguir un horario?",
        answer:
          "Depende del modelo y de dónde se guarde la programación. Los fabricantes indican que algunas rutinas se ejecutan localmente, pero el control remoto y el historial pueden requerir conexión.",
      },
      {
        question: "¿Matter permite ver el consumo en cualquier aplicación?",
        answer:
          "No necesariamente. Matter mejora interoperabilidad, pero cada plataforma decide qué métricas muestra. Comprueba la aplicación concreta que utilizarás.",
      },
      {
        question: "¿Ahorran energía automáticamente?",
        answer:
          "No. Consumen una pequeña cantidad y solo ahorran si la medición o programación cambia un uso que realmente generaba un coste mayor.",
      },
      {
        question: "¿Puedo usarlos con calefacción o aire acondicionado?",
        answer:
          "Solo cuando ambos fabricantes lo permitan y la carga, el arranque y el modo de reanudación sean compatibles. Para instalaciones fijas necesitas una solución profesional distinta.",
      },
    ],
    sources: [
      {
        title: "TP-Link — Tapo P110",
        url: "https://www.tapo.com/es/product/smart-plug/tapo-p110/",
      },
      {
        title: "TP-Link — Tapo P110M",
        url: "https://www.tapo.com/es/product/smart-plug/tapo-p110m/",
      },
      {
        title: "Shelly — Plug S Gen3",
        url: "https://www.shelly.com/products/shelly-plug-s-gen3",
      },
    ],
    related: [
      {
        href: "/recomendaciones/medidores-consumo-electrico-enchufe",
        title: "Comparar con un medidor convencional",
      },
      { href: "/guias/consumo-fantasma", title: "Calcular si merece la pena cortar standby" },
      { href: "/consumo/router-wifi", title: "Cuánto consume un router encendido siempre" },
    ],
  },
  {
    slug: "temporizadores-regletas-consumo-fantasma",
    eyebrow: "Consumo en espera",
    title: "Temporizador o regleta con interruptor: qué conviene",
    seoTitle: "Temporizador o regleta para reducir consumo fantasma",
    description:
      "Elige entre temporizador mecánico, regleta desconectable y regleta inteligente según horario, carga, número de tomas y consumo fantasma medido.",
    updatedAt: "2026-07-29",
    intro:
      "Una regleta o un temporizador puede cortar varios consumos en espera, pero no todos los equipos deben desconectarse y no toda regleta protege frente a sobretensiones. La compra correcta empieza midiendo el grupo y definiendo si necesitas un horario repetido, un único interruptor o control independiente.",
    directAnswer:
      "Usa una regleta con interruptor para un grupo que puedas apagar manualmente; un temporizador para una rutina estable; y una regleta inteligente solo si necesitas control independiente o remoto. Comprueba potencia total, separación de tomas, protección infantil y que los equipos conectados toleren el corte.",
    facts: [
      { label: "Primero", value: "Mide el consumo conjunto" },
      { label: "Opción simple", value: "Interruptor físico visible" },
      { label: "Horario repetido", value: "Temporizador con anulación manual" },
      { label: "No confundir", value: "Interruptor no equivale a sobretensión" },
    ],
    criteria: [
      {
        title: "Potencia total del conjunto",
        text: "Suma las cargas que pueden funcionar a la vez y respeta el límite de regleta, temporizador, toma y circuito. Evita encadenar regletas.",
      },
      {
        title: "Intervalo y reserva manual",
        text: "En temporizadores revisa el intervalo mínimo y si puedes activar el equipo fuera del horario sin reprogramarlo.",
      },
      {
        title: "Número y separación de tomas",
        text: "Los adaptadores voluminosos pueden inutilizar tomas contiguas. El cable debe alcanzar sin quedar tirante, enrollado o en una zona de paso.",
      },
      {
        title: "Protección declarada",
        text: "Una luz o un interruptor no demuestran protección contra sobretensiones. Busca especificaciones y estado del protector cuando esa función sea necesaria.",
      },
    ],
    profiles: [
      {
        label: "Rutina fija",
        name: "Temporizador mecánico diario",
        bestFor: "Un horario que se repite cada día sin aplicación",
        summary:
          "Permite definir franjas mediante pestañas y suele incluir un selector de funcionamiento continuo. Es fácil de entender, pero ofrece intervalos menos precisos.",
        checks: [
          "Intervalo mínimo y número de franjas disponibles.",
          "Carga máxima y compatibilidad con el aparato.",
          "Selector manual accesible.",
        ],
        limitation:
          "Puede perder la referencia tras un corte y no distingue laborables de fin de semana. No es adecuado para equipos que no deban arrancar solos.",
        amazonQuery: "temporizador enchufe mecánico 16A",
      },
      {
        label: "Corte manual",
        name: "Regleta con interruptor individual",
        bestFor: "Apagar solo pantalla, altavoces o periféricos concretos",
        summary:
          "Los interruptores por toma evitan desconectar el equipo que debe permanecer activo. Busca una construcción documentada y espacio suficiente entre conectores.",
        checks: [
          "Interruptor general y controles individuales claramente identificados.",
          "Longitud y sección del cable declaradas.",
          "Protección infantil y número real de tomas utilizables.",
        ],
        limitation:
          "Exige crear el hábito de apagar. No presupongas protección contra sobretensiones si la ficha no la declara expresamente.",
        amazonQuery: "regleta interruptores individuales enchufes",
      },
      {
        label: "Control por zonas",
        name: "Regleta inteligente con control individual",
        bestFor: "Programar grupos distintos o controlar tomas a distancia",
        summary:
          "Añade horarios y control independiente. Puede ser útil en una zona de trabajo, siempre que la propia regleta y los adaptadores respeten las cargas.",
        checks: [
          "Qué tomas se controlan por separado y cuáles son siempre activas.",
          "Si incluye medición total o por toma; no debe darse por supuesto.",
          "Funcionamiento de los horarios sin conexión.",
        ],
        limitation:
          "Cuesta más, añade consumo propio y depende de software. Si un interruptor manual resuelve el problema, la opción inteligente puede no compensar.",
        amazonQuery: "regleta inteligente control individual medidor consumo",
      },
    ],
    sections: [
      {
        title: "Calcula primero el ahorro máximo posible",
        paragraphs: [
          "Mide el grupo durante varias horas en reposo y convierte el dato a un año. Diez vatios continuos equivalen a 87,6 kWh anuales; un vatio equivale a 8,76 kWh. Multiplica por tu precio y compáralo con el coste del dispositivo.",
          "Algunos equipos realizan actualizaciones, mantienen conectividad o protegen datos cuando están en espera. No desconectes router, alarma, grabadores, equipos médicos o almacenamiento sin conocer el efecto.",
        ],
      },
      {
        title: "Seguridad y colocación",
        paragraphs: [
          "No cubras la regleta, no la uses con daño visible y evita ambientes húmedos salvo que esté diseñada para ellos. Desenrolla el cable cuando corresponda y no superes la carga total aunque queden tomas libres.",
          "Las resistencias de gran potencia y ciertos motores merecen especial cautela. El hecho de que el enchufe encaje no demuestra que el conjunto sea adecuado para uso prolongado.",
        ],
        bullets: [
          "Nada de regletas conectadas a otras regletas.",
          "Mantén cable y conexiones fuera de zonas calientes.",
          "Comprueba periódicamente clavija, interruptores y carcasa.",
          "Ante calentamiento u olor, desconecta de forma segura y deja de usarla.",
        ],
      },
      {
        title: "Por qué no publicamos un ranking",
        paragraphs: [
          "La necesidad cambia según horario, carga y número de tomas. Por eso presentamos tres perfiles y una lista de comprobación en lugar de coronar un producto por popularidad.",
          "Los enlaces abren búsquedas relevantes en Amazon porque modelos y disponibilidad cambian. Verifica marca, documentación, vendedor y especificaciones antes de comprar.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Una regleta con interruptor protege de sobretensiones?",
        answer:
          "No necesariamente. Debe declararlo de forma expresa y documentar la protección. Un interruptor luminoso solo indica control de alimentación.",
      },
      {
        question: "¿Conviene apagar el router por la noche?",
        answer:
          "Depende de servicios, telefonía, alarmas, actualizaciones y necesidades de conectividad. Calcula el ahorro y comprueba las consecuencias antes de automatizarlo.",
      },
      {
        question: "¿Un temporizador digital es siempre mejor?",
        answer:
          "No. Ofrece más horarios y precisión, pero un modelo mecánico puede ser suficiente para una rutina diaria y más fácil de ajustar.",
      },
      {
        question: "¿Puedo conectar un calefactor a una regleta?",
        answer:
          "Solo si los fabricantes del calefactor y de la regleta lo permiten expresamente y se respetan todas las condiciones. La opción más prudente para cargas altas suele ser una toma de pared adecuada.",
      },
    ],
    sources: [
      {
        title: "IDAE — Guía práctica de la energía",
        url: "https://www.idae.es/publicaciones/guia-practica-de-la-energia-consumo-eficiente-y-responsable",
      },
      {
        title: "VatioClaro — metodología de cálculo",
        url: "/metodologia",
      },
    ],
    related: [
      { href: "/guias/consumo-fantasma", title: "Qué es realmente el consumo fantasma" },
      {
        href: "/recomendaciones/medidores-consumo-electrico-enchufe",
        title: "Medir antes de cortar",
      },
      { href: "/consumo/televisor", title: "Calcular el consumo del televisor" },
    ],
  },
  {
    slug: "termohigrometros-casa",
    eyebrow: "Temperatura y humedad",
    title: "Termohigrómetros para casa: cómo elegir y dónde colocarlos",
    seoTitle: "Termohigrómetros para casa: guía para elegir uno",
    description:
      "Compara termohigrómetros con pantalla, Bluetooth y alertas remotas. Aprende a valorar tolerancia, historial, calibración y ubicación.",
    updatedAt: "2026-07-29",
    intro:
      "Medir temperatura y humedad ayuda a entender si la sensación de confort cambia por el ambiente antes de ajustar calefacción, ventilación o deshumidificación. Un sensor sencillo responde qué ocurre ahora; uno con historial muestra patrones; y uno conectado puede avisar a distancia.",
    directAnswer:
      "Para una sola habitación, una pantalla clara y tolerancias documentadas suelen bastar. Elige Bluetooth si quieres descargar un historial cerca del sensor y un sistema con hub si necesitas alertas fuera de casa. Colócalo lejos de sol, radiadores, ventanas y corrientes directas.",
    facts: [
      { label: "Compra básica", value: "Pantalla + tolerancia declarada" },
      { label: "Para patrones", value: "Historial y exportación" },
      { label: "Alertas remotas", value: "Normalmente requieren hub o Wi‑Fi" },
      { label: "Ubicación", value: "Lejos de fuentes directas de calor o humedad" },
    ],
    criteria: [
      {
        title: "Tolerancia declarada",
        text: "La resolución de una pantalla no equivale a exactitud. Busca el margen que declara el fabricante para temperatura y humedad en el rango de uso.",
      },
      {
        title: "Historial y exportación",
        text: "Para detectar patrones interesa ver horas o días y, si vas a analizar datos, exportarlos. Revisa cuánto historial permanece sin sincronizar.",
      },
      {
        title: "Pantalla y actualización",
        text: "Una lectura grande evita abrir la aplicación. El intervalo de actualización influye en cómo se observan cambios rápidos, aunque para confort doméstico no siempre necesitas segundos.",
      },
      {
        title: "Conectividad y batería",
        text: "Bluetooth limita la consulta a la proximidad. Las alertas remotas suelen necesitar pasarela, cuenta o nube. Incluye ese coste y mantenimiento en la decisión.",
      },
    ],
    profiles: [
      {
        label: "Lectura local",
        name: "TempPro TP49",
        bestFor: "Una habitación sin aplicación ni historial",
        summary:
          "Pantalla LCD con indicador de confort, soporte, imán y colgador. El fabricante declara actualización cada diez segundos y tolerancias diferenciadas por rango.",
        checks: [
          "No incluye registro ni avisos remotos.",
          "Utiliza una pila AAA reemplazable.",
          "Adecuado cuando importa una lectura visible y sencilla.",
        ],
        limitation:
          "No permite reconstruir qué ocurrió durante la noche o cuando no estabas. Para patrones necesitas anotar lecturas o elegir un modelo con memoria.",
        amazonQuery: "ThermoPro TempPro TP49 termómetro higrómetro",
        source: {
          title: "Ficha oficial TempPro TP49",
          url: "https://temppro.com/products/tp49b-indoor-thermometer-hygrometer",
        },
      },
      {
        label: "Historial Bluetooth",
        name: "Govee H5075",
        bestFor: "Consultar gráficos y exportar datos al acercarte con el móvil",
        summary:
          "Incluye pantalla y aplicación Bluetooth. Govee declara almacenamiento, exportación CSV y alertas en la aplicación dentro del alcance compatible.",
        checks: [
          "El modelo H5075 no incorpora Wi‑Fi por sí solo.",
          "La distancia real depende de paredes e interferencias.",
          "Revisa permisos, cuenta y conservación de datos de la aplicación.",
        ],
        limitation:
          "Una alerta Bluetooth no equivale a una notificación remota permanente. Para acceso fuera de casa se necesita una solución adicional compatible.",
        amazonQuery: "Govee H5075 termómetro higrómetro Bluetooth",
        source: {
          title: "Ficha oficial Govee H5075",
          url: "https://us.govee.com/products/govee-bluetooth-hygrometer-thermometer-h5075",
        },
      },
      {
        label: "Alertas y automatización",
        name: "Tapo T315 con hub compatible",
        bestFor: "Historial, alertas remotas e integración en el ecosistema Tapo",
        summary:
          "Sensor con pantalla e‑ink. Tapo declara historial, exportación y automatizaciones; las funciones inteligentes requieren un hub Tapo compatible.",
        checks: [
          "Incluye el coste del hub si todavía no lo tienes.",
          "La ficha declara ±0,3 °C y ±3 % HR.",
          "Comprueba región y compatibilidad de la banda Sub‑1G.",
        ],
        limitation:
          "Es una solución de ecosistema y no la compra más simple para mirar una habitación. Las alertas y automatizaciones dependen de componentes adicionales.",
        amazonQuery: "Tapo T315 H100 sensor temperatura humedad",
        source: {
          title: "Ficha oficial Tapo T315",
          url: "https://www.tapo.com/es/product/smart-sensor/tapo-t315/",
        },
      },
    ],
    sections: [
      {
        title: "Dónde colocarlo para no falsear la lectura",
        paragraphs: [
          "Evita sol directo, radiadores, salidas de aire, cocina, ducha y contacto con paredes muy frías si buscas representar la zona ocupada. Colócalo a una altura razonable, con aire alrededor, y deja que se estabilice después de moverlo.",
          "Dos sensores próximos pueden discrepar dentro de sus tolerancias. Para decisiones domésticas importa más observar una tendencia consistente que perseguir una décima aislada.",
        ],
      },
      {
        title: "Qué puede decirte y qué no",
        paragraphs: [
          "El historial permite relacionar humedad y temperatura con duchas, ventilación, secado de ropa o climatización. Puede ayudarte a decidir cuándo medir más o revisar hábitos.",
          "No identifica por sí solo moho, infiltraciones, calidad del aire ni una causa médica. Si existe condensación persistente, daño, olor o síntomas, la lectura es solo una pista y puede hacer falta una evaluación profesional.",
        ],
        callout:
          "Un termohigrómetro describe el ambiente en su ubicación; no diagnostica el edificio ni la salud.",
      },
      {
        title: "Cómo hemos elegido los perfiles",
        paragraphs: [
          "Representamos tres niveles: lectura local, historial cercano y alertas remotas. Comparamos tolerancia declarada, pantalla, exportación y requisitos adicionales.",
          "La información procede de fichas de fabricante y no de valoraciones de tienda. No hemos calibrado estos modelos conjuntamente en una cámara controlada.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Necesito Wi‑Fi para medir temperatura y humedad?",
        answer:
          "No. Un sensor con pantalla mide localmente. Wi‑Fi o un hub son útiles para consultar datos y recibir alertas desde fuera de casa.",
      },
      {
        question: "¿Por qué dos higrómetros dan valores diferentes?",
        answer:
          "Pueden estar dentro de sus tolerancias, actualizar a ritmos distintos o recibir aire y calor diferentes. Déjalos estabilizar juntos antes de comparar.",
      },
      {
        question: "¿Debo colocarlo junto a la ventana?",
        answer:
          "No si quieres representar la habitación: el cristal, el sol, la pared exterior y las corrientes pueden sesgar la lectura. Busca una zona interior representativa.",
      },
      {
        question: "¿Puede encender automáticamente un deshumidificador?",
        answer:
          "Algunos ecosistemas permiten automatizaciones, pero el aparato debe ser compatible con el corte y reanudación de corriente y todos los límites deben respetarse.",
      },
    ],
    sources: [
      {
        title: "TempPro — TP49",
        url: "https://temppro.com/products/tp49b-indoor-thermometer-hygrometer",
      },
      {
        title: "Govee — H5075",
        url: "https://us.govee.com/products/govee-bluetooth-hygrometer-thermometer-h5075",
      },
      {
        title: "TP-Link — Tapo T315",
        url: "https://www.tapo.com/es/product/smart-sensor/tapo-t315/",
      },
    ],
    related: [
      { href: "/consumo/deshumidificador", title: "Cuánto consume un deshumidificador" },
      { href: "/consumo/aire-acondicionado", title: "Estimar el coste del aire acondicionado" },
      { href: "/consumo/calefactor-electrico", title: "Calcular el coste de un calefactor" },
    ],
  },
  {
    slug: "termometros-frigorifico-congelador",
    eyebrow: "Conservación y diagnóstico",
    title: "Termómetros para frigorífico y congelador: tipos y alarmas",
    seoTitle: "Termómetro para frigorífico y congelador: cómo elegir",
    description:
      "Compara termómetros colgantes, digitales y con sonda para frigorífico o congelador. Revisa rango, alarma, memoria y colocación antes de comprar.",
    updatedAt: "2026-07-29",
    intro:
      "La rueda del frigorífico no indica necesariamente grados. Un termómetro independiente ayuda a comprobar estabilidad, detectar cambios y ajustar con más criterio. Para el congelador, el rango y la resistencia al frío son especialmente importantes.",
    directAnswer:
      "Elige un modelo colgante para una lectura económica, uno digital con mínimas y máximas para detectar variaciones y uno con sonda si necesitas ver la temperatura sin abrir. Comprueba que el rango incluya congelación, que la alarma pueda silenciarse y que el sensor esté destinado a ese entorno.",
    facts: [
      { label: "No confundir", value: "La rueda no suele indicar grados" },
      { label: "Para variaciones", value: "Memoria mínima y máxima" },
      { label: "Congelador", value: "Rango y batería aptos para frío" },
      { label: "Ubicación", value: "Zona central, sin tocar pared ni salida de aire" },
    ],
    criteria: [
      {
        title: "Rango de temperatura",
        text: "Un termómetro de habitación puede no estar especificado para congelación. Comprueba rango de sensor, pantalla y batería.",
      },
      {
        title: "Memoria y alarma",
        text: "Las mínimas y máximas muestran desviaciones entre consultas. Una alarma debe permitir configurar límites adecuados y distinguir sensor de pantalla.",
      },
      {
        title: "Lectura dentro o fuera",
        text: "Un modelo interior es simple; una sonda permite consultar sin abrir, pero exige pasar el cable sin dañar junta ni aislamiento.",
      },
      {
        title: "Limpieza y colocación",
        text: "Busca materiales adecuados, soporte estable y una pantalla legible. No debe interferir con alimentos, cajones, ventilación o cierre.",
      },
    ],
    profiles: [
      {
        label: "Comprobación económica",
        name: "Termómetro analógico colgante",
        bestFor: "Ver de un vistazo si la zona central está en rango",
        summary:
          "No necesita pila y puede moverse entre estantes. Conviene elegir una escala clara y un soporte que no bloquee la circulación de aire.",
        checks: [
          "Rango específico para frigorífico y congelador.",
          "Escala legible sin abrir demasiado tiempo.",
          "Construcción fácil de limpiar.",
        ],
        limitation:
          "No conserva máximas, mínimas ni avisa cuando la puerta queda abierta. La aguja tarda en estabilizarse.",
        amazonQuery: "termómetro frigorífico congelador analógico",
      },
      {
        label: "Historial básico",
        name: "Termómetro digital con mínima y máxima",
        bestFor: "Detectar variaciones durante varias horas",
        summary:
          "La memoria ayuda a ver si la temperatura se alejó del rango desde el último reinicio, aunque no indica exactamente a qué hora ocurrió.",
        checks: [
          "Rango declarado y comportamiento de la pantalla en frío.",
          "Botón de reinicio accesible.",
          "Tipo de pila y aviso de batería baja.",
        ],
        limitation:
          "Una mínima o máxima aislada puede deberse a aperturas o ciclos normales. Interpreta el patrón antes de concluir que existe una avería.",
        amazonQuery: "termómetro digital frigorífico congelador máxima mínima",
      },
      {
        label: "Aviso sin abrir",
        name: "Termómetro con sonda y alarma",
        bestFor: "Consultar desde el exterior y recibir un aviso local",
        summary:
          "Mantiene la pantalla fuera y el sensor dentro. Es útil cuando abrir la puerta altera la lectura, siempre que el cable pueda instalarse sin comprometer el cierre.",
        checks: [
          "Rango y precisión declarados para la sonda.",
          "Longitud, grosor y colocación segura del cable.",
          "Límites configurables y volumen de alarma.",
        ],
        limitation:
          "No aprisiones la sonda ni dañes la junta. Algunos modelos miden solo en un punto y no representan todo el compartimento.",
        amazonQuery: "termómetro frigorífico congelador sonda alarma",
      },
    ],
    sections: [
      {
        title: "Cómo realizar una comprobación representativa",
        paragraphs: [
          "Coloca el sensor en la zona central, sin contacto con pared, alimentos calientes o salida de aire. Espera varias horas y observa un ciclo completo antes de cambiar el ajuste.",
          "Repite después de estabilizar cada cambio. Abrir la puerta, cargar muchos alimentos o introducir recipientes templados puede alterar temporalmente la lectura.",
        ],
      },
      {
        title: "Cuándo revisar algo más que el ajuste",
        paragraphs: [
          "Si la temperatura es inestable, comprueba cierre, junta, ventilación exterior, hielo y carga siguiendo el manual. Un frigorífico encajonado o con condensador sucio puede trabajar más tiempo.",
          "Si no alcanza el rango, aparecen olores, ruido anormal, agua o alimentos comprometidos, prioriza seguridad alimentaria y servicio técnico. Un termómetro no identifica la pieza averiada.",
        ],
        callout:
          "No uses la lectura para declarar seguro un alimento dudoso; sigue las recomendaciones de conservación y descártalo cuando corresponda.",
      },
      {
        title: "Por qué recomendamos tipos y no un ganador",
        paragraphs: [
          "El producto adecuado cambia según quieras una lectura puntual, memoria o alarma exterior. La disponibilidad de modelos económicos cambia con frecuencia, por lo que enlazamos búsquedas por función.",
          "No mostramos precios ni valoraciones y no afirmamos una precisión que el fabricante no documente. Revisa la ficha y el manual del modelo concreto antes de comprar.",
        ],
      },
    ],
    faq: [
      {
        question: "¿La posición 3 de la rueda significa 3 °C?",
        answer:
          "Normalmente no. Suele ser un nivel de funcionamiento. Consulta el manual y utiliza un termómetro para relacionar el ajuste con la temperatura real.",
      },
      {
        question: "¿Puedo usar un termómetro de habitación?",
        answer:
          "Solo si su rango y especificaciones incluyen el entorno. Muchos no están diseñados para congelación, humedad o funcionamiento continuado dentro del aparato.",
      },
      {
        question: "¿Dónde se coloca en el frigorífico?",
        answer:
          "En una zona central y representativa, sin tocar pared, puerta, alimentos ni salida de aire. La ubicación exacta depende del diseño del equipo.",
      },
      {
        question: "¿Una lectura alta significa que está averiado?",
        answer:
          "No por sí sola. Puede deberse a apertura, carga, ajuste, ventilación o ciclo. Observa varias horas y sigue el procedimiento del fabricante.",
      },
    ],
    sources: [
      {
        title: "AESAN — seguridad alimentaria en el hogar",
        url: "https://www.aesan.gob.es/AECOSAN/web/para_el_consumidor/ampliacion/seguridad_alimentaria_hogar.htm",
      },
      {
        title: "VatioClaro — consumo del frigorífico",
        url: "/consumo/frigorifico",
      },
      {
        title: "VatioClaro — consumo del congelador",
        url: "/consumo/congelador",
      },
    ],
    related: [
      { href: "/consumo/frigorifico", title: "Cuánto consume un frigorífico" },
      { href: "/consumo/congelador", title: "Cuánto consume un congelador" },
      {
        href: "/recomendaciones/medidores-consumo-electrico-enchufe",
        title: "Medir el consumo durante varios días",
      },
    ],
  },
];

export function getBuyingGuide(slug: string) {
  return buyingGuides.find((guide) => guide.slug === slug);
}

const applianceGuideMap: Record<string, BuyingGuideLink> = {
  "aire-acondicionado": {
    href: "/recomendaciones/termohigrometros-casa",
    title: "Medir temperatura y humedad antes de ajustar la climatización",
  },
  "aire-acondicionado-portatil": {
    href: "/recomendaciones/termohigrometros-casa",
    title: "Elegir un termohigrómetro para comprobar el ambiente",
  },
  "calefactor-electrico": {
    href: "/recomendaciones/termohigrometros-casa",
    title: "Comprobar el ambiente antes de subir la calefacción",
  },
  deshumidificador: {
    href: "/recomendaciones/termohigrometros-casa",
    title: "Comparar termohigrómetros con y sin historial",
  },
  frigorifico: {
    href: "/recomendaciones/termometros-frigorifico-congelador",
    title: "Elegir un termómetro para comprobar el frigorífico",
  },
  congelador: {
    href: "/recomendaciones/termometros-frigorifico-congelador",
    title: "Elegir un termómetro con rango para congelador",
  },
  ordenador: {
    href: "/recomendaciones/temporizadores-regletas-consumo-fantasma",
    title: "Comparar regletas para una zona de trabajo",
  },
  "router-wifi": {
    href: "/recomendaciones/temporizadores-regletas-consumo-fantasma",
    title: "Calcular si compensa programar o desconectar el router",
  },
  televisor: {
    href: "/recomendaciones/temporizadores-regletas-consumo-fantasma",
    title: "Elegir una regleta para televisor y periféricos",
  },
  ventilador: {
    href: "/recomendaciones/medidores-consumo-electrico-enchufe",
    title: "Medir el consumo real del ventilador durante varios días",
  },
};

export function getBuyingGuideForAppliance(slug: string) {
  return applianceGuideMap[slug];
}
