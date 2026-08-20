import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getProduct, formatPrice } from "@/lib/shop";
import AddToCart from "@/components/cart/AddToCart";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.title, description: p.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line/40">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-4xl font-light">{product.title}</h1>
          <p className="mt-3 text-2xl text-muted">
            {formatPrice(product.priceCents)}
          </p>
          <p className="mt-6 text-muted">{product.description}</p>

          <AddToCart product={product} />

          <p className="mt-6 text-xs text-muted">
            Envio en 5-7 dias laborables. Impresion bajo demanda.
          </p>
        </div>
      </div>
    </section>
  );
}
