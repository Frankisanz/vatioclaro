# Migración de VatioClaro a Cloudflare

Última revisión: 27 de agosto de 2026.

## Arquitectura elegida

VatioClaro se compila con `output: "export"` y genera `out/`. Cloudflare
Workers Static Assets sirve esa carpeta directamente desde su red, sin ejecutar
un proceso Node ni código Worker en cada petición.

Esta opción mantiene las calculadoras en el navegador, reduce superficie de
fallo y evita introducir vinext u OpenNext cuando no existen rutas API, SSR,
ISR, Server Actions ni datos dinámicos de servidor. Si en el futuro aparece una
necesidad real de backend, deberá reevaluarse esta decisión antes de añadirla.

La configuración versionada es `wrangler.jsonc`. No deben reutilizarse los
directorios locales antiguos `dist/`, `.vinext/` o `.wrangler/` como fuente de
despliegue. Los scripts pasan `--config wrangler.jsonc` de forma explícita para
que una caché local antigua no pueda desviar Wrangler hacia esos artefactos.

## Validación local

Requiere Node.js 22.13 o posterior.

```bash
npm ci
npm run lint
npm test
npm run check:cloudflare
npm run test:e2e
```

`npm test` comprueba cálculos, construye la exportación y valida directamente
los archivos de `out/`. Las pruebas E2E vuelven a compilar y levantan
`wrangler dev`, por lo que comprueban el enrutado, las cabeceras y el 404 que
servirá Cloudflare.

Para una revisión manual:

```bash
npm run build
npm run preview
```

## Activar el despliegue de GitHub

El workflow de calidad solo publica después de que lint, tests, build,
validación de Wrangler, navegación y accesibilidad hayan terminado bien. El
paso está desactivado por defecto.

1. Crear en Cloudflare un token limitado a la cuenta de VatioClaro con permiso
   para editar Workers.
2. Añadir en GitHub Actions los secretos `CLOUDFLARE_API_TOKEN` y
   `CLOUDFLARE_ACCOUNT_ID`.
3. Añadir la variable de repositorio `CLOUDFLARE_DEPLOY_ENABLED` con valor
   `true` solo cuando el Worker y el corte estén preparados.
4. No activar simultáneamente Workers Builds u otra integración Git de
   Cloudflare: `.github/workflows/quality.yml` debe ser el único flujo de
   producción.

También puede hacerse un primer despliegue autenticado desde una estación de
trabajo:

```bash
npx wrangler login
npm run deploy
```

`npm run deploy` vuelve a construir antes de publicar. No requiere variables de
ejecución ni secretos dentro de la aplicación.

## Preparación en Cloudflare

Antes de cambiar tráfico:

1. Desplegar y revisar el hostname temporal `workers.dev`. `public/_headers`
   envía `X-Robots-Tag: noindex` en estos hostnames para evitar duplicados.
2. Añadir `vatioclaro.es` como dominio personalizado del Worker. Configurar el
   dominio `www` mediante una redirección de zona al dominio canónico si se
   quiere conservar.
3. Activar Cloudflare Web Analytics para `vatioclaro.es` y revisar la opción
   aplicable a visitantes de la UE con criterio jurídico. La inyección ocurre
   en la red de Cloudflare y no aparece en el HTML local.
4. Verificar que el beacon de rendimiento llega a `/cdn-cgi/rum`, que no se
   registran cadenas de consulta y que no existen eventos personalizados.
5. Comprobar `robots.txt`, `sitemap.xml`, canonical, 404, iconos, cabeceras,
   AdSense y los mecanismos de verificación de Search Console.
6. Registrar los DNS, TTL y ajustes activos de Vercel antes de modificarlos.

Cloudflare Web Analytics sustituye a Vercel Analytics y Speed Insights para
páginas vistas y Core Web Vitals. Cloudflare no admite eventos personalizados;
por eso se retiraron las llamadas de interacción en lugar de introducir un
segundo proveedor o recoger valores de calculadora.

## Corte y retirada de Vercel

1. Publicar una versión final y ejecutar la lista completa de validación.
2. Asociar `vatioclaro.es` al Worker y confirmar TLS, DNS y respuesta desde
   varias redes.
3. Verificar en producción la portada, una ficha, una guía, una recomendación,
   la calculadora compartida, el sitemap y una URL inexistente.
4. Desactivar la integración Git de Vercel para impedir despliegues paralelos.
5. Mantener temporalmente el último despliegue de Vercel si se quiere conservar
   la redirección de `vatioclaro-theta.vercel.app`; Cloudflare no puede redirigir
   un hostname que pertenece a Vercel.
6. Cuando termine esa ventana, retirar de los equipos `.vercel` y cualquier
   credencial local `VERCEL_*`, revocarla y cerrar el proyecto si ya no cumple
   ninguna función. Estos elementos no están versionados y no se borran de
   forma automática durante esta preparación.

La política de privacidad y cookies ya describe el destino Cloudflare. Debe
recibir una revisión jurídica final antes del corte, junto con la configuración
real de Web Analytics y Google AdSense.

## Rollback

Cloudflare conserva versiones completas del Worker y sus activos estáticos.

```bash
npx wrangler deployments list
npx wrangler rollback
```

El segundo comando vuelve al despliegue inmediatamente anterior; también
acepta un identificador de versión concreto. Si el problema afecta al dominio y
no al artefacto, restaurar únicamente los DNS registrados antes del corte. No
eliminar el proyecto de Vercel ni sus registros anteriores hasta completar una
ventana estable de observación.

## Limitaciones conocidas

- `next.config.ts` ya no puede definir cabeceras o redirects de servidor; las
  cabeceras viven en `public/_headers` y los redirects de dominio se gestionan
  en Cloudflare.
- `next/image` funciona sin el optimizador de servidor; el recurso local se
  exporta directamente con sus dimensiones declaradas.
- `/calculadora` conserva canonical limpia. Los parámetros de enlaces
  compartidos se leen en cliente y añaden `noindex, follow` tras la hidratación;
  no crean páginas durante el build.
- Añadir SSR, APIs, ISR, autenticación o almacenamiento exige abandonar o
  ampliar conscientemente el modelo de activos estáticos.
