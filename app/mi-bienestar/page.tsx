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
      <section
        className="relative overflow-hidden bg-cover bg-center py-20"
        style={{ backgroundImage: "url('/images/healthy-lifestyle-hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-leaf-50/62" aria-hidden="true" />
        <div className="absolute inset-0 bg-dots opacity-45" aria-hidden="true" />
        <div className="page-shell relative">
          <SectionTitle
            eyebrow="Panel local"
            title="Mi bienestar"
            description="Un resumen privado de lo que haces en Vive Más. Todo se guarda en tu navegador, sin registro y sin servicios externos."
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
