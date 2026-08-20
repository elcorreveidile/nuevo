// Autenticacion minima para el scaffold del panel de admin.
// SUSTITUIR por una solucion real (NextAuth, Clerk, Auth.js) antes de produccion.
// Aqui solo comprobamos una contrasena compartida (ADMIN_PASSWORD) y firmamos
// una cookie httpOnly con un token derivado.

import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "nk_admin";

function secret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function adminConfigured(): boolean {
  return secret().length > 0;
}

// Token = HMAC de una cadena fija con la contrasena como clave.
export function makeToken(): string {
  return createHmac("sha256", secret()).update("nekomori-admin").digest("hex");
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const expected = makeToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function checkPassword(password: string): boolean {
  const s = secret();
  if (!s) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(s);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
