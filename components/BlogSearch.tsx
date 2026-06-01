"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Article } from "@/data/articles";

const sortOptions = [
  { value: "recent", label: "Más recientes" },
  { value: "readTime", label: "Lectura rápida" },
  { value: "title", label: "Orden alfabético" }
];

export function BlogSearch({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [tag, setTag] = useState("Todas");
  const [sort, setSort] = useState("recent");

  const categories = ["Todas", ...Array.from(new Set(articles.map((article) => article.category)))];
  const tags = ["Todas", ...Array.from(new Set(articles.flatMap((article) => article.tags)))];
  const featured = articles.slice(0, 3);

  const categoryCounts = categories
    .filter((item) => item !== "Todas")
    .map((item) => ({
      name: item,
      count: articles.filter((article) => article.category === item).length
    }));

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = articles.filter((article) => {
      const matchesCategory = category === "Todas" || article.category === category;
      const matchesTag = tag === "Todas" || article.tags.includes(tag);
      const text = `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(" ")}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || text.includes(normalizedQuery);
      return matchesCategory && matchesTag && matchesQuery;
    });

    return result.sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "readTime") {
        return Number.parseInt(a.readTime, 10) - Number.parseInt(b.readTime, 10);
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [articles, category, query, sort, tag]);

  function clearFilters() {
    setQuery("");
    setCategory("Todas");
    setTag("Todas");
    setSort("recent");
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
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-card lg:p-6">
        <div className="grid gap-5 xl:grid-cols-[1fr_0.7fr] xl:items-start">
          <div>
            <label className="block text-sm font-black text-ink" htmlFor="blog-search">
              Buscar artículos
            </label>
            <input
              id="blog-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="focus-ring mt-3 min-h-14 w-full rounded-2xl border border-leaf-100 bg-mist px-4 text-base"
              placeholder="Buscar por tema, hábito, comida, entrenamiento..."
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
            <p className="text-sm font-black text-ink">Resumen del blog</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-3">
                <p className="text-2xl font-black text-leaf-600">{articles.length}</p>
                <p className="text-xs font-bold text-leaf-900/55">artículos</p>
              </div>
              <div className="rounded-2xl bg-white p-3">
                <p className="text-2xl font-black text-leaf-600">{categories.length - 1}</p>
                <p className="text-xs font-bold text-leaf-900/55">temas</p>
              </div>
              <div className="rounded-2xl bg-white p-3">
                <p className="text-2xl font-black text-leaf-600">{tags.length - 1}</p>
                <p className="text-xs font-bold text-leaf-900/55">etiquetas</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-[200px_200px_1fr_auto]">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
            aria-label="Filtrar artículos por categoría"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
            aria-label="Filtrar artículos por etiqueta"
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
            aria-label="Ordenar artículos"
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

        <p className="mt-4 text-sm font-semibold text-leaf-900/60">
          {filtered.length} artículo{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}
        </p>
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
    </div>
  );
}
