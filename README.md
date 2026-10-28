# Prajavani Rajyotsava special site

Open `index.html` in a browser. There's no build step.

- **Change text or content:** `js/data.js`. This covers menus, stories, photos, quotes, the poster maker and the opening animation.
- **Styles:** `css/styles.css`. It's written mobile first, with every colour defined once at the top.
- **Test with the live collections:** run `python tools/preview-server.py` and open http://localhost:8123/. Opened directly, the page can't read the prajavani.net collections (see below), so the carousel shows its sample stories and the photo stories are left out. This test server fetches the collections for the page. It's for testing only and isn't needed on the live site.

## English edition (Deccan Herald)

`index-en.html` is the same special in English, under the Deccan Herald name. It shares the styles and scripts with the Kannada page; only its content file differs.

- **Change text or content:** `js/data-en.js` (menu, stories, archive, poster maker, opening).
- **Left out** compared with the Kannada page: the quotes banner, the videos and the photo stories.
- **Added:** "From the archives", moments in Karnataka's story as DH reported them (`ARCHIVE` in `js/data-en.js`).
- **Menu:** like the Kannada page, it jumps to the parts of the page (`PAGE_NAV`), with "Archives" in place of videos and photo stories.
- **Look:** DH's typefaces (Playfair Display for headlines, Roboto Slab for text, as on deccanherald.com) with the same Rajyotsava red and yellow. The page sets `data-brand="dh"` on `<html>`, which switches the fonts in `css/styles.css`.

## Opening animation

A short flight into the screen (about 11 seconds) plays once a day (India time) before the site appears, on the home page only: a shared "See all" link (`#all/…`) opens straight on its list. Readers can play it again from "ಆರಂಭದ ದೃಶ್ಯ ಮತ್ತೆ ನೋಡಿ" in the footer (it opens the page with `?intro`). What plays:

1. The camera flies past silhouettes of Kannada personalities, in history order. They alternate red and black, each with one feature highlighted in yellow, and sweep away to the left and right, each facing the way it goes.
2. The Karnataka map, filled with the waving Kannada flag, flies in at the same speed and settles in front.
3. The closing message stays on screen for 3 seconds, with a "ವಿಶೇಷ ಸಂಚಿಕೆ ಓದಿ" button.

Readers can tap anywhere, press **Skip** or the button, or press Esc to jump straight to the site. It never plays for readers who have reduced motion turned on.

- **Names, order and timing:** `OPENING` in `js/data.js`.
- **Silhouette colours:** set in `css/styles.css` (`.opening__figure--red`, `.opening__figure--ink`).
- **Map:** from the Karnataka state boundary on Bhuvan (ISRO/NRSC), simplified. It's inline in `index.html`.

## Carousel

The **karunadotsava-top** collection on prajavani.net feeds two sections: the top carousel shows its first 10 stories in the order the desk sets there, and "ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶಗಳು" further down shows its first 20, newest first by publish time. Change the collection and the site follows. The site reads it each time the page opens. The short line under the carousel and on the story cards is the story's **subheadline**; stories without one show no line (the opening paragraph is never used), so ask the desk to write one for each story they add. This works only once the site is served from www.prajavani.net; opened from a computer or another address, they show the stories in `SLIDES` and `HIGHLIGHTS` in `js/data.js` instead.

The stories, videos and photo stories sections each end with a "ಎಲ್ಲವನ್ನೂ ನೋಡಿ" (See all) button. For stories and photo stories it opens the whole collection on the same page (the address becomes `#all/top` or `#all/photo`): newest first, 24 to a page, with numbered page links, for up to 500 stories. It is read only when opened, so the home page stays light; the browser's back button returns to the home page. The lists are `STORY_LISTS` in `js/data.js`. The videos button goes to Prajavani's YouTube channel (`seeAllVideos`). The English page always uses its own `SLIDES`.

## Videos

Paste the links in `js/data.js`, exactly as copied from YouTube or Instagram:

- **`VIDEOS`:** wide YouTube videos, shown in the big player with a list beside it. Each also needs a title, a short summary and a section.
- **`SHORTS`:** upright videos (YouTube Shorts and Instagram Reels) in their own row, which scrolls sideways. Each needs a title.

YouTube videos show their cover and load YouTube's player only when tapped. Instagram gives no cover, so Reels appear in Instagram's own white frame. YouTube won't play on a page opened as a file from a computer; it works once the site is on a web address.

## Photo stories

The photo stories section shows the first 5 stories in the **karunadotsava-photo** collection on prajavani.net, one large and four small, each opening the story on prajavani.net. Like the carousel, this works only once the site is served from www.prajavani.net; elsewhere the section is left out.

## Quotes

One quote runs each day. Each quote in `QUOTES` in `js/data.js` has the `date` it runs (for example `"2026-11-01"`, India time). The red banner shows only the quotes whose day has come. Before the first date it doesn't appear at all. It opens on today's quote, beside the speaker's silhouette; the back arrow (or a swipe) goes to earlier days and the forward arrow comes back. Each quote names its silhouette with `art`. The editorial team supplies speakers' photos; they are restyled in ChatGPT into the silhouette style and added as described under Silhouettes.

## Poster maker

