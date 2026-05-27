export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  content: string[];
};

export const articles: Article[] = [
  {
    id: "pequenos-pasos",
    slug: "pequenos-pasos-sostenibles",
    title: "Pequeños pasos que sí se sostienen",
    excerpt: "Cómo convertir mejoras sencillas en una rutina que puedas mantener.",
    category: "Hábitos",
    readTime: "4 min",
    publishedAt: "2026-05-27",
    tags: ["hábitos", "constancia", "bienestar"],
    content: [
      "Mejorar tu bienestar no tiene que empezar con una rutina perfecta. Muchas veces funciona mejor elegir una acción pequeña que puedas repetir incluso en días ocupados.",
      "Un vaso de agua al levantarte, diez minutos de paseo o preparar una cena sencilla son ejemplos de cambios que parecen modestos, pero crean confianza.",
      "La clave está en reducir la fricción. Cuanto más fácil sea empezar, más probable será repetirlo mañana."
    ]
  },
  {
    id: "planificar-comidas",
    slug: "planificar-comidas-sin-complicarte",
    title: "Cómo planificar comidas sin complicarte",
    excerpt: "Una forma sencilla de organizar desayunos, comidas y cenas sin rigidez.",
    category: "Alimentación",
    readTime: "5 min",
    publishedAt: "2026-05-27",
    tags: ["alimentación", "planificación", "comidas"],
    content: [
      "Planificar no significa decidir cada gramo ni cerrar la semana sin margen. Puede ser tan simple como elegir tres desayunos, tres comidas base y varias cenas fáciles.",
      "Empieza por platos que ya conoces y añade variedad poco a poco: una fuente de proteína, verduras, hidratos de calidad y una grasa saludable.",
      "Si una semana no sale perfecta, la planificación sigue sirviendo: te da una referencia para volver al camino sin empezar desde cero."
    ]
  },
  {
    id: "movimiento-casa",
    slug: "moverte-en-casa-con-constancia",
    title: "Moverte en casa con constancia",
    excerpt: "Ideas para empezar a entrenar sin material y sin depender de mucho tiempo.",
    category: "Entrenamiento",
    readTime: "3 min",
    publishedAt: "2026-05-27",
    tags: ["entrenamiento", "casa", "constancia"],
    content: [
      "Entrenar en casa puede funcionar muy bien si el objetivo inicial es crear continuidad. No necesitas una sesión larga para activar el cuerpo.",
      "Prueba bloques de diez minutos con movilidad, sentadillas, empujes contra la pared y respiración tranquila. Si te resulta fácil, repítelo otro día.",
      "La constancia aparece cuando el plan cabe en tu vida real. Mejor una rutina pequeña repetida que un plan perfecto abandonado."
    ]
  }
];
