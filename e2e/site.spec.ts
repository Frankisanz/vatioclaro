import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

const SITE_URL = "https://vatioclaro.es";

async function expectFiniteResult(result: Locator) {
  await expect(result).toBeVisible();
  await expect(result).not.toContainText(/NaN|Infinity/);
}

async function normalizedText(locator: Locator) {
  return (await locator.innerText()).replace(/\s/g, "");
}

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
  {
    path: "/recomendaciones/medidores-consumo-electrico-enchufe",
    heading: /Medidores de consumo eléctrico de enchufe/i,
  },
  {
    path: "/calculadora",
    heading: /Convierte el consumo de tu aparato en euros/i,
  },
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

const newIndexableRoutes = [
  {
    path: "/comparativas",
    heading: /Dos opciones, una misma tarea/i,
  },
  {
    path: "/calculadora/comparar",
    heading: /Compara dos usos eléctricos con la misma tarea/i,
  },
  {
    path: "/calculadora/standby",
    heading: /Cuánto cuesta dejar tus aparatos en standby/i,
  },
  {
    path: "/calculadora/etiqueta-energetica",
    heading: /Convierte la etiqueta energética en coste de uso/i,
  },
  {
    path: "/calculadora/amortizacion",
    heading: /Compara el precio de compra y el consumo/i,
  },
] as const;

for (const { path, heading } of newIndexableRoutes) {
  test(`${path} expone H1 y canonical propios`, async ({ page }) => {
    const response = await page.goto(path);

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      SITE_URL + path,
    );
  });
}

test("la calculadora universal cambia de método y acepta coma decimal", async ({
  page,
}) => {
  await page.goto("/calculadora");

  const calculator = page.locator(".universal-calculator");
  const result = calculator.locator(".calculator-output");
  const initialResult = await result.innerText();
  const wattsInput = calculator.getByLabel("Potencia eléctrica");
  const wattsDescription = await wattsInput.getAttribute("aria-describedby");
  expect(wattsDescription).toContain("-unit");
  await expect(page.locator(`#${wattsDescription?.split(" ")[0]}`)).toHaveText("W");

  await wattsInput.fill("500,5");
  await calculator.getByLabel("Horas de uso al día").fill("2");
  await calculator.getByLabel("Días de uso al mes").fill("30");
  await calculator.getByLabel("Precio de la energía").fill("0,25");
  await expectFiniteResult(result);
  await expect.poll(() => result.innerText()).not.toBe(initialResult);

  const methods = calculator.getByRole("group", { name: "Método de cálculo" });

  await methods.getByRole("button", { name: /Consumo por ciclo/i }).click();
  await expect(methods.getByRole("button", { name: /Consumo por ciclo/i })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await calculator.getByLabel("Consumo por ciclo").fill("0,8");
  await calculator.getByLabel("Ciclos al mes").fill("12");
  await expectFiniteResult(result);

  await methods.getByRole("button", { name: /Etiqueta anual/i }).click();
  await calculator.getByLabel("Consumo de la etiqueta").fill("240,5");
  await expectFiniteResult(result);

  await methods.getByRole("button", { name: /Consumo diario/i }).click();
  await calculator.getByLabel("Consumo medido cada día").fill("1,25");
  await expectFiniteResult(result);
});

test("la calculadora valida vacío, negativo y magnitud absurda sin resultados no finitos", async ({
  page,
}) => {
  await page.goto("/calculadora");

  const calculator = page.locator(".universal-calculator");
  const watts = calculator.getByLabel("Potencia eléctrica");

  await watts.fill("");
  await expect(calculator.getByRole("alert")).toContainText(/obligatorio/i);
  await expect(calculator).not.toContainText(/NaN|Infinity/);

  await watts.fill("-1");
  await expect(calculator.getByRole("alert")).toContainText(/negativo/i);
  await expect(calculator).not.toContainText(/NaN|Infinity/);

  await watts.fill("1.500");
  await expect(calculator.getByRole("alert")).toContainText(
    /separadores de miles/i,
  );
  await expect(calculator).not.toContainText(/NaN|Infinity/);

  await watts.fill("999999999999999999999999");
  await expect(calculator.getByRole("alert")).toContainText(/demasiado grande/i);
  await expect(calculator).not.toContainText(/NaN|Infinity/);
});

test("el enlace compartible usa parámetros permitidos, canonical limpia y noindex", async ({
  page,
}) => {
  await page.goto("/calculadora");

  const calculator = page.locator(".universal-calculator");
  await calculator.getByLabel("Potencia eléctrica").fill("800");
  await calculator.getByLabel("Horas de uso al día").fill("1,5");
  await calculator.getByLabel("Días de uso al mes").fill("20");
  await calculator.getByLabel("Precio de la energía").fill("0,25");
  await calculator.getByRole("button", { name: /Copiar enlace del cálculo/i }).click();

  const sharedUrl = new URL(page.url());
  expect(sharedUrl.pathname).toBe("/calculadora");
  expect([...sharedUrl.searchParams.keys()].sort()).toEqual(
    ["dias", "horas", "metodo", "precio", "watts"].sort(),
  );
  expect(Object.fromEntries(sharedUrl.searchParams)).toMatchObject({
    dias: "20",
    horas: "1.5",
    metodo: "potencia",
    precio: "0.25",
    watts: "800",
  });

  await page.reload();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    SITE_URL + "/calculadora",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/i,
  );
  await expect(calculator.getByLabel("Horas de uso al día")).toHaveValue("1.5");
  await expectFiniteResult(calculator.locator(".calculator-output"));
});

