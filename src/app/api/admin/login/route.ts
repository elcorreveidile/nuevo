import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminConfigured, checkPassword, makeToken } from "@/lib/auth";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD no configurada en el servidor." },
      { status: 500 }
    );
  }

  const { password } = await req.json().catch(() => ({ password: "" }));

  if (!checkPassword(String(password ?? ""))) {
    return NextResponse.json({ error: "Contrasena incorrecta." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
