# Prajavani Rajyotsava special site

Open `index.html` in a browser. There's no build step.

- **Change text or content:** `js/data.js`. This covers menus, stories, photos, quotes, the poster maker and the opening animation.
- **Styles:** `css/styles.css`. It's written mobile first, with every colour defined once at the top.
- **Menus:** the top menu jumps to the parts of the page (`PAGE_NAV` in `js/data.js`). On phones a bar at the bottom of the screen has the four most used, ಮುಖಪುಟ, ಪೋಸ್ಟರ್, ಸುದ್ದಿ, ವಿಡಿಯೊ, then "ಮೆನು", which opens the full menu with search. The one being read lights up as you scroll.
- **Test with the live collections:** run `python tools/preview-server.py` and open http://localhost:8123/ (or `/index-en.html`). Opened directly, the pages can't read the prajavani.net or deccanherald.com collections (see below), so their story sections show "coming soon". This test server fetches the collections and video list for both pages. It's for testing only and isn't needed on the live site.

## Hosting

- **The live pages are in the CMS.** Paste `index.html` into the prajavani.net CMS page and `index-en.html` into the deccanherald.com one, as they are (the exhibition road test: `exhibition-road.html` into its PV page). Paste again after any change to a page. They link the stylesheet, scripts and images by their full hosted addresses, so they work on the CMS.
- **Cloudflare Pages** serves the scripts and stylesheet: connect this GitHub repository, with no build command and the repository root as the output. It's connected at **https://rajyothsava.pages.dev/**; every push updates it.
- **Images** go in the CMS media gallery: upload the file, then replace its `https://rajyothsava.pages.dev/assets/…` address in the page with the gallery address, and paste the page again. Until then the pages take it from Cloudflare.
- **Fonts** load from the files prajavani.net and deccanherald.com use themselves.
- **Vercel** is for a test copy with live data: import this GitHub repository (no build). `vercel.json` passes the collection and video-list requests on to prajavani.net and deccanherald.com, so both pages work fully at the Vercel address.

## English edition (Deccan Herald)

`index-en.html` is the same special in English, under the Deccan Herald name. It shares the styles and scripts with the Kannada page; only its content file differs.

- **Change text or content:** `js/data-en.js` (menu, stories, archive, poster maker, opening).
- **Left out** compared with the Kannada page: the quotes banner, the videos and the photo stories.
- **Stories:** the carousel and stories section work as on the Kannada page, from DH's **karunadothsava-stories** collection on deccanherald.com.
- **Added:** "From the archives", from DH's **karunadothsava-archives** collection: the first 6 in the desk's order, with "See all" for the rest.
- **Menu:** like the Kannada page, it jumps to the parts of the page (`PAGE_NAV`), with "Archives" in place of videos and photo stories. The phone's bottom bar has Home, Poster, Latest, Archives and Menu.
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

The **karunadotsava-top** collection on prajavani.net feeds two sections: the top carousel shows its first 10 stories in the order the desk sets there, and "ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶಗಳು" further down shows the newest 8 (three full rows on computers; the same 8 on phones), with "See all" for the rest. Change the collection and the site follows. The site reads it each time the page opens. The short line under the carousel and on the story cards is the story's **subheadline**; stories without one show no line (the opening paragraph is never used), so ask the desk to write one for each story they add. This works only once the site is served from www.prajavani.net. If the collection can't be read or is empty, both sections show "ಸುದ್ದಿಗಳು ಶೀಘ್ರದಲ್ಲೇ ಇಲ್ಲಿ ಬರಲಿವೆ." The site never shows sample stories (this goes for every section, on both sites).

