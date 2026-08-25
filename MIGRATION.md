# Migración WordPress → Next.js — pubcoopersbarrel.com

Cliente: **wordNext** · Fecha de auditoría: 2026-08-25

## Fase 1 — Auditoría de la web actual

### ⚠️ Limitación de la auditoría: acceso de red bloqueado

Pese a lo indicado en el encargo, el entorno de ejecución de esta sesión **no
tiene `pubcoopersbarrel.com` en la allowlist de red**. Todos los intentos de
acceso directo fallaron:

- `curl https://pubcoopersbarrel.com` → `403 Forbidden` del proxy de egreso
  (`CONNECT` rechazado: *"gateway answered 403 to CONNECT (policy denial)"*).
- Ídem para `www.pubcoopersbarrel.com`.
- La herramienta de fetch del agente devuelve `EGRESS_BLOCKED` para el dominio.
- Vías indirectas (web.archive.org, urlscan.io) también bloqueadas: la política
  de red solo permite infraestructura de desarrollo (npm, GitHub, PyPI…).

En consecuencia, **los puntos 1–3 y 5 de la Fase 1 (headers, HTML de portada,
meta generator, tema, plugins, wp-json, sitemap, robots.txt) no se han podido
ejecutar** y quedan pendientes de repetir desde una máquina con acceso al
sitio (ver *Pendiente* más abajo). Lo que sigue es lo verificable por fuentes
indirectas (resultados indexados en buscadores).

### Lo verificado por fuentes indirectas

| Aspecto | Hallazgo | Fuente |
|---|---|---|
| CMS | WordPress (título indexado: *"pubcoopersbarrel.com \| Otro sitio realizado con WordPress"* — tagline por defecto en español) | Índice de buscador |
| Negocio | **PUB COOPER'S BARREL**, pub inglés en el centro histórico de Estepona (Málaga). Vinculado al grupo Maravilla 1882 / Hotel El Pilar Andalucía | grupomaravilla1882.com, hotelelpilarandalucia.com |
| Idiomas | Español (por defecto, en raíz) + inglés bajo prefijo de directorio `/en/` → indicio de plugin multiidioma (WPML / Polylang / TranslatePress) **sin confirmar cuál** | URL indexada `/en/coopers-barrel-pub-in-estepona/` |
| Páginas indexadas | Portada `/` (ES) y `/en/coopers-barrel-pub-in-estepona/` (EN) | Índice de buscador |
| Blog | Existe el archivo `/category/uncategorized/` indexado → estructura de blog activa, permalinks de categoría con base `/category/` | Índice de buscador |
| Permalinks | La página EN usa `/%postname%/`-style bajo `/en/`; consistente con permalinks "Nombre de la entrada" | URLs indexadas |
| Contenido conocido | Pub inglés: cervezas artesanales, cócteles, deporte y música en directo. Horario: Do–Ju 16:00–00:00, Vi–Sá 17:00–02:00 | Descripciones indexadas |
| Tema | Indicio previo de **Bridge (Qode Interactive)** — **SIN CONFIRMAR** (requiere acceso al HTML) | Encargo del cliente |
| Versión WP | Desconocida (meta generator inaccesible) | — |
| Plugins | Desconocidos (HTML y wp-json inaccesibles) | — |
| wp-json | Estado desconocido (no se pudo comprobar qué endpoints están abiertos) | — |
| Medios | Número y peso desconocidos | — |
| CPT / taxonomías | Desconocidos; solo consta la taxonomía `category` con el término por defecto `uncategorized` | — |

El tagline por defecto sin cambiar ("Otro sitio realizado con WordPress")
sugiere una instalación poco personalizada a nivel de ajustes, lo que suele
correlacionar con un sitio pequeño (pocas páginas, poco o ningún blog real).

### Checklist pendiente de auditoría directa

Ejecutar desde una máquina con acceso al sitio (o pedir que se corrija la
allowlist del entorno) y actualizar este documento:

```bash
curl -sIL https://pubcoopersbarrel.com                      # redirecciones www/no-www, servidor, caché
curl -s https://pubcoopersbarrel.com | grep -Eio 'generator[^>]+|themes/[a-z0-9_-]+|plugins/[a-z0-9_-]+' | sort -u
curl -s https://pubcoopersbarrel.com/wp-json/ | head -c 2000
curl -s "https://pubcoopersbarrel.com/wp-json/wp/v2/pages?per_page=100"
curl -s "https://pubcoopersbarrel.com/wp-json/wp/v2/posts?per_page=100"
curl -s "https://pubcoopersbarrel.com/wp-json/wp/v2/media?per_page=100"
curl -s "https://pubcoopersbarrel.com/wp-json/wp/v2/menus"   # suele requerir auth
curl -s https://pubcoopersbarrel.com/sitemap.xml            # o /sitemap_index.xml (Yoast/RankMath)
curl -s https://pubcoopersbarrel.com/robots.txt
```

