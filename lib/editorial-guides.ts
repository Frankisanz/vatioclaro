export type EditorialQuickFact = {
  label: string;
  value: string;
};

export type EditorialSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
};

export type EditorialFaq = {
  question: string;
  answer: string;
};

export type EditorialSource = {
  title: string;
  url: string;
};

export type EditorialRelatedLink = {
  href: string;
  title: string;
};

export type EditorialGuide = {
  slug: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  updatedAt: string;
  intro: string;
  directAnswer: string;
  quickFacts: EditorialQuickFact[];
  sections: EditorialSection[];
  faq: EditorialFaq[];
  sources: EditorialSource[];
  related: EditorialRelatedLink[];
};

export const editorialGuides: EditorialGuide[] = [
  {
    slug: "por-que-ha-subido-factura-luz",
    eyebrow: "Diagnóstico de factura",
    title: "¿Por qué ha subido mi factura de la luz?",
    seoTitle: "Por qué ha subido tu factura de la luz: qué revisar",
    description:
      "Compara consumo, precio, periodo, potencia, lecturas y servicios para localizar por qué ha subido tu factura eléctrica y saber a quién reclamar.",
    updatedAt: "2026-07-29",
    intro:
      "Una factura más alta no demuestra por sí sola que el contador esté mal ni que hayas consumido mucho más. El total puede cambiar por los días facturados, el precio del contrato, servicios adicionales o la regularización de una lectura estimada. Para encontrar la causa, compara dos recibos equivalentes y separa cada componente.",
    directAnswer:
      "Empieza por cuatro datos: días facturados, kWh consumidos, coste de la energía y potencia contratada. Si suben los kWh, busca cambios de uso. Si son parecidos, revisa precio, descuentos, servicios, impuestos y regularizaciones. No cambies de tarifa hasta entender qué partida explica la diferencia.",
    quickFacts: [
      {
        label: "Primera comparación",
        value: "kWh al día, no solo el total del recibo",
      },
      {
        label: "Dato clave",
        value: "Lectura real o estimada",
      },
      {
        label: "Coste fijo",
        value: "La potencia se paga aunque consumas poco",
      },
      {
        label: "Si hay un error",
        value: "Factura: comercializadora; contador: distribuidora",
      },
    ],
    sections: [
      {
        title: "1. Compara periodos equivalentes",
        paragraphs: [
          "No compares únicamente el importe final. Una factura de treinta y cinco días puede ser mayor que otra de veintiocho aunque tu hogar se haya comportado igual. Divide los kWh entre los días del periodo para obtener un consumo diario comparable. Haz lo mismo con el importe de energía antes de impuestos si el recibo ofrece ese desglose.",
          "Compara también con el mismo mes del año anterior, porque climatización, horas de luz y temperatura del agua cambian con la estación. Si no tienes esa factura, usa dos periodos cercanos y anota cambios de ocupación, clima o equipamiento.",
        ],
        bullets: [
          "Número de días incluidos en cada recibo.",
          "Consumo total en kWh y consumo medio diario.",
          "Lecturas inicial y final del contador.",
          "Fecha de emisión frente a fechas reales de consumo.",
        ],
        callout:
          "Un total mayor con el mismo consumo diario puede deberse simplemente a que se han facturado más días.",
      },
      {
        title: "2. Separa consumo y precio",
        paragraphs: [
          "Los kWh indican cuánta energía has usado; el precio indica cuánto se cobra por cada unidad según tu contrato. Dos facturas con los mismos kWh pueden tener importes distintos. Busca el nombre de la oferta, la fecha de renovación y si el precio es fijo, por periodos o indexado. La herramienta oficial «Entiende tu factura», accesible desde el QR del recibo, ayuda a identificar estas condiciones.",
          "Comprueba si terminó un descuento o servicio bonificado y si la comercializadora comunicó una actualización. No juzgues una tarifa por un precio destacado: compara el coste anual con tu perfil, servicios, revisiones y permanencia.",
        ],
      },
      {
        title: "3. Revisa potencia, servicios y otros conceptos",
        paragraphs: [
          "La potencia contratada genera una parte fija que no depende de los kWh consumidos. En suministros domésticos puede haber una potencia para punta y otra para valle. Si se ha modificado alguna de ellas, o si la factura abarca más días, esa partida puede variar aunque el uso de electrodomésticos sea idéntico.",
          "Busca después mantenimiento, asistencia, seguros u otros productos, que deben aparecer separados. También pueden variar el alquiler del contador y los tributos. Compara cada línea con el recibo anterior y marca las que cambian.",
        ],
        bullets: [
          "Potencia punta y potencia valle.",
          "Servicios adicionales y descuentos asociados.",
          "Alquiler del contador.",
          "Impuestos y otros conceptos identificados en la factura.",
        ],
      },
      {
        title: "4. Comprueba si la lectura es real o estimada",
        paragraphs: [
          "Una lectura estimada puede alejarse del consumo real. Cuando llega una lectura válida, la distribuidora y la comercializadora regularizan la diferencia, lo que puede producir un recibo inusualmente alto o bajo. Verifica en la factura el tipo de lectura y contrasta los números con la pantalla del contador solo si puedes hacerlo de forma segura y siguiendo las indicaciones de tu distribuidora.",
          "Si la lectura parece incompatible con el contador, guarda una fotografía fechada sin manipularlo. Precio, contrato y factura corresponden normalmente a la comercializadora; lectura, medida y contador, a la distribuidora. Ambas deben figurar en el recibo.",
        ],
      },
      {
        title: "5. Busca cambios de consumo que pasan desapercibidos",
        paragraphs: [
          "Si el precio y los días son comparables pero aumentan los kWh, revisa primero los equipos de mucha potencia o muchas horas de uso. Un calefactor de resistencia, aire acondicionado, termo eléctrico, bomba de piscina o deshumidificador puede sumar más que decenas de cargadores. También influyen un frigorífico con mala ventilación, una puerta que no cierra bien o una consigna de climatización más exigente.",
          "Consulta la curva horaria de la distribuidora. Un consumo estable de madrugada apunta a cargas continuas; picos concretos pueden relacionarse con cocina, climatización o agua caliente. La curva orienta, pero no identifica por sí sola el aparato.",
        ],
        bullets: [
          "Anota aparatos nuevos, averías y cambios de horario.",
          "Compara días laborables con fines de semana.",
          "Mide en el enchufe solo equipos compatibles con el medidor.",
          "No intervengas en el contador ni en el cuadro si no estás cualificado.",
        ],
      },
      {
        title: "6. Si tienes placas solares, revisa también los excedentes",
        paragraphs: [
          "En autoconsumo, una factura puede aumentar aunque el consumo total de la vivienda no lo haga si has autoconsumido menos energía solar, has vertido menos excedentes o la compensación todavía no se ha aplicado correctamente. Compara energía tomada de la red, excedentes registrados y precio o condición de compensación, no solo la producción que muestra el inversor.",
          "La compensación simplificada no elimina necesariamente potencia, alquiler, impuestos u otros conceptos. Una batería virtual es un producto comercial distinto. Si falta la compensación, confirma que la instalación está activada y que la modalidad figura en el contrato.",
        ],
      },
      {
        title: "7. Usa una comprobación ordenada antes de reclamar",
        paragraphs: [
          "Descarga la factura actual y una comparable. Marca primero días y kWh; después precio de energía, potencia y extras; por último lectura y autoconsumo. Esta secuencia evita discutir sobre el total sin saber qué componente ha cambiado. Guarda capturas del contrato, comunicaciones de renovación y cualquier lectura que respalde tu revisión.",
          "Formula una pregunta concreta sobre precio, lectura, descuento o activación y solicita justificante de la gestión. No envíes la factura completa a terceros desconocidos: contiene CUPS, dirección y datos personales.",
        ],
      },
      {
        title: "8. A quién reclamar y qué documentación conservar",
        paragraphs: [
          "Dirige a la comercializadora las cuestiones de contrato, tarifa, servicios y facturación. Dirige a la distribuidora las incidencias de contador, lecturas, calidad o interrupciones. Si una empresa considera que corresponde a la otra, pide que identifique el motivo y el canal correcto. La CNMC publica orientación y listados, pero no resuelve reclamaciones individuales.",
          "Conserva facturas, contrato, lecturas y número de reclamación. Si la respuesta no es satisfactoria, consulta las vías de resolución alternativa y el organismo de consumo competente. Describe hechos comprobables sin atribuir una causa técnica no verificada.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Puede subir la factura aunque haya consumido los mismos kWh?",
        answer:
          "Sí. Puede cambiar el número de días, el precio contractual, la potencia, un descuento, un servicio adicional, los impuestos o una regularización. Compara cada partida y el coste medio, no solo el total.",
      },
      {
        question: "¿Una factura alta significa que el contador está averiado?",
        answer:
          "No. Primero contrasta lectura, periodo, curva de consumo y condiciones del contrato. Si la lectura no coincide o el patrón es imposible, contacta con la distribuidora y conserva evidencias sin manipular el equipo.",
      },
      {
        question: "¿Debo cambiar inmediatamente de compañía?",
        answer:
          "No antes de localizar la causa y revisar permanencia, servicios y fecha de renovación. El comparador oficial de la CNMC permite valorar ofertas con un perfil de consumo real.",
      },
      {
        question: "¿Por qué no aparece la compensación de mis placas?",
        answer:
          "Puede faltar la activación administrativa, el contrato de compensación o la recepción correcta de medidas. Revisa los datos del contrato y pregunta a comercializadora e instalador con fechas y documentación.",
      },
    ],
    sources: [
      {
        title: "CNMC — Entiende tu factura",
        url: "https://www.cnmc.es/prensa/entiende-tu-factura-20231002",
      },
      {
        title: "CNMC — Comercialización y suministro eléctrico",
        url: "https://www.cnmc.es/node/406175",
      },
      {
        title: "BOE — Modelo de factura para comercializadores de referencia",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-7120",
      },
    ],
    related: [
      {
        href: "/guias/como-entender-factura-luz",
        title: "Cómo entender cada apartado de la factura",
      },
      {
        href: "/guias/potencia-contratada",
        title: "Cómo elegir la potencia contratada",
      },
      {
        href: "/calculadora",
        title: "Calcular el coste de un consumo",
      },
    ],
  },
  {
    slug: "potencia-contratada",
    eyebrow: "Coste fijo y simultaneidad",
    title: "Qué potencia eléctrica contratar en casa",
    seoTitle: "Qué potencia contratar: guía para punta y valle",
    description:
      "Aprende a revisar tu potencia máxima demandada, estimar aparatos simultáneos y elegir potencias punta y valle sin promesas de ahorro ni cortes evitables.",
    updatedAt: "2026-07-29",
    intro:
      "La potencia contratada limita cuánta electricidad puedes demandar a la vez y forma parte del coste fijo. No equivale al consumo mensual: los kW describen capacidad instantánea y los kWh, energía acumulada. Para elegirla, observa usos simultáneos y máximos registrados, no una tabla genérica.",
    directAnswer:
      "Consulta en la factura o en el área de tu distribuidora la máxima potencia demandada durante el último año en punta y valle. Compárala con tus potencias contratadas y con los aparatos que realmente necesitas usar al mismo tiempo. Reduce solo si existe margen repetido, y conserva una reserva razonable para arranques, estacionalidad y cambios próximos.",
    quickFacts: [
      {
        label: "Potencia",
        value: "kW disponibles al mismo tiempo",
      },
      {
        label: "Consumo",
        value: "kWh acumulados durante un periodo",
      },
      {
        label: "Tarifa doméstica",
        value: "Puede tener potencia punta y valle distintas",
      },
      {
        label: "Mejor evidencia",
        value: "Máximos demandados de varios meses",
      },
    ],
    sections: [
      {
        title: "Potencia y consumo no son lo mismo",
        paragraphs: [
          "Un horno de alta potencia usado pocos minutos puede aportar menos kWh al mes que un equipo pequeño encendido todo el día. Sin embargo, el horno influye más en la potencia necesaria cuando coincide con vitrocerámica, termo o climatización. Por eso bajar el consumo no siempre permite bajar la potencia y, al revés, reducir potencia no reduce los kWh.",
          "La factura incluye términos relacionados con la potencia contratada para cada periodo. Esa parte se cobra durante los días del suministro aunque la vivienda esté vacía. Ajustarla puede reducir el coste fijo, pero una reducción excesiva puede provocar interrupciones del control de potencia cuando coinciden demasiadas cargas.",
        ],
        callout:
          "Los kW responden a «cuántas cosas a la vez»; los kWh, a «cuánto y durante cuánto tiempo».",
      },
      {
        title: "Localiza tus dos potencias y tus máximos",
        paragraphs: [
          "Busca en los datos del contrato las potencias de los periodos punta y valle. La regulación permite contratar valores distintos. La factura también debe ofrecer información sobre máximos demandados, y el área de cliente de la distribuidora puede mostrar curvas y registros con más detalle. Datadis facilita acceso autorizado a datos aportados por distribuidoras participantes.",
          "No tomes un único pico como referencia absoluta. Revisa varios meses e incluye invierno y verano si tienes climatización eléctrica. Un máximo aislado puede ser excepcional; una demanda cercana a la contratada cada mes indica menos margen.",
        ],
        bullets: [
          "Anota potencia contratada en punta y valle.",
          "Recoge máximos demandados de los últimos doce meses disponibles.",
          "Identifica el mes y la hora de los picos.",
          "Relaciona esos picos con hábitos o equipos estacionales.",
        ],
      },
      {
        title: "Calcula la simultaneidad real",
        paragraphs: [
          "Sumar todas las potencias de la vivienda suele sobredimensionar el resultado, porque rara vez funcionan todos los aparatos a máxima carga al mismo tiempo. En cambio, ignorar coincidencias habituales también falla. Construye escenas reales: preparar la cena, ducharse con termo, teletrabajar en verano o cargar un vehículo por la noche.",
          "Para cada escena, suma la potencia eléctrica de entrada de los equipos que pueden coincidir. No uses potencia térmica, frigorías, BTU ni la capacidad de una fuente de alimentación como si fueran consumo constante. Compresores, motores y resistencias regulan o ciclan; utiliza la placa, manual o una medición adecuada como orientación y compárala con el máximo real.",
        ],
        bullets: [
          "Cocina: placa, horno, lavavajillas y pequeños aparatos.",
          "Confort: climatización, calefactor o bomba de calor.",
          "Agua caliente: termo y horarios de recuperación.",
          "Movilidad: cargador y potencia configurada.",
        ],
      },
      {
        title: "Aprovecha punta y valle sin trasladar riesgos",
        paragraphs: [
          "Dos potencias permiten adaptar capacidad a horarios distintos. Una vivienda que concentra termo, lavadora o carga del vehículo en valle podría necesitar más capacidad en ese periodo y menos durante el resto. Pero la decisión depende del horario real de los equipos y de si se pueden programar de forma segura.",
          "No desplaces un aparato a la noche solo por la potencia si el fabricante desaconseja el funcionamiento sin supervisión o existe riesgo asociado. La eficiencia y la seguridad tienen prioridad. Tampoco asumas que valle significa siempre energía más barata: la potencia y el precio de la energía son componentes diferentes, y el contrato determina cómo se cobra cada kWh.",
        ],
      },
      {
        title: "Deja margen para arranques y cambios de uso",
        paragraphs: [
          "La máxima demandada es una base práctica, pero no una recomendación automática. Algunos equipos tienen picos de arranque, y los patrones futuros pueden cambiar. Antes de reducir, piensa si instalarás aire acondicionado, inducción, termo, secadora, aerotermia o un punto de recarga. También puede variar el número de ocupantes o el tiempo en casa.",
          "No existe un margen universal: depende de la estabilidad, la posibilidad de escalonar tareas y la tolerancia a interrupciones. Con equipos médicos, ascensores o necesidades especiales, solicita asesoramiento cualificado.",
        ],
      },
      {
        title: "Estima el ahorro sin prometer una cifra",
        paragraphs: [
          "Para estimar el efecto de una reducción, usa los precios de potencia que figuran en tu contrato o factura, los kW que retirarías y los días del año. Calcula por separado punta y valle, y añade los impuestos aplicables que la factura muestre. No uses un precio encontrado en un artículo como si fuera universal o permanente.",
          "Compara ese ahorro anual estimado con el coste administrativo del cambio y con el posible coste de recuperar potencia más adelante. Aumentar potencia puede requerir derechos, verificación o documentación de la instalación según el caso. Una reducción pequeña puede ser razonable si es estable; cambiar varias veces por una diferencia marginal puede no compensar.",
        ],
        callout:
          "Introduce en la calculadora los importes de tu propia factura: así el resultado es un escenario, no una promesa.",
      },
      {
        title: "Cómo solicitar una modificación",
        paragraphs: [
          "La modificación se solicita a la comercializadora, que tramita el cambio con la distribuidora. Confirma qué potencia quieres en cada periodo, qué coste tendrá la gestión, qué documentación se exige y cuándo será efectiva. Guarda la solicitud y comprueba el resultado en la siguiente factura.",
          "Antes de aceptar una recomendación telefónica, pide las condiciones por escrito. El cambio de potencia no obliga por sí mismo a contratar mantenimiento, seguros ni una nueva tarifa. Si también cambias de oferta, separa ambas decisiones para poder evaluar el coste de cada una y revisa cualquier permanencia.",
        ],
      },
      {
        title: "Método prudente en cinco pasos",
        paragraphs: [
          "Primero recopila máximos de un año. Segundo, identifica las escenas de mayor simultaneidad. Tercero, comprueba futuros aparatos y estacionalidad. Cuarto, simula el coste con datos de tu contrato. Quinto, elige valores con margen y solicita confirmación escrita. Si los datos son irregulares, observa más tiempo antes de reducir.",
          "Después del cambio, vigila máximos y posibles interrupciones durante varias semanas. Si el control actúa, no aumentes a ciegas: identifica qué combinación lo provocó y decide si puedes escalonar usos o necesitas recuperar capacidad. La potencia correcta es la que cubre necesidades reales con un coste fijo proporcionado.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Puedo tener una potencia distinta en punta y en valle?",
        answer:
          "Sí, en la tarifa doméstica 2.0TD se pueden contratar dos potencias. Su conveniencia depende de cuándo coinciden tus equipos, no solo de cuándo consumes más kWh.",
      },
      {
        question: "¿La máxima demandada indica exactamente qué debo contratar?",
        answer:
          "No. Es la mejor evidencia inicial, pero conviene revisar varios meses, picos de arranque, estacionalidad y necesidades futuras antes de elegir.",
      },
      {
        question: "¿Bajar la potencia reduce el consumo?",
        answer:
          "No reduce los kWh de los aparatos. Reduce capacidad simultánea y puede reducir una parte fija de la factura. El consumo se reduce cambiando horas, hábitos, equipos o demanda térmica.",
      },
      {
        question: "¿Qué ocurre si contrato demasiado poco?",
        answer:
          "En un suministro doméstico interrumpible, el control de potencia puede cortar temporalmente cuando la demanda supera el límite. Los casos no interrumpibles y potencias superiores tienen reglas diferentes.",
      },
    ],
    sources: [
      {
        title: "CNMC — La potencia contratada",
        url: "https://www.cnmc.es/sites/default/files/editor_contenidos/Energia/Consumidores/3.3.%20La%20potencia%20contratada.pdf",
      },
      {
        title: "CNMC — Comercialización y suministro eléctrico",
        url: "https://www.cnmc.es/node/406175",
      },
      {
        title: "Red Eléctrica — PVPC y periodos horarios",
        url: "https://www.ree.es/es/operacion/sistema-electrico/pvpc",
      },
    ],
    related: [
      {
        href: "/calculadora",
        title: "Calculadora de consumo eléctrico",
      },
      {
        href: "/guias/por-que-ha-subido-factura-luz",
        title: "Diagnosticar una factura más alta",
      },
      {
        href: "/consumo/electrodomesticos-que-mas-consumen",
        title: "Electrodomésticos que más consumen",
      },
    ],
  },
  {
    slug: "etiqueta-energetica-a-euros",
    eyebrow: "Compra informada",
    title: "Cómo convertir la etiqueta energética en euros",
    seoTitle: "Etiqueta energética: calcula el coste en euros",
    description:
      "Interpreta kWh al año o por 100 ciclos, usa el QR de EPREL y compara el coste de dos electrodomésticos con tus hábitos y precio de electricidad.",
    updatedAt: "2026-07-29",
    intro:
      "La letra de eficiencia es útil, pero no cuenta toda la historia. Dos electrodomésticos de la misma clase pueden tener distinto tamaño, capacidad y consumo declarado. Para estimar lo que pagarás necesitas localizar la unidad correcta de la etiqueta, adaptarla a tu uso y multiplicarla por el precio de energía de tu propio contrato. El resultado será una estimación comparable, no una garantía de consumo.",
    directAnswer:
      "Si la etiqueta muestra kWh al año, multiplícalos por tu precio efectivo por kWh. Si muestra kWh por 100 ciclos, divide entre 100, multiplica por los ciclos que haces al año y después por tu precio. Compara modelos de capacidad y función similares, y consulta el QR de EPREL para confirmar la ficha oficial.",
    quickFacts: [
      {
        label: "Frío",
        value: "Suele declararse en kWh al año",
      },
      {
        label: "Lavado",
        value: "Suele declararse en kWh por 100 ciclos",
      },
      {
        label: "QR",
        value: "Abre la ficha del modelo en EPREL",
      },
      {
        label: "Comparación justa",
        value: "Misma función, capacidad y programa",
      },
    ],
    sections: [
      {
        title: "Qué significa la escala de A a G",
        paragraphs: [
          "La etiqueta europea sitúa el producto en una clase de eficiencia dentro de su categoría. A representa mayor eficiencia y G menor, pero la letra no es una medida directa de euros. La clasificación se calcula con reglas y ensayos normalizados que dependen del tipo de producto. No compares la A de una lavadora con la A de un frigorífico.",
          "La escala se reajustó para varias familias y desaparecieron los antiguos signos «+». Por eso una etiqueta antigua A+++ y una nueva A no se pueden traducir letra por letra. Usa siempre el consumo numérico y confirma que ambos modelos pertenecen al mismo sistema de etiquetado.",
        ],
        callout:
          "La letra sirve para orientarse; los kWh permiten calcular y comparar.",
      },
      {
        title: "Identifica la unidad antes de calcular",
        paragraphs: [
          "Frigoríficos y congeladores suelen mostrar energía anual. Lavadoras y lavavajillas expresan el consumo ponderado por cien ciclos del programa de referencia. Una lavasecadora puede mostrar datos diferentes para lavado y para el ciclo completo. Televisores y pantallas emplean métricas asociadas a horas de uso y modos concretos.",
          "No conviertas «kWh por 100 ciclos» en consumo mensual dividiendo entre doce. Primero debes relacionarlo con tu número real de ciclos. Tampoco interpretes kW como kWh: la potencia máxima describe ritmo de uso de energía, mientras la etiqueta resume energía bajo un ensayo definido.",
        ],
        bullets: [
          "kWh/año: energía estimada para un año de referencia.",
          "kWh/100 ciclos: energía de cien ciclos normalizados.",
          "Litros/ciclo: agua, no electricidad.",
          "dB: ruido, no consumo energético.",
        ],
      },
      {
        title: "Fórmula para aparatos con consumo anual",
        paragraphs: [
          "Para un frigorífico, congelador u otro aparato con kWh/año, la fórmula base es consumo anual declarado multiplicado por el precio por kWh. Usa el precio de energía que aparece en tu contrato o calcula un coste efectivo coherente con tu tarifa. Si tienes varios precios horarios, una única cifra será necesariamente una simplificación.",
          "El ensayo permite comparar modelos, pero tu cocina puede ser más cálida, puedes abrir más la puerta o seleccionar otra temperatura. Presenta el resultado como escenario. Para obtener una referencia mensual divide el coste anual entre doce, sabiendo que el consumo real puede variar por estación y uso.",
        ],
        callout:
          "Coste anual estimado = kWh/año de la etiqueta × precio introducido por el usuario.",
      },
      {
        title: "Fórmula para lavadoras, lavavajillas y secadoras",
        paragraphs: [
          "Divide los kWh por cien ciclos entre cien para obtener la energía declarada por ciclo. Multiplica por los ciclos que realizas cada semana o mes y transforma ese hábito en una cifra anual. Finalmente multiplica por el precio por kWh. Mantén separado el consumo de agua si quieres comparar el coste total de uso.",
          "El resultado corresponde al programa de referencia de la etiqueta. Un programa rápido, intensivo, con mayor temperatura o una carga diferente puede comportarse de otra forma. El programa eco suele durar más porque reduce la potencia térmica y optimiza agua y energía; una mayor duración no implica automáticamente más consumo.",
        ],
        callout:
          "Coste anual estimado = (kWh/100 ciclos ÷ 100) × ciclos anuales × precio introducido.",
      },
      {
        title: "Cómo comparar dos modelos de forma justa",
        paragraphs: [
          "Compara capacidad semejante: un frigorífico mucho mayor puede consumir más kWh y aun así ser eficiente para su volumen. En lavado, revisa carga nominal, duración del programa, consumo de agua, centrifugado y ruido. Comprar capacidad que nunca usarás puede anular parte de la ventaja de una letra mejor.",
          "Calcula la diferencia anual de energía entre los modelos y multiplícala por tu precio. Después estima cuántos años usarías el aparato y valora precio de compra, reparabilidad, garantía y adecuación. No sumes un ahorro idéntico durante toda la vida útil sin reconocer que el precio de la energía y el uso pueden cambiar.",
        ],
        bullets: [
          "Misma familia y versión de etiqueta.",
          "Capacidad o tamaño comparable.",
          "Programa o condición de ensayo equivalente.",
          "Coste de compra, uso, agua y mantenimiento.",
        ],
      },
      {
        title: "Usa el QR y la base EPREL",
        paragraphs: [
          "Las etiquetas nuevas incluyen un código QR que abre la ficha del modelo en el Registro Europeo de Productos para el Etiquetado Energético, EPREL. Allí puedes comprobar identificador, clase, consumos y otros parámetros presentados por el proveedor conforme a las reglas aplicables. La referencia debe coincidir exactamente con el aparato anunciado.",
          "El QR es especialmente útil en compras por internet y cuando existen variantes con nombres parecidos. Si una tienda muestra una imagen genérica, solicita la etiqueta del modelo exacto. No compartas códigos QR de facturas eléctricas como si fueran etiquetas: contienen otra clase de información y pueden incorporar datos del contrato.",
        ],
      },
      {
        title: "Por qué tu consumo real puede diferir",
        paragraphs: [
          "Los ensayos normalizados crean una base común, no reproducen cada hogar. Temperatura ambiente, carga, programa, mantenimiento, ventilación, aperturas y antigüedad influyen. Un frigorífico junto al horno o sin espacio trasero puede trabajar más; una lavadora con programas calientes puede apartarse del valor eco.",
          "Para verificar un aparato enchufable se puede usar un medidor adecuado a su potencia y categoría durante un periodo representativo. No midas equipos cableados, de alta potencia o instalaciones fijas sin personal cualificado. Una medición de pocas horas tampoco debe extrapolarse a todo el año si el aparato cicla o cambia con la estación.",
        ],
      },
      {
        title: "Decide por coste de uso, no por eslóganes",
        paragraphs: [
          "Una clase eficiente puede ser una buena señal, pero el mejor aparato es el que cubre la necesidad sin sobredimensionarse. Un modelo grande, conectado y lleno de funciones puede gastar más energía total que uno sencillo de capacidad adecuada aunque su letra sea mejor. La etiqueta permite hacer visible ese matiz.",
          "Guarda una captura de la etiqueta y los supuestos de tu cálculo: ciclos, años, precio y capacidad. Así podrás actualizar el escenario si cambia tu uso. VatioClaro no necesita elegir una marca; su valor está en convertir datos verificables en una comparación transparente.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Una lavadora A siempre consume menos que una B?",
        answer:
          "Dentro de condiciones comparables suele ser más eficiente, pero revisa capacidad y kWh por 100 ciclos. Un aparato mayor puede consumir más energía total aunque aproveche mejor cada kilogramo.",
      },
      {
        question: "¿Qué precio por kWh debo introducir?",
        answer:
          "Usa un precio de energía obtenido de tu contrato o facturas, de forma coherente con lo que quieras comparar. No copies una cifra genérica como si fuera válida para todos los hogares.",
      },
      {
        question: "¿El dato incluye el consumo en espera?",
        answer:
          "Depende de la familia de producto y de su reglamento. Consulta la ficha EPREL y la documentación del modelo para conocer los modos incluidos en el ensayo.",
      },
      {
        question: "¿Puedo comparar una etiqueta antigua A+++ con una nueva A?",
        answer:
          "No mediante la letra. Compara consumos numéricos, capacidad y condiciones de ensayo, porque las escalas y métodos pueden ser distintos.",
      },
    ],
    sources: [
      {
        title: "Comisión Europea — Productos energéticamente eficientes",
        url: "https://energy-efficient-products.ec.europa.eu/index_en",
      },
      {
        title: "Comisión Europea — Etiqueta de lavadoras",
        url: "https://energy-efficient-products.ec.europa.eu/product-list/washing-machines_en",
      },
      {
        title: "MITECO — Etiquetado energético",
        url: "https://www.miteco.gob.es/es/energia/eficiencia/etiquetado-y-vigilancia/etiquetado-energetico.html",
      },
    ],
    related: [
      {
        href: "/consumo",
        title: "Consumo de electrodomésticos",
      },
      {
        href: "/guias/como-calcular-consumo-electrico",
        title: "Cómo calcular el consumo eléctrico",
      },
      {
        href: "/calculadora",
        title: "Calculadora de coste eléctrico",
      },
    ],
  },
  {
    slug: "como-entender-factura-luz",
    eyebrow: "Factura paso a paso",
    title: "Cómo entender la factura de la luz",
    seoTitle: "Cómo entender la factura de la luz en 2026",
    description:
      "Guía para localizar contrato, potencia, energía, lecturas, impuestos, servicios y autoconsumo en una factura eléctrica sin confundir conceptos.",
    updatedAt: "2026-07-29",
    intro:
      "Las facturas cambian de diseño según la comercializadora, pero contienen bloques comparables. Saber dónde está cada dato permite comprobar el recibo, estimar cambios y usar las herramientas oficiales sin entregar información sensible a intermediarios. Esta guía explica el recorrido de lectura; no sustituye las condiciones particulares de tu contrato.",
    directAnswer:
      "Lee la factura en este orden: periodo y días, datos del contrato, potencia, energía consumida, lecturas, servicios, tributos y total. Después abre el QR oficial de la CNMC para contrastar tipo de contrato y ofertas. Si tienes autoconsumo, revisa por separado energía de red y compensación de excedentes.",
    quickFacts: [
      {
        label: "CUPS",
        value: "Identifica el punto de suministro",
      },
      {
        label: "Comercializadora",
        value: "Contrata y factura la energía",
      },
      {
        label: "Distribuidora",
        value: "Red, contador y lecturas",
      },
      {
        label: "QR de la CNMC",
        value: "Ayuda a entender y comparar el contrato",
      },
    ],
    sections: [
      {
        title: "Empieza por el periodo de facturación",
        paragraphs: [
          "Localiza las fechas inicial y final y cuenta los días. La fecha de emisión no es el inicio del consumo. Este dato permite comparar recibos y entender por qué una factura puede ser mayor aunque el consumo diario sea parecido. Anota también si el cobro es mensual o responde a una regularización.",
          "Divide los kWh entre los días para obtener una primera referencia. La estacionalidad importa: no concluyas que existe un problema porque julio supera a mayo si has usado refrigeración, ni porque enero supera a octubre con calefacción eléctrica. Compara preferentemente con periodos equivalentes.",
        ],
      },
      {
        title: "Identifica contrato, CUPS y empresas",
        paragraphs: [
          "El CUPS identifica de forma estable el punto de suministro, no a la persona titular. Trátalo como dato sensible y no publiques una factura completa. En el bloque del contrato encontrarás titular, dirección, tarifa o peaje de acceso, potencias, número de contador, comercializadora y, habitualmente, distribuidora.",
          "La comercializadora vende y factura la energía y gestiona cambios contractuales. La distribuidora mantiene la red de la zona, recoge medidas y atiende determinadas incidencias técnicas. No puedes elegir distribuidora por oferta comercial; sí puedes elegir comercializadora dentro de las opciones disponibles y requisitos aplicables.",
        ],
        callout:
          "Factura o tarifa: comercializadora. Lectura, contador o avería de red: distribuidora.",
      },
      {
        title: "Comprende el término de potencia",
        paragraphs: [
          "La potencia contratada se expresa en kW y representa capacidad simultánea. En 2.0TD pueden figurar valores para punta y valle. La factura calcula esta parte según potencia, precio contractual o regulado y días. Se paga aunque el consumo de energía sea pequeño.",
          "Busca también la potencia máxima demandada del último año o accede al área de la distribuidora. Si está repetidamente muy por debajo de lo contratado, puede existir margen, pero no reduzcas basándote en una sola cifra. Considera picos, estacionalidad, aparatos futuros y el coste de recuperar potencia.",
        ],
      },
      {
        title: "Comprende el término de energía",
        paragraphs: [
          "La energía se expresa en kWh. El recibo puede separar consumo por periodos o mostrar precios distintos según la oferta. Multiplicar kWh por precio ayuda a verificar la parte principal, pero el cálculo completo puede incluir componentes y ajustes definidos por el contrato o la regulación.",
          "Si tienes PVPC, el coste de energía refleja precios horarios según la metodología vigente. Si estás en mercado libre, puede existir precio fijo, por periodos o indexado. Las franjas regulatorias no significan que todos los contratos libres cobren el mismo precio en cada hora; lee tus condiciones.",
        ],
        bullets: [
          "kW: capacidad instantánea contratada.",
          "kWh: energía acumulada y facturada.",
          "Precio fijo: revisa duración y actualización.",
          "Precio indexado: revisa índice, margen y otros componentes.",
        ],
      },
      {
        title: "Revisa lecturas y gráfica de consumo",
        paragraphs: [
          "La factura identifica lecturas inicial y final y si son reales o estimadas. Una estimación puede corregirse cuando llega un dato válido. Comprueba que la diferencia de lecturas y los kWh facturados sean coherentes con la información ofrecida, teniendo en cuenta periodos y posibles coeficientes.",
          "La gráfica histórica ayuda a detectar cambios, pero compara unidades y periodos. Para más detalle, consulta la curva horaria de la distribuidora. No confíes en aplicaciones que piden credenciales bancarias o una factura completa sin explicar finalidad, responsable y protección de datos.",
        ],
      },
      {
        title: "Localiza servicios, alquiler e impuestos",
        paragraphs: [
          "Además de potencia y energía pueden aparecer alquiler del contador, financiación regulada, servicios de mantenimiento, asistencia, seguros y tributos. Los productos adicionales deben distinguirse de la electricidad. Comprueba si los contrataste, su duración, precio, renovación y procedimiento de baja.",
          "Los impuestos pueden cambiar por norma y fecha, así que evita aprender un porcentaje de memoria a partir de un artículo antiguo. La propia factura debe indicar base, tipo e importe aplicados. Para comparar ofertas, separa servicios voluntarios y usa el coste anual completo, no solo un reclamo por kWh.",
        ],
      },
      {
        title: "Lee el QR oficial de la CNMC",
        paragraphs: [
          "Las facturas de consumidores de baja tensión dentro del ámbito establecido incorporan un QR o enlace que puede cargar datos en las herramientas de la CNMC. «Entiende tu factura» explica comercializadora, contrato, renovación, posibles penalizaciones, potencia demandada y consumo. El comparador permite contrastar ofertas con el perfil incluido.",
          "Verifica que el enlace conduce al dominio oficial antes de continuar. El QR facilita la comparación, pero no contrata por ti ni convierte automáticamente una oferta en la mejor. Revisa periodicidad de actualización, servicios, permanencia y consentimiento antes de firmar cualquier cambio.",
        ],
      },
      {
        title: "Si tienes autoconsumo, añade tres comprobaciones",
        paragraphs: [
          "Distingue energía generada, autoconsumida instantáneamente, tomada de la red y excedentaria. La factura comercial no muestra necesariamente toda la producción del inversor; refleja las medidas relevantes para facturar. Compara datos del inversor con distribuidora atendiendo a intervalos, pérdidas y definiciones.",
          "En compensación simplificada debe aparecer la valoración de excedentes cuando proceda. Ese descuento está limitado por las reglas del mecanismo y no suele eliminar potencia, alquiler, servicios ni todos los impuestos. Una batería virtual pertenece al contrato privado de la comercializadora y no debe confundirse con la compensación regulada.",
        ],
      },
      {
        title: "Termina con una lista de decisiones",
        paragraphs: [
          "Después de leer el recibo debes poder responder: cuántos días cubre, cuántos kWh usaste, qué potencia tienes, qué contrato pagas, qué extras existen y si la lectura es real. Si falta una respuesta, usa el QR oficial o pregunta a la empresa responsable citando el concepto exacto.",
          "No cambies potencia, tarifa y servicios a la vez si quieres medir el efecto de cada decisión. Guarda factura y condiciones anteriores, calcula escenarios con datos propios y revisa el primer recibo tras cualquier modificación. Una lectura ordenada convierte una factura compleja en un conjunto de variables comprobables.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Cómo sé si tengo PVPC?",
        answer:
          "Debe constar en los datos del contrato y la comercializadora será una comercializadora de referencia. El QR oficial de la factura también ayuda a identificar la modalidad.",
      },
      {
        question: "¿Por qué aparecen comercializadora y distribuidora?",
        answer:
          "La comercializadora gestiona contrato y factura; la distribuidora opera la red de tu zona y gestiona medida y determinadas incidencias técnicas.",
      },
      {
        question: "¿El horario valle garantiza que mi kWh sea más barato?",
        answer:
          "No en todos los contratos. Los periodos afectan a componentes regulados, pero el precio de energía depende de si tienes PVPC, precio fijo, por periodos o indexado.",
      },
      {
        question: "¿Puedo compartir mi factura para pedir ayuda?",
        answer:
          "Comparte solo lo imprescindible y oculta nombre, dirección, CUPS, cuenta bancaria, códigos y referencias de contrato. Prioriza canales oficiales y responsables identificados.",
      },
    ],
    sources: [
      {
        title: "CNMC — Entiende tu factura",
        url: "https://www.cnmc.es/prensa/entiende-tu-factura-20231002",
      },
      {
        title: "CNMC — Guía informativa para consumidores de electricidad",
        url: "https://www.cnmc.es/file/306014/download",
      },
      {
        title: "BOE — Contenido y modelo de factura eléctrica",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-7120",
      },
      {
        title: "Red Eléctrica — Precio voluntario para el pequeño consumidor",
        url: "https://www.ree.es/es/operacion/sistema-electrico/pvpc",
      },
    ],
    related: [
      {
        href: "/guias/por-que-ha-subido-factura-luz",
        title: "Por qué puede subir una factura",
      },
      {
        href: "/guias/potencia-contratada",
        title: "Revisar la potencia contratada",
      },
      {
        href: "/guias/como-calcular-consumo-electrico",
        title: "Calcular kWh y coste",
      },
    ],
  },
  {
    slug: "compensacion-excedentes-solares",
    eyebrow: "Autoconsumo sin promesas",
    title: "Cómo funciona la compensación de excedentes solares",
    seoTitle: "Compensación de excedentes solares: cómo funciona",
    description:
      "Entiende qué energía se compensa, cuál es el límite económico, cómo cambia entre PVPC y mercado libre y por qué no garantiza una factura cero.",
    updatedAt: "2026-07-29",
    intro:
      "Cuando una instalación fotovoltaica produce más electricidad de la que la vivienda usa en ese instante, la energía sobrante puede verterse a la red. En determinadas modalidades, la comercializadora valora esos excedentes y descuenta su importe en la factura. No es un balance físico anual ni una promesa de cobrar por toda la producción.",
    directAnswer:
      "La compensación simplificada realiza un saldo económico dentro de cada periodo de facturación: se valora la energía comprada a la red y se resta el valor de los excedentes registrados. El descuento no puede superar el valor económico de la energía consumida de la red en ese periodo. Potencia, alquiler, servicios e impuestos pueden seguir apareciendo.",
    quickFacts: [
      {
        label: "Balance",
        value: "Económico y por periodo de facturación",
      },
      {
        label: "Límite",
        value: "No supera el valor de la energía tomada de la red",
      },
      {
        label: "PVPC",
        value: "Valoración definida por la metodología regulada",
      },
      {
        label: "Mercado libre",
        value: "Precio y condiciones pactados",
      },
    ],
    sections: [
      {
        title: "Autoconsumo, excedente y consumo de red",
        paragraphs: [
          "La producción solar puede seguir tres caminos: consumirse en la vivienda en el mismo momento, almacenarse si existe batería o convertirse en excedente. Cuando la generación no cubre la demanda, la vivienda importa electricidad de la red. Contador e inversor pueden mostrar magnitudes diferentes porque cumplen funciones y usan intervalos distintos.",
          "El kWh autoconsumido evita comprar un kWh de red en esa hora y suele tener un valor económico distinto al kWh excedentario. Por eso dimensionar una instalación solo para generar el máximo anual puede aumentar excedentes sin maximizar el ahorro. El perfil diurno importa tanto como el consumo total.",
        ],
        callout:
          "Producir más no equivale automáticamente a ahorrar más: importa cuándo consumes la energía.",
      },
      {
        title: "Qué es la compensación simplificada",
        paragraphs: [
          "El Real Decreto 244/2019 define un mecanismo para determinadas instalaciones y modalidades de autoconsumo. La comercializadora realiza un saldo económico entre la energía consumida de la red y la energía excedentaria. El periodo de facturación no puede ser superior a un mes para aplicar este límite.",
          "No se guardan kWh para restarlos físicamente en otro mes. Se asigna un valor monetario a cada magnitud según el contrato o la metodología regulada. Tampoco es una venta ordinaria de energía: quien vende excedentes fuera de la compensación asume otra modalidad y obligaciones diferentes.",
        ],
      },
      {
        title: "El límite que impide la «factura negativa»",
        paragraphs: [
          "En el mecanismo simplificado, el valor económico de los excedentes no puede superar el valor económico de la energía consumida de la red durante el mismo periodo. Si has comprado poca energía y has vertido mucha, parte del valor potencial no reducirá más ese término. La norma no obliga a trasladar el sobrante al mes siguiente.",
          "Aunque el término de energía llegue a su límite, permanecen otros conceptos: potencia contratada, alquiler de equipos, servicios y la aplicación tributaria correspondiente. Por eso «factura cero» es una expresión comercial que necesita condiciones adicionales y nunca debe presentarse como consecuencia automática de instalar más paneles.",
        ],
      },
      {
        title: "Diferencia entre PVPC y mercado libre",
        paragraphs: [
          "Con una comercializadora de referencia y PVPC, la energía consumida y la excedentaria se valoran conforme a las metodologías reguladas aplicables. En mercado libre, los precios y condiciones se pactan con la comercializadora. El precio destacado de excedentes no basta para valorar una oferta.",
          "Compara también el precio de la energía que compras, potencia, cuotas, servicios, duración, actualización y destino del saldo. Una compensación alta puede quedar neutralizada por energía de red más cara o una cuota. Usa varias facturas o una estimación anual con tu perfil, no un solo mes solar.",
        ],
        bullets: [
          "Precio de la energía importada.",
          "Precio o fórmula de valoración de excedentes.",
          "Cuotas y servicios asociados.",
          "Duración, revisión y permanencia.",
        ],
      },
      {
        title: "Batería física y batería virtual no son lo mismo",
        paragraphs: [
          "Una batería física almacena electricidad en la vivienda para usarla después, con límites de capacidad, potencia, eficiencia y ciclos. Puede aumentar el autoconsumo, pero requiere inversión y un estudio del perfil. No todos los hogares recuperan ese coste de la misma forma.",
          "La batería virtual es un producto comercial: suele registrar un saldo económico bajo condiciones privadas y aplicarlo a futuras facturas o suministros según la oferta. No almacena electricidad y no forma parte del mecanismo regulado de compensación simplificada. Revisa caducidad, cuotas, límites, impuestos y qué ocurre al cambiar de compañía.",
        ],
      },
      {
        title: "Cómo comprobar la compensación en tu factura",
        paragraphs: [
          "Verifica que los datos del contrato indican autoconsumo y la modalidad correcta. Localiza energía consumida de la red, excedentes y partida de compensación. Contrasta los kWh con el portal de la distribuidora y usa el inversor para entender producción, recordando que no son el mismo punto de medida.",
          "Calcula de forma sencilla: excedentes reconocidos multiplicados por el valor aplicable deben aproximarse a la partida antes de límites y ajustes. Si la compensación queda por debajo de lo esperado, revisa primero el límite del término de energía, las fechas, el precio contratado y si parte del saldo pertenece a una batería virtual.",
        ],
        bullets: [
          "Modalidad de autoconsumo activada.",
          "Periodo exacto de medidas.",
          "kWh importados y excedentarios.",
          "Valor aplicado y límite económico.",
        ],
      },
      {
        title: "Qué hacer si la activación se retrasa",
        paragraphs: [
          "Conserva certificado, contrato de compensación, fecha en que se entregó la documentación y comunicaciones de instalador, distribuidora y comercializadora. Pregunta qué trámite falta y quién debe completarlo. Evita aceptar respuestas genéricas sin referencia o fecha.",
          "La normativa consolidada contempla un término de descuento por retraso de activación en ciertos autoconsumos con excedentes cuando se superan los plazos y la causa no es imputable al consumidor ni a la administración competente. Su aplicación depende de los requisitos del caso; reclama con documentación y solicita que identifiquen la causa registrada.",
        ],
      },
      {
        title: "Cómo aumentar el valor del autoconsumo",
        paragraphs: [
          "Antes de añadir paneles o una batería, intenta desplazar consumos flexibles a horas solares: agua caliente, lavado, lavavajillas, climatización o carga, siempre respetando seguridad y fabricante. Mide el efecto durante varias semanas y evita concentrar aparatos si supera la potencia disponible.",
          "Para estudiar una ampliación, combina producción estimada por ubicación con curva horaria, sombras, orientación, pérdidas, degradación y condiciones económicas prudentes. Presenta varios escenarios y nunca garantices un plazo de amortización. Una instalación bien dimensionada busca equilibrio entre consumo directo, inversión y excedentes.",
        ],
      },
    ],
    faq: [
      {
        question: "¿La comercializadora paga todos mis excedentes?",
        answer:
          "En compensación simplificada aplica un descuento con límite: no puede superar el valor económico de la energía consumida de la red en el mismo periodo. La venta ordinaria es una modalidad distinta.",
      },
      {
        question: "¿Puedo dejar la factura a cero con placas?",
        answer:
          "No debe darse por hecho. Aunque el término de energía se compense, pueden permanecer potencia, alquiler, servicios e impuestos. Los productos privados pueden añadir otras condiciones.",
      },
      {
        question: "¿Los excedentes no usados pasan al mes siguiente?",
        answer:
          "El mecanismo regulado no obliga a acumularlos. Algunas baterías virtuales ofrecen saldos futuros, pero son productos comerciales y deben revisarse por separado.",
      },
      {
        question: "¿Es mejor instalar una batería?",
        answer:
          "Depende del consumo nocturno, excedentes, precios, inversión, eficiencia y vida útil. Se necesita un estudio con datos horarios; no existe una respuesta universal.",
      },
    ],
    sources: [
      {
        title: "BOE — Real Decreto 244/2019 consolidado",
        url: "https://www.boe.es/eli/es/rd/2019/04/05/244/con",
      },
      {
        title: "IDAE — Cinco pasos para convertirse en autoconsumidor",
        url: "https://www.idae.es/publicaciones/guia-practica-para-convertirse-en-autoconsumidor-en-5-pasos",
      },
      {
        title: "MITECO — Preguntas frecuentes sobre autoconsumo",
        url: "https://www.miteco.gob.es/es/energia/energia-electrica/electricidad/autoconsumo-electrico/preguntas-frecuentes-autoconsumo.html",
      },
      {
        title: "BOE — Contenido de la factura y compensación",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-7120",
      },
    ],
    related: [
      {
        href: "/guias/como-entender-factura-luz",
        title: "Cómo leer la compensación en la factura",
      },
      {
        href: "/guias/por-que-ha-subido-factura-luz",
        title: "Diagnosticar cambios en la factura",
      },
      {
        href: "/guias/como-calcular-consumo-electrico",
        title: "Cómo calcular kWh y coste",
      },
    ],
  },
];

export function getEditorialGuide(slug: string) {
  return editorialGuides.find((guide) => guide.slug === slug);
}
