# Personas, Animales y Cosas — Juan Vida

Web de sala para la exposición de pintura de **Juan Vida** (Granada, 1955),
*Personas, Animales y Cosas · 1988–2025*, en la Sala Pescadería Vieja de
Jerez de la Frontera (4 sept – 10 oct 2026).

## Qué es

Es una página web estática de un solo archivo (`index.html`) con:

- Galería de 14 obras filtrable por categoría (personas, animales, cosas).
- Ampliación de cada obra en *lightbox* con su descripción y sus etiquetas.
- Imágenes incrustadas en el propio archivo, así que no necesita nada más
  para funcionar.

## Cómo verla en local

Abre `index.html` en cualquier navegador. No hace falta servidor.

## Cómo publicarla en internet (GitHub Pages)

El repositorio ya incluye un flujo de trabajo (`.github/workflows/pages.yml`)
que despliega la web automáticamente. Solo hay que activarlo una vez:

1. En GitHub, entra en **Settings → Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Cuando estos cambios lleguen a la rama `main`, la web se publicará sola en:

   `https://elcorreveidile.github.io/nuevo/`

A partir de ahí, cada cambio en `main` vuelve a publicarla.
