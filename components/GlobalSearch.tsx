"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ContentItem } from "@/lib/contentIndex";

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

export function GlobalSearch({ items }: { items: ContentItem[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Todo");
  const types = ["Todo", ...Array.from(new Set(items.map((item) => item.type)))];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesType = type === "Todo" || item.type === type;
      const searchable = `${item.title} ${item.description} ${item.category} ${item.tags.join(" ")}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
      return matchesType && matchesQuery;
    });
  }, [items, query, type]);

  return (
    <div className="grid gap-8">
      <section className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-card lg:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">Tipo de contenido</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {types.map((item) => {
                const count = item === "Todo" ? items.length : items.filter((entry) => entry.type === item).length;
                const active = type === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setType(item)}
                    aria-pressed={active}
                    className={`focus-ring border px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 ${
                      active
                        ? "border-leaf-700 bg-leaf-700 text-white shadow-soft"
                        : "border-leaf-700/35 bg-white text-ink hover:border-leaf-700 hover:bg-leaf-50"
                    }`}
                  >
                    {item}
                    <span className={active ? "ml-2 text-white/75" : "ml-2 text-leaf-900/45"}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <label htmlFor="global-search" className="flex items-center gap-3 border-b border-leaf-800/70 pb-3 text-ink">
            <SearchIcon />
            <input
              id="global-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="focus-ring w-full rounded-lg bg-transparent px-1 py-1 text-base outline-none placeholder:text-leaf-900/45"
              placeholder="Buscar en Vive Más..."
            />
          </label>
        </div>
        <p className="mt-4 text-sm font-semibold text-leaf-900/60" aria-live="polite">
          {filtered.length} resultado{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.id} className="surface-card reveal-up flex min-h-full flex-col p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-leaf-700">
                {item.type}
              </span>
              <FavoriteButton item={item} compact />
            </div>
            <h2 className="mt-4 text-xl font-black text-ink">{item.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-leaf-900/62">{item.description}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-leaf-900/40">{item.category}</p>
            <Link
              href={item.href}
              className="focus-ring mt-5 inline-flex w-fit rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
            >
              Abrir
            </Link>
          </article>
        ))}
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-mist p-8 text-center">
          <p className="text-lg font-black text-ink">No hay resultados con esa búsqueda.</p>
          <p className="mt-2 text-sm text-leaf-900/60">Prueba con una palabra más general, como hábitos, comida o reto.</p>
        </div>
      ) : null}
    </div>
  );
}
