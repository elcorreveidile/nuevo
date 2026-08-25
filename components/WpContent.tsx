// Renderiza el HTML ya renderizado por WordPress (content.rendered).
//
// El HTML procede del wp-json del propio cliente y se sanea en la fase de
// extracción; aun así, cuando se haga la extracción real conviene pasarlo por
// un saneador (p. ej. sanitize-html) en scripts/extract-wp-content.mjs antes
// de volcarlo a /content.

export default function WpContent({ html }: { html: string }) {
  return (
    <div className="wp-content" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
