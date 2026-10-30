/*
 * All site content lives here. Edit this file to change text, the menus, the collections
 * the stories come from, the poster maker, quotes or the opening animation. No other file
 * needs to change. Stories and videos come only from prajavani.net: when they can't be
 * read, or there are none yet, their section says so (emptyStories, emptyVideos).
 */

/* Interface text. Elements in index.html with data-text="key" receive these. */
const UI = {
  skipLink: "ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ತೆರಳಿ",
  headerAction: "ಪ್ರಜಾವಾಣಿ ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ", // the header's logo-and-home-icon link: its name and hover text
  searchLabel: "ಪ್ರಜಾವಾಣಿಯಲ್ಲಿ ಹುಡುಕಿ",
  searchPlaceholder: "ಪ್ರಜಾವಾಣಿಯಲ್ಲಿ ಹುಡುಕಿ",
  searchUrl: "https://www.prajavani.net/search",
  byline: "ಬರಹ: {author}",
  headerActionUrl: "https://www.prajavani.net/",
  navLabel: "ಈ ಪುಟದಲ್ಲಿ",
  menuTitle: "ಈ ಪುಟದಲ್ಲಿ",
  menuHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ", // after the newspaper's logo, at the foot of the menu panel
  menuButton: "ಮೆನು",
  menuClose: "ಮುಚ್ಚಿ",

  featuredTitle: "ಮುಖ್ಯ ಕಥನಗಳು",
  carouselPrev: "ಹಿಂದಿನ ಕಥನ",
  carouselNext: "ಮುಂದಿನ ಕಥನ",
  slideOf: "{n} / {total}",

  quotesLabel: "ನುಡಿಮುತ್ತುಗಳು",
  quotesPrev: "ಹಿಂದಿನ ದಿನದ ನುಡಿಮುತ್ತು",
  quotesNext: "ಮುಂದಿನ ದಿನದ ನುಡಿಮುತ್ತು",
  quotesToday: "ಇಂದಿನ ನುಡಿಮುತ್ತು",
  quotesDay: "{month} {day}ರ ನುಡಿಮುತ್ತು",
  // Beside the quotes: polls and contests on the Facebook page. If the address changes,
  // remake the QR code: python tools/facebook-qr.py <address>
  contestsEyebrow: "ಪೋಲ್ ಮತ್ತು ಸ್ಪರ್ಧೆ",
  contestsTitle: "ರಾಜ್ಯೋತ್ಸವ ಪೋಲ್, ಸ್ಪರ್ಧೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ",
  contestsText: "ಪ್ರಜಾವಾಣಿ ಫೇಸ್‌ಬುಕ್ ಪುಟದಲ್ಲಿ ಪ್ರತಿದಿನ ಹೊಸ ಪೋಲ್ ಮತ್ತು ಸ್ಪರ್ಧೆ. ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ ಪುಟಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.",
  contestsAction: "ಫೇಸ್‌ಬುಕ್‌ನಲ್ಲಿ ಭಾಗವಹಿಸಿ",
  contestsUrl: "https://www.facebook.com/prajavani.net",
  contestsQrAlt: "ಪ್ರಜಾವಾಣಿ ಫೇಸ್‌ಬುಕ್ ಪುಟ ತೆರೆಯುವ ಕ್ಯೂಆರ್ ಕೋಡ್",

  posterEyebrow: "ನನ್ನ ರಾಜ್ಯೋತ್ಸವ ಪೋಸ್ಟರ್",
  posterTitle: "ನನ್ನ ಹೆಮ್ಮೆ, ನನ್ನ ಕನಸು, ನಮ್ಮ ಸಮುದಾಯ",
  posterLead: "ನಿಮ್ಮ ಫೋಟೊ ಸೇರಿಸಿ, ಕನ್ನಡ, ಕರ್ನಾಟಕದ ಬಗ್ಗೆ ನಿಮ್ಮ ಹೆಮ್ಮೆ, ಕನಸು ಅಥವಾ ನಿಮ್ಮ ಸಮುದಾಯದ ಬಗ್ಗೆ ಬರೆಯಿರಿ.",
  posterStart: "ಪೋಸ್ಟರ್ ಮಾಡಿ",
  posterPrivacy: "ನಿಮ್ಮ ಫೋಟೊವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದಿಲ್ಲ, ಸಂಗ್ರಹಿಸುವುದೂ ಇಲ್ಲ. ಪೋಸ್ಟರ್ ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ತಯಾರಾಗುತ್ತದೆ.",
  posterPhoto: "ಫೋಟೊ",
  posterTakePhoto: "ಕ್ಯಾಮೆರಾ",
  posterChoosePhoto: "ಗ್ಯಾಲರಿ",
  posterZoom: "ಫೋಟೊ ಗಾತ್ರ",
  posterPrompt: "ಯಾವುದರ ಬಗ್ಗೆ?",
  posterLine: "ನನ್ನ ಮಾತು",
  posterCount: "{n}/{max}",
  posterSuggestions: "ಸಲಹೆಗಳು",
  posterName: "ಹೆಸರು, ಊರು (ಐಚ್ಛಿಕ)",
  posterNamePlaceholder: "ಉದಾ: ಸುಮಾ, ಮಂಡ್ಯ",
  posterDisclaimer:
    "ಈ ಸೌಲಭ್ಯ ಪೋಸ್ಟರ್ ತಯಾರಿಸಲು ಮಾತ್ರ. ಪೋಸ್ಟರ್‌ನಲ್ಲಿ ಸೇರಿಸುವ ಫೋಟೊ, ಬರಹ ಹಾಗೂ ಪೋಸ್ಟರ್‌ನ ಬಳಕೆಗೆ ಬಳಕೆದಾರರೇ ಹೊಣೆ. ಅದಕ್ಕೆ ಪ್ರಜಾವಾಣಿ ಜವಾಬ್ದಾರಿಯಲ್ಲ.",
  posterHint: "ಫೋಟೊವನ್ನು ಎಳೆದು ಸರಿಹೊಂದಿಸಿ.",
  posterDownload: "ಡೌನ್‌ಲೋಡ್",
  posterShare: "ಹಂಚಿಕೊಳ್ಳಿ",
  posterReady: "ಪೋಸ್ಟರ್ ಸಿದ್ಧ. ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
  posterLoadError: "ಈ ಫೋಟೊ ತೆರೆಯಲಾಗಲಿಲ್ಲ. ಬೇರೆ ಫೋಟೊ ಪ್ರಯತ್ನಿಸಿ.",
  posterCameraError: "ಕ್ಯಾಮೆರಾ ತೆರೆಯಲಾಗಲಿಲ್ಲ. 'ಗ್ಯಾಲರಿ' ಬಳಸಿ.",
  posterPreviewLabel: "ಪೋಸ್ಟರ್ ಮುನ್ನೋಟ: {heading}, {line}",
  posterClose: "ಪೋಸ್ಟರ್ ತಯಾರಿಕೆ ಮುಚ್ಚಿ",
  posterCta: "ನನ್ನ ರಾಜ್ಯೋತ್ಸವ ಪೋಸ್ಟರ್ ಮಾಡಿ",
  cameraTitle: "ಫೋಟೊ ತೆಗೆಯಿರಿ",
  cameraShutter: "ಕ್ಲಿಕ್ಕಿಸಿ",
  cameraClose: "ಮುಚ್ಚಿ",

  highlightsTitle: "ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶಗಳು",
  // The "see all" buttons as the desk worded them, by what they open.
  seeMoreStories: "ಇನ್ನಷ್ಟು ಲೇಖನಗಳು",
  seeMoreVideos: "ಇನ್ನಷ್ಟು ವಿಡಿಯೊಗಳು",
  seeMorePhotos: "ಇನ್ನಷ್ಟು ಚಿತ್ರಗಳು",
  // Where each section's "See all" button goes: #all/<key> opens STORY_LISTS[key] on this page.
  seeAllStories: "#all/top",
  seeAllYoutube: "https://www.youtube.com/prajavani",
  seeAllInstagram: "https://www.instagram.com/prajavani/",
  seeAllOnYoutube: "ಯೂಟ್ಯೂಬ್‌ನಲ್ಲಿ ಇನ್ನಷ್ಟು ವಿಡಿಯೊಗಳು",
  seeAllOnInstagram: "ಇನ್‌ಸ್ಟಾಗ್ರಾಂನಲ್ಲಿ ಇನ್ನಷ್ಟು ರೀಲ್ಸ್",
  seeAllPhotoStories: "#all/photo",
  seeAllFacts: "#all/facts",
  emptyStories: "ಸುದ್ದಿಗಳು ಶೀಘ್ರದಲ್ಲೇ ಇಲ್ಲಿ ಬರಲಿವೆ.",
  emptyVideos: "ವಿಡಿಯೊಗಳು ಶೀಘ್ರದಲ್ಲೇ ಇಲ್ಲಿ ಬರಲಿವೆ.",
  allStoriesBack: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  allStoriesLoading: "ಸುದ್ದಿಗಳು ಬರುತ್ತಿವೆ…",
  allStoriesCount: "{count} ಸುದ್ದಿಗಳು · ಪುಟ {page}/{pages}",
  allVideosCount: "{count} ವಿಡಿಯೊ · ಪುಟ {page}/{pages}",
  allStoriesError: "ಸುದ್ದಿಗಳನ್ನು ಇಲ್ಲಿ ತೆರೆಯಲು ಆಗಲಿಲ್ಲ.",
  allStoriesErrorLink: "ಪ್ರಜಾವಾಣಿಯಲ್ಲಿ ನೋಡಿ",
  pagerLabel: "ಪುಟಗಳು",
  pagerPrev: "ಹಿಂದಿನ ಪುಟ",
  pagerNext: "ಮುಂದಿನ ಪುಟ",
  pagerPage: "ಪುಟ {page}",
  videosTitle: "ವಿಡಿಯೊ",
  videoPlay: "ವಿಡಿಯೊ ನೋಡಿ: {title}",
  shortsTitle: "ರೀಲ್ಸ್",
  reelTitle: "ಇನ್‌ಸ್ಟಾಗ್ರಾಂ ರೀಲ್",
  reelOnInstagram: "ಇನ್‌ಸ್ಟಾಗ್ರಾಂನಲ್ಲಿ ನೋಡಿ ↗",
  photoStoriesTitle: "ಫೋಟೊ ಕಥನಗಳು",
  factsTitle: "ಕರುನಾಡ ಕುತೂಹಲ",
  factsLead: "ಕರ್ನಾಟಕ ಮತ್ತು ಕನ್ನಡದ ಬಗ್ಗೆ ನಿಮಗೆ ಗೊತ್ತಿರದ ಸಂಗತಿಗಳು",

  footerAbout:
    "ಪ್ರಜಾವಾಣಿ ಕನ್ನಡದ ವಿಶ್ವಾಸಾರ್ಹ ದಿನಪತ್ರಿಕೆ. ರಾಜ್ಯೋತ್ಸವದ ಈ ವಿಶೇಷ ತಾಣ ನಾಡಿನ ಹೆಮ್ಮೆಯ ಕಥನಗಳನ್ನು ಓದುಗರಿಗೆ ತಲುಪಿಸುತ್ತದೆ.",
  footerCopyright: "© 2026 ಪ್ರಜಾವಾಣಿ",
  openingReplay: "ಆರಂಭದ ದೃಶ್ಯ ಮತ್ತೆ ನೋಡಿ",
};

