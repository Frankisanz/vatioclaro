import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host =
    incomingHeaders.get("x-forwarded-host") ??
    incomingHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    incomingHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "VatioClaro — Calculadoras de consumo eléctrico",
      template: "%s | VatioClaro",
    },
    description:
      "Calcula el consumo y coste de tus electrodomésticos con fórmulas transparentes, ejemplos prácticos y fuentes fiables.",
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: "VatioClaro",
      title: "VatioClaro — Descubre dónde se va cada euro de tu factura",
      description:
        "Calculadoras y guías claras para convertir vatios y horas de uso en kWh y euros.",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1672,
          height: 941,
          alt: "VatioClaro — Descubre dónde se va cada euro de tu factura",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "VatioClaro — Calcula tu consumo eléctrico",
      description:
        "Convierte vatios y horas de uso en kWh y euros, sin letra pequeña.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
