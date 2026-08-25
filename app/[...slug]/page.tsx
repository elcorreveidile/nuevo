// Ruta comodín que replica las URLs actuales de WordPress:
//   - Páginas (incluidas las traducciones bajo /en/…): resueltas por `path`.
//   - Entradas del blog (permalink /%postname%/): resueltas por `slug`.
// Las rutas más específicas (/, /category/[slug]) tienen prioridad sobre esta.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WpContent from "@/components/WpContent";
import { getAllPages, getAllPosts, getPageByPath, getPostBySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const pageParams = getAllPages()
    .filter((p) => p.path !== "")
    .map((p) => ({ slug: p.path.split("/") }));
  const postParams = getAllPosts().map((p) => ({ slug: [p.slug] }));
  return [...pageParams, ...postParams];
}

function resolve(slugSegments: string[]) {
  const path = slugSegments.join("/");
  const page = getPageByPath(path);
  if (page) return { kind: "page" as const, entry: page };
  if (slugSegments.length === 1) {
    const post = getPostBySlug(slugSegments[0]);
    if (post) return { kind: "post" as const, entry: post };
  }
  return undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) return {};
  const { entry } = resolved;
  const seo = "seo" in entry ? entry.seo : undefined;
  return {
    title: seo?.title ?? entry.title,
    description: seo?.description ?? entry.excerpt,
  };
}

export default async function WpCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) notFound();

  const { entry } = resolved;
  const locale = entry.locale;

  return (
    <>
      <Header locale={locale} />
      <main className="site-main">
        <h1>{entry.title}</h1>
        {"date" in entry && (
          <time dateTime={entry.date}>
            {new Date(entry.date).toLocaleDateString(locale === "en" ? "en-GB" : "es-ES")}
          </time>
        )}
        <WpContent html={entry.contentHtml} />
      </main>
      <Footer />
    </>
  );
}
