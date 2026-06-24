"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Article } from "@/data/articles";

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

export function BlogSearch({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");

  const categories = ["Todas", ...Array.from(new Set(articles.map((article) => article.category)))];
  const featured = articles.slice(0, 3);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles
      .filter((article) => {
        const matchesCategory = category === "Todas" || article.category === category;
        const text = `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(" ")}`.toLowerCase();
        const matchesQuery = normalizedQuery.length === 0 || text.includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [articles, category, query]);

  function clearFilters() {
    setQuery("");
    setCategory("Todas");
  }

  return (
    <div className="grid gap-10">
      <section className="grid gap-4 lg:grid-cols-3">
        {featured.map((article, index) => (
          <article
            key={article.id}
            className="surface-card reveal-up flex min-h-full flex-col p-6"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-leaf-600">
              {index === 0 ? "Empieza por aquí" : "Lectura recomendada"}
            </p>
            <h2 className="mt-4 text-xl font-black text-ink">{article.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-leaf-900/62">{article.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-leaf-50 px-3 py-1 text-leaf-700">{article.category}</span>
              <span className="rounded-full bg-mist px-3 py-1 text-leaf-900/55">{article.readTime}</span>
            </div>
            <Link
              href={`/blog/${article.slug}`}
              className="focus-ring mt-5 inline-flex w-fit rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
            >
              Leer artículo
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-card lg:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
              Categorías
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((item) => {
                const count = item === "Todas"
                  ? articles.length
                  : articles.filter((article) => article.category === item).length;
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
              htmlFor="blog-search"
              className="flex items-center gap-3 border-b border-leaf-800/70 pb-3 text-ink"
            >
              <SearchIcon />
              <input
                id="blog-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="focus-ring w-full rounded-lg bg-transparent px-1 py-1 text-base outline-none placeholder:text-leaf-900/45"
                placeholder="Buscar en el blog..."
              />
            </label>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-leaf-900/60" aria-live="polite">
                {filtered.length} artículo{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}
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

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">Todos los artículos</p>
            <h2 className="mt-1 text-2xl font-black text-ink">Biblioteca editorial</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-mist p-8 text-center">
            <p className="text-lg font-black text-ink">No hay artículos con esos filtros todavía.</p>
            <p className="mt-2 text-sm text-leaf-900/60">
              Prueba con otra categoría o busca por una palabra más general.
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
    </div>
  );
}
