import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { FreeToolsPreview } from "@/components/FreeToolsPreview";
import { Hero } from "@/components/Hero";
import { MembershipPreview } from "@/components/MembershipPreview";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PremiumTeaser } from "@/components/PremiumTeaser";
import { ProgramCard } from "@/components/ProgramCard";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { categories } from "@/data/categories";
import { programs } from "@/data/programs";
import { resources } from "@/data/resources";

const benefits = [
  {
    title: "Alimentación equilibrada",
    description: "Recursos para organizar comidas reales, variadas y fáciles de repetir.",
    icon: "🥗"
  },
  {
    title: "Entrenamiento adaptado",
    description: "Rutinas progresivas para moverte con seguridad y constancia.",
    icon: "🏃"
  },
  {
    title: "Hábitos diarios",
    description: "Acciones pequeñas para mejorar energía, descanso y organización.",
    icon: "✨"
  },
  {
    title: "Bienestar mental",
    description: "Ideas sencillas para bajar el ritmo y cuidar tu equilibrio diario.",
    icon: "🧘"
  }
];

const findings = [
  { icon: "🍽️", text: "Menús saludables y fáciles de planificar" },
  { icon: "🎯", text: "Retos semanales para ganar constancia" },
  { icon: "📖", text: "Artículos claros sobre bienestar cotidiano" },
  { icon: "📥", text: "Recursos descargables para organizar tus avances" }
];

const quickActions = [
  {
    title: "Ver mi progreso",
    description: "Resumen local de hábitos, reto, bienestar y comidas planificadas.",
    href: "/mi-bienestar",
    label: "Abrir panel",
    image: "/images/resources/reto-semanal-energia.jpg"
  },
  {
    title: "Usar una herramienta gratis",
    description: "Calculadoras, registro diario, lista de compra y planificador semanal.",
    href: "/herramientas-gratis",
    label: "Ir a herramientas",
    image: "/images/resources/checklist-habitos-diarios.jpg"
  },
  {
    title: "Encontrar recursos",
    description: "Guías, plantillas, checklists y retos filtrados por categoría.",
    href: "/biblioteca-gratis",
    label: "Abrir biblioteca",
    image: "/images/resources/guia-compra-saludable.jpg"
  },
  {
    title: "Leer sobre bienestar",
    description: "Artículos breves sobre alimentación, hábitos y entrenamiento.",
    href: "/blog",
    label: "Leer blog",
    image: "/images/resources/rutina-casa-inicial.jpg"
  },
  {
    title: "Ver plantillas",
    description: "Materiales gratuitos y futuros packs para organizar tu salud.",
    href: "/plantillas",
    label: "Ver plantillas",
    image: "/images/resources/plantilla-menu-semanal.jpg"
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="-mt-8 pb-16">
        <div className="page-shell">
          <div className="rounded-2xl border border-leaf-100 bg-white p-4 shadow-soft md:p-5">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="focus-ring group overflow-hidden rounded-2xl bg-mist transition hover:-translate-y-1 hover:bg-leaf-50 hover:shadow-card"
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image
                      src={action.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h2 className="text-base font-black text-ink">{action.title}</h2>
                    <p className="mt-2 min-h-16 text-sm leading-6 text-leaf-900/60">
                      {action.description}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-bold text-leaf-600 group-hover:text-leaf-800">
                      {action.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Beneficios"
            title="Una base completa para cuidarte mejor"
            description="Vive Más está pensado para acompañar cambios sencillos, sin promesas imposibles ni lenguaje complicado."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <FeatureCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-mist to-leaf-50/40 py-24">
        <div className="page-shell grid gap-10 xl:grid-cols-[0.8fr_0.9fr_1fr] xl:items-center">
          <SectionTitle
            align="left"
            eyebrow="Contenido"
            title="Qué encontrarás aquí"
            description="Una plataforma preparada para crecer con guías, recetas, planes, artículos y recursos que puedas aplicar desde el primer día."
          />

          <div className="relative min-h-[28rem] overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/resources/plantilla-menu-semanal.jpg"
              alt="Planificador semanal de comidas con ingredientes frescos"
              fill
              sizes="(min-width: 1280px) 32vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/15 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 shadow-card backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-leaf-600">
                Organización semanal
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-ink">
                Recursos visuales para pasar de la intención a una acción sencilla.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {findings.map(({ icon, text }) => (
              <div
                key={text}
                className="group rounded-2xl border border-leaf-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-soft"
              >
                <span
                  className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-leaf-50 text-xl"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <p className="text-sm font-semibold text-ink">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Recursos gratuitos"
            title="Descargables para empezar sin barreras"
            description="La plataforma queda preparada para alojar guías, plantillas, retos y materiales gratuitos antes de evolucionar a contenido premium."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <FreeToolsPreview />

      <section className="bg-gradient-to-br from-mist to-leaf-50/40 py-24">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Programas"
            title="Planes preparados para crecer contigo"
            description="Una base visual para futuros programas de entrenamiento, hábitos, alimentación y planes personalizados."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      <PremiumTeaser />
      <MembershipPreview />

      <section className="py-24">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Categorías"
            title="Explora por donde quieras empezar"
            description="Elige el área que mejor encaje con tu momento actual y avanza a tu ritmo."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.href} category={category} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <NewsletterSection />
    </>
  );
}
