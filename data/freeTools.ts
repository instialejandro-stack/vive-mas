export type FreeTool = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const freeTools: FreeTool[] = [
  {
    id: "calculadora-agua",
    title: "Calculadora de agua",
    description: "Calcula una referencia diaria sencilla según tu peso y actividad.",
    href: "/herramientas-gratis#calculadora-agua",
    image: "/images/resources/checklist-habitos-diarios.jpg",
    imageAlt: "Vaso de agua junto a una lista de hábitos"
  },
  {
    id: "checklist-habitos",
    title: "Checklist diaria",
    description: "Marca hábitos básicos de bienestar y reinicia cada día cuando quieras.",
    href: "/herramientas-gratis#checklist-habitos",
    image: "/images/resources/checklist-habitos-diarios.jpg",
    imageAlt: "Checklist de bienestar sobre un portapapeles"
  },
  {
    id: "harris-benedict",
    title: "Harris-Benedict",
    description: "Estima metabolismo basal y calorías de mantenimiento de forma orientativa.",
    href: "/herramientas-gratis#harris-benedict",
    image: "/images/resources/guia-compra-saludable.jpg",
    imageAlt: "Compra saludable con verduras frescas"
  },
  {
    id: "reto-7-dias",
    title: "Reto de 7 días",
    description: "Sigue un reto gratuito de pequeñas acciones saludables durante una semana.",
    href: "/herramientas-gratis#reto-7-dias",
    image: "/images/resources/reto-semanal-energia.jpg",
    imageAlt: "Cuaderno de seguimiento semanal de bienestar"
  },
  {
    id: "planificador-comidas",
    title: "Planificador semanal",
    description: "Organiza comidas de la semana y guarda el borrador en tu navegador.",
    href: "/herramientas-gratis#planificador-comidas",
    image: "/images/resources/plantilla-menu-semanal.jpg",
    imageAlt: "Planificador semanal de comidas con ingredientes frescos"
  },
  {
    id: "registro-bienestar",
    title: "Registro de bienestar",
    description: "Guarda energía, sueño, ánimo y movimiento de forma local.",
    href: "/herramientas-gratis#registro-bienestar",
    image: "/images/resources/reto-semanal-energia.jpg",
    imageAlt: "Cuaderno visual para seguimiento de bienestar"
  },
  {
    id: "lista-compra",
    title: "Lista de compra",
    description: "Genera una lista saludable según las categorías que quieras incluir.",
    href: "/herramientas-gratis#lista-compra",
    image: "/images/resources/lista-compra-basica.jpg",
    imageAlt: "Lista de compra junto a frutas y verduras"
  }
];
