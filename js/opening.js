/*
 * Opening animation: a flight into the screen. The figures in OPENING rush toward
 * the reader one after another, alternating red and yellow; each one grows until
 * it fills the screen and the reader passes through it into its colour, where the
 * next figure is already approaching. Then the Karnataka map arrives, a flagpole
 * rises from it, the Kannada flag is hoisted and waves while the closing message
 * is held on screen, and the opening lifts away.
 * The small script in <head> decides whether it plays (once per visit, never with
 * reduced motion); this file builds the scene; css/styles.css holds the timeline.
 */
(() => {
  "use strict";

  const SVG = "http://www.w3.org/2000/svg";
  const TONES = ["red", "yellow"]; // figure colours, in turn
  const SPECKS = 28; // drifting specks that give the feeling of moving forward
  const GOLDEN_ANGLE = 137.5;

  /*
   * The flag cloth, in the units of its SVG viewBox. A wave travels from the pole
   * to the free end, growing as it goes; the cloth droops slightly at the end.
   */
  const FLAG = { width: 300, height: 200, points: 40, wavelengths: 1.25, amplitude: 13, droop: 8, periodMs: 1200 };

  const opening = document.getElementById("opening");
  if (!document.documentElement.classList.contains("has-opening")) {
    opening.remove();
    return;
  }

  const { figures, timing } = OPENING;
  const scene = document.getElementById("opening-scene");
  const floods = document.getElementById("opening-floods");
  const caption = document.getElementById("opening-caption");
  const flag = document.getElementById("opening-flag");
  const skip = document.getElementById("opening-skip");
  const background = [...document.body.children].filter((node) => node !== opening);
  let timer;
  let frame;

  function create(tag, className, variables, namespace = "http://www.w3.org/1999/xhtml") {
    const node = document.createElementNS(namespace, tag);
    node.setAttribute("class", className);
    for (const [name, value] of Object.entries(variables)) node.style.setProperty(`--${name}`, value);
    return node;
  }

  // Spread the specks evenly around the centre, away from the middle where the figures are.
  function addSpecks() {
    for (let i = 0; i < SPECKS; i++) {
      const angle = (i * GOLDEN_ANGLE * Math.PI) / 180;
      const radius = 18 + (i % 7) * 5; // vmin
      scene.prepend(
        create("span", i % 3 ? "opening__speck" : "opening__speck opening__speck--red", {
          x: `${(Math.cos(angle) * radius).toFixed(1)}vmin`,
          y: `${(Math.sin(angle) * radius).toFixed(1)}vmin`,
          i,
          specks: SPECKS,
        })
      );
    }
  }

  // Each figure brings a silhouette, its name, and the wash of colour left behind once the reader passes through it.
  function addFigures() {
    const monument = scene.querySelector(".opening__monument");
    figures.forEach((figure, i) => {
      const tone = TONES[i % TONES.length];
      const silhouette = create("svg", `opening__figure opening__figure--${tone}`, { i }, SVG);
      silhouette.setAttribute("viewBox", "0 0 200 200");
      for (const d of OPENING_ART[figure.art]) {
        const path = document.createElementNS(SVG, "path");
        path.setAttribute("d", d);
        silhouette.append(path);
      }
      scene.insertBefore(silhouette, monument);

      const name = create("span", `opening__name opening__name--${tone}`, { i });
      name.textContent = figure.name;
      name.setAttribute("aria-hidden", "true");
      caption.append(name);

      floods.append(create("span", `opening__flood opening__flood--${tone}`, { i }));
    });
  }

  function build() {
    opening.setAttribute("aria-label", OPENING.label);
    skip.textContent = OPENING.skip;
    skip.setAttribute("aria-label", OPENING.skipLabel);
    for (const [key, text] of Object.entries(OPENING.finale)) {
      document.getElementById(`opening-${key}`).textContent = text;
    }

    opening.style.setProperty("--figures", figures.length);
    opening.style.setProperty("--figure-ms", `${timing.figureMs}ms`);
    opening.style.setProperty("--finale-ms", `${timing.finaleMs}ms`);
    opening.style.setProperty("--exit-ms", `${timing.exitMs}ms`);

    addSpecks();
    addFigures();
  }

  /*
   * Returns a function that draws the flag at a given moment. Each point along the
   * cloth rises and falls with the wave; highlight and shadow overlays brighten the
   * folds turning toward the light and darken those turning away.
   */
  function flagDrawer() {
    const [yellow, red, light, dark] = flag.querySelectorAll("path");
    const shades = ["light", "dark"].map((tone) => {
      const gradient = document.getElementById(`opening-flag-${tone}`);
      return Array.from({ length: FLAG.points + 1 }, (_, i) => {
        const stop = document.createElementNS(SVG, "stop");
        stop.setAttribute("offset", i / FLAG.points);
        gradient.append(stop);
        return stop;
      });
    });
    const band = (upper, lower) => `M${upper.join(" ")} ${[...lower].reverse().join(" ")}Z`;

    return (time) => {
      const top = [];
      const middle = [];
      const bottom = [];
      for (let i = 0; i <= FLAG.points; i++) {
        const along = i / FLAG.points; // 0 at the pole, 1 at the free end
        const phase = 2 * Math.PI * (FLAG.wavelengths * along - time / FLAG.periodMs);
        const lift = FLAG.amplitude * along * Math.sin(phase) + FLAG.droop * along * along;
        const x = (along * FLAG.width).toFixed(1);
        top.push(`${x} ${lift.toFixed(1)}`);
        middle.push(`${x} ${(lift + FLAG.height / 2).toFixed(1)}`);
        bottom.push(`${x} ${(lift + FLAG.height).toFixed(1)}`);

        const turn = Math.cos(phase) * Math.sqrt(along);
        shades[0][i].setAttribute("stop-opacity", (Math.max(0, turn) * 0.3).toFixed(2));
        shades[1][i].setAttribute("stop-opacity", (Math.max(0, -turn) * 0.35).toFixed(2));
      }
      yellow.setAttribute("d", band(top, middle));
      red.setAttribute("d", band(middle, bottom));
      light.setAttribute("d", band(top, bottom));
      dark.setAttribute("d", light.getAttribute("d"));
    };
  }

  // Wave the flag from the moment it starts to be hoisted until the opening closes.
  function startFlag() {
    const draw = flagDrawer();
    const wave = (time) => {
      draw(time);
      frame = requestAnimationFrame(wave);
    };
    frame = requestAnimationFrame(wave);
  }

  // The last figure has fully passed after (figures + 1) slots; then the finale runs and is held.
  function play() {
    opening.classList.add("opening--playing");
    timer = setTimeout(leave, (figures.length + 1) * timing.figureMs + timing.finaleMs + timing.holdMs);
  }

  function leave() {
    clearTimeout(timer);
    opening.classList.add("opening--leaving");
  }

  function onKey(event) {
    if (event.key === "Escape") leave();
  }

  function finish(event) {
    if (event.target !== opening) return; // ignore animations ending inside the opening
    background.forEach((node) => {
      node.inert = false;
    });
    document.documentElement.classList.remove("has-opening");
    document.removeEventListener("keydown", onKey);
    cancelAnimationFrame(frame);
    opening.remove();
  }

  build();
  background.forEach((node) => {
    node.inert = true;
  });
  opening.addEventListener("click", leave);
  opening.addEventListener("animationend", finish);
  flag.addEventListener("animationstart", startFlag, { once: true });
  document.addEventListener("keydown", onKey);

  // A page opened in a background tab waits until the reader actually sees it.
  if (document.hidden) document.addEventListener("visibilitychange", play, { once: true });
  else play();
})();
