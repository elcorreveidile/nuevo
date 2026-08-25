import type { MetadataRoute } from "next";
import { getAllCategories, getAllPages, getAllPosts, getSiteInfo } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteInfo().url;
  return [
    ...getAllPages().map((p) => ({
      url: `${base}/${p.path}${p.path ? "/" : ""}`,
      lastModified: p.modified ? new Date(p.modified) : undefined,
    })),
    ...getAllPosts().map((p) => ({
      url: `${base}/${p.slug}/`,
      lastModified: new Date(p.modified ?? p.date),
    })),
    ...getAllCategories().map((c) => ({ url: `${base}/category/${c.slug}/` })),
  ];
}
