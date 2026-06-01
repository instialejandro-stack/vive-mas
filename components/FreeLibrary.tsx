"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { Resource } from "@/data/resources";

const sortOptions = [
  { value: "featured", label: "Destacados primero" },
  { value: "title", label: "Orden alfabético" },
  { value: "format", label: "Por formato" }
];

export function FreeLibrary({ resources }: { resources: Resource[] }) {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("Todos");
  const [category, setCategory] = useState("Todas");
  const [tag, setTag] = useState("Todas");
  const [sort, setSort] = useState("featured");

  const freeResources = useMemo(
    () => resources.filter((item) => item.access === "gratis"),
    [resources]
  );

  const formats = ["Todos", ...Array.from(new Set(freeResources.map((item) => item.format)))];
  const categories = ["Todas", ...Array.from(new Set(freeResources.map((item) => item.category)))];
  const tags = ["Todas", ...Array.from(new Set(freeResources.flatMap((item) => item.tags)))];
  const featured = freeResources.filter((item) => item.featured);

  const categoryCounts = categories
    .filter((item) => item !== "Todas")
    .map((item) => ({
      name: item,
      count: freeResources.filter((resource) => resource.category === item).length
    }));

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = freeResources.filter((item) => {
      const matchesFormat = format === "Todos" || item.format === format;
      const matchesCategory = category === "Todas" || item.category === category;
      const matchesTag = tag === "Todas" || item.tags.includes(tag);
      const searchable = `${item.title} ${item.description} ${item.category} ${item.format} ${item.tags.join(" ")}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
      return matchesFormat && matchesCategory && matchesTag && matchesQuery;
    });

    return result.sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "format") {
        return a.format.localeCompare(b.format) || a.title.localeCompare(b.title);
      }
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.title.localeCompare(b.title);
    });
  }, [category, format, freeResources, query, sort, tag]);

  function clearFilters() {
    setQuery("");
    setFormat("Todos");
    setCategory("Todas");
    setTag("Todas");
    setSort("featured");
  }

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 lg:grid-cols-3">
        <article className="surface-card reveal-up p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-leaf-600">
            Empieza por aquí
          </p>
          <h2 className="mt-4 text-xl font-black text-ink">Primeros hábitos diarios</h2>
          <p className="mt-3 text-sm leading-7 text-leaf-900/62">
            Reúne checklist, reto semanal y registro básico para crear continuidad sin complicarte.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("Hábitos");
              setTag("Todas");
              setFormat("Todos");
            }}
            className="focus-ring mt-5 rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
          >
            Ver hábitos
          </button>
        </article>

        <article className="surface-card reveal-up p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-leaf-600">
            Cocina sencilla
          </p>
          <h2 className="mt-4 text-xl font-black text-ink">Compra y menú semanal</h2>
          <p className="mt-3 text-sm leading-7 text-leaf-900/62">
            Accede a recursos para preparar comidas, comprar con más claridad y reducir decisiones.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("Alimentación");
              setTag("Todas");
              setFormat("Todos");
            }}
            className="focus-ring mt-5 rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
          >
            Ver alimentación
          </button>
        </article>

        <article className="surface-card reveal-up p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-leaf-600">
            Orden semanal
          </p>
          <h2 className="mt-4 text-xl font-black text-ink">Planifica sin rigidez</h2>
          <p className="mt-3 text-sm leading-7 text-leaf-900/62">
            Plantillas y guías pensadas para organizar la semana sin convertirlo en otra tarea pesada.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("Planificación");
              setTag("Todas");
              setFormat("Todos");
            }}
            className="focus-ring mt-5 rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
          >
            Ver planificación
          </button>
        </article>
      </section>

      <section className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-card lg:p-6">
        <div className="grid gap-5 xl:grid-cols-[1fr_0.75fr] xl:items-start">
          <div>
            <label className="block text-sm font-black text-ink" htmlFor="library-search">
              Buscar en la biblioteca
            </label>
            <input
              id="library-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="focus-ring mt-3 min-h-14 w-full rounded-2xl border border-leaf-100 bg-mist px-4 text-base"
              placeholder="Buscar por recurso, tema, etiqueta o formato..."
            />

            <div className="mt-5 flex flex-wrap gap-2">
              {categoryCounts.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setCategory(item.name)}
                  className={`focus-ring rounded-full px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${
                    category === item.name
                      ? "bg-leaf-600 text-white shadow-soft"
                      : "bg-mist text-leaf-900/65 hover:bg-leaf-50"
                  }`}
                >
                  {item.name} <span className="opacity-70">({item.count})</span>
                </button>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl bg-gradient-to-br from-leaf-50 to-cream p-5">
            <p className="text-sm font-black text-ink">Resumen</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-3">
                <p className="text-2xl font-black text-leaf-600">{freeResources.length}</p>
                <p className="text-xs font-bold text-leaf-900/55">recursos</p>
              </div>
              <div className="rounded-2xl bg-white p-3">
                <p className="text-2xl font-black text-leaf-600">{featured.length}</p>
                <p className="text-xs font-bold text-leaf-900/55">destacados</p>
              </div>
              <div className="rounded-2xl bg-white p-3">
                <p className="text-2xl font-black text-leaf-600">{formats.length - 1}</p>
                <p className="text-xs font-bold text-leaf-900/55">formatos</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-[180px_180px_180px_1fr_auto]">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
            aria-label="Filtrar por categoría"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
            className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
            aria-label="Filtrar por formato"
          >
            {formats.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
            aria-label="Filtrar por etiqueta"
          >
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
            aria-label="Ordenar recursos"
          >
            {sortOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={clearFilters}
            className="focus-ring rounded-xl border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900/70 transition hover:bg-leaf-50"
          >
            Limpiar
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-leaf-900/60">
            {filtered.length} recurso{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}
          </p>
          <p className="text-sm text-leaf-900/50">
            Todo es gratuito y funciona sin servicios externos.
          </p>
        </div>
      </section>

      {featured.length > 0 && category === "Todas" && query.trim().length === 0 ? (
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">Recomendados</p>
              <h2 className="mt-1 text-2xl font-black text-ink">Para empezar hoy</h2>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featured.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">Todos los recursos</p>
            <h2 className="mt-1 text-2xl font-black text-ink">Biblioteca completa</h2>
          </div>
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
              Prueba a limpiar filtros o buscar una categoría más general.
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
