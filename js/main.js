/* Builds the page from js/data.js and wires up the menu panel and carousel. */
(() => {
  "use strict";

  const AUTOPLAY_MS = 6000;
  const SWIPE_PX = 40;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sectionsById = Object.fromEntries(SECTIONS.map((section) => [section.id, section]));

  const pad = (n) => String(n).padStart(2, "0");
  const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);
  const sectionHref = (section) => section.href || `#section-${section.id}`;

  /* Small element helper: el("a", { href: "#" }, "text", childNode) */
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs)) {
      if (value === false || value == null) continue;
      if (name === "class") node.className = value;
      else node.setAttribute(name, value);
    }
    node.append(...children);
    return node;
  }

  function photo(key, { sizes, priority = false }) {
    return el("img", {
      class: "media__img",
      src: `assets/images/${key}-640.webp`,
      srcset: `assets/images/${key}-640.webp 640w, assets/images/${key}-1280.webp 1280w`,
      sizes,
      alt: IMAGES[key].alt,
      loading: priority ? "eager" : "lazy",
      fetchpriority: priority ? "high" : false,
      decoding: "async",
    });
  }

  function applyText() {
    document.querySelectorAll("[data-text]").forEach((node) => {
      node.textContent = UI[node.dataset.text];
    });
    document.querySelectorAll("[data-label]").forEach((node) => {
      node.setAttribute("aria-label", UI[node.dataset.label]);
    });
    document.querySelectorAll("[data-href]").forEach((node) => {
      node.href = UI[node.dataset.href];
    });
  }

  function renderNavigation() {
    document.getElementById("nav-list").append(
      ...SECTIONS.map((section) =>
        el(
          "li",
          { class: section.primary ? "site-nav__item" : "site-nav__item site-nav__item--secondary" },
          el(
            "a",
            {
              class: "site-nav__link",
              href: sectionHref(section),
              "aria-current": section.id === "home" ? "page" : false,
            },
            section.kn
          )
        )
      )
    );

    document.getElementById("menu-panel-list").append(
      ...SECTIONS.map((section, i) =>
        el(
          "li",
          {},
          el(
            "a",
            { class: "menu-panel__link", href: sectionHref(section) },
            el("span", { class: "menu-panel__num", "aria-hidden": "true" }, pad(i + 1)),
            section.kn
          )
        )
      )
    );

    document.getElementById("footer-links").append(
      ...SECTIONS.map((section) => el("li", {}, el("a", { href: sectionHref(section) }, section.kn)))
    );
  }

  function renderCarousel() {
    const track = document.getElementById("carousel-track");
    const dots = document.getElementById("carousel-dots");

    SLIDES.forEach((slide, i) => {
      const section = sectionsById[slide.section];

      track.append(
        el(
          "li",
          {
            class: "slide",
            "aria-roledescription": "slide",
            "aria-label": format(UI.slideOf, { n: i + 1, total: SLIDES.length }),
          },
          el(
            "a",
            { class: "slide__link", href: sectionHref(section), draggable: "false" },
            // Portrait cards crop landscape photos, so the photo renders wider than the card.
            photo(slide.image, {
              sizes: "(min-width: 1024px) 645px, (min-width: 768px) 560px, 135vw",
              priority: i === 0,
            }),
            el(
              "span",
              { class: "slide__body" },
              el("span", { class: "tag" }, section.kn),
              el("span", { class: "slide__title" }, slide.title)
            )
          )
        )
      );

      dots.append(
        el("button", {
          class: "carousel__dot",
          type: "button",
          "aria-label": format(UI.carouselGoTo, { n: i + 1 }),
        })
      );
    });
  }

  function renderHighlights() {
    document.getElementById("highlights-list").append(
      ...HIGHLIGHTS.map((story, i) => {
        const section = sectionsById[story.section];
        const isLead = i === 0;
        return el(
          "li",
          { class: isLead ? "card card--lead" : "card" },
          el(
            "div",
            { class: "card__media" },
            photo(story.image, {
              sizes: isLead ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 120px",
            })
          ),
          el(
            "div",
            { class: "card__body" },
            el("span", { class: "tag" }, section.kn),
            el("h3", { class: "card__title" }, el("a", { class: "card__link", href: sectionHref(section) }, story.title)),
            el("p", { class: "card__summary" }, story.summary)
          )
        );
      })
    );
  }

  function renderDirectory() {
    document.getElementById("directory-list").append(
      ...SECTIONS.map((section, i) =>
        el(
          "li",
          { class: "directory__tile", id: `section-${section.id}` },
          el("span", { class: "directory__num", "aria-hidden": "true" }, pad(i + 1)),
          el("span", { class: "directory__name" }, section.kn),
          el("span", { class: "directory__en", lang: "en" }, section.en),
          el("span", { class: "directory__status" }, UI.comingSoon)
        )
      )
    );
  }

  function renderCredits() {
    document.getElementById("credits-list").append(
      ...Object.values(IMAGES).map(({ alt, credit }) =>
        el("li", {}, el("a", { href: credit.source }, alt), ` – ${credit.author}, ${credit.license}`)
      )
    );
  }

  function setupMenu() {
    const panel = document.getElementById("menu-panel");
    document.querySelector(".site-nav__more").addEventListener("click", () => panel.showModal());
    panel.querySelector(".menu-panel__close").addEventListener("click", () => panel.close());
    // Close on a backdrop click or after choosing a section.
    panel.addEventListener("click", (event) => {
      if (event.target === panel || event.target.closest("a")) panel.close();
    });
  }

  /* Signed distance from the front card, taking the shorter way round the loop. */
  function loopOffset(index, current, count) {
    const offset = (index - current + count) % count;
    return offset > count / 2 ? offset - count : offset;
  }

  /*
   * Stacked-card carousel: the current story sits in front, neighbours fan out
   * behind it. JS only sets each card's --offset/--distance; CSS does the layout.
   */
  function setupCarousel() {
    const root = document.querySelector(".carousel");
    const track = document.getElementById("carousel-track");
    const caption = document.getElementById("carousel-caption");
    const toggle = root.querySelector(".carousel__toggle");
    const slides = [...track.children];
    const dots = [...root.querySelectorAll(".carousel__dot")];

    let current = 0;
    let timer = null;
    let userPaused = reducedMotion.matches;
    let hovering = false;
    let focused = false;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const offset = loopOffset(i, current, slides.length);
        const isCurrent = offset === 0;
        slide.style.setProperty("--offset", offset);
        slide.style.setProperty("--distance", Math.abs(offset));
        slide.toggleAttribute("data-far", Math.abs(offset) > 2);
        slide.setAttribute("aria-hidden", String(!isCurrent));
        slide.querySelector(".slide__link").tabIndex = isCurrent ? 0 : -1;
      });
      dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === current)));
      caption.textContent = SLIDES[current].summary;
    }

    function syncAutoplay() {
      const playing = !userPaused && !hovering && !focused && !document.hidden;
      clearInterval(timer);
      timer = playing ? setInterval(() => show(current + 1), AUTOPLAY_MS) : null;
      track.setAttribute("aria-live", playing ? "off" : "polite");
      toggle.setAttribute("aria-label", userPaused ? UI.carouselPlay : UI.carouselPause);
      root.classList.toggle("is-paused", userPaused);
    }

    // Swipe (touch or mouse drag) moves one card; a tap on a side card brings it forward.
    let swipeStartX = null;
    let swiped = false;
    track.addEventListener("pointerdown", (event) => {
      swipeStartX = event.clientX;
      swiped = false;
    });
    track.addEventListener("pointerup", (event) => {
      if (swipeStartX === null) return;
      const distance = event.clientX - swipeStartX;
      swipeStartX = null;
      if (Math.abs(distance) > SWIPE_PX) {
        swiped = true;
        show(current + (distance < 0 ? 1 : -1));
      }
    });
    track.addEventListener("pointercancel", () => {
      swipeStartX = null;
    });
    track.addEventListener("click", (event) => {
      const index = slides.indexOf(event.target.closest(".slide"));
      if (swiped || index !== current) event.preventDefault();
      if (!swiped && index !== current) show(index);
      swiped = false;
    });

    root.querySelectorAll(".carousel__arrow").forEach((button) => {
      button.addEventListener("click", () => show(current + Number(button.dataset.step)));
    });
    dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
    toggle.addEventListener("click", () => {
      userPaused = !userPaused;
      syncAutoplay();
    });

    // Pause while a mouse hovers or keyboard focus is inside. Touch taps don't count as hover.
    root.addEventListener("pointerenter", (event) => {
      hovering = event.pointerType === "mouse";
      syncAutoplay();
    });
    root.addEventListener("pointerleave", () => {
      hovering = false;
      syncAutoplay();
    });
    root.addEventListener("focusin", () => {
      focused = true;
      syncAutoplay();
    });
    root.addEventListener("focusout", (event) => {
      focused = root.contains(event.relatedTarget);
      syncAutoplay();
    });
    document.addEventListener("visibilitychange", syncAutoplay);
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) userPaused = true;
      syncAutoplay();
    });

    show(0);
    syncAutoplay();
  }

  applyText();
  renderNavigation();
  renderCarousel();
  renderHighlights();
  renderDirectory();
  renderCredits();
  setupMenu();
  setupCarousel();
})();
