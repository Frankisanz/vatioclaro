import type { MetadataRoute } from "next";
import { appliances, getApplianceUpdatedAt } from "@/lib/appliances";
import { buyingGuides } from "@/lib/buying-guides";
import { editorialGuides } from "@/lib/editorial-guides";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Cada página estática mantiene su propia fecha de última revisión de
// contenido: al editar una página, actualiza solo su `updatedAt`.
const staticPages = [
  {
    path: "/",
    priority: 1,
    frequency: "weekly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/calculadora",
    priority: 0.9,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/calculadora/comparar",
    priority: 0.8,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/calculadora/standby",
    priority: 0.8,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/calculadora/etiqueta-energetica",
    priority: 0.8,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/calculadora/amortizacion",
    priority: 0.8,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/comparativas",
    priority: 0.85,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/consumo",
    priority: 0.9,
    frequency: "weekly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/consumo/electrodomesticos-que-mas-consumen",
    priority: 0.85,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/guias",
    priority: 0.8,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/recomendaciones",
    priority: 0.85,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/guias/como-calcular-consumo-electrico",
    priority: 0.85,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/guias/consumo-fantasma",
    priority: 0.8,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/metodologia",
    priority: 0.6,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
  {
    path: "/sobre-vatioclaro",
    priority: 0.5,
    frequency: "monthly" as const,
    updatedAt: CONTENT_UPDATED_AT,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map((page) => ({
      // La portada se emite sin barra final para coincidir con su canonical.
      url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: page.frequency,
      priority: page.priority,
    })),
    ...appliances.filter((item) => item.indexable).map((item) => ({
      url: `${SITE_URL}/consumo/${item.slug}`,
      lastModified: new Date(getApplianceUpdatedAt(item)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...editorialGuides.filter((guide) => guide.indexable).map((guide) => ({
      url: `${SITE_URL}/guias/${guide.slug}`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...buyingGuides.filter((guide) => guide.indexable).map((guide) => ({
      url: `${SITE_URL}/recomendaciones/${guide.slug}`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
  ];
}
