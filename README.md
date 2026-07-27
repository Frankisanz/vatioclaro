# VatioClaro

Portal en español para calcular el consumo y el coste eléctrico de los
electrodomésticos del hogar.

![Comprobaciones](https://github.com/Frankisanz/vatioclaro/actions/workflows/quality.yml/badge.svg)

## Qué incluye

- Calculadora interactiva de vatios, horas, días y precio por kWh.
- Guías de consumo por electrodoméstico.
- Metodología y fuentes visibles.
- Metadatos SEO, sitemap, robots y datos estructurados.
- Diseño responsive.
- Medición anónima de tráfico y Core Web Vitals con Vercel.
- Pruebas de navegador y accesibilidad automatizadas.

## Desarrollo local

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

La web se abre por defecto en `http://localhost:3000`.

## Comprobación

```bash
npm run lint
npm test
```

Para instalar Chromium y ejecutar las pruebas reales del navegador:

```bash
npx playwright install chromium
npm run test:e2e
```

## Estructura principal

- `app/`: páginas, componentes y estilos.
- `e2e/`: navegación, calculadora, 404 y comprobaciones WCAG A/AA.
- `lib/appliances.ts`: datos editoriales de los aparatos.
- `public/og.png`: imagen social.
- `ESTRATEGIA.md`: estrategia inicial de contenidos y monetización.
- `.github/`: control de calidad y actualizaciones automáticas.

La web canónica se publica en [vatioclaro.es](https://vatioclaro.es). Google
Search Console debe recibir `https://vatioclaro.es/sitemap.xml` cuando permita
completar la verificación.
