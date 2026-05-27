type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-leaf-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft hover:border-leaf-200">
      {/* Destello decorativo en hover */}
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-leaf-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div
        aria-hidden="true"
        className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf-50 to-leaf-100 text-3xl shadow-sm"
      >
        {icon}
      </div>

      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-leaf-900/60">{description}</p>
    </article>
  );
}
