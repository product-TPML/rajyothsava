/*
 * All site content lives here. Edit this file to change text, menu sections,
 * carousel slides, highlight cards or photos. No other file needs to change.
 */

/* Interface text. Elements in index.html with data-text="key" receive these. */
const UI = {
  skipLink: "ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ತೆರಳಿ",
  topStrip: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ವಿಶೇಷ ಸಂಚಿಕೆ",
  topStripDate: "ನವೆಂಬರ್ 1, 2026",
  tagline: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ವಿಶೇಷ",
  headerAction: "ಪ್ರಜಾವಾಣಿ ಮುಖಪುಟ",
  headerActionUrl: "https://www.prajavani.net/",
  homeLabel: "ಪ್ರಜಾವಾಣಿ ರಾಜ್ಯೋತ್ಸವ ವಿಶೇಷ – ಮುಖಪುಟ",
  navLabel: "ಮುಖ್ಯ ವಿಭಾಗಗಳು",
  menuButton: "ಇನ್ನಷ್ಟು",
  menuTitle: "ಎಲ್ಲ ವಿಭಾಗಗಳು",
  menuClose: "ಮುಚ್ಚಿ",

  featuredTitle: "ಮುಖ್ಯ ಕಥನಗಳು",
  carouselPrev: "ಹಿಂದಿನ ಕಥನ",
  carouselNext: "ಮುಂದಿನ ಕಥನ",
  carouselPause: "ಸ್ವಯಂ ಚಲನೆ ನಿಲ್ಲಿಸಿ",
  carouselPlay: "ಸ್ವಯಂ ಚಲನೆ ಆರಂಭಿಸಿ",
  carouselGoTo: "ಕಥನ {n}ಕ್ಕೆ ತೆರಳಿ",
  slideOf: "{n} / {total}",
  readMore: "ಓದಿ",

  introQuote: "ಎಲ್ಲಾದರು ಇರು, ಎಂತಾದರು ಇರು, ಎಂದೆಂದಿಗು ನೀ ಕನ್ನಡವಾಗಿರು",
  introQuoteBy: "— ಕುವೆಂಪು",
  introText:
    "ನಾಡು, ನುಡಿ, ಕಲೆ ಮತ್ತು ಪರಂಪರೆಯ ಸಂಭ್ರಮಕ್ಕೆ ಪ್ರಜಾವಾಣಿಯ ಈ ವಿಶೇಷ ಸಂಚಿಕೆ ಮೀಸಲು. " +
    "ಕರ್ನಾಟಕದ ಮೂಲೆಮೂಲೆಗಳ ಕಥನಗಳು, ಚಿತ್ರಗಳು ಮತ್ತು ಅಭಿಪ್ರಾಯಗಳನ್ನು ಒಂದೇ ಕಡೆ ಓದಿ.",
  introAction: "ಎಲ್ಲ ವಿಭಾಗಗಳನ್ನು ನೋಡಿ",

  highlightsTitle: "ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶಗಳು",
  sectionsTitle: "ಎಲ್ಲ ವಿಭಾಗಗಳು",
  comingSoon: "ಪುಟ ಶೀಘ್ರದಲ್ಲೇ",

  footerAbout:
    "ಪ್ರಜಾವಾಣಿ – ಕನ್ನಡದ ವಿಶ್ವಾಸಾರ್ಹ ದಿನಪತ್ರಿಕೆ. ರಾಜ್ಯೋತ್ಸವದ ಈ ವಿಶೇಷ ತಾಣ ನಾಡಿನ ಹೆಮ್ಮೆಯ ಕಥನಗಳನ್ನು ಓದುಗರಿಗೆ ತಲುಪಿಸುತ್ತದೆ.",
  footerSectionsTitle: "ವಿಭಾಗಗಳು",
  footerCreditsTitle: "ಚಿತ್ರ ಕೃಪೆ (ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್)",
  footerCopyright: "© 2026 ಪ್ರಜಾವಾಣಿ",
  footerDraftNote: "ಇದು ಮಾದರಿ ಕರಡು – ಪ್ರಕಟಣೆಗೆ ಮುನ್ನ ಪರಿಶೀಲನೆ ಅಗತ್ಯ.",
};

