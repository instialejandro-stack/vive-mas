export type HealthyMenu = {
  id: string;
  title: string;
  description: string;
  meals: string[];
};

// Future content can come from a CMS or database without changing the UI layer.
export const menus: HealthyMenu[] = [
  {
    id: "menu-equilibrado",
    title: "Menu equilibrado semanal",
    description: "Una base sencilla para organizar comidas variadas durante la semana.",
    meals: ["Desayunos completos", "Comidas con verduras", "Cenas ligeras"]
  }
];
