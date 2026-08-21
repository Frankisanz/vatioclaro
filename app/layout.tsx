import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { LEGAL_OWNER } from "@/lib/legal";
import {
  absoluteUrl,
  EDITORIAL_PERSON_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: LEGAL_OWNER.name, url: "/sobre-vatioclaro" }],
  creator: LEGAL_OWNER.name,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    url: "/",
    title: "VatioClaro — Calcula y entiende tu consumo eléctrico",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/vatioclaro-hogar-energia-og.jpg",
        width: 1200,
        height: 630,
        alt: "VatioClaro — Calcula y entiende tu consumo eléctrico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VatioClaro — Calcula y entiende tu consumo eléctrico",
    description: SITE_DESCRIPTION,
    images: ["/images/vatioclaro-hogar-energia-og.jpg"],
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/apple-icon"),
      publishingPrinciples: absoluteUrl("/metodologia"),
    },
    {
      "@type": "Person",
      "@id": EDITORIAL_PERSON_ID,
      name: LEGAL_OWNER.name,
      url: absoluteUrl("/sobre-vatioclaro"),
      jobTitle: `Responsable editorial de ${SITE_NAME}`,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "es-ES",
      publisher: { "@id": `${SITE_URL}/#organization` },
      author: { "@id": EDITORIAL_PERSON_ID },
    },
  ],
};

const isVercelDeployment = process.env.VERCEL === "1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="es">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5290446197600060"
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
          type="application/ld+json"
        />
        <a className="skip-link" href="#contenido">
          Saltar al contenido principal
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        {isVercelDeployment ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
