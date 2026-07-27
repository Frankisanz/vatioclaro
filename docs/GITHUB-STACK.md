# Selección de herramientas de GitHub

Revisión realizada el 27 de julio de 2026. Las estrellas son una fotografía de
ese día; la decisión también considera mantenimiento reciente, licencia,
compatibilidad con Next.js 16, React 19 y Tailwind CSS 4, coste de JavaScript y
la necesidad real del proyecto.

| Repositorio | Estrellas | Licencia | Decisión |
| --- | ---: | --- | --- |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | 119.924 | MIT | Fuente futura de componentes concretos; no inicializar el sistema completo. |
| [Playwright](https://github.com/microsoft/playwright) | 93.546 | Apache-2.0 | Instalado para probar rutas, interacción e hidratación en Chromium. |
| [Storybook](https://github.com/storybookjs/storybook) | 90.684 | MIT | Pospuesto: el catálogo actual de componentes no justifica otra aplicación. |
| [daisyUI](https://github.com/saadeghi/daisyui) | 41.846 | MIT | Descartado: sus temas globales competirían con el diseño editorial propio. |
| [Mantine](https://github.com/mantinedev/mantine) | 31.488 | MIT | Descartado: añade proveedor, estilos y componentes cliente innecesarios. |
| [HeroUI](https://github.com/heroui-inc/heroui) | 30.219 | Apache-2.0 | Descartado: sustituiría el sistema visual actual y ampliaría mucho el bundle. |
| [Headless UI](https://github.com/tailwindlabs/headlessui) | 28.675 | MIT | Pospuesto: no hay todavía un componente complejo que lo necesite. |
| [Lucide](https://github.com/lucide-icons/lucide) | 23.651 | ISC/MIT | Instalado: iconos SVG coherentes, sin dependencias de ejecución y tree-shaking. |
| [Radix Primitives](https://github.com/radix-ui/primitives) | 19.098 | MIT | Usar solo la primitiva concreta cuando aparezca un diálogo, select o tooltip. |
| [axe-core](https://github.com/dequelabs/axe-core) | 7.348 | MPL-2.0 | Instalado mediante su adaptador oficial para Playwright. |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | 7.028 | Apache-2.0 | Pospuesto: mantenimiento menos reciente y una cadena de dependencias envejecida. |
| [Unlighthouse](https://github.com/harlan-zw/unlighthouse) | 4.736 | MIT | Candidato futuro para auditar todo el sitemap cuando se eleve el mínimo de Node. |

## Herramientas incorporadas

- `@playwright/test`: comprueba páginas representativas, la calculadora y la
  respuesta 404 en un navegador real.
- `@axe-core/playwright`: detecta automáticamente infracciones WCAG A y AA en
  las plantillas principales.
- `lucide-react`: sustituye símbolos tipográficos por iconos accesibles y
  consistentes.
- `@vercel/analytics` y `@vercel/speed-insights`: muestran páginas vistas,
  procedencia y Core Web Vitals sin instalar cookies.
- GitHub Actions: ejecuta lint, build, pruebas estáticas, navegador y
  accesibilidad en cada cambio.
- Dependabot: propone actualizaciones semanales de npm y mensuales de Actions.

## Criterio de mantenimiento

No se copiarán repositorios completos ni se añadirá un framework visual por su
popularidad. Cada paquete nuevo debe resolver un problema observable, tener una
licencia compatible, estar mantenido y superar las mismas comprobaciones
automáticas antes de llegar a producción.
