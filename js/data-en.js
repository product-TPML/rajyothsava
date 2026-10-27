/*
 * All content for the English edition (Deccan Herald, index-en.html) lives here.
 * It mirrors js/data.js, without the quotes, videos and photo gallery, and adds
 * ARCHIVE. Edit this file to change text, menu sections, stories, the poster maker
 * or the opening animation. No other file needs to change.
 */

/* Interface text. Elements in index-en.html with data-text="key" receive these. */
const UI = {
  skipLink: "Skip to main content",
  eventTitle: "Karunadotsava",
  headerAction: "DH home",
  searchLabel: "Search stories",
  searchPlaceholder: "Story, section or writer",
  searchResults: "Results: {n}",
  searchNoResults: "No results found",
  byline: "By {author}",
  headerActionUrl: "https://www.deccanherald.com/",
  navLabel: "Main sections",
  menuButton: "More",
  menuTitle: "All sections",
  menuClose: "Close",

  featuredTitle: "Top stories",
  carouselPrev: "Previous story",
  carouselNext: "Next story",
  slideOf: "{n} / {total}",

  posterEyebrow: "Your Rajyotsava poster",
  posterTitle: "Your pride, your dream",
  posterLead: "Add your photo and write what makes you proud of Kannada and Karnataka, or your dream for its future. Your poster is ready for WhatsApp status.",
  posterStart: "Make a poster",
  posterPrivacy: "Your photo is never uploaded or stored. The poster is made on your device.",
  posterPhoto: "Photo",
  posterTakePhoto: "Camera",
  posterChoosePhoto: "Gallery",
  posterZoom: "Photo size",
  posterPrompt: "What about?",
  posterLine: "Your words",
  posterCount: "{n}/{max}",
  posterSuggestions: "Suggestions",
  posterName: "Name, town (optional)",
  posterNamePlaceholder: "e.g. Suma, Mandya",
  posterStory: "Add a story (optional)",
  posterStoryHint: "This goes with the poster as a message when you share it.",
  posterHint: "Drag the photo to adjust it.",
  posterDownload: "Download",
  posterShare: "Share",
  posterReady: "Your poster is ready. Share or download it.",
  posterLoadError: "This photo couldn't be opened. Try another one.",
  posterCameraError: "The camera couldn't be opened. Use 'Gallery' instead.",
  posterPreviewLabel: "Poster preview: {heading}, {line}",
  posterClose: "Close the poster maker",
  posterCta: "Make your Rajyotsava poster",
  cameraTitle: "Take a photo",
  cameraShutter: "Take photo",
  cameraClose: "Close",

  highlightsTitle: "Latest highlights",

  archiveTitle: "From the archives",
  archiveLead:
    "Deccan Herald has reported on Karnataka since 1948. Revisit the moments that shaped the state, " +
    "as our pages recorded them at the time.",
  archiveComingSoon: "Archive page coming soon",

  footerAbout:
    "Deccan Herald – Karnataka's trusted English daily. This Rajyotsava special brings readers " +
    "stories of the state's pride, people and heritage.",
  footerCreditsTitle: "Photo credits (Wikimedia Commons)",
  footerCopyright: "© 2026 Deccan Herald",
  footerDraftNote: "This is a draft – it needs review before publishing.",
};

/*
 * Menu sections, in menu order. Each links to its section on deccanherald.com.
 * primary: true → shown in the desktop menu bar; the rest sit under "More".
 */
const SECTIONS = [
  { id: "home", name: "Home", primary: true, href: "#top" },
  { id: "karnataka", name: "Karnataka", primary: true, href: "https://www.deccanherald.com/india/karnataka" },
  { id: "bengaluru", name: "Bengaluru", primary: true, href: "https://www.deccanherald.com/top-bengaluru-news" },
  { id: "india", name: "India", primary: true, href: "https://www.deccanherald.com/india" },
  { id: "world", name: "World", primary: true, href: "https://www.deccanherald.com/world" },
  { id: "business", name: "Business", primary: true, href: "https://www.deccanherald.com/top-business-news" },
  { id: "opinion", name: "Opinion", primary: true, href: "https://www.deccanherald.com/opinion" },
  { id: "sports", name: "Sports", primary: true, href: "https://www.deccanherald.com/top-sports-news" },
  { id: "entertainment", name: "Entertainment", href: "https://www.deccanherald.com/entertainment" },
  { id: "technology", name: "Technology", href: "https://www.deccanherald.com/technology" },
  { id: "education", name: "Education", href: "https://www.deccanherald.com/education" },
  { id: "health", name: "Health", href: "https://www.deccanherald.com/health" },
  { id: "specials", name: "DH Specials", href: "https://www.deccanherald.com/dh-specials" },
];

