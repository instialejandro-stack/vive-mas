import { Button } from "@/components/Button";
import { membershipFeatures } from "@/data/membership";

export function PremiumTeaser() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-leaf-900 via-leaf-800 to-leaf-950 py-28 text-white">
      {/* Decorativo */}
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-leaf-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#f4b860]/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="page-shell relative grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        {/* Texto */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#f4b860]/25 bg-[#f4b860]/10 px-4 py-2 text-sm font-bold text-[#f4b860]">
            ⭐ Próximamente premium
          </span>
          <h2 className="font-serif mt-5 text-4xl font-normal leading-tight md:text-5xl">
            Contenido exclusivo para avanzar con más acompañamiento.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            Guías, planes avanzados, recursos personalizados y contenido para
            suscriptores.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/premium" variant="secondary">
              Ver planes
            </Button>
            <Button
              href="/premium"
              variant="ghost"
              className="text-white/75 hover:bg-white/10 hover:text-white"
            >
              Saber más
            </Button>
          </div>
        </div>

        {/* Tarjetas de características */}
        <div className="grid gap-4">
          {membershipFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl bg-white/6 p-5 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:ring-white/15"
            >
              <h3 className="text-base font-bold">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-white/60">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
