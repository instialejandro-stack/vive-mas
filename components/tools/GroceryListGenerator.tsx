"use client";

import { useMemo, useState } from "react";
import { ToolSection } from "@/components/tools/ToolSection";

const groups = [
  {
    id: "verduras",
    label: "Verduras",
    items: ["Espinacas", "Brocoli", "Zanahoria", "Pimiento", "Calabacin"]
  },
  {
    id: "proteinas",
    label: "Proteínas",
    items: ["Huevos", "Pollo", "Lentejas", "Garbanzos", "Tofu"]
  },
  {
    id: "hidratos",
    label: "Hidratos",
    items: ["Arroz integral", "Avena", "Patata", "Pasta integral", "Pan integral"]
  },
  {
    id: "grasas",
    label: "Grasas saludables",
    items: ["Aceite de oliva", "Aguacate", "Nueces", "Semillas", "Tahini"]
  },
  {
    id: "extras",
    label: "Extras utiles",
    items: ["Yogur natural", "Fruta de temporada", "Limon", "Especias", "Infusiones"]
  }
];

export function GroceryListGenerator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    verduras: true,
    proteinas: true,
    hidratos: true
  });

  const list = useMemo(
    () => groups.filter((group) => selected[group.id]).flatMap((group) => group.items),
    [selected]
  );

  return (
    <ToolSection id="lista-compra" image="/images/resources/lista-compra-basica.jpg">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="rounded-full bg-sky-light px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-sky-dark">
            Generador local
          </span>
          <h2 className="mt-4 text-2xl font-bold text-ink">Generador de lista de compra saludable</h2>
          <p className="mt-3 leading-7 text-leaf-900/65">
            Elige categorías y crea una lista base para organizar tu compra. No
            usa IA ni servicios externos.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {groups.map((group) => (
              <label
                key={group.id}
                className="interactive-lift flex cursor-pointer items-center gap-3 rounded-2xl border border-leaf-100 bg-mist p-4 transition hover:border-leaf-300"
              >
                <input
                  type="checkbox"
                  checked={Boolean(selected[group.id])}
                  onChange={(event) =>
                    setSelected((current) => ({ ...current, [group.id]: event.target.checked }))
                  }
                  className="h-5 w-5 accent-leaf-600"
                />
                <span className="text-sm font-bold text-ink">{group.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-mist p-5">
          <h3 className="text-lg font-bold text-ink">Lista sugerida</h3>
          {list.length > 0 ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {list.map((item) => (
                <li key={item} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-leaf-900/70">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-leaf-900/60">
              Selecciona al menos una categoría para generar la lista.
            </p>
          )}
        </div>
      </div>
    </ToolSection>
  );
}
