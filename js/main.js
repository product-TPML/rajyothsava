/*
 * Builds the page from its data file (js/data.js, or js/data-en.js for the English
 * DH edition) and wires up search, menu, carousel, exhibition, quotes, videos, photo stories and archive.
 */
(() => {
  "use strict";

  const AUTOPLAY_MS = 5000;
  const SWIPE_PX = 40;
  const COLLECTION_TIMEOUT_MS = 5000;
  const TOP_STORIES = 20; // read from the top collection
  const CAROUSEL_STORIES = 10; // the first of those, in the desk's order, for the carousel
  // How many of a collection a section shows: the largest of these it has stories for, as
  // each one fills its layout evenly. "See all" appears only when the collection has more.
  const HIGHLIGHTS_COUNTS = [8, 5, 2, 1]; // the newest of the top stories; on desktop, the lead and one, then rows of three
  const PHOTO_STORIES_COUNTS = [5, 3, 1]; // one large photo with four, two or no small ones
  const FACTS_SHOWN = 6; // fills two or three columns evenly
  const ARCHIVE_SHOWN = 3; // one row of clippings; "See all" for the rest
  const VIDEOS_SHOWN = 5; // in the player's list; about as tall as the player on desktop
  const REELS_SHOWN = 10; // each reel is Instagram's whole player, so the row stays short
  const VIDEOS_PER_PAGE = 12; // on a "See all" page: fills two or three columns evenly
  const ALL_STORIES = 500; // the most a "See all" list is expected to hold, read in one go
  const STORIES_PER_PAGE = 24; // fills two or three columns evenly
  // Only what the page shows, so a collection of 500 stays around 100 KB.
  const STORY_FIELDS = "headline,subheadline,author-name,sections,url,published-at,hero-image-s3-key,hero-image-alt-text,hero-image-caption,hero-image-metadata";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /*
   * Each block runs only on pages that have it: the English (DH) edition leaves out
   * the quotes, videos and photo stories, and adds the archive.
   */
  const has = (id) => document.getElementById(id) !== null;
  const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);

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

  /*
   * A story photo from the newspaper's image server (COLLECTIONS.imageHost), which resizes on request.
   * focus → the desk's focus point as a CSS position ("40% 30%"), or null if the photo has none.
   */
  function collectionImage(story) {
    const at = (width) => `${COLLECTIONS.imageHost}${story["hero-image-s3-key"]}?w=${width}&auto=format%2Ccompress`;
    const meta = story["hero-image-metadata"];
    const point = meta?.["focus-point"];
    const percent = (value, size) => `${((value / size) * 100).toFixed(1)}%`;
    return {
      src: at(640),
      srcset: `${at(640)} 640w, ${at(1280)} 1280w`,
      alt: story["hero-image-alt-text"] || story["hero-image-caption"] || story.headline,
      focus: point && meta.width && meta.height ? `${percent(point[0], meta.width)} ${percent(point[1], meta.height)}` : null,
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

  /*
   * A story photo in a card (put the parent in class "media"). A photo with a focus point fills
   * the frame, cropped round that point. One without is shown whole, on a blurred copy of
   * itself (the same file, so nothing more to download).
   */
  function storyPhoto(image, options) {
    const img = photo(image, options);
    if (image.focus) {
      img.style.objectPosition = image.focus;
      return [img];
    }
    img.classList.add("media__img--whole");
    const backdrop = photo({ ...image, alt: "" }, options);
    backdrop.className = "media__backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    return [backdrop, img];
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
  const ATTRIBUTE_BINDINGS = { label: "aria-label", title: "title", href: "href", action: "action", placeholder: "placeholder", alt: "alt" };

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

  /* Line icons drawn in the shared .icon style: the phone's menus (PAGE_NAV icon) and the reel links. */
  const ICONS = {
    home: '<path d="M4 11l8-7 8 7v9h-5v-6h-6v6H4z"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    news: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    play: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/>',
    archive: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9M10 13h4"/>',
    photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  };

  function icon(name, className) {
    const holder = el("span", { class: className, "aria-hidden": "true" });
    holder.innerHTML = `<svg class="icon" viewBox="0 0 24 24">${ICONS[name]}</svg>`;
    return holder;
  }

  /*
   * The menus, linking to the parts of this page that are on it: the top bar, the
   * phone menu panel (each with its icon), and the phone's bottom bar (the parts with
   * a short label, before its menu button).
   */
  function renderNavigation() {
    const parts = PAGE_NAV.filter((part) => has(part.target));
    document.getElementById("nav-list").append(
      ...parts.map((part) => el("li", {}, el("a", { class: "site-nav__link", href: `#${part.target}` }, part.label)))
    );
    document.getElementById("menu-panel-list").append(
      ...parts.map((part) =>
        el("li", {}, el("a", { class: "menu-panel__link", href: `#${part.target}` }, icon(part.icon, "menu-panel__icon"), part.label))
      )
    );
    document.getElementById("bottom-nav-list").prepend(
      ...parts
        .filter((part) => part.short)
        .map((part) => el("li", {}, el("a", { class: "bottom-nav__link", href: `#${part.target}` }, icon(part.icon, "bottom-nav__icon"), el("span", {}, part.short))))
    );
  }

  /* Marks the menu links of the part being read (aria-current) as the reader scrolls. */
  function setupScrollSpy() {
    const links = document.querySelectorAll(".site-nav__link, .menu-panel__link, .bottom-nav__link");
    const watcher = new IntersectionObserver(
      (entries) => {
        const reading = entries.find((entry) => entry.isIntersecting);
        if (!reading) return;
        links.forEach((link) => {
          if (link.hash === `#${reading.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" } // a thin band across the middle of the screen
    );
    PAGE_NAV.forEach((part) => has(part.target) && watcher.observe(document.getElementById(part.target)));
  }

  /*
   * A part whose stories or videos can't be read, or has none yet, keeps its heading and
   * says so; no sample content stands in (owner's choice).
   */
  function showEmpty(id, message) {
    const container = document.getElementById(id).querySelector(".container");
    [...container.children].forEach((child) => child.matches(".section-title") || child.remove());
    container.append(el("p", { class: "empty-state" }, message));
  }

  /* The stories in a collection on the newspaper's site (COLLECTIONS in the data file), with a photo each. */
  async function collectionStories(slug, limit) {
    const response = await fetch(`${COLLECTIONS.api}${slug}?limit=${limit}&story-fields=${STORY_FIELDS}`, {
      cache: "no-cache", // ask the server each time, so the desk's edits show on the next load
      signal: AbortSignal.timeout(COLLECTION_TIMEOUT_MS),
    });
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

  const newestFirst = (stories) => [...stories].sort((a, b) => b.published - a.published);

  /*
   * The top collection feeds the carousel (its first stories, in the desk's order) and
   * the stories section (the newest of those read). It can only be read from the
   * newspaper's own site; elsewhere (or offline) both come back empty.
   */
  async function topStories() {
    const stories = await collectionStories(COLLECTIONS.top, TOP_STORIES).catch(() => []);
    return {
      slides: stories.slice(0, CAROUSEL_STORIES),
      highlights: newestFirst(stories),
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
          // facing the words; a speaker whose silhouette isn't made yet shows the words alone
          SILHOUETTE_ART[quote.art] && el("span", { class: "quote__portrait" }, drawSilhouette(quote.art, "quote", "right")),
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

  /* A Google Calendar "add event" link: all day, or with times in India time, over one day or several. */
  function calendarUrl(event) {
    const compact = (date) => date.replaceAll("-", "");
    const lastDay = event.endDate || event.date;
    let dates;
    if (event.time) {
      const at = (date, hhmm) => `${compact(date)}T${hhmm.replace(":", "")}00`;
      dates = `${at(event.date, event.time.start)}/${at(lastDay, event.time.end)}`;
    } else {
      const next = new Date(`${lastDay}T00:00:00Z`);
      next.setUTCDate(next.getUTCDate() + 1); // all-day entries end on the following day
      dates = `${compact(event.date)}/${compact(next.toISOString().slice(0, 10))}`;
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
    addEventData();
  }

  /*
   * The exhibition as schema.org event data, so search engines can list it as an event.
   * Built from EVENT, with the page's address, picture and publisher from #page-data.
   */
  function addEventData() {
    const page = JSON.parse(document.getElementById("page-data").textContent);
    const data = {
      "@context": "https://schema.org",
      "@type": "ExhibitionEvent",
      name: EVENT.calendarTitle,
      description: EVENT.text,
      startDate: EVENT.date,
      endDate: EVENT.endDate || EVENT.date,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: EVENT.venue, address: EVENT.location },
      image: [page.primaryImageOfPage],
      url: page.url,
      organizer: page.publisher,
      inLanguage: page.inLanguage,
    };
    document.head.append(el("script", { type: "application/ld+json" }, JSON.stringify(data)));
  }

  function storyCard(story, { lead = false } = {}) {
    return el(
      "li",
      { class: lead ? "card card--lead" : "card" },
      el(
        "div",
        { class: "card__media media" },
        ...storyPhoto(story.image, {
          sizes: lead ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 40vw",
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
  }

  /* The largest of counts (biggest first) that there are enough stories for. */
  function fittingCount(available, counts) {
    return counts.find((count) => count <= available) ?? 0;
  }

  /* A section's "See all" button shows only when its collection has more than the section shows. */
  function showSeeAll(sectionId, hasMore) {
    document.querySelector(`#${sectionId} .see-all .button`).hidden = !hasMore;
  }

  function renderHighlights(stories) {
    const shown = stories.slice(0, fittingCount(stories.length, HIGHLIGHTS_COUNTS));
    document.getElementById("highlights-list").append(...shown.map((story, i) => storyCard(story, { lead: i === 0 })));
    showSeeAll("highlights", stories.length > shown.length);
  }

  /*
   * Page links: first, last, and the current page with its neighbours; "…" fills the
   * gaps. Phones leave out the neighbours so the row fits.
   */
  function pagerLinks(key, current, pages) {
    const href = (page) => (page === 1 ? `#all/${key}` : `#all/${key}/${page}`);
    const step = (page, label, arrow) =>
      page >= 1 && page <= pages
        ? el("a", { class: "pager__step", href: href(page), "aria-label": label }, arrow)
        : el("span", { class: "pager__step", "aria-hidden": "true" }, arrow);

    const shown = [...new Set([1, current - 1, current, current + 1, pages])]
      .filter((page) => page >= 1 && page <= pages)
      .sort((a, b) => a - b);
    const links = [];
    shown.forEach((page, i) => {
      if (i > 0 && page - shown[i - 1] > 1) links.push(el("span", { class: "pager__gap", "aria-hidden": "true" }, "…"));
      const near = Math.abs(page - current) === 1 && page !== 1 && page !== pages;
      const className = near ? "pager__page pager__page--near" : "pager__page";
      const label = format(UI.pagerPage, { page });
      links.push(
        page === current
          ? el("span", { class: className, "aria-current": "page", "aria-label": label }, page)
          : el("a", { class: className, href: href(page), "aria-label": label }, page)
      );
    });
    return [step(current - 1, UI.pagerPrev, "‹"), ...links, step(current + 1, UI.pagerNext, "›")];
  }

  /*
   * Every list the "See all" view can show: each collection in STORY_LISTS (newest first
   * unless keepOrder)
   * and, on pages with videos, the two kinds from the editors' video list.
   * read → all the items; render → the cards for one page of them.
   */
  function seeAllLists() {
    const lists = Object.fromEntries(
      Object.entries(STORY_LISTS).map(([key, { collection, title, fallback, keepOrder }]) => [
        key,
        {
          title,
          fallback,
          count: UI.allStoriesCount,
          perPage: STORIES_PER_PAGE,
          grid: "card-grid",
          read: () => collectionStories(collection, ALL_STORIES).then(keepOrder ? (stories) => stories : newestFirst),
          render: async (stories) => stories.map((story) => storyCard(story)),
        },
      ])
    );
    if (has("video-list")) {
      const video = { count: UI.allVideosCount, perPage: VIDEOS_PER_PAGE };
      lists.videos = {
        ...video,
        title: UI.videosTitle,
        fallback: UI.seeAllYoutube,
        grid: "video-grid",
        read: () => videoFeed().then(({ wide }) => wide),
        render: async (sources) => (await withTitles(sources)).map(videoCard),
      };
      lists.reels = {
        ...video,
        title: UI.shortsTitle,
        fallback: UI.seeAllInstagram,
        grid: "reel-grid",
        read: () => videoFeed().then(({ upright }) => upright),
        render: async (sources) => sources.map((source) => shortCard({ source, title: "" })),
      };
    }
    return lists;
  }

  /*
   * "See all": while the address is #all/<key>[/<page>], the page shows every item in
   * that list (seeAllLists), a page at a time, in place of the home page. Each list is
   * read once, the first time it is opened. Page links change the address, so the
   * browser's back button steps back through them.
   */
  function setupAllStories() {
    const main = document.getElementById("main");
    const section = document.getElementById("all-stories");
    const title = document.getElementById("all-stories-title");
    const status = document.getElementById("all-stories-status");
    const list = document.getElementById("all-stories-list");
    const pager = document.getElementById("all-stories-pager");
    const lists = seeAllLists();
    const read = {};

    async function show(key, page) {
      const config = lists[key];
      const hash = location.hash;
      title.textContent = config.title;
      list.className = config.grid;
      list.replaceChildren();
      pager.replaceChildren();
      status.textContent = UI.allStoriesLoading;
      section.scrollIntoView();

      read[key] ??= config.read();
      const items = await read[key].catch(() => []);
      if (location.hash !== hash) return; // the reader moved on while it loaded
      if (!items.length) {
        delete read[key];
        status.replaceChildren(UI.allStoriesError, " ", el("a", { href: config.fallback }, UI.allStoriesErrorLink));
        return;
      }

      const pages = Math.ceil(items.length / config.perPage);
      const current = Math.min(page, pages);
      const cards = await config.render(items.slice((current - 1) * config.perPage, current * config.perPage));
      if (location.hash !== hash) return;
      status.textContent = format(config.count, { count: items.length, page: current, pages });
      list.append(...cards);
      if (pages > 1) pager.append(...pagerLinks(key, current, pages));
    }

    function route() {
      const [, key, page] = location.hash.match(/^#all\/(\w+)(?:\/(\d+))?$/) || [];
      if (Object.hasOwn(lists, key ?? "")) {
        main.dataset.view = "all";
        show(key, Math.max(1, Number(page) || 1));
      } else if (main.dataset.view) {
        // Back to the home page, at the place the address points to.
        delete main.dataset.view;
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      }
    }

    window.addEventListener("hashchange", route);
    route();
  }

  /*
   * "From the archives": the first stories in its collection, in the desk's order, each
   * a clipping (a double rule across the top) with its photo, headline and subheadline.
   */
  function renderArchive(stories) {
    document.getElementById("archive-list").append(
      ...stories.slice(0, ARCHIVE_SHOWN).map((story) =>
        el(
          "li",
          { class: "archive__item" },
          el("div", { class: "archive__media media" }, ...storyPhoto(story.image, { sizes: "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" })),
          el("h3", { class: "archive__title" }, el("a", { class: "card__link", href: story.href }, story.title)),
          story.summary && el("p", { class: "archive__summary" }, story.summary)
        )
      )
    );
    showSeeAll("archive", stories.length > ARCHIVE_SHOWN);
  }

  /*
   * A video link from YouTube or Instagram, as the editors paste it:
   * { kind: "youtube" | "instagram", id, link, upright }. upright → a YouTube Short or an
   * Instagram Reel. Anything else gives null.
   */
  function videoSource(link) {
    let url;
    try {
      url = new URL(link);
    } catch {
      return null;
    }
    const [, first, second] = url.pathname.split("/");
    if (url.hostname.endsWith("instagram.com")) return second ? { kind: "instagram", id: second, link, upright: true } : null;
    if (!/(^|\.)(youtube\.com|youtu\.be)$/.test(url.hostname)) return null;
    const id = url.hostname === "youtu.be" ? first : url.searchParams.get("v") || second;
    return id ? { kind: "youtube", id, link, upright: first === "shorts" } : null;
  }

  /* The links on the CMS page (VIDEO_FEED), which serves them as JSON: { "videos": [...] }. */
  async function videoLinks() {
    const response = await fetch(VIDEO_FEED, { cache: "no-cache", signal: AbortSignal.timeout(COLLECTION_TIMEOUT_MS) });
    if (!response.ok) throw new Error(`Video list: HTTP ${response.status}`);
    const { videos } = await response.json();
    return Array.isArray(videos) ? videos : [];
  }

  /* A YouTube video's title from YouTube, without its " | channel" endings and hashtags. */
  async function youtubeTitle(source) {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(source.link)}`);
      const { title } = await response.json();
      return title.split(" | ")[0].replace(/#\S+/g, "").trim();
    } catch {
      return "";
    }
  }

  function videoFrame(source, title) {
    const src =
      source.kind === "youtube"
        ? `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&enablejsapi=1`
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
    button.addEventListener("click", () => {
      const frame = videoFrame(source, title);
      button.replaceWith(frame);
      nowPlaying(frame);
    });
    return button;
  }

  /*
   * One video at a time. The players are YouTube's and Instagram's own frames, so when a
   * new one starts, the one before stops: YouTube is asked to pause; Instagram can't be
   * asked, so its frame is reloaded, which stops it.
   */
  let playingFrame = null;

  function nowPlaying(frame) {
    if (playingFrame && playingFrame !== frame && playingFrame.isConnected) stopVideo(playingFrame);
    playingFrame = frame;
  }

  function stopVideo(frame) {
    if (frame.src.includes("youtube")) {
      frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
    } else {
      frame.src = frame.src;
    }
  }

  /*
   * A reader starts an Instagram reel inside Instagram's frame, which the page can't see,
   * but the frame takes the focus. So while the focus is away from the page, the page
   * checks which frame has it, which also catches moving straight from one reel to the next.
   */
  function watchVideoFocus() {
    let timer;
    const check = () => {
      if (document.activeElement?.classList.contains("video-frame")) nowPlaying(document.activeElement);
    };
    window.addEventListener("blur", () => {
      check();
      timer = setInterval(check, 300);
    });
    window.addEventListener("focus", () => clearInterval(timer));
  }

  /* Wide videos: one player plus a list; choosing from the list plays it in the player. */
  function setupVideos(videos) {
    const player = document.getElementById("video-player");
    const list = document.getElementById("video-list");

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
      if (play) {
        const frame = videoFrame(video.source, video.title);
        player.replaceChildren(frame);
        nowPlaying(frame);
      } else {
        player.replaceChildren(videoCover(video.source, video.title, "hqdefault"));
      }
      document.getElementById("video-title").textContent = video.title;
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
  function shortCard({ source, title }) {
    if (source.kind === "instagram") {
      const frame = videoFrame(source, UI.reelTitle);
      frame.loading = "lazy";
      frame.setAttribute("scrolling", "no"); // the player is cropped to its video; nothing inside should scroll
      return el(
        "li",
        { class: "short short--instagram" },
        el("div", { class: "short__frame" }, frame),
        el("a", { class: "short__link", href: source.link, target: "_blank", rel: "noopener" }, icon("instagram", "short__icon"), UI.reelOnInstagram)
      );
    }
    return el(
      "li",
      { class: "short" },
      el("div", { class: "short__frame" }, videoCover(source, title, "oardefault")),
      el("p", { class: "short__title" }, title)
    );
  }

  function renderShorts(shorts) {
    document.getElementById("shorts-list").append(...shorts.map(shortCard));
  }

  /* A wide video on a "See all" page: its cover (it plays in place) and title. */
  function videoCard({ source, title }) {
    return el(
      "li",
      { class: "video-card" },
      el("div", { class: "video-card__frame" }, videoCover(source, title, "hqdefault")),
      el("h3", { class: "video-card__title" }, title)
    );
  }

  /* The editors' links, read once and sorted: { wide, upright } (sources from videoSource). */
  let feed;

  function videoFeed() {
    feed ??= videoLinks()
      .catch(() => [])
      .then((links) => {
        const sources = links.map((link) => videoSource(String(link).trim())).filter(Boolean);
        return { wide: sources.filter((source) => !source.upright), upright: sources.filter((source) => source.upright) };
      });
    return feed;
  }

  /* Each source with its title: YouTube's, fetched only for the videos being shown. */
  const withTitles = (sources) =>
    Promise.all(sources.map(async (source) => ({ source, title: source.kind === "youtube" ? await youtubeTitle(source) : "" })));

  /*
   * The videos section from the editors' list of links: the first wide videos in the
   * player, the first Reels in their row, and "see all" (seeMoreVideos) to the rest when there are
   * more. A part with nothing to show is left out, and so is the whole section if the
   * list can't be read.
   */
  async function setupVideoSection() {
    const { wide, upright } = await videoFeed();
    if (!wide.length && !upright.length) return showEmpty("videos", UI.emptyVideos);
    if (wide.length) setupVideos(await withTitles(wide.slice(0, VIDEOS_SHOWN)));
    else document.getElementById("video-wide").remove();
    if (upright.length) renderShorts(upright.slice(0, REELS_SHOWN).map((source) => ({ source, title: "" })));
    else document.getElementById("shorts-row").remove();
    document.getElementById("videos-more").hidden = wide.length <= VIDEOS_SHOWN;
    document.getElementById("reels-more").hidden = upright.length <= REELS_SHOWN;
  }

  /*
   * The first photo stories in their collection, each opening on prajavani.net; the first is
   * shown large. data-count tells the stylesheet which layout fills the grid.
   */
  function renderPhotoStories(stories) {
    const shown = stories.slice(0, fittingCount(stories.length, PHOTO_STORIES_COUNTS));
    const list = document.getElementById("photo-stories-list");
    list.dataset.count = shown.length;
    list.append(
      ...shown.map((story, i) =>
        el(
          "li",
          { class: i === 0 ? "photo-stories__cell photo-stories__cell--lead" : "photo-stories__cell" },
          el(
            "a",
            { class: "photo-stories__item media", href: story.href },
            ...storyPhoto(story.image, { sizes: i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw" }),
            el("span", { class: "photo-stories__caption" }, story.title)
          )
        )
      )
    );
    showSeeAll("photo-stories", stories.length > shown.length);
  }

  /* Interesting facts, numbered, each opening its story on prajavani.net. */
  function renderFacts(stories) {
    document.getElementById("facts-list").append(
      ...stories.slice(0, FACTS_SHOWN).map((story, i) =>
        el(
          "li",
          { class: "fact" },
          el("div", { class: "fact__media media" }, ...storyPhoto(story.image, { sizes: "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 40vw" })),
          el(
            "div",
            { class: "fact__body" },
            el("span", { class: "fact__number", "aria-hidden": "true" }, String(i + 1).padStart(2, "0")),
            el("h3", { class: "fact__title" }, el("a", { class: "card__link", href: story.href }, story.title))
          )
        )
      )
    );
    showSeeAll("facts", stories.length > FACTS_SHOWN);
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
   * taps and clicks don't count). Screen readers hear changes in `live` only while it
   * isn't moving by itself. Returns a function that restarts the count, for manual moves.
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
    root.addEventListener("focusin", (event) => {
      focused = event.target.matches(":focus-visible");
      sync();
    });
    root.addEventListener("focusout", (event) => {
      focused = root.contains(event.relatedTarget) && event.relatedTarget.matches(":focus-visible");
      sync();
    });
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    sync();
    return sync;
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

    show(0);
    // A single story has nothing to move to: no arrows, swiping or autoplay.
    if (slides.length < 2) {
      root.querySelectorAll(".carousel__arrow").forEach((arrow) => arrow.remove());
      return;
    }
    const restartAutoplay = autoplay(root, track, () => show(current + 1));

    // A manual move restarts the count, so the next card doesn't come too soon.
    function move(index) {
      show(index);
      restartAutoplay();
    }

    // Swipe moves one card; a tap on a side card brings it forward instead of following its link.
    const wasSwipe = addSwipe(track, (step) => move(current + step));
    track.addEventListener("click", (event) => {
      const index = slides.indexOf(event.target.closest(".slide"));
      if (wasSwipe() || index !== current) event.preventDefault();
      if (!wasSwipe() && index !== current) move(index);
    });

    root.querySelectorAll(".carousel__arrow").forEach((button) => {
      button.addEventListener("click", () => move(current + Number(button.dataset.step)));
    });
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
      const { date } = runSoFar[current];
      day.textContent = date === todayInIndia() ? UI.quotesToday : quoteDay(date); // after the last day, its date
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
   * Before the launch the <head> script hides the page and leaves the launch time in
   * data-launch: a countdown stands in, and the page reloads at zero to open the site.
   */
  function renderCountdown() {
    const launch = Number(document.documentElement.dataset.launch);
    // Each number is two flip cards (js/flip.js); screen readers get it as plain text.
    const units = UI.countdownUnits.map((label) => {
      const cards = el("span", { class: "countdown__value", "aria-hidden": "true" });
      const spoken = el("span", { class: "visually-hidden" });
      return { label, cards, spoken, digits: [flipCard(cards), flipCard(cards)] };
    });
    const mark = document.querySelector(".brand__mark").cloneNode();
    mark.className = "countdown__mark";
    // The menu panel's link home, with the newspaper's white logo (applyText has filled it in).
    const home = document.querySelector(".menu-panel__home").cloneNode(true);
    home.classList.add("countdown__home");
    home.querySelector("img").removeAttribute("loading");
    document.body.append(
      el("div", { class: "countdown" },
        el("div", { class: "countdown__header" }, mark),
        el("div", { class: "container countdown__body" },
          el("p", { class: "countdown__eyebrow" }, UI.countdownEyebrow),
          el("h2", { class: "countdown__title" }, UI.countdownTitle),
          el("ul", { class: "countdown__clock", role: "timer", "aria-label": UI.countdownLabel },
            ...units.map(({ label, cards, spoken }) =>
              el("li", { class: "countdown__unit" }, cards, spoken, el("span", { class: "countdown__label" }, label)))),
          home),
        el("div", { class: "flag-bar" })));

    function tick() {
      const left = launch - Date.now();
      if (left <= 0) {
        location.reload();
        return;
      }
      const seconds = Math.ceil(left / 1000);
      [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60]
        .forEach((n, i) => {
          units[i].spoken.textContent = n;
          [...String(n).padStart(2, "0")].forEach((digit, d) => units[i].digits[d](digit));
        });
      setTimeout(tick, left % 1000 || 1000);
    }
    tick();
  }

  applyText();
  if (document.documentElement.classList.contains("is-countdown")) {
    renderCountdown();
    return;
  }

  renderNavigation();
  renderEvent();
  const quotes = has("quotes-list") ? quotesRunSoFar() : [];
  if (quotes.length) renderQuotes(quotes);
  else document.querySelector(".quotes")?.remove();
  setupSearch();
  setupMenu();
  setupScrollSpy();
  if (has("all-stories")) setupAllStories();
  // The carousel waits for its stories; its height is fixed, so nothing below it moves.
  topStories().then(({ slides, highlights }) => {
    if (!slides.length) {
      showEmpty("featured", UI.emptyStories);
      showEmpty("highlights", UI.emptyStories);
      return;
    }
    renderCarousel(slides);
    setupCarousel(slides);
    renderHighlights(highlights);
  });
  if (quotes.length) setupQuotes(quotes);
  if (has("video-list")) {
    setupVideoSection();
    watchVideoFocus();
  }
  if (has("photo-stories-list")) {
    // One more than can be shown, to know whether "See all" has more to show.
    collectionStories(COLLECTIONS.photo, PHOTO_STORIES_COUNTS[0] + 1)
      .catch(() => [])
      .then((stories) => (stories.length ? renderPhotoStories(stories) : showEmpty("photo-stories", UI.emptyStories)));
  }
  if (has("facts-list")) {
    collectionStories(COLLECTIONS.facts, FACTS_SHOWN + 1)
      .catch(() => [])
      .then((stories) => (stories.length ? renderFacts(stories) : showEmpty("facts", UI.emptyStories)));
  }
  if (has("archive-list")) {
    // One more than is shown, to know whether "See all" has more to show.
    collectionStories(COLLECTIONS.archive, ARCHIVE_SHOWN + 1)
      .catch(() => [])
      .then((stories) => (stories.length ? renderArchive(stories) : showEmpty("archive", UI.emptyStories)));
  }
})();
