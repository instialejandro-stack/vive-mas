import { Button } from "@/components/Button";
import { Program } from "@/data/programs";

const levelConfig: Record<string, { bg: string; text: string; icon: string }> = {
  Principiante: { bg: "bg-leaf-50", text: "text-leaf-700", icon: "🌱" },
  Inicial: { bg: "bg-leaf-50", text: "text-leaf-700", icon: "🌱" },
  Intermedio: { bg: "bg-[#fff2d6]", text: "text-[#7d5614]", icon: "🔥" },
  Avanzado: { bg: "bg-[#fde9e4]", text: "text-[#934230]", icon: "⚡" }
};

const fallback = { bg: "bg-mist", text: "text-leaf-700", icon: "✨" };

export function ProgramCard({ program }: { program: Program }) {
  const level = levelConfig[program.level] ?? fallback;

  return (
    <article className="surface-card reveal-up group flex flex-col p-6">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700">
          🕐 {program.duration}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${level.bg} ${level.text}`}
        >
          {level.icon} {program.level}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-ink">{program.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-7 text-leaf-900/60">{program.description}</p>

      <Button href="/programas" variant="secondary" size="sm" className="mt-6 self-start">
        Próximamente
      </Button>
    </article>
  );
}
