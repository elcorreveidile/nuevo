#!/usr/bin/env node
// Extracción de contenido de WordPress vía wp-json → /content/*.json
//
// Uso:
//   WP_API_URL=https://pubcoopersbarrel.com npm run extract
//
// - Pagina con ?per_page=100 y la cabecera X-WP-TotalPages.
// - Si un endpoint responde 401/403/404 (API capada), lo anota y conserva el
//   JSON local existente para ese recurso en lugar de vaciarlo.
// - /wp/v2/menus requiere autenticación en WP ≥ 5.9; si está bloqueado, los
//   menús se mantienen curados a mano en content/menus.json.
//
// NOTA: desde el entorno remoto de Claude Code el dominio está bloqueado por
// la política de red (ver MIGRATION.md). Ejecutar este script desde una
// máquina con acceso al sitio.

import fs from "node:fs";
import path from "node:path";

const WP_API_URL = (process.env.WP_API_URL ?? "https://pubcoopersbarrel.com").replace(/\/+$/, "");
const OUT_DIR = path.join(process.cwd(), "content");

async function fetchAllPaged(route) {
  const results = [];
  let page = 1;
  let totalPages = 1;
  do {
    const url = `${WP_API_URL}/wp-json${route}${route.includes("?") ? "&" : "?"}per_page=100&page=${page}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      throw Object.assign(new Error(`${res.status} ${res.statusText} en ${url}`), { status: res.status });
    }
    totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1");
    results.push(...(await res.json()));
    page += 1;
  } while (page <= totalPages);
  return results;
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/** Deriva la ruta pública de una página a partir de su `link` absoluto. */
function pathFromLink(link) {
  try {
    return new URL(link).pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return "";
  }
}

function localeFromPath(p) {
  return p === "en" || p.startsWith("en/") ? "en" : "es";
}

function writeJson(file, data) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, file), JSON.stringify(data, null, 2) + "\n");
  console.log(`✔ content/${file} (${Array.isArray(data) ? data.length + " elementos" : "ok"})`);
}

async function tryExtract(name, fn) {
  try {
    await fn();
  } catch (err) {
    console.warn(`✖ ${name}: ${err.message} — se conserva el JSON local existente.`);
  }
}

const mediaById = new Map();

await tryExtract("media", async () => {
  const media = await fetchAllPaged("/wp/v2/media");
  for (const m of media) {
    mediaById.set(m.id, {
      src: m.source_url,
      width: m.media_details?.width,
      height: m.media_details?.height,
      alt: m.alt_text || undefined,
    });
  }
  writeJson(
    "media.json",
    media.map((m) => ({
      id: m.id,
      src: m.source_url,
      width: m.media_details?.width,
      height: m.media_details?.height,
      alt: m.alt_text || undefined,
      mime: m.mime_type,
    })),
  );
});

await tryExtract("pages", async () => {
  const pages = await fetchAllPaged("/wp/v2/pages?status=publish");
  writeJson(
    "pages.json",
    pages.map((p) => {
      const pagePath = pathFromLink(p.link) || p.slug;
      return {
        id: p.id,
        path: pagePath,
        slug: p.slug,
        locale: localeFromPath(pagePath),
        title: stripHtml(p.title.rendered),
        contentHtml: p.content.rendered,
        excerpt: stripHtml(p.excerpt?.rendered ?? "") || undefined,
        featuredImage: mediaById.get(p.featured_media) ?? undefined,
        modified: p.modified,
      };
    }),
  );
});

let categoriesBySlug = new Map();

await tryExtract("categories", async () => {
  const cats = await fetchAllPaged("/wp/v2/categories");
  categoriesBySlug = new Map(cats.map((c) => [c.id, c.slug]));
  writeJson(
    "categories.json",
    cats.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.description || undefined,
      count: c.count,
    })),
  );
});

await tryExtract("posts", async () => {
  const posts = await fetchAllPaged("/wp/v2/posts?status=publish");
  writeJson(
    "posts.json",
    posts.map((p) => {
      const postPath = pathFromLink(p.link);
      return {
        id: p.id,
        slug: p.slug,
        locale: localeFromPath(postPath),
        title: stripHtml(p.title.rendered),
        contentHtml: p.content.rendered,
        excerpt: stripHtml(p.excerpt?.rendered ?? "") || undefined,
        date: p.date,
        modified: p.modified,
        categories: (p.categories ?? [])
          .map((id) => categoriesBySlug.get(id))
          .filter(Boolean),
        featuredImage: mediaById.get(p.featured_media) ?? undefined,
      };
    }),
  );
});

// Los menús (/wp/v2/menus, /wp/v2/menu-items) requieren autenticación por
// defecto. Se intenta por si el sitio los expone; si no, content/menus.json
// se mantiene a mano.
await tryExtract("menus", async () => {
  const items = await fetchAllPaged("/wp/v2/menu-items");
  console.log(`  (menu-items accesibles: ${items.length} — revisar y mapear a content/menus.json)`);
  writeJson("menu-items.raw.json", items);
});

console.log("Extracción terminada.");
