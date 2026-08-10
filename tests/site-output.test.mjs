import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appRoot = new URL("../.next/server/app/", import.meta.url);

async function readOutput(path) {
  return readFile(new URL(path, appRoot), "utf8");
}

test("renders a canonical, indexable homepage with the primary calculator", async () => {
  const html = await readOutput("index.html");

  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/vatioclaro\.es"/,
  );
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /Consumo eléctrico en casa: calcula cuánto gastas/);
  assert.match(html, /id="contenido"/);
  assert.match(html, /Saltar al contenido principal/);
  assert.match(html, /COSTE ANUAL/);
  assert.match(html, /vatioclaro-hogar-energia\.[a-z0-9_-]+\.webp/);
  assert.match(html, /\/guias\/induccion-vs-vitroceramica-consumo/);
  assert.match(html, /\/guias\/radiador-electrico-vs-bomba-calor/);
  assert.match(html, /\/consumo\/secadora/);
  assert.match(
    html,
    /\/recomendaciones\/termometros-frigorifico-congelador/,
  );
});

test("publishes the complete consumption library and its newest guides", async () => {
  const html = await readOutput("consumo.html");

  assert.match(html, /https:\/\/vatioclaro\.es\/consumo/);
  assert.match(html, /\/consumo\/lavadora/);
  assert.match(html, /\/consumo\/aire-acondicionado-portatil/);
  assert.match(html, /\/consumo\/freidora-de-aire/);
  assert.match(html, /"@type":"ItemList"/);
});

test("adds complete structured data and a cycle calculator to appliance pages", async () => {
  const html = await readOutput("consumo/lavadora.html");

  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/vatioclaro\.es\/consumo\/lavadora"/,
  );
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(
    html,
    /"author":\{"@id":"https:\/\/vatioclaro\.es\/sobre-vatioclaro#responsable-editorial"\}/,
  );
  assert.match(html, /Francisco Javier Sanchez Fuentes/);
  assert.match(html, /CALCULADORA POR CICLO/);
  assert.match(html, /Guías relacionadas/);
});

test("exposes all key URLs through robots and sitemap", async () => {
  const [robots, sitemap] = await Promise.all([
    readOutput("robots.txt.body"),
    readOutput("sitemap.xml.body"),
  ]);

  assert.match(robots, /Sitemap: https:\/\/vatioclaro\.es\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/vatioclaro\.es\/consumo<\/loc>/);
  assert.match(
    sitemap,
    /https:\/\/vatioclaro\.es\/guias\/como-calcular-consumo-electrico<\/loc>/,
  );
  assert.match(
    sitemap,
    /https:\/\/vatioclaro\.es\/consumo\/freidora-de-aire<\/loc>/,
  );
  assert.match(
    sitemap,
    /https:\/\/vatioclaro\.es\/guias\/por-que-ha-subido-factura-luz<\/loc>/,
  );
  assert.match(
    sitemap,
    /https:\/\/vatioclaro\.es\/guias\/potencia-contratada<\/loc>/,
  );
  for (const slug of [
    "induccion-vs-vitroceramica-consumo",
    "horno-vs-freidora-aire-consumo",
    "aire-acondicionado-split-vs-portatil",
    "radiador-electrico-vs-bomba-calor",
  ]) {
    assert.ok(
      sitemap.includes("https://vatioclaro.es/guias/" + slug + "</loc>"),
    );
  }
  assert.match(
    sitemap,
    /https:\/\/vatioclaro\.es\/recomendaciones\/medidores-consumo-electrico-enchufe<\/loc>/,
  );

  const pendingIndexingPaths = [
    "/consumo/secadora",
    "/guias/aire-acondicionado-split-vs-portatil",
    "/guias/etiqueta-energetica-a-euros",
    "/guias/horno-vs-freidora-aire-consumo",
    "/guias/induccion-vs-vitroceramica-consumo",
    "/guias/por-que-ha-subido-factura-luz",
    "/guias/potencia-contratada",
    "/guias/radiador-electrico-vs-bomba-calor",
    "/recomendaciones",
    "/recomendaciones/termometros-frigorifico-congelador",
  ];

  for (const path of pendingIndexingPaths) {
    assert.ok(
      sitemap.includes(`https://vatioclaro.es${path}</loc>`),
      `${path} debe aparecer en el sitemap`,
    );
  }

  for (const excludedPath of [
    "/afiliacion",
    "/aviso-legal",
    "/cookies",
    "/privacidad",
  ]) {
    assert.ok(
      !sitemap.includes(`https://vatioclaro.es${excludedPath}</loc>`),
      `${excludedPath} no debe aparecer en el sitemap porque lleva noindex`,
    );
  }
});

