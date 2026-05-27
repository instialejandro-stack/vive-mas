export type WorkoutPlan = {
  id: string;
  title: string;
  level: "Inicial" | "Intermedio" | "Avanzado";
  duration: string;
  focus: string;
};

export const workouts: WorkoutPlan[] = [
  {
    id: "movilidad-inicial",
    title: "Movilidad para empezar",
    level: "Inicial",
    duration: "15 min",
    focus: "Activar el cuerpo con ejercicios suaves"
  }
];