/*
 * The 18 menu sections, in menu order.
 * primary: true  → shown in the desktop menu bar; the rest sit under "ಇನ್ನಷ್ಟು".
 * href           → where the link goes. Until real section pages exist, each
 *                  points to its tile in the "ಎಲ್ಲ ವಿಭಾಗಗಳು" directory.
 */
const SECTIONS = [
  { id: "home", kn: "ಮುಖಪುಟ", en: "Home", primary: true, href: "#top" },
  { id: "news", kn: "ಸುದ್ದಿ", en: "News", primary: true },
  { id: "business", kn: "ವಾಣಿಜ್ಯ", en: "Business", primary: true },
  { id: "technology", kn: "ತಂತ್ರಜ್ಞಾನ", en: "Technology", primary: true },
  { id: "education", kn: "ಶಿಕ್ಷಣ", en: "Education", primary: true },
  { id: "health", kn: "ಆರೋಗ್ಯ", en: "Health", primary: true },
  { id: "lifestyle", kn: "ಜೀವನಶೈಲಿ", en: "Lifestyle" },
  { id: "entertainment", kn: "ಮನರಂಜನೆ", en: "Entertainment", primary: true },
  { id: "sports", kn: "ಕ್ರೀಡೆ", en: "Sports", primary: true },
  { id: "travel", kn: "ಪ್ರವಾಸ", en: "Travel" },
  { id: "food", kn: "ಆಹಾರ", en: "Food" },
  { id: "culture", kn: "ಸಂಸ್ಕೃತಿ", en: "Culture" },
  { id: "environment", kn: "ಪರಿಸರ", en: "Environment" },
  { id: "opinion", kn: "ಅಭಿಪ್ರಾಯ", en: "Opinion" },
  { id: "interviews", kn: "ಸಂದರ್ಶನ", en: "Interviews" },
  { id: "special-reports", kn: "ವಿಶೇಷ ವರದಿ", en: "Special Reports" },
  { id: "photo-stories", kn: "ಫೋಟೊ ಕಥನ", en: "Photo Stories" },
  { id: "about", kn: "ನಮ್ಮ ಬಗ್ಗೆ", en: "About Us" },
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
};

