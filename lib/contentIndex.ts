import { articles } from "@/data/articles";
import { freeTools } from "@/data/freeTools";
import { resources } from "@/data/resources";
import { templates } from "@/data/templates";

export type ContentType = "Artículo" | "Recurso" | "Herramienta" | "Plantilla" | "Ruta";

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  type: ContentType;
  category: string;
  tags: string[];
};

export function getContentIndex(): ContentItem[] {
  const articleItems = articles.map((article) => ({
    id: `article-${article.slug}`,
    title: article.title,
    description: article.excerpt,
    href: `/blog/${article.slug}`,
    type: "Artículo" as const,
    category: article.category,
    tags: article.tags
  }));

  const resourceItems = resources
    .filter((resource) => resource.access === "gratis")
    .map((resource) => ({
      id: `resource-${resource.slug}`,
      title: resource.title,
      description: resource.description,
      href: resource.href,
      type: "Recurso" as const,
      category: resource.category,
      tags: resource.tags
    }));

  const toolItems = freeTools.map((tool) => ({
    id: `tool-${tool.id}`,
    title: tool.title,
    description: tool.description,
    href: tool.href,
    type: "Herramienta" as const,
    category: tool.category,
    tags: [tool.category.toLowerCase()]
  }));

  const templateItems = templates.map((template) => ({
    id: `template-${template.slug}`,
    title: template.title,
    description: template.description,
    href: `/plantillas/${template.slug}`,
    type: "Plantilla" as const,
    category: template.category,
    tags: template.includes.map((item) => item.toLowerCase())
  }));

  const routeItems = [
    {
      id: "route-empieza-aqui",
      title: "Empieza aquí",
      description: "Rutas sencillas para elegir el siguiente paso según tu objetivo.",
      href: "/empieza-aqui",
      type: "Ruta" as const,
      category: "Inicio",
      tags: ["onboarding", "recomendador", "ruta"]
    },
    {
      id: "route-mi-bienestar",
      title: "Mi bienestar",
      description: "Panel local con progreso, check-in, objetivos y resumen mensual.",
      href: "/mi-bienestar",
      type: "Ruta" as const,
      category: "Bienestar",
      tags: ["panel", "objetivos", "progreso"]
    }
  ];

  return [...routeItems, ...articleItems, ...resourceItems, ...toolItems, ...templateItems];
}
