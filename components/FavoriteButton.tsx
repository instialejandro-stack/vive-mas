"use client";

import { useEffect, useState } from "react";
import { ContentItem } from "@/lib/contentIndex";

const favoritesKey = "vive-mas-favorites";

function readFavorites(): ContentItem[] {
  try {
    return JSON.parse(window.localStorage.getItem(favoritesKey) ?? "[]") as ContentItem[];
  } catch {
    return [];
  }
}

export function FavoriteButton({
  item,
  compact = false
}: {
  item: ContentItem;
  compact?: boolean;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(readFavorites().some((favorite) => favorite.id === item.id));
  }, [item.id]);

  function toggleFavorite() {
    const favorites = readFavorites();
    const exists = favorites.some((favorite) => favorite.id === item.id);
    const next = exists
      ? favorites.filter((favorite) => favorite.id !== item.id)
      : [item, ...favorites].slice(0, 60);

    window.localStorage.setItem(favoritesKey, JSON.stringify(next));
    setActive(!exists);
    window.dispatchEvent(new Event("vive-mas-favorites-updated"));
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`focus-ring inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${
        active
          ? "border-leaf-600 bg-leaf-600 text-white"
          : "border-leaf-200 bg-white text-leaf-700 hover:bg-leaf-50"
      } ${compact ? "px-2.5 py-1.5 text-xs" : ""}`}
      aria-pressed={active}
    >
      <span aria-hidden="true">{active ? "★" : "☆"}</span>
      {active ? "Guardado" : "Guardar"}
    </button>
  );
}
