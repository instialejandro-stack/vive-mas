import type { Metadata } from "next";
import { PersonalLibrary } from "@/components/PersonalLibrary";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Favoritos y contenidos vistos recientemente guardados en tu navegador."
};

export default function FavoritosPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-white to-cream py-20">
        <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
        <div className="page-shell relative">
          <p className="inline-flex rounded-full border border-leaf-200 bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-leaf-600">
            Tu biblioteca
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight text-ink md:text-6xl">
            Favoritos y vistos recientemente
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-leaf-900/65">
            Todo se guarda solo en tu navegador. No necesitas cuenta ni conexión con servicios externos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <PersonalLibrary />
        </div>
      </section>
    </main>
  );
}
