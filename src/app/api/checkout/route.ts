import { NextResponse } from "next/server";

// Stub de checkout. Pendiente de integrar Stripe:
//  1. npm i stripe @stripe/stripe-js
//  2. Crear una Checkout Session con los line_items del carrito.
//  3. Redirigir a session.url y manejar el webhook de confirmacion.
// Ver https://stripe.com/docs/payments/checkout
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Pago aun no configurado. Conecta Stripe (STRIPE_SECRET_KEY) para finalizar la compra.",
    },
    { status: 501 }
  );
}
