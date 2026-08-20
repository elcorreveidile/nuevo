import Uploader from "@/components/Uploader";
import { categories } from "@/lib/content";
import { imagekitConfigured } from "@/lib/imagekit";

export default function AdminHome() {
  const configured = imagekitConfigured();

  return (
    <div>
      <h1 className="font-display text-3xl">Panel de administracion</h1>
      <p className="mt-2 text-sm text-muted">
        Sube fotografias al portfolio. Se almacenan en ImageKit, en la carpeta
        de la categoria elegida.
      </p>

      {!configured && (
        <div className="mt-6 rounded-sm border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          ImageKit aun no esta configurado. Anade{" "}
          <code>IMAGEKIT_PRIVATE_KEY</code> y las claves publicas en{" "}
          <code>.env.local</code> para activar la subida.
        </div>
      )}

      <div className="mt-8">
        <Uploader categories={categories.map((c) => ({ slug: c.slug, title: c.title }))} />
      </div>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="font-display text-xl">Proximos pasos</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>
            Persistir metadatos de cada foto (orden, titulo, categoria) en una
            base de datos para controlarlos desde aqui.
          </li>
          <li>Sustituir la autenticacion por contrasena por NextAuth/Clerk.</li>
          <li>Listar, reordenar y borrar imagenes ya subidas.</li>
        </ul>
      </section>
    </div>
  );
}
