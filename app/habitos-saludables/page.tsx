import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { habits } from "@/data/habits";

export const metadata: Metadata = {
  title: "Hábitos saludables",
  description: "Rutinas sencillas para mejorar tu bienestar diario."
};

const cadenceConfig = {
  diario: { label: "Diario", bg: "bg-leaf-50", text: "text-leaf-700", icon: "☀️" },
  semanal: { label: "Semanal", bg: "bg-[#fff2d6]", text: "text-[#7d5614]", icon: "📅" }
};

export default function HabitosPage() {
  return (
    <>
      {/* Hero de página */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#fff2d6]/50 to-cream py-20">
        <div
          className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#f4b860]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="page-shell relative">
          <SectionTitle
            eyebrow="Hábitos saludables"
            title="Mejora con pequeños pasos"
            description="Esta sección reunirá hábitos diarios, retos y guías para crear rutinas sostenibles."
          />
        </div>
      </div>

      {/* Contenido */}
      <section className="py-16">
        <div className="page-shell">
          <div className="grid gap-5 md:grid-cols-2">
            {habits.map((habit) => {
              const cfg = cadenceConfig[habit.cadence] ?? cadenceConfig.diario;
              return (
                <article
                  key={habit.id}
                  className="group flex gap-5 rounded-2xl border border-leaf-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-leaf-200"
                >
                  <span
                    className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-leaf-50 to-leaf-100 text-2xl"
                    aria-hidden="true"
                  >
                    {cfg.icon}
                  </span>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${cfg.bg} ${cfg.text}`}
                    >
                      {cfg.label}
                    </span>
                    <h2 className="mt-2 text-lg font-bold text-ink">{habit.title}</h2>
                    <p className="mt-1.5 text-sm leading-7 text-leaf-900/60">
                      {habit.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Placeholder si hay pocos hábitos */}
          {habits.length < 4 && (
            <div className="mt-10 rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/30 px-8 py-12 text-center">
              <span className="text-5xl" aria-hidden="true">✨</span>
              <p className="mt-4 text-lg font-semibold text-leaf-700">
                Más hábitos en camino
              </p>
              <p className="mt-2 text-sm text-leaf-900/50">
                Estamos preparando más rutinas para ayudarte a mejorar tu bienestar.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
