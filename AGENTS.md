# Principios permanentes de VatioClaro

Este archivo rige las futuras sesiones de trabajo sobre el repositorio. Ante una duda, aplicar este orden: **utilidad → confianza → SEO → tráfico → monetización**.

## Producto y criterio editorial

- VatioClaro convierte vatios y kWh en euros comprensibles y ayuda a calcular cada caso con datos editables. La herramienta debe seguir siendo excelente sin anuncios ni afiliación.
- Priorizar respuestas útiles y verificables frente al volumen de URLs. Cada página debe resolver una intención concreta y aportar información, cálculo o criterio propio.
- No inventar consumos, precios, fuentes, normas, mediciones, experiencia, pruebas, testimonios, credenciales ni autores. No afirmar «hemos probado» si no existe una prueba documentada.
- Conservar la autoría real. La autoridad procede de fórmulas visibles, fuentes, metodología y correcciones, no de cualificaciones inexistentes.
- Separar siempre los datos oficiales o declarados de los ejemplos educativos. Un ejemplo debe identificarse como tal y mostrar sus entradas, fórmula, precio y límites.
- Toda cifra que pueda cambiar debe incluir una fuente o fecha de referencia y almacenarse, cuando sea posible, en un punto mantenible. No dispersar precios, impuestos, normativa o requisitos por las vistas.
- Priorizar fuentes primarias según la afirmación: Comisión Europea, EUR-Lex, BOE, CNMC, IDAE, Red Eléctrica, EPREL, etiquetas, manuales y fichas de fabricante. No inventar URLs ni usar una web SEO competidora como respaldo principal si existe una fuente primaria.
- Si un dato no puede comprobarse, presentarlo solo como supuesto visible o no publicarlo como hecho.

## Cálculos y datos

- Los supuestos de cada calculadora y ejemplo deben estar visibles y ser editables. No ocultar valores iniciales ni presentarlos como universales.
- Elegir el método que representa al aparato: potencia y tiempo, kWh por ciclo, kWh/100 ciclos, kWh/año, consumo diario o standby. No aplicar potencia nominal × tiempo cuando una etiqueta, una medición o el funcionamiento regulado describan mejor el consumo.
- Diferenciar potencia eléctrica de potencia térmica y explicar COP, SCOP, SEER, termostatos, compresores y ciclos cuando sean relevantes.
- Separar `exampleElectricityPrice`, el precio introducido por el usuario y una posible fuente externa futura. Un precio ilustrativo nunca es «el precio de la electricidad en España» sin contexto y fecha.
- Mantener los valores internos como números y localizar solo la presentación. La interfaz española debe aceptar y mostrar decimales de forma comprensible sin producir `NaN` ni `Infinity`.
- Centralizar y tipar datos, fórmulas y configuración. Reutilizar componentes y motores; evitar duplicación de lógica y calculadoras independientes que resuelven la misma operación.
- Todo cálculo importante debe poder probarse sin renderizar la interfaz. Cubrir conversión W/kW, energía, costes, ciclos, kWh/100 ciclos, anualización, comparaciones, porcentajes, redondeo y entradas límite.

## Publicación, indexación y SEO

- Ninguna página programática merece indexación por existir como registro. El estado indexable debe ser explícito y exigir intención real, datos específicos, método adecuado, fuentes, explicación propia y herramienta útil.
- No generar páginas masivas por modelo, parámetros de calculadora o sustitución de palabras. Las URLs compartibles de cálculos no deben crear combinaciones indexables; usar canonical y `noindex` cuando corresponda.
- Practicar SEO centrado en personas: títulos e H1 precisos, metadata única, URLs estables, enlaces internos útiles, sitemap y robots coherentes, y datos estructurados que reproduzcan contenido visible.
- Prohibidos keyword stuffing, doorway pages, texto oculto, contenido duplicado o casi idéntico, schema engañoso, reviews falsas y conclusiones exageradas.
- Mantener compatibilidad de URLs. Si un cambio de ruta es imprescindible, añadir un redirect explícito y comprobar enlaces internos, canonical y sitemap.

## UX, accesibilidad y rendimiento

- Diseñar mobile first. En una guía móvil, priorizar respuesta, cifra, calculadora y explicación; no anteponer decoración o monetización a la tarea.
- Accesibilidad y rendimiento son requisitos, no una fase opcional: HTML semántico, labels, teclado, foco visible, contraste, mensajes de error comprensibles, tablas accesibles, lectores de pantalla y `prefers-reduced-motion`.
- Proteger LCP, CLS e INP. Evitar componentes cliente, hidratación, librerías, imágenes, fuentes y animaciones innecesarias. Reservar dimensiones de elementos tardíos y usar carga diferida donde proceda.
- Los números y las fórmulas son protagonistas. Evitar stock innecesario, dashboards recargados, efectos pesados, lenguaje comercial exagerado y apariencia de comercializadora o web afiliada.

## Monetización, independencia y privacidad

- AdSense debe permanecer desacoplado y desactivable. Nunca colocar anuncios sobre controles, entre label e input, junto a botones, antes del resultado ni de forma confundible con navegación. Al activarlos, reservar espacio para evitar CLS y mantener cómoda la calculadora.
- Usar afiliación solo cuando ayude a resolver el problema. Explicar la relación, ofrecer alternativas sin compra y no copiar precios, estrellas o reseñas. Nunca ordenar una recomendación por comisión ni mostrar precios hardcodeados de Amazon.
- Leads u otros modelos futuros deben ser relevantes, identificables y compatibles con la independencia editorial. La monetización no decide qué se afirma ni qué se publica.
- No solicitar identidad, dirección, CUPS, DNI, cuenta bancaria o una factura completa para cálculos que pueden hacerse localmente. No enviar datos sensibles en analítica; medir solo eventos que ayuden a mejorar el producto.
- Mantener la lógica preparada para otros locales, monedas y fuentes sin implementar internacionalización antes de necesitarla. La experiencia actual sigue enfocada en España.

## Ingeniería y validación

- Favorecer soluciones simples, estáticas o locales cuando basten. No añadir cuentas, bases de datos, APIs, microservicios o infraestructura sin una necesidad demostrada.
- Reutilizar la arquitectura y el diseño existentes antes de crear variantes. No hacer un rediseño radical ni eliminar algo que funciona solo para demostrar trabajo.
- Antes de publicar, ejecutar las comprobaciones proporcionales al cambio: lint, tipos, tests de cálculo, build y pruebas de navegador cuando afecte a interacción. Corregir consola, enlaces, metadata, responsive, accesibilidad y CLS.
- Tratar decisiones jurídicas, de marca, despliegue, monetización o fuentes que no puedan deducirse como pendientes documentadas. Preparar una opción reversible y no presentarlas como resueltas.

