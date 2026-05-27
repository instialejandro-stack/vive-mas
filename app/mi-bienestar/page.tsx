import type { Metadata } from "next";
import { LocalWellbeingDashboard } from "@/components/LocalWellbeingDashboard";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Mi bienestar",
  description:
    "Dashboard local de bienestar con progreso de hábitos, reto, registro diario y planificador."
};

export default function MiBienestarPage() {
  return (
    <>
      <section className="bg-dots bg-gradient-to-br from-leaf-50 to-cream py-20">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Panel local"
            title="Mi bienestar"
            description="Un resumen privado de lo que haces en Vive Mejor. Todo se guarda en tu navegador, sin registro y sin servicios externos."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <LocalWellbeingDashboard />
        </div>
      </section>
    </>
  );
}
