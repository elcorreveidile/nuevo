import { getSiteInfo } from "@/lib/content";

export default function Footer() {
  const site = getSiteInfo();
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {site.name} · Estepona
      </p>
    </footer>
  );
}
