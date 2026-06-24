"use client";

import { useMemo, useState } from "react";
import { TemplateCard } from "@/components/TemplateCard";
import { Template } from "@/data/templates";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10.8 18.1a7.3 7.3 0 1 1 0-14.6 7.3 7.3 0 0 1 0 14.6ZM16.1 16.1 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TemplateLibrary({ templates }: { templates: Template[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");

  const categories = ["Todas", ...Array.from(new Set(templates.map((template) => template.category)))];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return templates.filter((template) => {
      const matchesCategory = category === "Todas" || template.category === category;
      const searchable = `${template.title} ${template.description} ${template.category} ${template.status} ${template.includes.join(" ")}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query, templates]);

  function clearFilters() {
    setQuery("");
    setCategory("Todas");
  }

  return (
    <div className="grid gap-8">
      <section className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-card lg:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
              Categorías
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((item) => {
                const count = item === "Todas"
                  ? templates.length
                  : templates.filter((template) => template.category === item).length;
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={active}
                    className={`focus-ring border px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 ${
                      active
                        ? "border-leaf-700 bg-leaf-700 text-white shadow-soft"
                        : "border-leaf-700/35 bg-white text-ink hover:border-leaf-700 hover:bg-leaf-50"
                    }`}
                  >
                    {item}
                    <span className={active ? "ml-2 text-white/75" : "ml-2 text-leaf-900/45"}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="template-search"
              className="flex items-center gap-3 border-b border-leaf-800/70 pb-3 text-ink"
            >
              <SearchIcon />
              <input
                id="template-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="focus-ring w-full rounded-lg bg-transparent px-1 py-1 text-base outline-none placeholder:text-leaf-900/45"
                placeholder="Buscar plantillas..."
              />
            </label>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-leaf-900/60" aria-live="polite">
                {filtered.length} plantilla{filtered.length === 1 ? "" : "s"} encontrada{filtered.length === 1 ? "" : "s"}
              </p>
              {query || category !== "Todas" ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="focus-ring rounded-full px-3 py-1.5 text-sm font-bold text-leaf-700 transition hover:bg-leaf-50"
                >
                  Limpiar
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-mist p-8 text-center">
          <p className="text-lg font-black text-ink">No hay plantillas con esos filtros.</p>
          <p className="mt-2 text-sm text-leaf-900/60">
            Prueba con otra categoría o busca por una palabra más general.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="focus-ring mt-5 rounded-full bg-leaf-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-leaf-700"
          >
            Ver todas
          </button>
        </div>
      ) : null}
    </div>
  );
}
