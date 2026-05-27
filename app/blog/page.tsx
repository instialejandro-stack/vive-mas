import type { Metadata } from "next";
import Image from "next/image";
import { BlogSearch } from "@/components/BlogSearch";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos locales sobre hábitos saludables, alimentación, entrenamiento y bienestar."
};

export default function BlogPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-white to-cream py-20">
        <div className="absolute inset-0 bg-dots opacity-70" aria-hidden="true" />
        <div className="page-shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-leaf-200 bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-leaf-600">
              Blog
            </p>
            <h1 className="mt-5 text-balance font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">
              Ideas sencillas para cuidarte mejor
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-leaf-900/65 md:text-lg">
              Contenido local preparado para crecer sin CMS ni servicios externos. Cada artículo vive en los datos del proyecto.
            </p>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] border border-leaf-100 bg-white shadow-soft md:min-h-[340px]">
            <Image
              src="/images/resources/guia-compra-saludable.jpg"
              alt="Verduras frescas y tomates para acompañar artículos sobre alimentación saludable"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-leaf-900/18 via-transparent to-white/12" aria-hidden="true" />
          </div>
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