/*
 * The menus: the parts of this page, in page order. target → the section's id;
 * icon → from ICONS in js/main.js, beside the link in the phone menu panel.
 * Phones also get a bar fixed to the bottom of the screen with the parts that have
 * short (the label there), then the menu button: keep it to four.
 */
const PAGE_NAV = [
  { label: "ಮುಖ್ಯ ಕಥನಗಳು", short: "ಮುಖಪುಟ", icon: "home", target: "featured" },
  { label: "ಪೋಸ್ಟರ್", icon: "camera", target: "poster" },
  { label: "ಮುಖ್ಯಾಂಶಗಳು", short: "ಸುದ್ದಿ", icon: "news", target: "highlights" },
  { label: "ವಿಡಿಯೊ", short: "ವಿಡಿಯೊ", icon: "play", target: "videos" },
  { label: "ಫೋಟೊ ಕಥನಗಳು", icon: "photo", target: "photo-stories" },
  { label: "ಕುತೂಹಲ", short: "ಕುತೂಹಲ", icon: "bulb", target: "facts" },
];

/*
 * Collections on prajavani.net, read each time the page opens. The desk picks the
 * stories and their order there.
 * top   → its first 10 stories, in the desk's order, are the featured carousel; its
 *         first 20, newest first, are the stories section below.
 * photo → photo stories.
 * facts → interesting facts about Karnataka and Kannada, at the end of the page.
 */
