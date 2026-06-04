"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { objectives } from "@/data/objectives";

const timeOptions = [
  { value: "5", label: "5 min/dia" },
  { value: "15", label: "15 min/dia" },
  { value: "30", label: "30 min/dia" }
];

const levelOptions = [
  { value: "inicio", label: "Estoy empezando" },
  { value: "retomar", label: "Quiero retomar" },
  { value: "constancia", label: "Busco constancia" }
];

export function OnboardingGuide() {
  const [objectiveSlug, setObjectiveSlug] = useState(objectives[0]?.slug ?? "");
  const [time, setTime] = useState(timeOptions[0].value);
  const [level, setLevel] = useState(levelOptions[0].value);

  const selectedObjective = useMemo(
    () => objectives.find((objective) => objective.slug === objectiveSlug) ?? objectives[0],
    [objectiveSlug]
  );

  const tone =
    level === "inicio"
      ? "Empieza con una sola accion pequena. Lo importante es que sea facil repetirla manana."
      : level === "retomar"
        ? "Recupera ritmo sin exigirte perfeccion. Elige una accion conocida y hazla manejable."
        : "Mantén el foco en repetir, revisar y ajustar. Tu siguiente paso debe ser claro y medible.";

  const timeAdvice =
    time === "5"
      ? "Con 5 minutos, prioriza check-in, agua, una pausa activa o preparar una decision."
      : time === "15"
        ? "Con 15 minutos, puedes combinar una accion practica con una herramienta de seguimiento."
        : "Con 30 minutos, puedes planificar, entrenar suave o trabajar un recurso con mas calma.";

  return (
    <section className="rounded-[2rem] border border-leaf-100 bg-white p-5 shadow-soft md:p-7">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Ruta guiada</p>
          <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">
            Encuentra tu primer paso
          </h2>
          <p className="mt-3 leading-7 text-leaf-900/65">
            Responde tres cosas y te proponemos una ruta sencilla con recursos de la propia web.
          </p>

          <div className="mt-6 grid gap-5">
            <fieldset>
              <legend className="text-sm font-black text-ink">Objetivo principal</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {objectives.map((objective) => (
                  <button
                    key={objective.slug}
                    type="button"
                    onClick={() => setObjectiveSlug(objective.slug)}
                    className={`focus-ring rounded-2xl border px-4 py-3 text-left text-sm font-bold transition hover:-translate-y-0.5 ${
                      objectiveSlug === objective.slug
                        ? "border-leaf-500 bg-leaf-50 text-leaf-800"
                        : "border-leaf-100 bg-mist text-leaf-900/70 hover:bg-leaf-50"
                    }`}
                  >
                    {objective.shortTitle}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-black text-ink">Tiempo realista</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {timeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTime(option.value)}
                    className={`focus-ring rounded-full px-4 py-2 text-sm font-bold transition ${
                      time === option.value
                        ? "bg-leaf-600 text-white"
                        : "bg-mist text-leaf-900/70 hover:bg-leaf-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-2 text-sm font-black text-ink">
              Nivel actual
              <select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                className="focus-ring rounded-2xl border border-leaf-100 bg-mist px-4 py-3 text-sm font-bold text-ink"
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <article className={`rounded-[1.75rem] bg-gradient-to-br ${selectedObjective.accent} p-5 md:p-6`}>
          <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-leaf-700">
            Recomendado para ti
          </p>
          <h3 className="mt-4 text-2xl font-black text-ink">{selectedObjective.title}</h3>
          <p className="mt-3 leading-7 text-leaf-900/68">{selectedObjective.description}</p>
          <p className="mt-4 rounded-2xl bg-white/75 p-4 text-sm font-semibold leading-6 text-leaf-900/70">
            {tone} {timeAdvice}
          </p>

          <ol className="mt-5 grid gap-3">
            {selectedObjective.steps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-ink">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-xs text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-5 grid gap-2">
            {selectedObjective.featuredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-black text-ink transition hover:-translate-y-0.5 hover:text-leaf-700"
              >
                <span>{link.label}</span>
                <span className="rounded-full bg-mist px-3 py-1 text-[0.68rem] uppercase tracking-[0.1em] text-leaf-900/55">
                  {link.type}
                </span>
              </Link>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
