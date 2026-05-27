import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: article.title,
    description: article.excerpt
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="focus-ring inline-flex rounded-full text-sm font-bold text-leaf-600 transition hover:text-leaf-800"
        >
          Volver al blog
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          <span className="rounded-full bg-leaf-50 px-3 py-1 text-leaf-600">
            {article.category}
          </span>
          <span className="text-leaf-900/45">{article.readTime}</span>
        </div>
        <h1 className="mt-6 font-serif text-4xl font-normal leading-tight text-ink md:text-6xl">
          {article.title}
        </h1>
        <p className="mt-6 text-xl leading-8 text-leaf-900/65">{article.excerpt}</p>
        <div className="mt-10 space-y-6 border-t border-leaf-100 pt-10">
          {article.content.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-9 text-leaf-900/75">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
