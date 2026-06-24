"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolSection } from "@/components/tools/ToolSection";

type Entry = {
  date: string;
  energy: number;
  sleep: number;
  mood: number;
  movement: number;
  note: string;
};

const storageKey = "vive-mas-wellbeing-tracker";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function WellbeingTracker() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entry, setEntry] = useState<Entry>({
    date: today(),
    energy: 3,
    sleep: 3,
    mood: 3,
    movement: 3,
    note: ""
  });

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries]);

  const average = useMemo(() => {
    const total = entry.energy + entry.sleep + entry.mood + entry.movement;
    return (total / 4).toFixed(1);
  }, [entry]);

  function saveEntry() {
    setEntries((current) => [
      entry,
      ...current.filter((item) => item.date !== entry.date)
    ].slice(0, 30));
  }

  return (
    <ToolSection id="registro-bienestar" image="/images/resources/reto-semanal-energia.jpg">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-leaf-600">
            Registro local
          </span>
          <h2 className="mt-4 text-2xl font-bold text-ink">Registro diario de bienestar</h2>
          <p className="mt-3 leading-7 text-leaf-900/65">
            Anota cómo te sientes y guarda un historial breve en tu navegador.
            No se envía ningún dato a ningún servidor.
          </p>
          <div className="mt-6 rounded-2xl bg-mist p-5 text-center">
            <p className="text-sm font-semibold text-leaf-900/60">Promedio del día</p>
            <p className="mt-2 text-4xl font-black text-leaf-600" aria-live="polite">{average}/5</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink">
            Fecha
            <input
              type="date"
              value={entry.date}
              onChange={(event) => setEntry((current) => ({ ...current, date: event.target.value }))}
              className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-leaf-100 bg-white px-3 text-sm"
            />
          </label>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["energy", "Energía"],
              ["sleep", "Sueño"],
              ["mood", "Ánimo"],
              ["movement", "Movimiento"]
            ].map(([key, label]) => (
              <label key={key} className="block text-sm font-bold text-ink">
                {label}: {entry[key as keyof Entry]}
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={entry[key as keyof Entry] as number}
                  onChange={(event) =>
                    setEntry((current) => ({
                      ...current,
                      [key]: Number(event.target.value)
                    }))
                  }
                  className="mt-3 w-full accent-leaf-600"
                />
              </label>
            ))}
          </div>

          <label className="mt-5 block text-sm font-bold text-ink">
            Nota opcional
            <textarea
              value={entry.note}
              onChange={(event) => setEntry((current) => ({ ...current, note: event.target.value }))}
              className="focus-ring mt-2 min-h-24 w-full resize-none rounded-xl border border-leaf-100 bg-mist px-3 py-2 text-sm"
              placeholder="¿Qué te ha ayudado hoy?"
            />
          </label>

          <button
            type="button"
            onClick={saveEntry}
            className="focus-ring mt-5 rounded-full bg-leaf-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-leaf-700"
          >
            Guardar registro
          </button>

          {entries.length > 0 && (
            <div className="mt-6 grid gap-3">
              {entries.map((item) => (
                <div key={item.date} className="rounded-2xl bg-mist p-4 text-sm text-leaf-900/70">
                  <strong className="text-ink">{item.date}</strong> - Energía {item.energy}, sueño {item.sleep}, ánimo {item.mood}, movimiento {item.movement}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolSection>
  );
}
