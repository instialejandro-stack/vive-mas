import type { Metadata } from "next";
import "@/app/globals.css";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: {
    default: "Vive Mejor | Bienestar y hábitos saludables",
    template: "%s | Vive Mejor"
  },
  description:
    "Ideas, hábitos, menús y planes de entrenamiento para mejorar tu bienestar físico y mental de forma sencilla y sostenible.",
  openGraph: {
    title: "Vive Mejor",
    description: "Construye una vida más saludable con pequeños pasos diarios.",
    type: "website",
    locale: "es_ES",
    siteName: "Vive Mejor"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
