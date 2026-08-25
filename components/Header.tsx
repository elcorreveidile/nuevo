import Link from "next/link";
import { getMenu, getSiteInfo } from "@/lib/content";
import type { Locale } from "@/lib/types";

export default function Header({ locale = "es" }: { locale?: Locale }) {
  const site = getSiteInfo();
  const menu = getMenu(locale === "en" ? "principal-en" : "principal");

  return (
    <header className="site-header">
      <Link href="/" className="site-brand">
        {site.name}
      </Link>
      <nav aria-label={locale === "en" ? "Main navigation" : "Navegación principal"}>
        <ul className="site-nav">
          {menu?.items.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
