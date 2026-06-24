import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad | Vive Más",
  description:
    "Información sobre privacidad, datos locales y uso responsable de Vive Más."
};

const localData = [
  "Favoritos y contenidos vistos recientemente.",
  "Registros de herramientas como Mi bienestar, checklist diario o planificador.",
  "Preferencias guardadas por el navegador para mejorar la continuidad de uso."
];

export default function PrivacyPage() {
  return (
    <main className="bg-page">
      <section className="page-shell py-16 md:py-24">
        <div className="max-w-4xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-6xl">
            Política de privacidad
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-leaf-900/65">
            Vive Más está planteada como una plataforma gratuita de bienestar.
            En esta fase no hay registro, pagos, suscripciones reales ni base de datos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-black text-ink">Resumen claro</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-leaf-900/65">
              <li>No vendemos datos personales.</li>
              <li>No conectamos herramientas de pago.</li>
              <li>No usamos una base de datos de usuarios.</li>
              <li>Algunas funciones guardan información solo en tu navegador.</li>
            </ul>
          </aside>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-ink">Que datos se guardan</h2>
              <p className="mt-3 leading-7 text-leaf-900/65">
                Algunas herramientas usan almacenamiento local del navegador para que puedas
                continuar donde lo dejaste. Esa información no se envía a servidores externos
                desde la aplicacion.
              </p>
              <ul className="mt-5 grid gap-3">
                {localData.map((item) => (
                  <li key={item} className="rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-leaf-900/75">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-ink">Como borrar tus datos locales</h2>
              <p className="mt-3 leading-7 text-leaf-900/65">
                Puedes borrar los datos guardados limpiando el almacenamiento del sitio desde
                la configuración de tu navegador. Algunas herramientas también incluyen botones
                para reiniciar su progreso.
              </p>
            </section>

            <section className="rounded-[2rem] border border-leaf-100 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-ink">Contacto</h2>
              <p className="mt-3 leading-7 text-leaf-900/65">
                Para cualquier duda sobre privacidad puedes escribir desde la pagina de{" "}
                <Link className="font-bold text-leaf-700 hover:text-leaf-900" href="/contacto">
                  contacto
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
