/*
 * All site content lives here. Edit this file to change text, menu sections,
 * carousel slides, highlight cards, photos or the opening animation. No other file needs to change.
 */

/* Interface text. Elements in index.html with data-text="key" receive these. */
const UI = {
  skipLink: "ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ತೆರಳಿ",
  headerAction: "ಪ್ರಜಾವಾಣಿ ಮುಖಪುಟ",
  searchLabel: "ಪ್ರಜಾವಾಣಿಯಲ್ಲಿ ಹುಡುಕಿ",
  searchPlaceholder: "ಪ್ರಜಾವಾಣಿಯಲ್ಲಿ ಹುಡುಕಿ",
  searchUrl: "https://www.prajavani.net/search",
  byline: "ಬರಹ: {author}",
  headerActionUrl: "https://www.prajavani.net/",
  navLabel: "ಈ ಪುಟದಲ್ಲಿ",
  menuTitle: "ಈ ಪುಟದಲ್ಲಿ",
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

  posterEyebrow: "ನಿಮ್ಮ ರಾಜ್ಯೋತ್ಸವ ಪೋಸ್ಟರ್",
  posterTitle: "ನಿಮ್ಮ ಹೆಮ್ಮೆ, ನಿಮ್ಮ ಕನಸು, ನಿಮ್ಮ ಸಮುದಾಯ",
  posterLead: "ನಿಮ್ಮ ಫೋಟೊ ಸೇರಿಸಿ, ಕನ್ನಡ, ಕರ್ನಾಟಕದ ಬಗ್ಗೆ ನಿಮ್ಮ ಹೆಮ್ಮೆ, ಕನಸು ಅಥವಾ ನಿಮ್ಮ ಸಮುದಾಯದ ಬಗ್ಗೆ ಬರೆಯಿರಿ. ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸ್ಟೇಟಸ್‌ಗೆ ಹೊಂದುವ ಪೋಸ್ಟರ್ ಸಿದ್ಧ.",
  posterStart: "ಪೋಸ್ಟರ್ ಮಾಡಿ",
  posterPrivacy: "ನಿಮ್ಮ ಫೋಟೊವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದಿಲ್ಲ, ಸಂಗ್ರಹಿಸುವುದೂ ಇಲ್ಲ. ಪೋಸ್ಟರ್ ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ತಯಾರಾಗುತ್ತದೆ.",
  posterPhoto: "ಫೋಟೊ",
  posterTakePhoto: "ಕ್ಯಾಮೆರಾ",
  posterChoosePhoto: "ಗ್ಯಾಲರಿ",
  posterZoom: "ಫೋಟೊ ಗಾತ್ರ",
  posterPrompt: "ಯಾವುದರ ಬಗ್ಗೆ?",
  posterLine: "ನಿಮ್ಮ ಮಾತು",
  posterCount: "{n}/{max}",
  posterSuggestions: "ಸಲಹೆಗಳು",
  posterName: "ಹೆಸರು, ಊರು (ಐಚ್ಛಿಕ)",
  posterNamePlaceholder: "ಉದಾ: ಸುಮಾ, ಮಂಡ್ಯ",
  posterStory: "ಜೊತೆಗೊಂದು ಕತೆ (ಐಚ್ಛಿಕ)",
  posterStoryHint: "ಪೋಸ್ಟರ್ ಹಂಚಿಕೊಳ್ಳುವಾಗ ಇದು ಜೊತೆಗೆ ಸಂದೇಶವಾಗಿ ಹೋಗುತ್ತದೆ.",
  posterDisclaimer:
    "ಈ ಸೌಲಭ್ಯ ಪೋಸ್ಟರ್ ತಯಾರಿಸಲು ಮಾತ್ರ. ಪೋಸ್ಟರ್‌ನಲ್ಲಿ ಸೇರಿಸುವ ಫೋಟೊ, ಬರಹ ಹಾಗೂ ಪೋಸ್ಟರ್‌ನ ಬಳಕೆಗೆ ಬಳಕೆದಾರರೇ ಹೊಣೆ. ಅದಕ್ಕೆ ಪ್ರಜಾವಾಣಿ ಜವಾಬ್ದಾರವಲ್ಲ.",
  posterHint: "ಫೋಟೊವನ್ನು ಎಳೆದು ಸರಿಹೊಂದಿಸಿ.",
  posterDownload: "ಡೌನ್‌ಲೋಡ್",
  posterShare: "ಹಂಚಿಕೊಳ್ಳಿ",
  posterReady: "ಪೋಸ್ಟರ್ ಸಿದ್ಧ. ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
  posterLoadError: "ಈ ಫೋಟೊ ತೆರೆಯಲಾಗಲಿಲ್ಲ. ಬೇರೆ ಫೋಟೊ ಪ್ರಯತ್ನಿಸಿ.",
  posterCameraError: "ಕ್ಯಾಮೆರಾ ತೆರೆಯಲಾಗಲಿಲ್ಲ. 'ಗ್ಯಾಲರಿ' ಬಳಸಿ.",
  posterPreviewLabel: "ಪೋಸ್ಟರ್ ಮುನ್ನೋಟ: {heading}, {line}",
  posterClose: "ಪೋಸ್ಟರ್ ತಯಾರಿಕೆ ಮುಚ್ಚಿ",
  posterCta: "ನಿಮ್ಮ ರಾಜ್ಯೋತ್ಸವ ಪೋಸ್ಟರ್ ಮಾಡಿ",
  cameraTitle: "ಫೋಟೊ ತೆಗೆಯಿರಿ",
  cameraShutter: "ಕ್ಲಿಕ್ಕಿಸಿ",
  cameraClose: "ಮುಚ್ಚಿ",

  highlightsTitle: "ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶಗಳು",
  seeAll: "ಎಲ್ಲವನ್ನೂ ನೋಡಿ",
  // Where each section's "See all" button goes: #all/<key> opens STORY_LISTS[key] on this page.
  seeAllStories: "#all/top",
  seeAllVideos: "https://www.youtube.com/prajavani",
  seeAllPhotoStories: "#all/photo",
  allStoriesBack: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  allStoriesLoading: "ಸುದ್ದಿಗಳು ಬರುತ್ತಿವೆ…",
  allStoriesCount: "{count} ಸುದ್ದಿಗಳು · ಪುಟ {page}/{pages}",
  allStoriesError: "ಸುದ್ದಿಗಳನ್ನು ಇಲ್ಲಿ ತೆರೆಯಲು ಆಗಲಿಲ್ಲ.",
  allStoriesErrorLink: "ಪ್ರಜಾವಾಣಿಯಲ್ಲಿ ನೋಡಿ",
  pagerLabel: "ಪುಟಗಳು",
  pagerPrev: "ಹಿಂದಿನ ಪುಟ",
  pagerNext: "ಮುಂದಿನ ಪುಟ",
  pagerPage: "ಪುಟ {page}",
  videosTitle: "ವಿಡಿಯೊ",
  videoPlay: "ವಿಡಿಯೊ ನೋಡಿ: {title}",
  shortsTitle: "ಶಾರ್ಟ್ಸ್ ಮತ್ತು ರೀಲ್ಸ್",
  photoStoriesTitle: "ಫೋಟೊ ಕಥನಗಳು",

  footerAbout:
    "ಪ್ರಜಾವಾಣಿ ಕನ್ನಡದ ವಿಶ್ವಾಸಾರ್ಹ ದಿನಪತ್ರಿಕೆ. ರಾಜ್ಯೋತ್ಸವದ ಈ ವಿಶೇಷ ತಾಣ ನಾಡಿನ ಹೆಮ್ಮೆಯ ಕಥನಗಳನ್ನು ಓದುಗರಿಗೆ ತಲುಪಿಸುತ್ತದೆ.",
  footerCreditsTitle: "ಚಿತ್ರ ಮತ್ತು ವಿಡಿಯೊ ಕೃಪೆ (ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್)",
  footerCopyright: "© 2026 ಪ್ರಜಾವಾಣಿ",
  openingReplay: "ಆರಂಭದ ದೃಶ್ಯ ಮತ್ತೆ ನೋಡಿ",
  footerDraftNote: "ಇದು ಮಾದರಿ ಕರಡು. ಪ್ರಕಟಣೆಗೆ ಮುನ್ನ ಪರಿಶೀಲನೆ ಅಗತ್ಯ.",
};

