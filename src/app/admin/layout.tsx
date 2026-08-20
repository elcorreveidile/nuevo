import Link from "next/link";
import type { Metadata } from "next";
import LogoutButton from "@/components/LogoutButton";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-line bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-display text-xl tracking-widest-plus">
            NEKOMORI · Admin
          </Link>
          <nav className="flex items-center gap-6 text-sm text-muted">
            <Link href="/" className="hover:text-foreground">
              Ver sitio
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
