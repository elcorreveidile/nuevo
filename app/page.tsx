import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WpContent from "@/components/WpContent";
import { getPageByPath } from "@/lib/content";

const home = getPageByPath("/");

export const metadata: Metadata = {
  title: home?.seo?.title ?? home?.title,
  description: home?.seo?.description ?? home?.excerpt,
};

export default function HomePage() {
  if (!home) {
    return <main className="site-main">Contenido de portada pendiente de extracción.</main>;
  }
  return (
    <>
      <Header locale="es" />
      <main className="site-main">
        <h1>{home.title}</h1>
        <WpContent html={home.contentHtml} />
      </main>
      <Footer />
    </>
  );
}
