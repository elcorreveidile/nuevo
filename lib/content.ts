// Acceso al contenido volcado en /content/*.json.
//
// El build de Next lee SIEMPRE de estos JSON locales (builds deterministas y
// sin dependencia de red). El script `npm run extract` los regenera desde
// wp-json cuando el WordPress de origen es accesible. Ver MIGRATION.md.

import fs from "node:fs";
import path from "node:path";
import type { SiteInfo, WpCategory, WpMenu, WpPage, WpPost } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(file: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  return JSON.parse(raw) as T;
}

export function getSiteInfo(): SiteInfo {
  return readJson<SiteInfo>("site.json");
}

export function getAllPages(): WpPage[] {
  return readJson<WpPage[]>("pages.json");
}

export function getPageByPath(pathname: string): WpPage | undefined {
  const normalized = pathname.replace(/^\/+|\/+$/g, "");
  return getAllPages().find((p) => p.path === normalized);
}

export function getAllPosts(): WpPost[] {
  return readJson<WpPost[]>("posts.json").sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function getPostBySlug(slug: string): WpPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllCategories(): WpCategory[] {
  return readJson<WpCategory[]>("categories.json");
}

export function getCategoryBySlug(slug: string): WpCategory | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}

export function getPostsByCategory(slug: string): WpPost[] {
  return getAllPosts().filter((p) => p.categories.includes(slug));
}

export function getMenu(slug: string): WpMenu | undefined {
  return readJson<WpMenu[]>("menus.json").find((m) => m.slug === slug);
}
