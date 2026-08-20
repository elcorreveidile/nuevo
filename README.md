# NEKOMORI — Portfolio de fotografia

Andamiaje de un sitio de estudio de fotografia inspirado en la **estructura y
la stack tecnica** del sitio de referencia (Next.js + ImageKit), reconstruido
desde cero con contenido propio.

> Diseno y textos son **placeholder**: sustituye imagenes, colores y copys por
> los reales del estudio. Las fotografias del sitio de referencia son de su
> autor y **no** se incluyen aqui.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS v4**
- **ImageKit** para entrega y subida de imagenes
- Preparado para desplegar en **Cloudflare Workers** (OpenNext) o Vercel

## Estructura

```
src/
  app/
    (site)/                 # Sitio publico (header + footer + carrito)
      page.tsx              # Home (hero + categorias)
      about-me/             # Sobre mi
      portfolio/[category]/ # Galerias: commercial, culture, nature, people, spaces
      shop/                 # Tienda
        [slug]/             # Ficha de producto
        cart/               # Carrito
    admin/                  # Panel de administracion (protegido)
      login/                # Acceso por contrasena
    api/
      upload/               # Subida de fotos a ImageKit (server)
      admin/login/          # Login / logout
      checkout/             # Stub de pago (Stripe pendiente)
  components/               # Header, Footer, Gallery, Uploader, carrito…
  lib/                      # content.ts, shop.ts, imagekit.ts, auth.ts
  middleware.ts             # Protege /admin
```

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # rellena tus claves
npm run dev                  # http://localhost:3000
```

### Variables de entorno

Ver `.env.example`. Mínimo para desarrollo del sitio publico: ninguna.
Para el **panel de admin** y la **subida**: `ADMIN_PASSWORD`,
`IMAGEKIT_PRIVATE_KEY`, `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`,
`NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`.

## Estado y proximos pasos

Implementado (scaffold funcional):

- [x] Home, sobre mi y galerias por categoria
- [x] Panel de admin con login por contrasena y subida de fotos a ImageKit
- [x] Tienda: catalogo, ficha, carrito con persistencia en localStorage

Pendiente (siguientes iteraciones):

- [ ] **Persistencia**: guardar en BD las fotos subidas (orden, titulo,
      categoria) y leer las galerias desde ahi en lugar de datos estaticos.
- [ ] **Auth real**: sustituir la contrasena compartida por NextAuth/Clerk.
- [ ] **Pagos**: integrar Stripe Checkout en `/api/checkout`.
- [ ] Gestion de imagenes en el admin (listar, reordenar, borrar).

## Nota legal

Proyecto reconstruido a peticion del propietario del sitio original. Usa
unicamente contenido y marca propios; no incluye fotografias ni activos de
terceros.
