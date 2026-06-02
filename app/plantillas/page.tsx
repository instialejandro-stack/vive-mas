import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { TemplateLibrary } from "@/components/TemplateLibrary";
import { templates } from "@/data/templates";

export const metadata: Metadata = {
  title: "Plantillas",
  description:
    "Plantillas gratuitas y futuras plantillas de nutrición, hábitos y planificación saludable."
};

export default function PlantillasPage() {
  return (
    <>
      <section className="bg-dots bg-gradient-to-br from-leaf-50 to-cream py-20">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Plantillas"
            title="Recursos prácticos para organizar tu bienestar"
            description="Primero construiremos una base de plantillas gratuitas. Más adelante esta sección puede separar recursos gratis, demos y packs avanzados."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <TemplateLibrary templates={templates} />

          <div className="mt-12 rounded-2xl border border-leaf-100 bg-mist p-6 md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <h2 className="text-2xl font-bold text-ink">También puedes usar las herramientas gratis</h2>
              <p className="mt-3 max-w-2xl leading-7 text-leaf-900/65">
                Si prefieres algo interactivo, prueba las calculadoras, checklist,
                reto y planificador semanal sin descargar nada.
              </p>
            </div>
            <Button href="/herramientas-gratis" className="mt-6 md:mt-0">
              Ver herramientas
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