const COLLECTIONS = {
  // Relative: on prajavani.net it is the site's own API; elsewhere a proxy answers it
  // (tools/preview-server.py locally, vercel.json on the test site).
  api: "/api/v1/collections/",
  imageHost: "https://images.prajavani.net/",
  top: "karunadotsava-top",
  photo: "karunadotsava-photo",
  facts: "karunadothsava-kuthuhala",
};

/*
 * "See all": every story in a collection, newest first, a page at a time. It opens on
 * this same page (address #all/<key>) in place of the home page, and reads the
 * collection only then, so the home page stays light.
 * fallback → the collection's page on prajavani.net, offered if it can't be read.
 */
const STORY_LISTS = {
  top: { collection: COLLECTIONS.top, title: UI.highlightsTitle, fallback: "https://www.prajavani.net/karunadotsava-top" },
  photo: { collection: COLLECTIONS.photo, title: UI.photoStoriesTitle, fallback: "https://www.prajavani.net/karunadotsava-photo" },
  facts: { collection: COLLECTIONS.facts, title: UI.factsTitle, fallback: "https://www.prajavani.net/karunadothsava-kuthuhala" },
};

/*
 * The exhibition announced right after the carousel, with an "Add to Google Calendar"
 * button that opens Google Calendar with the details filled in.
 * date     → the first day, YYYY-MM-DD; endDate → the last day (null for one day).
 *            Both are used for the calendar entry.
 * time     → null for an all-day calendar entry; or { label, start: "HH:MM", end: "HH:MM" }
 *            (India time) to show the hours and put them in the calendar.
 *            PLACEHOLDER: the timings haven't been announced yet.
 * location → the address Google Calendar shows and links to Maps.
 *            PLACEHOLDER: confirm the venue name with the events team.
 */
const EVENT = {
  eyebrow: "ಪ್ರದರ್ಶನ",
  title: "61 ವರ್ಷ: ಪ್ರಜಾವಾಣಿಯಲ್ಲಿ ಕರುನಾಡು",
  text:
    "ಕರ್ನಾಟಕ ಮತ್ತು ಕನ್ನಡದ ಕುರಿತು ದಶಕಗಳಿಂದ ಪ್ರಜಾವಾಣಿ ಮತ್ತು ಡೆಕ್ಕನ್ ಹೆರಾಲ್ಡ್‌ನಲ್ಲಿ ಪ್ರಕಟವಾದ " +
    "ಆಯ್ದ ಪುಟಗಳ ಪ್ರದರ್ಶನ. ಇತಿಹಾಸವನ್ನು ಅದು ಮೊದಲು ಮುದ್ರಣವಾದಂತೆಯೇ ನೋಡಲು ಬನ್ನಿ.",
  day: "19–29",
  month: "ನವೆಂಬರ್",
  whenLabel: "ದಿನಾಂಕ",
  whereLabel: "ಸ್ಥಳ",
  dateLabel: "ನವೆಂಬರ್ 19ರಿಂದ 29ರವರೆಗೆ, 2026",
  venue: "ರಂಗೋಲಿ ಮೆಟ್ರೋ ಆರ್ಟ್ ಸೆಂಟರ್, ಎಂ.ಜಿ. ರಸ್ತೆ, ಬೆಂಗಳೂರು",
  calendarButton: "Google ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ",
  calendarTitle: "61 ವರ್ಷ: ಪ್ರಜಾವಾಣಿಯಲ್ಲಿ ಕರುನಾಡು: ಪ್ರಜಾವಾಣಿ ಮತ್ತು ಡೆಕ್ಕನ್ ಹೆರಾಲ್ಡ್ ಪುಟಗಳ ಪ್ರದರ್ಶನ",
  date: "2026-11-19",
  endDate: "2026-11-29",
  time: null,
  location: "Rangoli Metro Art Center, MG Road, Bengaluru",
};

