// Tipos del contenido extraído de WordPress (subconjunto normalizado de wp-json).

export type Locale = "es" | "en";

export interface WpPage {
  id: number;
  /** Ruta completa relativa a la raíz, sin barras inicial/final. Ej.: "en/coopers-barrel-pub-in-estepona" */
  path: string;
  slug: string;
  locale: Locale;
  title: string;
  /** HTML renderizado por WordPress (content.rendered), ya saneado en extracción. */
  contentHtml: string;
  excerpt?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  featuredImage?: WpImage;
  modified?: string;
}

export interface WpPost {
  id: number;
  slug: string;
  locale: Locale;
  title: string;
  contentHtml: string;
  excerpt?: string;
  date: string;
  modified?: string;
  categories: string[]; // slugs
  featuredImage?: WpImage;
}

export interface WpCategory {
  id: number;
  slug: string;
  name: string;
  description?: string;
  count: number;
}

export interface WpImage {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface WpMenuItem {
  label: string;
  /** Ruta interna ("/", "/en/...") o URL absoluta si es externa. */
  href: string;
  children?: WpMenuItem[];
}

export interface WpMenu {
  slug: string;
  locale: Locale;
  items: WpMenuItem[];
}

export interface SiteInfo {
  name: string;
  description: string;
  url: string;
  defaultLocale: Locale;
  locales: Locale[];
}
