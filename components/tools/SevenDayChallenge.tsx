"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolSection } from "@/components/tools/ToolSection";

const challengeDays = [
  {
    title: "Activa el cuerpo",
    task: "Da un paseo de 10 minutos",
    tip: "Hazlo a una hora fácil de repetir.",
    why: "El movimiento suave ayuda a desbloquear energía sin exigir demasiado.",
    difficulty: "Suave",
    category: "Movimiento"
  },
  {
    title: "Plato con color",
    task: "Prepara una comida con verduras",
    tip: "Vale una ensalada, crema o salteado sencillo.",
    why: "Anadir color suele mejorar variedad sin tener que contar nada.",
    difficulty: "Suave",
    category: "Alimentación"
  },
  {
    title: "Hidratación visible",
    task: "Bebe agua antes de cada comida",
    tip: "Deja una botella a la vista.",
    why: "Hacerlo visible reduce la fricción y convierte el gesto en rutina.",
    difficulty: "Media",
    category: "Hidratación"
  },
  {
    title: "Movilidad breve",
    task: "Haz 5 minutos de movilidad",
    tip: "Cuello, espalda, cadera y tobillos.",
    why: "Cinco minutos cuentan cuando se repiten varios días.",
    difficulty: "Suave",
    category: "Movimiento"
  },
  {
    title: "Compra con intención",
    task: "Ordena tu compra saludable",
    tip: "Elige 3 básicos para repetir esta semana.",
    why: "Tener básicos listos facilita decidir mejor cuando hay poco tiempo.",
    difficulty: "Media",
    category: "Organización"
  },
  {
    title: "Pausa mental",
    task: "Dedica 10 minutos a desconectar",
    tip: "Sin pantalla, sin exigencia, solo bajar ritmo.",
    why: "Una pausa real ayuda a regular el día y a dormir con más calma.",
    difficulty: "Media",
    category: "Mente"
  },
  {
    title: "Cierre semanal",
    task: "Revisa qué hábito quieres repetir",
    tip: "Quédate con lo que fue fácil, no con lo perfecto.",
    why: "La mejora sostenible nace de repetir lo que encaja contigo.",
    difficulty: "Suave",
    category: "Revisión"
  }
];

const storageKey = "vive-mas-7-day-challenge";
const reflectionKey = "vive-mas-7-day-challenge-reflection";
const commitmentKey = "vive-mas-7-day-challenge-commitment";

