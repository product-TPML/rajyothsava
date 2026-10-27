/*
 * Rajyotsava poster maker. The page shows a one-screen teaser with example posters;
 * its button opens the maker full screen. The reader adds a photo, picks "my pride"
 * or "my dream", writes a line (and optionally their name, town and a longer story),
 * then shares or downloads a tall poster that fits a WhatsApp status. The story and
 * the site's link go with the poster as the share message. Everything is drawn on a
 * canvas in the browser; the photo never leaves the reader's device.
 */
(() => {
  "use strict";

  const WIDTH = 1080;
  const HEIGHT = 1920;
  const MARGIN = 80;
  // WhatsApp covers the top of a status with the sender's name and the very bottom
  // with its reply bar, so the words stay between these lines; the photo runs edge to edge.
  const SAFE_TOP = 230;
  const SAFE_BOTTOM = 1790;
  const MAX_LINES = 3;
  const MOVE_STEP = 24; // canvas pixels per arrow-key press
  const ZOOM_STEP = 0.1;

  const root = document.getElementById("poster");
  const samples = document.getElementById("poster-samples");
  const studio = document.getElementById("poster-studio");
  const canvas = document.getElementById("poster-canvas");
  const promptGroup = document.getElementById("poster-prompts");
  const lineInput = document.getElementById("poster-line");
  const lineHint = document.getElementById("poster-line-hint");
  const lineCount = document.getElementById("poster-line-count");
  const suggestions = document.getElementById("poster-suggestions");
  const nameInput = document.getElementById("poster-name");
  const storyInput = document.getElementById("poster-story");
  const storyCount = document.getElementById("poster-story-count");
  const zoomInput = document.getElementById("poster-zoom");
  const photoOnly = [document.getElementById("poster-zoom-field"), document.getElementById("poster-hint")];
  const status = document.getElementById("poster-status");
  const downloadButton = document.getElementById("poster-download");
  const shareButton = document.getElementById("poster-share");
  const fileInput = document.getElementById("poster-file");
  const captureInput = document.getElementById("poster-capture");
  const cameraButton = document.getElementById("poster-camera");
  const camera = document.getElementById("camera");
  const cameraVideo = document.getElementById("camera-video");

  // The reader's poster. The drawing functions take a poster like this, so the examples use them too.
  const state = { prompt: "pride", image: null, zoom: 1, offsetX: 0, offsetY: 0, line: "", name: "" };
  const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  const clamp = (value, limit) => Math.min(limit, Math.max(-limit, value));
  // The page's typefaces, from the CSS tokens, so each edition's poster uses its own fonts.
  const HEADLINE = token("font-headline");
  const TEXT = token("font-text");
  const font = (weight, size, family) => `${weight} ${size}px ${family}`;

  /* A colour token (#rrggbb) at the given opacity, for gradients. */
  function shade(name, alpha) {
    const hex = token(name).replace("#", "");
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function loadImage(src) {
    const image = new Image();
    // Images from another site (the brand logo) need CORS, or the canvas can't be saved.
    if (new URL(src, location.href).origin !== location.origin) image.crossOrigin = "anonymous";
    image.src = src;
    return image.decode().then(() => image);
  }

  // Fonts and brand images must be ready before the first draw.
  const assets = Promise.all([
    loadImage(POSTER.logo),
    loadImage(POSTER.mark),
    document.fonts.load(font(600, 48, HEADLINE)),
    document.fonts.load(font(400, 32, TEXT)),
    document.fonts.load(font(600, 32, TEXT)),
  ]).then(([logo, mark]) => ({ logo, mark }));

  /* ---------- Drawing ---------- */

  /* The photo covers the whole poster; without one, a deep red placeholder. */
  function drawPhoto(ctx, poster) {
    if (!poster.image) {
      const fill = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      fill.addColorStop(0, token("red-dark"));
      fill.addColorStop(1, token("red-deep"));
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = font(600, 48, TEXT);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(POSTER.placeholder, WIDTH / 2, HEIGHT * 0.42);
      return;
    }
    const { image } = poster;
    const scale = Math.max(WIDTH / image.width, HEIGHT / image.height) * poster.zoom;
    const w = image.width * scale;
    const h = image.height * scale;
    // Keep the photo covering the poster however it is dragged.
    poster.offsetX = clamp(poster.offsetX, (w - WIDTH) / 2);
    poster.offsetY = clamp(poster.offsetY, (h - HEIGHT) / 2);
    ctx.drawImage(image, (WIDTH - w) / 2 + poster.offsetX, (HEIGHT - h) / 2 + poster.offsetY, w, h);
  }

  /* Darkens the top and bottom of the photo so white words read on any picture. */
  function drawShade(ctx) {
    const top = ctx.createLinearGradient(0, 0, 0, 600);
    top.addColorStop(0, shade("night", 0.7));
    top.addColorStop(1, shade("night", 0));
    ctx.fillStyle = top;
    ctx.fillRect(0, 0, WIDTH, 600);

    const bottom = ctx.createLinearGradient(0, 820, 0, HEIGHT);
    bottom.addColorStop(0, shade("night", 0));
    bottom.addColorStop(0.45, shade("night", 0.72));
    bottom.addColorStop(1, shade("night", 0.92));
    ctx.fillStyle = bottom;
    ctx.fillRect(0, 820, WIDTH, HEIGHT - 820);
  }

  /* The Karunadotsava mark, large, at the top on the site's red, with the date line under it. */
  function drawEvent(ctx, mark) {
    const pad = 24;
    const markHeight = 170;
    const markWidth = (mark.width / mark.height) * markHeight;
    const boxHeight = markHeight + pad * 2;
    ctx.fillStyle = token("red");
    ctx.beginPath();
    ctx.roundRect(MARGIN, SAFE_TOP, markWidth + pad * 2, boxHeight, 16);
    ctx.fill();
    ctx.drawImage(mark, MARGIN + pad, SAFE_TOP + pad, markWidth, markHeight);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = token("yellow");
    ctx.font = font(600, 34, TEXT);
    ctx.fillText(POSTER.eventLine, MARGIN, SAFE_TOP + boxHeight + 52);
  }

  /* Splits text into lines no wider than maxWidth, at spaces. */
  function wrap(ctx, text, maxWidth) {
    const lines = [];
    let current = "";
    for (const word of text.split(/\s+/)) {
      const next = current ? `${current} ${word}` : word;
      if (current && ctx.measureText(next).width > maxWidth) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }
    lines.push(current);
    return lines;
  }

  /* The largest headline size at which the line fits in MAX_LINES lines. */
  function fitLine(ctx, text) {
    const maxWidth = WIDTH - MARGIN * 2;
    let size = 104;
    let lines;
    do {
      ctx.font = font(600, size, HEADLINE);
      lines = wrap(ctx, text, maxWidth);
      size -= 4;
    } while ((lines.length > MAX_LINES || lines.some((line) => ctx.measureText(line).width > maxWidth)) && size > 52);
    return { size: size + 4, lines: lines.slice(0, MAX_LINES) };
  }

  /*
   * From the bottom up: the "made at" credit, the name, the reader's line and the
   * prompt's heading above it. Until the reader writes, the example line shows faintly.
   */
  function drawWords(ctx, poster, logo) {
    const prompt = POSTER.prompts[poster.prompt];

    // Credit: the white brand logo and "made at" line on a dark red pill.
    const pillHeight = 84;
    const pillTop = SAFE_BOTTOM - pillHeight;
    const logoHeight = 44;
    const logoWidth = (logo.width / logo.height) * logoHeight;
    const credit = format(POSTER.credit, { address: POSTER.address });
    ctx.font = font(400, 32, TEXT);
    const pillWidth = 28 + logoWidth + 22 + ctx.measureText(credit).width + 30;
    ctx.fillStyle = token("red-dark");
    ctx.beginPath();
    ctx.roundRect(MARGIN, pillTop, pillWidth, pillHeight, pillHeight / 2);
    ctx.fill();
    ctx.drawImage(logo, MARGIN + 28, pillTop + (pillHeight - logoHeight) / 2, logoWidth, logoHeight);
    ctx.fillStyle = token("white");
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(credit, MARGIN + 28 + logoWidth + 22, pillTop + pillHeight / 2 + 2);

    ctx.textBaseline = "alphabetic";
    let baseline = pillTop - 56;
    if (poster.name) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = font(600, 40, TEXT);
      ctx.fillText(poster.name, MARGIN, baseline);
      baseline -= 92;
    }

    const { size, lines } = fitLine(ctx, poster.line || prompt.example);
    const lineHeight = size * 1.4;
    ctx.fillStyle = poster.line ? token("white") : "rgba(255, 255, 255, 0.5)";
    lines
      .slice()
      .reverse()
      .forEach((line, i) => ctx.fillText(line, MARGIN, baseline - i * lineHeight));

    const headingBaseline = baseline - (lines.length - 1) * lineHeight - size * 1.1 - 12;
    ctx.fillStyle = token("yellow");
    ctx.font = font(600, 44, TEXT);
    ctx.fillText(prompt.label, MARGIN, headingBaseline);
  }

  /* The Kannada flag's colours along the bottom edge. */
  function drawFlagBand(ctx) {
    ctx.fillStyle = token("yellow");
    ctx.fillRect(0, HEIGHT - 28, WIDTH, 14);
    ctx.fillStyle = token("red");
    ctx.fillRect(0, HEIGHT - 14, WIDTH, 14);
  }

  /* Draws a poster onto a canvas of any size with the poster's shape. */
  async function drawPoster(target, poster) {
    const { logo, mark } = await assets;
    const ctx = target.getContext("2d");
    const scale = target.width / WIDTH;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    drawPhoto(ctx, poster);
    drawShade(ctx);
    drawEvent(ctx, mark);
    drawWords(ctx, poster, logo);
    drawFlagBand(ctx);
  }

  function render() {
    drawPoster(canvas, state);
    const prompt = POSTER.prompts[state.prompt];
    canvas.setAttribute("aria-label", format(UI.posterPreviewLabel, { heading: prompt.label, line: state.line || prompt.example }));
  }

  /* The example posters on the page, at half size, drawn once they are about to scroll into view. */
  function drawSamples() {
    POSTER.samples.forEach(async (sample, i) => {
      const image = await loadImage(`assets/images/${sample.image}-1280.webp`);
      drawPoster(samples.children[i], { ...sample, image, zoom: 1, offsetX: 0, offsetY: 0 });
    });
  }

  /* ---------- Photo input ---------- */

  async function usePhoto(blob) {
    try {
      state.image = await createImageBitmap(blob);
    } catch {
      status.textContent = UI.posterLoadError;
      return;
    }
    state.zoom = 1;
    state.offsetX = 0;
    state.offsetY = 0;
    zoomInput.value = "1";
    photoOnly.forEach((node) => {
      node.hidden = false; // the size slider and drag hint only make sense once there is a photo
    });
    downloadButton.disabled = false;
    shareButton.disabled = false;
    canvas.classList.add("has-photo");
    status.textContent = UI.posterReady;
    render();
  }

  function onFileChosen(event) {
    const [file] = event.target.files;
    if (file) usePhoto(file);
    event.target.value = ""; // lets the same file be chosen again
  }

  /* Phones open their own camera app; desktops get an in-page camera view. */
  async function takePhoto() {
    const facing = POSTER.camera;
    if (window.matchMedia("(pointer: coarse)").matches || !navigator.mediaDevices?.getUserMedia) {
      captureInput.setAttribute("capture", facing);
      captureInput.click();
      return;
    }
    try {
      cameraVideo.srcObject = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing }, audio: false });
    } catch {
      status.textContent = UI.posterCameraError;
      return;
    }
    cameraVideo.classList.toggle("is-mirrored", facing === "user");
    camera.showModal();
    cameraVideo.play();
  }

  function captureFrame() {
    const frame = document.createElement("canvas");
    frame.width = cameraVideo.videoWidth;
    frame.height = cameraVideo.videoHeight;
    const frameCtx = frame.getContext("2d");
    if (cameraVideo.classList.contains("is-mirrored")) {
      // Save the selfie the way the reader saw it on screen.
      frameCtx.translate(frame.width, 0);
      frameCtx.scale(-1, 1);
    }
    frameCtx.drawImage(cameraVideo, 0, 0);
    frame.toBlob((blob) => blob && usePhoto(blob), "image/jpeg", 0.92);
    camera.close();
  }

  function stopCamera() {
    cameraVideo.srcObject?.getTracks().forEach((track) => track.stop());
    cameraVideo.srcObject = null;
  }

  /* ---------- Adjusting the photo ---------- */

  function setZoom(value) {
    state.zoom = Math.min(Number(zoomInput.max), Math.max(Number(zoomInput.min), value));
    zoomInput.value = String(state.zoom);
    render();
  }

  function moveBy(dx, dy) {
    state.offsetX += dx;
    state.offsetY += dy;
    render();
  }

  let dragStart = null;
  canvas.addEventListener("pointerdown", (event) => {
    if (!state.image) return;
    dragStart = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add("is-dragging");
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!dragStart) return;
    const ratio = WIDTH / canvas.getBoundingClientRect().width; // screen px → canvas px
    moveBy((event.clientX - dragStart.x) * ratio, (event.clientY - dragStart.y) * ratio);
    dragStart = { x: event.clientX, y: event.clientY };
  });
  const endDrag = () => {
    dragStart = null;
    canvas.classList.remove("is-dragging");
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  const KEY_MOVES = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  canvas.addEventListener("keydown", (event) => {
    if (!state.image) return;
    if (KEY_MOVES[event.key]) {
      const [x, y] = KEY_MOVES[event.key];
      moveBy(x * MOVE_STEP, y * MOVE_STEP);
    } else if (event.key === "+" || event.key === "=") {
      setZoom(state.zoom + ZOOM_STEP);
    } else if (event.key === "-") {
      setZoom(state.zoom - ZOOM_STEP);
    } else {
      return;
    }
    event.preventDefault();
  });

  /* ---------- The words ---------- */

  const make = (tag, className, text) => Object.assign(document.createElement(tag), { className, textContent: text });

  function selectPrompt(key) {
    const prompt = POSTER.prompts[key];
    state.prompt = key;
    promptGroup.querySelector(`input[value="${key}"]`).checked = true;
    lineHint.textContent = prompt.hint;
    lineInput.placeholder = prompt.example;
    suggestions.replaceChildren(
      ...prompt.suggestions.map((text) => {
        const chip = make("button", "chip", text);
        chip.type = "button";
        return chip;
      })
    );
    render();
  }

  function setLine(text) {
    state.line = text.trim();
    lineCount.textContent = format(UI.posterCount, { n: text.length, max: POSTER.lineMax });
    render();
  }

  function updateStoryCount() {
    storyCount.textContent = format(UI.posterCount, { n: storyInput.value.length, max: POSTER.storyMax });
  }

  /* ---------- Output ---------- */

  function posterFile() {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(new File([blob], POSTER.fileName, { type: "image/jpeg" })), "image/jpeg", 0.92);
    });
  }

  async function download() {
    const url = URL.createObjectURL(await posterFile());
    const link = Object.assign(document.createElement("a"), { href: url, download: POSTER.fileName });
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function share() {
    const file = await posterFile();
    const story = storyInput.value.trim();
    const text = format(POSTER.shareText, { story: story ? `${story}\n\n` : "", address: POSTER.address });
    // Closing the share sheet without sharing rejects; that is not an error.
    navigator.share({ files: [file], text }).catch(() => {});
  }

  /* ---------- Setup ---------- */

  promptGroup.append(
    ...Object.entries(POSTER.prompts).map(([key, prompt]) => {
      const option = make("label", "segmented__option");
      const input = Object.assign(document.createElement("input"), { type: "radio", name: "poster-prompt", value: key, className: "visually-hidden" });
      option.append(input, make("span", "", prompt.label));
      return option;
    })
  );
  samples.append(
    ...POSTER.samples.map(() => Object.assign(document.createElement("canvas"), { className: "poster__sample", width: WIDTH / 2, height: HEIGHT / 2 }))
  );
  lineInput.maxLength = POSTER.lineMax;
  storyInput.maxLength = POSTER.storyMax;

  // Sharing files is offered where the browser supports it (mostly phones); elsewhere downloading is the main action.
  const canShareFiles = navigator.canShare?.({ files: [new File([""], "test.jpg", { type: "image/jpeg" })] });
  if (!canShareFiles) {
    shareButton.remove();
    downloadButton.classList.replace("button--outline", "button--primary");
  }

  document.getElementById("poster-start").addEventListener("click", () => studio.showModal());
  studio.querySelector(".studio__close").addEventListener("click", () => studio.close());
  document.getElementById("poster-form").addEventListener("submit", (event) => event.preventDefault());
  promptGroup.addEventListener("change", (event) => selectPrompt(event.target.value));
  lineInput.addEventListener("input", () => setLine(lineInput.value));
  suggestions.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    lineInput.value = chip.textContent;
    setLine(chip.textContent);
  });
  nameInput.addEventListener("input", () => {
    state.name = nameInput.value.trim();
    render();
  });
  storyInput.addEventListener("input", updateStoryCount);
  zoomInput.addEventListener("input", () => setZoom(Number(zoomInput.value)));
  fileInput.addEventListener("change", onFileChosen);
  captureInput.addEventListener("change", onFileChosen);
  cameraButton.addEventListener("click", takePhoto);
  camera.querySelector(".camera__shutter").addEventListener("click", captureFrame);
  camera.querySelector(".camera__close").addEventListener("click", () => camera.close());
  camera.addEventListener("close", stopCamera);
  downloadButton.addEventListener("click", download);
  shareButton.addEventListener("click", share);

  // The floating "make your poster" button hides while the teaser is on screen.
  const cta = document.querySelector(".poster-cta");
  new IntersectionObserver(([entry]) => {
    cta.hidden = entry.isIntersecting;
  }).observe(root);

  // The examples are drawn shortly before they scroll into view, so their photos aren't loaded up front.
  const sampleWatcher = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      sampleWatcher.disconnect();
      drawSamples();
    },
    { rootMargin: "400px" }
  );
  sampleWatcher.observe(samples);

  setLine("");
  updateStoryCount();
  selectPrompt(state.prompt);
})();