/*
 * Videos come from a page on the CMS that the editorial team keeps: a list of links
 * (YouTube videos, YouTube Shorts, Instagram Reels) in any order. The page sorts them:
 * wide YouTube videos go in the player and its list (the first in the player); Shorts
 * and Reels in the upright row. YouTube titles are fetched from YouTube. The file to
 * paste there is cms/karunadothsava-json.json. If it can't be read, the section is left out.
 * The home page shows the first few of each; with more, "ಇನ್ನಷ್ಟು ವಿಡಿಯೊಗಳು" opens them all,
 * a page at a time (#all/videos, #all/reels).
 */
const VIDEO_FEED = "/pages/karunadothsava-json";

/*
 * Poster maker. Readers add a photo and write, in a line, what makes them proud of
 * Kannada and Karnataka, what they dream for its future, or about their community.
 * The poster is 4:5 (1080×1350), the usual size for a shared picture.
 * prompts  → the choices, one tab each; about says under the tabs what the choice means
 *            for Karunadotsava; example is shown faintly until the reader writes,
 *            suggestions are tap-to-use starting points.
 * samples  → the example posters on the page. photo (optional) → the address of a photo
 *            the newspaper owns, from the CMS media gallery; without one, the poster
 *            shows its red background. The Karunadotsava mark on posters is the one in
 *            the page's header.
 *            PLACEHOLDER: the lines and names are made up for illustration.
 * camera   → which phone camera "ಕ್ಯಾಮೆರಾ" opens ("user" = front, "environment" = back).
 * logo     → the brand logo in the credit at the foot of the poster.
 * address  → the site's final address, sent with the poster when it is shared.
 */
