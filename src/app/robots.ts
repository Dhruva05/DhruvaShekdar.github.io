import type { MetadataRoute } from "next";

const siteUrl =
  "https://dhruva05.github.io/DhruvaShekdar.github.io";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
