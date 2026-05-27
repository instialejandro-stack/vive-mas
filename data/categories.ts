export type Category = {
  title: string;
  description: string;
  href: string;
  accent: "leaf" | "coral" | "honey" | "sky";
};

export const categories: Category[] = [
  {
    title: "Alimentación",
    description: "Ideas de menús, recetas y pautas fáciles de llevar al día a día.",
    href: "/alimentacion",
    accent: "leaf"
  },
  {
    title: "Hábitos saludables",
    description: "Rutinas pequeñas para dormir mejor, moverte más y cuidar tu energía.",
    href: "/habitos-saludables",
    accent: "honey"
  },
  {
    title: "Entrenamiento",
    description: "Planes adaptables para ganar fuerza, movilidad y constancia.",
    href: "/entrenamiento",
    accent: "coral"
  },
  {
    title: "Recursos",
    description: "Guías, retos semanales y descargables para avanzar con claridad.",
    href: "/recursos",
    accent: "sky"
  }
];
