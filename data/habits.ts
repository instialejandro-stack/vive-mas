export type Habit = {
  id: string;
  title: string;
  description: string;
  cadence: "diario" | "semanal";
};

export const habits: Habit[] = [
  {
    id: "agua-manana",
    title: "Empieza con agua",
    description: "Un vaso de agua al levantarte ayuda a iniciar el día con intención.",
    cadence: "diario"
  },
  {
    id: "pausa-activa",
    title: "Pausa activa",
    description: "Cinco minutos de movimiento suave entre bloques de trabajo.",
    cadence: "diario"
  }
];
