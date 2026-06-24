import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies | Vive Más",
  description:
    "Información sobre cookies, almacenamiento local y preferencias del navegador en Vive Más."
};

const browserItems = [
  "Favoritos guardados por ti.",
  "Contenido visto recientemente.",
  "Progreso de herramientas gratuitas.",
  "Preferencias o registros creados desde el panel de bienestar."
];

export default function CookiesPage() {
  return (
    <main className="bg-page">
      <section className="page-shell py-16 md:py-24">
        <div className="max-w-4xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-6xl">
            Política de cookies
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-leaf-900/65">
            En esta versión, Vive Más no implementa cookies publicitarias, pagos,
            sistemas de usuarios ni analítica externa conectada desde la aplicación.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-ink">Almacenamiento local</h2>
            <p className="mt-3 leading-7 text-leaf-900/65">
              Para que algunas herramientas sean utiles sin registro, la web puede guardar
              información en el navegador mediante localStorage. Esto permite mantener tu
              progreso aunque cierres la pagina.
            </p>
            <div className="mt-5 grid gap-3">
              {browserItems.map((item) => (
                <p key={item} className="rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-leaf-900/75">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-ink">Gestion</h2>
            <p className="mt-3 leading-7 text-leaf-900/65">
              Puedes borrar esta información desde la configuración del navegador,
              eliminando los datos del sitio. Si en el futuro se anaden servicios externos,
              newsletter real o analítica, esta página deberá actualizarse antes de activarlos.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
