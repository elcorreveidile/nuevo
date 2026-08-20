// Catalogo de la tienda (datos de ejemplo).
// Sustituir por productos reales; a futuro, mover a una BD/CMS y conectar
// pagos con Stripe.

export type Product = {
  slug: string;
  title: string;
  description: string;
  priceCents: number; // en centimos de EUR
  image: string;
  sizes?: string[];
};

export const currency = "EUR";

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export const products: Product[] = [
  {
    slug: "print-nature-01",
    title: "Lamina · Naturaleza 01",
    description:
      "Impresion fine-art en papel algodon. Edicion limitada, firmada y numerada.",
    priceCents: 4500,
    image: "/images/placeholder/nature.svg",
    sizes: ["A4", "A3", "A2"],
  },
  {
    slug: "print-spaces-01",
    title: "Lamina · Espacios 01",
    description: "Impresion fine-art de arquitectura. Papel mate premium.",
    priceCents: 4500,
    image: "/images/placeholder/spaces.svg",
    sizes: ["A4", "A3", "A2"],
  },
  {
    slug: "print-people-01",
    title: "Lamina · Personas 01",
    description: "Retrato en edicion limitada. Impresion de galeria.",
    priceCents: 5500,
    image: "/images/placeholder/people.svg",
    sizes: ["A4", "A3"],
  },
  {
    slug: "print-culture-01",
    title: "Lamina · Cultura 01",
    description: "Escena cultural. Impresion fine-art firmada.",
    priceCents: 4500,
    image: "/images/placeholder/culture.svg",
    sizes: ["A4", "A3", "A2"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
