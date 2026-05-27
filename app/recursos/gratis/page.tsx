import type { Metadata } from "next";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Recursos gratis",
  description: "Descargas gratuitas y recursos visuales preparados para Vive Más."
};

export default function RecursosGratisPage() {
  return (
    <section className="py-20">
      <div className="page-shell">
        <SectionTitle
          eyebrow="Recursos gratis"
          title="Descargables para dar el primer paso"
          description="Aquí vivirán las guías, plantillas y retos gratuitos. Los botones son placeholders listos para conectar descargas reales más adelante."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
