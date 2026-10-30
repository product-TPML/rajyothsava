/*
 * All content for the English edition (Deccan Herald, index-en.html) lives here.
 * It mirrors js/data.js, without the quotes, videos, photo stories and facts, and adds
 * "From the archives". Stories come only from deccanherald.com collections: when they
 * can't be read, or there are none yet, their section says so (emptyStories).
 */

/* Interface text. Elements in index-en.html with data-text="key" receive these. */
const UI = {
  skipLink: "Skip to main content",
  headerAction: "Back to Deccan Herald home", // the header's logo-and-home-icon link: its name and hover text
  searchLabel: "Search Deccan Herald",
  searchPlaceholder: "Search Deccan Herald",
  searchUrl: "https://www.deccanherald.com/search",
  byline: "By {author}",
  headerActionUrl: "https://www.deccanherald.com/",
  navLabel: "On this page",
  menuTitle: "On this page",
  menuHome: "Back to home", // after the newspaper's logo, at the foot of the menu panel
  menuButton: "Menu",
  menuClose: "Close",

  featuredTitle: "Top stories",
  carouselPrev: "Previous story",
  carouselNext: "Next story",
  slideOf: "{n} / {total}",

  // What Karunadotsava stands for: after the carousel, and on the opening's closing screen.
  // A blank line ("\n\n") starts a new paragraph.
  aboutTitle: "About Karunadotsava",
  aboutText:
    "Karunadotsava celebrates the soul of Karnataka — its pride in Kannada, the richness of its linguistic " +
    "diversity, including Tulu, Konkani, Kodava and Urdu, its timeless heritage, vibrant culture and the " +
    "indomitable spirit of its people.\n\nAs the State celebrates its rich legacy while embracing the " +
    "possibilities of the future, Deccan Herald brings these stories, voices and traditions to the forefront, " +
    "highlighting the many facets of Karnataka’s identity and championing the diverse expressions that make " +
    "the State truly special.",

  // The digital subscription offer, after "About Karunadotsava". The newspaper's name is its logo,
  // so the text leaves it out; the price is set large in gold.
  subscribeTag: "Premium",
  subscribeText: "Digital subscription, now at",
  subscribePrice: "₹1299/year",
  subscribeButton: "Subscribe now",
  subscribeUrl:
    "https://www.deccanherald.com/subscribe?utm_source=karunadothsava&utm_medium=subscription&utm_campaign=awareness",

  posterEyebrow: "My Rajyotsava poster",
  posterTitle: "My pride. My dream. My Karnataka.",
  posterLead:
    "Celebrate Karnataka Rajyotsava by putting yourself in the picture! Add your selfie, share what makes you proud of Kannada and Karnataka, express your dreams for the state's future or celebrate the community you belong to. Create your own Karunadotsava poster and share it on social media with #Karunadotsava. Let your voice be part of Karnataka's celebration!",
  posterStart: "Make a poster",
  posterPrivacy: "Your photo is never uploaded or stored. The poster is made on your device.",
  posterPhoto: "Photo",
  posterTakePhoto: "Camera",
  posterChoosePhoto: "Gallery",
  posterZoom: "Photo size",
  posterPrompt: "What about?",
  posterLine: "My words",
  posterCount: "{n}/{max}",
  posterSuggestions: "Suggestions",
  posterName: "Name, town (optional)",
  posterNamePlaceholder: "e.g. Suma, Mandya",
  posterDisclaimer:
    "This tool is only for creating a poster. You are responsible for the photo and words you add and for how the poster is used. Deccan Herald is not responsible for it.",
  posterHint: "Drag the photo to adjust it.",
  posterDownload: "Download",
  posterShare: "Share",
  posterReady: "Your poster is ready. Share or download it.",
  posterLoadError: "This photo couldn't be opened. Try another one.",
  posterCameraError: "The camera couldn't be opened. Use 'Gallery' instead.",
  posterPreviewLabel: "Poster preview: {heading}, {line}",
  posterClose: "Close the poster maker",
  posterCta: "Make my Rajyotsava poster",
  cameraTitle: "Take a photo",
  cameraShutter: "Take photo",
  cameraClose: "Close",

  highlightsTitle: "Latest highlights",
  seeAll: "See all",
  seeAllStories: "#all/top",
  seeAllArchive: "#all/archive",
  emptyStories: "Stories will appear here soon.",
  allStoriesBack: "Back to the home page",
  allStoriesLoading: "Loading stories…",
  allStoriesCount: "{count} stories · page {page} of {pages}",
  allStoriesError: "These stories couldn't be opened here.",
  allStoriesErrorLink: "See them on Deccan Herald",
  pagerLabel: "Pages",
  pagerPrev: "Previous page",
  pagerNext: "Next page",
  pagerPage: "Page {page}",

  archiveTitle: "From the archives",
  archiveLead:
    "Deccan Herald has reported on Karnataka since 1948. Revisit the moments that shaped the state, " +
    "as our pages recorded them at the time.",

  footerAbout:
    "Deccan Herald is Karnataka's trusted English daily. This Rajyotsava special brings readers " +
    "stories of the state's pride, people and heritage.",
  footerCopyright: "© 2026 Deccan Herald",
  openingReplay: "Watch the opening again",
};

