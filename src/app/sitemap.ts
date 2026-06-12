import type { MetadataRoute } from "next";

const siteUrl =
  "https://dhruva05.github.io/DhruvaShekdar.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-06-12"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects/mini-dlss`,
      lastModified: new Date("2026-06-12"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
