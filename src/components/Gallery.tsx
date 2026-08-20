import Image from "next/image";

type GalleryImage = { src: string; alt: string };

// Rejilla tipo mosaico. Preparada para recibir imagenes de ImageKit
// (basta con pasar URLs absolutas de ik.imagekit.io en `src`).
export default function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {images.map((img, i) => (
        <figure
          key={i}
          className="fade-up group relative overflow-hidden rounded-sm bg-line/40"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={900}
            height={1200}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </figure>
      ))}
    </div>
  );
}
