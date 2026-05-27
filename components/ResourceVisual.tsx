import Image from "next/image";
import { ResourceVisual as ResourceVisualType } from "@/data/resources";
import { cn } from "@/lib/utils";

export function ResourceVisual({
  visual,
  title,
  size = "card"
}: {
  visual: ResourceVisualType;
  title: string;
  size?: "card" | "hero";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-mist",
        size === "hero" ? "min-h-[22rem]" : "min-h-52"
      )}
    >
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes={size === "hero" ? "(min-width: 1024px) 48vw, 100vw" : "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        priority={size === "hero"}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent p-4">
        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-leaf-700">
          Vista previa
        </span>
        <h3 className={cn("mt-3 max-w-sm font-black leading-tight text-white", size === "hero" ? "text-4xl" : "text-xl")}>
          {title}
        </h3>
      </div>
    </div>
  );
}