export function SevenDayChallenge() {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [reflection, setReflection] = useState("");
  const [commitment, setCommitment] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const savedReflection = window.localStorage.getItem(reflectionKey);
    const savedCommitment = window.localStorage.getItem(commitmentKey);
    if (saved) {
      setDone(JSON.parse(saved));
    }
    if (savedReflection) {
      setReflection(savedReflection);
    }
    if (savedCommitment) {
      setCommitment(savedCommitment);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(done));
  }, [done]);

  useEffect(() => {
    window.localStorage.setItem(reflectionKey, reflection);
  }, [reflection]);

  useEffect(() => {
    window.localStorage.setItem(commitmentKey, commitment);
  }, [commitment]);

  const completed = useMemo(() => challengeDays.filter((_, index) => done[index]).length, [done]);
  const progress = Math.round((completed / challengeDays.length) * 100);
  const nextIndex = challengeDays.findIndex((_, index) => !done[index]);
  const nextDay = nextIndex >= 0 ? challengeDays[nextIndex] : undefined;

  const completedCategories = useMemo(() => {
    const categories = new Set(challengeDays.filter((_, index) => done[index]).map((day) => day.category));
    return Array.from(categories);
  }, [done]);

  function toggleDay(index: number) {
    setDone((current) => ({ ...current, [index]: !current[index] }));
  }

  return (
    <ToolSection id="reto-7-dias" image="/images/resources/reto-semanal-energia.jpg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="rounded-full bg-honey-light px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-honey-dark">
            Reto gratuito
          </span>
          <h2 className="mt-4 text-2xl font-bold text-ink">Reto de bienestar de 7 días</h2>
          <p className="mt-3 max-w-3xl leading-7 text-leaf-900/65">
            Una semana guiada con acciones pequeñas, explicación de cada paso y reflexión para convertir
            el reto en un hábito sostenible.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setDone({});
            setReflection("");
            setCommitment("");
          }}
          className="focus-ring rounded-full border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900/70 transition hover:-translate-y-0.5 hover:bg-leaf-50"
        >
          Reiniciar reto
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-2xl bg-leaf-50 p-5">
          <p className="text-sm font-bold text-ink">Progreso</p>
          <p className="mt-2 text-4xl font-black text-leaf-600">{completed}/7</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-leaf-600 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-leaf-900/65">
            {completed === 7
              ? "Reto completo. Elige un hábito para mantener durante la próxima semana."
              : nextDay
                ? `Siguiente: día ${nextIndex + 1}, ${nextDay.title}.`
                : "Sigue avanzando a tu ritmo."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {completedCategories.length > 0 ? (
              completedCategories.map((category) => (
                <span key={category} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-900/60">
                  {category}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-900/50">
                Marca el primer día para empezar
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="rounded-2xl bg-mist p-5">
            <span className="text-sm font-black text-ink">Compromiso sencillo</span>
            <textarea
              value={commitment}
              onChange={(event) => setCommitment(event.target.value)}
              className="focus-ring mt-3 min-h-28 w-full resize-none rounded-xl border border-transparent bg-white px-3 py-2 text-sm"
              placeholder="Durante este reto quiero enfocarme en..."
            />
          </label>
          <label className="rounded-2xl bg-mist p-5">
            <span className="text-sm font-black text-ink">Reflexión del reto</span>
            <textarea
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
              className="focus-ring mt-3 min-h-28 w-full resize-none rounded-xl border border-transparent bg-white px-3 py-2 text-sm"
              placeholder="¿Qué acción te resultó más fácil? ¿Cuál quieres repetir?"
            />
          </label>
        </div>
      </div>

      {nextDay ? (
        <div className="mt-6 rounded-2xl border border-leaf-100 bg-white p-5 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-leaf-600">Foco recomendado</p>
          <h3 className="mt-2 text-xl font-black text-ink">{nextDay.title}</h3>
          <p className="mt-2 text-sm font-semibold text-leaf-900/70">{nextDay.task}</p>
          <p className="mt-2 text-sm leading-6 text-leaf-900/55">{nextDay.why}</p>
        </div>
      ) : null}

      <div className="mt-6 grid gap-3">
        {challengeDays.map((day, index) => (
          <button
            key={day.title}
            type="button"
            onClick={() => toggleDay(index)}
            aria-pressed={Boolean(done[index])}
            className={`focus-ring interactive-lift flex items-start gap-4 rounded-2xl border p-4 text-left transition ${
              done[index]
                ? "border-leaf-300 bg-leaf-50"
                : "border-leaf-100 bg-white hover:border-leaf-300 hover:bg-leaf-50"
            }`}
          >
            <span
              className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                done[index] ? "bg-leaf-600 text-white" : "bg-mist text-leaf-900"
              }`}
            >
              {done[index] ? "OK" : index + 1}
            </span>
            <span className="flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-black text-ink">{day.title}</span>
                <span className="rounded-full bg-mist px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-leaf-900/55">
                  {day.category}
                </span>
                <span className="rounded-full bg-honey-light px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-honey-dark">
                  {day.difficulty}
                </span>
              </span>
              <span className="mt-1 block text-sm font-semibold text-leaf-900/75">{day.task}</span>
              <span className="mt-1 block text-sm text-leaf-900/55">{day.tip}</span>
              <span className="mt-2 block text-sm leading-6 text-leaf-900/50">{day.why}</span>
            </span>
          </button>
        ))}
      </div>
    </ToolSection>
  );
}
