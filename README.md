# Prajavani Rajyotsava special site

Open `index.html` in a browser. There's no build step.

- **Change text or content:** `js/data.js`. This covers menus, stories, photos, the poster maker and the opening animation.
- **Styles:** `css/styles.css`. It's written mobile first, with every colour defined once at the top.

## Opening animation

A short flight into the screen (about 11 seconds) plays once per visit before the site appears:

1. The camera flies past silhouettes of Kannada personalities, which alternate red and black and sweep away to the left and right.
2. The Karnataka map, filled with the waving Kannada flag, flies in at the same speed and settles in front.
3. The closing message stays on screen for 3 seconds, with a "ವಿಶೇಷ ಸಂಚಿಕೆ ಓದಿ" button.

Readers can tap anywhere, press **Skip** or the button, or press Esc to jump straight to the site. It never plays for readers who have reduced motion turned on.

- **Names, order and timing:** `OPENING` in `js/data.js`.
- **Silhouette shapes:** `js/opening-art.js`. This file is generated, so don't edit it by hand. Send new artwork to the developer to convert.
- **Map:** from the Karnataka state boundary on Bhuvan (ISRO/NRSC), simplified. It's inline in `index.html`.

## Temporary / to replace before launch

- [ ] **Opening replays on every refresh:** this is for review only. Set `REPLAY_ON_REFRESH` to `false` in the small script in the `<head>` of `index.html`, so readers see it once per visit.
- [ ] **Opening silhouettes:** the current ones are simple stand-in shapes. They'll be replaced with final artwork for the chosen personalities.
- [ ] **Opening personalities:** the current list is a placeholder (Basavanna, Kittur Rani Chennamma, Kempegowda, Sir M. Visvesvaraya, Kuvempu, Gangubai Hangal, Dr Rajkumar) and needs editorial approval.
- [ ] **Closing message:** confirm "71ನೇ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ" is the right count for 2026, and approve the wording.
- [ ] **Karnataka map outline:** needs approval from Prajavani before publishing.
- [ ] **Prajavani logo:** `assets/logo/pv-logo.png` is low resolution. Get a high-res SVG/PNG from the design team.
