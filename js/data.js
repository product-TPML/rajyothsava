/*
 * All site content lives here. Edit this file to change text, menu sections,
 * carousel slides, highlight cards or photos. No other file needs to change.
 */

/* Interface text. Elements in index.html with data-text="key" receive these. */
const UI = {
  skipLink: "ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ತೆರಳಿ",
  topStrip: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ವಿಶೇಷ ಸಂಚಿಕೆ",
  topStripDate: "ನವೆಂಬರ್ 1, 2026",
  eventTitle: "ಕರುನಾಡೋತ್ಸವ",
  headerAction: "ಪ್ರಜಾವಾಣಿ ಮುಖಪುಟ",
  searchOpen: "ಹುಡುಕಾಟ",
  searchLabel: "ಕಥನಗಳನ್ನು ಹುಡುಕಿ",
  searchPlaceholder: "ಕಥನ, ವಿಭಾಗ ಅಥವಾ ಲೇಖಕರ ಹೆಸರು",
  searchResults: "ಫಲಿತಾಂಶಗಳು: {n}",
  searchNoResults: "ಯಾವುದೇ ಫಲಿತಾಂಶ ಸಿಗಲಿಲ್ಲ",
  byline: "ಬರಹ: {author}",
  headerActionUrl: "https://www.prajavani.net/",
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

  introQuote: "ಎಲ್ಲಾದರು ಇರು, ಎಂತಾದರು ಇರು, ಎಂದೆಂದಿಗು ನೀ ಕನ್ನಡವಾಗಿರು",
  introQuoteBy: "— ಕುವೆಂಪು",
  introText:
    "ನಾಡು, ನುಡಿ, ಕಲೆ ಮತ್ತು ಪರಂಪರೆಯ ಸಂಭ್ರಮಕ್ಕೆ ಪ್ರಜಾವಾಣಿಯ ಈ ವಿಶೇಷ ಸಂಚಿಕೆ ಮೀಸಲು. " +
    "ಕರ್ನಾಟಕದ ಮೂಲೆಮೂಲೆಗಳ ಕಥನಗಳು, ಚಿತ್ರಗಳು ಮತ್ತು ಅಭಿಪ್ರಾಯಗಳನ್ನು ಒಂದೇ ಕಡೆ ಓದಿ.",
  introAction: "ಎಲ್ಲ ವಿಭಾಗಗಳನ್ನು ನೋಡಿ",

  posterEyebrow: "ನಿಮ್ಮ ರಾಜ್ಯೋತ್ಸವ ಪೋಸ್ಟರ್",
  posterTitle: "ಕನ್ನಡದ ಹೆಮ್ಮೆ ಹಂಚಿಕೊಳ್ಳಿ.",
  posterLead: "ನಿಮ್ಮ ಫೋಟೊ ಅಥವಾ ನಿಮ್ಮ ಏರಿಯಾದ ರಾಜ್ಯೋತ್ಸವ ಕಾರ್ಯಕ್ರಮದ ಫೋಟೊ ಸೇರಿಸಿ – ಹಂಚಿಕೊಳ್ಳಲು ನಿಮ್ಮದೇ ಪೋಸ್ಟರ್ ಸಿದ್ಧ.",
  posterPrivacy: "ನಿಮ್ಮ ಫೋಟೊವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದಿಲ್ಲ, ಸಂಗ್ರಹಿಸುವುದೂ ಇಲ್ಲ. ಪೋಸ್ಟರ್ ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ತಯಾರಾಗುತ್ತದೆ.",
  posterStepType: "ಪೋಸ್ಟರ್ ಆಯ್ಕೆಮಾಡಿ",
  posterStepPhoto: "ಫೋಟೊ ಸೇರಿಸಿ",
  posterTakePhoto: "ಫೋಟೊ ತೆಗೆಯಿರಿ",
  posterChoosePhoto: "ಫೋಟೊ ಆಯ್ಕೆಮಾಡಿ",
  posterZoom: "ಫೋಟೊ ಗಾತ್ರ",
  posterHint: "ಫೋಟೊವನ್ನು ಎಳೆದು ಅಥವಾ ಬಾಣದ ಕೀಲಿಗಳಿಂದ ಸರಿಹೊಂದಿಸಿ.",
  posterDownload: "ಡೌನ್‌ಲೋಡ್",
  posterShare: "ಹಂಚಿಕೊಳ್ಳಿ",
  posterReady: "ಪೋಸ್ಟರ್ ಸಿದ್ಧ. ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಹಂಚಿಕೊಳ್ಳಿ.",
  posterLoadError: "ಈ ಫೋಟೊ ತೆರೆಯಲಾಗಲಿಲ್ಲ. ಬೇರೆ ಫೋಟೊ ಪ್ರಯತ್ನಿಸಿ.",
  posterCameraError: "ಕ್ಯಾಮೆರಾ ತೆರೆಯಲಾಗಲಿಲ್ಲ. 'ಫೋಟೊ ಆಯ್ಕೆಮಾಡಿ' ಬಳಸಿ.",
  posterPreviewLabel: "ಪೋಸ್ಟರ್ ಮುನ್ನೋಟ: {quote}",
  posterCta: "ನಿಮ್ಮ ರಾಜ್ಯೋತ್ಸವ ಪೋಸ್ಟರ್ ಮಾಡಿ",
  cameraTitle: "ಫೋಟೊ ತೆಗೆಯಿರಿ",
  cameraShutter: "ಕ್ಲಿಕ್ಕಿಸಿ",
  cameraClose: "ಮುಚ್ಚಿ",

  highlightsTitle: "ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶಗಳು",
  videosTitle: "ವಿಡಿಯೊ",
  videoCredit: "ವಿಡಿಯೊ: {author}",
  galleryTitle: "ಫೋಟೊ ಗ್ಯಾಲರಿ",
  photoCredit: "ಚಿತ್ರ: {author}",
  galleryOpen: "ದೊಡ್ಡದಾಗಿ ನೋಡಿ: {caption}",
  lightboxLabel: "ಫೋಟೊ ಗ್ಯಾಲರಿ",
  lightboxPrev: "ಹಿಂದಿನ ಚಿತ್ರ",
  lightboxNext: "ಮುಂದಿನ ಚಿತ್ರ",
  lightboxClose: "ಮುಚ್ಚಿ",
  sectionsTitle: "ಎಲ್ಲ ವಿಭಾಗಗಳು",
  comingSoon: "ಪುಟ ಶೀಘ್ರದಲ್ಲೇ",

  footerAbout:
    "ಪ್ರಜಾವಾಣಿ – ಕನ್ನಡದ ವಿಶ್ವಾಸಾರ್ಹ ದಿನಪತ್ರಿಕೆ. ರಾಜ್ಯೋತ್ಸವದ ಈ ವಿಶೇಷ ತಾಣ ನಾಡಿನ ಹೆಮ್ಮೆಯ ಕಥನಗಳನ್ನು ಓದುಗರಿಗೆ ತಲುಪಿಸುತ್ತದೆ.",
  footerSectionsTitle: "ವಿಭಾಗಗಳು",
  footerCreditsTitle: "ಚಿತ್ರ ಮತ್ತು ವಿಡಿಯೊ ಕೃಪೆ (ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್)",
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
  "dollu-kunitha": {
    alt: "ಡೊಳ್ಳು ಬಾರಿಸುತ್ತಾ ಕುಣಿಯುತ್ತಿರುವ ಡೊಳ್ಳು ಕುಣಿತದ ಕಲಾವಿದರು",
    credit: { author: "Navaneeth Krishnan S", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Dollu_Kunitha_01.jpg" },
  },
  "kambala-race": {
    alt: "ಕಂಬಳದ ಕೆಸರುಗದ್ದೆಯಲ್ಲಿ ಕೋಣದೊಂದಿಗೆ ಓಡುತ್ತಿರುವ ಓಟಗಾರ",
    credit: { author: "Naveen Kumar Manne", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Kambala_panning.jpg" },
  },
  "dasara-lights": {
    alt: "ದಸರಾ ದೀಪಾಲಂಕಾರದಲ್ಲಿ ಬೆಳಗುತ್ತಿರುವ ಮೈಸೂರು ಅರಮನೆ",
    credit: { author: "Ananth BS", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Dasara_Navaratri_Festival_Lights_Mysore_Palace_India.jpg" },
  },
  murudeshwar: {
    alt: "ಮುರುಡೇಶ್ವರದ ಬೃಹತ್ ಶಿವನ ಪ್ರತಿಮೆ",
    credit: { author: "Prasannabanwat", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Murudeshwar-Shiva-Statue.jpg" },
  },
  virupaksha: {
    alt: "ಹಂಪಿಯ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ ಗೋಪುರದಲ್ಲಿ ಕುದುರೆಯ ಕೆತ್ತನೆ",
    credit: { author: "Ingo Mehling", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Virupaksha_-_Gopuram_-_Carvings_-_1.jpg" },
  },
  "abbey-falls": {
    alt: "ಮಡಿಕೇರಿ ಬಳಿಯ ಅಬ್ಬಿ ಜಲಪಾತ",
    credit: { author: "Shanmugamp7", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Abbey_falls_-_Madikeri.jpg" },
  },
  hoysaleswara: {
    alt: "ಹಳೇಬೀಡಿನ ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ",
    credit: { author: "Rohit Sharma", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Hoysaleswara_Temple_at_Halebidu.jpg" },
  },
  chitradurga: {
    alt: "ಚಿತ್ರದುರ್ಗದ ಕಲ್ಲಿನ ಕೋಟೆ ಮತ್ತು ಬಂಡೆಗಳು",
    credit: { author: "Ramjaiswal75", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Chitradurga_Fort_or_Chitradoorg_from_the_Ancient_times.jpg" },
  },
  "coorg-hills": {
    alt: "ಮಡಿಕೇರಿಯ ರಾಜಾ ಸೀಟ್‌ನಿಂದ ಕಾಣುವ ಬೆಟ್ಟಗಳ ನೋಟ",
    credit: { author: "Sharithab", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:RAJA_SEAT-_MADIKERI.jpg" },
  },
};

/*
 * Articles. Featured carousel: exactly 10 slides. section = an id from SECTIONS.
 * Author names are PLACEHOLDERS. Replace them with the real bylines.
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
    summary: "ಕಡಲೆಹಿಟ್ಟು, ತುಪ್ಪ, ಸಕ್ಕರೆ – ಮೂರೇ ಪದಾರ್ಥಗಳ ಸಿಹಿಯ ಕಥೆ.",
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
 * Video gallery. Each key matches assets/videos/<key>.mp4 and <key>-poster.webp.
 * The first video is shown in the player when the page loads.
 * All are from Wikimedia Commons; the credited author is the person who filmed it.
 */
const VIDEOS = [
  {
    file: "yakshagana",
    section: "culture",
    duration: "1:00",
    title: "ಯಕ್ಷಗಾನ: ರಂಗಸ್ಥಳದಲ್ಲಿ ಚಂಡೆಯ ಅಬ್ಬರ",
    summary: "ಕರಾವಳಿಯ ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನದ ಒಂದು ನೋಟ.",
    credit: { author: "Ninja Agriculturists", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Yakshagana,_Karnataka_%26_Kerala.webm" },
  },
  {
    file: "kambala",
    section: "sports",
    duration: "0:26",
    title: "ಕಂಬಳ: ಕೆಸರುಗದ್ದೆಯ ಓಟದ ರೋಚಕತೆ",
    summary: "ಬೆಂಗಳೂರಿನಲ್ಲಿ ನಡೆದ ಕಂಬಳದಲ್ಲಿ ಕೋಣಗಳ ಓಟ.",
    credit: { author: "Gpkp", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Bangalore_Kambala,_November_2023_(06).ogg" },
  },
  {
    file: "huttari",
    section: "culture",
    duration: "0:54",
    title: "ಕೊಡಗಿನ ಹುತ್ತರಿ ಹಬ್ಬದ ಸಾಂಪ್ರದಾಯಿಕ ನೃತ್ಯ",
    summary: "ಸುಗ್ಗಿಯ ಹಬ್ಬ ಹುತ್ತರಿಯಲ್ಲಿ ಕೊಡವರ ಸಾಮೂಹಿಕ ನೃತ್ಯ.",
    credit: { author: "Krishnaiah S A", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Coorg_Huttari_Dance_Dudikottu.webm" },
  },
  {
    file: "doggaya",
    section: "culture",
    duration: "1:00",
    title: "ಜಾನಪದ ಕುಣಿತ: ಹೊಲದಲ್ಲಿ ಕಲಾವಿದರ ಸಂಭ್ರಮ",
    summary: "ಬಣ್ಣಬಣ್ಣದ ವೇಷದಲ್ಲಿ ಜಾನಪದ ಕಲಾವಿದರ ಪ್ರದರ್ಶನ.",
    credit: { author: "Santhosh Notagar99", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Karnataka_Doggaya_dance.webm" },
  },
  {
    file: "lalbagh",
    section: "travel",
    duration: "0:31",
    title: "ಲಾಲ್‌ಬಾಗ್ ಫಲಪುಷ್ಪ ಪ್ರದರ್ಶನದ ಸೊಬಗು",
    summary: "ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆಯ ಅಂಗವಾಗಿ ನಡೆದ 216ನೇ ಫಲಪುಷ್ಪ ಪ್ರದರ್ಶನ.",
    credit: { author: "Gpkp", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Indian_Independence_day_celebration_216th_flower_show_2024,_Lalbagh,_Bangalore_06.ogg" },
  },
];

/* Photo gallery: keys from IMAGES. Captions and credits come from IMAGES too. The first photo is shown large. */
const GALLERY = [
  "dollu-kunitha",
  "kambala-race",
  "dasara-lights",
  "murudeshwar",
  "virupaksha",
  "abbey-falls",
  "hoysaleswara",
  "chitradurga",
  "coorg-hills",
];

/*
 * Poster maker. Readers pick a poster type, add a photo, and download or share it.
 * personal → their own photo in a round frame; program → a public-event photo in a wide frame.
 * camera: which phone camera "ಫೋಟೊ ತೆಗೆಯಿರಿ" opens ("user" = front, "environment" = back).
 */
const POSTER = {
  types: {
    personal: {
      label: "ನಾನು ಹೆಮ್ಮೆಯ ಕನ್ನಡಿಗ",
      hint: "ನಿಮ್ಮ ಸ್ವಂತ ಫೋಟೊ",
      quote: "ನಾನು ಹೆಮ್ಮೆಯ ಕನ್ನಡಿಗ",
      placeholder: "ನಿಮ್ಮ ಫೋಟೊ",
      nameLabel: "ನಿಮ್ಮ ಹೆಸರು (ಐಚ್ಛಿಕ)",
      nameLine: "– {name}",
      tip: "ಸಲಹೆ: ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ, ನೇರವಾಗಿ ನೋಡುತ್ತಿರುವ ನಿಮ್ಮ ಸ್ಪಷ್ಟ ಫೋಟೊ ಬಳಸಿ.",
      camera: "user",
    },
    program: {
      label: "ನಮ್ಮ ಏರಿಯಾದಲ್ಲಿ ರಾಜ್ಯೋತ್ಸವ",
      hint: "ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮದ ಫೋಟೊ",
      quote: "ನಮ್ಮ ಏರಿಯಾದಲ್ಲಿ ರಾಜ್ಯೋತ್ಸವ",
      placeholder: "ಕಾರ್ಯಕ್ರಮದ ಫೋಟೊ",
      nameLabel: "ಏರಿಯಾ ಅಥವಾ ಊರಿನ ಹೆಸರು (ಐಚ್ಛಿಕ)",
      nameLine: "ಸ್ಥಳ: {name}",
      tip: "ಸಲಹೆ: ಧ್ವಜಾರೋಹಣ, ವೇದಿಕೆ ಅಥವಾ ಜನಸಮೂಹ ಕಾಣುವಂತೆ ಅಡ್ಡವಾಗಿ ತೆಗೆದ ಫೋಟೊ ಉತ್ತಮ.",
      camera: "environment",
    },
  },
  footerTitle: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ",
  footerDate: "ನವೆಂಬರ್ 1, 2026",
  site: "prajavani.net",
  fileName: "prajavani-rajyotsava-poster.jpg",
  shareText: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಶುಭಾಶಯಗಳು! ನಿಮ್ಮದೇ ಪೋಸ್ಟರ್ ಮಾಡಿ: prajavani.net",
};