/*
 * The menus: the parts of this page, in page order. target → the section's id.
 * Phones also get a bar fixed to the bottom of the screen with the parts that have
 * short (the label there) and icon (from ICONS in js/main.js), then the menu button:
 * keep it to four.
 * A part that isn't on the page (photo stories when their collection can't be read)
 * drops out of the menus too.
 */
const PAGE_NAV = [
  { label: "ಮುಖ್ಯ ಕಥನಗಳು", short: "ಮುಖಪುಟ", icon: "home", target: "featured" },
  { label: "ಪೋಸ್ಟರ್", short: "ಪೋಸ್ಟರ್", icon: "camera", target: "poster" },
  { label: "ಮುಖ್ಯಾಂಶಗಳು", short: "ಸುದ್ದಿ", icon: "news", target: "highlights" },
  { label: "ವಿಡಿಯೊ", short: "ವಿಡಿಯೊ", icon: "play", target: "videos" },
  { label: "ಫೋಟೊ ಕಥನಗಳು", target: "photo-stories" },
];

/*
 * Newspaper sections, for the label on each story in this file (SLIDES, HIGHLIGHTS,
 * VIDEOS: section = an id here). Those stories link to the newspaper's home page.
 */
const SECTIONS = [
  { id: "news", name: "ಸುದ್ದಿ" },
  { id: "business", name: "ವಾಣಿಜ್ಯ" },
  { id: "technology", name: "ತಂತ್ರಜ್ಞಾನ" },
  { id: "education", name: "ಶಿಕ್ಷಣ" },
  { id: "health", name: "ಆರೋಗ್ಯ" },
  { id: "lifestyle", name: "ಜೀವನಶೈಲಿ" },
  { id: "entertainment", name: "ಮನರಂಜನೆ" },
  { id: "sports", name: "ಕ್ರೀಡೆ" },
  { id: "travel", name: "ಪ್ರವಾಸ" },
  { id: "food", name: "ಆಹಾರ" },
  { id: "culture", name: "ಸಂಸ್ಕೃತಿ" },
  { id: "environment", name: "ಪರಿಸರ" },
  { id: "opinion", name: "ಅಭಿಪ್ರಾಯ" },
  { id: "interviews", name: "ಸಂದರ್ಶನ" },
  { id: "special-reports", name: "ವಿಶೇಷ ವರದಿ" },
  { id: "photo-stories", name: "ಫೋಟೊ ಕಥನ" },
  { id: "about", name: "ನಮ್ಮ ಬಗ್ಗೆ" },
];

