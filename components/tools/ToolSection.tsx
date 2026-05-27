import { ReactNode } from "react";

export function ToolSection({
  id,
  image,
  children,
  className = ""
}: {
  id: string;
  image: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`surface-card reveal-up relative scroll-mt-28 overflow-hidden bg-cover bg-center p-6 ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-white/88 backdrop-blur-[1px]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-leaf-50/75" aria-hidden="true" />
      <div className="relative">{children}</div>
    </section>
  );
}
