# VatioClaro

Portal en español para calcular el consumo y el coste eléctrico de los
electrodomésticos del hogar.

## Qué incluye

- Calculadora interactiva de vatios, horas, días y precio por kWh.
- Guías de consumo por electrodoméstico.
- Metodología y fuentes visibles.
- Metadatos SEO, sitemap, robots y datos estructurados.
- Diseño responsive.

## Desarrollo local

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

La web se abre por defecto en `http://localhost:3000`.

## Comprobación

```bash
npm run build
```

## Estructura principal

- `app/`: páginas, componentes y estilos.
- `lib/appliances.ts`: datos editoriales de los aparatos.
- `public/og.png`: imagen social.
- `ESTRATEGIA.md`: estrategia inicial de contenidos y monetización.

Antes del lanzamiento público deben completarse los datos legales del titular,
conectar el dominio definitivo y configurar consentimiento, analítica y Search
Console.
