/*
 * Rajyotsava poster maker. The reader picks a poster type, adds a photo (camera or
 * file), adjusts it, and downloads or shares the result. Everything is drawn on a
 * canvas in the browser; the photo never leaves the reader's device.
 */
(() => {
  "use strict";

  const WIDTH = 1080;
  const HEIGHT = 1350;
  const MOVE_STEP = 24; // canvas pixels per arrow-key press
  const ZOOM_STEP = 0.1;

  /* Where the photo sits for each poster type (canvas pixels). */
  const PHOTO_AREAS = {
    personal: { shape: "circle", x: 210, y: 250, w: 660, h: 660 },
    program: { shape: "rect", x: 70, y: 220, w: 940, h: 700, radius: 28 },
  };

  const root = document.getElementById("poster");
  const canvas = document.getElementById("poster-canvas");
  const ctx = canvas.getContext("2d");
  const typeGroup = document.getElementById("poster-types");
  const nameInput = document.getElementById("poster-name");
  const nameLabel = document.getElementById("poster-name-label");
  const zoomInput = document.getElementById("poster-zoom");
  const tip = document.getElementById("poster-tip");
  const status = document.getElementById("poster-status");
  const downloadButton = document.getElementById("poster-download");
  const shareButton = document.getElementById("poster-share");
  const fileInput = document.getElementById("poster-file");
  const captureInput = document.getElementById("poster-capture");
  const cameraButton = document.getElementById("poster-camera");
  const camera = document.getElementById("camera");
  const cameraVideo = document.getElementById("camera-video");

  const state = { type: "personal", image: null, zoom: 1, offsetX: 0, offsetY: 0 };
  const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  const clamp = (value, limit) => Math.min(limit, Math.max(-limit, value));

  function loadImage(src) {
    const image = new Image();
    image.src = src;
    return image.decode().then(() => image);
  }

  // Fonts and brand images must be ready before the first draw.
  const assets = Promise.all([
    loadImage("assets/logo/pv-logo.png"),
    loadImage("assets/hero/karunadotsava-art-160.webp"),
    document.fonts.load('600 48px "PvHeadline"'),
    document.fonts.load('400 32px "PvText"'),
    document.fonts.load('600 32px "PvText"'),
  ]).then(([logo, art]) => ({ logo, art }));

  /* ---------- Drawing ---------- */

  function tracePhotoArea(area) {
    ctx.beginPath();
    if (area.shape === "circle") ctx.arc(area.x + area.w / 2, area.y + area.h / 2, area.w / 2, 0, Math.PI * 2);
    else ctx.roundRect(area.x, area.y, area.w, area.h, area.radius);
  }

  function drawHeader({ logo, art }) {
    const flagBand = 7;
    ctx.fillStyle = token("yellow");
    ctx.fillRect(0, 0, WIDTH, flagBand);
    ctx.fillStyle = token("red");
    ctx.fillRect(0, flagBand, WIDTH, flagBand);

    const logoHeight = 64;
    ctx.drawImage(logo, 70, 76, (logo.width / logo.height) * logoHeight, logoHeight);
    ctx.fillStyle = token("line-strong");
    ctx.fillRect(352, 62, 2, 92);
    const artHeight = 104;
    ctx.drawImage(art, 376, 56, (art.width / art.height) * artHeight, artHeight);
    ctx.fillStyle = token("red");
    ctx.font = '600 54px "PvHeadline"';
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillText(UI.eventTitle, 496, 128);
  }

  function drawFrame(area) {
    if (area.shape === "circle") {
      // Kannada-flag ring: yellow top half, red bottom half.
      const cx = area.x + area.w / 2;
      const cy = area.y + area.h / 2;
      const radius = area.w / 2 + 14;
      ctx.lineWidth = 18;
      ctx.strokeStyle = token("yellow");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, Math.PI, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = token("red");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI);
      ctx.stroke();
    } else {
      // Red block offset behind the photo, then a yellow edge.
      ctx.fillStyle = token("red-dark");
      ctx.beginPath();
      ctx.roundRect(area.x + 18, area.y + 18, area.w, area.h, area.radius);
      ctx.fill();
    }
  }

  function drawPhoto(area) {
    ctx.save();
    tracePhotoArea(area);
    ctx.clip();
    if (state.image) {
      const { image } = state;
      const scale = Math.max(area.w / image.width, area.h / image.height) * state.zoom;
      const w = image.width * scale;
      const h = image.height * scale;
      // Keep the photo covering the frame however it is dragged.
      state.offsetX = clamp(state.offsetX, (w - area.w) / 2);
      state.offsetY = clamp(state.offsetY, (h - area.h) / 2);
      ctx.drawImage(image, area.x + (area.w - w) / 2 + state.offsetX, area.y + (area.h - h) / 2 + state.offsetY, w, h);
    } else {
      ctx.fillStyle = token("paper");
      ctx.fill();
      ctx.fillStyle = token("ink-muted");
      ctx.font = '600 44px "PvText"';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(POSTER.types[state.type].placeholder, area.x + area.w / 2, area.y + area.h / 2);
    }
    ctx.restore();

    if (area.shape === "rect") {
      ctx.lineWidth = 10;
      ctx.strokeStyle = token("yellow");
      tracePhotoArea(area);
      ctx.stroke();
    }
  }

  /* Draws text centred, shrinking the font ("SIZE" in the font string) until it fits maxWidth. */
  function fitText(text, font, size, y, maxWidth) {
    let fontSize = size;
    do {
      ctx.font = font.replace("SIZE", fontSize);
      fontSize -= 2;
    } while (ctx.measureText(text).width > maxWidth && fontSize > 24);
    ctx.fillText(text, WIDTH / 2, y);
  }

  function drawText() {
    const type = POSTER.types[state.type];
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = token("red-dark");
    fitText(type.quote, '600 SIZEpx "PvHeadline"', 100, 1045, 940);

    // Kannada conjuncts hang well below the baseline, so the name sits a full line lower.
    const name = nameInput.value.trim();
    if (name) {
      ctx.fillStyle = token("ink-muted");
      fitText(format(type.nameLine, { name }), '600 SIZEpx "PvText"', 42, 1150, 900);
    }
  }

  function drawFooter() {
    const top = 1190;
    ctx.fillStyle = token("yellow");
    ctx.fillRect(0, top, WIDTH, 8);
    ctx.fillStyle = token("red");
    ctx.fillRect(0, top + 8, WIDTH, HEIGHT - top - 8);

    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = token("white");
    ctx.font = '600 46px "PvHeadline"';
    ctx.fillText(POSTER.footerTitle, 70, 1272);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = '400 32px "PvText"';
    ctx.fillText(POSTER.footerDate, 70, 1318);

    ctx.textAlign = "right";
    ctx.fillStyle = token("yellow");
    ctx.font = '600 34px "PvText"';
    ctx.fillText(POSTER.site, WIDTH - 70, 1294);
  }

  async function render() {
    const brand = await assets;
    const area = PHOTO_AREAS[state.type];
    ctx.fillStyle = token("cream");
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    drawHeader(brand);
    drawFrame(area);
    drawPhoto(area);
    drawText();
    drawFooter();
    canvas.setAttribute("aria-label", format(UI.posterPreviewLabel, { quote: POSTER.types[state.type].quote }));
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
    zoomInput.disabled = false;
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
    const facing = POSTER.types[state.type].camera;
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
    // Closing the share sheet without sharing rejects; that is not an error.
    navigator.share({ files: [file], text: POSTER.shareText }).catch(() => {});
  }

  /* ---------- Setup ---------- */

  function selectType(type) {
    const config = POSTER.types[type];
    state.type = type;
    state.offsetX = 0;
    state.offsetY = 0;
    nameLabel.textContent = config.nameLabel;
    tip.textContent = config.tip;
    render();
  }

  typeGroup.append(
    ...Object.entries(POSTER.types).map(([type, config]) => {
      const label = document.createElement("label");
      label.className = "choice";
      const input = Object.assign(document.createElement("input"), {
        type: "radio",
        name: "poster-type",
        value: type,
        checked: type === state.type,
      });
      const title = Object.assign(document.createElement("span"), { className: "choice__title", textContent: config.label });
      const hint = Object.assign(document.createElement("span"), { className: "choice__hint", textContent: config.hint });
      label.append(input, title, hint);
      return label;
    })
  );

  // Sharing files is only offered where the browser supports it (mostly phones).
  const canShareFiles = navigator.canShare?.({ files: [new File([""], "test.jpg", { type: "image/jpeg" })] });
  if (!canShareFiles) shareButton.remove();

  typeGroup.addEventListener("change", (event) => selectType(event.target.value));
  nameInput.addEventListener("input", render);
  zoomInput.addEventListener("input", () => setZoom(Number(zoomInput.value)));
  fileInput.addEventListener("change", onFileChosen);
  captureInput.addEventListener("change", onFileChosen);
  cameraButton.addEventListener("click", takePhoto);
  camera.querySelector(".camera__shutter").addEventListener("click", captureFrame);
  camera.querySelector(".camera__close").addEventListener("click", () => camera.close());
  camera.addEventListener("close", stopCamera);
  downloadButton.addEventListener("click", download);
  shareButton.addEventListener("click", share);

  // The floating "make your poster" button hides while the poster maker is on screen.
  const cta = document.querySelector(".poster-cta");
  new IntersectionObserver(([entry]) => {
    cta.hidden = entry.isIntersecting;
  }).observe(root);

  selectType(state.type);
})();
