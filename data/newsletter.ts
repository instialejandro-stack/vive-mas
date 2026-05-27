export type NewsletterContent = {
  title: string;
  description: string;
  highlights: string[];
};

export const newsletter: NewsletterContent = {
  title: "Una idea saludable cada semana",
  description:
    "La newsletter será el canal para compartir recursos gratuitos, retos sencillos y novedades de la plataforma.",
  highlights: [
    "Consejos prácticos sin ruido",
    "Recursos gratuitos y descargables",
    "Retos semanales para avanzar con calma"
  ]
};
