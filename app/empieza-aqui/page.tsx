import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { OnboardingGuide } from "@/components/OnboardingGuide";
import { SimpleRecommender } from "@/components/SimpleRecommender";
import { objectives } from "@/data/objectives";

export const metadata: Metadata = {
  title: "Empieza aquí",
  description:
    "Rutas sencillas para empezar a mejorar alimentación, movimiento, hábitos y organización semanal."
};

const paths = [
  {
    title: "Quiero comer mejor",
    description: "Empieza por compra, menú semanal y una lista base sencilla.",
    href: "/biblioteca-gratis",
    links: [
      ["Guía de compra saludable", "/recursos/gratis/guia-compra-saludable"],
      ["Lista de compra", "/herramientas-gratis#lista-compra"],
      ["Planificador de comidas", "/herramientas-gratis#planificador-comidas"]
    ]
  },
  {
    title: "Quiero moverme más",
    description: "Crea continuidad con rutinas cortas y retos realistas.",
    href: "/entrenamiento",
    links: [
      ["Rutina en casa inicial", "/recursos/gratis/rutina-casa-inicial"],
      ["Reto de 7 días", "/herramientas-gratis#reto-7-dias"],
      ["Pausas activas", "/blog/pausas-activas-para-dias-sedentarios"]
    ]
  },
  {
    title: "Quiero mejorar mis hábitos",
    description: "Haz seguimiento diario sin cuenta, sin pagos y sin presión.",
    href: "/mi-bienestar",
    links: [
      ["Mi bienestar", "/mi-bienestar"],
      ["Checklist diario", "/herramientas-gratis#checklist-habitos"],
      ["Reto semanal", "/recursos/gratis/reto-semanal-energia"]
    ]
  },
  {
    title: "Quiero organizar mi semana",
    description: "Reduce decisiones con plantillas, planificación y recursos prácticos.",
    href: "/biblioteca-gratis",
    links: [
      ["Plantilla de menú semanal", "/recursos/gratis/plantilla-menu-semanal"],
      ["Planificar sin complicarte", "/blog/planificar-comidas-sin-complicarte"],
      ["Biblioteca gratis", "/biblioteca-gratis"]
    ]
  }
];

export default function EmpiezaAquiPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-white to-cream py-20">
        <div className="absolute inset-0 bg-dots opacity-70" aria-hidden="true" />
        <div className="page-shell relative">
          <p className="inline-flex rounded-full border border-leaf-200 bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-leaf-600">
            Empieza aquí
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight text-ink md:text-6xl">
            Elige una ruta sencilla y da el primer paso hoy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-leaf-900/65">
            No necesitas hacerlo todo a la vez. Escoge el área que más te importa ahora y empieza con recursos gratuitos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/mi-bienestar">Ir a Mi bienestar</Button>
            <Button href="/biblioteca-gratis" variant="secondary">
              Ver biblioteca gratis
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell grid gap-8">
          <OnboardingGuide />
          <SimpleRecommender />
        </div>
      </section>

      <section className="pb-16">
        <div className="page-shell">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Objetivos</p>
              <h2 className="mt-2 text-3xl font-black text-ink">Rutas completas por necesidad</h2>
            </div>
            <Button href="/objetivos/comer-mejor" variant="secondary" size="sm">
              Ver ejemplo
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {objectives.map((objective) => (
              <article key={objective.slug} className={`surface-card reveal-up overflow-hidden p-0`}>
                <div className={`h-2 bg-gradient-to-r ${objective.accent}`} />
                <div className="p-6">
                  <h3 className="text-2xl font-black text-ink">{objective.shortTitle}</h3>
                  <p className="mt-3 leading-7 text-leaf-900/62">{objective.audience}</p>
                  <Link
                    href={`/objetivos/${objective.slug}`}
                    className="focus-ring mt-5 inline-flex rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-leaf-700"
                  >
                    Ver ruta
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="page-shell grid gap-5 md:grid-cols-2">
          {paths.map((path) => (
            <article key={path.title} className="surface-card reveal-up p-6">
              <h2 className="text-2xl font-black text-ink">{path.title}</h2>
              <p className="mt-3 leading-7 text-leaf-900/62">{path.description}</p>
              <div className="mt-5 grid gap-2">
                {path.links.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="focus-ring rounded-2xl bg-mist px-4 py-3 text-sm font-bold text-ink transition hover:bg-leaf-50 hover:text-leaf-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
