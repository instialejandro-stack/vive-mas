"use client";

import { useMemo, useState } from "react";
import { ToolSection } from "@/components/tools/ToolSection";

const activityLevels = [
  { label: "Sedentaria", value: 1.2 },
  { label: "Ligera", value: 1.375 },
  { label: "Moderada", value: 1.55 },
  { label: "Alta", value: 1.725 }
];

export function HarrisBenedictCalculator() {
  const [sex, setSex] = useState<"female" | "male">("female");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(35);
  const [activity, setActivity] = useState(1.375);

  const result = useMemo(() => {
    const bmr =
      sex === "male"
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

    return {
      bmr: Math.round(bmr),
      maintenance: Math.round(bmr * activity)
    };
  }, [activity, age, height, sex, weight]);

  const lightDeficit = Math.max(0, result.maintenance - 300);
  const gentleSurplus = result.maintenance + 250;
  const meter = Math.min(100, Math.round((result.maintenance / 3600) * 100));

  return (
    <ToolSection id="harris-benedict" image="/images/resources/guia-compra-saludable.jpg" className="soft-shine">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="rounded-full bg-coral-light px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-coral-dark">
            Calculadora local
          </span>
          <h2 className="mt-4 text-2xl font-bold text-ink">Calculadora Harris-Benedict</h2>
          <p className="mt-3 leading-7 text-leaf-900/65">
            Estima tu metabolismo basal y una referencia de mantenimiento segun
            actividad. Es una orientacion general, no una pauta medica ni nutricional.
          </p>
          <div className="mt-6 rounded-3xl bg-gradient-to-br from-coral-light to-cream p-5">
            <p className="text-sm font-bold text-coral-dark">Resultado principal</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-leaf-900/45">Basal</p>
                <p className="mt-2 text-3xl font-black text-leaf-600">{result.bmr}</p>
                <p className="text-xs font-semibold text-leaf-900/55">kcal/día</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-leaf-900/45">Mantener</p>
                <p className="mt-2 text-3xl font-black text-leaf-600">{result.maintenance}</p>
                <p className="text-xs font-semibold text-leaf-900/55">kcal/día</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-mist to-leaf-50 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-bold text-ink">
              Sexo
              <select
                value={sex}
                onChange={(event) => setSex(event.target.value as "female" | "male")}
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-leaf-100 bg-white px-4 text-sm font-semibold hover:border-leaf-300"
              >
                <option value="female">Mujer</option>
                <option value="male">Hombre</option>
              </select>
            </label>

            <label className="block text-sm font-bold text-ink">
              Actividad
              <select
                value={activity}
                onChange={(event) => setActivity(Number(event.target.value))}
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-leaf-100 bg-white px-4 text-sm font-semibold hover:border-leaf-300"
              >
                {activityLevels.map((level) => (
                  <option key={level.label} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-bold text-ink">
              Peso kg
              <input
                type="number"
                min="35"
                max="220"
                value={weight}
                onChange={(event) => setWeight(Number(event.target.value))}
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-leaf-100 bg-white px-4 text-sm font-semibold hover:border-leaf-300"
              />
            </label>
            <label className="block text-sm font-bold text-ink">
              Altura cm
              <input
                type="number"
                min="120"
                max="230"
                value={height}
                onChange={(event) => setHeight(Number(event.target.value))}
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-leaf-100 bg-white px-4 text-sm font-semibold hover:border-leaf-300"
              />
            </label>
            <label className="block text-sm font-bold text-ink">
              Edad
              <input
                type="number"
                min="14"
                max="100"
                value={age}
                onChange={(event) => setAge(Number(event.target.value))}
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-leaf-100 bg-white px-4 text-sm font-semibold hover:border-leaf-300"
              />
            </label>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-ink">Escala orientativa</p>
              <p className="text-sm font-black text-leaf-600">{meter}%</p>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-mist">
              <div
                className="h-full rounded-full bg-leaf-600 transition-all duration-500"
                style={{ width: `${meter}%` }}
              />
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Suave deficit", lightDeficit],
              ["Mantener", result.maintenance],
              ["Subida suave", gentleSurplus]
            ].map(([label, value]) => (
              <div key={label} className="interactive-lift rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="text-xs font-bold text-leaf-900/55">{label}</p>
                <p className="mt-2 text-xl font-black text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolSection>
  );
}