const POSTER = {
  prompts: {
    pride: {
      label: "ನನ್ನ ಹೆಮ್ಮೆ",
      about: "ಕರುನಾಡಿನ ಯಾವ ಸಂಗತಿ ನಿಮ್ಮನ್ನು ಹೆಮ್ಮೆಪಡಿಸುತ್ತದೆ? ನಮ್ಮ ಭಾಷೆ, ಊರು, ಕಲೆ, ಹಬ್ಬ ಅಥವಾ ಸಾಧಕರು. ರಾಜ್ಯೋತ್ಸವದಂದು ಅದನ್ನು ಸಂಭ್ರಮಿಸಿ.",
      hint: "ಕನ್ನಡ, ಕರ್ನಾಟಕದ ಯಾವುದು ನಿಮಗೆ ಹೆಮ್ಮೆ ತರುತ್ತದೆ?",
      example: "ನಮ್ಮೂರ ಕಂಬಳದ ಕೆಸರಿನ ಓಟ",
      suggestions: ["ನಮ್ಮೂರು", "ನಮ್ಮ ಕನ್ನಡ ಭಾಷೆ", "ನಮ್ಮ ಹಬ್ಬಗಳು", "ನಮ್ಮೂರ ಊಟ", "ನಮ್ಮ ಹಾಡು", "ನಮ್ಮ ಮನೆ"],
    },
    dream: {
      label: "ನನ್ನ ಕನಸು",
      about: "ಮುಂದಿನ ತಲೆಮಾರಿನ ಕರ್ನಾಟಕ ಹೇಗಿರಬೇಕು? ಕನ್ನಡ ಮತ್ತು ನಾಡಿನ ಭವಿಷ್ಯಕ್ಕಾಗಿ ನಿಮ್ಮ ಆಶಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
      hint: "ಕನ್ನಡ, ಕರ್ನಾಟಕದ ಭವಿಷ್ಯಕ್ಕಾಗಿ ನಿಮ್ಮ ಆಶಯ ಏನು?",
      example: "ಪ್ರತಿ ಮಗುವೂ ಕನ್ನಡದಲ್ಲಿ ಓದಿ ಬೆಳೆಯಲಿ",
      suggestions: ["ಕನ್ನಡ ಶಾಲೆಗಳು ಬೆಳಗಲಿ", "ಹಸಿರು ಬೆಂಗಳೂರು ಮರಳಲಿ", "ಊರಲ್ಲೇ ಉದ್ಯೋಗ ಸಿಗಲಿ", "ಕೆರೆಗಳು ತುಂಬಿ ಹರಿಯಲಿ", "ತಂತ್ರಜ್ಞಾನದಲ್ಲೂ ಕನ್ನಡ ಮೆರೆಯಲಿ"],
    },
    community: {
      label: "ನಮ್ಮ ಸಮುದಾಯ",
      about: "ನಾಡನ್ನು ಕಟ್ಟುವವರು ನಮ್ಮ ಸುತ್ತಲಿನ ಜನ. ನಿಮ್ಮ ಊರು, ಬಡಾವಣೆ, ಸಂಘ ಅಥವಾ ಬಳಗ ಮಾಡುತ್ತಿರುವ ಒಳ್ಳೆಯ ಕೆಲಸವನ್ನು ನೆನೆಯಿರಿ.",
      hint: "ನಿಮ್ಮ ಊರು, ಬಡಾವಣೆ ಅಥವಾ ಬಳಗದ ಜನರ ಬಗ್ಗೆ ಒಂದು ಮಾತು",
      example: "ಊರ ಕೆರೆಯ ಹೂಳೆತ್ತಿದ ನಮ್ಮ ಯುವಕ ಸಂಘ",
      suggestions: ["ನಮ್ಮ ಕನ್ನಡ ಸಂಘ", "ನಮ್ಮ ಬಡಾವಣೆ", "ನಮ್ಮೂರ ಜನ", "ನಮ್ಮ ಶಾಲೆ", "ನಮ್ಮ ರೈತರು", "ನಮ್ಮ ಯುವಕ ಸಂಘ"],
    },
  },
  samples: [
    { prompt: "dream", line: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ಎಂದೆಂದೂ ಹಸಿರಾಗಿರಲಿ", name: "ಅನಿತಾ, ಚಿಕ್ಕಮಗಳೂರು", photo: "https://images.prajavani.net/prajavani/2026-01-18/27zvf7tq/site13420005-1200-630-20131017190939.jpg?w=1080&auto=format%2Ccompress" },
    { prompt: "community", line: "ಡೊಳ್ಳು ಕುಣಿತ ಉಳಿಸಿರುವ ನಮ್ಮೂರ ಯುವಕರು", name: "ರಮೇಶ್, ಶಿವಮೊಗ್ಗ", photo: "https://images.prajavani.net/prajavani/2025-09-30/4e3mi3am/file82km3zx7oy811jr3xdrr.jpg?w=1080&auto=format%2Ccompress" },
    { prompt: "pride", line: "ದಸರೆಯ ಬೆಳಕಲ್ಲಿ ಮಿನುಗುವ ಮೈಸೂರು", name: "ಸುಮಾ, ಮೈಸೂರು", photo: "https://images.prajavani.net/prajavani/2024-10-02/quile09v/file7xfreybrow81cwek9ikf.jpg?w=1080&auto=format%2Ccompress" },
  ],
  lineMax: 90,
  camera: "user",
  placeholder: "ನಿಮ್ಮ ಫೋಟೊ",
  logo: "https://images.assettype.com/deccanherald/2026-10-08/uf85tvay/PV-White.svg",
  address: "prajavani.net/karunadotsava",
  fileName: "prajavani-rajyotsava-poster.jpg",
  // Ends the message sent with the poster, after the reader's own words.
  shareInvite: "ನಿಮ್ಮ ರಾಜ್ಯೋತ್ಸವ ಪೋಸ್ಟರ್ ನೀವೂ ಮಾಡಿ: https://{address}",
};

/*
 * Quotes in the red banner, one a day. date → the day it runs (India time). The
 * banner opens on today's quote; the back arrow steps through earlier days. Quotes
 * whose day hasn't come stay hidden, and until the first date the banner is left out.
 * art names the speaker's silhouette in js/silhouette-art.js (see OPENING below); until
 * it is made, the quote shows without a portrait.
 * From the desk's sheet, in its order, 1 to 29 November (its repeat of Bendre's quote left out);
 * 30 November repeats the first day's.
 */
const QUOTES = [
  { date: "2026-11-01", text: "ಎಲ್ಲಾದರು ಇರು, ಎಂತಾದರು ಇರು, ಎಂದೆಂದಿಗೂ ನೀ ಕನ್ನಡವಾಗಿರು.", by: "ರಾಷ್ಟ್ರಕವಿ ಕುವೆಂಪು", art: "kuvempu" },
  { date: "2026-11-02", text: "ಅಭಿಮಾನಿಗಳೇ ನನ್ನ ದೇವರು... ಕನ್ನಡ ನೆಲ, ಜಲ, ಭಾಷೆಗೆ ಧಕ್ಕೆ ಬಂದಾಗ ನಾವೆಲ್ಲ ಒಂದಾಗಿ ನಿಲ್ಲಬೇಕು. ಕನ್ನಡ ಎಂದರೆ ಬರಿ ನುಡಿಯಲ್ಲ, ಅದು ನಮ್ಮ ಉಸಿರು.", by: "ರಾಜ್‌ಕುಮಾರ್‌", art: "rajkumar" },
  { date: "2026-11-03", text: "ಹಚ್ಚೇವು ಕನ್ನಡದ ದೀಪ, ಕರುನಾಡದೀಪ ಸಿರಿನುಡಿಯದೀಪ, ಒಲವೆತ್ತಿ ತೋರುವಾ ದೀಪ", by: "ಡಿ.ಎಸ್. ಕರ್ಕಿ", art: "karki" },
  { date: "2026-11-04", text: "ನರಕಕ್ಕಿಳ್ಸಿ ನಾಲ್ಗೆ ಸೀಳ್ಸಿ ಬಾಯಿ ಒಲಿಸಾಕಿದ್ರೂನೆ ಮೂಗ್ನಲ್ ಕನ್ನಡ ಪದವಾಡ್ತೀನಿ ನನ್ ಮನಸನ್ನ್ ನೀ ಕಾಣೆ", by: "ಜಿ.ಪಿ. ರಾಜರತ್ನಂ", art: "rajaratnam" },
  { date: "2026-11-05", text: "ಕರ್ನಾಟಕವು ನಮ್ಮ ಕನ್ನಡಿಗರ ಕುರುಕ್ಷೇತ್ರ, ಭಾರತವು ನಮ್ಮ ಧರ್ಮ ಕ್ಷೇತ್ರ", by: "ಆಲೂರು ವೆಂಕಟರಾಯರು", art: "aluru" },
  { date: "2026-11-06", text: "ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಕನ್ನಡ ತಾಯ್ ಬಾಳ್ಗೆ", by: "ಬಿ. ಎಂ. ಶ್ರೀಕಂಠಯ್ಯ", art: "srikantaiah" },
  { date: "2026-11-07", text: "ಒಂದೇ ಒಂದೇ ಒಂದೇ ಕರ್ನಾಟಕ ಒಂದೇ! ಹಿಂದೆ ಮುಂದೆ ಎಂದೆ ಕರ್ನಾಟಕ ಒಂದೇ! ಜಗದೇಳಿಗೆಯಾಗುವುದಿದೆ ಕರ್ನಾಟಕದಿಂದೆ.", by: "ವರಕವಿ ದ.ರಾ.ಬೇಂದ್ರೆ", art: "bendre" },
  { date: "2026-11-08", text: "ನನ್ನ ಕನ್ನಡ ನುಡಿಯೇ ನೀನೆಷ್ಟು ಚಂದ! ಏನು ಗೀಚಿದರೂ ಆಗುವುದು ಶ್ರೀಗಂಧ! ಸಿಂಗರದ ಗಣಿ ನಿನ್ನ ಶಬ್ದ ಸಂಪತ್ತು, ಬಂಗಾರಕ್ಕಿಂತಲೂ ಶ್ರೇಷ್ಠ ನುಡಿಮುತ್ತು", by: "ದಿನಕರ ದೇಸಾಯಿ", art: "dinakar" },
  { date: "2026-11-09", text: "ತಾಯೆ ಬಾರ ಮೊಗವ ತೋರ ಕನ್ನಡಿಗರ ಮಾತೆಯೆ, ಹರಸು ತಾಯೆ ಸುತರ ಕಾಯೆ ನಮ್ಮ ಜನ್ಮದಾತೆಯೆ", by: "ರಾಷ್ಟ್ರಕವಿ ಗೋವಿಂದ ಪೈ", art: "govindapai" },
  { date: "2026-11-10", text: "ಹೆಸರಾಯಿತು ಕರ್ನಾಟಕ, ಉಸಿರಾಗಲಿ ಕನ್ನಡ", by: "ಚೆನ್ನವೀರ ಕಣವಿ", art: "kanavi" },
  { date: "2026-11-11", text: "ಕನ್ನಡವನುಳಿದೆನಗೆ ಅನ್ಯ ಜೀವನವಿಲ್ಲ‌; ಕನ್ನಡವೆ ಎನ್ನುಸಿರು ಪೆತ್ತೆನ್ನ ತಾಯಿ", by: "ಬೆನಗಲ್ ರಾಮರಾವ್", art: "benegal" },
  { date: "2026-11-12", text: "ಕನ್ನಡ ನೆಲದಲ್ಲಿ ಹುಟ್ಟಿ, ಕನ್ನಡದ ನೀರನ್ನು ಕುಡಿದು, ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಮರೆಯುವವನು ಮನುಷ್ಯನೇ ಅಲ್ಲ.", by: "ಅ. ನ. ಕೃಷ್ಣರಾವ್", art: "ankrishnarao" },
  { date: "2026-11-13", text: "ಕನ್ನಡ ಭಾಷೆಗೆ ಹೃದಯವನ್ನು ತಲುಪುವ ಮತ್ತು ಮನುಷ್ಯನನ್ನು ಸಂಸ್ಕಾರವಂತನನ್ನಾಗಿ ಮಾಡುವ ಅದ್ಭುತ ಶಕ್ತಿಯಿದೆ", by: "ಸಿದ್ಧೇಶ್ವರ ಸ್ವಾಮೀಜಿ", art: "siddheshwara" },
  { date: "2026-11-14", text: "ಕನ್ನಡಿಗರು ತಮ್ಮ ಭಾಷೆ ಮತ್ತು ಸಂಸ್ಕೃತಿಯನ್ನು ಪ್ರೀತಿಸುವ ಜೊತೆಗೆ ಜಾಗತಿಕ ಮಟ್ಟದಲ್ಲಿ ತಂತ್ರಜ್ಞಾನ ಹಾಗೂ ಕಾಯಕದಲ್ಲಿ ಮುಂಚೂಣಿಯಲ್ಲಿರಬೇಕು.", by: "ಸರ್‌. ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ", art: "visvesvaraya" },
  { date: "2026-11-15", text: "ಕನ್ನಡ ನಾಡಿನ ಕರಾವಳಿ, ಕನ್ನಡ ದೇವಿಯ ಪ್ರಭಾವಳಿ", by: "ಸು.ರಂ. ಎಕ್ಕುಂಡಿ", art: "ekkundi" },
  { date: "2026-11-16", text: "ಜೋಗದ ಸಿರಿ ಬೆಳಕಿನಲ್ಲಿ ತುಂಗೆಯ ತೆನೆ ಬಳುಕಿನಲ್ಲಿ, ಸಹ್ಯಾದ್ರಿಯ ಲೋಹದದಿರ ಉತ್ತುಂಗದ ನಿಲುಕಿನಲ್ಲಿ... ನಿತ್ಯೋತ್ಸವ ತಾಯಿ ನಿತ್ಯೋತ್ಸವ ನಿನಗೆ", by: "ಕೆ. ಎಸ್. ನಿಸಾರ್ ಅಹಮದ್", art: "nisar" },
  { date: "2026-11-17", text: "ನಮ್ಮ ಉಸುರು, ನಮ್ಮ ಕಸುವು ಕನ್ನಡ; ನಮ್ಮ ಹೆಸರು, ನಮ್ಮ ಕಸುಬು ಕನ್ನಡ; ಕನ್ನಡವಿದು ಕನ್ನಡ ಬನ್ನಿ ನಮ್ಮ ಸಂಗಡ", by: "ಎಂ.ಗೋಪಾಲಕೃಷ್ಣ ಅಡಿಗ", art: "adiga" },
  { date: "2026-11-18", text: "ಸಂಗೀತಕ್ಕೆ ಯಾವುದೇ ಭಾಷೆ ಅಥವಾ ಗಡಿಯ ಹಂಗಿಲ್ಲ, ಆದರೆ ನನ್ನ ಕಲೆಯ ಮೂಲ ಬೇರುಗಳು ನೆಟ್ಟಿರುವುದು ಈ ಕನ್ನಡ ಮಣ್ಣಿನಲ್ಲಿ", by: "ಡಾ. ಗಂಗೂಬಾಯಿ ಹಾನಗಲ್", art: "gangubai" },
  { date: "2026-11-19", text: "ವಿಧಾನಸೌಧವು ಕೇವಲ ಕಲ್ಲಿನ ಕಟ್ಟಡವಲ್ಲ, ಅದು ಕರ್ನಾಟಕದ ಜನರ ಆಶೋತ್ತರಗಳ ಮತ್ತು ಪ್ರಜಾಪ್ರಭುತ್ವದ ಸಂಕೇತ.", by: "ಕೆಂಗಲ್ ಹನುಮಂತಯ್ಯ", art: "kengal" },
  { date: "2026-11-20", text: "ಕನ್ನಡವನ್ನು ಬೆಳೆಸುವುದೆಂದರೆ ಕನ್ನಡದ ಮನಸ್ಸುಗಳನ್ನು ಬೆಳೆಸುವುದು, ಕನ್ನಡದ ಆತ್ಮವನ್ನು ಜಾಗೃತಗೊಳಿಸುವುದು.", by: "ಮಾಸ್ತಿ ವೆಂಕಟೇಶ ಅಯ್ಯಂಗಾರ್", art: "masti" },
  { date: "2026-11-21", text: "ನಾವು ನೆಟ್ಟ ಪ್ರತಿಯೊಂದು ಮರವೂ ಈ ನಾಡಿಗೆ ನಾವು ನೀಡುವ ಜೀವದಾನ. ಪರಿಸರ ರಕ್ಷಣೆಯೇ ಕನ್ನಡ ನಾಡಿನ ನಿಜವಾದ ಸೇವೆ", by: "ಸಾಲುಮರದ ತಿಮ್ಮಕ್ಕ", art: "thimmakka" },
  { date: "2026-11-22", text: "ನಮ್ಮ ಕನ್ನಡ ಸಂಸ್ಕೃತಿಯ ವೈವಿಧ್ಯತೆ ಮತ್ತು ಪರಂಪರೆಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುತ್ತಲೇ ಹೊಸ ಚಿಂತನೆಗಳಿಗೆ ತೆರೆದುಕೊಳ್ಳುವುದು ಪ್ರಗತಿಯ ಸಂಕೇತ.", by: "ಗಿರೀಶ್ ಕಾರ್ನಾಡ್", art: "karnad" },
  { date: "2026-11-23", text: "ಕನ್ನಡ ಎನೆ ಕುಣಿದಾಡುವುದೆನ್ನದೆ, ಕನ್ನಡ ಎನೆ ಕಿವಿ ನಿಮಿರುವುದು!", by: "ರಾಷ್ಟ್ರಕವಿ ಕುವೆಂಪು", art: "kuvempu" },
  { date: "2026-11-24", text: "ಕನ್ನಡ ಎಂದರೆ ಬರಿ ನುಡಿಯಲ್ಲ, ಅದು ಕನ್ನಡಿಗರ ಉಸಿರು, ಬದುಕಿನ ಹಸಿರು", by: "ಸಿದ್ಧಯ್ಯ ಪುರಾಣಿಕ", art: "puranik" },
  { date: "2026-11-25", text: "ನಾವು ನಮ್ಮ ನೆಲ ಮತ್ತು ಭಾಷೆಯನ್ನು ಪ್ರೀತಿಸಬೇಕಾದರೆ, ಮೊದಲು ಅದರ ಇತಿಹಾಸ ಮತ್ತು ಪ್ರಕೃತಿಯನ್ನು ಅರಿಯಬೇಕು.", by: "ಶಿವರಾಮ ಕಾರಂತ", art: "karanth" },
  { date: "2026-11-26", text: "ಎದೆಯ ಬಾಗಿಲನ್ನು ತಟ್ಟಿ ಜಾಗೃತಿ ಮೂಡಿಸುವುದೇ ಕಾವ್ಯ, ಕನ್ನಡದ ಮನಸ್ಸುಗಳನ್ನು ಬೆಸೆಯುವುದೇ ಸಾಹಿತ್ಯ", by: "ಜಿ.ಎಸ್. ಶಿವರುದ್ರಪ್ಪ", art: "gss" },
  { date: "2026-11-27", text: "ಕನ್ನಡಿಗ ತನ್ನ ನಾಡಿನಲ್ಲಿ ಯಜಮಾನನಾಗಿ ಬಾಳಬೇಕು. ಭಾಷಾ ಪ್ರೇಮ ಎನ್ನುವುದು ಪ್ರದರ್ಶನಕ್ಕಲ್ಲ, ಅದು ಆಚರಣೆಯಲ್ಲಿರಬೇಕು.", by: "ಪಾಟೀಲ ಪುಟ್ಟಪ್ಪ", art: "puttappa" },
  { date: "2026-11-28", text: "ವಿಜ್ಞಾನ ಮತ್ತು ಸಂಶೋಧನೆಯಲ್ಲಿ ಯುವಜನರು ತೊಡಗಿಸಿಕೊಂಡಾಗ ಮಾತ್ರ ಕರ್ನಾಟಕ ಮತ್ತು ಭಾರತ ಜಾಗತಿಕ ಮಟ್ಟದಲ್ಲಿ ಮಿಂಚಲು ಸಾಧ್ಯ", by: "ಡಾ. ಸಿ.ಎನ್.ಆರ್. ರಾವ್", art: "cnrrao" },
  { date: "2026-11-29", text: "ಜಾಣ ಜಾಣೆಯರೆದೆಗೆ ಕನಸು ಕೊಡುವವಳೆ, ಬಾಗಿದವರಿಗೆ ಭಾಗ ಹೃದಯ ಕೊಡುವವಳೆ; ನಿನ್ಹಾಂಗ ಧರ್ಮದಲಿ ಧಾರಾಳತನದಲ್ಲಿ ಇನ್ನೊಬ್ಬರನು ಕಾಣೆ ಧರೆಗೆ ದೊಡ್ಡವಳೆ ಸಾವಿರದ ಶರಣವ್ವ ಕನ್ನಡದ ತಾಯೇ", by: "ಡಾ. ಚಂದ್ರಶೇಖರ ಕಂಬಾರ", art: "kambar" },
  { date: "2026-11-30", text: "ಕನ್ನಡವು ಕನ್ನಡವ ಕನ್ನಡಿಸುತಿರಬೇಕು", by: "ವರಕವಿ ದ.ರಾ.ಬೇಂದ್ರೆ", art: "bendre" },
];

/*
 * Opening animation, played once a day, on the home page, before the site appears.
 * figures → flown past in this order (history order), alternating red and black.
 *           art names a silhouette in js/silhouette-art.js, made by tools/silhouette-art.py
 *           from the images in assets/silhouettes.
 * finale  → the closing screen with the map and flag.
 * timing  → milliseconds. Length = (figures + 1) × figureMs + finaleMs (map and flag)
 *           + holdMs (closing screen held), then exitMs while the opening lifts away.
 *           holdMs null holds the closing screen until the reader taps.
 */
const OPENING = {
  label: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ಆರಂಭಿಕ ಪರಿಚಯ",
  skip: "ಸ್ಕಿಪ್",
  skipLabel: "ಪರಿಚಯ ಬಿಟ್ಟು ತಾಣಕ್ಕೆ ತೆರಳಿ",
  finale: {
    eyebrow: "71ನೇ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ · ನವೆಂಬರ್ 1, 2026",
    title: "ಕರುನಾಡೋತ್ಸವ",
    text: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಶುಭಾಶಯಗಳು. ನಾಡು, ನುಡಿ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ಸಂಭ್ರಮವನ್ನು ಪ್ರಜಾವಾಣಿಯೊಂದಿಗೆ ಆಚರಿಸಿ",
    enter: "ವಿಶೇಷ ಸಂಚಿಕೆ ಓದಿ",
  },
  figures: [
    { name: "ಬಸವಣ್ಣ", art: "basavanna" },
    { name: "ಕೆಂಪೇಗೌಡ", art: "kempegowda" },
    { name: "ಒನಕೆ ಓಬವ್ವ", art: "obavva" },
    { name: "ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ", art: "chennamma" },
    { name: "ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ", art: "visvesvaraya" },
    { name: "ಕುವೆಂಪು", art: "kuvempu" },
    { name: "ಡಾ. ರಾಜ್‌ಕುಮಾರ್", art: "rajkumar" },
  ],
  timing: { figureMs: 600, finaleMs: 2600, holdMs: 3000, exitMs: 700 },
};
