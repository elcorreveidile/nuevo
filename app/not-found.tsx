import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="site-main">
        <h1>Página no encontrada</h1>
        <p>
          La página que buscas no existe. <Link href="/">Volver a la portada</Link>.
        </p>
      </main>
      <Footer />
    </>
  );
}
