import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/auth";
import { imagekitConfigured, uploadToImageKit } from "@/lib/imagekit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Autorizacion
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  if (!imagekitConfigured()) {
    return NextResponse.json(
      {
        error:
          "ImageKit no configurado. Anade IMAGEKIT_PRIVATE_KEY (y las claves publicas) en .env.local",
      },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const category = String(formData.get("category") ?? "uploads");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibio ningun fichero." }, { status: 400 });
  }

  try {
    const result = await uploadToImageKit(file, {
      fileName: file.name,
      folder: `/portfolio/${category}`,
      tags: [category],
    });
    return NextResponse.json({ ok: true, file: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
