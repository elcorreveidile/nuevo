import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre mi",
  description: `Conoce a ${site.name}, ${site.tagline.toLowerCase()}.`,
};

export default function AboutMePage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line/40">
          <Image
            src="/images/placeholder/people.svg"
            alt="Retrato del fotografo"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest-plus text-muted">
            Sobre mi
          </p>
          <h1 className="mt-3 font-display text-4xl font-light md:text-5xl">
            Hola, soy {site.name}
          </h1>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              [Texto placeholder] Fotografo especializado en trabajo comercial,
              cultura, naturaleza, personas y espacios. Sustituye este texto por
              la biografia real, trayectoria y enfoque del estudio.
            </p>
            <p>
              Colaboro con marcas, instituciones y particulares para crear
              imagenes con intencion. Cada proyecto parte de una conversacion.
            </p>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block border border-foreground px-6 py-3 text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
          >
            Trabajemos juntos
          </a>
        </div>
      </div>
    </section>
  );
}
