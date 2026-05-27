"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolSection } from "@/components/tools/ToolSection";

const habitGroups = [
  {
    title: "Cuerpo",
    color: "bg-leaf-50 text-leaf-700",
    habits: [
      {
        id: "water-morning",
        label: "Beber agua al empezar el día",
        description: "Un vaso al levantarte o con el desayuno.",
        points: 10
      },
      {
        id: "move-10",
        label: "Moverme al menos 10 minutos",
        description: "Paseo, movilidad, estiramientos o algo suave.",
        points: 15
      },
      {
        id: "fruit-veg",
        label: "Tomar fruta o verdura",
        description: "Una ración sencilla cuenta.",
        points: 10
      }
    ]
  },
  {
    title: "Mente",
    color: "bg-sky-light text-sky-dark",
    habits: [
      {
        id: "screen-break",
        label: "Hacer una pausa sin pantalla",
        description: "Cinco minutos lejos del móvil ya ayudan.",
        points: 10
      },
      {
        id: "breathe",
        label: "Respirar con calma 2 minutos",
        description: "Inhala lento, exhala más largo.",
        points: 10
      },
      {
        id: "positive-note",
        label: "Escribir algo positivo",
        description: "Una frase breve sobre lo que salio bien.",
        points: 10
      }
    ]
  },
  {
    title: "Rutina",
    color: "bg-honey-light text-honey-dark",
    habits: [
      {
        id: "simple-dinner",
        label: "Preparar una cena sencilla",
        description: "Ligera, fácil y sin complicarte.",
        points: 15
      },
      {
        id: "tomorrow-plan",
        label: "Revisar mañana en 3 minutos",
        description: "Una prioridad, una comida y una pausa.",
        points: 10
      },
      {
        id: "sleep-routine",
        label: "Cerrar el día con calma",
        description: "Baja ritmo antes de dormir.",
        points: 20
      }
    ]
  }
];

const habits = habitGroups.flatMap((group) => group.habits.map((habit) => ({ ...habit, group: group.title })));
const storageKey = "vive-mejor-daily-habits";
const noteKey = "vive-mejor-daily-habits-note";
const intentionKey = "vive-mejor-daily-habits-intention";

export function DailyHabitChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");
  const [intention, setIntention] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const savedNote = window.localStorage.getItem(noteKey);
    const savedIntention = window.localStorage.getItem(intentionKey);
    if (saved) {
      setChecked(JSON.parse(saved));
    }
    if (savedNote) {
      setNote(savedNote);
    }
    if (savedIntention) {
      setIntention(savedIntention);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    window.localStorage.setItem(noteKey, note);
  }, [note]);

  useEffect(() => {
    window.localStorage.setItem(intentionKey, intention);
  }, [intention]);

  const completed = useMemo(() => habits.filter((habit) => checked[habit.id]).length, [checked]);
  const score = useMemo(
    () => habits.reduce((total, habit) => total + (checked[habit.id] ? habit.points : 0), 0),
    [checked]
  );
  const maxScore = useMemo(() => habits.reduce((total, habit) => total + habit.points, 0), []);
  const progress = Math.round((completed / habits.length) * 100);

  const nextSuggestion = useMemo(() => habits.find((habit) => !checked[habit.id]), [checked]);

  const message =
    progress === 100
      ? "Día completado. Repite lo que te haya resultado natural."
      : progress >= 60
        ? "Vas con buen ritmo. Elige una acción sencilla para cerrar el día."
        : "Empieza pequeño: una acción hecha vale más que un plan perfecto.";

  function markEssentials() {
    setChecked((current) => ({
      ...current,
      "water-morning": true,
      "move-10": true,
      "fruit-veg": true,
      "sleep-routine": true
    }));
  }

  return (
    <ToolSection id="checklist-habitos" image="/images/resources/checklist-habitos-diarios.jpg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-leaf-600">
            Checklist local
          </span>
          <h2 className="mt-4 text-2xl font-bold text-ink">Checklist diaria de bienestar</h2>
          <p className="mt-3 max-w-3xl leading-7 text-leaf-900/65">
            Organiza el día por cuerpo, mente y rutina. La idea no es hacerlo perfecto,
            sino detectar pequenos pasos que puedas repetir.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={markEssentials}
            className="focus-ring rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-leaf-700 hover:shadow-soft"
          >
            Marcar esenciales
          </button>
          <button
            type="button"
            onClick={() => {
              setChecked({});
              setNote("");
              setIntention("");
            }}
            className="focus-ring rounded-full border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900/70 transition hover:-translate-y-0.5 hover:bg-leaf-50"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl bg-mist p-5">
          <p className="text-sm font-bold text-ink">Progreso del día</p>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <p className="text-4xl font-black text-leaf-600">{completed}/{habits.length}</p>
            <p className="pb-1 text-sm font-black text-leaf-900/55">{score}/{maxScore} puntos</p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-leaf-600 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-leaf-900/65">{message}</p>
          {nextSuggestion ? (
            <div className="mt-4 rounded-2xl bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-leaf-600">Siguiente paso</p>
              <p className="mt-2 text-sm font-bold text-ink">{nextSuggestion.label}</p>
              <p className="mt-1 text-sm text-leaf-900/60">{nextSuggestion.description}</p>
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="rounded-2xl bg-mist p-5">
            <span className="text-sm font-black text-ink">Intención del día</span>
            <textarea
              value={intention}
              onChange={(event) => setIntention(event.target.value)}
              className="focus-ring mt-3 min-h-28 w-full resize-none rounded-xl border border-transparent bg-white px-3 py-2 text-sm"
              placeholder="Hoy quiero cuidarme haciendo..."
            />
          </label>
          <label className="rounded-2xl bg-mist p-5">
            <span className="text-sm font-black text-ink">Cierre del día</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="focus-ring mt-3 min-h-28 w-full resize-none rounded-xl border border-transparent bg-white px-3 py-2 text-sm"
              placeholder="¿Qué ha ido bien? ¿Qué quieres repetir mañana?"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {habitGroups.map((group) => {
          const groupCompleted = group.habits.filter((habit) => checked[habit.id]).length;
          const groupProgress = Math.round((groupCompleted / group.habits.length) * 100);

          return (
            <div key={group.title} className="rounded-2xl bg-mist p-4 transition hover:-translate-y-1 hover:shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-black text-ink">{group.title}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${group.color}`}>
                  {groupCompleted}/{group.habits.length}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-leaf-600 transition-all duration-700" style={{ width: `${groupProgress}%` }} />
              </div>
              <div className="mt-4 grid gap-3">
                {group.habits.map((habit) => (
                  <label
                    key={habit.id}
                    className="interactive-lift flex cursor-pointer items-start gap-3 rounded-2xl border border-leaf-100 bg-white p-4 transition hover:border-leaf-300 hover:bg-leaf-50"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(checked[habit.id])}
                      onChange={(event) =>
                        setChecked((current) => ({ ...current, [habit.id]: event.target.checked }))
                      }
                      className="mt-1 h-5 w-5 rounded border-leaf-300 accent-leaf-600"
                    />
                    <span>
                      <span className="block text-sm font-bold text-ink">{habit.label}</span>
                      <span className="mt-1 block text-sm leading-5 text-leaf-900/55">{habit.description}</span>
                      <span className="mt-2 inline-flex rounded-full bg-mist px-2 py-1 text-[11px] font-black text-leaf-900/50">
                        +{habit.points} puntos
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ToolSection>
  );
}
