import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso legal | Vive Más",
  description:
    "Aviso legal de Vive Más: finalidad del sitio, responsabilidad y uso del contenido."
};

const sections = [
  {
    title: "Finalidad de la web",
    text: "Vive Más ofrece contenido divulgativo sobre bienestar, hábitos saludables, alimentación, ejercicio y organización personal. Su objetivo es ayudar a dar pequeños pasos sostenibles."
  },
  {
    title: "Contenido informativo",
    text: "La información publicada no sustituye el consejo de profesionales sanitarios, nutricionistas, entrenadores o psicólogos. Si tienes una condición médica o dudas concretas, consulta con un profesional cualificado."
  },
  {
    title: "Uso de recursos",
    text: "Los descargables, plantillas, herramientas y artículos están pensados para uso personal. En fases futuras se podrán ampliar condiciones de uso si se publican guías, ebooks o planes avanzados."
  },
  {
    title: "Responsabilidad",
    text: "Cada persona es responsable de adaptar las recomendaciones generales a su situacion, nivel de actividad, disponibilidad y necesidades."
  }
];

export default function LegalNoticePage() {
  return (
    <main className="bg-page">
      <section className="page-shell py-16 md:py-24">
        <div className="max-w-4xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-6xl">
            Aviso legal
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-leaf-900/65">
            Información básica sobre el uso de Vive Más y el alcance de sus contenidos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-ink">{section.title}</h2>
              <p className="mt-3 leading-7 text-leaf-900/65">{section.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-leaf-100 bg-mist p-6">
          <h2 className="text-2xl font-black text-ink">Contacto</h2>
          <p className="mt-3 leading-7 text-leaf-900/65">
            Para consultas generales, propuestas o correcciones puedes usar la pagina de{" "}
            <Link className="font-bold text-leaf-700 hover:text-leaf-900" href="/contacto">
              contacto
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
