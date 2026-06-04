import { Button } from "@/components/Button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Template } from "@/data/templates";

export function TemplateCard({ template }: { template: Template }) {
  const isAvailable = template.status === "Gratis";

  return (
    <article className="surface-card reveal-up p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-leaf-600">
          {template.category}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
          isAvailable ? "bg-mist text-leaf-900" : "bg-honey-light text-honey-dark"
        }`}>
          {template.status}
        </span>
      </div>
      <div className="mt-3">
        <FavoriteButton
          compact
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
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink">{template.title}</h3>
      <p className="mt-3 leading-7 text-leaf-900/65">{template.description}</p>
      <ul className="mt-5 space-y-2 text-sm font-semibold text-leaf-900/65">
        {template.includes.map((item) => (
          <li key={item}>+ {item}</li>
        ))}
      </ul>
      <Button
        href={`/plantillas/${template.slug}`}
        variant={isAvailable ? "primary" : "secondary"}
        className="mt-6"
      >
        {isAvailable ? "Ver plantilla" : "Ver avance"}
      </Button>
    </article>
  );
}
