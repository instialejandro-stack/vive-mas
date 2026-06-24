import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con Vive Más para consultas, colaboraciones o sugerencias."
};

const contactInfo = [
  {
    icon: "💬",
    title: "Consultas generales",
    description: "Para dudas sobre el contenido y los recursos disponibles."
  },
  {
    icon: "🤝",
    title: "Colaboraciones",
    description: "Si quieres colaborar con artículos, programas o proyectos conjuntos."
  },
  {
    icon: "💡",
    title: "Sugerencias",
    description: "Tus ideas son bienvenidas para mejorar la plataforma."
  }
];

export default function ContactoPage() {
  return (
    <>
      {/* Hero de página */}
      <div
        className="relative overflow-hidden bg-cover bg-center py-20"
        style={{ backgroundImage: "url('/images/healthy-lifestyle-hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/62" aria-hidden="true" />
        <div className="absolute inset-0 bg-leaf-50/35" aria-hidden="true" />
        <div
          className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-leaf-100/50 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="page-shell relative">
          <SectionTitle
            align="left"
            eyebrow="Contacto"
            title="Hablemos de bienestar sencillo"
            description="Esta primera versión deja preparado el espacio de contacto. Más adelante puede conectarse a un formulario real o a una herramienta de email."
          />
        </div>
      </div>

      {/* Contenido */}
      <section className="py-16">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Info cards */}
          <div className="space-y-4">
            {contactInfo.map(({ icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-leaf-100 bg-white p-5 shadow-card"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-2xl"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <div>
                  <h3 className="font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-leaf-900/60">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <form
            className="rounded-3xl border border-leaf-100 bg-white p-8 shadow-soft"
            noValidate
            aria-describedby="contact-form-note"
          >
            <h2 className="text-xl font-bold text-ink">Envíanos un mensaje</h2>
            <p className="mt-1 text-sm text-leaf-900/55">
              Te responderemos lo antes posible.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-ink" htmlFor="name">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="focus-ring mt-2 w-full rounded-xl border border-leaf-200 bg-leaf-50/40 px-4 py-3 text-sm text-ink placeholder:text-leaf-900/35 transition hover:border-leaf-300 focus:bg-white"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink" htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="focus-ring mt-2 w-full rounded-xl border border-leaf-200 bg-leaf-50/40 px-4 py-3 text-sm text-ink placeholder:text-leaf-900/35 transition hover:border-leaf-300 focus:bg-white"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink" htmlFor="message">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="focus-ring mt-2 w-full resize-none rounded-xl border border-leaf-200 bg-leaf-50/40 px-4 py-3 text-sm text-ink placeholder:text-leaf-900/35 transition hover:border-leaf-300 focus:bg-white"
                  placeholder="Cuéntanos en qué podemos ayudarte"
                />
              </div>
            </div>

            <Button type="button" className="mt-6 w-full" size="lg">
              Enviar mensaje
            </Button>

            <p id="contact-form-note" className="mt-4 text-center text-xs text-leaf-900/50">
              Formulario visual preparado para conectar con una herramienta de email en una fase posterior.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
