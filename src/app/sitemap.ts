import type { MetadataRoute } from "next";
import { SEO_TOOLS } from "@/data/seo-tools";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://einvoice-xml-studio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const toolEntries: MetadataRoute.Sitemap = SEO_TOOLS.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...toolEntries,
  ];
}