test("la comparación A/B calcula la diferencia entre dos escenarios", async ({
  page,
}) => {
  await page.goto("/calculadora/comparar");

  const calculator = page.locator(".comparison-calculator");
  const scenarioA = calculator.getByRole("group", { name: "Escenario A" });
  const scenarioB = calculator.getByRole("group", { name: "Escenario B" });

  await scenarioA.getByLabel("Potencia eléctrica").fill("1000");
  await scenarioA.getByLabel("Horas de uso al día").fill("1");
  await scenarioA.getByLabel("Días al mes").fill("30");
  await scenarioB.getByLabel("Potencia eléctrica").fill("500");
  await scenarioB.getByLabel("Horas de uso al día").fill("1");
  await scenarioB.getByLabel("Días al mes").fill("30");
  await calculator.getByLabel("Precio de la energía para ambos").fill("0,25");

  const difference = calculator.locator(".comparison-result__difference");
  await expectFiniteResult(difference);
  await expect(difference).toContainText(/DIFERENCIA B − A/i);
  await expect(difference).toContainText(/El escenario B tiene menor coste/i);
});

test("standby calcula un ejemplo controlado", async ({ page }) => {
  await page.goto("/calculadora/standby");

  const calculator = page.locator(".standby-calculator");
  await calculator.getByLabel("Número de aparatos").fill("2");
  await calculator.getByLabel("Consumo medio por aparato").fill("1");
  await calculator.getByLabel("Horas en espera al día").fill("12");
  await calculator.getByLabel("Días al año").fill("365");
  await calculator.getByLabel("Precio de la energía").fill("0,25");

  const result = calculator.locator(".calculator-output");
  await expectFiniteResult(result);
  const text = await normalizedText(result);
  expect(text).toContain("8,76kWh");
  expect(text).toContain("2,19€");
});

test("la calculadora de etiqueta cubre kWh anuales y por 100 ciclos", async ({
  page,
}) => {
  await page.goto("/calculadora/etiqueta-energetica");

  const calculator = page.locator(".label-calculator");
  await calculator.getByLabel("Consumo indicado en la etiqueta").fill("200");
  await calculator.getByLabel("Precio que quieres analizar").fill("0,25");

  const result = calculator.locator(".calculator-output");
  await expectFiniteResult(result);
  expect(await normalizedText(result)).toContain("200kWh");
  expect(await normalizedText(result)).toContain("50,00€");

  await calculator.getByRole("button", { name: /kWh por 100 ciclos/i }).click();
  await calculator.getByLabel("Consumo indicado en la etiqueta").fill("50");
  await calculator.getByLabel("Ciclos que haces al mes").fill("20");
  await expectFiniteResult(result);
  expect(await normalizedText(result)).toContain("120kWh");
  expect(await normalizedText(result)).toContain("30,00€");

  const cycles = calculator.getByLabel("Ciclos que haces al mes");
  await cycles.fill("-1");
  await expect(cycles).toHaveAttribute("aria-invalid", "true");
  await expect(calculator.getByRole("alert")).toContainText(/negativo/i);
  await expect(calculator).not.toContainText(/NaN|Infinity/);
});

