export type Objective = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  accent: string;
  tags: string[];
  steps: string[];
  featuredLinks: {
    label: string;
    href: string;
    type: "Herramienta" | "Recurso" | "Articulo" | "Plantilla";
  }[];
};

export const objectives: Objective[] = [
  {
    slug: "comer-mejor",
    title: "Comer mejor sin complicarte",
    shortTitle: "Comer mejor",
    description:
      "Organiza compras, menus y decisiones sencillas para alimentarte con mas calma.",
    audience: "Para quien quiere mejorar su alimentacion sin contar cada detalle.",
    accent: "from-leaf-50 to-cream",
    tags: ["alimentacion", "compra", "menus", "planificacion"],
    steps: [
      "Prepara una lista base de compra.",
      "Elige dos o tres comidas comodin para la semana.",
      "Usa el planificador semanal para reducir decisiones."
    ],
    featuredLinks: [
      { label: "Planificador semanal", href: "/herramientas-gratis#planificador-comidas", type: "Herramienta" },
      { label: "Guia de compra saludable", href: "/recursos/gratis/guia-compra-saludable", type: "Recurso" },
      { label: "Lista de compra base", href: "/blog/lista-compra-base-para-comer-mejor", type: "Articulo" }
    ]
  },
  {
    slug: "moverme-mas",
    title: "Moverme mas durante la semana",
    shortTitle: "Moverme mas",
    description:
      "Empieza con rutinas cortas, pausas activas y objetivos realistas que puedas repetir.",
    audience: "Para quien pasa mucho tiempo sentado o quiere volver a activarse.",
    accent: "from-sky-50 to-leaf-50",
    tags: ["entrenamiento", "movimiento", "casa", "energia"],
    steps: [
      "Haz una pausa activa de dos minutos.",
      "Prueba una rutina inicial sin material.",
      "Marca tu movimiento diario en Mi bienestar."
    ],
    featuredLinks: [
      { label: "Rutina en casa inicial", href: "/recursos/gratis/rutina-casa-inicial", type: "Recurso" },
      { label: "Pausas activas", href: "/blog/pausas-activas-para-dias-sedentarios", type: "Articulo" },
      { label: "Reto de 7 dias", href: "/herramientas-gratis#reto-7-dias", type: "Herramienta" }
    ]
  },
  {
    slug: "ganar-energia",
    title: "Ganar energia con pequenos habitos",
    shortTitle: "Ganar energia",
    description:
      "Combina agua, descanso, movimiento suave y rutinas pequenas para sentir mas continuidad.",
    audience: "Para quien quiere sentirse mejor sin cambiar toda su vida de golpe.",
    accent: "from-amber-50 to-leaf-50",
    tags: ["energia", "habitos", "descanso", "reto"],
    steps: [
      "Haz un check-in rapido de energia y descanso.",
      "Elige tres acciones pequenas para hoy.",
      "Sigue un reto semanal amable."
    ],
    featuredLinks: [
      { label: "Mi bienestar", href: "/mi-bienestar", type: "Herramienta" },
      { label: "Reto semanal de energia", href: "/recursos/gratis/reto-semanal-energia", type: "Recurso" },
      { label: "Preparar el descanso", href: "/blog/preparar-el-descanso-sin-complicarte", type: "Articulo" }
    ]
  },
  {
    slug: "organizar-mi-semana",
    title: "Organizar mi semana saludable",
    shortTitle: "Organizar semana",
    description:
      "Crea una estructura simple para comidas, recursos, habitos y pequenos compromisos.",
    audience: "Para quien necesita orden visual y menos improvisacion.",
    accent: "from-mist to-white",
    tags: ["planificacion", "semana", "plantillas", "habitos"],
    steps: [
      "Elige una plantilla de referencia.",
      "Planifica comidas y lista de compra.",
      "Guarda tus recursos favoritos para volver rapido."
    ],
    featuredLinks: [
      { label: "Plantilla de menu semanal", href: "/recursos/gratis/plantilla-menu-semanal", type: "Plantilla" },
      { label: "Planificar comidas", href: "/blog/planificar-comidas-sin-complicarte", type: "Articulo" },
      { label: "Favoritos", href: "/favoritos", type: "Herramienta" }
    ]
  }
];
