import type { Metadata } from "next";
import { FreeLibrary } from "@/components/FreeLibrary";
import { SectionTitle } from "@/components/SectionTitle";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Biblioteca gratis",
  description:
    "Biblioteca gratuita con guías, plantillas, checklists y retos filtrables."
};

export default function BibliotecaGratisPage() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-white to-cream py-20"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 48%, rgba(247,245,236,0.42) 100%), url('/images/resources/plantilla-menu-semanal.jpg')",
          backgroundPosition: "center, right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover, min(560px, 72vw) auto"
        }}
      >
        <div className="absolute inset-0 bg-dots opacity-55" aria-hidden="true" />
        <div className="page-shell relative">
          <SectionTitle
            eyebrow="Biblioteca gratis"
            title="Recursos gratuitos organizados por tema"
            description="Encuentra guías, plantillas, checklists y retos gratuitos para avanzar sin cuentas, pagos ni servicios externos."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <FreeLibrary resources={resources} />
        </div>
      </section>
    </>
  );
}
