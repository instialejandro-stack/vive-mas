export type Program = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Inicial" | "Todos los niveles";
  status: "próximamente";
};

export const programs: Program[] = [
  {
    id: "empezar-desde-cero",
    title: "Programa para empezar desde cero",
    description: "Una ruta amable para recuperar energía, movimiento y confianza paso a paso.",
    duration: "4 semanas",
    level: "Inicial",
    status: "próximamente"
  },
  {
    id: "habitos-21-dias",
    title: "Hábitos saludables de 21 días",
    description: "Un acompasamiento progresivo para instalar rutinas pequeñas y sostenibles.",
    duration: "21 días",
    level: "Todos los niveles",
    status: "próximamente"
  },
  {
    id: "entrenamiento-casa",
    title: "Entrenamiento en casa",
    description: "Sesiones simples para fuerza, movilidad y constancia con poco material.",
    duration: "6 semanas",
    level: "Inicial",
    status: "próximamente"
  },
  {
    id: "alimentacion-equilibrada",
    title: "Alimentación equilibrada",
    description: "Planificación semanal, ideas de menús y recursos para comer con más calma.",
    duration: "4 semanas",
    level: "Todos los niveles",
    status: "próximamente"
  }
];
