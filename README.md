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
- Medición agregada de tráfico y Core Web Vitals con Cloudflare Web Analytics.
- Pruebas de navegador y accesibilidad automatizadas.
- Exportación estática desplegable en Cloudflare Workers Static Assets.

## Desarrollo local

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

La web se abre por defecto en `http://localhost:3000`.

Para comprobar exactamente el artefacto estático que servirá Cloudflare:

```bash
npm run build
npm run preview
```

## Comprobación

```bash
npm run lint
npm test
npm run check:cloudflare
```

Para instalar Chromium y ejecutar las pruebas reales del navegador:

```bash
npx playwright install chromium
npm run test:e2e
```

## Despliegue

La configuración reproducible está en `wrangler.jsonc`. `npm run deploy`
compila `out/` y lo publica como activos estáticos, sin un proceso Node ni
código Worker por petición. El despliegue automático permanece desactivado
hasta configurar los secretos y la variable de activación en GitHub.

Consulta `docs/MIGRACION-CLOUDFLARE.md` para el alta del proyecto, el cambio de
dominio, la analítica, la retirada gradual de Vercel y el rollback.

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
