# Contenido editorial

Este proyecto no usa CMS ni base de datos. Para subir contenido nuevo gratis:

## Artículos del blog

1. Abre `data/articles.ts`.
2. Duplica un objeto de `articles`.
3. Cambia `id`, `slug`, `title`, `excerpt`, `category`, `readTime`, `publishedAt`, `tags` y `content`.
4. El artículo aparecerá en `/blog` y tendrá página en `/blog/[slug]`.

## Recomendaciones

- Usa slugs en minusculas y con guiones.
- Mantén `content` como párrafos cortos.
- Usa categorías consistentes: `Hábitos`, `Alimentación`, `Entrenamiento`, `Bienestar`.
