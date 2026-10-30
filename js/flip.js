/*
 * Split-flap cards, one per digit, as on a flip board: the exhibition road's year and the
 * countdown before the launch. flipCard(parent) adds a card and returns set(digit). Only a
 * changed digit flips; a new change mid-flip cuts the old one short, so fast runs flutter
 * like a real flip board. The look is .flip in css/styles.css.
 */
const flipCard = (() => {
  const FLIP_MS = 260;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  return (parent) => {
    const card = document.createElement("span");
    card.className = "flip";
    card.innerHTML = ["flip-top", "flip-bottom", "flip-top flip-leaf", "flip-bottom flip-leaf"]
      .map((c) => `<span class="flip-half ${c}"><span></span></span>`).join("");
    parent.append(card);
    const [top, bottom, leafTop, leafBottom] = [...card.children].map((h) => ({ half: h, text: h.firstChild }));
    let shown = null;
    let anims = [];

    return (digit) => {
      if (shown === digit) return;
      const old = shown ?? digit;
      shown = digit;
      anims.forEach((a) => a.cancel());
      // Behind the leaves: new digit on top, old digit below until the lower leaf covers it.
      top.text.textContent = digit;
      bottom.text.textContent = old;
      leafTop.text.textContent = old;
      leafBottom.text.textContent = digit;
      const settle = () => {
        bottom.text.textContent = digit;
        leafTop.half.style.visibility = leafBottom.half.style.visibility = "";
      };
      if (old === digit || reduceMotion.matches) {
        settle();
        return;
      }
      leafTop.half.style.visibility = leafBottom.half.style.visibility = "visible";
      const half = FLIP_MS / 2;
      anims = [
        leafTop.half.animate([{ transform: "rotateX(0)" }, { transform: "rotateX(-90deg)" }],
          { duration: half, easing: "ease-in", fill: "forwards" }),
        leafBottom.half.animate([{ transform: "rotateX(90deg)" }, { transform: "rotateX(0)" }],
          { duration: half, delay: half, easing: "ease-out", fill: "both" })
      ];
      anims[1].onfinish = () => { if (shown === digit) settle(); };
    };
  };
})();
