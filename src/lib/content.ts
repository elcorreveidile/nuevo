// Contenido y configuracion del sitio.
// Sustituye estos textos e imagenes por los reales del fotografo.
// Cuando conectes ImageKit, las imagenes de galeria vendran de la API/BD;
// de momento se sirven desde datos estaticos para tener el andamiaje funcional.

export const site = {
  name: "NEKOMORI",
  tagline: "Estudio de fotografia",
  description:
    "Portfolio de fotografia: comercial, cultura, naturaleza, personas y espacios.",
  email: "hola@ejemplo.com",
  social: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
  },
};

export type Category = {
  slug: string;
  title: string;
  blurb: string;
  cover: string; // ruta de imagen (public/ o URL de ImageKit)
};

// Orden y nombres replican la estructura del sitio de referencia.
export const categories: Category[] = [
  {
    slug: "commercial",
    title: "Comercial",
    blurb: "Producto, marca y campanas.",
    cover: "/images/placeholder/commercial.svg",
  },
  {
    slug: "culture",
    title: "Cultura",
    blurb: "Eventos, escena y patrimonio.",
    cover: "/images/placeholder/culture.svg",
  },
  {
    slug: "nature",
    title: "Naturaleza",
    blurb: "Paisaje y mundo natural.",
    cover: "/images/placeholder/nature.svg",
  },
  {
    slug: "people",
    title: "Personas",
    blurb: "Retrato y reportaje humano.",
    cover: "/images/placeholder/people.svg",
  },
  {
    slug: "spaces",
    title: "Espacios",
    blurb: "Arquitectura e interiorismo.",
    cover: "/images/placeholder/spaces.svg",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

// Galeria placeholder por categoria: N imagenes generadas.
// Cuando el panel de admin suba fotos a ImageKit, esto se reemplaza
// por una consulta a ImageKit/BD.
export function getGalleryImages(slug: string): { src: string; alt: string }[] {
  const cat = getCategory(slug);
  const count = 6;
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/placeholder/${slug}.svg`,
    alt: `${cat?.title ?? slug} — imagen ${i + 1}`,
  }));
}
