import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-light">Carrito</h1>
      <CartView />
    </section>
  );
}
