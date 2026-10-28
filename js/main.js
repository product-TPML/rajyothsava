/*
 * Builds the page from its data file (js/data.js, or js/data-en.js for the English
 * DH edition) and wires up search, menu, carousel, exhibition, quotes, videos, photo stories and archive.
 */
(() => {
  "use strict";

  const AUTOPLAY_MS = 6000;
  const SWIPE_PX = 40;
  const COLLECTION_TIMEOUT_MS = 5000;
  const TOP_STORIES = 20; // read from the top collection, for the stories section
  const CAROUSEL_STORIES = 10; // the first of those, in the desk's order, for the carousel
  const PHOTO_STORIES_SHOWN = 5; // one large and four small fill the grid evenly
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
    node.append(...children.filter((child) => child !== false && child != null));
    return node;
  }

  /* One of our own photos in assets/images, at two widths. */
  const localImage = (key) => ({
    src: `assets/images/${key}-640.webp`,
    srcset: `assets/images/${key}-640.webp 640w, assets/images/${key}-1280.webp 1280w`,
    alt: IMAGES[key].alt,
  });

  /* A story photo from prajavani.net's image server, which resizes on request. */
  function collectionImage(story) {
    const at = (width) => `${COLLECTIONS.imageHost}${story["hero-image-s3-key"]}?w=${width}&auto=format%2Ccompress`;
    return {
      src: at(640),
      srcset: `${at(640)} 640w, ${at(1280)} 1280w`,
      alt: story["hero-image-alt-text"] || story["hero-image-caption"] || story.headline,
    };
  }

  function photo(image, { sizes, priority = false }) {
    return el("img", {
      class: "media__img",
      src: image.src,
      srcset: image.srcset,
      sizes,
      alt: image.alt,
      loading: priority ? "eager" : "lazy",
      fetchpriority: priority ? "high" : false,
      decoding: "async",
    });
  }

  const RECENCY_UNITS = [["minute", 60], ["hour", 24], ["day", 7]];

  /* How long ago, in the page's language ("2 ಗಂಟೆಗಳ ಹಿಂದೆ", "ನಿನ್ನೆ"); past a week, the date. */
  function recency(published) {
    const lang = document.documentElement.lang;
    let value = Math.trunc((published - Date.now()) / 60000);
    for (const [unit, perNext] of RECENCY_UNITS) {
      if (Math.abs(value) < perNext) return new Intl.RelativeTimeFormat(lang, { numeric: "auto" }).format(value, unit);
      value = Math.trunc(value / perNext);
    }
    return new Intl.DateTimeFormat(lang, { day: "numeric", month: "long", timeZone: "Asia/Kolkata" }).format(published);
  }

  /* The author, and when the story was published if known (collection stories). */
  const byline = (tag, author, published) =>
    el(
      tag,
      { class: "byline" },
      format(UI.byline, { author }),
      published && " · ",
      published && el("time", { datetime: new Date(published).toISOString() }, recency(published))
    );

  /* data-text="key" fills an element's text from UI; these fill an attribute instead. */
  const ATTRIBUTE_BINDINGS = { label: "aria-label", href: "href", action: "action", placeholder: "placeholder" };

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
            section.name
          )
        )
      )
    );

    document.getElementById("menu-panel-list").append(
      ...SECTIONS.map((section) => el("li", {}, el("a", { class: "menu-panel__link", href: sectionHref(section) }, section.name)))
    );
  }

  function renderFooterLinks() {
    document.getElementById("footer-links").append(
      ...SECTIONS.map((section) => el("li", {}, el("a", { href: sectionHref(section) }, section.name)))
    );
  }

  /* Carousel slides from SLIDES in the data file, in the same shape as collection slides. */
  /* Stories from the data file (SLIDES, HIGHLIGHTS) in the same shape as collection stories. */
  function localStories(list) {
    return list.map((story) => {
      const section = sectionsById[story.section];
      return { ...story, tag: section.name, href: sectionHref(section), image: localImage(story.image) };
    });
  }

  /* The stories in a collection on prajavani.net (COLLECTIONS in the data file), with a photo each. */
  async function collectionStories(slug, limit) {
    const response = await fetch(`${COLLECTIONS.api}${slug}?limit=${limit}`, { signal: AbortSignal.timeout(COLLECTION_TIMEOUT_MS) });
    if (!response.ok) throw new Error(`Collection ${slug}: HTTP ${response.status}`);
    const { items } = await response.json();
    return items
      .filter((item) => item.type === "story" && item.story["hero-image-s3-key"])
      .map(({ story }) => ({
        title: story.headline,
        // Only the desk's subheadline, never the story's opening paragraph (owner's choice).
        summary: story.subheadline || "",
        author: story["author-name"],
        tag: story.sections[0]?.["display-name"] || story.sections[0]?.name || "",
        href: story.url,
        published: story["published-at"],
        image: collectionImage(story),
      }));
  }

  /*
   * The top collection feeds the carousel (its first stories, in the desk's order) and
   * the stories section (all that are read, newest first). Where the page has no
   * collection, or it can't be read (offline, or a page not served from prajavani.net,
   * which the browser blocks), SLIDES and HIGHLIGHTS are used instead.
   */
  async function topStories() {
    const stories = typeof COLLECTIONS === "undefined" ? [] : await collectionStories(COLLECTIONS.top, TOP_STORIES).catch(() => []);
    if (!stories.length) return { slides: localStories(SLIDES), highlights: localStories(HIGHLIGHTS) };
    return {
      slides: stories.slice(0, CAROUSEL_STORIES),
      highlights: [...stories].sort((a, b) => b.published - a.published),
    };
  }

  function renderCarousel(slides) {
    const track = document.getElementById("carousel-track");

    slides.forEach((slide, i) => {
      track.append(
        el(
          "li",
          {
            class: "slide",
            "aria-roledescription": "slide",
            "aria-label": format(UI.slideOf, { n: i + 1, total: slides.length }),
          },
          el(
            "a",
            { class: "slide__link", href: slide.href, draggable: "false" },
            // Portrait cards crop landscape photos, so the photo renders wider than the card.
            photo(slide.image, {
              sizes: "(min-width: 1024px) 645px, (min-width: 768px) 560px, 135vw",
              priority: i === 0,
            }),
            el(
              "span",
              { class: "slide__body" },
              el("span", { class: "tag" }, slide.tag),
              el("span", { class: "slide__title" }, slide.title),
              byline("span", slide.author)
            )
          )
        )
      );
    });
  }

  /* Today's date in India as "YYYY-MM-DD", the format of each quote's date. */
  const todayInIndia = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());

  /* Only the quotes that have run so far, today's first. */
  function quotesRunSoFar() {
    const today = todayInIndia();
    return QUOTES.filter((quote) => quote.date <= today).sort((a, b) => b.date.localeCompare(a.date));
  }

  function renderQuotes(quotes) {
    document.getElementById("quotes-list").append(
      ...quotes.map((quote) =>
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

  /* A Google Calendar "add event" link: all day, or with times in India time. */
  function calendarUrl(event) {
    const day = event.date.replaceAll("-", "");
    let dates;
    if (event.time) {
      const at = (hhmm) => `${day}T${hhmm.replace(":", "")}00`;
      dates = `${at(event.time.start)}/${at(event.time.end)}`;
    } else {
      const next = new Date(`${event.date}T00:00:00Z`);
      next.setUTCDate(next.getUTCDate() + 1); // all-day entries end on the following day
      dates = `${day}/${next.toISOString().slice(0, 10).replaceAll("-", "")}`;
    }
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.calendarTitle,
      dates,
      details: event.text,
      location: event.location,
    });
    if (event.time) params.set("ctz", "Asia/Kolkata");
    return `https://calendar.google.com/calendar/render?${params}`;
  }

  /* data-event="key" fills an element's text from EVENT, like data-text does from UI. */
  function renderEvent() {
    document.querySelectorAll("[data-event]").forEach((node) => {
      node.textContent = EVENT[node.dataset.event];
    });
    document.getElementById("event-when").textContent =
      [EVENT.dateLabel, EVENT.time && EVENT.time.label].filter(Boolean).join(", ");
    document.getElementById("event-calendar").href = calendarUrl(EVENT);
  }

  function renderHighlights(stories) {
    document.getElementById("highlights-list").append(
      ...stories.map((story, i) => {
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
            el("span", { class: "tag" }, story.tag),
            el("h3", { class: "card__title" }, el("a", { class: "card__link", href: story.href }, story.title)),
            story.summary && el("p", { class: "card__summary" }, story.summary),
            byline("p", story.author, story.published)
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
          el("span", { class: "directory__name" }, section.name),
          el("span", { class: "directory__en", lang: "en" }, section.en),
          el("span", { class: "directory__status" }, UI.comingSoon)
        )
      )
    );
  }

  /* "From the archives": one clipping per moment, newest last. */
  function renderArchive() {
    document.getElementById("archive-list").append(
      ...ARCHIVE.map((story) =>
        el(
          "li",
          { class: "archive__item" },
          el("span", { class: "archive__year", "aria-hidden": "true" }, story.year),
          el("p", { class: "archive__dateline" }, story.date),
          el("h3", { class: "archive__title" }, story.title),
          el("p", { class: "archive__summary" }, story.summary),
          el("p", { class: "archive__status" }, UI.archiveComingSoon)
        )
      )
    );
  }

  function renderCredits() {
    document.getElementById("credits-list").append(
      ...Object.values(IMAGES).map(({ alt, credit }) =>
        el("li", {}, el("a", { href: credit.source }, alt), `: ${credit.author}, ${credit.license}`)
      )
    );
  }

  /*
   * A video link from YouTube or Instagram, as pasted into the data file:
   * { kind: "youtube" | "instagram", id }.
   */
  function videoSource(link) {
    const url = new URL(link);
    if (url.hostname.endsWith("instagram.com")) return { kind: "instagram", id: url.pathname.split("/")[2] };
    const id = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v") || url.pathname.split("/")[2];
    return { kind: "youtube", id };
  }

  function videoFrame(source, title) {
    const src =
      source.kind === "youtube"
        ? `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0`
        : `https://www.instagram.com/reel/${source.id}/embed/`;
    return el("iframe", {
      class: "video-frame",
      src,
      title,
      allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
      allowfullscreen: "",
    });
  }

  /*
   * A YouTube cover with a play button. YouTube's player loads only when it is
   * tapped, so the page stays light and YouTube sees nothing until then.
   */
  function videoCover(source, title, cover) {
    const button = el(
      "button",
      { class: "video-cover", type: "button", "aria-label": format(UI.videoPlay, { title }) },
      el("img", { class: "media__img", src: `https://i.ytimg.com/vi/${source.id}/${cover}.jpg`, alt: "", loading: "lazy" }),
      el("span", { class: "video-cover__play", "aria-hidden": "true" })
    );
    button.addEventListener("click", () => button.replaceWith(videoFrame(source, title)));
    return button;
  }

  /* Wide videos: one player plus a list; choosing from the list plays it in the player. */
  function setupVideos() {
    const player = document.getElementById("video-player");
    const list = document.getElementById("video-list");
    const videos = VIDEOS.map((video) => ({ ...video, source: videoSource(video.link) }));

    const items = videos.map((video, i) =>
      el(
        "li",
        {},
        el(
          "button",
          { class: "video-list__item", type: "button", "data-index": i },
          el(
            "span",
            { class: "video-list__thumb" },
            el("img", { class: "media__img", src: `https://i.ytimg.com/vi/${video.source.id}/mqdefault.jpg`, alt: "", loading: "lazy" })
          ),
          el("span", { class: "video-list__title" }, video.title)
        )
      )
    );
    list.append(...items);

    function load(index, { play }) {
      const video = videos[index];
      player.replaceChildren(play ? videoFrame(video.source, video.title) : videoCover(video.source, video.title, "hqdefault"));
      document.getElementById("video-tag").textContent = sectionsById[video.section].name;
      document.getElementById("video-title").textContent = video.title;
      document.getElementById("video-summary").textContent = video.summary;
      items.forEach((item, i) => item.firstChild.setAttribute("aria-current", String(i === index)));
    }

    list.addEventListener("click", (event) => {
      const button = event.target.closest(".video-list__item");
      if (button) load(Number(button.dataset.index), { play: true });
    });

    load(0, { play: false });
  }

  /*
   * Upright videos in a row that scrolls sideways. YouTube Shorts show a cover until
   * tapped; Instagram gives no cover, so Reels show Instagram's own player, loaded
   * as they scroll near.
   */
  function renderShorts() {
    document.getElementById("shorts-list").append(
      ...SHORTS.map((short) => {
        const source = videoSource(short.link);
        if (source.kind === "instagram") {
          const frame = videoFrame(source, short.title);
          frame.loading = "lazy";
          return el("li", { class: "short short--instagram" }, frame);
        }
        return el(
          "li",
          { class: "short" },
          el("div", { class: "short__frame" }, videoCover(source, short.title, "oardefault")),
          el("p", { class: "short__title" }, short.title)
        );
      })
    );
  }

  /* The first photo stories in their collection, each opening on prajavani.net; the first is shown large. */
  function renderPhotoStories(stories) {
    document.getElementById("photo-stories-list").append(
      ...stories.map((story, i) =>
        el(
          "li",
          { class: i === 0 ? "photo-stories__cell photo-stories__cell--lead" : "photo-stories__cell" },
          el(
            "a",
            { class: "photo-stories__item", href: story.href },
            photo(story.image, { sizes: i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw" }),
            el("span", { class: "photo-stories__caption" }, story.title)
          )
        )
      )
    );
  }

  /*
   * The search form sends the query to the main site's search page (UI.searchUrl).
   * Phones find it at the top of the menu panel; wider screens show it in the
   * masthead, next to the brand.
   */
  function setupSearch() {
    const root = document.querySelector(".search");
    const wide = window.matchMedia("(min-width: 768px)");
    const panelList = document.getElementById("menu-panel-list");
    const brand = document.querySelector(".masthead .brand");

    function place() {
      if (wide.matches) brand.after(root);
      else panelList.before(root);
    }

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
  function setupCarousel(stories) {
    const root = document.querySelector(".carousel");
    const track = document.getElementById("carousel-track");
    const caption = document.getElementById("carousel-caption");
    const slides = [...track.children];
    // The caption keeps a fixed height so the page doesn't move; with no summaries at all it goes.
    if (!stories.some((story) => story.summary)) caption.remove();

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
      caption.textContent = stories[current].summary;
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

  /* "{month} {day}" for a quote's date, with the month's name in Kannada. */
  function quoteDay(date) {
    const parts = new Intl.DateTimeFormat("kn-IN", { day: "numeric", month: "long", timeZone: "Asia/Kolkata" })
      .formatToParts(new Date(`${date}T12:00:00+05:30`));
    const part = (type) => parts.find((p) => p.type === type).value;
    return format(UI.quotesDay, { month: part("month"), day: part("day") });
  }

  /*
   * Quotes in the red banner, today's first: one at a time, each beside its speaker's
   * silhouette. The back arrow (or a swipe) goes to earlier days, the other comes back.
   */
  function setupQuotes(runSoFar) {
    const nav = document.getElementById("quotes-nav");
    const quotes = [...document.getElementById("quotes-list").children];
    const day = document.getElementById("quotes-day");
    const [back, forward] = nav.querySelectorAll("button");
    let current = 0;

    function show(index) {
      current = Math.min(Math.max(index, 0), quotes.length - 1);
      quotes.forEach((quote, i) => quote.setAttribute("aria-hidden", String(i !== current)));
      day.textContent = current === 0 ? UI.quotesToday : quoteDay(runSoFar[current].date);
      back.disabled = current === quotes.length - 1;
      forward.disabled = current === 0;
    }

    nav.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => show(current + Number(button.dataset.step)));
    });
    // Swiping left brings a later day, as with the carousel; swiping right goes back.
    addSwipe(document.getElementById("quotes-list"), (step) => show(current - step));

    show(0);
  }

  /*
   * Each block runs only on pages that have it: the English (DH) edition leaves out
   * the quotes, videos, photo stories and section directory, and adds the archive.
   */
  const has = (id) => document.getElementById(id) !== null;

  applyText();
  renderNavigation();
  renderEvent();
  const quotes = has("quotes-list") ? quotesRunSoFar() : [];
  if (quotes.length) renderQuotes(quotes);
  else document.querySelector(".quotes")?.remove();
  if (has("archive-list")) renderArchive();
  if (has("directory-list")) renderDirectory();
  if (has("footer-links")) renderFooterLinks();
  renderCredits();
  setupSearch();
  setupMenu();
  // The carousel waits for its stories; its height is fixed, so nothing below it moves.
  topStories().then(({ slides, highlights }) => {
    renderCarousel(slides);
    setupCarousel(slides);
    renderHighlights(highlights);
  });
  if (quotes.length) setupQuotes(quotes);
  if (has("video-list")) {
    setupVideos();
    renderShorts();
  }
  if (has("photo-stories-list")) {
    // Left out when its collection can't be read.
    collectionStories(COLLECTIONS.photo, PHOTO_STORIES_SHOWN)
      .catch(() => [])
      .then((stories) => (stories.length ? renderPhotoStories(stories) : document.getElementById("photo-stories").remove()));
  }
})();
