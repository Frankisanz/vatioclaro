import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativePages = [
  { path: "/", heading: /Descubre dónde se va cada euro/i },
  {
    path: "/consumo/lavadora",
    heading: /Cuánto consume (una |la )?lavadora/i,
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

for (const path of ["/", "/consumo/lavadora", "/cookies"] as const) {
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
