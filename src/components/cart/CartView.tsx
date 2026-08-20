"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/shop";

export default function CartView() {
  const { items, subtotalCents, setQty, remove, clear, keyOf } = useCart();
  const [checkoutMsg, setCheckoutMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setLoading(true);
    setCheckoutMsg("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    setCheckoutMsg(
      data.message ?? "Pago aun no configurado. Conecta Stripe para finalizar."
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-8 text-muted">
        <p>Tu carrito esta vacio.</p>
        <Link
          href="/shop"
          className="mt-4 inline-block underline underline-offset-4"
        >
          Ver la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item) => {
          const k = keyOf(item);
          return (
            <li key={k} className="flex gap-4 py-5">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-line/40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm">{item.title}</p>
                    {item.size && (
                      <p className="text-xs text-muted">Tamano: {item.size}</p>
                    )}
                  </div>
                  <p className="text-sm">
                    {formatPrice(item.priceCents * item.qty)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={(e) => setQty(k, Number(e.target.value))}
                    className="w-16 border border-line px-2 py-1 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => remove(k)}
                    className="text-xs uppercase tracking-widest text-muted hover:text-foreground"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={clear}
          className="text-xs uppercase tracking-widest text-muted hover:text-foreground"
        >
          Vaciar carrito
        </button>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-muted">
            Subtotal
          </p>
          <p className="font-display text-2xl">{formatPrice(subtotalCents)}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={checkout}
        disabled={loading}
        className="mt-6 w-full bg-foreground px-6 py-4 text-xs uppercase tracking-widest text-background disabled:opacity-50"
      >
        {loading ? "Procesando…" : "Finalizar compra"}
      </button>

      {checkoutMsg && (
        <p className="mt-3 rounded-sm border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {checkoutMsg}
        </p>
      )}
    </div>
  );
}
