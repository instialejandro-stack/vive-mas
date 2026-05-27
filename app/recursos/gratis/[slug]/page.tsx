import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ResourceVisual } from "@/components/ResourceVisual";
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

  return (
    <main className="py-16">
      <div className="page-shell">
        <Link
          href="/biblioteca-gratis"
          className="focus-ring inline-flex rounded-full bg-leaf-50 px-4 py-2 text-sm font-bold text-leaf-700 transition hover:bg-leaf-100"
        >
          Volver a la biblioteca
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <ResourceVisual visual={resource.visual} title={resource.title} size="hero" />
          </div>

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

            <div className="mt-8 rounded-2xl bg-mist p-5">
              <h2 className="text-xl font-black text-ink">Qué encontrarás dentro</h2>
              <ul className="mt-4 grid gap-3">
                {resource.inside.map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-leaf-900/70">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-leaf-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button href={resource.downloadUrl ?? "/recursos/gratis"} variant="secondary">
                Descargar recurso
              </Button>
              {resource.relatedToolHref ? (
                <Button href={resource.relatedToolHref}>
                  Usar herramienta relacionada
                </Button>
              ) : null}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
