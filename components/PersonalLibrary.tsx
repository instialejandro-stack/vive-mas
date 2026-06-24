"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContentItem } from "@/lib/contentIndex";

const favoritesKey = "vive-mas-favorites";
const recentKey = "vive-mas-recently-viewed";

function readItems(key: string) {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as ContentItem[];
  } catch {
    return [];
  }
}

export function PersonalLibrary() {
  const [favorites, setFavorites] = useState<ContentItem[]>([]);
  const [recent, setRecent] = useState<ContentItem[]>([]);

  function refresh() {
    setFavorites(readItems(favoritesKey));
    setRecent(readItems(recentKey));
  }

  useEffect(() => {
    refresh();
    window.addEventListener("vive-mas-favorites-updated", refresh);
    window.addEventListener("vive-mas-recent-updated", refresh);
    return () => {
      window.removeEventListener("vive-mas-favorites-updated", refresh);
      window.removeEventListener("vive-mas-recent-updated", refresh);
    };
  }, []);

  function removeFavorite(id: string) {
    const next = favorites.filter((item) => item.id !== id);
    window.localStorage.setItem(favoritesKey, JSON.stringify(next));
    setFavorites(next);
  }

  function clearRecent() {
    window.localStorage.removeItem(recentKey);
    setRecent([]);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section className="rounded-3xl border border-leaf-100 bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">Favoritos</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Guardado para volver rápido</h2>
          </div>
          <span className="rounded-full bg-mist px-3 py-1 text-sm font-bold text-leaf-900/60" aria-live="polite">
            {favorites.length}
          </span>
        </div>
        <ItemList items={favorites} emptyHref="/buscar" emptyText="Busca y guarda tu primer contenido." onRemove={removeFavorite} />
      </section>

      <section className="rounded-3xl border border-leaf-100 bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">Recientes</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Últimos contenidos vistos</h2>
          </div>
          {recent.length > 0 ? (
            <button
              type="button"
              onClick={clearRecent}
              className="focus-ring rounded-full px-3 py-1 text-sm font-bold text-leaf-700 transition hover:bg-leaf-50"
            >
              Limpiar
            </button>
          ) : null}
        </div>
        <ItemList items={recent} emptyHref="/empieza-aqui" emptyText="Explora una ruta para crear tu historial." />
      </section>
    </div>
  );
}

function ItemList({
  items,
  emptyHref,
  emptyText,
  onRemove
}: {
  items: ContentItem[];
  emptyHref: string;
  emptyText: string;
  onRemove?: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="mt-6 rounded-2xl bg-mist p-6 text-center">
        <p className="font-bold text-ink">{emptyText}</p>
        <Link
          href={emptyHref}
          className="focus-ring mt-4 inline-flex rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
        >
          Empezar
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl bg-mist p-4">
          <div className="flex items-start justify-between gap-3">
            <Link href={item.href} className="focus-ring rounded-lg">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-leaf-600">{item.type}</span>
              <h3 className="mt-1 font-black text-ink">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-leaf-900/60">{item.description}</p>
            </Link>
            {onRemove ? (
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Quitar ${item.title} de favoritos`}
                className="focus-ring shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-900/55 transition hover:bg-leaf-50"
              >
                Quitar
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