The stories, videos, photo stories and facts sections each end with a "see all" button, worded by the desk: "ಇನ್ನಷ್ಟು ಲೇಖನಗಳು", "ಇನ್ನಷ್ಟು ವಿಡಿಯೊಗಳು" or "ಇನ್ನಷ್ಟು ಚಿತ್ರಗಳು" (`seeMore…`). For stories and photo stories it opens the whole collection on the same page (the address becomes `#all/top` or `#all/photo`): newest first, 24 to a page, with numbered page links, for up to 500 stories. It is read only when opened, so the home page stays light; the browser's back button returns to the home page. The lists are `STORY_LISTS` in `js/data.js`. The videos section has two: under the YouTube videos, "ಯೂಟ್ಯೂಬ್‌ನಲ್ಲಿ ಇನ್ನಷ್ಟು ವಿಡಿಯೊಗಳು" to Prajavani's YouTube channel (`seeAllYoutube`); under the reels, "ಇನ್‌ಸ್ಟಾಗ್ರಾಂನಲ್ಲಿ ಇನ್ನಷ್ಟು ರೀಲ್ಸ್" to its Instagram (`seeAllInstagram`). The English page has the same for its stories and archives.

## Polls and contests

Beside the quotes, a panel invites readers to polls and contests on Prajavani's Facebook page (https://www.facebook.com/prajavani.net), with a QR code to scan from a computer and a button for phones. The words and the address are the `contests…` lines in `js/data.js`. If the address changes, change `contestsUrl` and remake the QR code: `python tools/facebook-qr.py <new address>` (needs `pip install segno`).

## Videos

The editorial team keeps the video links on the CMS page **`/pages/karunadothsava-json`**, as JSON: one list of links, exactly as copied from YouTube or Instagram, in any order. `cms/karunadothsava-json.json` is the file to start from. The page does the rest:

- **Normal YouTube videos** go in the big player, with a list beside it. The first one is in the player when the page opens.
- **YouTube Shorts and Instagram Reels** go in their own row, which scrolls sideways.
- **Titles** of YouTube videos and Shorts come from YouTube automatically (the part before any " | ", without hashtags). Instagram shows its own caption.
- Links that aren't YouTube or Instagram are skipped. If the page is empty or can't be read, the videos section shows "ವಿಡಿಯೊಗಳು ಶೀಘ್ರದಲ್ಲೇ ಇಲ್ಲಿ ಬರಲಿವೆ."
- prajavani.net keeps a copy of the page for up to 15 minutes, so a change can take that long to show.

YouTube videos show their cover and load YouTube's player only when tapped. The "ರೀಲ್ಸ್" row is for Instagram Reels: each shows just the video (Instagram's player, trimmed of its header, side bars and comments strip), with a "ಇನ್‌ಸ್ಟಾಗ್ರಾಂನಲ್ಲಿ ನೋಡಿ ↗" link under it. Only one video plays at a time: starting another stops the one before (a reel goes back to its cover). YouTube won't play on a page opened as a file from a computer; it works once the site is on a web address.

## Photo stories

The photo stories section shows the first 5 stories in the **karunadotsava-photo** collection on prajavani.net, one large and four small, each opening the story on prajavani.net. Like the carousel, this works only once the site is served from www.prajavani.net; elsewhere the section shows "coming soon".

## Quotes

One quote runs each day. Each quote in `QUOTES` in `js/data.js` has the `date` it runs (for example `"2026-11-01"`, India time). The red banner shows only the quotes whose day has come. Before the first date it doesn't appear at all. It opens on today's quote, beside the speaker's silhouette; the back arrow (or a swipe) goes to earlier days and the forward arrow comes back. Each quote names its silhouette with `art`; until that silhouette is made, the quote shows without a portrait. The editorial team supplies speakers' photos; they are restyled in ChatGPT into the silhouette style and added as described under Silhouettes.

## Poster maker

