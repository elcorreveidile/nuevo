"use client";

import { useState } from "react";
import Image from "next/image";

type Cat = { slug: string; title: string };
type Uploaded = { url: string; name: string };

export default function Uploader({ categories }: { categories: Cat[] }) {
  const [category, setCategory] = useState(categories[0]?.slug ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Uploaded[]>([]);

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", category);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Error al subir.");
          continue;
        }
        setDone((d) => [{ url: data.file.url, name: data.file.name }, ...d]);
      } catch {
        setError("Error de red al subir.");
      }
    }
    setBusy(false);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <label className="text-sm">
          <span className="mb-1 block text-xs uppercase tracking-widest text-muted">
            Categoria
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-line bg-background px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label
        className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-line px-6 py-16 text-center transition-colors hover:border-foreground ${
          busy ? "opacity-60" : ""
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={busy}
          onChange={(e) => onFiles(e.target.files)}
        />
        <span className="font-display text-xl">
          {busy ? "Subiendo…" : "Arrastra o selecciona imagenes"}
        </span>
        <span className="mt-1 text-sm text-muted">
          JPG, PNG o WEBP · varias a la vez
        </span>
      </label>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {done.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xs uppercase tracking-widest text-muted">
            Subidas ({done.length})
          </h3>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {done.map((u, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-sm bg-line/40"
              >
                <Image
                  src={u.url}
                  alt={u.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
