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
  },
  {
    id: "lista-compra-base",
    slug: "lista-compra-base-para-comer-mejor",
    title: "Lista de compra base para comer mejor",
    excerpt: "Una guía simple para llenar la despensa con alimentos versátiles.",
    category: "Alimentación",
    readTime: "4 min",
    publishedAt: "2026-06-01",
    tags: ["alimentación", "compra", "organización"],
    content: [
      "Una compra saludable empieza con alimentos que puedas combinar sin pensar demasiado: verduras, fruta, legumbres, huevos, yogur natural, frutos secos, arroz, avena y alguna proteína fácil.",
      "No hace falta comprar perfecto. Es más útil tener una base flexible para preparar platos sencillos incluso cuando la semana se complica.",
      "Antes de ir al mercado, revisa qué tienes en casa y elige tres comidas base. Esa pequeña decisión reduce compras impulsivas y evita desperdicio."
    ]
  },
  {
    id: "pausas-activas",
    slug: "pausas-activas-para-dias-sedentarios",
    title: "Pausas activas para días sedentarios",
    excerpt: "Microacciones de movimiento para cortar horas de silla sin montar una rutina compleja.",
    category: "Entrenamiento",
    readTime: "3 min",
    publishedAt: "2026-06-01",
    tags: ["movimiento", "oficina", "energía"],
    content: [
      "Si pasas muchas horas sentado, una pausa activa de dos o tres minutos puede cambiar cómo termina tu día. No busca cansarte, sino recordarle al cuerpo que puede moverse.",
      "Prueba levantarte, caminar por casa, hacer movilidad de hombros, unas sentadillas suaves o estirar gemelos. Lo importante es repetirlo varias veces, no hacerlo intenso.",
      "Puedes vincularlo a un hábito que ya existe: después de llenar el vaso de agua, haces una pausa breve. Esa asociación lo vuelve más fácil."
    ]
  },
  {
    id: "descanso-nocturno",
    slug: "preparar-el-descanso-sin-complicarte",
    title: "Preparar el descanso sin complicarte",
    excerpt: "Ideas sencillas para llegar a la noche con menos ruido mental.",
    category: "Bienestar",
    readTime: "4 min",
    publishedAt: "2026-06-01",
    tags: ["descanso", "rutina", "calma"],
    content: [
      "Dormir mejor no siempre empieza en la cama. A menudo empieza una hora antes, bajando estímulos y dejando claro qué queda para mañana.",
      "Puedes preparar una rutina mínima: cerrar pantallas, ordenar una superficie, apuntar tres pendientes y dejar preparada el agua o la ropa del día siguiente.",
      "El objetivo no es crear una ceremonia perfecta, sino una señal repetible de cierre. Cuanto más simple sea, más fácil será mantenerla."
    ]
  },
  {
    id: "reto-7-dias",
    slug: "como-empezar-un-reto-de-7-dias",
    title: "Cómo empezar un reto de 7 días",
    excerpt: "Una forma amable de probar cambios sin exigirte una transformación completa.",
    category: "Hábitos",
    readTime: "5 min",
    publishedAt: "2026-06-01",
    tags: ["reto", "hábitos", "progreso"],
    content: [
      "Un reto de siete días funciona porque tiene un límite claro. No tienes que prometer que cambiarás para siempre: solo observar qué pasa durante una semana.",
      "Elige una acción pequeña, medible y realista. Por ejemplo: beber más agua, caminar diez minutos, añadir verdura a una comida o hacer una pausa sin pantalla.",
      "Al terminar, revisa qué fue fácil, qué estorbó y qué repetirías. Esa información vale más que completar todos los días de forma perfecta."
    ]
  }
];
