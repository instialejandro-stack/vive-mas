import Image from "next/image";
import { Button } from "@/components/Button";

const stats = [
  { value: "4 áreas", label: "de bienestar" },
  { value: "100%", label: "contenido gratuito" },
  { value: "Pasos", label: "pequeños y reales" }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-cream to-white">
      {/* Fondos decorativos */}
      <div
        className="absolute inset-0 bg-dots opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-leaf-100/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-honey-light/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="page-shell relative grid min-h-[calc(100vh-4.5rem)] items-center gap-14 py-16 md:grid-cols-2 md:py-20">
        {/* Columna izquierda */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-leaf-200 bg-white px-4 py-2 text-sm font-semibold text-leaf-600 shadow-sm">
            <span
              className="h-2 w-2 rounded-full bg-leaf-500 animate-pulse"
              aria-hidden="true"
            />
            Bienestar sencillo y sostenible
          </div>

          <h1 className="font-serif text-5xl font-normal leading-[1.15] text-ink md:text-6xl lg:text-7xl">
            Construye una vida{" "}
            <span className="text-gradient">más saludable</span>,{" "}
            <span className="italic">paso a paso</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-leaf-900/65 md:text-xl">
            Encuentra ideas, hábitos, menús y planes de entrenamiento para mejorar
            tu bienestar físico y mental de forma sencilla.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/habitos-saludables" size="lg">
              Empieza ahora
            </Button>
            <Button href="/recursos" variant="secondary" size="lg">
              Explorar recursos
            </Button>
          </div>

          {/* Estadísticas */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-leaf-100 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-leaf-600">{stat.value}</p>
                <p className="mt-0.5 text-sm text-leaf-900/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — imagen + badges flotantes */}
        <div className="relative">
          {/* Badge flotante — Plan de hoy */}
          <div
            className="absolute -left-6 top-10 z-10 hidden animate-float md:block"
            aria-hidden="true"
          >
            <div className="rounded-2xl border border-leaf-100 bg-white p-4 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-wide text-leaf-600">
                Plan de hoy
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                Agua, paseo y cena ligera
              </p>
              <div className="mt-2 flex gap-1 text-lg">
                <span>💧</span>
                <span>🚶</span>
                <span>🥗</span>
              </div>
            </div>
          </div>

          {/* Badge flotante — Racha */}
          <div
            className="absolute -right-4 bottom-16 z-10 hidden animate-float-slow md:block"
            style={{ animationDelay: "1.5s" }}
            aria-hidden="true"
          >
            <div className="rounded-2xl bg-leaf-600 p-4 shadow-soft text-white">
              <p className="text-xs font-bold uppercase tracking-wide text-leaf-200">
                Nuevo hábito
              </p>
              <p className="mt-1 text-sm font-semibold">30 días seguidos</p>
              <p className="mt-1.5 text-xl">🔥</p>
            </div>
          </div>

          <Image
            src="/images/healthy-lifestyle-hero.png"
            alt="Composición de alimentos saludables, botella de agua y material de yoga en un entorno luminoso"
            width={900}
            height={700}
            priority
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
