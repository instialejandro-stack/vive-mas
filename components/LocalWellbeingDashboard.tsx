"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type WellbeingEntry = {
  date: string;
  energy: number;
  sleep: number;
  mood: number;
  movement: number;
  note: string;
};

type MealPlanner = Record<string, Record<string, string>>;

type WeeklyGoal = {
  focus: string;
  target: number;
};

type TodayPlan = {
  selectedIds: string[];
  completed: Record<string, boolean>;
};

const habitsKey = "vive-mas-daily-habits";
const challengeKey = "vive-mas-7-day-challenge";
const wellbeingKey = "vive-mas-wellbeing-tracker";
const plannerKey = "vive-mas-weekly-meal-planner";
const weeklyGoalKey = "vive-mas-weekly-goal";
const extraWeeklyGoalsKey = "vive-mas-extra-weekly-goals";
const todayPlanKey = "vive-mas-today-plan";

const weeklyGoalOptions = [
  { value: "habits", label: "Completar hábitos", unit: "hábitos", href: "/herramientas-gratis#checklist-habitos" },
  { value: "challenge", label: "Avanzar en el reto", unit: "días", href: "/herramientas-gratis#reto-7-dias" },
  { value: "meals", label: "Planificar comidas", unit: "comidas", href: "/herramientas-gratis#planificador-comidas" },
  { value: "wellbeing", label: "Registrar bienestar", unit: "registros", href: "/herramientas-gratis#registro-bienestar" }
];

const actionOptions = [
  {
    id: "hydrate",
    title: "Hidratación",
    action: "Beber un vaso de agua y dejar otro preparado.",
    href: "/herramientas-gratis#calculadora-agua"
  },
  {
    id: "move",
    title: "Movimiento",
    action: "Hacer 10 minutos de paseo, movilidad o estiramientos.",
    href: "/herramientas-gratis#reto-7-dias"
  },
  {
    id: "calm",
    title: "Calma",
    action: "Cerrar el día con una pausa breve sin pantalla.",
    href: "/herramientas-gratis#checklist-habitos"
  },
  {
    id: "meal",
    title: "Comida sencilla",
    action: "Planificar una comida base para hoy o mañana.",
    href: "/herramientas-gratis#planificador-comidas"
  },
  {
    id: "sleep",
    title: "Descanso",
    action: "Elegir una hora de cierre y preparar una rutina tranquila.",
    href: "/herramientas-gratis#checklist-habitos"
  },
  {
    id: "order",
    title: "Organización",
    action: "Apuntar una compra o preparación que te facilite la semana.",
    href: "/herramientas-gratis#lista-compra"
  }
];

const defaultPlanIds = ["hydrate", "move", "calm"];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function lastDays(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (count - 1 - index));
    return dateKey(date);
  });
}

function currentMonthDays() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const total = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: total }, (_, index) => dateKey(new Date(year, month, index + 1)));
}

function averageEntry(entry: WellbeingEntry) {
  return (entry.energy + entry.sleep + entry.mood + entry.movement) / 4;
}

