import { Button } from "@/components/Button";
import { ResourceVisual } from "@/components/ResourceVisual";
import { Resource } from "@/data/resources";

const categoryStyles: Record<string, string> = {
  Alimentación: "bg-[#fde9e4] text-[#934230]",
  Hábitos: "bg-leaf-50 text-leaf-700",
  Entrenamiento: "bg-honey-light text-honey-dark",
  Planificación: "bg-sky-light text-sky-dark"
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const categoryClass = categoryStyles[resource.category] ?? "bg-mist text-leaf-700";

  return (
    <article className="surface-card reveal-up group flex min-h-full flex-col overflow-hidden p-3">
      <ResourceVisual visual={resource.visual} title={resource.title} />

      <div className="flex flex-1 flex-col p-3">
        <div className="flex flex-wrap gap-2">
          {resource.featured ? (
            <span className="rounded-full bg-leaf-600 px-3 py-1 text-xs font-bold text-white">
              Destacado
            </span>
          ) : null}
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryClass}`}>
            {resource.category}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-ink">{resource.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-7 text-leaf-900/60">{resource.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-bold text-leaf-900/55">
            {resource.format}
          </span>
          <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-bold text-leaf-900/55">
            {resource.level}
          </span>
          <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-bold text-leaf-900/55">
            {resource.estimatedTime}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {resource.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-leaf-900/55 ring-1 ring-leaf-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button href={resource.href} variant="secondary" size="sm">
            Ver por dentro
          </Button>
          {resource.relatedToolHref ? (
            <Button href={resource.relatedToolHref} size="sm">
              Usar herramienta
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