/*
 * Photos. Each key matches files in assets/images: <key>-640.webp and <key>-1280.webp.
 * Photos are cropped to fit their frame, so any landscape photo works.
 * All are from Wikimedia Commons under the licence shown. Credit is required.
 */
const IMAGES = {
  hampi: {
    alt: "ಹಂಪಿಯ ವಿಠ್ಠಲ ದೇವಾಲಯದ ಆವರಣದಲ್ಲಿರುವ ಕಲ್ಲಿನ ರಥ",
    credit: { author: "Ram Nagesh Thota", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Iconic_Stone_Chariot_@_Vittala_Temple,_Hampi,_Karnataka.jpg" },
  },
  "mysuru-palace": {
    alt: "ರಾತ್ರಿಯ ದೀಪಾಲಂಕಾರದಲ್ಲಿ ಮೈಸೂರು ಅರಮನೆ",
    credit: { author: "Ingo Mehling", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Mysuru_Palace_-_Night_View.jpg" },
  },
  dasara: {
    alt: "ಮೈಸೂರಿನ ಕೆ.ಆರ್. ವೃತ್ತದಲ್ಲಿ ಸಾಲಾಗಿ ಸಾಗುತ್ತಿರುವ ದಸರಾ ಆನೆಗಳು",
    credit: { author: "Basavaraj M", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:KR_Circle_Mysore_1510.jpg" },
  },
  "jog-falls": {
    alt: "ಹಸಿರು ಕಣಿವೆಯಲ್ಲಿ ಧುಮ್ಮಿಕ್ಕುತ್ತಿರುವ ಜೋಗ ಜಲಪಾತ",
    credit: { author: "SajjadF", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Jog_Falls_2013.JPG" },
  },
  yakshagana: {
    alt: "ಚೌಕಿಯಲ್ಲಿ ಮುಖಕ್ಕೆ ಬಣ್ಣ ಹಚ್ಚಿಕೊಳ್ಳುತ್ತಿರುವ ಯಕ್ಷಗಾನ ಕಲಾವಿದರು",
    credit: { author: "Pablo Studio", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Yakshagana_Artist.jpg" },
  },
  "gol-gumbaz": {
    alt: "ವಿಜಯಪುರದ ಗೋಳಗುಮ್ಮಟ ಮತ್ತು ಅದರ ಮುಂದಿನ ಉದ್ಯಾನ",
    credit: { author: "Rangan Datta Wiki", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Gol_Gumbaz,_Bijapur_1.jpg" },
  },
  belur: {
    alt: "ಬೇಲೂರಿನ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯದ ಕೆತ್ತನೆಯ ಮುಂಭಾಗ",
    credit: { author: "Dineshkannambadi", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Chennakeshava_Temple_at_Belur.jpg" },
  },
  kudremukh: {
    alt: "ಕುದುರೆಮುಖದ ಹಸಿರು ಹುಲ್ಲುಗಾವಲಿನ ಬೆಟ್ಟಸಾಲು",
    credit: { author: "Dhruvaraj S", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Kudremukh_1.jpg" },
  },
  udupi: {
    alt: "ಉಡುಪಿ ಶ್ರೀಕೃಷ್ಣ ಮಠದ ಬಣ್ಣಬಣ್ಣದ ಮಹಾದ್ವಾರ",
    credit: { author: "Ashok Prabhakaran", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:Udupi_Sri_Krishna_Matha_Temple.jpg" },
  },
  "vidhana-soudha": {
    alt: "ಬೆಂಗಳೂರಿನ ವಿಧಾನಸೌಧದ ಪೂರ್ವ ದ್ವಾರ",
    credit: { author: "Moheen Reeyad", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Gate_3_(East),_Vidhana_Soudha_(01).jpg" },
  },
  badami: {
    alt: "ಬಾದಾಮಿಯ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಂಡೆಯಲ್ಲಿ ಕೆತ್ತಿದ ಗುಹಾ ದೇವಾಲಯ",
    credit: { author: "Rajeshodayanchal", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:A-cave-temple-at-badami.JPG" },
  },
  pattadakal: {
    alt: "ಪಟ್ಟದಕಲ್ಲಿನ ಹಸಿರು ಆವರಣದಲ್ಲಿರುವ ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳು",
    credit: { author: "Vinayaraj", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Pattadakal_temple_complex_-_hamvrvb102k22_(30).jpg" },
  },
  "mysore-pak": {
    alt: "ಬಾಳೆ ಎಲೆಯ ಮೇಲಿಟ್ಟ ಮೈಸೂರು ಪಾಕ್",
    credit: { author: "Charles Haynes", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:Mysore_pak.jpg" },
  },
  bandipur: {
    alt: "ಬಂಡೀಪುರದ ಕಾಡಿನಲ್ಲಿ ದಂತವಿರುವ ಸಲಗ",
    credit: { author: "Yathin S Krishnappa", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Elephas_maximus_(Bandipur).jpg" },
  },
  gokarna: {
    alt: "ಗೋಕರ್ಣದ ಓಂ ಬೀಚ್‌ನ ತೀರದಲ್ಲಿ ಆಟವಾಡುತ್ತಿರುವ ಪ್ರವಾಸಿಗರು",
    credit: { author: "Sourabh.biswas003", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:PXL_20260103_101009613_People_and_Beach_Om_Beach_Gokarna,_Karnataka_20.jpg" },
  },
  channapatna: {
    alt: "ಚನ್ನಪಟ್ಟಣದ ಕಾರ್ಯಾಗಾರದಲ್ಲಿ ಮರದ ಗೊಂಬೆ ತಯಾರಿಸುತ್ತಿರುವ ಕುಶಲಕರ್ಮಿಗಳು",
    credit: { author: "KartikMistry", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Channapatna_toys_artists.jpg" },
  },
  "kodagu-coffee": {
    alt: "ಕೊಡಗಿನ ಕಾಫಿ ಗಿಡದ ಕೊಂಬೆಯಲ್ಲಿ ಅರಳುತ್ತಿರುವ ಮೊಗ್ಗುಗಳು",
    credit: { author: "Timothy A. Gonsalves", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Flower_Buds_Coffee_Robusta_Coorg_Feb24_D72_25939.jpg" },
  },
  shravanabelagola: {
    alt: "ಶ್ರವಣಬೆಳಗೊಳದ ಗೊಮ್ಮಟೇಶ್ವರ ಏಕಶಿಲಾ ಮೂರ್ತಿ",
    credit: { author: "Venkygrams", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Shravanabelagola_-_Gommateshwara_Statue_1.jpg" },
  },
  "dollu-kunitha": {
    alt: "ಡೊಳ್ಳು ಬಾರಿಸುತ್ತಾ ಕುಣಿಯುತ್ತಿರುವ ಡೊಳ್ಳು ಕುಣಿತದ ಕಲಾವಿದರು",
    credit: { author: "Navaneeth Krishnan S", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Dollu_Kunitha_01.jpg" },
  },
  "dasara-lights": {
    alt: "ದಸರಾ ದೀಪಾಲಂಕಾರದಲ್ಲಿ ಬೆಳಗುತ್ತಿರುವ ಮೈಸೂರು ಅರಮನೆ",
    credit: { author: "Ananth BS", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Dasara_Navaratri_Festival_Lights_Mysore_Palace_India.jpg" },
  },
};

/*
 * Collections on prajavani.net, read each time the page opens. The desk picks the
 * stories and their order there.
 * top   → its first 10 stories, in the desk's order, are the featured carousel; its
 *         first 20, newest first, are the stories section below.
 * photo → photo stories.
 */
const COLLECTIONS = {
  api: "https://www.prajavani.net/api/v1/collections/",
  imageHost: "https://images.prajavani.net/",
  top: "karunadotsava-top",
  photo: "karunadotsava-photo",
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
};

/*
 * Articles. SLIDES (carousel) and HIGHLIGHTS (stories section) are shown when the top
 * collection can't be read. section = an id from SECTIONS. Author names are PLACEHOLDERS.
 */
const SLIDES = [
  {
    image: "hampi",
    author: "ಎಸ್. ರಮೇಶ್",
    section: "culture",
    title: "ಹಂಪಿ: ಕಲ್ಲಿನಲ್ಲಿ ಅರಳಿದ ವಿಜಯನಗರದ ವೈಭವ",
    summary: "ವಿಠ್ಠಲ ದೇವಾಲಯದ ಕಲ್ಲಿನ ರಥ ಇಂದಿಗೂ ಸಾಮ್ರಾಜ್ಯದ ಕಲಾಸಂಪತ್ತಿಗೆ ಸಾಕ್ಷಿಯಾಗಿ ನಿಂತಿದೆ.",
  },
  {
    image: "mysuru-palace",
    author: "ಕೆ. ಎನ್. ಸುಮಾ",
    section: "culture",
    title: "ದೀಪಾಲಂಕಾರದಲ್ಲಿ ಮಿನುಗುವ ಮೈಸೂರು ಅರಮನೆ",
    summary: "ಸಾವಿರಾರು ದೀಪಗಳ ಬೆಳಕಿನಲ್ಲಿ ಅರಮನೆಯ ರಾತ್ರಿ ನೋಟ ನಾಡಹಬ್ಬದ ಸಂಭ್ರಮಕ್ಕೆ ಮೆರುಗು ನೀಡುತ್ತದೆ.",
  },
  {
    image: "dasara",
    author: "ಮಂಜುನಾಥ ಹೆಗಡೆ",
    section: "culture",
    title: "ನಾಡಹಬ್ಬದ ಗಜಪಡೆ: ಮೈಸೂರಿನ ಬೀದಿಗಳಲ್ಲಿ ತಾಲೀಮು",
    summary: "ಜಂಬೂ ಸವಾರಿಗೆ ಮುನ್ನ ಆನೆಗಳ ತಾಲೀಮು ನಗರದ ಜನರಿಗೆ ಹಬ್ಬದ ಮುನ್ನುಡಿ.",
  },
  {
    image: "jog-falls",
    author: "ಪ್ರಕಾಶ್ ಶೆಟ್ಟಿ",
    section: "travel",
    title: "ಮುಂಗಾರಿನಲ್ಲಿ ಮೈದುಂಬಿದ ಜೋಗ ಜಲಪಾತ",
    summary: "ಶರಾವತಿಯ ರಾಜ, ರಾಣಿ, ರೋರರ್, ರಾಕೆಟ್ ಧಾರೆಗಳು ಮಲೆನಾಡಿನ ಹಸಿರಿನ ನಡುವೆ ಧುಮ್ಮಿಕ್ಕುತ್ತವೆ.",
  },
  {
    image: "yakshagana",
    author: "ಗಣೇಶ ಭಟ್",
    section: "culture",
    title: "ಯಕ್ಷಗಾನ: ಬಣ್ಣದ ಮನೆಯಿಂದ ರಂಗಸ್ಥಳದವರೆಗೆ",
    summary: "ಚೌಕಿಯಲ್ಲಿ ವೇಷ ಸಿದ್ಧಪಡಿಸಿಕೊಳ್ಳುವ ಕಲಾವಿದರ ಶ್ರದ್ಧೆಯೇ ಕರಾವಳಿಯ ಈ ಕಲೆಯ ಜೀವಾಳ.",
  },
  {
    image: "gol-gumbaz",
    author: "ಅನಿತಾ ಪಾಟೀಲ",
    section: "travel",
    title: "ಗೋಳಗುಮ್ಮಟ: ಪಿಸುಮಾತು ಪ್ರತಿಧ್ವನಿಸುವ ಗುಮ್ಮಟ",
    summary: "ವಿಜಯಪುರದ ಈ ಭವ್ಯ ಸ್ಮಾರಕದ ಗ್ಯಾಲರಿಯಲ್ಲಿ ಆಡಿದ ಮಾತು ಹಲವು ಬಾರಿ ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ.",
  },
  {
    image: "belur",
    author: "ಆರ್. ಶ್ರೀನಿವಾಸ್",
    section: "culture",
    title: "ಬೇಲೂರು: ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆಯ ಅದ್ಭುತ",
    summary: "ಚೆನ್ನಕೇಶವ ದೇವಾಲಯದ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗಳು ಶಿಲ್ಪಿಗಳ ಕೈಚಳಕಕ್ಕೆ ಕನ್ನಡಿ.",
  },
  {
    image: "kudremukh",
    author: "ದೀಪಾ ಗೌಡ",
    section: "environment",
    title: "ಕುದುರೆಮುಖ: ಪಶ್ಚಿಮಘಟ್ಟದ ಹಸಿರು ಅಲೆಗಳು",
    summary: "ಶೋಲಾ ಕಾಡು ಮತ್ತು ಹುಲ್ಲುಗಾವಲುಗಳ ಈ ಬೆಟ್ಟಸಾಲು ನಾಡಿನ ನದಿಗಳ ತೊಟ್ಟಿಲು.",
  },
  {
    image: "udupi",
    author: "ವಿನಯ್ ಕಾಮತ್",
    section: "culture",
    title: "ಉಡುಪಿ: ಕರಾವಳಿಯ ಸಂಪ್ರದಾಯದ ಕೇಂದ್ರ",
    summary: "ಶ್ರೀಕೃಷ್ಣ ಮಠ ಮತ್ತು ರಥಬೀದಿ ಸಂಪ್ರದಾಯ ಹಾಗೂ ಸಂಭ್ರಮದ ಸಂಗಮ.",
  },
  {
    image: "vidhana-soudha",
    author: "ಪ್ರಜಾವಾಣಿ ವಾರ್ತೆ",
    section: "news",
    title: "ವಿಧಾನಸೌಧ: ನಾಡಿನ ಆಡಳಿತದ ಹೃದಯ",
    summary: "ಬೆಂಗಳೂರಿನ ಈ ಭವ್ಯ ಕಟ್ಟಡ ಕರ್ನಾಟಕದ ಪ್ರಜಾಪ್ರಭುತ್ವದ ಸಂಕೇತ.",
  },
];

/* "Latest highlights" cards. The first card is shown larger as the lead story. */
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
  eyebrow: "ಪ್ರದರ್ಶನ",
  title: "ಮುಖಪುಟದಲ್ಲಿ ಕರುನಾಡು",
  text:
    "ಕರ್ನಾಟಕ ಮತ್ತು ಕನ್ನಡದ ಕುರಿತು ದಶಕಗಳಿಂದ ಪ್ರಜಾವಾಣಿ ಮತ್ತು ಡೆಕ್ಕನ್ ಹೆರಾಲ್ಡ್‌ನಲ್ಲಿ ಪ್ರಕಟವಾದ " +
    "ಆಯ್ದ ಪುಟಗಳ ಪ್ರದರ್ಶನ. ಇತಿಹಾಸವನ್ನು ಅದು ಮೊದಲು ಮುದ್ರಣವಾದಂತೆಯೇ ನೋಡಲು ಬನ್ನಿ.",
  day: "19",
  month: "ನವೆಂಬರ್",
  whenLabel: "ದಿನಾಂಕ",
  whereLabel: "ಸ್ಥಳ",
  dateLabel: "ಗುರುವಾರ, ನವೆಂಬರ್ 19, 2026",
  venue: "ರಂಗೋಲಿ ಮೆಟ್ರೋ ಆರ್ಟ್ ಸೆಂಟರ್, ಎಂ.ಜಿ. ರಸ್ತೆ, ಬೆಂಗಳೂರು",
  calendarButton: "Google ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ",
  calendarTitle: "ಮುಖಪುಟದಲ್ಲಿ ಕರುನಾಡು: ಪ್ರಜಾವಾಣಿ ಮತ್ತು ಡೆಕ್ಕನ್ ಹೆರಾಲ್ಡ್ ಪುಟಗಳ ಪ್ರದರ್ಶನ",
  date: "2026-11-19",
  time: null,
  location: "Rangoli Metro Art Center, MG Road, Bengaluru",
};

const HIGHLIGHTS = [
  {
    image: "badami",
    author: "ಸಂತೋಷ್ ಕುಲಕರ್ಣಿ",
    section: "culture",
    title: "ಬಾದಾಮಿ ಗುಹಾಂತರ ದೇವಾಲಯಗಳು: ಕೆಂಪು ಕಲ್ಲಿನ ಕಾವ್ಯ",
    summary: "ಚಾಲುಕ್ಯರ ಕಾಲದ ಗುಹಾ ದೇವಾಲಯಗಳಲ್ಲಿ ಬಂಡೆಯಲ್ಲೇ ಕೆತ್ತಿದ ಕಲಾಲೋಕ ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ.",
  },
  {
    image: "pattadakal",
    author: "ಅನಿತಾ ಪಾಟೀಲ",
    section: "travel",
    title: "ಪಟ್ಟದಕಲ್ಲು: ಎರಡು ಶೈಲಿಗಳ ಸಂಗಮ",
    summary: "ದ್ರಾವಿಡ ಮತ್ತು ನಾಗರ ಶೈಲಿಯ ದೇವಾಲಯಗಳು ಒಂದೇ ಆವರಣದಲ್ಲಿ.",
  },
  {
    image: "mysore-pak",
    author: "ಕೆ. ಎನ್. ಸುಮಾ",
    section: "food",
    title: "ಮೈಸೂರು ಪಾಕ್: ಅರಮನೆಯ ಅಡುಗೆಮನೆಯಿಂದ ಮನೆಮನೆಗೆ",
    summary: "ಕಡಲೆಹಿಟ್ಟು, ತುಪ್ಪ, ಸಕ್ಕರೆ: ಮೂರೇ ಪದಾರ್ಥಗಳ ಸಿಹಿಯ ಕಥೆ.",
  },
  {
    image: "bandipur",
    author: "ದೀಪಾ ಗೌಡ",
    section: "environment",
    title: "ಬಂಡೀಪುರ: ಕಾಡಾನೆಗಳ ನೆಲೆವೀಡು",
    summary: "ನೀಲಗಿರಿ ಜೀವಮಂಡಲದ ಭಾಗವಾದ ಈ ಅರಣ್ಯ ವನ್ಯಜೀವಿ ಸಂರಕ್ಷಣೆಯ ಮಾದರಿ.",
  },
  {
    image: "gokarna",
    author: "ಪ್ರಕಾಶ್ ಶೆಟ್ಟಿ",
    section: "travel",
    title: "ಗೋಕರ್ಣದ ಕಡಲತೀರಗಳಲ್ಲಿ ಸಂಜೆ",
    summary: "ಓಂ ಬೀಚ್‌ನ ಅಲೆಗಳ ನಡುವೆ ಪ್ರವಾಸಿಗರ ಸಂಭ್ರಮ.",
  },
  {
    image: "channapatna",
    author: "ಮಂಜುನಾಥ ಹೆಗಡೆ",
    section: "business",
    title: "ಚನ್ನಪಟ್ಟಣದ ಗೊಂಬೆಗಳು: ಮರದಲ್ಲಿ ಅರಳುವ ಬಣ್ಣಗಳು",
    summary: "ತಲೆಮಾರುಗಳಿಂದ ಸಾಗಿಬಂದ ಕರಕುಶಲ ಕಲೆಗೆ ಹೊಸ ಮಾರುಕಟ್ಟೆಯ ಹುಡುಕಾಟ.",
  },
  {
    image: "kodagu-coffee",
    author: "ಕಾವೇರಿ ಪೂವಯ್ಯ",
    section: "business",
    title: "ಕೊಡಗಿನ ಕಾಫಿ ತೋಟಗಳಲ್ಲಿ ಹೂ ಅರಳುವ ಕಾಲ",
    summary: "ಮಳೆ ಮತ್ತು ಹೂಬಿಡುವ ಸಮಯವೇ ಬೆಳೆಗಾರರ ವರ್ಷದ ಲೆಕ್ಕಾಚಾರ.",
  },
  {
    image: "shravanabelagola",
    author: "ಆರ್. ಶ್ರೀನಿವಾಸ್",
    section: "culture",
    title: "ಶ್ರವಣಬೆಳಗೊಳ: ಗೊಮ್ಮಟನ ಶಾಂತ ನೋಟ",
    summary: "ವಿಂಧ್ಯಗಿರಿಯ ಮೇಲಿನ ಏಕಶಿಲಾ ಮೂರ್ತಿ ತ್ಯಾಗ ಮತ್ತು ಶಾಂತಿಯ ಸಂಕೇತ.",
  },
];

/*
 * Videos. Paste each link as copied from YouTube or Instagram.
 * VIDEOS → wide YouTube videos, in the player and the list beside it; the first one
 *          is in the player when the page loads. section = an id from SECTIONS.
 * SHORTS → upright videos in their own row: YouTube Shorts and Instagram Reels.
 * PLACEHOLDER: picked from Prajavani's channels to try the layout.
 */
const VIDEOS = [
  {
    link: "https://www.youtube.com/watch?v=v8bZBvSFPwM",
    section: "lifestyle",
    title: "ಸುಲಭವಾಗಿ ಮಾಡುವ ರುಚಿಕರ ಅವರೆಕಾಳು ಉಪ್ಪಿಟ್ಟು",
    summary: "ಕರುನಾಡ ಸವಿಯೂಟ ಸರಣಿಯಲ್ಲಿ ಅವರೆಕಾಳು ಉಪ್ಪಿಟ್ಟು ಮಾಡುವ ವಿಧಾನ.",
  },
  {
    link: "https://www.youtube.com/watch?v=awF_8sI_jJA",
    section: "business",
    title: "ವರ್ಷಕ್ಕೆ ₹40 ಲಕ್ಷ ಆದಾಯ; ಬದುಕನ್ನೇ ಬದಲಿಸಿದ ರೇಷ್ಮೆ",
    summary: "ರೇಷ್ಮೆ ಕೃಷಿಯಿಂದ ಬದುಕು ಕಟ್ಟಿಕೊಂಡ ರೈತನ ಕಥೆ.",
  },
  {
    link: "https://www.youtube.com/watch?v=W2ab8_lGlpY",
    section: "lifestyle",
    title: "ಮಂಗಳೂರು ಸೌತೆಕಾಯಿ ಹುಳಿ: ಅನ್ನದ ಜೊತೆ ಸವಿದರೆ ಸೂಪರ್ ರುಚಿ",
    summary: "ಕರಾವಳಿಯ ಅಡುಗೆಮನೆಯ ಜನಪ್ರಿಯ ಸಾಂಬಾರ್.",
  },
];

const SHORTS = [
  { link: "https://www.youtube.com/shorts/YlaXtECjb7k", title: "ದಸರಾ ಅಂಬಾರಿ ಹೊತ್ತ ಅಭಿಮನ್ಯು ಆನೆಗೆ ಬೀಳ್ಕೊಡುಗೆ" },
  { link: "https://www.instagram.com/reel/De_UypSgE5f/", title: "ಆಂಧ್ರಪ್ರದೇಶದಲ್ಲಿ ‘ಒರ್ನಾಬ್’ ಚಂಡಮಾರುತದ ಅಬ್ಬರ" },
  { link: "https://www.youtube.com/shorts/NvOLvtVUBlw", title: "ಪ್ರಜಾವಾಣಿ ಸಿನಿ ಸಮ್ಮಾನಕ್ಕೆ ಕಿಚ್ಚ ಸುದೀಪ್ ಎಂಟ್ರಿ" },
  { link: "https://www.youtube.com/shorts/ak5vM6PFRcY", title: "ವಿಧಾನಸೌಧದಲ್ಲಿ ಸ್ವಾತಂತ್ರ್ಯ ದಿನ ಸಂಭ್ರಮ" },
];

/*
 * Poster maker. Readers add a photo and write, in a line, what makes them proud of
 * Kannada and Karnataka, what they dream for its future, or about their community. The poster is tall (9:16)
 * so it fits a WhatsApp status; an optional longer story goes with it as the message
 * when shared.
 * prompts  → the choices, one tab each; example is shown faintly until the reader writes,
 *            suggestions are tap-to-use starting points.
 * samples  → the example posters on the page, with photos from IMAGES.
 *            PLACEHOLDER: the lines and names are made up for illustration.
 * camera   → which phone camera "ಕ್ಯಾಮೆರಾ" opens ("user" = front, "environment" = back).
 * mark     → the Karunadotsava mark (newspaper logo + event title) at the top of the poster.
 * logo     → the brand logo in the poster's "made at" credit.
 * address  → printed on the poster and sent with it. PLACEHOLDER until the web team sets it up.
 */
const POSTER = {
  prompts: {
    pride: {
      label: "ನನ್ನ ಹೆಮ್ಮೆ",
      hint: "ಕನ್ನಡ, ಕರ್ನಾಟಕದ ಯಾವುದು ನಿಮಗೆ ಹೆಮ್ಮೆ ತರುತ್ತದೆ?",
      example: "ನಮ್ಮೂರ ಕಂಬಳದ ಕೆಸರಿನ ಓಟ",
      suggestions: ["ನನ್ನೂರು", "ನಮ್ಮ ಕನ್ನಡ ಭಾಷೆ", "ನಮ್ಮ ಹಬ್ಬಗಳು", "ನಮ್ಮೂರ ಊಟ", "ನಮ್ಮ ಕಲೆ, ಸಂಗೀತ", "ನನ್ನ ಕುಟುಂಬ"],
    },
    dream: {
      label: "ನನ್ನ ಕನಸು",
      hint: "ಕನ್ನಡ, ಕರ್ನಾಟಕದ ಭವಿಷ್ಯಕ್ಕಾಗಿ ನಿಮ್ಮ ಆಶಯ ಏನು?",
      example: "ಪ್ರತಿ ಮಗುವೂ ಕನ್ನಡದಲ್ಲಿ ಓದಿ ಬೆಳೆಯಲಿ",
      suggestions: ["ಕನ್ನಡ ಶಾಲೆಗಳು ಬೆಳಗಲಿ", "ಹಸಿರು ಬೆಂಗಳೂರು ಮರಳಲಿ", "ಊರಲ್ಲೇ ಉದ್ಯೋಗ ಸಿಗಲಿ", "ಕೆರೆಗಳು ತುಂಬಿ ತುಳುಕಲಿ", "ತಂತ್ರಜ್ಞಾನದಲ್ಲೂ ಕನ್ನಡ ಮೆರೆಯಲಿ"],
    },
    community: {
      label: "ನನ್ನ ಸಮುದಾಯ",
      hint: "ನಿಮ್ಮ ಊರು, ಬಡಾವಣೆ ಅಥವಾ ಬಳಗದ ಜನರ ಬಗ್ಗೆ ಒಂದು ಮಾತು",
      example: "ಊರ ಕೆರೆಯ ಹೂಳೆತ್ತಿದ ನಮ್ಮ ಯುವಕ ಸಂಘ",
      suggestions: ["ನಮ್ಮ ಕನ್ನಡ ಸಂಘ", "ನಮ್ಮ ಬಡಾವಣೆ", "ನಮ್ಮೂರ ಜನ", "ನಮ್ಮ ಶಾಲೆ", "ನಮ್ಮ ರೈತರು", "ನಮ್ಮ ಯುವಕ ಸಂಘ"],
    },
  },
  samples: [
    { prompt: "dream", image: "kudremukh", line: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ಎಂದೆಂದೂ ಹಸಿರಾಗಿರಲಿ", name: "ಅನಿತಾ, ಚಿಕ್ಕಮಗಳೂರು" },
    { prompt: "community", image: "dollu-kunitha", line: "ಡೊಳ್ಳು ಕುಣಿತ ಉಳಿಸಿರುವ ನಮ್ಮೂರ ಯುವಕರು", name: "ರಮೇಶ್, ಶಿವಮೊಗ್ಗ" },
    { prompt: "pride", image: "dasara-lights", line: "ದಸರೆಯ ಬೆಳಕಲ್ಲಿ ಮಿನುಗುವ ಮೈಸೂರು", name: "ಸುಮಾ, ಮೈಸೂರು" },
  ],
  lineMax: 60,
  storyMax: 300,
  camera: "user",
  placeholder: "ನಿಮ್ಮ ಫೋಟೊ",
  eventLine: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ · ನವೆಂಬರ್ 1, 2026",
  mark: "assets/hero/karunadotsava-pv-720.webp",
  logo: "https://images.assettype.com/deccanherald/2026-10-08/uf85tvay/PV-White.svg",
  credit: "{address} ನಲ್ಲಿ ತಯಾರಿಸಿದ್ದು",
  address: "prajavani.net/rajyotsava",
  fileName: "prajavani-rajyotsava-poster.jpg",
  // Sent with the poster when shared: the reader's story (if any), then the link.
  shareText: "{story}ನಿಮ್ಮದೂ ಮಾಡಿ: https://{address}",
};

/*
 * Quotes in the red banner, one a day. date → the day it runs (India time). The
 * banner opens on today's quote; the back arrow steps through earlier days. Quotes
 * whose day hasn't come stay hidden, and until the first date the banner is left out.
 * art names the speaker's silhouette in js/silhouette-art.js (see OPENING below).
 * PLACEHOLDER: the editorial team will send all 30 quotes; these four hold the place,
 * dated so they show during review (the last one is "today" on 28 October).
 */
const QUOTES = [
  { date: "2026-10-25", text: "ಎಲ್ಲಾದರು ಇರು, ಎಂತಾದರು ಇರು, ಎಂದೆಂದಿಗು ನೀ ಕನ್ನಡವಾಗಿರು", by: "ಕುವೆಂಪು", art: "kuvempu" },
  { date: "2026-10-26", text: "ದಯವಿಲ್ಲದ ಧರ್ಮವದೇವುದಯ್ಯಾ? ದಯವೇ ಬೇಕು ಸಕಲ ಪ್ರಾಣಿಗಳೆಲ್ಲರಲ್ಲಿ", by: "ಬಸವಣ್ಣ", art: "basavanna" },
  { date: "2026-10-27", text: "ಕೈಗಾರಿಕೀಕರಣ ಇಲ್ಲವೇ ವಿನಾಶ", by: "ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ", art: "visvesvaraya" },
  { date: "2026-10-28", text: "ಅಭಿಮಾನಿಗಳೇ ನಮ್ಮನೆ ದೇವರು", by: "ಡಾ. ರಾಜ್‌ಕುಮಾರ್", art: "rajkumar" },
];

/*
 * Opening animation, played once a day, on the home page, before the site appears.
 * figures → flown past in this order (history order), alternating red and black.
 *           art names a silhouette in js/silhouette-art.js, made by tools/silhouette-art.py
 *           from the images in assets/silhouettes.
 * finale  → the closing screen with the map and flag.
 * timing  → milliseconds. Length = (figures + 1) × figureMs + finaleMs (map and flag)
 *           + holdMs (closing screen held), then exitMs while the opening lifts away.
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
