"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolSection } from "@/components/tools/ToolSection";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const meals = ["Desayuno", "Comida", "Cena", "Snack"];
const storageKey = "vive-mas-weekly-meal-planner";
const notesKey = "vive-mas-weekly-meal-notes";
const legacyDayNames: Record<string, string> = {
  Miércoles: "Miercoles",
  Sábado: "Sabado"
};

const quickIdeas = {
  Desayuno: ["Yogur natural, fruta, avena", "Tostada integral, huevo, tomate", "Batido con platano, leche, semillas"],
  Comida: ["Arroz integral, verduras, pollo", "Legumbres, ensalada, fruta", "Pasta integral, atun, verduras"],
  Cena: ["Crema de verduras, tortilla", "Pescado, patata, ensalada", "Salteado de verduras, tofu"],
  Snack: ["Fruta y frutos secos", "Hummus con zanahoria", "Yogur natural"]
};

const pantryCategories = [
  { name: "Proteína", keywords: ["pollo", "huevo", "atun", "pescado", "tofu", "yogur", "legumbres"] },
  { name: "Verdura", keywords: ["verduras", "ensalada", "tomate", "zanahoria", "crema"] },
  { name: "Carbohidrato", keywords: ["arroz", "pasta", "patata", "avena", "pan", "tostada"] },
  { name: "Fruta", keywords: ["fruta", "platano"] }
];

type PlannerState = Record<string, Record<string, string>>;
type PlannerNotes = {
  prep: string;
  shopping: string;
  focus: string;
};

function createEmptyPlanner(): PlannerState {
  return Object.fromEntries(
    days.map((day) => [day, Object.fromEntries(meals.map((meal) => [meal, ""]))])
  ) as PlannerState;
}

function normalizePlanner(saved: PlannerState): PlannerState {
  const empty = createEmptyPlanner();
  return Object.fromEntries(
    days.map((day) => [
      day,
      Object.fromEntries(meals.map((meal) => [meal, saved?.[day]?.[meal] ?? saved?.[legacyDayNames[day]]?.[meal] ?? empty[day][meal]]))
    ])
  ) as PlannerState;
}

