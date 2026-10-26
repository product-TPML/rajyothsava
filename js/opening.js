/*
 * Opening animation: a flight into the screen. The figures in OPENING come toward
 * the reader one after another, alternating red and black, and sweep past to the
 * left and right as the camera flies by them. Last comes the Karnataka map, filled
 * with the waving Kannada flag, which settles in front while the closing message
 * is held on screen, and then the opening lifts away.
 * The small script in <head> decides whether it plays (once per visit, never with
 * reduced motion); this file builds the scene; css/styles.css holds the timeline.
 */
(() => {
  "use strict";

  const SVG = "http://www.w3.org/2000/svg";
  const TONES = ["red", "ink"]; // figure colours, in turn
  const STREAKS = 36; // lines rushing past on all sides, the sense of speed
  const GOLDEN_ANGLE = 137.5; // spreads the streaks evenly around the circle

  /*
   * The flag cloth behind the map, in the units of the map's SVG viewBox. A wave
   * travels across it from left to right.
   */
  const FLAG = { left: -4, top: -4, width: 261, height: 408, points: 40, wavelengths: 1.5, amplitude: 10, periodMs: 1800 };

  const opening = document.getElementById("opening");
  if (!document.documentElement.classList.contains("has-opening")) {
    opening.remove();
    return;
  }

  const { figures, timing } = OPENING;
  const scene = document.getElementById("opening-scene");
  const flag = document.getElementById("opening-flag");
  const skip = document.getElementById("opening-skip");
  const background = [...document.body.children].filter((node) => node !== opening);
  let timer;
  let frame;

  function create(tag, className, variables) {
    const node = document.createElement(tag);
    node.className = className;
    for (const [name, value] of Object.entries(variables)) node.style.setProperty(`--${name}`, value);
    return node;
  }

  // Streaks sit around the line of flight at varied distances, each starting its run at its own moment.
  function addStreaks() {
    for (let i = 0; i < STREAKS; i++) {
      scene.prepend(
        create("span", i % 3 ? "opening__streak" : "opening__streak opening__streak--red", {
          angle: `${((i * GOLDEN_ANGLE) % 360).toFixed(1)}deg`,
          radius: `${18 + (i % 6) * 7}vmin`,
          i,
          streaks: STREAKS,
        })
      );
    }
  }

  /*
   * Each figure is a silhouette with its name beneath, moving as one; figures pass
   * on the left and right in turn. Each is placed straight after the map, so later
   * (farther) figures end up earlier in the page and are painted behind nearer ones.
   */
  function addFigures() {
    const map = scene.querySelector(".opening__map");
    figures.forEach((figure, i) => {
      const tone = TONES[i % TONES.length];
      const exit = i % 2 ? "right" : "left";
      const holder = create("div", `opening__figure opening__figure--${tone}`, { i, side: exit === "right" ? 1 : -1 });
      const name = create("span", "opening__name", {});
      name.textContent = figure.name;
      // Every figure faces the way it is going.
      holder.append(drawSilhouette(figure.art, "opening", exit), name);
      map.after(holder);
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

    addStreaks();
    addFigures();
  }

  /*
   * Returns a function that draws the flag at a given moment: the edge between
   * the yellow and red halves rises and falls with the wave, and highlight and
   * shadow overlays brighten the folds turning toward the light and darken those
   * turning away. The map's outline clips it all.
   */
  function flagDrawer() {
    const red = flag.querySelector(".opening__cloth--red");
    const shades = ["light", "dark"].map((tone) => {
      const gradient = document.getElementById(`opening-flag-${tone}`);
      return Array.from({ length: FLAG.points + 1 }, (_, i) => {
        const stop = document.createElementNS(SVG, "stop");
        stop.setAttribute("offset", i / FLAG.points);
        gradient.append(stop);
        return stop;
      });
    });
    const bottom = FLAG.top + FLAG.height;

    return (time) => {
      const edge = [];
      for (let i = 0; i <= FLAG.points; i++) {
        const along = i / FLAG.points; // 0 at the left edge, 1 at the right
        const phase = 2 * Math.PI * (FLAG.wavelengths * along - time / FLAG.periodMs);
        const x = FLAG.left + along * FLAG.width;
        const y = FLAG.top + FLAG.height / 2 + FLAG.amplitude * Math.sin(phase);
        edge.push(`${x.toFixed(1)} ${y.toFixed(1)}`);

        const turn = Math.cos(phase);
        shades[0][i].setAttribute("stop-opacity", (Math.max(0, turn) * 0.22).toFixed(2));
        shades[1][i].setAttribute("stop-opacity", (Math.max(0, -turn) * 0.22).toFixed(2));
      }
      red.setAttribute("d", `M${edge.join(" ")} ${FLAG.left + FLAG.width} ${bottom} ${FLAG.left} ${bottom}Z`);
    };
  }

  // Wave the flag from the start until the opening closes.
  function waveFlag() {
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
    waveFlag();
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
  document.addEventListener("keydown", onKey);

  // A page opened in a background tab waits until the reader actually sees it.
  if (document.hidden) document.addEventListener("visibilitychange", play, { once: true });
  else play();
})();
