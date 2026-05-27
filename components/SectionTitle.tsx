type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center"
}: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-leaf-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-leaf-600">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-4xl font-normal leading-tight text-ink md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-8 text-leaf-900/60 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
