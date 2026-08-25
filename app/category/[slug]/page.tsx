// Archivo de categoría, equivalente a /category/<slug>/ en WordPress
// (p. ej. /category/uncategorized/, indexado en el sitio actual).

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return category ? { title: `Archivo: ${category.name}` } : {};
}

export default async function CategoryArchivePage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <>
      <Header />
      <main className="site-main">
        <h1>{category.name}</h1>
        {posts.length === 0 ? (
          <p>No hay entradas en esta categoría.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </main>
      <Footer />
    </>
  );
}