test("keeps Search Console discovery candidates indexable and self-canonical", async () => {
  const paths = [
    "consumo/secadora",
    "guias/aire-acondicionado-split-vs-portatil",
    "guias/etiqueta-energetica-a-euros",
    "guias/horno-vs-freidora-aire-consumo",
    "guias/induccion-vs-vitroceramica-consumo",
    "guias/por-que-ha-subido-factura-luz",
    "guias/potencia-contratada",
    "guias/radiador-electrico-vs-bomba-calor",
    "recomendaciones",
    "recomendaciones/termometros-frigorifico-congelador",
  ];

  const pages = await Promise.all(
    paths.map(async (path) => ({
      html: await readOutput(`${path}.html`),
      path,
    })),
  );

  for (const { html, path } of pages) {
    assert.match(html, /<meta name="robots" content="index, follow"/);
    assert.ok(
      html.includes(
        `<link rel="canonical" href="https://vatioclaro.es/${path}"`,
      ),
      `/${path} debe declarar una canonical propia`,
    );
  }
});

test("publishes problem-solving guides with sources, FAQs and tools", async () => {
  const [bill, power, label] = await Promise.all([
    readOutput("guias/por-que-ha-subido-factura-luz.html"),
    readOutput("guias/potencia-contratada.html"),
    readOutput("guias/etiqueta-energetica-a-euros.html"),
  ]);

  for (const html of [bill, power, label]) {
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /RESPUESTA RÁPIDA/);
    assert.match(html, /Fuentes oficiales y criterio de revisión/);
  }

  assert.match(power, /REVISIÓN ORIENTATIVA/);
  assert.match(label, /kWh por 100 ciclos/);
});

test("publishes substantial comparison guides with visible schemas and primary sources", async () => {
  const slugs = [
    "induccion-vs-vitroceramica-consumo",
    "horno-vs-freidora-aire-consumo",
    "aire-acondicionado-split-vs-portatil",
    "radiador-electrico-vs-bomba-calor",
  ];
  const guides = await Promise.all(
    slugs.map((slug) => readOutput("guias/" + slug + ".html")),
  );

  for (const html of guides) {
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(
      html,
      /"author":\{"@id":"https:\/\/vatioclaro\.es\/sobre-vatioclaro#responsable-editorial"\}/,
    );
    assert.match(html, /Comparación directa/);
    assert.match(html, /Fuentes oficiales y criterio de revisión/);
    assert.match(html, /vatioclaro-hogar-energia\.[a-z0-9_-]+\.webp/);
    assert.match(html, /Método y criterios/);
  }

  assert.match(guides[0], /Placas de cocina y ecodiseño/);
  assert.match(guides[1], /Hornos domésticos y etiqueta energética/);
  assert.match(guides[2], /Acondicionadores de aire y ventiladores/);
  assert.match(guides[3], /Guía de la bomba de calor/);
  assert.doesNotMatch(guides[2], /SEER.*EER|EER.*SEER/);
});

test("answers long-tail calculation questions with visible FAQ and calculated visuals", async () => {
  const html = await readOutput("guias/como-calcular-consumo-electrico.html");

  assert.match(html, /"@type":"HowTo"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /¿Cuánto consume un aparato de 1\.000 W en una hora\?/);
  assert.match(html, /Cuatro ejemplos mensuales calculados con la misma fórmula/);
  assert.match(html, /Cuánto consumen 100, 500, 1\.000 o 2\.000 W durante una hora/);
  assert.match(html, /\/guias\/horno-vs-freidora-aire-consumo/);
  assert.match(html, /vatioclaro-hogar-energia\.[a-z0-9_-]+\.webp/);
  assert.match(html, /Francisco Javier Sanchez Fuentes/);
});

test("publishes an honest responsible-editor profile and keeps publication dates distinct", async () => {
  const [about, calculation] = await Promise.all([
    readOutput("sobre-vatioclaro.html"),
    readOutput("guias/como-calcular-consumo-electrico.html"),
  ]);

  assert.match(about, /"@type":"ProfilePage"/);
  assert.match(about, /Responsable editorial de VatioClaro/);
  assert.match(about, /no equivale a una acreditación como instalador/);
  assert.match(calculation, /"datePublished":"2026-07-29"/);
  assert.match(calculation, /"dateModified":"2026-08-02"/);
});

