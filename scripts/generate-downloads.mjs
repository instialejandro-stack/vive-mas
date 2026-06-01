import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const downloads = [
  {
    file: "checklist-habitos-diarios.pdf",
    title: "Checklist de habitos diarios",
    lines: ["Agua", "Movimiento", "Comida sencilla", "Pausa mental", "Descanso"]
  },
  {
    file: "guia-compra-saludable.pdf",
    title: "Guia de compra saludable",
    lines: ["Verduras y fruta", "Proteinas sencillas", "Legumbres y cereales", "Basicos de despensa"]
  },
  {
    file: "reto-semanal-energia.pdf",
    title: "Reto semanal de energia",
    lines: ["Dia 1: agua", "Dia 2: paseo", "Dia 3: comida base", "Dia 4: pausa", "Dia 5: movilidad", "Dia 6: orden", "Dia 7: reflexion"]
  },
  {
    file: "plantilla-menu-semanal.pdf",
    title: "Plantilla de menu semanal",
    lines: ["Lunes a domingo", "Desayuno", "Comida", "Cena", "Lista de compra"]
  },
  {
    file: "rutina-casa-inicial.pdf",
    title: "Rutina en casa inicial",
    lines: ["Movilidad suave", "Sentadillas", "Empuje contra pared", "Paseo corto", "Respiracion"]
  },
  {
    file: "lista-compra-basica.pdf",
    title: "Lista de compra basica",
    lines: ["Fruta", "Verdura", "Huevos", "Yogur natural", "Legumbres", "Arroz o avena", "Frutos secos"]
  }
];

function escapePdfText(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function makePdf({ title, lines }) {
  const textLines = [
    "BT",
    "/F1 24 Tf",
    "72 760 Td",
    `(${escapePdfText(title)}) Tj`,
    "/F1 12 Tf",
    "0 -34 Td",
    "(Vive Mas - recurso gratuito) Tj",
    "0 -30 Td",
    ...lines.flatMap((line) => [`(${escapePdfText("- " + line)}) Tj`, "0 -22 Td"]),
    "0 -18 Td",
    "(Completa este recurso a tu ritmo. Pequenos pasos, mejor que perfeccion.) Tj",
    "ET"
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(textLines)} >>\nstream\n${textLines}\nendstream`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
}

const outputDir = join(process.cwd(), "public", "downloads");
mkdirSync(outputDir, { recursive: true });

downloads.forEach((download) => {
  writeFileSync(join(outputDir, download.file), makePdf(download), "binary");
});
