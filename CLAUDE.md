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

Stored locally in `assets/`. Use these local copies and don't link to the live site.

| Asset | File | Notes |
|---|---|---|
| Logo (wordmark) | `assets/logo/pv-logo.png` | Black ಪ್ರಜಾವಾಣಿ wordmark with Nandi on white, trimmed to 248×63 px. **Low resolution.** Ask the owner for a high-res SVG/PNG from the Prajavani design team before launch. |
| Karunadotsava artwork | `assets/hero/karunadotsava-art-160.webp` | The central red "ಕ" artwork cut from Prajavani's campaign poster (`assets/hero/karunadotsava-poster.jpeg`, supplied by the owner). Only the artwork is used, not the poster text. Shown small in the masthead, after the Prajavani logo, with the title "ಕರುನಾಡೋತ್ಸವ". There is no separate hero section; the carousel follows the nav bar. |
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
- The logo is black on white, so place it on a white or off-white header. Never
  recolour, stretch or crop the wordmark. If a dark/red background is needed, ask
  for a white version of the logo rather than inverting it.
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
  below the stack. It supports swipe, tap-a-side-card, arrows, dots and pause. Only the
  look is borrowed: no code or assets from The Hindu.
- Cards: one column on phone, two on tablet, three or four on desktop.
- Test at 360px, 390px, 768px, 1024px and 1440px widths.

## Poster maker

- `js/poster.js` (section `#poster`, after the intro banner), modelled on the
  greeting-card maker on prajavani.net/pages/dasara-special.
- Two types, set in `POSTER` in `js/data.js`:
  - "ನಾನು ಹೆಮ್ಮೆಯ ಕನ್ನಡಿಗ" for a personal photo in a round frame.
  - "ನಮ್ಮ ಏರಿಯಾದಲ್ಲಿ ರಾಜ್ಯೋತ್ಸವ" for a public-programme photo in a wide frame.
- Drawn on a 1080×1350 canvas entirely in the browser. **The photo is never
  uploaded.** Keep it that way, and keep the privacy note accurate.
- Colours on the canvas are read from the CSS tokens. Don't hard-code them in JS.

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