function mealText(value: string) {
  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function WeeklyMealPlanner() {
  const [planner, setPlanner] = useState<PlannerState>(createEmptyPlanner);
  const [notes, setNotes] = useState<PlannerNotes>({ prep: "", shopping: "", focus: "" });
  const [activeDay, setActiveDay] = useState(days[0]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const savedNotes = window.localStorage.getItem(notesKey);
    if (saved) {
      setPlanner(normalizePlanner(JSON.parse(saved)));
    }
    if (savedNotes) {
      setNotes((current) => ({ ...current, ...JSON.parse(savedNotes) }));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(planner));
  }, [planner]);

  useEffect(() => {
    window.localStorage.setItem(notesKey, JSON.stringify(notes));
  }, [notes]);

  const stats = useMemo(() => {
    const filledMeals = Object.values(planner).reduce(
      (total, day) => total + Object.values(day).filter((value) => value.trim()).length,
      0
    );
    const completeDays = days.filter((day) => meals.every((meal) => planner[day]?.[meal]?.trim())).length;
    const mealCounts = Object.fromEntries(
      meals.map((meal) => [meal, days.filter((day) => planner[day]?.[meal]?.trim()).length])
    ) as Record<string, number>;

    return {
      completeDays,
      filledMeals,
      mealCounts,
      progress: Math.round((filledMeals / (days.length * meals.length)) * 100)
    };
  }, [planner]);

  const generatedShopping = useMemo(() => {
    const items = new Set<string>();
    Object.values(planner).forEach((day) => {
      Object.values(day).forEach((value) => {
        mealText(value).forEach((item) => items.add(item));
      });
    });
    return Array.from(items).slice(0, 24);
  }, [planner]);

  const categoryCoverage = useMemo(() => {
    const fullText = Object.values(planner)
      .flatMap((day) => Object.values(day))
      .join(" ")
      .toLowerCase();

    return pantryCategories.map((category) => ({
      ...category,
      matched: category.keywords.some((keyword) => fullText.includes(keyword))
    }));
  }, [planner]);

  function updateMeal(day: string, meal: string, value: string) {
    setPlanner((current) => ({
      ...current,
      [day]: {
        ...current[day],
        [meal]: value
      }
    }));
  }

  function addIdea(meal: string, idea: string) {
    setPlanner((current) => {
      const currentValue = current[activeDay]?.[meal] ?? "";
      return {
        ...current,
        [activeDay]: {
          ...current[activeDay],
          [meal]: currentValue ? `${currentValue}, ${idea}` : idea
        }
      };
    });
  }

  return (
    <ToolSection id="planificador-comidas" image="/images/resources/plantilla-menu-semanal.jpg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="rounded-full bg-sky-light px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-sky-dark">
            Planificador local
          </span>
          <h2 className="mt-4 text-2xl font-bold text-ink">Planificador semanal de comidas</h2>
          <p className="mt-3 max-w-3xl leading-7 text-leaf-900/65">
            Planifica la semana por comidas, guarda preparaciones clave y genera una lista base de compra
            a partir de lo que escribes. Todo queda solo en tu navegador.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPlanner(createEmptyPlanner());
            setNotes({ prep: "", shopping: "", focus: "" });
          }}
          className="focus-ring rounded-full border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900/70 transition hover:-translate-y-0.5 hover:bg-leaf-50 hover:shadow-soft"
        >
          Limpiar semana
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-mist p-4 transition hover:-translate-y-1 hover:shadow-soft">
          <p className="text-sm font-bold text-ink">Comidas planificadas</p>
          <p className="mt-2 text-3xl font-black text-leaf-600">{stats.filledMeals}/28</p>
        </div>
        <div className="rounded-2xl bg-mist p-4 transition hover:-translate-y-1 hover:shadow-soft">
          <p className="text-sm font-bold text-ink">Días completos</p>
          <p className="mt-2 text-3xl font-black text-leaf-600">{stats.completeDays}/7</p>
        </div>
        <div className="rounded-2xl bg-mist p-4 md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-ink">Progreso semanal</p>
            <p className="text-sm font-black text-leaf-600">{stats.progress}%</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-leaf-600 transition-all duration-700"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meals.map((meal) => (
              <span key={meal} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-900/60">
                {meal}: {stats.mealCounts[meal]}/7
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {days.map((day) => {
          const dayProgress = meals.filter((meal) => planner[day]?.[meal]?.trim()).length;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${
                activeDay === day
                  ? "bg-leaf-600 text-white shadow-card"
                  : "bg-mist text-leaf-900/70 hover:bg-leaf-50"
              }`}
            >
              {day} <span className="opacity-70">{dayProgress}/4</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-4">
        {meals.map((meal) => (
          <label key={meal} className="block rounded-2xl bg-mist p-4 transition hover:-translate-y-1 hover:shadow-soft">
            <span className="text-sm font-black text-ink">{meal}</span>
            <textarea
              aria-label={`${meal} de ${activeDay}`}
              value={planner[activeDay]?.[meal] ?? ""}
              onChange={(event) => updateMeal(activeDay, meal, event.target.value)}
              className="focus-ring mt-3 min-h-28 w-full resize-none rounded-xl border border-transparent bg-white px-3 py-2 text-sm text-ink placeholder:text-leaf-900/35 hover:border-leaf-200"
              placeholder="Ej: fruta, avena, yogur..."
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {quickIdeas[meal as keyof typeof quickIdeas].map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => addIdea(meal, idea)}
                  className="focus-ring rounded-full bg-white px-3 py-1.5 text-xs font-bold text-leaf-900/60 transition hover:bg-leaf-100 hover:text-leaf-800"
                >
                  + {idea.split(",")[0]}
                </button>
              ))}
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block rounded-2xl bg-mist p-4">
            <span className="text-sm font-black text-ink">Objetivo de la semana</span>
            <textarea
              value={notes.focus}
              onChange={(event) => setNotes((current) => ({ ...current, focus: event.target.value }))}
              className="focus-ring mt-3 min-h-28 w-full resize-none rounded-xl border border-transparent bg-white px-3 py-2 text-sm"
              placeholder="Ej: cocinar simple y repetir bases saludables."
            />
          </label>
          <label className="block rounded-2xl bg-mist p-4">
            <span className="text-sm font-black text-ink">Preparaciones clave</span>
            <textarea
              value={notes.prep}
              onChange={(event) => setNotes((current) => ({ ...current, prep: event.target.value }))}
              className="focus-ring mt-3 min-h-28 w-full resize-none rounded-xl border border-transparent bg-white px-3 py-2 text-sm"
              placeholder="Cocer arroz, lavar verduras, dejar legumbres listas..."
            />
          </label>
          <label className="block rounded-2xl bg-mist p-4">
            <span className="text-sm font-black text-ink">Notas de compra</span>
            <textarea
              value={notes.shopping}
              onChange={(event) => setNotes((current) => ({ ...current, shopping: event.target.value }))}
              className="focus-ring mt-3 min-h-28 w-full resize-none rounded-xl border border-transparent bg-white px-3 py-2 text-sm"
              placeholder="Revisar despensa, congelar raciones, comprar fruta..."
            />
          </label>
        </div>

        <aside className="rounded-2xl bg-leaf-50 p-4">
          <h3 className="text-lg font-black text-ink">Lista sugerida</h3>
          <p className="mt-1 text-sm text-leaf-900/60">
            Se genera con lo que escribes en las comidas. Puedes usarla como borrador para tu compra.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {generatedShopping.length > 0 ? (
              generatedShopping.map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-leaf-900/70">
                  {item}
                </span>
              ))
            ) : (
              <span className="rounded-xl bg-white px-3 py-2 text-sm text-leaf-900/60">
                Empieza escribiendo una comida.
              </span>
            )}
          </div>

          <h4 className="mt-5 text-sm font-black text-ink">Cobertura orientativa</h4>
          <div className="mt-3 grid gap-2">
            {categoryCoverage.map((category) => (
              <div key={category.name} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
                <span className="font-bold text-ink">{category.name}</span>
                <span className={category.matched ? "font-black text-leaf-600" : "font-bold text-leaf-900/40"}>
                  {category.matched ? "Incluida" : "Pendiente"}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </ToolSection>
  );
}
