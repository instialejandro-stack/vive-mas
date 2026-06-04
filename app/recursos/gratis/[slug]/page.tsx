import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";
import { RelatedNextSteps } from "@/components/RelatedNextSteps";
import { ResourceCard } from "@/components/ResourceCard";
import { ResourceVisual } from "@/components/ResourceVisual";
import { articles } from "@/data/articles";
import { resources } from "@/data/resources";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return resources
    .filter((resource) => resource.access === "gratis")
    .map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);

  if (!resource) {
    return { title: "Recurso no encontrado" };
  }

  return {
    title: `${resource.title} | Biblioteca gratis`,
    description: resource.description
  };
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug && item.access === "gratis");

  if (!resource) {
    notFound();
  }

  const relatedResources = resources
    .filter(
      (item) =>
        item.access === "gratis" &&
        item.slug !== resource.slug &&
        (item.category === resource.category ||
          item.tags.some((tag) => resource.tags.includes(tag)))
    )
    .slice(0, 3);

  const relatedArticles = articles
    .filter(
      (article) =>
        article.category === resource.category ||
        article.tags.some((tag) => resource.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <main>
      <RecentlyViewedTracker
        item={{
          id: `resource-${resource.slug}`,
          title: resource.title,
          description: resource.description,
          href: resource.href,
          type: "Recurso",
          category: resource.category,
          tags: resource.tags
        }}
      />
      <section className="bg-gradient-to-br from-leaf-50 via-white to-cream py-14">
        <div className="page-shell">
          <Link
            href="/biblioteca-gratis"
            className="focus-ring inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-leaf-700 transition hover:bg-leaf-50"
          >
            Volver a la biblioteca
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <ResourceVisual visual={resource.visual} title={resource.title} size="hero" />

            <article className="rounded-3xl border border-leaf-100 bg-white p-6 shadow-card lg:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700">
                  {resource.category}
                </span>
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-leaf-900/60">
                  {resource.format}
                </span>
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-leaf-900/60">
                  {resource.level}
                </span>
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-leaf-900/60">
                  {resource.estimatedTime}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight text-ink">{resource.title}</h1>
              <p className="mt-4 text-lg leading-8 text-leaf-900/65">{resource.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-900/55 ring-1 ring-leaf-100">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-mist p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-leaf-900/45">Formato</p>
                  <p className="mt-2 font-black text-ink">{resource.format}</p>
                </div>
                <div className="rounded-2xl bg-mist p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-leaf-900/45">Tiempo</p>
                  <p className="mt-2 font-black text-ink">{resource.estimatedTime}</p>
                </div>
                <div className="rounded-2xl bg-mist p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-leaf-900/45">Acceso</p>
                  <p className="mt-2 font-black text-leaf-700">Gratis</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Button href={resource.downloadUrl ?? "/recursos/gratis"} variant="secondary">
                  Descargar PDF
                </Button>
                {resource.relatedToolHref ? (
                  <Button href={resource.relatedToolHref}>
                    Usar herramienta relacionada
                  </Button>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="page-shell grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-leaf-100 bg-white p-6 shadow-card lg:p-8">
            <h2 className="text-2xl font-black text-ink">Qué encontrarás dentro</h2>
            <ul className="mt-5 grid gap-3">
              {resource.inside.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-mist px-4 py-4 text-sm font-semibold leading-6 text-leaf-900/70">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-leaf-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-3xl border border-leaf-100 bg-gradient-to-br from-leaf-50 to-cream p-6 shadow-card">
            <h2 className="text-2xl font-black text-ink">Cómo usarlo</h2>
            <ol className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-leaf-900/70">
              <li className="rounded-2xl bg-white p-4">1. Descarga el PDF y revísalo sin prisa.</li>
              <li className="rounded-2xl bg-white p-4">2. Elige una acción pequeña para hoy.</li>
              <li className="rounded-2xl bg-white p-4">3. Combínalo con una herramienta gratuita si quieres seguimiento.</li>
            </ol>
          </aside>
        </div>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="pb-14">
          <div className="page-shell grid gap-8">
            <RelatedNextSteps
              currentId={`resource-${resource.slug}`}
              category={resource.category}
              tags={resource.tags}
            />
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
              Para profundizar
            </p>
            <h2 className="mt-2 text-2xl font-black text-ink">Artículos relacionados</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="focus-ring rounded-2xl border border-leaf-100 bg-white p-5 font-bold text-ink shadow-card transition hover:-translate-y-1 hover:text-leaf-700 hover:shadow-soft"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedResources.length > 0 ? (
        <section className="pb-16">
          <div className="page-shell">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
              También te puede ayudar
            </p>
            <h2 className="mt-2 text-2xl font-black text-ink">Recursos relacionados</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedResources.map((item) => (
                <ResourceCard key={item.id} resource={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
