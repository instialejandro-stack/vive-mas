import { Button } from "@/components/Button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-leaf-800 via-leaf-900 to-leaf-950 py-28 text-white">
      {/* Formas decorativas */}
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-leaf-500/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-leaf-400/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative page-shell flex flex-col items-center gap-8 px-6 text-center">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white/85 backdrop-blur-sm">
          <span
            className="h-2 w-2 rounded-full bg-honey animate-pulse"
            aria-hidden="true"
          />
          Empieza con calma
        </span>

        <h2 className="font-serif max-w-3xl text-4xl font-normal leading-tight md:text-5xl lg:text-6xl">
          Pequeños pasos diarios pueden cambiar cómo te sientes.
        </h2>

        <p className="max-w-xl text-lg leading-8 text-white/65">
          Explora recursos sencillos para comer mejor, moverte más y construir
          hábitos que puedas sostener.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/recursos" variant="secondary" size="lg">
            Explorar recursos
          </Button>
          <Button
            href="/habitos-saludables"
            variant="ghost"
            size="lg"
            className="text-white/85 hover:bg-white/10 hover:text-white"
          >
            Ver hábitos
          </Button>
        </div>
      </div>
    </section>
  );
}
