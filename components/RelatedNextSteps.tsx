import Link from "next/link";
import { ContentItem, getContentIndex } from "@/lib/contentIndex";

type RelatedNextStepsProps = {
  title?: string;
  currentId: string;
  category?: string;
  tags?: string[];
  limit?: number;
};

function scoreItem(item: ContentItem, category?: string, tags: string[] = []) {
  const categoryScore = category && item.category === category ? 4 : 0;
  const tagScore = item.tags.filter((tag) => tags.includes(tag)).length * 2;
  const broadMatch = tags.some((tag) => item.description.toLowerCase().includes(tag.toLowerCase())) ? 1 : 0;

  return categoryScore + tagScore + broadMatch;
}

export function RelatedNextSteps({
  title = "Siguiente paso recomendado",
  currentId,
  category,
  tags = [],
  limit = 3
}: RelatedNextStepsProps) {
  const items = getContentIndex()
    .filter((item) => item.id !== currentId)
    .map((item) => ({ item, score: scoreItem(item, category, tags) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-card">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Continúa</p>
          <h2 className="mt-2 text-2xl font-black text-ink">{title}</h2>
        </div>
        <Link
          href="/buscar"
          className="focus-ring w-fit rounded-full bg-mist px-4 py-2 text-sm font-bold text-leaf-700 transition hover:bg-leaf-50"
        >
          Buscar más
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="focus-ring rounded-2xl border border-leaf-100 bg-mist p-4 transition hover:-translate-y-1 hover:bg-leaf-50 hover:shadow-card"
          >
            <span className="text-xs font-black uppercase tracking-[0.12em] text-leaf-600">
              {item.type}
            </span>
            <span className="mt-2 block text-base font-black text-ink">{item.title}</span>
            <span className="mt-2 line-clamp-2 block text-sm leading-6 text-leaf-900/62">
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
