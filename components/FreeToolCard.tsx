import Image from "next/image";
import { Button } from "@/components/Button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { FreeTool } from "@/data/freeTools";

export function FreeToolCard({ tool }: { tool: FreeTool }) {
  return (
    <article className="surface-card reveal-up group flex min-h-full flex-col overflow-hidden p-3">
      <div className="relative h-44 overflow-hidden rounded-2xl bg-mist">
        <Image
          src={tool.image}
          alt={tool.imageAlt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-leaf-600">
          Gratis
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <FavoriteButton
          compact
          item={{
            id: `tool-${tool.id}`,
            title: tool.title,
            description: tool.description,
            href: tool.href,
            type: "Herramienta",
            category: tool.category,
            tags: [tool.category.toLowerCase()]
          }}
        />
        <h3 className="mt-2 text-xl font-bold text-ink">{tool.title}</h3>
        <p className="mt-3 flex-1 leading-7 text-leaf-900/65">{tool.description}</p>
        <Button href={tool.href} variant="secondary" className="mt-6">
          Usar herramienta
        </Button>
      </div>
    </article>
  );
}
