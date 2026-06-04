import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/Button";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";
import { RelatedNextSteps } from "@/components/RelatedNextSteps";
import { articles } from "@/data/articles";
import { resources } from "@/data/resources";

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

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({
      article: item,
      score:
        Number(item.category === article.category) * 3 +
        item.tags.filter((tag) => article.tags.includes(tag)).length
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.article);

  const relatedResources = resources
    .filter(
      (resource) =>
        resource.access === "gratis" &&
        (resource.category === article.category ||
          resource.tags.some((tag) => article.tags.includes(tag)))
    )
    .slice(0, 2);

  return (
    <main>
      <RecentlyViewedTracker
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
      <article className="bg-gradient-to-br from-leaf-50 via-white to-cream py-16">
        <div className="page-shell">
          <Link
            href="/blog"
            className="focus-ring inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-leaf-700 transition hover:bg-leaf-50"
          >
            Volver al blog
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
                <span className="rounded-full bg-leaf-600 px-3 py-1 text-white">
                  {article.category}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-leaf-900/55">
                  {article.readTime}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-leaf-900/55">
                  {new Date(article.publishedAt).toLocaleDateString("es-ES")}
                </span>
              </div>

              <h1 className="mt-6 font-serif text-4xl font-normal leading-tight text-ink md:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 text-xl leading-9 text-leaf-900/65">{article.excerpt}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-900/55 ring-1 ring-leaf-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-card">
              <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
                En este artículo
              </p>
              <ol className="mt-4 grid gap-3 text-sm font-bold text-leaf-900/65">
                {article.content.map((paragraph, index) => (
                  <li key={paragraph} className="rounded-2xl bg-mist px-4 py-3">
                    {index + 1}. {paragraph.slice(0, 58)}...
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </article>

      <section className="py-14">
        <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="rounded-3xl border border-leaf-100 bg-white p-6 shadow-card md:p-10">
            <div className="space-y-7">
              {article.content.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-9 text-leaf-900/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="grid gap-4">
            <div className="rounded-3xl border border-leaf-100 bg-mist p-5">
              <h2 className="text-xl font-black text-ink">Siguiente paso práctico</h2>
              <p className="mt-2 text-sm leading-6 text-leaf-900/62">
                Convierte la idea en una acción sencilla usando una herramienta o recurso gratuito.
              </p>
              <div className="mt-4 grid gap-2">
                <Button href="/herramientas-gratis" size="sm">
                  Usar herramientas
                </Button>
                <Button href="/biblioteca-gratis" variant="secondary" size="sm">
                  Ver recursos gratis
                </Button>
              </div>
            </div>

            {relatedResources.length > 0 ? (
              <div className="rounded-3xl border border-leaf-100 bg-white p-5 shadow-card">
                <h2 className="text-lg font-black text-ink">Recursos relacionados</h2>
                <div className="mt-4 grid gap-3">
                  {relatedResources.map((resource) => (
                    <Link
                      key={resource.id}
                      href={resource.href}
                      className="focus-ring rounded-2xl bg-mist p-4 text-sm font-bold text-ink transition hover:bg-leaf-50 hover:text-leaf-700"
                    >
                      {resource.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="pb-16">
          <div className="page-shell grid gap-8">
            <RelatedNextSteps
              currentId={`article-${article.slug}`}
              category={article.category}
              tags={article.tags}
            />
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
              Sigue leyendo
            </p>
            <h2 className="mt-2 text-2xl font-black text-ink">Artículos relacionados</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedArticles.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
