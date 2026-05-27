import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Recursos",
  description: "Artículos, guías y descargables de bienestar para avanzar paso a paso."
};

const categoryConfig: Record<string, { bg: string; text: string; icon: string }> = {
  Hábitos: { bg: "bg-leaf-50", text: "text-leaf-600", icon: "✨" },
  Alimentación: { bg: "bg-[#fde9e4]", text: "text-[#934230]", icon: "🥗" },
  Entrenamiento: { bg: "bg-[#fff2d6]", text: "text-[#7d5614]", icon: "🏃" },
  Bienestar: { bg: "bg-[#e7f3fb]", text: "text-[#24536b]", icon: "🧘" }
};

const fallback = { bg: "bg-mist", text: "text-leaf-600", icon: "📖" };

export default function RecursosPage() {
  return (
    <>
      {/* Hero de página */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#e7f3fb]/50 to-cream py-20">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#5ba4cf]/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="page-shell relative">
          <SectionTitle
            eyebrow="Recursos"
            title="Guías y artículos para avanzar"
            description="Un espacio preparado para artículos, descargables, retos semanales y materiales de apoyo."
          />
        </div>
      </div>

      {/* Artículos */}
      <section className="py-16">
        <div className="page-shell">
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article) => {
              const cfg = categoryConfig[article.category] ?? fallback;
              return (
                <article
                  key={article.id}
                  className="group flex flex-col rounded-2xl border border-leaf-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
                >
                  <span
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${cfg.bg}`}
                    aria-hidden="true"
                  >
                    {cfg.icon}
                  </span>
                  <span
                    className={`inline-self-start w-fit rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${cfg.bg} ${cfg.text}`}
                  >
                    {article.category}
                  </span>
                  <h2 className="mt-3 text-xl font-bold text-ink">{article.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-7 text-leaf-900/60">
                    {article.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-bold text-leaf-600 group-hover:text-leaf-700">
                    Leer artículo
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8H13M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </article>
              );
            })}

            {articles.length < 3 &&
              Array.from({ length: 3 - articles.length }).map((_, i) => (
                <div
                  key={i}
                  className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/30 px-6 py-12 text-center"
                >
                  <span className="text-4xl" aria-hidden="true">📝</span>
                  <p className="mt-4 text-sm font-semibold text-leaf-600">
                    Más artículos en camino
                  </p>
                  <p className="mt-1 text-xs text-leaf-900/40">
                    Contenido nuevo disponible pronto
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
