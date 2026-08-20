// Helpers de ImageKit (lado servidor).
// La clave privada NUNCA se expone al cliente: solo se usa en rutas de API.

const UPLOAD_ENDPOINT = "https://upload.imagekit.io/api/v1/files/upload";

export function imagekitConfigured(): boolean {
  return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
}

export type UploadResult = {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  filePath: string;
  height?: number;
  width?: number;
};

/**
 * Sube un fichero a ImageKit usando la API de upload (auth Basic con la
 * clave privada). Devuelve la URL publica en ik.imagekit.io.
 */
export async function uploadToImageKit(
  file: File,
  opts: { fileName: string; folder?: string; tags?: string[] }
): Promise<UploadResult> {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error(
      "IMAGEKIT_PRIVATE_KEY no configurada. Anade tus credenciales en .env.local"
    );
  }

  const form = new FormData();
  form.append("file", file);
  form.append("fileName", opts.fileName);
  form.append("useUniqueFileName", "true");
  if (opts.folder) form.append("folder", opts.folder);
  if (opts.tags?.length) form.append("tags", opts.tags.join(","));

  const auth = Buffer.from(`${privateKey}:`).toString("base64");

  const res = await fetch(UPLOAD_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}` },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ImageKit upload fallo (${res.status}): ${text}`);
  }

  return (await res.json()) as UploadResult;
}
