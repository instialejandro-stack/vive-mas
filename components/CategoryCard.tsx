import Link from "next/link";
import { Category } from "@/data/categories";
import { cn } from "@/lib/utils";

const accentConfig: Record<
  Category["accent"],
  { iconBg: string; text: string; topBorder: string; icon: string; arrowColor: string }
> = {
  leaf: {
    iconBg: "bg-leaf-50",
    text: "text-leaf-600",
    topBorder: "border-t-leaf-500",
    icon: "🥗",
    arrowColor: "text-leaf-500"
  },
  coral: {
    iconBg: "bg-[#fde9e4]",
    text: "text-[#934230]",
    topBorder: "border-t-[#e9785f]",
    icon: "🏃",
    arrowColor: "text-[#e9785f]"
  },
  honey: {
    iconBg: "bg-[#fff2d6]",
    text: "text-[#7d5614]",
    topBorder: "border-t-[#f4b860]",
    icon: "✨",
    arrowColor: "text-[#f4b860]"
  },
  sky: {
    iconBg: "bg-[#e7f3fb]",
    text: "text-[#24536b]",
    topBorder: "border-t-[#5ba4cf]",
    icon: "📚",
    arrowColor: "text-[#5ba4cf]"
  }
};

export function CategoryCard({ category }: { category: Category }) {
  const cfg = accentConfig[category.accent];

  return (
    <Link
      href={category.href}
      className={cn(
        "focus-ring group flex flex-col rounded-2xl border-2 border-leaf-100 border-t-4 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft hover:border-leaf-200",
        cfg.topBorder
      )}
    >
      <span
        className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
          cfg.iconBg
        )}
        aria-hidden="true"
      >
        {cfg.icon}
      </span>

      <h3 className="text-lg font-bold text-ink">{category.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-7 text-leaf-900/60">
        {category.description}
      </p>

      <div className="mt-5 flex items-center gap-1.5">
        <span className={cn("text-sm font-bold", cfg.text)}>Ver categoría</span>
        <svg
          className={cn(
            "h-4 w-4 transition-transform duration-200 group-hover:translate-x-1",
            cfg.arrowColor
          )}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 8H13M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
