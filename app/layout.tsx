import type { Metadata } from "next";
import { getSiteInfo } from "@/lib/content";
import "./globals.css";

const site = getSiteInfo();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
