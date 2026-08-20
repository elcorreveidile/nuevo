import Link from "next/link";
import Image from "next/image";
import { site, categories } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero a pantalla completa, protagonismo de la imagen */}
      <section className="relative flex h-[88vh] min-h-[560px] items-end overflow-hidden">
        <Image
          src="/images/placeholder/hero.svg"
          alt="Fotografia destacada"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <p className="fade-up text-xs uppercase tracking-widest-plus">
            {site.tagline}
          </p>
          <h1 className="fade-up mt-3 max-w-3xl font-display text-5xl font-light leading-tight md:text-7xl">
            Imagenes que cuentan historias
          </h1>
          <Link
            href="/portfolio/commercial"
            className="fade-up mt-8 inline-block border border-white/70 px-6 py-3 text-xs uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
          >
            Ver portfolio
          </Link>
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-light md:text-4xl">
            Categorias
          </h2>
          <Link
            href="/about-me"
            className="text-xs uppercase tracking-widest text-muted hover:text-foreground"
          >
            Sobre mi →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/portfolio/${c.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-line/40"
            >
              <Image
                src={c.cover}
                alt={c.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p className="text-sm text-white/80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
