"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Article } from "@/data/articles";

export function BlogSearch({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [tag, setTag] = useState("Todas");

  const categories = ["Todas", ...Array.from(new Set(articles.map((article) => article.category)))];
  const tags = ["Todas", ...Array.from(new Set(articles.flatMap((article) => article.tags)))];
  const filtered = useMemo(
    () =>
      articles.filter((article) => {
        const matchesCategory = category === "Todas" || article.category === category;
        const matchesTag = tag === "Todas" || article.tags.includes(tag);
        const text = `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(" ")}`.toLowerCase();
        return matchesCategory && matchesTag && text.includes(query.toLowerCase());
      }),
    [articles, category, query, tag]
  );

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-leaf-100 bg-white p-4 shadow-card">
        <div className="grid gap-3 md:grid-cols-[1fr_200px_200px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm"
          placeholder="Buscar por tema, hábito, comida..."
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="focus-ring min-h-12 rounded-xl border border-leaf-100 bg-mist px-4 text-sm font-semibold"
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
        >
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        </div>
        <p className="mt-4 text-sm font-semibold text-leaf-900/60">
          {filtered.length} artículo{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl bg-mist p-6 text-center text-leaf-900/65">
          No hay artículos con esos filtros todavía.
        </p>
      )}
    </div>
  );
}