function wellbeingStreak(entries: WellbeingEntry[]) {
  const dates = new Set(entries.map((entry) => entry.date));
  let streak = 0;
  const cursor = new Date();

  while (dates.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function formatShortDate(date: string) {
  const [, month, day] = date.split("-");
  return `${day}/${month}`;
}

function normalizePlan(value: TodayPlan | Record<string, boolean> | null): TodayPlan {
  if (
    value &&
    "selectedIds" in value &&
    "completed" in value &&
    Array.isArray(value.selectedIds) &&
    typeof value.completed === "object" &&
    value.completed !== null
  ) {
    return {
      selectedIds: value.selectedIds,
      completed: value.completed
    };
  }

  const legacyCompleted =
    value && !("selectedIds" in value) ? value : {};

  return {
    selectedIds: defaultPlanIds,
    completed: legacyCompleted
  };
}

function getSemaphore(average: number, hasEntry: boolean) {
  if (!hasEntry) {
    return {
      label: "Sin datos",
      color: "bg-sky-light text-sky-dark",
      dot: "bg-sky-500",
      message: "Haz un check-in rápido para orientar mejor tu día."
    };
  }

  if (average >= 4) {
    return {
      label: "En verde",
      color: "bg-leaf-50 text-leaf-700",
      dot: "bg-leaf-600",
      message: "Vas bien. Mantén una acción sencilla que ya te esté funcionando."
    };
  }

  if (average >= 2.6) {
    return {
      label: "En amarillo",
      color: "bg-honey-light text-honey-dark",
      dot: "bg-honey-dark",
      message: "Elige una prioridad pequeña y evita cargar demasiado el día."
    };
  }

  return {
    label: "Baja exigencia",
    color: "bg-[#fde9e4] text-[#934230]",
    dot: "bg-[#d96b52]",
    message: "Prioriza descanso, agua y una acción mínima. Hoy cuenta hacerlo fácil."
  };
}

export function LocalWellbeingDashboard() {
  const [habits, setHabits] = useState<Record<string, boolean>>({});
  const [challenge, setChallenge] = useState<Record<string, boolean>>({});
  const [wellbeing, setWellbeing] = useState<WellbeingEntry[]>([]);
  const [planner, setPlanner] = useState<MealPlanner>({});
  const [weeklyGoal, setWeeklyGoal] = useState<WeeklyGoal>({
    focus: "habits",
    target: 4
  });
  const [extraWeeklyGoals, setExtraWeeklyGoals] = useState<WeeklyGoal[]>([]);
  const [todayPlan, setTodayPlan] = useState<TodayPlan>({
    selectedIds: defaultPlanIds,
    completed: {}
  });
  const [newActionId, setNewActionId] = useState("meal");
  const [quickEntry, setQuickEntry] = useState<WellbeingEntry>({
    date: dateKey(new Date()),
    energy: 3,
    sleep: 3,
    mood: 3,
    movement: 3,
    note: ""
  });

  useEffect(() => {
    const savedWellbeing = readJson<WellbeingEntry[]>(wellbeingKey, []);
    const savedPlan = readJson<TodayPlan | Record<string, boolean> | null>(`${todayPlanKey}-${dateKey(new Date())}`, null);

    setHabits(readJson<Record<string, boolean>>(habitsKey, {}));
    setChallenge(readJson<Record<string, boolean>>(challengeKey, {}));
    setWellbeing(savedWellbeing);
    setPlanner(readJson<MealPlanner>(plannerKey, {}));
    setWeeklyGoal(readJson<WeeklyGoal>(weeklyGoalKey, { focus: "habits", target: 4 }));
    setExtraWeeklyGoals(readJson<WeeklyGoal[]>(extraWeeklyGoalsKey, []));
    setTodayPlan(normalizePlan(savedPlan));

    const todayEntry = savedWellbeing.find((entry) => entry.date === dateKey(new Date()));
    if (todayEntry) {
      setQuickEntry(todayEntry);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(weeklyGoalKey, JSON.stringify(weeklyGoal));
  }, [weeklyGoal]);

  useEffect(() => {
    window.localStorage.setItem(extraWeeklyGoalsKey, JSON.stringify(extraWeeklyGoals));
  }, [extraWeeklyGoals]);

  useEffect(() => {
    window.localStorage.setItem(`${todayPlanKey}-${dateKey(new Date())}`, JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    window.localStorage.setItem(wellbeingKey, JSON.stringify(wellbeing));
  }, [wellbeing]);

  const selectedActions = useMemo(
    () => todayPlan.selectedIds.map((id) => actionOptions.find((item) => item.id === id)).filter(Boolean),
    [todayPlan.selectedIds]
  );

  const habitCount = Object.values(habits).filter(Boolean).length;
  const challengeCount = Object.values(challenge).filter(Boolean).length;
  const latestWellbeing = wellbeing[0];
  const todayCompleted = selectedActions.filter((action) => action && todayPlan.completed[action.id]).length;

  const plannedMeals = useMemo(
    () =>
      Object.values(planner).reduce(
        (total, day) => total + Object.values(day).filter((value) => value.trim()).length,
        0
      ),
    [planner]
  );

  const wellbeingDatesThisWeek = useMemo(() => {
    const days = new Set(lastDays(7));
    return wellbeing.filter((entry) => days.has(entry.date)).length;
  }, [wellbeing]);

  const goalOption =
    weeklyGoalOptions.find((option) => option.value === weeklyGoal.focus) ??
    weeklyGoalOptions[0];

  const goalProgress = {
    habits: habitCount,
    challenge: challengeCount,
    meals: plannedMeals,
    wellbeing: wellbeingDatesThisWeek
  }[weeklyGoal.focus] ?? 0;

  function getGoalProgress(goal: WeeklyGoal) {
    return {
      habits: habitCount,
      challenge: challengeCount,
      meals: plannedMeals,
      wellbeing: wellbeingDatesThisWeek
    }[goal.focus] ?? 0;
  }

  function getGoalOption(focus: string) {
    return weeklyGoalOptions.find((option) => option.value === focus) ?? weeklyGoalOptions[0];
  }

  const goalPercent = Math.min(100, Math.round((goalProgress / weeklyGoal.target) * 100));
  const streak = wellbeingStreak(wellbeing);
  const latestAverage = latestWellbeing ? averageEntry(latestWellbeing) : 0;
  const semaphore = getSemaphore(latestAverage, Boolean(latestWellbeing));

  const recommendations = useMemo(() => {
    const items: Array<{ title: string; text: string; href: string }> = [];

    if (!latestWellbeing) {
      items.push({
        title: "Haz un check-in de 1 minuto",
        text: "Registra cómo estás para que el panel pueda darte una orientación más útil.",
        href: "#check-in-rapido"
      });
    } else {
      if (latestWellbeing.sleep <= 2) {
        items.push({
          title: "Prioriza descanso",
          text: "Baja el ritmo al final del día y elige una rutina sencilla de sueño.",
          href: "/herramientas-gratis#checklist-habitos"
        });
      }
      if (latestWellbeing.movement <= 2) {
        items.push({
          title: "Movimiento suave",
          text: "Prueba 10 minutos de paseo o movilidad. La meta es activar, no agotarte.",
          href: "/herramientas-gratis#reto-7-dias"
        });
      }
      if (latestWellbeing.energy <= 2) {
        items.push({
          title: "Revisa energía",
          text: "Una comida simple, agua y una pausa corta pueden ayudarte a recuperar claridad.",
          href: "/herramientas-gratis#planificador-comidas"
        });
      }
      if (latestAverage >= 4) {
        items.push({
          title: "Mantén lo que funciona",
          text: "Tu último registro es positivo. Repite una acción que ya te haya ayudado.",
          href: "#plan-de-hoy"
        });
      }
    }

    if (todayCompleted === 0) {
      items.push({
        title: "Completa una acción del plan",
        text: "Marca una sola acción de hoy. Pequeño, concreto y suficiente.",
        href: "#plan-de-hoy"
      });
    }

    if (plannedMeals < 6) {
      items.push({
        title: "Planifica lo mínimo",
        text: "Deja preparadas 2 o 3 comidas base para reducir decisiones durante la semana.",
        href: "/herramientas-gratis#planificador-comidas"
      });
    }

    return items.slice(0, 3);
  }, [latestAverage, latestWellbeing, plannedMeals, todayCompleted]);

  const nextBestAction = recommendations[0] ?? {
    title: "Sigue con una acción sencilla",
    text: "Elige algo pequeño que puedas repetir mañana sin complicarte.",
    href: "#plan-de-hoy"
  };

  const history = useMemo(() => {
    const entriesByDate = new Map(wellbeing.map((entry) => [entry.date, entry]));
    return lastDays(7).map((day) => {
      const entry = entriesByDate.get(day);
      return {
        date: day,
        label: formatShortDate(day),
        average: entry ? Number(averageEntry(entry).toFixed(1)) : 0,
        energy: entry?.energy ?? 0,
        sleep: entry?.sleep ?? 0,
        mood: entry?.mood ?? 0,
        movement: entry?.movement ?? 0,
        hasEntry: Boolean(entry)
      };
    });
  }, [wellbeing]);

  const calendar = useMemo(() => {
    const entriesByDate = new Map(wellbeing.map((entry) => [entry.date, entry]));
    return lastDays(14).map((day) => {
      const entry = entriesByDate.get(day);
      const average = entry ? averageEntry(entry) : 0;
      return {
        date: day,
        day: day.slice(8),
        hasEntry: Boolean(entry),
        tone: average >= 4 ? "bg-leaf-600" : average >= 2.6 ? "bg-honey-dark" : entry ? "bg-[#d96b52]" : "bg-white"
      };
    });
  }, [wellbeing]);

  const monthlyCalendar = useMemo(() => {
    const entriesByDate = new Map(wellbeing.map((entry) => [entry.date, entry]));
    return currentMonthDays().map((day) => {
      const entry = entriesByDate.get(day);
      const average = entry ? averageEntry(entry) : 0;
      return {
        date: day,
        day: day.slice(8),
        hasEntry: Boolean(entry),
        tone: average >= 4 ? "bg-leaf-600" : average >= 2.6 ? "bg-honey-dark" : entry ? "bg-[#d96b52]" : "bg-white"
      };
    });
  }, [wellbeing]);

  const monthlySummary = useMemo(() => {
    const monthDates = new Set(currentMonthDays());
    const entries = wellbeing.filter((entry) => monthDates.has(entry.date));
    const average = entries.length
      ? entries.reduce((total, entry) => total + averageEntry(entry), 0) / entries.length
      : 0;
    return {
      entries: entries.length,
      average: average ? average.toFixed(1) : "-",
      totalDays: monthDates.size
    };
  }, [wellbeing]);

  const weeklySummary = useMemo(() => {
    const entries = wellbeing.filter((entry) => new Set(lastDays(7)).has(entry.date));
    const average = entries.length
      ? entries.reduce((total, entry) => total + averageEntry(entry), 0) / entries.length
      : 0;

    return {
      entries: entries.length,
      average: average ? average.toFixed(1) : "-",
      plannedMeals,
      completedActions: todayCompleted,
      message: entries.length
        ? "Ya tienes datos para revisar patrones sencillos esta semana."
        : "Haz tu primer check-in para empezar a construir un resumen semanal."
    };
  }, [plannedMeals, todayCompleted, wellbeing]);

  const cards = [
    {
      title: "Plan de hoy",
      value: `${todayCompleted}/${selectedActions.length}`,
      description: "acciones completadas",
      href: "#plan-de-hoy"
    },
    {
      title: "Objetivo semanal",
      value: `${goalPercent}%`,
      description: `${goalProgress} de ${weeklyGoal.target} ${goalOption.unit}`,
      href: goalOption.href
    },
    {
      title: "Racha de bienestar",
      value: `${streak}`,
      description: streak === 1 ? "día seguido registrado" : "días seguidos registrados",
      href: "/herramientas-gratis#registro-bienestar"
    },
    {
      title: "Último registro",
      value: latestWellbeing ? `${latestAverage.toFixed(1)}/5` : "-",
      description: latestWellbeing ? latestWellbeing.date : "sin registro todavía",
      href: "#check-in-rapido"
    }
  ];

  function saveQuickEntry() {
    setWellbeing((current) => [
      quickEntry,
      ...current.filter((entry) => entry.date !== quickEntry.date)
    ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30));
  }

  function addAction() {
    setTodayPlan((current) => {
      if (current.selectedIds.includes(newActionId)) {
        return current;
      }

      return {
        ...current,
        selectedIds: [...current.selectedIds, newActionId].slice(0, 5)
      };
    });
  }

  function removeAction(id: string) {
    setTodayPlan((current) => ({
      selectedIds: current.selectedIds.filter((item) => item !== id),
      completed: Object.fromEntries(Object.entries(current.completed).filter(([key]) => key !== id))
    }));
  }

  function exportWellbeingData() {
    const data = {
      exportedAt: new Date().toISOString(),
      wellbeing,
      weeklyGoal,
      extraWeeklyGoals,
      todayPlan,
      planner,
      habits,
      challenge
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vive-mas-bienestar-${dateKey(new Date())}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function resetWellbeingPanel() {
    const todayKey = `${todayPlanKey}-${dateKey(new Date())}`;
    window.localStorage.removeItem(wellbeingKey);
    window.localStorage.removeItem(weeklyGoalKey);
    window.localStorage.removeItem(extraWeeklyGoalsKey);
    window.localStorage.removeItem(todayKey);
    setWellbeing([]);
    setWeeklyGoal({ focus: "habits", target: 4 });
    setExtraWeeklyGoals([]);
    setTodayPlan({ selectedIds: defaultPlanIds, completed: {} });
  }

  function addExtraWeeklyGoal() {
    setExtraWeeklyGoals((current) => [
      ...current,
      { focus: "wellbeing", target: 3 }
    ].slice(0, 3));
  }

  function updateExtraWeeklyGoal(index: number, nextGoal: WeeklyGoal) {
    setExtraWeeklyGoals((current) =>
      current.map((goal, currentIndex) => currentIndex === index ? nextGoal : goal)
    );
  }

  function removeExtraWeeklyGoal(index: number) {
    setExtraWeeklyGoals((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  return (
    <div className="grid gap-5 xl:grid-cols-12 xl:items-start">
      <section className="overflow-hidden rounded-3xl border border-leaf-100 bg-white shadow-card xl:col-span-5">
        <div className="grid h-full gap-0">
          <div className="p-5 sm:p-6">
            <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-leaf-600">
              Panel personal
            </span>
            <h2 className="mt-4 text-3xl font-black text-ink">Tu estado de bienestar</h2>
            <p className="mt-3 max-w-2xl leading-7 text-leaf-900/65">
              Un resumen local para saber qué cuidar hoy, continuar tus herramientas y revisar tu progreso.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {cards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="focus-ring rounded-2xl bg-mist p-4 transition hover:-translate-y-1 hover:bg-leaf-50 hover:shadow-soft"
                >
                  <p className="text-sm font-bold text-leaf-900/60">{card.title}</p>
                  <p className="mt-3 text-4xl font-black text-leaf-600">{card.value}</p>
                  <p className="mt-2 text-sm leading-6 text-leaf-900/55">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="border-t border-leaf-100 bg-gradient-to-br from-leaf-50 to-cream p-5 sm:p-6">
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${semaphore.color}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${semaphore.dot}`} />
              {semaphore.label}
            </div>
            <h3 className="mt-4 text-xl font-black text-ink">Siguiente mejor acción</h3>
            <Link
              href={nextBestAction.href}
              className="focus-ring mt-4 block rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <p className="text-sm font-black text-ink">{nextBestAction.title}</p>
              <p className="mt-2 text-sm leading-6 text-leaf-900/60">{nextBestAction.text}</p>
            </Link>
            <p className="mt-4 text-sm leading-6 text-leaf-900/60">{semaphore.message}</p>
          </aside>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] xl:col-span-7 xl:grid-cols-2 xl:items-stretch">
        <section id="check-in-rapido" className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink">Check-in rápido</h2>
              <p className="mt-2 leading-7 text-leaf-900/60">
                Registra cómo estás sin salir del panel.
              </p>
            </div>
            <button
              type="button"
              onClick={saveQuickEntry}
              className="focus-ring rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
            >
              Guardar
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["energy", "Energía"],
              ["sleep", "Sueño"],
              ["mood", "Ánimo"],
              ["movement", "Movimiento"]
            ].map(([key, label]) => (
              <label key={key} className="rounded-2xl bg-mist p-3 text-sm font-bold text-ink">
                {label}: {quickEntry[key as keyof WellbeingEntry]}
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={quickEntry[key as keyof WellbeingEntry] as number}
                  onChange={(event) =>
                    setQuickEntry((current) => ({ ...current, [key]: Number(event.target.value) }))
                  }
                  className="mt-3 w-full accent-leaf-600"
                />
              </label>
            ))}
          </div>
        </section>

        <section id="plan-de-hoy" className="flex flex-col rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink">Plan de hoy</h2>
              <p className="mt-2 leading-7 text-leaf-900/60">
                Personaliza tus acciones pequeñas del día.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTodayPlan({ selectedIds: defaultPlanIds, completed: {} })}
              className="focus-ring rounded-full border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900/70 transition hover:bg-leaf-50"
            >
              Reiniciar
            </button>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
            <select
              value={newActionId}
              onChange={(event) => setNewActionId(event.target.value)}
              className="focus-ring min-h-11 rounded-xl border border-leaf-100 bg-mist px-3 text-sm font-semibold"
            >
              {actionOptions.map((action) => (
                <option key={action.id} value={action.id}>
                  {action.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addAction}
              className="focus-ring rounded-xl bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
            >
              Añadir
            </button>
          </div>

          <div className="mt-4 grid max-h-[23rem] gap-3 overflow-y-auto pr-1">
            {selectedActions.map((item) => item ? (
              <label
                key={item.id}
                className="interactive-lift flex cursor-pointer items-start gap-4 rounded-2xl border border-leaf-100 bg-mist p-3.5 transition hover:border-leaf-300 hover:bg-leaf-50"
              >
                <input
                  type="checkbox"
                  checked={Boolean(todayPlan.completed[item.id])}
                  onChange={(event) =>
                    setTodayPlan((current) => ({
                      ...current,
                      completed: { ...current.completed, [item.id]: event.target.checked }
                    }))
                  }
                  className="mt-1 h-5 w-5 rounded border-leaf-300 accent-leaf-600"
                />
                <span className="flex-1">
                  <span className="block text-sm font-black text-ink">{item.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-leaf-900/60">{item.action}</span>
                  <span className="mt-2 flex flex-wrap gap-2">
                    <Link href={item.href} className="focus-ring inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-700 transition hover:bg-leaf-100">
                      Abrir herramienta
                    </Link>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        removeAction(item.id);
                      }}
                      className="focus-ring rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-900/45 transition hover:bg-[#fde9e4] hover:text-[#934230]"
                    >
                      Quitar
                    </button>
                  </span>
                </span>
              </label>
            ) : null)}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-card xl:col-span-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">Historial y calendario</h2>
            <p className="mt-2 leading-7 text-leaf-900/60">
              Últimos registros y evolución orientativa de los últimos 14 días.
            </p>
          </div>
          <Link
            href="/herramientas-gratis#registro-bienestar"
            className="focus-ring rounded-full border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900/70 transition hover:bg-leaf-50"
          >
            Ver herramienta
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-2xl bg-mist p-4">
            <p className="text-sm font-black text-ink">Calendario 14 días</p>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {calendar.map((day) => (
                <div key={day.date} className="text-center">
                  <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl border border-leaf-100 text-xs font-black ${day.tone} ${day.hasEntry ? "text-white" : "text-leaf-900/35"}`}>
                    {day.day}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-leaf-900/55">
              <span className="rounded-full bg-leaf-600 px-2 py-1 text-white">Bien</span>
              <span className="rounded-full bg-honey-dark px-2 py-1 text-white">Medio</span>
              <span className="rounded-full bg-[#d96b52] px-2 py-1 text-white">Bajo</span>
            </div>
          </div>

          <div className="grid max-h-[28rem] gap-3 overflow-y-auto pr-1">
            {history.map((day) => (
              <div key={day.date} className="rounded-2xl bg-mist p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-ink">{day.label}</p>
                  <p className="text-sm font-bold text-leaf-600">
                    {day.hasEntry ? `${day.average}/5` : "Sin registro"}
                  </p>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-4">
                  {[
                    ["Energía", day.energy],
                    ["Sueño", day.sleep],
                    ["Ánimo", day.mood],
                    ["Movimiento", day.movement]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-white px-3 py-2">
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-leaf-900/45">{label}</p>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
                        <div
                          className="h-full rounded-full bg-leaf-600 transition-all duration-700"
                          style={{ width: `${Number(value) * 20}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-card xl:col-span-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">Vista mensual</h2>
            <p className="mt-2 leading-7 text-leaf-900/60">
              Revisa de un vistazo cuántos días has registrado bienestar este mes.
            </p>
          </div>
          <div className="rounded-2xl bg-mist px-4 py-3 text-sm font-bold text-leaf-900/65">
            {monthlySummary.entries}/{monthlySummary.totalDays} días · media {monthlySummary.average}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-2">
          {monthlyCalendar.map((day) => (
            <div
              key={day.date}
              className={`flex aspect-square min-h-10 items-center justify-center rounded-xl border border-leaf-100 text-xs font-black ${
                day.tone
              } ${day.hasEntry ? "text-white" : "text-leaf-900/35"}`}
              title={day.date}
            >
              {Number(day.day)}
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] xl:col-span-4 xl:grid-cols-1">
        <section className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-ink">Objetivos semanales</h2>
              <p className="mt-2 leading-7 text-leaf-900/60">
                Elige un foco principal y añade objetivos secundarios si quieres.
              </p>
            </div>
            <button
              type="button"
              onClick={addExtraWeeklyGoal}
              className="focus-ring rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
            >
              Añadir
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_120px] xl:grid-cols-1">
            <select
              value={weeklyGoal.focus}
              onChange={(event) =>
                setWeeklyGoal((current) => ({ ...current, focus: event.target.value }))
              }
              className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
            >
              {weeklyGoalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              max="28"
              value={weeklyGoal.target}
              onChange={(event) =>
                setWeeklyGoal((current) => ({
                  ...current,
                  target: Math.max(1, Number(event.target.value))
                }))
              }
              className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
              aria-label="Meta semanal"
            />
          </div>

          <div className="mt-5 rounded-2xl bg-mist p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-ink">
                {goalProgress} de {weeklyGoal.target} {goalOption.unit}
              </p>
              <p className="text-sm font-black text-leaf-600">{goalPercent}%</p>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-leaf-600 transition-all duration-700"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
          </div>

          {extraWeeklyGoals.length > 0 ? (
            <div className="mt-4 grid gap-3">
              {extraWeeklyGoals.map((goal, index) => {
                const option = getGoalOption(goal.focus);
                const progress = getGoalProgress(goal);
                const percent = Math.min(100, Math.round((progress / goal.target) * 100));

                return (
                  <div key={`${goal.focus}-${index}`} className="rounded-2xl border border-leaf-100 bg-white p-4">
                    <div className="grid gap-2 sm:grid-cols-[1fr_90px_auto] xl:grid-cols-1">
                      <select
                        value={goal.focus}
                        onChange={(event) => updateExtraWeeklyGoal(index, { ...goal, focus: event.target.value })}
                        className="focus-ring min-h-11 rounded-xl border border-leaf-100 bg-mist px-3 text-sm font-semibold"
                        aria-label="Objetivo secundario"
                      >
                        {weeklyGoalOptions.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="1"
                        max="28"
                        value={goal.target}
                        onChange={(event) => updateExtraWeeklyGoal(index, { ...goal, target: Math.max(1, Number(event.target.value)) })}
                        className="focus-ring min-h-11 rounded-xl border border-leaf-100 bg-mist px-3 text-sm font-semibold"
                        aria-label="Meta secundaria"
                      />
                      <button
                        type="button"
                        onClick={() => removeExtraWeeklyGoal(index)}
                        className="focus-ring rounded-xl border border-leaf-200 px-3 py-2 text-sm font-bold text-leaf-900/55 transition hover:bg-leaf-50"
                      >
                        Quitar
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-ink">
                        {progress} de {goal.target} {option.unit}
                      </p>
                      <p className="text-sm font-black text-leaf-600">{percent}%</p>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-mist">
                      <div className="h-full rounded-full bg-leaf-600 transition-all duration-700" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
          <h2 className="text-2xl font-bold text-ink">Continuar</h2>
          <div className="mt-4 grid gap-3">
            {[
              ["Registrar bienestar", "/herramientas-gratis#registro-bienestar"],
              ["Planificar comidas", "/herramientas-gratis#planificador-comidas"],
              ["Generar lista de compra", "/herramientas-gratis#lista-compra"],
              ["Buscar recursos gratis", "/biblioteca-gratis"]
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="focus-ring rounded-2xl bg-mist px-4 py-4 text-sm font-bold text-ink transition hover:bg-leaf-50 hover:text-leaf-700"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
          <h2 className="text-2xl font-bold text-ink">Resumen semanal</h2>
          <p className="mt-2 text-sm leading-6 text-leaf-900/60">{weeklySummary.message}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-mist p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-leaf-900/45">Media</p>
              <p className="mt-2 text-2xl font-black text-leaf-600">{weeklySummary.average}</p>
            </div>
            <div className="rounded-2xl bg-mist p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-leaf-900/45">Registros</p>
              <p className="mt-2 text-2xl font-black text-leaf-600">{weeklySummary.entries}/7</p>
            </div>
            <div className="rounded-2xl bg-mist p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-leaf-900/45">Comidas</p>
              <p className="mt-2 text-2xl font-black text-leaf-600">{weeklySummary.plannedMeals}</p>
            </div>
            <div className="rounded-2xl bg-mist p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-leaf-900/45">Hoy</p>
              <p className="mt-2 text-2xl font-black text-leaf-600">{weeklySummary.completedActions}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={exportWellbeingData}
              className="focus-ring rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
            >
              Exportar datos
            </button>
            <button
              type="button"
              onClick={resetWellbeingPanel}
              className="focus-ring rounded-full border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900/70 transition hover:bg-leaf-50"
            >
              Reiniciar panel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