/* Featured carousel: exactly 10 slides. section = an id from SECTIONS. */
const SLIDES = [
  {
    image: "hampi",
    section: "culture",
    title: "ಹಂಪಿ: ಕಲ್ಲಿನಲ್ಲಿ ಅರಳಿದ ವಿಜಯನಗರದ ವೈಭವ",
    summary: "ವಿಠ್ಠಲ ದೇವಾಲಯದ ಕಲ್ಲಿನ ರಥ ಇಂದಿಗೂ ಸಾಮ್ರಾಜ್ಯದ ಕಲಾಸಂಪತ್ತಿಗೆ ಸಾಕ್ಷಿಯಾಗಿ ನಿಂತಿದೆ.",
  },
  {
    image: "mysuru-palace",
    section: "culture",
    title: "ದೀಪಾಲಂಕಾರದಲ್ಲಿ ಮಿನುಗುವ ಮೈಸೂರು ಅರಮನೆ",
    summary: "ಸಾವಿರಾರು ದೀಪಗಳ ಬೆಳಕಿನಲ್ಲಿ ಅರಮನೆಯ ರಾತ್ರಿ ನೋಟ ನಾಡಹಬ್ಬದ ಸಂಭ್ರಮಕ್ಕೆ ಮೆರುಗು ನೀಡುತ್ತದೆ.",
  },
  {
    image: "dasara",
    section: "culture",
    title: "ನಾಡಹಬ್ಬದ ಗಜಪಡೆ: ಮೈಸೂರಿನ ಬೀದಿಗಳಲ್ಲಿ ತಾಲೀಮು",
    summary: "ಜಂಬೂ ಸವಾರಿಗೆ ಮುನ್ನ ಆನೆಗಳ ತಾಲೀಮು ನಗರದ ಜನರಿಗೆ ಹಬ್ಬದ ಮುನ್ನುಡಿ.",
  },
  {
    image: "jog-falls",
    section: "travel",
    title: "ಮುಂಗಾರಿನಲ್ಲಿ ಮೈದುಂಬಿದ ಜೋಗ ಜಲಪಾತ",
    summary: "ಶರಾವತಿಯ ರಾಜ, ರಾಣಿ, ರೋರರ್, ರಾಕೆಟ್ ಧಾರೆಗಳು ಮಲೆನಾಡಿನ ಹಸಿರಿನ ನಡುವೆ ಧುಮ್ಮಿಕ್ಕುತ್ತವೆ.",
  },
  {
    image: "yakshagana",
    section: "culture",
    title: "ಯಕ್ಷಗಾನ: ಬಣ್ಣದ ಮನೆಯಿಂದ ರಂಗಸ್ಥಳದವರೆಗೆ",
    summary: "ಚೌಕಿಯಲ್ಲಿ ವೇಷ ಸಿದ್ಧಪಡಿಸಿಕೊಳ್ಳುವ ಕಲಾವಿದರ ಶ್ರದ್ಧೆಯೇ ಕರಾವಳಿಯ ಈ ಕಲೆಯ ಜೀವಾಳ.",
  },
  {
    image: "gol-gumbaz",
    section: "travel",
    title: "ಗೋಳಗುಮ್ಮಟ: ಪಿಸುಮಾತು ಪ್ರತಿಧ್ವನಿಸುವ ಗುಮ್ಮಟ",
    summary: "ವಿಜಯಪುರದ ಈ ಭವ್ಯ ಸ್ಮಾರಕದ ಗ್ಯಾಲರಿಯಲ್ಲಿ ಆಡಿದ ಮಾತು ಹಲವು ಬಾರಿ ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ.",
  },
  {
    image: "belur",
    section: "culture",
    title: "ಬೇಲೂರು: ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆಯ ಅದ್ಭುತ",
    summary: "ಚೆನ್ನಕೇಶವ ದೇವಾಲಯದ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗಳು ಶಿಲ್ಪಿಗಳ ಕೈಚಳಕಕ್ಕೆ ಕನ್ನಡಿ.",
  },
  {
    image: "kudremukh",
    section: "environment",
    title: "ಕುದುರೆಮುಖ: ಪಶ್ಚಿಮಘಟ್ಟದ ಹಸಿರು ಅಲೆಗಳು",
    summary: "ಶೋಲಾ ಕಾಡು ಮತ್ತು ಹುಲ್ಲುಗಾವಲುಗಳ ಈ ಬೆಟ್ಟಸಾಲು ನಾಡಿನ ನದಿಗಳ ತೊಟ್ಟಿಲು.",
  },
  {
    image: "udupi",
    section: "culture",
    title: "ಉಡುಪಿ: ಕರಾವಳಿಯ ಸಂಪ್ರದಾಯದ ಕೇಂದ್ರ",
    summary: "ಶ್ರೀಕೃಷ್ಣ ಮಠ ಮತ್ತು ರಥಬೀದಿ ಸಂಪ್ರದಾಯ ಹಾಗೂ ಸಂಭ್ರಮದ ಸಂಗಮ.",
  },
  {
    image: "vidhana-soudha",
    section: "news",
    title: "ವಿಧಾನಸೌಧ: ನಾಡಿನ ಆಡಳಿತದ ಹೃದಯ",
    summary: "ಬೆಂಗಳೂರಿನ ಈ ಭವ್ಯ ಕಟ್ಟಡ ಕರ್ನಾಟಕದ ಪ್ರಜಾಪ್ರಭುತ್ವದ ಸಂಕೇತ.",
  },
];

