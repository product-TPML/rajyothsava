# Prajavani Rajyotsava special site

Open `index.html` in a browser. There's no build step.

- **Change text or content:** `js/data.js`. This covers menus, stories, photos, quotes, the poster maker and the opening animation.
- **Styles:** `css/styles.css`. It's written mobile first, with every colour defined once at the top.

## English edition (Deccan Herald)

`index-en.html` is the same special in English, under the Deccan Herald name. It shares the styles and scripts with the Kannada page; only its content file differs.

- **Change text or content:** `js/data-en.js` (menu, stories, archive, poster maker, opening).
- **Left out** compared with the Kannada page: the quotes banner, the videos, the photo gallery and the section list at the end of the page (the "All sections" tiles and the footer links).
- **Added:** "From the archives", moments in Karnataka's story as DH reported them (`ARCHIVE` in `js/data-en.js`).
- **Menu:** links go to the matching sections on deccanherald.com.
- **Look:** DH's typefaces (Playfair Display for headlines, Roboto Slab for text, as on deccanherald.com) with the same Rajyotsava red and yellow. The page sets `data-brand="dh"` on `<html>`, which switches the fonts in `css/styles.css`.

## Opening animation

A short flight into the screen (about 11 seconds) plays once per visit before the site appears:

1. The camera flies past silhouettes of Kannada personalities, in history order. They alternate red and black, each with one feature highlighted in yellow, and sweep away to the left and right, each facing the way it goes.
2. The Karnataka map, filled with the waving Kannada flag, flies in at the same speed and settles in front.
3. The closing message stays on screen for 3 seconds, with a "ವಿಶೇಷ ಸಂಚಿಕೆ ಓದಿ" button.

Readers can tap anywhere, press **Skip** or the button, or press Esc to jump straight to the site. It never plays for readers who have reduced motion turned on.

- **Names, order and timing:** `OPENING` in `js/data.js`.
- **Silhouette colours:** set in `css/styles.css` (`.opening__figure--red`, `.opening__figure--ink`).
- **Map:** from the Karnataka state boundary on Bhuvan (ISRO/NRSC), simplified. It's inline in `index.html`.

## Quotes

The red banner shows one quote at a time, beside the speaker's silhouette, and moves on every 6 seconds (not with reduced motion, and not while the mouse is over it); readers can also swipe. Edit them in `QUOTES` in `js/data.js`; each names its silhouette with `art`.

## Poster maker

Readers add a photo and write one line about their pride in Kannada and Karnataka ("ನನ್ನ ಹೆಮ್ಮೆ") or their dream for its future ("ನನ್ನ ಕನಸು"). The poster is tall (1080×1920), so it fits a WhatsApp status or Instagram story, and can also be sent in a chat. Sharing opens the phone's share menu (WhatsApp → "My status" or a chat); the reader's optional story and the site link go with it as the message. On computers it downloads instead. The photo never leaves the reader's device.

- **Prompts, suggestions, example posters and the address:** `POSTER` in `js/data.js`.
- **Layout of the poster:** `js/poster.js`.

## Silhouettes

The opening and the quotes share one set of silhouettes. The source images are in `assets/silhouettes`. Each is black on white, with one feature in pure blue (#0000FF), as a square PNG; the facing direction doesn't matter. To add or change one:

1. Save the image there as `<id>.png`.
2. List its id and the way it faces in `FACES` in `tools/silhouette-art.py`.
3. Run `python tools/silhouette-art.py` (needs Python with OpenCV and NumPy). It writes `js/silhouette-art.js`; don't edit that file by hand.
4. Use the id as `art` in `OPENING` or `QUOTES` in `js/data.js`.

## Temporary / to replace before launch

- [ ] **Opening replays on every refresh:** this is for review only. Set `REPLAY_ON_REFRESH` to `false` in the small script in the `<head>` of `index.html`, so readers see it once per visit.
- [ ] **Opening personalities:** Basavanna, Kempegowda, Onake Obavva, Kittur Rani Chennamma, Sir M. Visvesvaraya, Kuvempu and Dr Rajkumar. The list and the AI-made silhouettes need editorial approval.
- [ ] **Quotes:** Kuvempu, Basavanna, Sir M. Visvesvaraya ("Industrialise or perish", in Kannada) and Dr Rajkumar. Check the wording and attribution of each.
- [ ] **Poster address:** `prajavani.net/rajyotsava` is printed on every poster and sent with it. The web team needs to set it up to point to this site, or tell us the real address (`POSTER.address` in `js/data.js`).
- [ ] **Poster wording:** the headings, prompts, suggestions and the example posters' lines and names (made up for illustration) need editorial approval.
- [ ] **Poster sharing:** test "Share → WhatsApp → My status" on a real Android phone and iPhone, including whether the message and link come through.
- [ ] **Closing message:** confirm "71ನೇ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ" is the right count for 2026, and approve the wording.
- [ ] **Karnataka map outline:** needs approval from Prajavani before publishing.
- [ ] **DH logo:** loaded from `https://images.assettype.com/deccanherald/2026-10-08/pxdtubqa/deccan-herald.svg`. The page needs an internet connection to show it; if that link is ever removed, the logo disappears.
- [ ] **DH archive stories:** the six headlines and notes in `ARCHIVE` (`js/data-en.js`) were written for the layout. Replace them with the real archive pages and have the DH library check every date. Each card says "Archive page coming soon" until there is a page to link to.
- [ ] **DH stories and bylines:** the English carousel and highlight stories are translations of the Kannada placeholders, with made-up bylines.
- [ ] **DH poster address:** `deccanherald.com/rajyotsava` is printed on English posters (`POSTER.address` in `js/data-en.js`); the web team needs to set it up.
- [ ] **Karunadotsava mark:** `assets/hero/karunadotsava-pv-720.webp` and `-dh-720.webp` are exported from `assets/Karunadothsava Fin logo PV-DH.ai` without the gold border and gradient plaque; the site's red goes behind them. If the design team updates the .ai, they need re-exporting.
- [ ] **Prajavani logo:** loaded from `https://images.assettype.com/deccanherald/2026-10-08/uf85tvay/PV-White.svg`. Same caveat: needs the internet, and depends on that link staying up.
