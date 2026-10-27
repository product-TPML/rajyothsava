# CLAUDE.md — Prajavani Rajyotsava Website

Instructions for any AI agent or developer working in this folder.
The full build brief is in `website_build_handover.md`. Read it first; this
file adds the owner's decisions on top of it. If the two disagree, this file wins.

## Who this is for

- **Brand:** Prajavani (ಪ್ರಜಾವಾಣಿ), the Kannada daily newspaper (prajavani.net).
- **Occasion:** Karnataka Rajyotsava (1 November) special website.
- **Owner:** non-technical. Always explain progress, choices and problems in
  plain, everyday language. Avoid jargon, or explain it in one short sentence.
  End each piece of work with a short summary covering what was done, how to see it
  and what the owner needs to decide.

## Core principles (in priority order)

1. **Mobile first.** Most readers come from phones. Design and write CSS for a
   ~360px-wide phone screen first, then add `min-width` media queries for
   tablet (≥768px) and desktop (≥1024px, ≥1280px). Never start from desktop
   and shrink down.
2. **Professional editorial look.** It should read like a quality newspaper, not a
   tabloid or a festival poster. It needs a clear headline hierarchy, disciplined
   grids, generous whitespace and restrained decoration.
3. **Visually attractive.** It should feel rich and celebratory for Rajyotsava, without
   losing dignity. Use strong photography, confident large headlines, elegant
   red/yellow accents (the Kannada flag colours), subtle motion, and careful detail
   in spacing and alignment.

## Brand assets (taken from prajavani.net)

Stored locally in `assets/`, except the two brand logos, which the owner asked to load
from their published links (the same ones the Dasara site uses).