En particular: confirmar tema Bridge, detectar Elementor/WPBakery (Bridge usa
WPBakery normalmente), WooCommerce, formularios (CF7/WPForms), SEO
(Yoast/RankMath), multiidioma (WPML/Polylang) y plugins de reservas.

## Fase 2 — Esqueleto Next.js

### Stack y decisiones

- **Next.js 15, App Router, TypeScript**, sin dependencias extra por ahora.
- **Contenido local-first**: el build lee siempre de `content/*.json`
  (builds deterministas, sin red). `npm run extract`
  (`scripts/extract-wp-content.mjs`) regenera esos JSON desde
  `wp-json/wp/v2/{pages,posts,media,categories,menu-items}` con paginación
  `per_page=100`; si un endpoint está capado (401/403/404) lo anota y conserva
  el JSON local. **Decisión tomada por la API inaccesible desde este entorno**:
  es exactamente la vía de contingencia prevista en el encargo ("volcado a
  JSON local si la API está capada").
- **Rutas espejo de las URLs actuales** (con `trailingSlash: true` para
  preservar las URLs de WP sin redirecciones):
  - `/` → portada (ES).
  - `app/[...slug]` → páginas WP por su ruta completa (cubre `/en/...` para
    las traducciones) y entradas de blog por slug.
  - `/category/[slug]/` → archivos de categoría (p. ej. `uncategorized`).
  - `sitemap.xml` y `robots.txt` generados desde el contenido.
- **Multiidioma**: modelado como campo `locale` en el contenido y rutas `/en/…`
  espejo de las de WP (sin `i18n` de framework por ahora; si al confirmar el
  plugin multiidioma hay más idiomas o hreflang, evaluar `next-intl`).
- **Imágenes**: `next/image` con `remotePatterns` apuntando al dominio WP de
  origen durante la transición; el volcado real de medios (descarga a
  `public/` o subida a CDN) queda pendiente de la auditoría de medios.
- **Contenido provisional**: `content/pages.json` lleva las dos páginas
  conocidas con texto placeholder marcado como
  `[CONTENIDO PROVISIONAL — pendiente de extracción real vía wp-json]`.
  `posts.json` y `media.json` están vacíos a la espera de la extracción.
- Los menús (`content/menus.json`) están curados a mano (el endpoint
  `/wp/v2/menu-items` requiere autenticación por defecto en WP ≥ 5.9).

### Estructura

```
app/                  Rutas (App Router)
  page.tsx            Portada (ES)
  [...slug]/          Páginas WP (incl. /en/…) y entradas por slug
  category/[slug]/    Archivos de categoría
  sitemap.ts, robots.ts, not-found.tsx
components/           Header, Footer, WpContent (HTML de WP), PostCard
content/              Volcado JSON del contenido (fuente del build)
lib/                  Tipos + acceso al contenido
scripts/              extract-wp-content.mjs (wp-json → content/)
```

## Pendiente de decisión humana

1. **Acceso de red**: corregir la allowlist del entorno (o auditar desde otra
   máquina) y completar la checklist de la Fase 1.
2. **Repo de destino**: el encargo pedía `elcorreveidile/pruebas` (rama
   `claude/wordpress-nextjs-migration-bkhhti`), pero esta sesión está
   restringida a `elcorreveidile/nuevo` (rama
   `claude/wordpress-nextjs-migration-06xnos`). Confirmar destino final y
   mover si procede.
3. **Diseño**: ¿replicar el tema actual (¿Bridge?) o rediseñar? Los estilos
   actuales son un placeholder mínimo.
4. **Contenido no extraíble automáticamente**: si el sitio usa un page builder
   (WPBakery/Elementor, habitual con Bridge), `content.rendered` traerá HTML
   con shortcodes/markup del builder que habrá que transformar a componentes.
5. **Dominio de imágenes**: mantener los medios servidos desde WP, descargarlos
   a `public/`, o subirlos a un CDN (afecta a `next.config.ts`).
6. **Formularios y reservas**: si la auditoría confirma CF7/WPForms o un plugin
   de reservas, decidir el reemplazo (API route + proveedor de email, etc.).
7. **Multiidioma**: confirmar plugin e idiomas reales y decidir si se adopta
   `next-intl` con hreflang.
