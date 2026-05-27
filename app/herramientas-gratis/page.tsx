import Image from "next/image";
import type { Metadata } from "next";
import { FreeToolCard } from "@/components/FreeToolCard";
import { SectionTitle } from "@/components/SectionTitle";
import { DailyHabitChecklist } from "@/components/tools/DailyHabitChecklist";
import { GroceryListGenerator } from "@/components/tools/GroceryListGenerator";
import { HarrisBenedictCalculator } from "@/components/tools/HarrisBenedictCalculator";
import { SevenDayChallenge } from "@/components/tools/SevenDayChallenge";
import { WaterCalculator } from "@/components/tools/WaterCalculator";
import { WellbeingTracker } from "@/components/tools/WellbeingTracker";
import { WeeklyMealPlanner } from "@/components/tools/WeeklyMealPlanner";
import { freeTools } from "@/data/freeTools";

export const metadata: Metadata = {
  title: "Herramientas gratis",
  description:
    "Herramientas gratuitas de bienestar: calculadoras, registro diario, lista de compra, checklist, reto y planificador semanal."
};

export default function HerramientasGratisPage() {
  return (
    <>
      <section className="bg-dots bg-gradient-to-br from-leaf-50 to-cream py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionTitle
            align="left"
            eyebrow="Gratis y sin registro"
            title="Herramientas simples para tu bienestar diario"
            description="Todo funciona en tu navegador. No hay APIs externas, pagos, cuentas ni bases de datos: solo utilidades prácticas para empezar."
          />

          <div className="relative min-h-[24rem] overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/resources/rutina-casa-inicial.jpg"
              alt="Esterilla, zapatillas y mancuernas para una rutina de bienestar en casa"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-5 shadow-card backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-leaf-600">
                Todo local
              </p>
              <p className="mt-2 text-lg font-black text-ink">
                Calcula, registra y organiza sin crear cuenta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <div className="mb-12">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
                  Accesos rápidos
                </p>
                <h2 className="mt-1 text-3xl font-black text-ink">Elige qué quieres usar ahora</h2>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {freeTools.map((tool) => (
                <FreeToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <WaterCalculator />
            <HarrisBenedictCalculator />
            <WellbeingTracker />
            <GroceryListGenerator />
            <DailyHabitChecklist />
            <SevenDayChallenge />
            <WeeklyMealPlanner />
          </div>
        </div>
      </section>
    </>
  );
}