| Asset | File | Notes |
|---|---|---|
| Prajavani logo | `https://images.assettype.com/deccanherald/2026-10-08/uf85tvay/PV-White.svg` | White ಪ್ರಜಾವಾಣಿ wordmark with Nandi and tagline (SVG, 1327×319). Linked, not downloaded (owner's choice). |
| Deccan Herald logo | `https://images.assettype.com/deccanherald/2026-10-08/pxdtubqa/deccan-herald.svg` | White DH letters, Nandi and "DECCAN HERALD", stacked (SVG, 78×68). Used by the English edition. |
| Karunadotsava mark | `assets/hero/karunadotsava-pv-720.webp`, `assets/hero/karunadotsava-dh-720.webp` | The final event logo from `assets/Karunadothsava Fin logo PV-DH.ai` (supplied by the owner; page 1 DH, page 2 PV): Gandaberunda, newspaper logo and title in gold/white, exported from the .ai without its gold border and gradient plaque, on a transparent background (owner's choice), 720px wide. The header sits it on the site's own red (`--red`); the poster gives it a red box. Used in the masthead (as the whole home link), the opening's top bar and the top of the poster. Re-export from the .ai if the artwork changes; never redraw it. There is no separate hero section; the carousel follows the nav bar. |
| Photos and videos | `assets/images/`, `assets/videos/` | Freely licensed Wikimedia Commons media, credited in `js/data.js` and the footer. Videos are compressed MP4 (H.264, ≤854px wide, ≤1 min) with a WebP poster. Keep new videos small; they load only when played. |
| Headline font | `assets/fonts/PvHeadlineSemibold3.woff2` | Prajavani headline face, weight 600. Use for headlines, section titles and the carousel. |
| Body font | `assets/fonts/PrajavaniTextRegular.woff2` | Weight 400. Use for body text, descriptions and menus. |
| Body semibold | `assets/fonts/PrajavaniTextSemibold.woff2` | Weight 600. Use for category labels, buttons and emphasis. |

Font setup (prajavani.net uses the same pattern):

```css
@font-face { font-family: "PvHeadline"; src: url("assets/fonts/PvHeadlineSemibold3.woff2") format("woff2"); font-weight: 600; font-display: swap; }
@font-face { font-family: "PvText"; src: url("assets/fonts/PrajavaniTextRegular.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "PvText"; src: url("assets/fonts/PrajavaniTextSemibold.woff2") format("woff2"); font-weight: 600; font-display: swap; }
--font-headline: "PvHeadline", "Noto Sans Kannada", serif;
--font-text: "PvText", "Noto Sans Kannada", system-ui, sans-serif;
```

- Preload the headline font, because it appears above the fold.
- The linked logos are the white versions, so use them only on dark or red backgrounds
  (footer, poster credit). Never stretch or crop any logo.
- The header and the opening's top bar are site red (`--red`, owner's choice) with the
  Karunadotsava mark placed directly on them; the nav bar below is `--red-dark`.
- These are Prajavani's own assets, used for Prajavani's own site. Don't use
  them for anything else.

## Colours

Define them as CSS custom properties in one place.

- Primary red `#A80F22`, dark red `#79091A`, accent yellow `#F6C744`.
- Backgrounds: white `#FFFFFF` and warm off-white `#FFFAF0` / `#F7F7F5`.
- Text: `#242424`, muted text `#5A5A5A`, hairline borders `#E6E2DA`.
- Yellow is an accent only: thin rules, badges, active indicators, a CTA. Never
  use it for large fills, and never for text on white (the contrast is too low).
- Every text/background pair must meet WCAG AA contrast.

## Language

- The site is **Kannada first**. Placeholder headlines and labels go in Kannada
  wherever possible, with English only where the owner asks for it.
- Kannada script needs more line height than English. Use ~1.6–1.7 for body text
  and ~1.3 for headlines, and never clip tall vowel signs.
- Keep all text in data files so it can be edited or translated in one place.

## Mobile-first layout rules

- Phone: single column, 16px side margins, no sideways scrolling, and tap targets
  at least 44×44px.
- Header on phone: the logo is centred or left-aligned with a menu button. Keep it
  compact (≤64px tall) and make it stick on scroll if that doesn't hide content.
- The 18-section menu opens on phone as a full-screen or slide-in panel, with
  sections in a tidy 2-column list. On desktop, show the key sections in the bar and
  put the rest under "ಇನ್ನಷ್ಟು" (More).
- Featured carousel uses a **stacked-card ("fanned") design**, modelled on the top
  carousel of thehindu.com and chosen by the owner. The current story is a tall
  portrait card in front, and neighbouring stories fan out behind it, smaller and dimmer.
  The headline sits on the card over a dark fade, and the front story's summary shows
  below the stack. It supports swipe, tap-a-side-card, arrows, pausing while hovered or focused (no dots or pause button, by the owner's choice). Only the
  look is borrowed: no code or assets from The Hindu.
- Cards: one column on phone, two on tablet, three or four on desktop.
- Test at 360px, 390px, 768px, 1024px and 1440px widths.

## Exhibition

- `EVENT` in each data file, shown right after the carousel on both pages: the
  physical exhibition of Prajavani and DH pages on Karnataka and Kannada (19 November,
  Rangoli Metro Art Center, MG Road). Owner's request.
- "Add to Google Calendar" is a plain Google Calendar link built in `js/main.js`
  (`calendarUrl`) from `EVENT`; no accounts, scripts or tracking.

## Poster maker

- `js/poster.js` (section `#poster`, after the intro banner), modelled on the
  greeting-card maker on prajavani.net/pages/dasara-special.
- On the page it is a teaser that fits one phone screen (owner's choice): heading,
  three example posters on a deep red panel, one start button and the privacy note.
  The button opens the maker full screen: the poster on a deep red "stage", the
  choices in a white panel, the save buttons fixed at the bottom.
- The reader adds any photo (selfie, group or scene) and writes one short line under
  "ನನ್ನ ಹೆಮ್ಮೆ" (my pride) or "ನನ್ನ ಕನಸು" (my dream for Kannada and Karnataka), with
  tap-to-use suggestions, an optional name and town, and an optional longer story that
  goes with the poster as the share message, not on the image. Set in `POSTER` in `js/data.js`.
- The poster is 1080×1920 (9:16) for WhatsApp status and Instagram stories. The words
  keep clear of the top and bottom strips WhatsApp covers. The Karunadotsava mark is
  large; the Prajavani logo is small, in a dark red "made at prajavani.net/rajyotsava" pill
  (owner's choice: readers write their own words, so the brand is a credit).
- Drawn on a canvas entirely in the browser. **The photo is never
  uploaded.** Keep it that way, and keep the privacy note accurate.
- Colours on the canvas are read from the CSS tokens. Don't hard-code them in JS.

## English edition (Deccan Herald)

- `index-en.html` + `js/data-en.js`: the same site in English for Deccan Herald (DH),
  requested by the owner. It uses the DH Karunadotsava mark and DH logo (see Brand assets)
  in place of Prajavani's, spells the title "Karunadothsava" to match the mark, and DH's typefaces through `data-brand="dh"` on `<html>`.
- Owner's choices: no quotes banner, no videos, no photo gallery, no section list at
  the end of the page; adds "From the archives" (`ARCHIVE`).
- It shares `css/styles.css` and every script with the Kannada page. `js/main.js` runs
  each block only if the page has it. Never fork a script or stylesheet per edition;
  put the differences in the data file or a brand token.

## Tech and structure

- No existing codebase, so use plain **HTML + CSS + vanilla JavaScript** with no
  frameworks and no build step. `index.html` must open directly in a browser.
- Suggested layout:
  ```
  index.html
  css/styles.css
  js/data.js      ← menu sections, carousel slides, cards (edit content here)
  js/main.js      ← menu, carousel, rendering
  assets/logo, assets/fonts, assets/images
  README.md
  ```
- Keep all content in `js/data.js`, never hard-coded across the HTML.
- Follow every functional, accessibility and image-performance requirement in
  `website_build_handover.md` (10 slides, 18 sections, keyboard access,
  reduced motion, lazy loading, no layout shift, no dead links).

## Clean code, no patchwork

The owner explicitly asked for clean code and no patchwork. Treat this as a hard rule.

- **Fix the cause, not the symptom.** When something looks wrong, find out why and
  fix it at the source. Don't stack overrides, `!important`, magic pixel nudges,
  one-off classes or "special case" hacks on top.
- **One way of doing each thing.** Use one colour system (CSS variables), one spacing
  scale, one breakpoint set and one card component reused everywhere. Don't
  duplicate a style or function with small variations. Extend the shared one instead.
- **When a change touches existing code, rework it properly.** If a new requirement
  doesn't fit the current structure, restructure it cleanly rather than bolting
  on an exception.
- **Leave nothing behind.** Remove dead code, unused CSS, commented-out blocks,
  debugging logs and old versions of files. Don't create `styles-new.css`,
  `main-fix.js`, `backup` copies and the like.
- **Readable and consistent.** Use clear names, consistent formatting and small
  focused functions, with short comments only where the "why" isn't obvious.
  CSS is ordered mobile first: base styles, then `min-width` queries.
- **No unnecessary dependencies** or copy-pasted library code.
- After each round of changes, re-read the touched files and tidy them before
  telling the owner the work is done.

## Working with the owner

- Don't overwrite existing files without checking with the owner first.
- Mark placeholder content clearly, and keep a running list of what is temporary
  in the README.
- Before saying something is finished, open the page and check it at phone and
  desktop sizes. Then tell the owner in plain words what was tested and what
  wasn't.
