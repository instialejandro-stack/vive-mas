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
      <section className="bg-dots bg-gradient-to-br from-leaf-50 to-cream py-20">
        <div className="page-shell">
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
