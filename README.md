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

Al ser un único archivo estático, se publica directamente desde la rama, sin
ningún flujo de trabajo. Solo hay que activarlo una vez:

1. En GitHub, entra en **Settings → Pages**.
2. En **Build and deployment → Source**, elige **Deploy from a branch**.
3. En **Branch**, selecciona `main` y la carpeta `/ (root)`, y pulsa **Save**.
4. En un par de minutos la web quedará publicada en:

   `https://elcorreveidile.github.io/nuevo/`

A partir de ahí, cada cambio que llegue a `main` se publica solo.
El archivo `.nojekyll` está para que GitHub sirva el sitio tal cual.