/*
 * The menus: the parts of this page, in page order. target → the section's id;
 * icon → from ICONS in js/main.js, beside the link in the phone menu panel.
 * Phones also get a bar fixed to the bottom of the screen with the parts that have
 * short (the label there), then the menu button: keep it to four.
 */
const PAGE_NAV = [
  { label: "Top stories", short: "Home", icon: "home", target: "featured" },
  { label: "Poster", icon: "camera", target: "poster" },
  { label: "Highlights", short: "Latest", icon: "news", target: "highlights" },
  { label: "Archives", short: "Archives", icon: "archive", target: "archive" },
];

/*
 * Collections on deccanherald.com, read each time the page opens. The desk picks the
 * stories and their order there.
 * top     → its first 10 stories, in the desk's order, are the featured carousel; its
 *           first 20, newest first, are the stories section below.
 * archive → "From the archives", in the desk's order.
 */
const COLLECTIONS = {
  // Relative: on deccanherald.com it is the site's own API; elsewhere a proxy answers it
  // (tools/preview-server.py locally, vercel.json on the test site).
  api: "/api/v1/collections/",
  imageHost: "https://images.assettype.com/",
  top: "karunadothsava-stories",
  archive: "karunadothsava-archives",
};

/*
 * "See all": every story in a collection, a page at a time, on this same page (address
 * #all/<key>), read only then. keepOrder → the desk's order rather than newest first.
 * fallback → the collection's page on deccanherald.com, offered if it can't be read.
 */
const STORY_LISTS = {
  top: { collection: COLLECTIONS.top, title: UI.highlightsTitle, fallback: "https://www.deccanherald.com/karunadothsava-stories" },
  archive: { collection: COLLECTIONS.archive, title: UI.archiveTitle, fallback: "https://www.deccanherald.com/karunadothsava-archives", keepOrder: true },
};

/*
 * The exhibition announced right after the carousel, with an "Add to Google Calendar"
 * button that opens Google Calendar with the details filled in.
 * date     → YYYY-MM-DD; also used for the calendar entry.
 * time     → null for an all-day calendar entry; or { label, start: "HH:MM", end: "HH:MM" }
 *            (India time) to show the hours and put them in the calendar.
 *            PLACEHOLDER: the timings haven't been announced yet.
 * location → the address Google Calendar shows and links to Maps.
 *            PLACEHOLDER: confirm the venue name with the events team.
 */
const EVENT = {
  eyebrow: "Exhibition",
  title: "Karnataka: A Journey Through Newspaper Archives",
  text:
    "Journey through Karnataka’s history, one newspaper page at a time. Featuring archival pages from " +
    "Deccan Herald and Prajavani across the decades, this exclusive physical exhibition brings alive the " +
    "defining moments, milestones and movements that have shaped Kannada and Karnataka. Step into the " +
    "past and experience history as it first made headlines.",
  day: "19–29",
  month: "Nov",
  whenLabel: "When",
  whereLabel: "Where",
  dateLabel: "19 to 29 November 2026",
  venue: "Rangoli Metro Art Center, MG Road, Bengaluru",
  calendarButton: "Add to Google Calendar",
  calendarTitle: "Karnataka: A Journey Through Newspaper Archives (Deccan Herald and Prajavani exhibition)",
  date: "2026-11-19",
  endDate: "2026-11-29",
  time: null,
  location: "Rangoli Metro Art Center, MG Road, Bengaluru",
};

