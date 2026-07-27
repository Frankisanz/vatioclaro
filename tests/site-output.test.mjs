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
  assert.match(html, /Calculadora de consumo eléctrico y guías de ahorro/);
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
});

test("publishes complete legal, privacy and cookie information", async () => {
  const [legal, privacy, cookies] = await Promise.all([
    readOutput("aviso-legal.html"),
    readOutput("privacidad.html"),
    readOutput("cookies.html"),
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
});
