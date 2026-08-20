import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

// Protege /admin/* comprobando la presencia de la cookie de sesion.
// La verificacion criptografica del token se hace en el servidor
// (rutas de API y componentes de servidor), no aqui en el Edge.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // La pagina de login es publica.
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const hasCookie = req.cookies.has(ADMIN_COOKIE);
    if (!hasCookie) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
