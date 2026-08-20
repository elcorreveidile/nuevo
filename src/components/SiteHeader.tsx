"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site, categories } from "@/lib/content";
import { useCart } from "@/components/cart/CartContext";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/portfolio/commercial", label: "Portfolio" },
  { href: "/about-me", label: "Sobre mi" },
  { href: "/shop", label: "Tienda" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl tracking-widest-plus"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href.split("/").slice(0, 2).join("/"));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`uppercase tracking-widest transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/shop/cart"
            className="uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            Carrito{count > 0 ? ` (${count})` : ""}
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-px w-6 bg-foreground" />
          <span className="mt-1.5 block h-px w-6 bg-foreground" />
          <span className="mt-1.5 block h-px w-6 bg-foreground" />
        </button>
      </div>

      {open && (
        <div className="border-t border-line md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm uppercase tracking-widest text-muted"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-line pt-3 text-xs uppercase tracking-widest text-muted">
              Categorias
            </div>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/portfolio/${c.slug}`}
                onClick={() => setOpen(false)}
                className="py-1.5 text-sm text-muted"
              >
                {c.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
