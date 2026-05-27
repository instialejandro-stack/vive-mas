import type { Metadata } from "next";
import { ProgramCard } from "@/components/ProgramCard";
import { SectionTitle } from "@/components/SectionTitle";
import { programs } from "@/data/programs";

export const metadata: Metadata = {
  title: "Programas",
  description: "Programas futuros de hábitos, entrenamiento y alimentación saludable."
};

export default function ProgramasPage() {
  return (
    <section className="py-20">
      <div className="page-shell">
        <SectionTitle
          eyebrow="Programas"
          title="Rutas futuras para avanzar con estructura"
          description="Estos programas son placeholders visuales preparados para evolucionar hacia contenido gratuito, premium o personalizado."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
