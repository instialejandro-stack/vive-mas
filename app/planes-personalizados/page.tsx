import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Planes personalizados",
  description:
    "Placeholder para futuros menús saludables personalizados y planes adaptados."
};

export default function PlanesPersonalizadosPage() {
  return (
    <section className="py-20">
      <div className="page-shell grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <SectionTitle
          align="left"
          eyebrow="Planes personalizados"
          title="Preparado para menús y planes a medida"
          description="Esta ruta reserva el espacio para futuros menús saludables personalizados, planes de entrenamiento adaptados y recomendaciones según objetivos. Sin base de datos ni área privada por ahora."
        />
        <div className="rounded-lg border border-leaf-600/10 bg-white p-6 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">
            Futuro modulo
          </p>
          <h2 className="mt-3 text-2xl font-bold text-ink">
            Diagnóstico visual, sin datos reales todavía
          </h2>
          <p className="mt-4 leading-7 text-leaf-900/70">
            Más adelante este espacio podría conectar preferencias, objetivos,
            nivel de actividad y disponibilidad semanal.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/programas">Ver planes</Button>
            <Button href="/premium" variant="secondary">
              Próximamente
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
