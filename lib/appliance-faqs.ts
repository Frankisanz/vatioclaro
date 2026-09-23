/**
 * Preguntas específicas de cada aparato. Complementan las dos preguntas
 * generadas a partir del escenario (coste mensual y por qué varía) con dudas
 * propias del aparato: cómo leer su etiqueta, errores de cálculo frecuentes y
 * decisiones habituales.
 *
 * Criterio editorial: las respuestas solo usan definiciones de etiqueta,
 * física básica o aritmética sobre el ejemplo visible. Cualquier cifra es un
 * cálculo reproducible o un ejemplo identificado como tal, nunca un consumo
 * «típico» de mercado.
 */
export type ApplianceFaq = {
  question: string;
  answer: string;
};

export const APPLIANCE_FAQS: Record<string, ApplianceFaq[]> = {
  "aire-acondicionado": [
    {
      question: "¿Qué diferencia hay entre frigorías, BTU y vatios eléctricos?",
      answer:
        "Las frigorías y los BTU/h describen el calor que el equipo retira de la estancia, no la electricidad que consume. Un vatio térmico equivale a unos 3,41 BTU/h, así que un equipo de 9.000 BTU/h mueve alrededor de 2,6 kW de calor. La electricidad necesaria para hacerlo es bastante menor y depende de su eficiencia: es la potencia eléctrica de entrada la que debes usar en la calculadora.",
    },
    {
      question: "¿Qué significa el SEER de la etiqueta y cómo afecta a la factura?",
      answer:
        "El SEER es la eficiencia estacional en frío: cuántas unidades de calor retira el equipo por cada unidad de electricidad a lo largo de una temporada normalizada. Con la misma necesidad de frío, un equipo con SEER 8 consume un 25 % menos de electricidad que otro con SEER 6, porque 6 ÷ 8 = 0,75. Compara siempre modelos de capacidad parecida y en el mismo modo.",
    },
    {
      question: "¿Consume más encenderlo y apagarlo o dejarlo funcionando todo el día?",
      answer:
        "Depende de cuánto calor entra en la vivienda mientras está apagado. Si la estancia va a estar vacía varias horas, apagarlo suele evitar trabajo inútil. Si solo sales un rato en las horas de más calor, un inverter puede mantener la temperatura modulando a baja potencia en lugar de recuperar después varios grados a máxima potencia. Un medidor en la línea o los datos de consumo de la propia máquina permiten comparar ambos hábitos con tu casa real.",
    },
  ],
  ventilador: [
    {
      question: "¿Cuánto cuesta una hora de ventilador frente a una de aire acondicionado?",
      answer:
        "Con los ejemplos editables de VatioClaro, 50 W durante una hora son 0,05 kWh y, a 0,25 €/kWh, cuestan 0,0125 €. Un aire acondicionado de 1.000 W de entrada necesita 1 kWh y 0,25 € en esa misma hora, veinte veces más. La comparación solo tiene sentido si el ventilador te da el confort que necesitas; si no, seguirás encendiendo el aire.",
    },
    {
      question: "¿Sirve de algo dejar el ventilador encendido en una habitación vacía?",
      answer:
        "No para refrescar. El ventilador no baja la temperatura del aire: mejora la sensación térmica de las personas al mover el aire sobre la piel. En una habitación sin nadie solo gasta electricidad, y además el motor añade una pequeña cantidad de calor. La excepción es cuando lo usas para crear corriente con una ventana abierta por la noche.",
    },
    {
      question: "¿Cómo sé cuántos vatios consume mi ventilador en cada velocidad?",
      answer:
        "La etiqueta o el manual suelen indicar la potencia máxima, que corresponde a la velocidad más alta. Para conocer las velocidades intermedias, lo más fiable es medir con un medidor de enchufe durante unos minutos en cada posición. Si el ventilador tiene luz integrada, mide con ella encendida y apagada para separar ambos consumos.",
    },
  ],
  horno: [
    {
      question: "¿Qué indica la etiqueta energética de un horno eléctrico?",
      answer:
        "La etiqueta de los hornos eléctricos domésticos declara el consumo por ciclo en kWh en un ensayo normalizado, en modo convencional y, si lo tiene, en modo con ventilador. Ese dato es mejor punto de partida que la potencia máxima impresa en la placa, porque ya incluye que las resistencias se encienden y apagan para mantener la temperatura.",
    },
    {
      question: "¿Gasta menos el horno con ventilador que en modo convencional?",
      answer:
        "Con frecuencia sí, porque el aire en movimiento transmite el calor de forma más uniforme y permite cocinar a menor temperatura o durante menos tiempo. No es una regla fija: compara los dos kWh por ciclo de la etiqueta de tu modelo y ajusta la receta, ya que muchas indican temperaturas pensadas para el modo convencional.",
    },
    {
      question: "¿Por qué no debo multiplicar la potencia máxima por todo el tiempo de cocción?",
      answer:
        "Porque las resistencias solo funcionan a plena potencia mientras el horno sube de temperatura. Después, el termostato las activa por intervalos. Un horno de 2.500 W durante una hora daría 2,5 kWh con esa cuenta, pero el consumo real de una cocción suele ser inferior. Un medidor en la línea o el kWh por ciclo de la etiqueta dan una cifra más realista.",
    },
  ],
  "termo-electrico": [
    {
      question: "¿Cuánta energía hace falta para calentar el agua de una ducha?",
      answer:
        "Calentar 1 litro de agua 1 °C requiere unos 1,16 Wh, de modo que 1 kWh calienta unos 860 litros un grado. Si una ducha usa 50 litros que pasan de 15 °C a 40 °C, la energía útil es 50 × 25 ÷ 860 ≈ 1,45 kWh. El termo consume algo más por las pérdidas del depósito y de las tuberías. Litros y temperaturas son un ejemplo que puedes cambiar por los de tu casa.",
    },
    {
      question: "¿Conviene apagar el termo por la noche o cuando salgo de casa?",
      answer:
        "Apagarlo reduce las pérdidas de mantener el agua caliente, pero obliga a recalentar después todo el depósito. El ahorro será mayor cuanto peor aislado esté el termo y cuanto más tiempo pase apagado. Si tu tarifa tiene precios distintos por periodos, programarlo para que caliente en las horas más baratas puede ahorrar más que apagarlo. Sigue siempre las indicaciones sanitarias del fabricante sobre la temperatura mínima.",
    },
    {
      question: "¿Por qué el termo gasta más en invierno si me ducho igual?",
      answer:
        "Porque el agua de red llega más fría. Con la misma temperatura de ducha, el termo tiene que subir más grados cada litro. En el ejemplo anterior, pasar de 15 °C a 10 °C de entrada aumenta el salto de 25 °C a 30 °C, es decir, un 20 % más de energía para el mismo volumen de agua.",
    },
  ],
  ordenador: [
    {
      question: "Mi fuente de alimentación es de 750 W, ¿consume siempre eso?",
      answer:
        "No. Los 750 W son la potencia máxima que la fuente puede entregar a los componentes. El ordenador solo toma de la red lo que necesita en cada momento, más las pérdidas de la propia fuente. Escribiendo o navegando la demanda puede ser una fracción de ese valor; en un juego exigente o un renderizado se acerca más al límite.",
    },
    {
      question: "¿Consume mucho menos un portátil que un sobremesa?",
      answer:
        "Normalmente sí, porque sus componentes están diseñados para funcionar con batería y la pantalla es más pequeña. La forma de comprobarlo en tu caso es medir el cargador del portátil en el enchufe durante una sesión de trabajo y compararlo con el sobremesa más su monitor en la misma tarea.",
    },
    {
      question: "¿Cuánto cuesta dejar el ordenador encendido por la noche?",
      answer:
        "Depende de si queda en reposo, suspendido o apagado. Con un consumo en reposo de ejemplo de 60 W durante 8 horas se gastan 0,48 kWh, unos 0,12 € por noche a 0,25 €/kWh, y más de 40 € al año si ocurre todas las noches. La suspensión reduce ese consumo a unos pocos vatios. Mide el tuyo en cada estado para saber qué te conviene.",
    },
  ],
  secadora: [
    {
      question: "¿Cuánto cuesta un ciclo de secadora?",
      answer:
        "Divide los kWh por 100 ciclos de la etiqueta entre 100 y multiplica por tu precio de energía. Con el ejemplo de 140 kWh/100 ciclos, un ciclo son 1,4 kWh y cuesta 0,35 € a 0,25 €/kWh. Una carga pequeña o un programa de secado extra cambian el resultado, porque la etiqueta se refiere a los programas de ensayo.",
    },
    {
      question: "¿Qué ahorra una secadora de bomba de calor frente a una de condensación?",
      answer:
        "La bomba de calor reutiliza el calor del aire húmedo en lugar de calentar siempre aire nuevo con una resistencia, por lo que suele necesitar bastante menos electricidad por ciclo. Para saber cuánto ahorras tú, compara los kWh por 100 ciclos de los dos modelos y multiplica la diferencia por los ciclos que haces al año y tu precio por kWh. Los ciclos suelen ser más largos.",
    },
    {
      question: "¿Por qué influye el centrifugado de la lavadora en la secadora?",
      answer:
        "Porque la secadora gasta la mayor parte de su energía en evaporar el agua que queda en la ropa. Una lavadora que centrifuga más deja menos humedad residual y la secadora necesita menos tiempo. En la etiqueta de la lavadora, la clase de eficiencia de centrifugado resume ese dato.",
    },
  ],
  "router-wifi": [
    {
      question: "¿Cuánto consume un router al año?",
      answer:
        "Multiplica sus vatios por las 8.760 horas del año. Con el ejemplo de 10 W, son 87,6 kWh al año, unos 21,90 € a 0,25 €/kWh. Si tienes ONT de fibra, repetidores o nodos mesh, cada equipo suma su propio consumo y conviene medir la regleta completa.",
    },
    {
      question: "¿Merece la pena apagar el router por la noche?",
      answer:
        "Con 10 W, apagarlo 8 horas cada noche ahorra unos 29 kWh al año, alrededor de 7 € a 0,25 €/kWh. Es un ahorro pequeño, que puede no compensar si el router da servicio a teléfono fijo, alarma, cámaras o domótica. Muchos routers permiten programar el apagado solo del wifi, lo que mantiene los servicios cableados.",
    },
    {
      question: "¿Cómo mido el consumo real de mi router?",
      answer:
        "Conecta el transformador del router a un medidor de enchufe y deja que registre al menos un día completo, ya que el consumo sube cuando hay tráfico o varios dispositivos conectados. Divide los kWh registrados entre las horas medidas para obtener la potencia media que puedes introducir en la calculadora.",
    },
  ],
  frigorifico: [
    {
      question: "¿Cómo paso los kWh/año de la etiqueta a euros al mes?",
      answer:
        "Divide los kWh/año entre 12 y multiplica por tu precio de energía. Con la referencia de 181 kWh/año, la media es de 15,1 kWh al mes, unos 3,77 € a 0,25 €/kWh. El dato de etiqueta procede de un ensayo normalizado; en verano, junto a un horno o con muchas aperturas de puerta, el consumo real puede ser mayor.",
    },
    {
      question: "¿Cuánto ahorro cambiando un frigorífico antiguo por uno más eficiente?",
      answer:
        "Si tu frigorífico actual no tiene etiqueta visible, mide su consumo con un medidor de enchufe durante al menos una semana y extrapólalo a un año. Resta los kWh/año del modelo nuevo y multiplica la diferencia por tu precio. Para decidir, compara ese ahorro anual con el precio del aparato en la calculadora de amortización.",
    },
    {
      question: "¿Por qué el frigorífico hace ruido a ratos y a veces está en silencio?",
      answer:
        "Porque el compresor se enciende y se apaga según el termostato. Cuando está en marcha, consume su potencia de funcionamiento; en pausa, apenas consume. Por eso la potencia de la placa no sirve para estimar el gasto multiplicándola por 24 horas: el consumo anual de la etiqueta ya incluye ese funcionamiento a intervalos.",
    },
  ],
  lavadora: [
    {
      question: "¿Qué es el programa Eco 40-60 de la etiqueta?",
      answer:
        "Es el programa con el que se mide el consumo de la etiqueta energética europea de las lavadoras. Está pensado para ropa de algodón con suciedad normal que admite lavado a 40 °C o 60 °C y suele durar más que otros programas porque usa menos temperatura y más tiempo. Los kWh por 100 ciclos de la etiqueta se refieren a ese programa.",
    },
    {
      question: "¿Lavar con agua fría ahorra mucho?",
      answer:
        "Calentar el agua es una de las partes que más energía consume en un lavado. Por eso un programa en frío o a 30 °C suele gastar bastante menos que uno a 60 °C con la misma carga. Comprueba la diferencia en tu modelo con un medidor de enchufe durante dos lavados comparables.",
    },
    {
      question: "¿Qué otros datos da la etiqueta de una lavadora?",
      answer:
        "Además de la clase y los kWh por 100 ciclos, la etiqueta muestra la capacidad en kilos, el consumo de agua por ciclo, la duración del programa Eco 40-60, la clase de eficiencia del centrifugado y el ruido. La capacidad es importante al comparar: un tambor más grande usado a media carga gasta más por kilo de ropa.",
    },
  ],
  lavavajillas: [
    {
      question: "¿Cuánto cuesta un lavado en lavavajillas?",
      answer:
        "Divide los kWh por 100 ciclos del programa Eco entre 100 y multiplica por tu precio. Con el ejemplo de 85 kWh/100 ciclos, un lavado son 0,85 kWh y cuesta unos 0,21 € a 0,25 €/kWh. Los programas intensivos o rápidos pueden consumir más energía que el programa de etiqueta.",
    },
    {
      question: "¿Gasta menos el lavavajillas que fregar a mano?",
      answer:
        "Depende de cómo friegues. Si lo haces con agua caliente del grifo, estás pagando la energía que usa el termo o la caldera para calentarla. Un lavavajillas lleno en programa Eco suele usar poca agua por servicio. Para compararlo en tu casa, estima los litros de agua caliente que usas al fregar y aplica la fórmula del termo.",
    },
    {
      question: "¿Qué significan los servicios en la etiqueta?",
      answer:
        "Son el número de cubiertos estándar (platos, vasos y cubiertos para una persona) que caben en un lavado de ensayo. Un lavavajillas de más servicios puede consumir más por ciclo pero menos por plato si lo llenas. Por eso conviene comparar modelos de capacidad similar o calcular el coste por servicio.",
    },
  ],
  vitroceramica: [
    {
      question: "¿Cómo sé si mis ollas sirven para inducción?",
      answer:
        "La inducción necesita recipientes con base ferromagnética. Si un imán se adhiere con firmeza a la base, la olla funcionará. Un recipiente poco compatible o de base deformada calienta peor y alarga el tiempo de cocción, lo que resta parte de la ventaja de eficiencia de la placa.",
    },
    {
      question: "¿Cuánto cuesta hervir agua en la placa?",
      answer:
        "Calentar 1 litro de agua de 15 °C a 100 °C requiere unos 0,1 kWh de energía útil (1 × 85 ÷ 860). La placa consume algo más por las pérdidas hacia el aire y el recipiente; la inducción suele perder menos que una vitrocerámica radiante. A 0,25 €/kWh, estamos hablando de unos pocos céntimos por litro.",
    },
    {
      question: "¿Por qué la potencia máxima de la placa no es el consumo real?",
      answer:
        "La cifra máxima suele corresponder a la función de refuerzo o a todas las zonas a la vez. Al cocinar, cada zona se regula según el nivel elegido y, en vitrocerámica radiante, la resistencia se enciende y apaga. Además, casi nunca usas todas las zonas al máximo. Revisa también tu potencia contratada si vas a encender varias zonas y el horno a la vez.",
    },
  ],
  microondas: [
    {
      question: "Mi microondas es de 800 W, ¿es ese su consumo?",
      answer:
        "No siempre. En muchos microondas, la cifra destacada es la potencia de salida de microondas que llega a la comida. La potencia eléctrica de entrada, que es la que pagas, es mayor y suele figurar en la placa de características de la parte trasera o en el manual. Usa ese dato de entrada en la calculadora.",
    },
    {
      question: "¿Cuánto cuesta calentar un plato en el microondas?",
      answer:
        "Con el ejemplo de 1.000 W de entrada, dos minutos son 1.000 × 2 ÷ 60 = 33 Wh, es decir, 0,033 kWh, menos de un céntimo a 0,25 €/kWh. El coste individual es pequeño; lo relevante es cuántos usos suma al mes y si sustituye a un aparato de más consumo.",
    },
    {
      question: "¿Consume el microondas cuando no lo uso?",
      answer:
        "Si tiene reloj o pantalla encendida, mantiene un pequeño consumo en espera durante todas las horas del año. Puedes medirlo con un medidor de enchufe y calcularlo con la calculadora de standby. Desenchufarlo solo compensa si el aparato lo permite con comodidad y no necesitas el reloj.",
    },
  ],
  televisor: [
    {
      question: "¿Qué significan los kWh/1000 h de la etiqueta del televisor?",
      answer:
        "Es el consumo del televisor durante 1.000 horas de uso con contenido de rango dinámico estándar (SDR); la etiqueta muestra un segundo valor para contenido HDR. Para calcular tu coste, divide el valor entre 1.000 para obtener los kWh por hora y multiplícalo por tus horas de uso y tu precio. Si ves mucho HDR, usa la segunda cifra.",
    },
    {
      question: "¿Cuánto consume el televisor apagado con el mando?",
      answer:
        "En espera, un televisor moderno consume muy poco, aunque las funciones de encendido por red o asistente de voz pueden elevar esa cifra. Aunque sean pocos vatios, cuentan durante casi todas las horas del año. Mídelo con un medidor de enchufe y calcúlalo con la calculadora de standby si quieres conocer tu caso.",
    },
    {
      question: "¿Qué ajustes de imagen reducen el consumo?",
      answer:
        "Bajar el brillo de la retroiluminación, desactivar el modo de imagen «vívido» o «tienda» y activar el sensor de luz ambiental suelen reducir la potencia durante la reproducción. Puedes comprobar el efecto midiendo el televisor en el enchufe con el mismo contenido y distintos ajustes.",
    },
  ],
  "calefactor-electrico": [
    {
      question: "¿Todos los calefactores eléctricos de la misma potencia gastan igual?",
      answer:
        "Por cada hora a plena potencia, sí: un calefactor de aire, un radiador de aceite o un panel de 2.000 W de resistencia convierten 2 kWh de electricidad en 2 kWh de calor. Cambia cómo reparten el calor, la rapidez y lo bien que regula su termostato, y eso sí afecta a cuántas horas funcionan.",
    },
    {
      question: "¿Qué gasta menos, un calefactor o el aire acondicionado con bomba de calor?",
      answer:
        "Una bomba de calor puede entregar varias unidades de calor por cada unidad de electricidad, según su COP o SCOP. Si un equipo tiene un SCOP de 4, para el mismo calor necesita en torno a una cuarta parte de la electricidad que una resistencia en condiciones de temporada media. La guía de radiador frente a bomba de calor detalla el cálculo.",
    },
    {
      question: "¿Cuánto cuesta una hora de calefactor?",
      answer:
        "Multiplica los kilovatios por el precio. A 0,25 €/kWh, un calefactor de 1.500 W cuesta 0,375 € por hora a plena potencia y uno de 2.000 W, 0,50 €. Si el termostato corta cuando la habitación alcanza la temperatura, el coste real por hora será menor.",
    },
  ],
  deshumidificador: [
    {
      question: "¿Qué indican los litros por día de un deshumidificador?",
      answer:
        "Son el agua que puede extraer en 24 horas en unas condiciones de ensayo concretas, normalmente cálidas y muy húmedas. En tu casa, con menos temperatura o menos humedad, extraerá menos litros. Por eso no sirve para calcular el consumo: usa la potencia de entrada y las horas que realmente funciona el compresor.",
    },
    {
      question: "¿Qué humedad conviene fijar para no gastar de más?",
      answer:
        "Cuanto más baja sea la humedad objetivo, más horas trabajará el aparato. Fijar una consigna razonable y dejar que el higrostato lo pare evita consumo innecesario. Un termohigrómetro independiente te ayuda a comprobar si la estancia realmente necesita deshumidificación.",
    },
    {
      question: "¿Sirve un deshumidificador para secar ropa en casa?",
      answer:
        "Puede ayudar, porque retira del aire la humedad que desprende la ropa tendida. Si lo usas así, cuenta esas horas extra en la calculadora y compáralas con el coste por ciclo de una secadora. Colocar la ropa en una estancia pequeña y cerrada con el aparato suele acortar el tiempo necesario.",
    },
  ],
  "aire-acondicionado-portatil": [
    {
      question: "¿Por qué un portátil de un tubo rinde peor que un split?",
      answer:
        "Porque expulsa al exterior aire de la propia habitación. Ese aire se repone entrando por rendijas y puertas desde zonas más calientes, y el equipo tiene que volver a enfriarlo. Además, el compresor y parte del calor que genera están dentro de la estancia. Los modelos de doble tubo reducen el primer efecto.",
    },
    {
      question: "¿Cuánto cuesta una hora de aire acondicionado portátil?",
      answer:
        "Multiplica la potencia eléctrica de entrada en kilovatios por el precio. Con el ejemplo de 1.200 W y 0,25 €/kWh, una hora con el compresor a pleno rendimiento cuesta 0,30 €. Cuando alcanza la temperatura, el compresor para o reduce su trabajo y el coste por hora baja.",
    },
    {
      question: "¿Cómo puedo reducir el consumo de un portátil?",
      answer:
        "Sella el hueco de la ventana alrededor del tubo, acorta el tubo lo más posible y evita dobleces, cierra la puerta de la habitación y baja persianas en las horas de sol. Todo lo que reduce el calor que entra acorta las horas de compresor, que son las que marcan la factura.",
    },
  ],
  congelador: [
    {
      question: "¿A qué temperatura debe estar un congelador?",
      answer:
        "La referencia habitual para conservar alimentos congelados durante meses es −18 °C, que es también la temperatura con la que se clasifican los congeladores de cuatro estrellas. Una consigna más baja no mejora la conservación de forma apreciable y hace trabajar más al compresor.",
    },
    {
      question: "¿Gasta más un congelador vacío o lleno?",
      answer:
        "Un congelador razonablemente lleno pierde menos frío al abrir la puerta porque los alimentos congelados actúan como reserva térmica. Lo que sí aumenta el consumo es introducir mucha comida a temperatura ambiente de una vez o saturarlo hasta impedir la circulación del aire en modelos no frost.",
    },
    {
      question: "¿Cómo calculo el coste mensual de mi congelador?",
      answer:
        "Busca los kWh/año de su etiqueta, divídelos entre 12 y multiplícalos por tu precio. Con el ejemplo de 200 kWh/año, son 16,7 kWh al mes y unos 4,17 € a 0,25 €/kWh. Si está en un garaje con mucho calor en verano o frío en invierno, puede apartarse de ese dato; mídelo varios días para confirmarlo.",
    },
  ],
  "freidora-de-aire": [
    {
      question: "¿Cuánto cuesta usar la freidora de aire 20 minutos?",
      answer:
        "Con el ejemplo de 1.500 W, 20 minutos a plena potencia son 1.500 × 20 ÷ 60 = 500 Wh, es decir, 0,5 kWh y 0,125 € a 0,25 €/kWh. Como el termostato apaga la resistencia a ratos, el consumo real suele ser algo menor. Un medidor de enchufe te dará la cifra exacta de una receta.",
    },
    {
      question: "¿Consume menos la freidora de aire que el horno?",
      answer:
        "Para raciones pequeñas suele necesitar menos energía, porque calienta un volumen menor y en menos tiempo. Si tienes que cocinar varias tandas, o si el horno ya está encendido para otra preparación, la ventaja desaparece. La comparativa de horno frente a freidora de aire muestra el cálculo por ración.",
    },
    {
      question: "¿Hace falta precalentar la freidora de aire?",
      answer:
        "Algunas recetas lo piden para dorar mejor, pero en la mayoría de platos puedes añadir un par de minutos al tiempo de cocción en lugar de precalentar. Cada minuto de precalentado es energía que no llega a la comida; revisa el manual de tu modelo.",
    },
  ],
};

export function getApplianceFaqs(slug: string): ApplianceFaq[] {
  return APPLIANCE_FAQS[slug] ?? [];
}
