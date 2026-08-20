import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products, formatPrice } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Laminas fine-art en edicion limitada.",
};

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest-plus text-muted">
          Tienda
        </p>
        <h1 className="mt-2 font-display text-4xl font-light md:text-5xl">
          Laminas fine-art
        </h1>
        <p className="mt-2 text-muted">
          Ediciones limitadas, impresas y firmadas.
        </p>
      </header>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link key={p.slug} href={`/shop/${p.slug}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line/40">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <h2 className="text-sm">{p.title}</h2>
              <span className="text-sm text-muted">
                {formatPrice(p.priceCents)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
