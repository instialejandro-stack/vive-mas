import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Article } from "@/data/articles";

const categoryStyles: Record<string, { badge: string; panel: string; accent: string }> = {
  Alimentación: {
    badge: "bg-[#fde9e4] text-[#934230]",
    panel: "from-[#fde9e4] to-white",
    accent: "bg-[#d96b52]"
  },
  Hábitos: {
    badge: "bg-leaf-50 text-leaf-700",
    panel: "from-leaf-50 to-white",
    accent: "bg-leaf-600"
  },
  Entrenamiento: {
    badge: "bg-honey-light text-honey-dark",
    panel: "from-honey-light to-white",
    accent: "bg-honey-dark"
  },
  Bienestar: {
    badge: "bg-sky-light text-sky-dark",
    panel: "from-sky-light to-white",
    accent: "bg-sky-dark"
  }
};

export function ArticleCard({ article }: { article: Article }) {
  const style = categoryStyles[article.category] ?? categoryStyles.Hábitos;

  return (
    <article className="surface-card reveal-up group flex min-h-full flex-col overflow-hidden p-0">
      <div className={`relative min-h-28 bg-gradient-to-br ${style.panel} p-5`}>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${style.badge}`}>
          {article.category}
        </span>
        <div className={`absolute bottom-0 left-0 h-1.5 w-full ${style.accent}`} aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-leaf-900/45">
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </time>
        </div>
        <div className="mt-4">
          <FavoriteButton
            compact
            item={{
              id: `article-${article.slug}`,
              title: article.title,
              description: article.excerpt,
              href: `/blog/${article.slug}`,
              type: "Artículo",
              category: article.category,
              tags: article.tags
            }}
          />
        </div>

        <h3 className="mt-4 text-xl font-black text-ink">{article.title}</h3>
        <p className="mt-3 flex-1 leading-7 text-leaf-900/65">{article.excerpt}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-leaf-900/55">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className="focus-ring mt-6 inline-flex w-fit rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-leaf-700"
        >
          Leer artículo
        </Link>
      </div>
    </article>
  );
}
