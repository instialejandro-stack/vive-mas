import type { Metadata } from "next";
import { GlobalSearch } from "@/components/GlobalSearch";
import { getContentIndex } from "@/lib/contentIndex";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Buscador global de artículos, recursos, herramientas, plantillas y rutas de Vive Más."
};

export default function BuscarPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-white to-cream py-20">
        <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
        <div className="page-shell relative">
          <p className="inline-flex rounded-full border border-leaf-200 bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-leaf-600">
            Buscar
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight text-ink md:text-6xl">
            Encuentra rápido lo que necesitas
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-leaf-900/65">
            Busca artículos, recursos, herramientas, plantillas y rutas desde un único sitio.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <GlobalSearch items={getContentIndex()} />
        </div>
      </section>
    </main>
  );
}
