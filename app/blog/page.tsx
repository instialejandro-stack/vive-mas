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
      <section className="bg-dots bg-gradient-to-br from-leaf-50 to-cream py-20">
        <div className="page-shell">
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
