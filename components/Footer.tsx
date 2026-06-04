import Link from "next/link";

const quickLinks = [
  ["Inicio", "/"],
  ["Mi bienestar", "/mi-bienestar"],
  ["Herramientas gratis", "/herramientas-gratis"],
  ["Biblioteca gratis", "/biblioteca-gratis"],
  ["Buscar", "/buscar"],
  ["Favoritos", "/favoritos"],
  ["Objetivos", "/objetivos/comer-mejor"],
  ["Plantillas", "/plantillas"],
  ["Blog", "/blog"],
  ["Programas", "/programas"],
  ["Newsletter", "/newsletter"],
  ["Contacto", "/contacto"]
] as const;

const legalLinks = [
  ["Política de privacidad", "/privacidad"],
  ["Aviso legal", "/aviso-legal"],
  ["Cookies", "/cookies"]
] as const;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.57A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socialLinks = [
  { Icon: InstagramIcon, label: "Vive Más en Instagram" },
  { Icon: YoutubeIcon, label: "Vive Más en YouTube" },
  { Icon: LinkedInIcon, label: "Vive Más en LinkedIn" }
];

export function Footer() {
  return (
    <footer className="bg-ink pb-24 text-white md:pb-0">
      <div className="page-shell grid gap-12 py-16 sm:grid-cols-2 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2.5 rounded-xl"
            aria-label="Vive Más - Inicio"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-500 text-sm font-black text-white">
              VM
            </span>
            <p className="text-xl font-black tracking-tight">Vive Más</p>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
            Contenido cercano y práctico para mejorar tu bienestar con hábitos,
            alimentación y movimiento sostenible.
          </p>
          <div className="mt-6 flex gap-2">
            {socialLinks.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-white/60 transition hover:bg-leaf-500 hover:text-white"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-white/35">
            Navegar
          </h2>
          <ul className="mt-5 space-y-3">
            {quickLinks.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="focus-ring rounded-md text-sm text-white/60 transition hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-white/35">
            Legal
          </h2>
          <ul className="mt-5 space-y-3">
            {legalLinks.map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="focus-ring rounded-md text-sm text-white/60 transition hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-white/35">
            Newsletter
          </h2>
          <p className="mt-5 text-sm leading-6 text-white/55">
            Recibe recursos y hábitos útiles directo en tu bandeja de entrada.
          </p>
          <Link
            href="/newsletter"
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-xl bg-leaf-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-leaf-400"
          >
            Unirme gratis
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8H13M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/8 px-6 py-5">
        <div className="page-shell flex flex-col items-center justify-between gap-2 text-center text-xs text-white/35 sm:flex-row">
          <p>© 2026 Vive Más. Todos los derechos reservados.</p>
          <p>Hecho para ayudarte a avanzar paso a paso.</p>
        </div>
      </div>
    </footer>
  );
}
