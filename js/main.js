/* Builds the page from js/data.js and wires up search, menu, carousel, quotes, videos and gallery. */
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

  const byline = (tag, author) => el(tag, { class: "byline" }, format(UI.byline, { author }));

  /* data-text="key" fills an element's text from UI; these fill an attribute instead. */
  const ATTRIBUTE_BINDINGS = { label: "aria-label", href: "href", placeholder: "placeholder" };

  function applyText() {
    document.querySelectorAll("[data-text]").forEach((node) => {
      node.textContent = UI[node.dataset.text];
    });
    for (const [key, attribute] of Object.entries(ATTRIBUTE_BINDINGS)) {
      document.querySelectorAll(`[data-${key}]`).forEach((node) => {
        node.setAttribute(attribute, UI[node.dataset[key]]);
      });
    }
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
      ...SECTIONS.map((section) => el("li", {}, el("a", { class: "menu-panel__link", href: sectionHref(section) }, section.kn)))
    );

    document.getElementById("footer-links").append(
      ...SECTIONS.map((section) => el("li", {}, el("a", { href: sectionHref(section) }, section.kn)))
    );
  }

  function renderCarousel() {
    const track = document.getElementById("carousel-track");

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
              el("span", { class: "slide__title" }, slide.title),
              byline("span", slide.author)
            )
          )
        )
      );
    });
  }

  function renderQuotes() {
    document.getElementById("quotes-list").append(
      ...QUOTES.map((quote) =>
        el(
          "li",
          { class: "quote" },
          el("span", { class: "quote__portrait" }, drawSilhouette(quote.art, "quote", "right")), // facing the words
          el(
            "blockquote",
            { class: "quote__words" },
            el("p", { class: "quote__text" }, quote.text),
            el("footer", { class: "quote__by" }, quote.by)
          )
        )
      )
    );
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
            el("p", { class: "card__summary" }, story.summary),
            byline("p", story.author)
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
    const items = [
      ...Object.values(IMAGES).map(({ alt, credit }) => ({ label: alt, credit })),
      ...VIDEOS.map(({ title, credit }) => ({ label: title, credit })),
    ];
    document.getElementById("credits-list").append(
      ...items.map(({ label, credit }) =>
        el("li", {}, el("a", { href: credit.source }, label), ` – ${credit.author}, ${credit.license}`)
      )
    );
  }

  /* Video gallery: one player plus a playlist; choosing an item loads and plays it. */
  function setupVideos() {
    const player = document.getElementById("video-player");
    const list = document.getElementById("video-list");

    const items = VIDEOS.map((video, i) =>
      el(
        "li",
        {},
        el(
          "button",
          { class: "video-list__item", type: "button", "data-index": i },
          el(
            "span",
            { class: "video-list__thumb" },
            el("img", { class: "media__img", src: `assets/videos/${video.file}-poster.webp`, alt: "", loading: "lazy" }),
            el("span", { class: "video-list__duration" }, video.duration)
          ),
          el(
            "span",
            { class: "video-list__text" },
            el("span", { class: "video-list__title" }, video.title),
            el("span", { class: "byline" }, format(UI.videoCredit, { author: video.credit.author }))
          )
        )
      )
    );
    list.append(...items);

    function load(index, { autoplay }) {
      const video = VIDEOS[index];
      player.src = `assets/videos/${video.file}.mp4`;
      player.poster = `assets/videos/${video.file}-poster.webp`;
      document.getElementById("video-tag").textContent = sectionsById[video.section].kn;
      document.getElementById("video-title").textContent = video.title;
      document.getElementById("video-summary").textContent = video.summary;
      document.getElementById("video-credit").textContent = format(UI.videoCredit, { author: video.credit.author });
      items.forEach((item, i) => item.firstChild.setAttribute("aria-current", String(i === index)));
      // Picking another video quickly interrupts the previous play() request; that is expected.
      if (autoplay) player.play().catch(() => {});
    }

    list.addEventListener("click", (event) => {
      const button = event.target.closest(".video-list__item");
      if (button) load(Number(button.dataset.index), { autoplay: true });
    });

    load(0, { autoplay: false });
  }

  /* Photo gallery: a mosaic of thumbnails that open a full-screen viewer. */
  function setupGallery() {
    const list = document.getElementById("gallery-list");
    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightbox-img");
    let current = 0;

    list.append(
      ...GALLERY.map((key, i) =>
        el(
          "li",
          { class: i === 0 ? "gallery__cell gallery__cell--lead" : "gallery__cell" },
          el(
            "button",
            {
              class: "gallery__item",
              type: "button",
              "data-index": i,
              "aria-label": format(UI.galleryOpen, { caption: IMAGES[key].alt }),
            },
            photo(key, { sizes: i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw" }),
            el("span", { class: "gallery__caption", "aria-hidden": "true" }, IMAGES[key].alt)
          )
        )
      )
    );

    function show(index) {
      current = (index + GALLERY.length) % GALLERY.length;
      const { alt, credit } = IMAGES[GALLERY[current]];
      image.src = `assets/images/${GALLERY[current]}-1280.webp`;
      image.alt = alt;
      document.getElementById("lightbox-caption").textContent = alt;
      document.getElementById("lightbox-credit").textContent = format(UI.photoCredit, { author: credit.author });
      document.getElementById("lightbox-count").textContent = format(UI.slideOf, { n: current + 1, total: GALLERY.length });
    }

    list.addEventListener("click", (event) => {
      const button = event.target.closest(".gallery__item");
      if (!button) return;
      show(Number(button.dataset.index));
      lightbox.showModal();
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", () => lightbox.close());
    lightbox.querySelectorAll(".lightbox__arrow").forEach((button) => {
      button.addEventListener("click", () => show(current + Number(button.dataset.step)));
    });
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
    addSwipe(lightbox.querySelector(".lightbox__figure"), (step) => show(current + step));
  }

  /*
   * Live search over every article (carousel + highlights): matches headline,
   * summary, author and section name. Phones find it at the top of the menu panel;
   * wider screens show it in the masthead, next to the brand.
   */
  function setupSearch() {
    const root = document.querySelector(".search");
    const wide = window.matchMedia("(min-width: 768px)");
    const panelList = document.getElementById("menu-panel-list");
    const brand = document.querySelector(".masthead .brand");
    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    const status = document.getElementById("search-status");
    const list = document.getElementById("search-list");

    const articles = [...SLIDES, ...HIGHLIGHTS].map((article) => {
      const section = sectionsById[article.section];
      return {
        ...article,
        sectionName: section.kn,
        href: sectionHref(section),
        text: [article.title, article.summary, article.author, section.kn, section.en].join(" ").toLowerCase(),
      };
    });

    function hideResults() {
      results.hidden = true;
    }

    function place() {
      if (wide.matches) brand.after(root);
      else panelList.before(root);
    }

    function update() {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        hideResults();
        return;
      }
      const matches = articles.filter((article) => article.text.includes(query));
      status.textContent = matches.length ? format(UI.searchResults, { n: matches.length }) : UI.searchNoResults;
      list.replaceChildren(
        ...matches.map((article) =>
          el(
            "li",
            {},
            el(
              "a",
              { class: "search__result", href: article.href },
              el("span", { class: "search__result-title" }, article.title),
              el("span", { class: "search__result-meta" }, `${article.sectionName} · ${format(UI.byline, { author: article.author })}`)
            )
          )
        )
      );
      results.hidden = false;
    }

    input.addEventListener("input", update);
    input.addEventListener("focus", update);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      list.querySelector("a")?.click();
    });
    list.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      input.value = "";
      hideResults();
    });
    root.addEventListener("focusout", (event) => {
      if (!root.contains(event.relatedTarget)) hideResults();
    });
    root.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hideResults();
    });
    wide.addEventListener("change", place);
    place();
  }

  function setupMenu() {
    const panel = document.getElementById("menu-panel");
    // Opened from the masthead on phones and from the nav bar on wider screens.
    document.querySelectorAll('[aria-controls="menu-panel"]').forEach((button) => {
      button.addEventListener("click", () => panel.showModal());
    });
    panel.querySelector(".menu-panel__close").addEventListener("click", () => panel.close());
    // Close on a backdrop click or after choosing a section.
    panel.addEventListener("click", (event) => {
      if (event.target === panel || event.target.closest("a")) panel.close();
    });
  }

  /*
   * Calls onSwipe(1) for a leftward drag and onSwipe(-1) for a rightward one (touch or mouse).
   * Returns a function that tells click handlers whether the last gesture was a swipe.
   */
  function addSwipe(element, onSwipe) {
    let startX = null;
    let swiped = false;
    element.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
      swiped = false;
    });
    element.addEventListener("pointerup", (event) => {
      if (startX === null) return;
      const distance = event.clientX - startX;
      startX = null;
      if (Math.abs(distance) > SWIPE_PX) {
        swiped = true;
        onSwipe(distance < 0 ? 1 : -1);
      }
    });
    element.addEventListener("pointercancel", () => {
      startX = null;
    });
    return () => swiped;
  }

  /* Signed distance from the front card, taking the shorter way round the loop. */
  function loopOffset(index, current, count) {
    const offset = (index - current + count) % count;
    return offset > count / 2 ? offset - count : offset;
  }

  /*
   * Moves a rotating block on by itself every AUTOPLAY_MS, except with reduced motion,
   * in a background tab, or while a mouse hovers or keyboard focus is inside (touch
   * taps don't count as hover). Screen readers hear changes in `live` only while it
   * isn't moving by itself.
   */
  function autoplay(root, live, advance) {
    let timer = null;
    let hovering = false;
    let focused = false;

    function sync() {
      const playing = !reducedMotion.matches && !hovering && !focused && !document.hidden;
      clearInterval(timer);
      timer = playing ? setInterval(advance, AUTOPLAY_MS) : null;
      live.setAttribute("aria-live", playing ? "off" : "polite");
    }

    root.addEventListener("pointerenter", (event) => {
      hovering = event.pointerType === "mouse";
      sync();
    });
    root.addEventListener("pointerleave", () => {
      hovering = false;
      sync();
    });
    root.addEventListener("focusin", () => {
      focused = true;
      sync();
    });
    root.addEventListener("focusout", (event) => {
      focused = root.contains(event.relatedTarget);
      sync();
    });
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    sync();
  }

  /*
   * Stacked-card carousel: the current story sits in front, neighbours fan out
   * behind it. JS only sets each card's --offset/--distance; CSS does the layout.
   */
  function setupCarousel() {
    const root = document.querySelector(".carousel");
    const track = document.getElementById("carousel-track");
    const caption = document.getElementById("carousel-caption");
    const slides = [...track.children];

    let current = 0;

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
      caption.textContent = SLIDES[current].summary;
    }

    // Swipe moves one card; a tap on a side card brings it forward instead of following its link.
    const wasSwipe = addSwipe(track, (step) => show(current + step));
    track.addEventListener("click", (event) => {
      const index = slides.indexOf(event.target.closest(".slide"));
      if (wasSwipe() || index !== current) event.preventDefault();
      if (!wasSwipe() && index !== current) show(index);
    });

    root.querySelectorAll(".carousel__arrow").forEach((button) => {
      button.addEventListener("click", () => show(current + Number(button.dataset.step)));
    });

    show(0);
    autoplay(root, track, () => show(current + 1));
  }

  /* Quotes in the red banner: one at a time, each beside its speaker's silhouette. */
  function setupQuotes() {
    const root = document.querySelector(".quotes");
    const list = document.getElementById("quotes-list");
    const quotes = [...list.children];
    let current = 0;

    function show(index) {
      current = (index + quotes.length) % quotes.length;
      quotes.forEach((quote, i) => quote.setAttribute("aria-hidden", String(i !== current)));
    }

    addSwipe(list, (step) => show(current + step));

    show(0);
    autoplay(root, list, () => show(current + 1));
  }

  applyText();
  renderNavigation();
  renderCarousel();
  renderQuotes();
  renderHighlights();
  renderDirectory();
  renderCredits();
  setupSearch();
  setupMenu();
  setupCarousel();
  setupQuotes();
  setupVideos();
  setupGallery();
})();
