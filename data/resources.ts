export type ResourceVisual = {
  src: string;
  alt: string;
};

export type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  format: "Guía" | "Checklist" | "Plantilla" | "Reto";
  access: "gratis" | "premium";
  category: "Alimentación" | "Hábitos" | "Entrenamiento" | "Planificación";
  tags: string[];
  estimatedTime: string;
  level: "Inicial" | "Fácil" | "Intermedio";
  featured?: boolean;
  downloadUrl?: string;
  href: string;
  relatedToolHref?: string;
  visual: ResourceVisual;
  inside: string[];
};

export const resources: Resource[] = [
  {
    id: "checklist-habitos",
    slug: "checklist-habitos-diarios",
    title: "Checklist de hábitos diarios",
    description: "Una plantilla sencilla para revisar agua, movimiento, descanso y pausas.",
    format: "Checklist",
    access: "gratis",
    category: "Hábitos",
    tags: ["hábitos", "seguimiento", "diario"],
    estimatedTime: "5 min",
    level: "Inicial",
    featured: true,
    href: "/recursos/gratis/checklist-habitos-diarios",
    relatedToolHref: "/herramientas-gratis#checklist-habitos",
    visual: {
      src: "/images/resources/checklist-habitos-diarios.jpg",
      alt: "Portapapeles con checklist de hábitos, vaso de agua y plantas"
    },
    inside: [
      "Lista diaria de acciones básicas de bienestar.",
      "Espacio para marcar avances sin presión.",
      "Ideal para acompañar el panel Mi Bienestar."
    ]
  },
  {
    id: "guia-compra-saludable",
    slug: "guia-compra-saludable",
    title: "Guía de compra saludable",
    description: "Ideas para organizar una lista equilibrada sin complicarte.",
    format: "Guía",
    access: "gratis",
    category: "Alimentación",
    tags: ["compra", "alimentación", "organización"],
    estimatedTime: "8 min",
    level: "Fácil",
    featured: true,
    href: "/recursos/gratis/guia-compra-saludable",
    relatedToolHref: "/herramientas-gratis#lista-compra",
    visual: {
      src: "/images/resources/guia-compra-saludable.jpg",
      alt: "Bolsa de tela con verduras y fruta para una compra saludable"
    },
    inside: [
      "Categorías para montar una compra base.",
      "Ideas para despensa, frescos y proteínas.",
      "Útil antes de usar la lista de compra."
    ]
  },
  {
    id: "reto-semanal-energia",
    slug: "reto-semanal-energia",
    title: "Reto semanal de energía",
    description: "Siete pequeñas acciones para moverte más y ordenar tus rutinas.",
    format: "Reto",
    access: "gratis",
    category: "Hábitos",
    tags: ["reto", "energía", "semana"],
    estimatedTime: "7 días",
    level: "Inicial",
    featured: true,
    href: "/recursos/gratis/reto-semanal-energia",
    relatedToolHref: "/herramientas-gratis#reto-7-dias",
    visual: {
      src: "/images/resources/reto-semanal-energia.jpg",
      alt: "Cuaderno con seguimiento semanal de hábitos y símbolos de bienestar"
    },
    inside: [
      "Siete acciones pequeñas para repartir en la semana.",
      "Enfoque en energía, movimiento y calma.",
      "Perfecto para empezar sin una rutina compleja."
    ]
  },
  {
    id: "plantilla-menu-semanal",
    slug: "plantilla-menu-semanal",
    title: "Plantilla de menú semanal",
    description: "Un esquema simple para planificar desayunos, comidas y cenas.",
    format: "Plantilla",
    access: "gratis",
    category: "Planificación",
    tags: ["menú", "semana", "comidas"],
    estimatedTime: "10 min",
    level: "Fácil",
    href: "/recursos/gratis/plantilla-menu-semanal",
    relatedToolHref: "/herramientas-gratis#planificador-comidas",
    visual: {
      src: "/images/resources/plantilla-menu-semanal.jpg",
      alt: "Planificador semanal de comidas junto a ingredientes frescos"
    },
    inside: [
      "Vista semanal para organizar comidas.",
      "Espacio para preparaciones y lista de compra.",
      "Se complementa con el planificador interactivo."
    ]
  },
  {
    id: "rutina-casa-inicial",
    slug: "rutina-casa-inicial",
    title: "Rutina en casa inicial",
    description: "Una guía breve para moverte sin material durante la semana.",
    format: "Guía",
    access: "gratis",
    category: "Entrenamiento",
    tags: ["entrenamiento", "casa", "inicial"],
    estimatedTime: "12 min",
    level: "Inicial",
    href: "/recursos/gratis/rutina-casa-inicial",
    relatedToolHref: "/herramientas-gratis#reto-7-dias",
    visual: {
      src: "/images/resources/rutina-casa-inicial.jpg",
      alt: "Esterilla, zapatillas y mancuernas para entrenar en casa"
    },
    inside: [
      "Rutina sencilla sin material.",
      "Bloques de movilidad, fuerza suave y pausa.",
      "Pensada para crear continuidad."
    ]
  },
  {
    id: "lista-compra-basica",
    slug: "lista-compra-basica",
    title: "Lista de compra básica",
    description: "Categorías de alimentos para montar una despensa saludable.",
    format: "Checklist",
    access: "gratis",
    category: "Alimentación",
    tags: ["compra", "despensa", "básicos"],
    estimatedTime: "6 min",
    level: "Inicial",
    href: "/recursos/gratis/lista-compra-basica",
    relatedToolHref: "/herramientas-gratis#lista-compra",
    visual: {
      src: "/images/resources/lista-compra-basica.jpg",
      alt: "Portapapeles con lista de compra junto a frutas y verduras"
    },
    inside: [
      "Checklist por grupos de alimentos.",
      "Base para comprar con más claridad.",
      "Preparada para futuras descargas reales."
    ]
  }
];