/*
 * Poster maker. Readers add a photo and write, in a line, what makes them proud of
 * Kannada and Karnataka, what they dream for its future, or what Karnataka means to them.
 * The poster is 4:5 (1080×1350), the usual size for a shared picture.
 * prompts  → the choices, one tab each; about says under the tabs what the choice means
 *            for Karunadotsava; example is shown faintly until the reader writes,
 *            suggestions are tap-to-use starting points.
 * samples  → the example posters on the page. photo (optional) → the address of a photo
 *            the newspaper owns, from the CMS media gallery; without one, the poster
 *            shows its red background. The Karunadotsava mark on posters is the one in
 *            the page's header.
 *            PLACEHOLDER: the lines and names are made up for illustration.
 * camera   → which phone camera "Camera" opens ("user" = front, "environment" = back).
 * logo     → the brand logo in the credit at the foot of the poster.
 * address  → the site's final address, sent with the poster when it is shared.
 */
const POSTER = {
  prompts: {
    pride: {
      label: "My pride",
      about: "What about Karnataka makes you proud? Our language, your hometown, its art, festivals or achievers. Celebrate it this Rajyotsava.",
      hint: "What about Kannada and Karnataka makes you proud?",
      example: "The muddy sprint of our village Kambala",
      suggestions: ["My hometown", "Our Kannada language", "Our festivals", "Our food", "Our art and music", "My family"],
    },
    dream: {
      label: "My dream",
      about: "What should Karnataka be like for the next generation? Share your wish for the future of Kannada and the state.",
      hint: "What do you wish for the future of Kannada and Karnataka?",
      example: "Every child grows up reading Kannada",
      suggestions: ["Kannada schools thrive", "A green Bengaluru again", "Jobs close to home", "Lakes full once more", "Kannada leads in technology"],
    },
    karnataka: {
      label: "My Karnataka",
      about: "Every Kannadiga carries their own Karnataka. Share the place, people, tradition or moment that makes it yours.",
      hint: "What does Karnataka mean to you?",
      example: "Sunset over the boulders of Hampi",
      suggestions: ["My favourite place", "A song or film I love", "Someone who inspires me", "Our coastline", "Our hills and forests", "Bengaluru, my city"],
    },
  },
  samples: [
    { prompt: "dream", line: "May the Western Ghats stay green forever", name: "Anita, Chikkamagaluru", photo: "https://images.prajavani.net/prajavani/2026-01-18/27zvf7tq/site13420005-1200-630-20131017190939.jpg?w=1080&auto=format%2Ccompress" },
    { prompt: "karnataka", line: "Where the dollu beats, that's my Karnataka", name: "Ramesh, Shivamogga", photo: "https://images.prajavani.net/prajavani/2025-09-30/4e3mi3am/file82km3zx7oy811jr3xdrr.jpg?w=1080&auto=format%2Ccompress" },
    { prompt: "pride", line: "Mysuru glowing in the Dasara lights", name: "Suma, Mysuru", photo: "https://images.prajavani.net/prajavani/2024-10-02/quile09v/file7xfreybrow81cwek9ikf.jpg?w=1080&auto=format%2Ccompress" },
  ],
  lineMax: 90,
  camera: "user",
  placeholder: "Your photo",
  logo: "https://images.assettype.com/deccanherald/2026-10-08/pxdtubqa/deccan-herald.svg",
  address: "deccanherald.com/karunadotsava",
  fileName: "dh-rajyotsava-poster.jpg",
  // Ends the message sent with the poster, after the reader's own words.
  shareInvite: "Make your own Rajyotsava poster at https://{address}",
};

/*
 * Opening animation, played once a day before the site appears.
 * figures → flown past in this order (history order), alternating red and black.
 *           art names a silhouette in js/silhouette-art.js.
 * finale  → the closing screen with the map and flag; its text is the "About Karunadotsava" text.
 * timing  → milliseconds; see OPENING in js/data.js. holdMs null: the closing screen
 *           stays until the reader taps (owner's choice, so the text can be read).
 */
const OPENING = {
  label: "Karnataka Rajyotsava opening",
  skip: "Skip",
  skipLabel: "Skip the opening and go to the site",
  finale: {
    eyebrow: "71st Karnataka Rajyotsava · 1 November 2026",
    title: "Karunadotsava",
    text: UI.aboutText,
    enter: "Read the special edition",
  },
  figures: [
    { name: "Basavanna", art: "basavanna" },
    { name: "Kempegowda", art: "kempegowda" },
    { name: "Onake Obavva", art: "obavva" },
    { name: "Kittur Rani Chennamma", art: "chennamma" },
    { name: "Sir M Visvesvaraya", art: "visvesvaraya" },
    { name: "Kuvempu", art: "kuvempu" },
    { name: "Dr Rajkumar", art: "rajkumar" },
  ],
  timing: { figureMs: 600, finaleMs: 2600, holdMs: null, exitMs: 700 },
};
