# Prajavani Rajyotsava special site

Open `index.html` in a browser. There's no build step.

- **Change text or content:** `js/data.js`. This covers menus, stories, photos, quotes, the poster maker and the opening animation.
- **Styles:** `css/styles.css`. It's written mobile first, with every colour defined once at the top.

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
- [ ] **Closing message:** confirm "71ನೇ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ" is the right count for 2026, and approve the wording.
- [ ] **Karnataka map outline:** needs approval from Prajavani before publishing.
- [ ] **Prajavani logo:** `assets/logo/pv-logo.png` is low resolution. Get a high-res SVG/PNG from the design team.
