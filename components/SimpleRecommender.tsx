"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";

const goals = [
  { value: "food", label: "Comer mejor" },
  { value: "move", label: "Moverme más" },
  { value: "habits", label: "Mejorar hábitos" },
  { value: "plan", label: "Organizar mi semana" }
];

const times = [
  { value: "5", label: "5 minutos" },
  { value: "15", label: "15 minutos" },
  { value: "30", label: "30 minutos" }
];

const formats = [
  { value: "tool", label: "Usar herramienta" },
  { value: "download", label: "Descargar recurso" },
  { value: "read", label: "Leer guía" }
];

const recommendations: Record<string, Record<string, { title: string; text: string; href: string }>> = {
  food: {
    tool: {
      title: "Planificador semanal de comidas",
      text: "Empieza montando 2 o 3 comidas base para reducir decisiones esta semana.",
      href: "/herramientas-gratis#planificador-comidas"
    },
    download: {
      title: "Guía de compra saludable",
      text: "Descarga una base sencilla para comprar con más claridad.",
      href: "/recursos/gratis/guia-compra-saludable"
    },
    read: {
      title: "Cómo planificar comidas sin complicarte",
      text: "Una lectura corta para organizar comidas sin rigidez.",
      href: "/blog/planificar-comidas-sin-complicarte"
    }
  },
  move: {
    tool: {
      title: "Reto de 7 días",
      text: "Una forma amable de empezar a moverte sin sesiones largas.",
      href: "/herramientas-gratis#reto-7-dias"
    },
    download: {
      title: "Rutina en casa inicial",
      text: "Descarga una guía simple para moverte sin material.",
      href: "/recursos/gratis/rutina-casa-inicial"
    },
    read: {
      title: "Pausas activas para días sedentarios",
      text: "Microacciones para cortar horas de silla sin montar una rutina compleja.",
      href: "/blog/pausas-activas-para-dias-sedentarios"
    }
  },
  habits: {
    tool: {
      title: "Checklist diario de bienestar",
      text: "Marca acciones pequeñas y crea continuidad desde hoy.",
      href: "/herramientas-gratis#checklist-habitos"
    },
    download: {
      title: "Checklist de hábitos diarios",
      text: "Descarga una plantilla imprimible para seguimiento básico.",
      href: "/recursos/gratis/checklist-habitos-diarios"
    },
    read: {
      title: "Pequeños pasos que sí se sostienen",
      text: "Una lectura breve para empezar sin exigirte perfección.",
      href: "/blog/pequenos-pasos-sostenibles"
    }
  },
  plan: {
    tool: {
      title: "Mi bienestar",
      text: "Usa tu panel local para revisar objetivos, plan diario y resumen semanal.",
      href: "/mi-bienestar"
    },
    download: {
      title: "Plantilla de menú semanal",
      text: "Descarga una plantilla para organizar comidas y compras.",
      href: "/recursos/gratis/plantilla-menu-semanal"
    },
    read: {
      title: "Lista de compra base para comer mejor",
      text: "Ideas para montar una despensa útil y flexible.",
      href: "/blog/lista-compra-base-para-comer-mejor"
    }
  }
};

export function SimpleRecommender() {
  const [goal, setGoal] = useState("food");
  const [time, setTime] = useState("15");
  const [format, setFormat] = useState("tool");

  const result = useMemo(() => recommendations[goal][format], [format, goal]);

  return (
    <section className="rounded-3xl border border-leaf-100 bg-white p-6 shadow-card lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-leaf-600">
            Recomendador rápido
          </p>
          <h2 className="mt-2 text-2xl font-black text-ink">Encuentra por dónde empezar</h2>
          <p className="mt-3 leading-7 text-leaf-900/62">
            Responde tres preguntas y te sugerimos una ruta gratuita. Todo ocurre en tu navegador.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            <QuestionGroup label="Objetivo" value={goal} setValue={setGoal} options={goals} />
            <QuestionGroup label="Tiempo" value={time} setValue={setTime} options={times} />
            <QuestionGroup label="Formato" value={format} setValue={setFormat} options={formats} />
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-leaf-50 to-cream p-5">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-leaf-600">
              Recomendación para {time} minutos
            </p>
            <h3 className="mt-2 text-2xl font-black text-ink">{result.title}</h3>
            <p className="mt-2 leading-7 text-leaf-900/62">{result.text}</p>
            <Button href={result.href} className="mt-5">
              Ir a la recomendación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionGroup({
  label,
  value,
  setValue,
  options
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-sm font-black text-ink">{label}</p>
      <div className="mt-2 grid gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setValue(option.value)}
            className={`focus-ring rounded-xl border px-3 py-2 text-left text-sm font-bold transition ${
              value === option.value
                ? "border-leaf-700 bg-leaf-700 text-white"
                : "border-leaf-100 bg-mist text-leaf-900/70 hover:border-leaf-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
