import type { MetadataRoute } from "next";
import { appliances, getApplianceUpdatedAt } from "@/lib/appliances";
import { buyingGuides } from "@/lib/buying-guides";
import { editorialGuides } from "@/lib/editorial-guides";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";

const staticPages = [
  { path: "/", priority: 1, frequency: "weekly" as const },
  { path: "/calculadora", priority: 0.9, frequency: "monthly" as const },
  {
    path: "/calculadora/comparar",
    priority: 0.8,
    frequency: "monthly" as const,
  },
  {
    path: "/calculadora/standby",
    priority: 0.8,
    frequency: "monthly" as const,
  },
  {
    path: "/calculadora/etiqueta-energetica",
    priority: 0.8,
    frequency: "monthly" as const,
  },
  {
    path: "/calculadora/amortizacion",
    priority: 0.8,
    frequency: "monthly" as const,
  },
  { path: "/comparativas", priority: 0.85, frequency: "monthly" as const },
  { path: "/consumo", priority: 0.9, frequency: "weekly" as const },
  {
    path: "/consumo/electrodomesticos-que-mas-consumen",
    priority: 0.85,
    frequency: "monthly" as const,
  },
  { path: "/guias", priority: 0.8, frequency: "monthly" as const },
  {
    path: "/recomendaciones",
    priority: 0.85,
    frequency: "monthly" as const,
  },
  {
    path: "/guias/como-calcular-consumo-electrico",
    priority: 0.85,
    frequency: "monthly" as const,
  },
  {
    path: "/guias/consumo-fantasma",
    priority: 0.8,
    frequency: "monthly" as const,
  },
  { path: "/metodologia", priority: 0.6, frequency: "monthly" as const },
  { path: "/sobre-vatioclaro", priority: 0.5, frequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: new Date(CONTENT_UPDATED_AT),
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
