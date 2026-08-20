import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import {
  categories,
  getCategory,
  getGalleryImages,
} from "@/lib/content";

// Pre-genera las rutas de cada categoria (SSG), como el sitio de referencia.
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const images = getGalleryImages(category);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest-plus text-muted">
          Portfolio
        </p>
        <h1 className="mt-2 font-display text-4xl font-light md:text-5xl">
          {cat.title}
        </h1>
        <p className="mt-2 text-muted">{cat.blurb}</p>
      </header>

      {/* Navegacion entre categorias */}
      <nav className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-4 text-sm">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/portfolio/${c.slug}`}
            className={`uppercase tracking-widest transition-colors hover:text-foreground ${
              c.slug === category ? "text-foreground" : "text-muted"
            }`}
          >
            {c.title}
          </Link>
        ))}
      </nav>

      <Gallery images={images} />
    </section>
  );
}