Readers add a photo and write one line about their pride in Kannada and Karnataka ("ನನ್ನ ಹೆಮ್ಮೆ"), their dream for its future ("ನನ್ನ ಕನಸು"), or about their community ("ನಮ್ಮ ಸಮುದಾಯ"), each a tab in the maker. The poster is 1080×1350 (4:5), the usual size for a picture shared in a chat or feed. A yellow-and-red border runs round it. On phones the poster stays at the top of the screen while the choices scroll beneath it. Sharing opens the phone's share menu (WhatsApp → "My status" or a chat); the message with it repeats the reader's words (tab and line, name and town) and invites others to make their own, with the link (`shareInvite`). On computers it downloads instead. The photo never leaves the reader's device. The size slider zooms the photo in, or out until all of it fits (landscape photos at full width). A note at the end of the maker says the reader, not the newspaper, is responsible for the poster and how it is used (`posterDisclaimer`).

- **Prompts, suggestions, example posters and the address:** `POSTER` in `js/data.js`.
- **Layout of the poster:** `js/poster.js`.

## Silhouettes

The opening and the quotes share one set of silhouettes. The source images are in `assets/silhouettes`. Each is black on white, with one feature in pure blue (#0000FF), as a square PNG; the facing direction doesn't matter. To add or change one:

1. Save the image there as `<id>.png`.
2. List its id and the way it faces in `FACES` in `tools/silhouette-art.py`.
3. Run `python tools/silhouette-art.py` (needs Python with OpenCV and NumPy). It writes `js/silhouette-art.js`; don't edit that file by hand.
4. Use the id as `art` in `OPENING` or `QUOTES` in `js/data.js`.

## Temporary / to replace before launch

- [ ] **Collections:** work only when each page is served from its newspaper's site (www.prajavani.net, www.deccanherald.com). If they will live elsewhere, the web team must allow it (a CORS header on the collection address).
- [ ] **DH collections:** "karunadothsava-stories" and "karunadothsava-archives" currently return about 37,000 general news stories each (they look automatic, not hand-picked), so the archives section shows ordinary news. The DH desk should make them hand-picked collections with only Karunadothsava stories and archive pages.
- [ ] **Videos:** the CMS page `/pages/karunadothsava-json` holds the test links (picked to try the layout). The editors replace them with the final links.
- [ ] **Quotes:** the desk's 30 are in, running 1–30 November in the sheet's order. Still to do: (1) the same Bendre quote is on 7 and 16 November; the desk sends a replacement for one. (2) Aluru Venkata Rao's photo link ("AryanKurup-AVRoad-Photo2") looks like a road, not him; the desk checks it. (3) Silhouettes: only Kuvempu, Rajkumar and Visvesvaraya are made; the other speakers' quotes show without a portrait until theirs are (see Silhouettes; the `art` ids are in `QUOTES`).
- [ ] **Poster addresses:** `prajavani.net/rajyotsava` (Kannada) and `deccanherald.com/rajyotsava` (English) are printed on every poster and sent with it. The web team sets both up the same way to point to each edition, or tells us the real addresses (`POSTER.address` in `js/data.js` and `js/data-en.js`).
- [ ] **Poster wording:** the headings, prompts, suggestions and the example posters' lines and names (made up for illustration) need editorial approval.
- [ ] **Poster disclaimer:** "ಈ ಸೌಲಭ್ಯ ಪೋಸ್ಟರ್ ತಯಾರಿಸಲು ಮಾತ್ರ…" (`posterDisclaimer`) and the English one need a legal/editorial check.
- [ ] **Polls and contests:** confirm https://www.facebook.com/prajavani.net is the page running them, and approve the card's wording (`contests…` in `js/data.js`).
- [ ] **Story collection:** "karunadotsava-top" has 5 stories; it can feed 10 to the carousel and 20 to the stories section. The line under the carousel and on the cards shows only a story's subheadline, so each story the desk adds needs one.
- [ ] **Photo stories:** "karunadotsava-photo" needs its final picks (the section shows the first 5).
- [ ] **Draft note:** the footer says "ಇದು ಮಾದರಿ ಕರಡು. ಪ್ರಕಟಣೆಗೆ ಮುನ್ನ ಪರಿಶೀಲನೆ ಅಗತ್ಯ." (`footerDraftNote`); remove it at launch.
- [ ] **Images to the CMS media gallery:** the marks, favicons and Facebook QR code are uploaded. Still on Cloudflare: the exhibition road's gate artwork and paywall icons (`assets/Gate.svg`, `assets/paywall/`). Any new or changed image (such as the poster example photos) needs uploading too: put its gallery address in the page in place of the Cloudflare one, and paste the page again.
- [ ] **Poster example photos:** the three example posters on the page have no photo (the Wikimedia photos were removed with their credits). Add three Prajavani-owned photos to `assets/` and set each sample's `photo` in `POSTER.samples` (`js/data.js`, `js/data-en.js`).
- [ ] **Poster sharing:** test "Share → WhatsApp → My status" on a real Android phone and iPhone, including whether the message and link come through.
- [ ] **DH logo:** loaded from `https://images.assettype.com/deccanherald/2026-10-08/pxdtubqa/deccan-herald.svg`. The page needs an internet connection to show it; if that link is ever removed, the logo disappears.
- [ ] **Exhibition (19 November):** the timings aren't announced yet, so the "Add to Google Calendar" entry is all-day. When they are, set `time` in `EVENT` (`js/data.js` and `js/data-en.js`), e.g. `{ label: "10 am to 7 pm", start: "10:00", end: "19:00" }`; the page and the calendar entry both pick it up. Also confirm the venue name ("Rangoli Metro Art Center, MG Road") and the wording.
- [ ] **Karunadotsava mark:** `assets/hero/karunadotsava-pv-720.webp` is exported from `assets/Karunadothsava Fin logo PV-DH.ai` and `-dh-720.webp` from `assets/Karunadothsava Fin logo DH edited 281026.pdf`, without the gold border and gradient plaque; the site's red goes behind them. If the design team updates the artwork, they need re-exporting. **The new DH mark (29 October) needs uploading to the media gallery**; until then `index-en.html` takes it from Cloudflare.
- [ ] **Exhibition road test (`exhibition-road.html`):** a stand-alone phone test of the "ಕರುನಾಡಿನ ಹಾದಿ" walk-through, not linked from the site yet. It uses the site's stylesheet (fonts, colours, masthead and Karunadotsava mark), but the pages are drawn placeholders: five have sample write-ups (`FEATURED`) and 45 are dummy filler (`DUMMY`, made-up topics and dates) to try the road with about 50 entries, all to be replaced with the real list. Its content, scene styles and script sit inside the page rather than in `js/data.js`, `css/styles.css` and `js/main.js`. The ⚙ test option (swipe up or down to move ahead) is for review only. Once the choices are made, move it into the shared files properly and add the English edition.
- [ ] **Exhibition road subscriber wall:** the first 5 pages (`FREE_STOPS`) are open to everyone; going further shows a note for Prajavani subscribers with Subscribe and Log in. It uses the newspaper's own login and subscriptions (`js/subscription.js`, taken from the Dasara site), so the real check runs only when the page is served from www.prajavani.net or a PV test site (dev.prajavani.net, prajavani-sandbox-web / prajavani-training-web.quintype.io, which use the test login and need test accounts); anywhere else, the ⚙ test options choose who you are (logged out, not subscribed, subscriber, check failed). The note copies the design of prajavani.net's own paywall, using its icons (`assets/paywall`, taken from the PV site's code), but in our own words, which the **PV desk should confirm** (`WALL` in `exhibition-road.html`). It is a soft lock: someone using browser tools can get round it. Still to test on the live site: logging in from the wall and coming back to the same page, and a logged-in reader without a subscription. Ask the PV tech team to say if the AccessType key changes.
- [ ] **Prajavani logo:** loaded from `https://images.assettype.com/deccanherald/2026-10-08/uf85tvay/PV-White.svg`. Same caveat: needs the internet, and depends on that link staying up.
