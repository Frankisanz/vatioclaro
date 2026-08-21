# Decisiones pendientes de VatioClaro

Última revisión documental: 17 de agosto de 2026.

Este registro separa hechos observables en el repositorio de decisiones que requieren validación del titular o asesoramiento externo. No sustituye asesoramiento jurídico, fiscal o técnico.

## 1. Denominación VatioClaro y posible colisión con VatioClaro.com

**Estado:** abierta; requiere revisión jurídica antes de aumentar la inversión en marca.

Se ha señalado la existencia de `VatioClaro.com` con una denominación coincidente o muy próxima. La coincidencia de un dominio, por sí sola, no permite concluir que exista infracción, disponibilidad de marca ni ausencia de riesgo. También importan los titulares, territorios, clases de productos o servicios, uso efectivo, signos gráficos y riesgo de confusión.

**Decisión necesaria**

- Encargar una búsqueda profesional en OEPM y, si procede por el alcance previsto, EUIPO y otros territorios relevantes.
- Documentar titular, actividad, antigüedad y signos usados por ambas partes.
- Decidir si se conserva VatioClaro, se refuerza una diferenciación denominativa/visual o se adopta otra marca antes de campañas, acuerdos o registro.

**Conducta provisional segura**

- No afirmar que VatioClaro es una marca registrada ni que la denominación está libre.
- Mantener una identidad claramente informativa e independiente, sin imitar signos, textos o presentación de terceros.
- No interpretar este documento como una conclusión jurídica sobre VatioClaro.com.

## 2. Plataforma de despliegue: Vercel o restos de Sites

**Estado:** abierta; debe elegirse un único flujo de producción y mantenimiento.

La aplicación activa es Next.js y el repositorio contiene integración de Analytics y Speed Insights de Vercel, configuración local de proyecto en `.vercel` y un redirect desde el subdominio antiguo de Vercel al dominio canónico. También quedan directorios generados asociados a una compilación anterior de Sites/Cloudflare (`.vinext` y `.wrangler`) y un directorio `.openai` sin configuración de hosting activa.

**Decisión necesaria**

- Confirmar si Vercel seguirá siendo el proveedor de producción o si existe una migración deliberada a Sites.
- Tras decidirlo, documentar una única orden de build, variables, dominio canónico, analítica y procedimiento de rollback.
- Eliminar del control de versiones o ignorar únicamente los artefactos del flujo descartado después de verificar que no contienen trabajo necesario.

**Conducta provisional segura**

Vercel parece ser el flujo vigente por las señales del código, pero no se deben borrar los restos de Sites ni modificar DNS hasta que el titular confirme la decisión.

## 3. Datos legales y canal de contacto

**Estado:** abierta; existen datos en `lib/legal.ts`, pero el titular debe ratificarlos antes de considerarlos definitivos.

**Datos que deben confirmarse**

- nombre o razón social exacta del titular y forma de actividad;
- identificador fiscal y domicilio aplicable al aviso legal;
- titularidad del dominio y jurisdicción;
- correo público de contacto y capacidad real de atender correcciones o derechos de privacidad;
- necesidad de información adicional por actividad económica, afiliación, publicidad, analítica o futuros formularios de leads;
- fecha de entrada en vigor y coherencia entre aviso legal, privacidad, cookies y afiliación.

**Conducta provisional segura**

No inventar datos ni sustituir los existentes por placeholders. Cualquier cambio debe provenir directamente del titular y revisarse en todas las páginas legales. Antes de introducir anuncios, nuevas cookies o captación de leads debe revisarse de nuevo la información y el consentimiento aplicables.

## 4. Fuentes de fabricante y trazabilidad por aparato

**Estado:** abierta; falta una verificación sistemática de todas las fichas y ejemplos.

Cada dato declarado por un fabricante debería conservar, como mínimo, marca, modelo o familia exacta, mercado, métrica, unidad, URL primaria, documento o versión, fecha de consulta y nota sobre las condiciones de ensayo. Una página de tienda o un snippet no debe sustituir el manual, la ficha técnica, la etiqueta o EPREL cuando estos existan.

**Decisión y trabajo necesarios**

- Elegir qué modelos reales respaldarán los ejemplos prioritarios de cada aparato.
- Archivar o registrar las fichas primarias y sus fechas, respetando derechos de autor.
- Marcar como ejemplo educativo cualquier cifra que no sea un dato oficial de ese modelo.
- Definir una cadencia de revisión y qué páginas dejan de ser indexables si pierden su fuente verificable.

**Conducta provisional segura**

No ampliar rangos ni publicar nuevas cifras de fabricante hasta verificar la fuente. Las fórmulas pueden publicarse sin convertir entradas ilustrativas en valores «típicos» o garantizados.

## 5. Precio de ejemplo de la electricidad

**Estado:** abierta; el repositorio usa actualmente `0,25 €/kWh` como entrada ilustrativa en varios ejemplos y calculadoras.

Esa cifra no debe presentarse como el precio actual, medio u oficial de la electricidad en España. El coste de cada hogar depende del contrato, periodos, fechas y de qué conceptos se incluyan. Mezclar un ejemplo editorial con un precio externo futuro impediría saber qué dato se está usando.

**Decisión necesaria**

- Confirmar si se mantiene `0,25 €/kWh` exclusivamente como ejemplo pedagógico o se elige otro valor con una justificación y fecha de referencia.
- Centralizar y nombrar por separado `exampleElectricityPrice`, `userElectricityPrice` y, si llega a existir, `externalElectricityPrice` con fuente, fecha y política de actualización.
- Decidir si el usuario introduce el precio de cada periodo o un precio efectivo simplificado, y explicar qué cargos quedan fuera.

**Conducta provisional segura**

Mantener el campo editable y etiquetar de forma visible «precio utilizado en este ejemplo». No actualizar automáticamente una cifra sin mostrar fuente, fecha y alcance, ni presentar la estimación de energía como el total completo de la factura.

## 6. Identificador y cuenta de Amazon Afiliados

**Estado:** abierta; el código contiene el identificador `vatio-21`, pero el repositorio no demuestra que siga activo ni que pertenezca al titular.

**Decisión necesaria**

- Confirmar en Amazon Afiliados la cuenta, el territorio, el identificador y los dominios autorizados.
- Revisar que el texto de divulgación y el uso de `sponsored nofollow` cumplan las condiciones vigentes del programa.
- Definir quién revisará enlaces rotos, productos retirados y cambios de referencia.

**Conducta provisional segura**

No afirmar que el identificador está validado solo porque aparece en el código. No añadir precios, estrellas ni experiencia de uso no documentada.

## 7. Activación futura de publicidad y medición

**Estado:** abierta; los espacios publicitarios están preparados pero desactivados.

**Decisión necesaria**

- Aportar el identificador de editor y las unidades reales solo cuando exista una cuenta aprobada.
- Revisar consentimiento, privacidad y cookies antes de cargar scripts publicitarios o nuevas herramientas de medición.
- Fijar objetivos de producto para los eventos ya preparados y una política de retención que evite datos personales o valores introducidos en las calculadoras.

**Conducta provisional segura**

Mantener `ADVERTISING_ENABLED` desactivado. La calculadora y su resultado deben seguir apareciendo antes que cualquier anuncio cuando se active.
