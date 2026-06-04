import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";
import { templates } from "@/data/templates";

type TemplatePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({
  params
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);

  if (!template) {
    return { title: "Plantilla no encontrada" };
  }

  return {
    title: template.title,
    description: template.description
  };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);

  if (!template) {
    notFound();
  }

  const isAvailable = template.status === "Gratis";

  return (
    <article className="py-20">
      <RecentlyViewedTracker
        item={{
          id: `template-${template.slug}`,
          title: template.title,
          description: template.description,
          href: `/plantillas/${template.slug}`,
          type: "Plantilla",
          category: template.category,
          tags: template.includes.map((item) => item.toLowerCase())
        }}
      />
      <div className="page-shell">
        <Link
          href="/plantillas"
          className="focus-ring inline-flex rounded-full text-sm font-bold text-leaf-600 transition hover:text-leaf-800"
        >
          Volver a plantillas
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-leaf-600">
                {template.category}
              </span>
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-leaf-900">
                {template.status}
              </span>
            </div>
            <h1 className="mt-6 font-serif text-4xl font-normal leading-tight text-ink md:text-6xl">
              {template.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-leaf-900/65">
              {template.description}
            </p>

            <div className="mt-10 space-y-4">
              {template.preview.map((item) => (
                <p key={item} className="rounded-2xl bg-mist p-5 leading-7 text-leaf-900/70">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-card">
            <h2 className="text-2xl font-bold text-ink">Incluye</h2>
            <ul className="mt-5 space-y-3">
              {template.includes.map((item) => (
                <li key={item} className="rounded-xl bg-mist px-4 py-3 text-sm font-semibold text-leaf-900/70">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3">
              <Button href={isAvailable ? "/biblioteca-gratis" : "/plantillas"}>
                {isAvailable ? "Buscar descarga" : "Próximamente"}
              </Button>
              {template.relatedToolHref ? (
                <Button href={template.relatedToolHref} variant="secondary">
                  Usar version interactiva
                </Button>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
