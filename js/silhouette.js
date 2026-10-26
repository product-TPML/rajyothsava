/*
 * Draws a silhouette from SILHOUETTE_ART (js/silhouette-art.js) as an inline SVG,
 * mirrored if needed so it faces the given side ("left" or "right"). The page's CSS
 * colours it through the classes `${block}__silhouette`, `${block}__body` and
 * `${block}__accent` (the highlighted feature, drawn on top of the body).
 */
function drawSilhouette(id, block, face) {
  const SVG = "http://www.w3.org/2000/svg";
  const art = SILHOUETTE_ART[id];
  const width = Number(art.viewBox.split(" ")[2]);

  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("class", `${block}__silhouette`);
  svg.setAttribute("viewBox", art.viewBox);
  svg.setAttribute("preserveAspectRatio", "xMidYMax meet"); // stands on the bottom of its box
  svg.setAttribute("aria-hidden", "true");

  const figure = document.createElementNS(SVG, "g");
  if (art.faces !== face) figure.setAttribute("transform", `matrix(-1 0 0 1 ${width} 0)`);
  for (const part of ["body", "accent"]) {
    const path = document.createElementNS(SVG, "path");
    path.setAttribute("class", `${block}__${part}`);
    path.setAttribute("fill-rule", "evenodd"); // the outlines include holes
    path.setAttribute("d", art[part]);
    figure.append(path);
  }
  svg.append(figure);
  return svg;
}
