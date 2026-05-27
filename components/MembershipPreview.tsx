import { Button } from "@/components/Button";
import { membershipPreview } from "@/data/membership";

const features = [
  { icon: "🎯", text: "Contenido para suscriptores" },
  { icon: "📚", text: "Guías y ebooks descargables" },
  { icon: "🏆", text: "Planes y recursos premium" }
];

export function MembershipPreview() {
  return (
    <section className="py-24">
      <div className="page-shell">
        <div className="overflow-hidden rounded-3xl border border-leaf-100 bg-gradient-to-br from-leaf-50/60 to-white p-8 shadow-soft md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.6fr] md:items-center">
            {/* Texto */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e9785f]/25 bg-[#fde9e4] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#934230]">
                {membershipPreview.status}
              </span>
              <h2 className="font-serif mt-4 text-4xl font-normal leading-tight text-ink md:text-5xl">
                {membershipPreview.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-leaf-900/60">
                {membershipPreview.description}
              </p>
            </div>

            {/* Tarjeta de beneficios */}
            <div className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-card">
              <p className="text-xs font-bold uppercase tracking-widest text-leaf-600">
                Incluye
              </p>
              <ul className="mt-5 space-y-4">
                {features.map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-xl">
                      {icon}
                    </span>
                    <span className="text-sm font-medium text-leaf-900/70">{text}</span>
                  </li>
                ))}
              </ul>
              <Button href="/premium" className="mt-7 w-full" size="lg">
                Ver planes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
