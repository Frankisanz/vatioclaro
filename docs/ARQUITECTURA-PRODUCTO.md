# Arquitectura de producto de VatioClaro

Última revisión: 17 de agosto de 2026.

## Núcleo de cálculo

`lib/electricity.ts` es el único núcleo matemático. Recibe entradas tipadas por
método (`power`, `cycle`, `annual`, `daily` o `standby`) y devuelve periodos
normalizados de consumo y coste. Comparación, escenarios, etiqueta y coste de
propiedad se construyen sobre ese núcleo; las vistas no deben repetir fórmulas.

Los cálculos son funciones puras, sin navegador, red, moneda o contenido. El
locale y la presentación se aplican al final. `exampleElectricityPrice` está
separado del valor editado por el usuario y de una futura
`externalElectricityPrice`, que permanece `null` hasta disponer de fuente,
fecha, alcance y política de actualización.

## Datos editoriales

`lib/appliances.ts` conserva el contenido específico de cada aparato y enriquece
cada registro con:

- método e inputs de cálculo;
- motivo y naturaleza del ejemplo;
- fecha de revisión;
- fuentes con alcance explícito;
- estado `indexable`;
- validación de slug, fechas, URLs y entradas al cargar el módulo.

Una fuente que explica una unidad o una norma no se presenta como origen de un
ejemplo educativo. El sitemap solo incluye registros marcados como indexables.

## Interfaz y rutas

Las calculadoras son componentes cliente pequeños sobre páginas y contenido
renderizados en servidor. `/calculadora` admite parámetros permitidos para
guardar o compartir un escenario, conserva canonical limpia y añade `noindex`
cuando existe una consulta. Las combinaciones no generan páginas editoriales.

Las herramientas especializadas viven bajo `/calculadora/` y las comparativas
editoriales siguen bajo sus URLs históricas de `/guias/`, conectadas por el hub
`/comparativas`.

## Futuro `/mi-consumo`

No requiere cuentas ni base de datos. Una primera versión puede guardar en el
navegador un documento versionado como este:

```ts
type LocalHomeEstimate = {
  schemaVersion: 1;
  locale: "es-ES";
  currency: "EUR";
  items: Array<{
    id: string;
    label: string;
    input: CalculationInput;
  }>;
};
```

Cada elemento se calcula con el motor actual y después se suman sus periodos.
La capa de almacenamiento debe validar y migrar el esquema, permitir exportar o
borrar los datos y no enviar aparatos, hábitos ni costes a analítica. Esta
extensión no debe alterar la indexación ni crear URLs públicas automáticamente.

## Operación y monetización

`AdSlot` no renderiza nada mientras la configuración esté desactivada. Activar
un proveedor exigirá revisión legal y de consentimiento, dimensiones reservadas
y pruebas de CLS. Afiliación, anuncios o leads no pueden modificar fuentes,
conclusiones ni el orden de publicación.

El flujo de producción observado es Vercel, pero la decisión se mantiene abierta
en `docs/DECISIONES-PENDIENTES.md`; este trabajo no publica ni modifica DNS.
