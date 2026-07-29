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
  assert.match(
    sitemap,
    /https:\/\/vatioclaro\.es\/recomendaciones\/medidores-consumo-electrico-enchufe<\/loc>/,
  );
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
    "B0F24JK3D5",
  ];

  assert.match(
    hub,
    /Compra solo la herramienta que resuelve tu duda/,
  );

  for (const guide of guides) {
    assert.match(guide, /"@type":"Article"/);
    assert.match(guide, /"@type":"FAQPage"/);
    assert.match(guide, /Tres perfiles, no un podio/);
    assert.match(guide, /Publicidad · enlace de afiliado/);
    assert.match(guide, /tag=vatio-21/);
    assert.doesNotMatch(guide, /amazon\.es\/s\?/);
    assert.equal(
      guide.match(
        /href="https:\/\/www\.amazon\.es\/dp\/[A-Z0-9]{10}\?tag=vatio-21"/g,
      )?.length,
      3,
    );
    assert.match(
      guide,
      /rel="sponsored nofollow noopener noreferrer"/,
    );
    assert.doesNotMatch(guide, /"@type":"Product"/);
  }

  for (const asin of expectedAsins) {
    assert.match(
      allGuides,
      new RegExp(`amazon\\.es\\/dp\\/${asin}\\?tag=vatio-21`),
    );
  }
});
