import Link from "next/link";
import { Article } from "@/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="surface-card reveal-up p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
        <span className="rounded-full bg-leaf-50 px-3 py-1 text-leaf-600">
          {article.category}
        </span>
        <span className="text-leaf-900/45">{article.readTime}</span>
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink">{article.title}</h3>
      <p className="mt-3 leading-7 text-leaf-900/65">{article.excerpt}</p>
      <Link
        href={`/blog/${article.slug}`}
        className="focus-ring mt-6 inline-flex rounded-full text-sm font-bold text-leaf-600 transition hover:text-leaf-800"
      >
        Leer artículo
      </Link>
    </article>
  );
}
