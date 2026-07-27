import type { MetadataRoute } from "next";
import { appliances, getApplianceUpdatedAt } from "@/lib/appliances";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/site";

const staticPages = [
  { path: "/", priority: 1, frequency: "weekly" as const },
  { path: "/calculadora", priority: 0.9, frequency: "monthly" as const },
  { path: "/consumo", priority: 0.9, frequency: "weekly" as const },
  {
    path: "/consumo/electrodomesticos-que-mas-consumen",
    priority: 0.85,
    frequency: "monthly" as const,
  },
  { path: "/guias", priority: 0.8, frequency: "monthly" as const },
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
    ...appliances.map((item) => ({
      url: `${SITE_URL}/consumo/${item.slug}`,
      lastModified: new Date(getApplianceUpdatedAt(item)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