/*
 * Photos. Each key matches files in assets/images: <key>-640.webp and <key>-1280.webp.
 * All are from Wikimedia Commons under the licence shown. Credit is required.
 */
const IMAGES = {
  hampi: {
    alt: "The stone chariot in the Vittala temple complex, Hampi",
    credit: { author: "Ram Nagesh Thota", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Iconic_Stone_Chariot_@_Vittala_Temple,_Hampi,_Karnataka.jpg" },
  },
  "mysuru-palace": {
    alt: "Mysuru Palace lit up at night",
    credit: { author: "Ingo Mehling", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Mysuru_Palace_-_Night_View.jpg" },
  },
  dasara: {
    alt: "Dasara elephants walking in a line past KR Circle, Mysuru",
    credit: { author: "Basavaraj M", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:KR_Circle_Mysore_1510.jpg" },
  },
  "jog-falls": {
    alt: "Jog Falls plunging into a green valley",
    credit: { author: "SajjadF", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Jog_Falls_2013.JPG" },
  },
  yakshagana: {
    alt: "Yakshagana artists putting on face paint in the green room",
    credit: { author: "Pablo Studio", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Yakshagana_Artist.jpg" },
  },
  "gol-gumbaz": {
    alt: "Gol Gumbaz in Vijayapura and the garden in front of it",
    credit: { author: "Rangan Datta Wiki", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Gol_Gumbaz,_Bijapur_1.jpg" },
  },
  belur: {
    alt: "The carved front of the Chennakeshava temple, Belur",
    credit: { author: "Dineshkannambadi", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Chennakeshava_Temple_at_Belur.jpg" },
  },
  kudremukh: {
    alt: "Green grassland ridges of Kudremukh",
    credit: { author: "Dhruvaraj S", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Kudremukh_1.jpg" },
  },
  udupi: {
    alt: "The colourful gateway of the Sri Krishna Matha, Udupi",
    credit: { author: "Ashok Prabhakaran", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:Udupi_Sri_Krishna_Matha_Temple.jpg" },
  },
  "vidhana-soudha": {
    alt: "The east gate of the Vidhana Soudha, Bengaluru",
    credit: { author: "Moheen Reeyad", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Gate_3_(East),_Vidhana_Soudha_(01).jpg" },
  },
  badami: {
    alt: "A cave temple carved into the red sandstone cliffs of Badami",
    credit: { author: "Rajeshodayanchal", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:A-cave-temple-at-badami.JPG" },
  },
  pattadakal: {
    alt: "Ancient temples on the green grounds of Pattadakal",
    credit: { author: "Vinayaraj", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Pattadakal_temple_complex_-_hamvrvb102k22_(30).jpg" },
  },
  "mysore-pak": {
    alt: "Mysore pak served on a banana leaf",
    credit: { author: "Charles Haynes", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:Mysore_pak.jpg" },
  },
  bandipur: {
    alt: "A tusker in the forest at Bandipur",
    credit: { author: "Yathin S Krishnappa", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Elephas_maximus_(Bandipur).jpg" },
  },
  gokarna: {
    alt: "Visitors playing on the shore of Om Beach, Gokarna",
    credit: { author: "Sourabh.biswas003", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:PXL_20260103_101009613_People_and_Beach_Om_Beach_Gokarna,_Karnataka_20.jpg" },
  },
  channapatna: {
    alt: "Craftsmen making wooden toys in a Channapatna workshop",
    credit: { author: "KartikMistry", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Channapatna_toys_artists.jpg" },
  },
  "kodagu-coffee": {
    alt: "Buds opening on a coffee branch in Kodagu",
    credit: { author: "Timothy A. Gonsalves", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Flower_Buds_Coffee_Robusta_Coorg_Feb24_D72_25939.jpg" },
  },
  shravanabelagola: {
    alt: "The monolithic statue of Gommateshwara at Shravanabelagola",
    credit: { author: "Venkygrams", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Shravanabelagola_-_Gommateshwara_Statue_1.jpg" },
  },
  "dollu-kunitha": {
    alt: "Dollu Kunitha artists dancing as they drum",
    credit: { author: "Navaneeth Krishnan S", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Dollu_Kunitha_01.jpg" },
  },
  "dasara-lights": {
    alt: "Mysuru Palace glowing in the Dasara lights",
    credit: { author: "Ananth BS", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Dasara_Navaratri_Festival_Lights_Mysore_Palace_India.jpg" },
  },
};

/*
 * Articles. Featured carousel: exactly 10 slides. section = an id from SECTIONS.
 * Author names are PLACEHOLDERS. Replace them with the real bylines.
 */
const SLIDES = [
  {
    image: "hampi",
    author: "S Ramesh",
    section: "karnataka",
    title: "Hampi: the glory of Vijayanagara, carved in stone",
    summary: "The stone chariot at the Vittala temple still stands as a witness to the empire's artistic wealth.",
  },
  {
    image: "mysuru-palace",
    author: "K N Suma",
    section: "karnataka",
    title: "Mysuru Palace, shimmering in a hundred thousand lights",
    summary: "The palace by night, lit by thousands of bulbs, crowns the festive season of the state.",
  },
  {
    image: "dasara",
    author: "Manjunath Hegde",
    section: "karnataka",
    title: "Dasara elephants rehearse on the streets of Mysuru",
    summary: "For the city, the elephants' practice walks before the Jamboo Savari are the festival's prelude.",
  },
  {
    image: "jog-falls",
    author: "Prakash Shetty",
    section: "specials",
    title: "Jog Falls in full flow after the monsoon",
    summary: "The Sharavathi's Raja, Rani, Roarer and Rocket cascades plunge through the green of the Malnad.",
  },
  {
    image: "yakshagana",
    author: "Ganesh Bhat",
    section: "entertainment",
    title: "Yakshagana: from the green room to the stage",
    summary: "The care artists take over their make-up in the chowki is the lifeblood of this coastal art.",
  },
  {
    image: "gol-gumbaz",
    author: "Anita Patil",
    section: "specials",
    title: "Gol Gumbaz: the dome where a whisper echoes",
    summary: "In the gallery of Vijayapura's great monument, a word spoken once comes back many times.",
  },
  {
    image: "belur",
    author: "R Srinivas",
    section: "karnataka",
    title: "Belur: a marvel of Hoysala sculpture",
    summary: "The fine carvings of the Chennakeshava temple mirror the skill of its sculptors.",
  },
  {
    image: "kudremukh",
    author: "Deepa Gowda",
    section: "specials",
    title: "Kudremukh: green waves of the Western Ghats",
    summary: "These shola forests and grasslands are the cradle of the state's rivers.",
  },
  {
    image: "udupi",
    author: "Vinay Kamath",
    section: "karnataka",
    title: "Udupi: the heart of coastal tradition",
    summary: "The Sri Krishna Matha and its Car Street bring tradition and celebration together.",
  },
  {
    image: "vidhana-soudha",
    author: "DH News Service",
    section: "bengaluru",
    title: "Vidhana Soudha: the seat of the state's government",
    summary: "Bengaluru's grand legislature building is a symbol of Karnataka's democracy.",
  },
];

/* "Latest highlights" cards. The first card is shown larger as the lead story. */
const HIGHLIGHTS = [
  {
    image: "badami",
    author: "Santosh Kulkarni",
    section: "karnataka",
    title: "The cave temples of Badami: poetry in red stone",
    summary: "The Chalukya-era cave temples open into a world of art carved straight from the rock.",
  },
  {
    image: "pattadakal",
    author: "Anita Patil",
    section: "specials",
    title: "Pattadakal: where two styles meet",
    summary: "Dravida and Nagara temples stand side by side in one complex.",
  },
  {
    image: "mysore-pak",
    author: "K N Suma",
    section: "specials",
    title: "Mysore pak: from the palace kitchen to every home",
    summary: "Gram flour, ghee and sugar – the story of a sweet with just three ingredients.",
  },
  {
    image: "bandipur",
    author: "Deepa Gowda",
    section: "karnataka",
    title: "Bandipur: home of the wild elephant",
    summary: "Part of the Nilgiri Biosphere, this forest is a model for wildlife conservation.",
  },
  {
    image: "gokarna",
    author: "Prakash Shetty",
    section: "specials",
    title: "An evening on the beaches of Gokarna",
    summary: "Visitors at play among the waves of Om Beach.",
  },
  {
    image: "channapatna",
    author: "Manjunath Hegde",
    section: "business",
    title: "Channapatna toys: colours that bloom in wood",
    summary: "A craft handed down for generations looks for new markets.",
  },
  {
    image: "kodagu-coffee",
    author: "Kaveri Poovaiah",
    section: "business",
    title: "Blossom time in the coffee estates of Kodagu",
    summary: "Rain and flowering decide the year's sums for the growers.",
  },
  {
    image: "shravanabelagola",
    author: "R Srinivas",
    section: "karnataka",
    title: "Shravanabelagola: the calm gaze of Gommata",
    summary: "The monolith atop Vindhyagiri is a symbol of renunciation and peace.",
  },
];

/*
 * "From the archives": moments in Karnataka's story that Deccan Herald reported,
 * in date order. year is shown large; date is the dateline.
 * PLACEHOLDER: the headlines and notes are written for the layout. Replace them
 * with the real archive pages and check every date with the DH library.
 */
const ARCHIVE = [
  {
    year: "1956",
    date: "1 November 1956",
    title: "A united Mysore State is born",
    summary: "Kannada-speaking districts of Bombay, Hyderabad and Madras, and the state of Coorg, joined old Mysore to form one state.",
  },
  {
    year: "1967",
    date: "1967",
    title: "Kuvempu wins the Jnanpith",
    summary: "Sri Ramayana Darshanam made Kuvempu the first Kannada writer to receive the country's highest literary honour.",
  },
  {
    year: "1973",
    date: "1 November 1973",
    title: "Mysore becomes Karnataka",
    summary: "On Rajyotsava day the state took the name Karnataka, under Chief Minister D Devaraj Urs.",
  },
  {
    year: "1982",
    date: "April 1982",
    title: "Dr Rajkumar joins the Gokak agitation",
    summary: "The matinee idol's entry turned the demand for Kannada's primacy in schools into a statewide movement.",
  },
  {
    year: "2008",
    date: "31 October 2008",
    title: "Kannada declared a classical language",
    summary: "On the eve of Rajyotsava, the Centre granted Kannada classical status, recognising its long literary history.",
  },
  {
    year: "2014",
    date: "1 November 2014",
    title: "Bangalore becomes Bengaluru",
    summary: "The capital and eleven other cities took back their Kannada names on Rajyotsava day.",
  },
];

/*
 * Poster maker. Readers add a photo and write, in a line, what makes them proud of
 * Kannada and Karnataka, or what they dream for its future. The poster is tall (9:16)
 * so it fits a WhatsApp status; an optional longer story goes with it as the message
 * when shared.
 * prompts  → the two choices; example is shown faintly until the reader writes,
 *            suggestions are tap-to-use starting points.
 * samples  → the example posters on the page, with photos from IMAGES.
 *            PLACEHOLDER: the lines and names are made up for illustration.
 * camera   → which phone camera "Camera" opens ("user" = front, "environment" = back).
 * logo     → the brand logo in the poster's "made at" credit.
 * address  → printed on the poster and sent with it. PLACEHOLDER until the web team sets it up.
 */
const POSTER = {
  prompts: {
    pride: {
      label: "My pride",
      hint: "What about Kannada and Karnataka makes you proud?",
      example: "The muddy sprint of our village Kambala",
      suggestions: ["My hometown", "Our Kannada language", "Our festivals", "Our food", "Our art and music", "My family"],
    },
    dream: {
      label: "My dream",
      hint: "What do you wish for the future of Kannada and Karnataka?",
      example: "Every child grows up reading Kannada",
      suggestions: ["Kannada schools thrive", "A green Bengaluru again", "Jobs close to home", "Lakes full once more", "Kannada leads in technology"],
    },
  },
  samples: [
    { prompt: "dream", image: "kudremukh", line: "May the Western Ghats stay green forever", name: "Anita, Chikkamagaluru" },
    { prompt: "pride", image: "dollu-kunitha", line: "My village dances to the dollu's beat", name: "Ramesh, Shivamogga" },
    { prompt: "pride", image: "dasara-lights", line: "Mysuru glowing in the Dasara lights", name: "Suma, Mysuru" },
  ],
  lineMax: 60,
  storyMax: 300,
  camera: "user",
  placeholder: "Your photo",
  eventLine: "Rajyotsava · 1 November 2026",
  logo: "https://images.assettype.com/deccanherald/2026-10-08/pxdtubqa/deccan-herald.svg",
  credit: "Made at {address}",
  address: "deccanherald.com/rajyotsava",
  fileName: "dh-rajyotsava-poster.jpg",
  // Sent with the poster when shared: the reader's story (if any), then the link.
  shareText: "{story}Make yours: https://{address}",
};

/*
 * Opening animation, played once per visit before the site appears.
 * figures → flown past in this order (history order), alternating red and black.
 *           art names a silhouette in js/silhouette-art.js.
 * finale  → the closing screen with the map and flag.
 * timing  → milliseconds; see OPENING in js/data.js.
 */
const OPENING = {
  label: "Karnataka Rajyotsava – opening",
  skip: "Skip",
  skipLabel: "Skip the opening and go to the site",
  finale: {
    eyebrow: "71st Karnataka Rajyotsava · 1 November 2026",
    title: "Karunadotsava",
    text: "Happy Rajyotsava. Celebrate the land, language and culture of Karnataka with Deccan Herald",
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
  timing: { figureMs: 600, finaleMs: 2600, holdMs: 3000, exitMs: 700 },
};
