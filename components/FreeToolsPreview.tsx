import { Button } from "@/components/Button";
import { FreeToolCard } from "@/components/FreeToolCard";
import { SectionTitle } from "@/components/SectionTitle";
import { freeTools } from "@/data/freeTools";

export function FreeToolsPreview() {
  return (
    <section className="bg-gradient-to-br from-mist to-leaf-50/40 py-24">
      <div className="page-shell">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <SectionTitle
            align="left"
            eyebrow="Herramientas gratis"
            title="Utilidades sencillas para cuidarte sin pagar"
            description="Funciones prácticas que viven en tu navegador: sin APIs externas, sin registro y sin coste para ti ni para Vive Mejor."
          />
          <div className="md:text-right">
            <Button href="/herramientas-gratis" size="lg">
              Ver herramientas gratis
            </Button>
          </div>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {freeTools.slice(0, 6).map((tool) => (
            <FreeToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