test("publishes complete legal, privacy and cookie information", async () => {
  const [legal, privacy, cookies, affiliate] = await Promise.all([
    readOutput("aviso-legal.html"),
    readOutput("privacidad.html"),
    readOutput("cookies.html"),
    readOutput("afiliacion.html"),
  ]);

  for (const html of [legal, privacy]) {
    assert.match(html, /Francisco Javier Sanchez Fuentes/);
    assert.match(html, /15514272J/);
    assert.match(html, /23400/);
    assert.match(html, /amargued@gmail\.com/);
    assert.match(html, /noindex, follow/);
  }

  assert.match(cookies, /Cookies anal/);
  assert.match(cookies, /Vercel Web Analytics/);
  assert.match(cookies, /Medici.n agregada sin cookies/);
  assert.match(privacy, /Speed Insights/);
  assert.match(cookies, /Google AdSense/);
  assert.match(cookies, /noindex, follow/);
  assert.match(legal, /vatio-21/);
  assert.match(
    affiliate,
    /En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas/,
  );
  assert.match(affiliate, /noindex, follow/);
});

test("publishes useful and transparent Amazon buying guides", async () => {
  const [hub, ...guides] = await Promise.all([
    readOutput("recomendaciones.html"),
    readOutput(
      "recomendaciones/medidores-consumo-electrico-enchufe.html",
    ),
    readOutput(
      "recomendaciones/enchufes-inteligentes-medidor-consumo.html",
    ),
    readOutput(
      "recomendaciones/temporizadores-regletas-consumo-fantasma.html",
    ),
    readOutput("recomendaciones/termohigrometros-casa.html"),
    readOutput(
      "recomendaciones/termometros-frigorifico-congelador.html",
    ),
  ]);
  const allGuides = guides.join("\n");
  const expectedAsins = [
    "B007459MH6",
    "B09BFT7NZJ",
    "B0CKR762DL",
    "B0CJ9R466Z",
    "B0DJFCQRWL",
    "B01N1M2NZ4",
    "B083ZRMJKX",
    "B09WDMHZFP",
    "B07TV364MZ",
    "B08QRX8Y3X",
    "B0C7FJYTR2",
    "B001F8MRFM",
    "B0DNMRNRF2",
  ];

  assert.match(
    hub,
    /Compra solo la herramienta que resuelve tu duda/,
  );

  for (const guide of guides) {
    assert.match(guide, /"@type":"Article"/);
    assert.match(guide, /"@type":"FAQPage"/);
    assert.match(guide, /perfiles verificados, no un podio/);
    assert.match(guide, /Publicidad · enlace de afiliado/);
    assert.match(guide, /tag=vatio-21/);
    assert.doesNotMatch(guide, /amazon\.es\/s\?/);
    assert.match(
      guide,
      /rel="sponsored nofollow noopener noreferrer"/,
    );
    assert.doesNotMatch(guide, /"@type":"Product"/);
  }

  for (const [index, guide] of guides.entries()) {
    const expectedProductCount = index === guides.length - 1 ? 2 : 3;
    assert.equal(
      guide.match(
        /href="https:\/\/www\.amazon\.es\/dp\/[A-Z0-9]{10}\?tag=vatio-21"/g,
      )?.length,
      expectedProductCount,
    );
  }

  assert.doesNotMatch(allGuides, /B0F24JK3D5|ORIA termómetro/);
  assert.match(
    guides[0],
    /brennenstuhl\.com\/en-DE\/products\/travel-adapters-adapter-plugs\/primera-line-wattage-and-current-meter-pm-231-e/,
  );
  assert.match(
    guides[2],
    /brennenstuhl\.com\/en-DE\/products\/extension-leads\/extension-lead-individually-switchable-6-way-2m-h05vv-f-3g1\.5-white/,
  );
  assert.match(
    guides[2],
    /idae\.es\/guia-practica-de-la-energia-consumo-eficiente-y-responsable/,
  );
  assert.match(
    guides[4],
    /aesan\.gob\.es\/AECOSAN\/web\/para_el_consumidor\/ampliacion\/colocar_segura\.htm/,
  );
  assert.doesNotMatch(
    allGuides,
    /publicaciones\/guia-practica-de-la-energia|seguridad_alimentaria_hogar/,
  );

  for (const asin of expectedAsins) {
    assert.match(
      allGuides,
      new RegExp(`amazon\\.es\\/dp\\/${asin}\\?tag=vatio-21`),
    );
  }
});
