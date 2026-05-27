import type { Metadata } from "next";
import { BlogSearch } from "@/components/BlogSearch";
import { SectionTitle } from "@/components/SectionTitle";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos locales sobre hábitos saludables, alimentación, entrenamiento y bienestar."
};

export default function BlogPage() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-cover bg-center py-20"
        style={{ backgroundImage: "url('/images/healthy-lifestyle-hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-leaf-50/30" aria-hidden="true" />
        <div className="page-shell relative">
          <SectionTitle
            eyebrow="Blog"
            title="Ideas sencillas para cuidarte mejor"
            description="Contenido local preparado para crecer sin CMS ni servicios externos. Cada artículo vive en los datos del proyecto."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <BlogSearch articles={articles} />
        </div>
      </section>
    </>
  );
}
