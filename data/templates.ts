export type Template = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Nutrición" | "Hábitos" | "Planificación" | "Entrenamiento";
  status: "Gratis" | "Próximamente";
  includes: string[];
  preview: string[];
  relatedToolHref?: string;
  downloadUrl?: string;
};

export const templates: Template[] = [
  {
    id: "planificador-comidas",
    slug: "plantilla-semanal-comidas",
    title: "Plantilla semanal de comidas",
    description: "Una estructura sencilla para organizar desayunos, comidas y cenas.",
    category: "Nutrición",
    status: "Gratis",
    includes: ["Vista semanal", "Ideas base", "Lista de compra"],
    preview: [
      "Organiza desayunos, comidas y cenas en una vista semanal.",
      "Anota ideas de compra y preparaciones sencillas.",
      "Puedes usarla junto al planificador interactivo."
    ],
    relatedToolHref: "/herramientas-gratis#planificador-comidas"
  },
  {
    id: "checklist-habitos",
    slug: "checklist-habitos-saludables",
    title: "Checklist de hábitos saludables",
    description: "Una plantilla imprimible para seguir pequeños hábitos diarios.",
    category: "Hábitos",
    status: "Gratis",
    includes: ["Seguimiento diario", "Resumen semanal", "Espacio de notas"],
    preview: [
      "Marca acciones pequeñas de bienestar durante la semana.",
      "Revisa qué hábitos te resultan más fáciles de sostener.",
      "Combina bien con la checklist interactiva."
    ],
    relatedToolHref: "/herramientas-gratis#checklist-habitos"
  },
  {
    id: "lista-compra",
    slug: "lista-compra-saludable",
    title: "Lista de compra saludable",
    description: "Categorías básicas para preparar una compra equilibrada sin complicarte.",
    category: "Nutrición",
    status: "Gratis",
    includes: ["Verduras", "Proteínas", "Despensa"],
    preview: [
      "Agrupa alimentos por categorías para comprar con más claridad.",
      "Sirve como base para menús sencillos y repetibles.",
      "Puedes generar una lista rápida desde la herramienta gratuita."
    ],
    relatedToolHref: "/herramientas-gratis#lista-compra"
  },
  {
    id: "pack-nutricion",
    slug: "pack-nutricion-editable",
    title: "Pack de nutrición editable",
    description: "Futuro pack con varias plantillas para menús y objetivos concretos.",
    category: "Planificación",
    status: "Próximamente",
    includes: ["Menús", "Objetivos", "Seguimiento"],
    preview: [
      "Espacio reservado para un futuro pack más completo.",
      "Puede incluir menús, objetivos y seguimiento editable.",
      "Aún no tiene descarga ni checkout."
    ]
  }
];
