import Link from "next/link";
import { site, categories } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl tracking-widest-plus">
            {site.name}
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">{site.description}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm underline underline-offset-4"
          >
            {site.email}
          </a>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted">
            Portfolio
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="text-muted hover:text-foreground"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted">Redes</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-foreground"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-foreground"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-6 text-xs text-muted md:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </span>
          <span>
            Hecho con Next.js — <Link href="/admin">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
