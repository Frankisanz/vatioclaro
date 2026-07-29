import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativePages = [
  { path: "/", heading: /Descubre dónde se va cada euro/i },
  {
    path: "/consumo/lavadora",
    heading: /Cuánto consume (una |la )?lavadora/i,
  },
  {
    path: "/guias/potencia-contratada",
    heading: /Qué potencia eléctrica contratar en casa/i,
  },
  {
    path: "/guias/etiqueta-energetica-a-euros",
    heading: /Cómo convertir la etiqueta energética en euros/i,
  },
  { path: "/calculadora", heading: /Calculadora de consumo eléctrico/i },
  { path: "/cookies", heading: /Política de cookies/i },
] as const;

for (const { path, heading } of representativePages) {
  test(`${path} carga y conserva su estructura principal`, async ({ page }) => {
    const response = await page.goto(path);

    expect(response?.ok()).toBeTruthy();
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
}

test("la calculadora actualiza consumo y costes sin recargar", async ({ page }) => {
  await page.goto("/calculadora");

  await page.locator("#watts").fill("1000");
  await page.locator("#hours").fill("2");
  await page.locator("#days").fill("30");
  await page.locator("#price").fill("0.25");

  const result = page.locator(".calculator-result");
  await expect(result.getByText("15,00€", { exact: true })).toBeVisible();
  await expect(result.getByText("60 kWh", { exact: true })).toBeVisible();
  await expect(result.getByText("180,00€", { exact: true })).toBeVisible();
});

test("una ruta inexistente devuelve la página 404 útil", async ({ page }) => {
  const response = await page.goto("/esta-ruta-no-existe");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: /Esta página no consume nada/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Volver al inicio/i })).toBeVisible();
});

test("las nuevas herramientas editoriales recalculan escenarios", async ({ page }) => {
  await page.goto("/guias/etiqueta-energetica-a-euros");

  await expect(page.getByText("45,00€", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /kWh por 100 ciclos/i }).click();
  await expect(page.getByText("26,40€", { exact: true })).toBeVisible();

  await page.goto("/guias/potencia-contratada");
  await expect(page.getByText("3,6 kW", { exact: true })).toBeVisible();
  await expect(page.getByText("2,7 kW", { exact: true })).toBeVisible();
  await page.getByLabel("Contratada en punta/llano").fill("3.4");
  await expect(
    page.getByText(
      "La referencia con margen supera la potencia contratada actual.",
      { exact: true },
    ),
  ).toBeVisible();
});

for (const path of [
  "/",
  "/consumo/lavadora",
  "/guias/potencia-contratada",
  "/cookies",
] as const) {
  test(`${path} no presenta infracciones automáticas WCAG A/AA`, async ({
    page,
  }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(
      results.violations,
      results.violations
        .map(
          ({ help, id, nodes }) =>
            `${id}: ${help} (${nodes.length} nodo${nodes.length === 1 ? "" : "s"})`,
        )
        .join("\n"),
    ).toEqual([]);
  });
}
