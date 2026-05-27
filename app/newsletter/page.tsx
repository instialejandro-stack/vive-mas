import type { Metadata } from "next";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Newsletter de Vive Más con recursos, ideas y retos saludables."
};

export default function NewsletterPage() {
  return (
    <>
      <section className="bg-mist py-20">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Newsletter"
            title="Recibe ideas saludables sin ruido"
            description="Esta ruta queda preparada para conectar en el futuro un proveedor de email marketing. Por ahora es una experiencia visual."
          />
        </div>
      </section>
      <NewsletterSection />
    </>
  );
}
