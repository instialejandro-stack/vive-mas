import { Button } from "@/components/Button";
import { newsletter } from "@/data/newsletter";

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-mist to-white py-24">
      {/* Decorativo */}
      <div
        className="absolute -right-16 top-0 h-80 w-80 rounded-full bg-[#fff2d6]/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="page-shell relative grid gap-14 md:grid-cols-2 md:items-center">
        {/* Texto */}
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-leaf-600">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" aria-hidden="true" />
            Newsletter
          </span>
          <h2 className="font-serif mt-4 text-4xl font-normal leading-tight text-ink md:text-5xl">
            {newsletter.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-leaf-900/60">
            {newsletter.description}
          </p>
          <ul className="mt-8 space-y-3">
            {newsletter.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-xs font-black text-leaf-600">
                  ✓
                </span>
                <span className="text-sm font-medium text-leaf-900/70">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulario */}
        <div className="rounded-3xl border border-leaf-100 bg-white p-8 shadow-soft">
          <p className="text-xl font-bold text-ink">Únete a la comunidad</p>
          <p className="mt-1 text-sm text-leaf-900/55">
            Sin spam. Solo contenido útil. Gratis para siempre.
          </p>

          <form className="mt-7 space-y-4" noValidate>
            <div>
              <label className="block text-sm font-semibold text-ink" htmlFor="newsletter-name">
                Nombre
              </label>
              <input
                id="newsletter-name"
                name="name"
                type="text"
                autoComplete="given-name"
                className="focus-ring mt-2 w-full rounded-xl border border-leaf-200 bg-leaf-50/40 px-4 py-3 text-sm text-ink placeholder:text-leaf-900/35 transition hover:border-leaf-300 focus:bg-white"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink" htmlFor="newsletter-email">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                className="focus-ring mt-2 w-full rounded-xl border border-leaf-200 bg-leaf-50/40 px-4 py-3 text-sm text-ink placeholder:text-leaf-900/35 transition hover:border-leaf-300 focus:bg-white"
                placeholder="tu@email.com"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Unirme gratis
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-leaf-900/40">
            Formulario preparado para conectar con tu herramienta de email favorita.
          </p>
        </div>
      </div>
    </section>
  );
}
