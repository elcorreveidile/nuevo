"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/shop";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes?.[0]);
  const [added, setAdded] = useState(false);

  function onAdd() {
    add({
      slug: product.slug,
      title: product.title,
      priceCents: product.priceCents,
      image: product.image,
      size,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mt-8">
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-4">
          <span className="mb-2 block text-xs uppercase tracking-widest text-muted">
            Tamano
          </span>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`border px-4 py-2 text-sm transition-colors ${
                  size === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-line hover:border-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onAdd}
        className="w-full bg-foreground px-6 py-4 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90 sm:w-auto"
      >
        {added ? "Anadido ✓" : "Anadir al carrito"}
      </button>
    </div>
  );
}
