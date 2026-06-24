"use client";

import { useMemo, useState } from "react";
import { ToolSection } from "@/components/tools/ToolSection";

const activityOptions = [
  { label: "Baja", value: 0, helper: "Día tranquilo" },
  { label: "Media", value: 400, helper: "Movimiento normal" },
  { label: "Alta", value: 700, helper: "Entreno o calor" }
];

export function WaterCalculator() {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(400);

  const result = useMemo(() => {
    const base = Math.max(0, weight) * 35;
    return Math.round((base + activity) / 100) * 100;
  }, [activity, weight]);

  const glasses = Math.max(1, Math.round(result / 250));
  const liters = (result / 1000).toFixed(1);
  const progress = Math.min(100, Math.round((result / 4200) * 100));

  return (
    <ToolSection id="calculadora-agua" image="/images/resources/checklist-habitos-diarios.jpg" className="soft-shine">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-leaf-600">
            Calculadora local
          </span>
          <h2 className="mt-4 text-2xl font-bold text-ink">Calculadora de agua diaria</h2>
          <p className="mt-3 leading-7 text-leaf-900/65">
            Una referencia orientativa para recordar hidratarte mejor. No sustituye
            recomendaciones profesionales ni tiene en cuenta condiciones médicas.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {["Sin registro", "Sin API", "Gratis"].map((item) => (
              <span key={item} className="rounded-2xl bg-mist px-3 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-leaf-700">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-mist to-leaf-50 p-5">
          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl bg-white p-5 text-center shadow-card">
              <div
                className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-leaf-100 bg-leaf-50"
                style={{
                  background: `conic-gradient(#247d58 ${progress}%, #dcf4e4 ${progress}% 100%)`
                }}
              >
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-sm">
                  <p className="text-4xl font-black text-leaf-600">{liters}</p>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-leaf-900/45">
                    litros
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm font-bold text-ink" aria-live="polite">{result} ml al día</p>
              <p className="mt-1 text-sm text-leaf-900/60">aprox. {glasses} vasos de 250 ml</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink" htmlFor="weight">
                Peso aproximado
              </label>
              <div className="mt-2 rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-black text-ink">{weight}</span>
                  <span className="pb-1 text-sm font-bold text-leaf-900/55">kg</span>
                </div>
                <input
                  id="weight"
                  type="range"
                  min="35"
                  max="150"
                  value={weight}
                  onChange={(event) => setWeight(Number(event.target.value))}
                  className="mt-4 w-full accent-leaf-600"
                />
              </div>

              <fieldset className="mt-5">
                <legend className="text-sm font-bold text-ink">Actividad diaria</legend>
                <div className="mt-3 grid gap-2">
                  {activityOptions.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setActivity(option.value)}
                      aria-pressed={activity === option.value}
                      className={`focus-ring interactive-lift rounded-2xl border px-4 py-3 text-left transition ${
                        activity === option.value
                          ? "border-leaf-600 bg-leaf-600 text-white shadow-card"
                          : "border-leaf-100 bg-white text-leaf-900/70 hover:border-leaf-300 hover:bg-leaf-50"
                      }`}
                    >
                      <span className="block text-sm font-black">{option.label}</span>
                      <span className={`mt-1 block text-xs ${activity === option.value ? "text-white/75" : "text-leaf-900/50"}`}>
                        {option.helper}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </ToolSection>
  );
}
