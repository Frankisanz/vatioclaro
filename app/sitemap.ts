import type { MetadataRoute } from "next";
import { appliances } from "@/lib/appliances";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vatioclaro.es";
  const updated = new Date("2026-07-27");

  return [
    {
      url: baseUrl,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/calculadora`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/metodologia`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...appliances.map((item) => ({
      url: `${baseUrl}/consumo/${item.slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
