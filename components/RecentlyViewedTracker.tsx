"use client";

import { useEffect } from "react";
import { ContentItem } from "@/lib/contentIndex";

const recentKey = "vive-mas-recently-viewed";

export function RecentlyViewedTracker({ item }: { item: ContentItem }) {
  useEffect(() => {
    try {
      const current = JSON.parse(window.localStorage.getItem(recentKey) ?? "[]") as ContentItem[];
      const next = [item, ...current.filter((entry) => entry.id !== item.id)].slice(0, 20);
      window.localStorage.setItem(recentKey, JSON.stringify(next));
      window.dispatchEvent(new Event("vive-mas-recent-updated"));
    } catch {
      // Local history is optional; ignore unavailable storage.
    }
  }, [item]);

  return null;
}
