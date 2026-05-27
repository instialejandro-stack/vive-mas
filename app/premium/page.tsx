import type { Metadata } from "next";
import { MembershipPreview } from "@/components/MembershipPreview";
import { PremiumTeaser } from "@/components/PremiumTeaser";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "Próxima área premium de Vive Más con contenido exclusivo, guías descargables y planes avanzados."
};

export default function PremiumPage() {
  return (
    <>
      <section className="bg-mist py-20">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Premium"
            title="Un espacio exclusivo, pensado con calma"
            description="Próximamente Vive Más podrá incorporar contenido exclusivo para suscriptores, guías descargables, planes avanzados y recursos personalizados. Todavía no hay pagos, login ni suscripciones reales."
          />
        </div>
      </section>
      <PremiumTeaser />
      <MembershipPreview />
    </>
  );
}