/* "Latest highlights" cards. The first card is shown larger as the lead story. */
const HIGHLIGHTS = [
  {
    image: "badami",
    section: "culture",
    title: "ಬಾದಾಮಿ ಗುಹಾಂತರ ದೇವಾಲಯಗಳು: ಕೆಂಪು ಕಲ್ಲಿನ ಕಾವ್ಯ",
    summary: "ಚಾಲುಕ್ಯರ ಕಾಲದ ಗುಹಾ ದೇವಾಲಯಗಳಲ್ಲಿ ಬಂಡೆಯಲ್ಲೇ ಕೆತ್ತಿದ ಕಲಾಲೋಕ ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ.",
  },
  {
    image: "pattadakal",
    section: "travel",
    title: "ಪಟ್ಟದಕಲ್ಲು: ಎರಡು ಶೈಲಿಗಳ ಸಂಗಮ",
    summary: "ದ್ರಾವಿಡ ಮತ್ತು ನಾಗರ ಶೈಲಿಯ ದೇವಾಲಯಗಳು ಒಂದೇ ಆವರಣದಲ್ಲಿ.",
  },
  {
    image: "mysore-pak",
    section: "food",
    title: "ಮೈಸೂರು ಪಾಕ್: ಅರಮನೆಯ ಅಡುಗೆಮನೆಯಿಂದ ಮನೆಮನೆಗೆ",
    summary: "ಕಡಲೆಹಿಟ್ಟು, ತುಪ್ಪ, ಸಕ್ಕರೆ – ಮೂರೇ ಪದಾರ್ಥಗಳ ಸಿಹಿಯ ಕಥೆ.",
  },
  {
    image: "bandipur",
    section: "environment",
    title: "ಬಂಡೀಪುರ: ಕಾಡಾನೆಗಳ ನೆಲೆವೀಡು",
    summary: "ನೀಲಗಿರಿ ಜೀವಮಂಡಲದ ಭಾಗವಾದ ಈ ಅರಣ್ಯ ವನ್ಯಜೀವಿ ಸಂರಕ್ಷಣೆಯ ಮಾದರಿ.",
  },
  {
    image: "gokarna",
    section: "travel",
    title: "ಗೋಕರ್ಣದ ಕಡಲತೀರಗಳಲ್ಲಿ ಸಂಜೆ",
    summary: "ಓಂ ಬೀಚ್‌ನ ಅಲೆಗಳ ನಡುವೆ ಪ್ರವಾಸಿಗರ ಸಂಭ್ರಮ.",
  },
  {
    image: "channapatna",
    section: "business",
    title: "ಚನ್ನಪಟ್ಟಣದ ಗೊಂಬೆಗಳು: ಮರದಲ್ಲಿ ಅರಳುವ ಬಣ್ಣಗಳು",
    summary: "ತಲೆಮಾರುಗಳಿಂದ ಸಾಗಿಬಂದ ಕರಕುಶಲ ಕಲೆಗೆ ಹೊಸ ಮಾರುಕಟ್ಟೆಯ ಹುಡುಕಾಟ.",
  },
  {
    image: "kodagu-coffee",
    section: "business",
    title: "ಕೊಡಗಿನ ಕಾಫಿ ತೋಟಗಳಲ್ಲಿ ಹೂ ಅರಳುವ ಕಾಲ",
    summary: "ಮಳೆ ಮತ್ತು ಹೂಬಿಡುವ ಸಮಯವೇ ಬೆಳೆಗಾರರ ವರ್ಷದ ಲೆಕ್ಕಾಚಾರ.",
  },
  {
    image: "shravanabelagola",
    section: "culture",
    title: "ಶ್ರವಣಬೆಳಗೊಳ: ಗೊಮ್ಮಟನ ಶಾಂತ ನೋಟ",
    summary: "ವಿಂಧ್ಯಗಿರಿಯ ಮೇಲಿನ ಏಕಶಿಲಾ ಮೂರ್ತಿ ತ್ಯಾಗ ಮತ್ತು ಶಾಂತಿಯ ಸಂಕೇತ.",
  },
];
