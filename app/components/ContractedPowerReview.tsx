"use client";

import { useMemo, useState } from "react";

function toNonNegativeNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

function roundUpToTenth(value: number) {
  return Math.ceil(value * 10) / 10;
}

function getReviewMessage(current: number, reference: number) {
  const difference = current - reference;

  if (difference >= 0.5) {
    return "Hay margen aparente para revisar este periodo.";
  }

  if (difference >= 0) {
    return "La potencia actual está cerca de la referencia calculada.";
  }

  return "La referencia con margen supera la potencia contratada actual.";
}

export function ContractedPowerReview() {
  const [currentPeak, setCurrentPeak] = useState(4.6);
  const [currentValley, setCurrentValley] = useState(4.6);
  const [demandPeak, setDemandPeak] = useState(3.2);
  const [demandValley, setDemandValley] = useState(2.4);
  const [margin, setMargin] = useState(10);

  const result = useMemo(() => {
    const multiplier = 1 + margin / 100;
    const referencePeak = roundUpToTenth(demandPeak * multiplier);
    const referenceValley = roundUpToTenth(demandValley * multiplier);

    return {
      referencePeak,
      referenceValley,
      peakMessage: getReviewMessage(currentPeak, referencePeak),
      valleyMessage: getReviewMessage(currentValley, referenceValley),
    };
  }, [currentPeak, currentValley, demandPeak, demandValley, margin]);

  return (
    <div className="energy-calculator power-review">
      <div>
        <div className="calculator-context">
          <span>REVISIÓN ORIENTATIVA</span>
          <p>
            Copia de tu factura o área de la distribuidora la potencia
            contratada y la máxima demandada de un periodo representativo.
          </p>
        </div>
        <div className="calculator-fields">
          <div className="field">
            <label htmlFor="current-peak">Contratada en punta/llano</label>
            <div className="input-wrap">
              <input
                id="current-peak"
                inputMode="decimal"
                min="0"
                onChange={(event) =>
                  setCurrentPeak(toNonNegativeNumber(event.target.value))
                }
                step="0.1"
                type="number"
                value={currentPeak}
              />
              <span>kW</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="demand-peak">Máxima demandada en punta/llano</label>
            <div className="input-wrap">
              <input
                id="demand-peak"
                inputMode="decimal"
                min="0"
                onChange={(event) =>
                  setDemandPeak(toNonNegativeNumber(event.target.value))
                }
                step="0.1"
                type="number"
                value={demandPeak}
              />
              <span>kW</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="current-valley">Contratada en valle</label>
            <div className="input-wrap">
              <input
                id="current-valley"
                inputMode="decimal"
                min="0"
                onChange={(event) =>
                  setCurrentValley(toNonNegativeNumber(event.target.value))
                }
                step="0.1"
                type="number"
                value={currentValley}
              />
              <span>kW</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="demand-valley">Máxima demandada en valle</label>
            <div className="input-wrap">
              <input
                id="demand-valley"
                inputMode="decimal"
                min="0"
                onChange={(event) =>
                  setDemandValley(toNonNegativeNumber(event.target.value))
                }
                step="0.1"
                type="number"
                value={demandValley}
              />
              <span>kW</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="power-margin">Margen de seguridad</label>
            <div className="input-wrap">
              <input
                id="power-margin"
                inputMode="decimal"
                max="100"
                min="0"
                onChange={(event) =>
                  setMargin(toNonNegativeNumber(event.target.value))
                }
                step="1"
                type="number"
                value={margin}
              />
              <span>%</span>
            </div>
          </div>
        </div>
        <p className="calculator-note">
          La referencia no es una recomendación contractual. Revisa al menos un
          año, los aparatos que coinciden, posibles cambios de hábitos y la
          potencia máxima admisible antes de solicitar una modificación.
        </p>
      </div>

      <div aria-live="polite" className="calculator-result power-review__result">
        <span className="calculator-result__label">
          REFERENCIA CON MARGEN
        </span>
        <div className="power-review__figures">
          <div>
            <small>PUNTA / LLANO</small>
            <strong>{result.referencePeak.toLocaleString("es-ES")} kW</strong>
            <p>{result.peakMessage}</p>
          </div>
          <div>
            <small>VALLE</small>
            <strong>{result.referenceValley.toLocaleString("es-ES")} kW</strong>
            <p>{result.valleyMessage}</p>
          </div>
        </div>
        <p className="power-review__warning">
          No solicites una bajada basándote solo en este cálculo.
        </p>
      </div>
    </div>
  );
}
