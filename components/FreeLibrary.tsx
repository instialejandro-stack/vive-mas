"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { Resource } from "@/data/resources";

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

export function FreeLibrary({ resources }: { resources: Resource[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");

  const freeResources = useMemo(
    () => resources.filter((item) => item.access === "gratis"),
    [resources]
  );

  const categories = ["Todas", ...Array.from(new Set(freeResources.map((item) => item.category)))];
  const featured = freeResources.filter((item) => item.featured);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return freeResources
      .filter((item) => {
        const matchesCategory = category === "Todas" || item.category === category;
        const searchable = `${item.title} ${item.description} ${item.category} ${item.format} ${item.tags.join(" ")}`.toLowerCase();
        const matchesQuery = normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.title.localeCompare(b.title));
  }, [category, freeResources, query]);

  function clearFilters() {
    setQuery("");
    setCategory("Todas");
  }

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 lg:grid-cols-3">
        {[
          ["Empieza por aquí", "Primeros hábitos diarios", "Reúne checklist, reto semanal y registro básico para crear continuidad sin complicarte.", "Hábitos"],
          ["Cocina sencilla", "Compra y menú semanal", "Recursos para preparar comidas, comprar con más claridad y reducir decisiones.", "Alimentación"],
          ["Orden semanal", "Planifica sin rigidez", "Plantillas y guías para organizar la semana sin convertirlo en otra tarea pesada.", "Planificación"]
        ].map(([eyebrow, title, description, target]) => (
          <article key={title} className="surface-card reveal-up p-6">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-leaf-600">{eyebrow}</p>
            <h2 className="mt-4 text-xl font-black text-ink">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-leaf-900/62">{description}</p>
            <button
              type="button"
              onClick={() => setCategory(target)}
              className="focus-ring mt-5 rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
            >
              Ver {target.toLowerCase()}
            </button>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-card lg:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
              Categorías
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((item) => {
                const count = item === "Todas"
                  ? freeResources.length
                  : freeResources.filter((resource) => resource.category === item).length;
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
              htmlFor="library-search"
              className="flex items-center gap-3 border-b border-leaf-800/70 pb-3 text-ink"
            >
              <SearchIcon />
              <input
                id="library-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="focus-ring w-full rounded-lg bg-transparent px-1 py-1 text-base outline-none placeholder:text-leaf-900/45"
                placeholder="Buscar recursos..."
              />
            </label>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-leaf-900/60" aria-live="polite">
                {filtered.length} recurso{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}
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

      {featured.length > 0 && category === "Todas" && query.trim().length === 0 ? (
        <section>
          <div className="mb-4">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">Recomendados</p>
            <h2 className="mt-1 text-2xl font-black text-ink">Para empezar hoy</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featured.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-4">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">Todos los recursos</p>
          <h2 className="mt-1 text-2xl font-black text-ink">Biblioteca completa</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-mist p-8 text-center">
            <p className="text-lg font-black text-ink">No hay recursos con esos filtros todavía.</p>
            <p className="mt-2 text-sm text-leaf-900/60">
              Prueba con otra categoría o busca una palabra más general.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="focus-ring mt-5 rounded-full bg-leaf-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-leaf-700"
            >
              Ver todos
            </button>
          </div>
        ) : null}
      </section>

      <section className="rounded-3xl border border-leaf-100 bg-gradient-to-br from-leaf-50 via-white to-cream p-6 shadow-card lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
              Preparado para crecer
            </p>
            <h2 className="mt-2 text-2xl font-black text-ink">Subir nuevos descargables será sencillo</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-4">
              <p className="font-black text-ink">1. Añadir archivo</p>
              <p className="mt-2 text-sm leading-6 text-leaf-900/60">Guarda el PDF o recurso en `public/downloads`.</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="font-black text-ink">2. Crear ficha</p>
              <p className="mt-2 text-sm leading-6 text-leaf-900/60">Añade título, imagen, etiquetas y enlace en `data/resources.ts`.</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="font-black text-ink">3. Publicar</p>
              <p className="mt-2 text-sm leading-6 text-leaf-900/60">La biblioteca lo mostrará con filtros y tarjetas automáticamente.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