test("la amortización distingue plazo calculable y ausencia de ahorro", async ({
  page,
}) => {
  await page.goto("/calculadora/amortizacion");

  const calculator = page.locator(".ownership-calculator");
  const productA = calculator.getByRole("group", { name: "Producto A" });
  const productB = calculator.getByRole("group", { name: "Producto B" });

  await productA.getByLabel("Precio de compra").fill("500");
  await productA.getByLabel("Consumo declarado").fill("300");
  await productB.getByLabel("Precio de compra").fill("600");
  await productB.getByLabel("Consumo declarado").fill("100");
  await calculator.getByLabel("Precio de la energía").fill("0,25");

  const result = calculator.locator(".ownership-result");
  await expectFiniteResult(result);
  await expect(result).toContainText(/en 2 años/i);

  await productB.getByLabel("Precio de compra").fill("501");
  await expect(result).toContainText(/menos de un mes/i);

  await productB.getByLabel("Consumo declarado").fill("400");
  await expect(result).toContainText(/no genera un ahorro energético anual/i);
  await expect(result).toContainText(/Sobrecoste anual estimado con B/i);
  await expect(result).not.toContainText(/-\s*25,00/);
  await expect(result).not.toContainText(/NaN|Infinity/);
});

test("una tabla comparativa tiene caption y región de desplazamiento enfocables", async ({
  page,
}) => {
  await page.goto("/guias/horno-vs-freidora-aire-consumo");

  const scrollRegion = page.locator(".editorial-comparison .table-scroll");
  const table = scrollRegion.getByRole("table");
  await expect(scrollRegion).toHaveAttribute("tabindex", "0");
  await scrollRegion.focus();
  await expect(scrollRegion).toBeFocused();
  await expect(table.locator("caption")).toContainText(/Comparación entre/i);
});

test("el menú móvil abre, cierra con botón y Escape, y navega", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menu = page.getByRole("button", { name: "Menú principal" });
  await expect(menu).toHaveAttribute("aria-expanded", "false");

  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: /Navegación principal móvil/i })).toBeVisible();

  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");

  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();

  await menu.click();
  await page
    .getByRole("navigation", { name: /Navegación principal móvil/i })
    .getByRole("link", { name: "Comparativas" })
    .click();
  await expect(page).toHaveURL(/\/comparativas$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Dos opciones, una misma tarea/i,
  );
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("una ruta inexistente devuelve la página 404 útil", async ({ page }) => {
  const response = await page.goto("/esta-ruta-no-existe");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: /Esta página no consume nada/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Volver al inicio/i })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test("las herramientas editoriales recalculan escenarios", async ({ page }) => {
  await page.goto("/guias/etiqueta-energetica-a-euros");

  const labelCalculator = page.locator(".label-calculator");
  const annualMode = labelCalculator.getByRole("button", {
    name: /kWh al año/i,
  });
  const cycleMode = labelCalculator.getByRole("button", {
    name: /kWh por 100 ciclos/i,
  });
  await cycleMode.click();
  await expect(cycleMode).toHaveAttribute("aria-pressed", "true");
  await annualMode.click();
  await expect(annualMode).toHaveAttribute("aria-pressed", "true");
  await labelCalculator.getByLabel("Consumo indicado en la etiqueta").fill("180");
  await labelCalculator.getByLabel("Precio que quieres analizar").fill("0,25");
  const labelResult = labelCalculator.locator(".calculator-output");
  await expectFiniteResult(labelResult);
  expect(await normalizedText(labelResult)).toContain("45,00€");
  await cycleMode.click();
  await labelCalculator.getByLabel("Consumo indicado en la etiqueta").fill("55");
  await labelCalculator.getByLabel("Ciclos que haces al mes").fill("16");
  await expectFiniteResult(labelResult);
  expect(await normalizedText(labelResult)).toContain("26,40€");

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

  const demandPeak = page.getByLabel("Máxima demandada en punta/llano");
  const powerReviewError = page.locator(".power-review .field-error");
  await demandPeak.fill("");
  await expect(demandPeak).toHaveAttribute("aria-invalid", "true");
  await expect(powerReviewError).toContainText(/obligatorio/i);

  await demandPeak.fill("-1");
  await expect(powerReviewError).toContainText(/negativo/i);

  await demandPeak.fill("3,2");
  await page.getByLabel("Margen de seguridad").fill("101");
  await expect(powerReviewError).toContainText(/100 %/i);

  await page.getByLabel("Margen de seguridad").fill("10");
  await demandPeak.fill("999999999999999999999999");
  await expect(powerReviewError).toContainText(/demasiado grande/i);
  await expect(page.locator(".power-review")).not.toContainText(/NaN|Infinity|∞/);
});

for (const path of [
  "/",
  "/consumo/lavadora",
  "/guias/potencia-contratada",
  "/recomendaciones/medidores-consumo-electrico-enchufe",
  "/cookies",
  "/calculadora",
  "/comparativas",
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

test("la portada móvil no presenta infracciones automáticas WCAG A/AA", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

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
