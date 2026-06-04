"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "Inicio",
    icon: (
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z" />
    )
  },
  {
    href: "/mi-bienestar",
    label: "Bienestar",
    icon: <path d="M12 21s-7-4.4-9.2-9.1C1.3 8.7 3.1 5 6.5 5c2 0 3.4 1.1 4.2 2.3C11.5 6.1 13 5 15 5c3.4 0 5.2 3.7 3.7 6.9C16.6 16.6 12 21 12 21Z" />
  },
  {
    href: "/herramientas-gratis",
    label: "Tools",
    icon: <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.8 2.8-2-2 2.8-2.8Z" />
  },
  {
    href: "/buscar",
    label: "Buscar",
    icon: <path d="M10.8 18.1a7.3 7.3 0 1 1 0-14.6 7.3 7.3 0 0 1 0 14.6ZM16.1 16.1 21 21" />
  },
  {
    href: "/favoritos",
    label: "Guardado",
    icon: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  }
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegacion movil rapida"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-leaf-100 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_30px_rgba(21,87,62,0.12)] backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "focus-ring flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[0.68rem] font-black transition",
                active
                  ? "bg-leaf-50 text-leaf-700"
                  : "text-leaf-900/55 hover:bg-mist hover:text-leaf-700"
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