Readers add a photo and write one line about their pride in Kannada and Karnataka ("ನನ್ನ ಹೆಮ್ಮೆ"), their dream for its future ("ನನ್ನ ಕನಸು"), or about their community ("ನನ್ನ ಸಮುದಾಯ"), each a tab in the maker. The poster is tall (1080×1920), so it fits a WhatsApp status or Instagram story, and can also be sent in a chat. Sharing opens the phone's share menu (WhatsApp → "My status" or a chat); the reader's optional story and the site link go with it as the message. On computers it downloads instead. The photo never leaves the reader's device. The size slider zooms the photo in, or out until all of it fits (landscape photos at full width). A note at the end of the maker says the reader, not the newspaper, is responsible for the poster and how it is used (`posterDisclaimer`).

- **Prompts, suggestions, example posters and the address:** `POSTER` in `js/data.js`.
- **Layout of the poster:** `js/poster.js`.

## Silhouettes

The opening and the quotes share one set of silhouettes. The source images are in `assets/silhouettes`. Each is black on white, with one feature in pure blue (#0000FF), as a square PNG; the facing direction doesn't matter. To add or change one:

1. Save the image there as `<id>.png`.
2. List its id and the way it faces in `FACES` in `tools/silhouette-art.py`.
3. Run `python tools/silhouette-art.py` (needs Python with OpenCV and NumPy). It writes `js/silhouette-art.js`; don't edit that file by hand.
4. Use the id as `art` in `OPENING` or `QUOTES` in `js/data.js`.

## Temporary / to replace before launch

- [ ] **Opening personalities:** Basavanna, Kempegowda, Onake Obavva, Kittur Rani Chennamma, Sir M. Visvesvaraya, Kuvempu and Dr Rajkumar. The list and the AI-made silhouettes need editorial approval.
- [ ] **Collections (carousel and photo stories):** work only when the site is served from www.prajavani.net. If it will live elsewhere, the web team must allow it (a CORS header on the collection address).
- [ ] **Videos:** the YouTube videos, Shorts and the Instagram Reel in `js/data.js` were picked to try the layout. Replace them with the final links.
- [ ] **Quotes:** the four in the file (1–4 November) are placeholders. The editorial team will send all 30, one per day; each needs its date and a silhouette.
- [ ] **Poster address:** `prajavani.net/rajyotsava` is printed on every poster and sent with it. The web team needs to set it up to point to this site, or tell us the real address (`POSTER.address` in `js/data.js`).
- [ ] **Poster wording:** the headings, prompts, suggestions and the example posters' lines and names (made up for illustration) need editorial approval.
- [ ] **Poster sharing:** test "Share → WhatsApp → My status" on a real Android phone and iPhone, including whether the message and link come through.
- [ ] **Closing message:** confirm "71ನೇ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ" is the right count for 2026, and approve the wording.
- [ ] **Karnataka map outline:** needs approval from Prajavani before publishing.
- [ ] **DH logo:** loaded from `https://images.assettype.com/deccanherald/2026-10-08/pxdtubqa/deccan-herald.svg`. The page needs an internet connection to show it; if that link is ever removed, the logo disappears.
- [ ] **DH archive stories:** the six headlines and notes in `ARCHIVE` (`js/data-en.js`) were written for the layout. Replace them with the real archive pages and have the DH library check every date. Each card says "Archive page coming soon" until there is a page to link to.
- [ ] **DH stories and bylines:** the English carousel and highlight stories are translations of the Kannada placeholders, with made-up bylines.
- [ ] **DH poster address:** `deccanherald.com/rajyotsava` is printed on English posters (`POSTER.address` in `js/data-en.js`); the web team needs to set it up.
- [ ] **Exhibition (19 November):** the timings aren't announced yet, so the "Add to Google Calendar" entry is all-day. When they are, set `time` in `EVENT` (`js/data.js` and `js/data-en.js`), e.g. `{ label: "10 am to 7 pm", start: "10:00", end: "19:00" }`; the page and the calendar entry both pick it up. Also confirm the venue name ("Rangoli Metro Art Center, MG Road") and the wording.
- [ ] **Karunadotsava mark:** `assets/hero/karunadotsava-pv-720.webp` and `-dh-720.webp` are exported from `assets/Karunadothsava Fin logo PV-DH.ai` without the gold border and gradient plaque; the site's red goes behind them. If the design team updates the .ai, they need re-exporting.
- [ ] **Exhibition road test (`exhibition-road.html`):** a stand-alone phone test of the "ಕರುನಾಡಿನ ಹಾದಿ" walk-through, not linked from the site yet. It uses the site's stylesheet (fonts, colours, masthead and Karunadotsava mark), but the pages are drawn placeholders: five have sample write-ups (`FEATURED`) and 45 are dummy filler (`DUMMY`, made-up topics and dates) to try the road with about 50 entries, all to be replaced with the real list. Its content, scene styles and script sit inside the page rather than in `js/data.js`, `css/styles.css` and `js/main.js`. The ⚙ test option (swipe up or down to move ahead) is for review only. Once the choices are made, move it into the shared files properly and add the English edition.
- [ ] **Prajavani logo:** loaded from `https://images.assettype.com/deccanherald/2026-10-08/uf85tvay/PV-White.svg`. Same caveat: needs the internet, and depends on that link staying up.
