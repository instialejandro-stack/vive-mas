"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

const mainLinks = [
  { href: "/", label: "Inicio" },
  { href: "/mi-bienestar", label: "Mi bienestar" },
  { href: "/herramientas-gratis", label: "Herramientas gratis" },
  { href: "/biblioteca-gratis", label: "Biblioteca gratis" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" }
];

const exploreGroups = [
  {
    title: "Temas de bienestar",
    description: "Contenido por área para aprender y avanzar.",
    links: [
      { href: "/alimentacion", label: "Alimentación" },
      { href: "/habitos-saludables", label: "Hábitos saludables" },
      { href: "/entrenamiento", label: "Entrenamiento" }
    ]
  },
  {
    title: "Recursos y planes",
    description: "Materiales, plantillas y futuras rutas guiadas.",
    links: [
      { href: "/recursos", label: "Recursos" },
      { href: "/plantillas", label: "Plantillas" },
      { href: "/programas", label: "Programas" },
      { href: "/premium", label: "Premium" },
      { href: "/newsletter", label: "Newsletter" }
    ]
  }
];

function MenuIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <path d="M1 1H17M1 7H17M1 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const exploreActive = exploreGroups.some((group) =>
    group.links.some((item) => pathname === item.href)
  );

  const linkClass = (active: boolean) =>
    cn(
      "focus-ring relative rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150",
      active
        ? "bg-leaf-50 text-leaf-600 font-semibold"
        : "text-leaf-900/65 hover:bg-leaf-50/80 hover:text-leaf-700"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-leaf-100 bg-white/95 backdrop-blur-md">
      <div className="page-shell flex h-[4.5rem] items-center justify-between px-6">
        <Link
          href="/"
          className="focus-ring group flex items-center gap-2.5 rounded-xl"
          aria-label="Vive Más - Inicio"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-600 text-white text-sm font-black shadow-sm transition group-hover:bg-leaf-700">
            VM
          </span>
          <span className="text-lg font-black tracking-tight text-ink">Vive Más</span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 xl:flex">
          {mainLinks.slice(0, 5).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(active)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          <details className="group relative">
            <summary
              className={cn(
                "focus-ring flex cursor-pointer list-none items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors [&::-webkit-details-marker]:hidden",
                exploreActive
                  ? "bg-leaf-50 text-leaf-600 font-semibold"
                  : "text-leaf-900/65 hover:bg-leaf-50/80 hover:text-leaf-700"
              )}
            >
              Explorar
              <span className="transition group-open:rotate-180">
                <ChevronIcon />
              </span>
            </summary>

            <div className="absolute left-1/2 top-12 w-[560px] -translate-x-1/2 rounded-2xl border border-leaf-100 bg-white p-4 shadow-soft">
              <div className="grid gap-3 md:grid-cols-2">
                {exploreGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl bg-mist p-4">
                    <p className="text-sm font-black text-ink">{group.title}</p>
                    <p className="mt-1 text-xs leading-5 text-leaf-900/55">
                      {group.description}
                    </p>
                    <div className="mt-3 grid gap-1">
                      {group.links.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "focus-ring rounded-xl px-3 py-2 text-sm font-semibold transition",
                              active
                                ? "bg-white text-leaf-600"
                                : "text-leaf-900/70 hover:bg-white hover:text-leaf-700"
                            )}
                            aria-current={active ? "page" : undefined}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>

          {mainLinks.slice(5).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(active)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <Button href="/herramientas-gratis" size="md">
            Empezar gratis
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-leaf-100 bg-white text-ink transition hover:bg-leaf-50 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-leaf-100 bg-white/98 px-5 pb-5 pt-3 xl:hidden"
        >
          <div className="page-shell flex flex-col gap-2">
            {mainLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-ring rounded-xl px-4 py-3 text-base font-medium transition",
                    active
                      ? "bg-leaf-50 text-leaf-600 font-semibold"
                      : "text-leaf-900/70 hover:bg-leaf-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {exploreGroups.map((group) => (
              <section key={group.title} className="mt-3 rounded-2xl bg-mist p-3">
                <p className="px-2 text-xs font-black uppercase tracking-[0.12em] text-leaf-600">
                  {group.title}
                </p>
                <div className="mt-2 grid gap-1">
                  {group.links.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "focus-ring rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                          active
                            ? "bg-white text-leaf-600"
                            : "text-leaf-900/70 hover:bg-white"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}

            <div className="mt-3 border-t border-leaf-100 pt-3">
              <Button href="/herramientas-gratis" className="w-full" size="lg">
                Empezar gratis
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
