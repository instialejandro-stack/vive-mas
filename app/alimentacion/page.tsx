import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { menus } from "@/data/menus";

export const metadata: Metadata = {
  title: "Alimentación",
  description: "Ideas de menús saludables, recetas y alimentación equilibrada."
};

const mealIcons: Record<string, string> = {
  "Desayunos completos": "☀️",
  "Comidas con verduras": "🥦",
  "Cenas ligeras": "🌙"
};

export default function AlimentacionPage() {
  return (
    <>
      {/* Hero de página */}
      <div className="relative overflow-hidden bg-gradient-to-br from-leaf-50 to-cream py-20">
        <div
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-leaf-100/60 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="page-shell relative">
          <SectionTitle
            eyebrow="Alimentación"
            title="Come mejor sin complicarte"
            description="Aquí crecerán los menús saludables, recetas y guías de compra para organizar tu semana con facilidad."
          />
        </div>
      </div>

      {/* Contenido */}
      <section className="py-16">
        <div className="page-shell">
          <div className="grid gap-6 md:grid-cols-3">
            {menus.map((menu) => (
              <article
                key={menu.id}
                className="overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-card"
              >
                {/* Cabecera coloreada */}
                <div className="bg-gradient-to-r from-leaf-500 to-leaf-600 px-6 py-5">
                  <span className="text-3xl" aria-hidden="true">🥗</span>
                  <h2 className="mt-2 text-lg font-bold text-white">{menu.title}</h2>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-7 text-leaf-900/60">{menu.description}</p>
                  <ul className="mt-5 space-y-3">
                    {menu.meals.map((meal) => (
                      <li
                        key={meal}
                        className="flex items-center gap-3 rounded-xl bg-leaf-50 px-4 py-3 text-sm font-medium text-leaf-900/75"
                      >
                        <span aria-hidden="true">
                          {mealIcons[meal] ?? "🍽️"}
                        </span>
                        {meal}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Estado vacío / placeholder */}
          {menus.length < 3 && (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 - menus.length }).map((_, i) => (
                <div
                  key={i}
                  className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/30 px-6 py-12 text-center"
                >
                  <span className="text-4xl" aria-hidden="true">🌱</span>
                  <p className="mt-4 text-sm font-semibold text-leaf-600">
                    Próximamente más menús
                  </p>
                  <p className="mt-1 text-xs text-leaf-900/45">
                    Nuevas recetas en camino
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
