import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { workouts } from "@/data/workouts";

export const metadata: Metadata = {
  title: "Entrenamiento",
  description: "Planes de entrenamiento adaptados para empezar y progresar."
};

const levelConfig: Record<string, { bg: string; text: string; icon: string; border: string }> = {
  Inicial: { bg: "bg-leaf-50", text: "text-leaf-700", icon: "🌱", border: "border-t-leaf-400" },
  Intermedio: { bg: "bg-[#fff2d6]", text: "text-[#7d5614]", icon: "🔥", border: "border-t-[#f4b860]" },
  Avanzado: { bg: "bg-[#fde9e4]", text: "text-[#934230]", icon: "⚡", border: "border-t-[#e9785f]" }
};

const fallback = { bg: "bg-mist", text: "text-leaf-700", icon: "✨", border: "border-t-leaf-300" };

export default function EntrenamientoPage() {
  return (
    <>
      {/* Hero de página */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#fde9e4]/40 to-cream py-20">
        <div
          className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-[#e9785f]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="page-shell relative">
          <SectionTitle
            eyebrow="Entrenamiento"
            title="Movimiento adaptado a tu ritmo"
            description="Próximamente podrás organizar planes por nivel, objetivo, duración y material disponible."
          />
        </div>
      </div>

      {/* Contenido */}
      <section className="py-16">
        <div className="page-shell">
          <div className="grid gap-6 md:grid-cols-3">
            {workouts.map((workout) => {
              const cfg = levelConfig[workout.level] ?? fallback;
              return (
                <article
                  key={workout.id}
                  className={`overflow-hidden rounded-2xl border-2 border-leaf-100 border-t-4 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft ${cfg.border}`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${cfg.bg} ${cfg.text}`}
                      >
                        {cfg.icon} {workout.level}
                      </span>
                      <span className="text-xs font-bold text-leaf-600">
                        🕐 {workout.duration}
                      </span>
                    </div>
                    <h2 className="mt-5 text-xl font-bold text-ink">{workout.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-leaf-900/60">{workout.focus}</p>
                  </div>
                </article>
              );
            })}

            {/* Placeholders */}
            {workouts.length < 3 &&
              Array.from({ length: 3 - workouts.length }).map((_, i) => (
                <div
                  key={i}
                  className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/30 px-6 py-10 text-center"
                >
                  <span className="text-4xl" aria-hidden="true">🏋️</span>
                  <p className="mt-4 text-sm font-semibold text-leaf-600">
                    Próximamente
                  </p>
                  <p className="mt-1 text-xs text-leaf-900/45">
                    Más planes en preparación
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
