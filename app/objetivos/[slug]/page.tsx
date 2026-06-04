import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { objectives } from "@/data/objectives";

type ObjectivePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return objectives.map((objective) => ({ slug: objective.slug }));
}

export async function generateMetadata({ params }: ObjectivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const objective = objectives.find((item) => item.slug === slug);

  if (!objective) {
    return { title: "Objetivo no encontrado" };
  }

  return {
    title: objective.title,
    description: objective.description
  };
}

export default async function ObjectivePage({ params }: ObjectivePageProps) {
  const { slug } = await params;
  const objective = objectives.find((item) => item.slug === slug);

  if (!objective) {
    notFound();
  }

  return (
    <main>
      <section className={`bg-gradient-to-br ${objective.accent} py-16 md:py-24`}>
        <div className="page-shell">
          <Link
            href="/empieza-aqui"
            className="focus-ring inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-leaf-700 transition hover:bg-leaf-50"
          >
            Volver a Empieza aqui
          </Link>
          <div className="mt-8 max-w-4xl">
            <p className="eyebrow">Objetivo guiado</p>
            <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink md:text-6xl">
              {objective.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-leaf-900/68">
              {objective.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
            <p className="eyebrow">Para quien es</p>
            <h2 className="mt-3 text-2xl font-black text-ink">{objective.audience}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {objective.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-leaf-900/55">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              <Button href="/mi-bienestar">Abrir Mi bienestar</Button>
              <Button href="/buscar" variant="secondary">
                Buscar mas contenido
              </Button>
            </div>
          </aside>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-ink">Plan sugerido</h2>
              <ol className="mt-5 grid gap-3">
                {objective.steps.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-2xl bg-mist p-4 font-semibold leading-7 text-leaf-900/72">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-ink">Contenido recomendado</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {objective.featuredLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="focus-ring rounded-2xl border border-leaf-100 bg-mist p-4 transition hover:-translate-y-1 hover:bg-leaf-50 hover:shadow-card"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-leaf-600">
                      {link.type}
                    </span>
                    <span className="mt-2 block font-black text-ink">{link.label}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
