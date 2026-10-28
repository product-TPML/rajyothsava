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

Images in `assets/` for development; **at launch every image is uploaded to the CMS media
gallery** and its address put in `cms/hosting.json` (owner's decision; see Hosting). The two
brand logos already load from their published links (the same ones the Dasara site uses),
and the fonts from the live sites.

| Asset | File | Notes |
|---|---|---|
| Prajavani logo | `https://images.assettype.com/deccanherald/2026-10-08/uf85tvay/PV-White.svg` | White ಪ್ರಜಾವಾಣಿ wordmark with Nandi and tagline (SVG, 1327×319). Linked, not downloaded (owner's choice). |
| Deccan Herald logo | `https://images.assettype.com/deccanherald/2026-10-08/pxdtubqa/deccan-herald.svg` | White DH letters, Nandi and "DECCAN HERALD", stacked (SVG, 78×68). Used by the English edition. |
| Karunadotsava mark | `assets/hero/karunadotsava-pv-720.webp`, `assets/hero/karunadotsava-dh-720.webp` | The final event logo from `assets/Karunadothsava Fin logo PV-DH.ai` (supplied by the owner; page 1 DH, page 2 PV): Gandaberunda, newspaper logo and title in gold/white, exported from the .ai without its gold border and gradient plaque, on a transparent background (owner's choice), 720px wide. The header sits it on the site's own red (`--red`); the poster gives it a red box. Used in the masthead (as the whole home link), the opening's top bar and the top of the poster. Re-export from the .ai if the artwork changes; never redraw it. There is no separate hero section; the carousel follows the nav bar. |
| Headline font | `https://fea.assettype.com/tpml/assets/PvHeadlineSemibold3.woff2` | Prajavani headline face, weight 600: headlines, section titles, carousel. |
| Body font | `https://fea.assettype.com/tpml/assets/PrajavaniTextRegular.woff2` | Weight 400: body text, descriptions, menus. |
| Body semibold | `https://fea.assettype.com/tpml/assets/PrajavaniTextSemibold.woff2` | Weight 600: labels, buttons, emphasis. |
| DH fonts | Google Fonts files deccanherald.com uses | Playfair Display 400/700, Roboto Slab 400/700 (`data-brand="dh"`). |

**Fonts load from the live sites' own files** (owner's decision): the addresses prajavani.net
and deccanherald.com use, open to any site (they send `Access-Control-Allow-Origin: *`), so
they work on the CMS pages, on the test site and locally. The `@font-face` rules are at the
top of `css/styles.css`; no font files are kept in the project.

- Preload the headline font, because it appears above the fold.
- The linked logos are the white versions, so use them only on dark or red backgrounds
  (footer, poster credit). Never stretch or crop any logo.
- Favicons: `assets/icons/favicon-pv.svg` and `favicon-dh.svg`, the Dasara site's PV and DH
  logos with no background, filling the icon and coloured like the flag: deep gold
  (`--gold-deep`) above the logo's middle, site red (`--red`) below (owner's request).
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
- **Top menu = the parts of this page** (owner's choice, overrides the brief's 18-section
  menu): ಮುಖ್ಯ ಕಥನಗಳು, ಪೋಸ್ಟರ್, ಮುಖ್ಯಾಂಶಗಳು, ವಿಡಿಯೊ, ಫೋಟೊ ಕಥನಗಳು (no exhibition: its card
  sits right under the carousel; owner's choice), each jumping to
  its section (`PAGE_NAV` in each data file). All fit in the bar on desktop; phones swipe the
  bar, and the menu button opens a panel with search and the same links.
  **Phones also get a bottom bar** (owner's request): four icon links, ಮುಖಪುಟ, ಪೋಸ್ಟರ್,
  ಸುದ್ದಿ, ವಿಡಿಯೊ (English: Home, Poster, Latest, Archives; the parts in `PAGE_NAV` with
  `short` and `icon`), then "ಮೆನು" on the right, which opens the menu panel, because the
  masthead's menu button scrolls away (owner's request). The
  link for the part being read is marked in every menu as the reader scrolls. A part that isn't
  on the page drops out of the menu. There is no "All sections" list before the footer and
  no section links in the footer (owner's request); `SECTIONS` now only labels the stories
  in the data file.
- Featured carousel stories come from the **"karunadotsava-top" collection** on
  prajavani.net (`COLLECTIONS.top` in `js/data.js`), read live each time the page opens: headline,
  subheadline, byline, section, hero image (via images.prajavani.net) and link to the story.
  The summary line is the desk's **subheadline only**, never the story's opening paragraph
  (owner's choice); stories without one show no summary, and if no carousel story has one,
  the line under the carousel is left out.
  The same collection feeds both: the carousel takes its **first 10 stories in the desk's
  order**; the stories section below ("ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶಗಳು") takes its **first 20, sorted
  newest first by publish time**, ignoring the collection order (owner's choice). Reading
  it only works when the site is served from www.prajavani.net (the browser blocks it from
  other addresses). The English page does the same with DH's **"karunadothsava-stories"**
  collection on deccanherald.com (owner's choice).
- **No sample content, ever (owner's rule, both sites).** If a collection or the video list
  can't be read, or is empty, the section keeps its heading and shows a dashed "coming soon"
  note (`showEmpty` in js/main.js; `emptyStories` / `emptyVideos` in the data files). Never
  add placeholder stories, videos or archive items as a fallback.
- Featured carousel uses a **stacked-card ("fanned") design**, modelled on the top
  carousel of thehindu.com and chosen by the owner. The current story is a tall
  portrait card in front, and neighbouring stories fan out behind it, smaller and dimmer.
  The headline sits on the card over a dark fade, and the front story's summary shows
  below the stack. It supports swipe, tap-a-side-card, arrows, pausing while hovered or focused (no dots or pause button, by the owner's choice). Only the
  look is borrowed: no code or assets from The Hindu.
- Cards: one column on phone, two on tablet, three or four on desktop.
- Test at 360px, 390px, 768px, 1024px and 1440px widths.

## Header search and home link

- The search box doesn't search this site. It sends the term to the main site's own
  search page and runs it there: `https://www.prajavani.net/search?q=…` for the Kannada page,
  `https://www.deccanherald.com/search?q=…` for the English one (owner's choice). It is a
  plain HTML form (`method="get"`, input `name="q"`); the address is `UI.searchUrl`
  in each data file.
- The link back to the newspaper's home page (`UI.headerAction`) is a quiet
  white text link in the masthead, not a button (owner's choice).

## Quotes (Kannada page)

- One quote runs per day. The editorial team will send all 30 together (owner's note).
- Each quote in `QUOTES` has a `date` (India time). The banner shows only the quotes
  that have run so far by that date, and is left out before the first date. Filtering
  happens in the browser (`quotesRunSoFar` in `js/main.js`), so no one needs to update
  the site each day.
- It opens on today's quote, with no autoplay. A back arrow steps to earlier days and a
  forward arrow returns, with the day ("ಇಂದಿನ ನುಡಿಮುತ್ತು" / "ನವೆಂಬರ್ 2ರ ನುಡಿಮುತ್ತು")
  between them (owner's request).
- The 30 quotes come in one sheet: date, quote, speaker and a link to the speaker's photo
  (owner's note).
- Speaker pictures: from those photo links; the owner restyles them in ChatGPT
  into the silhouette style (black on white, one feature in pure blue, square PNG). We then
  run them through `tools/silhouette-art.py` as the README describes. Don't draw them ourselves.

## Polls and contests (Kannada page)

- To the right of the quotes (below them on phones), in place of the old intro text: polls and
  contests on Prajavani's Facebook page (owner's request). Its own white card, side by side
  with the quote's deep red card and of equal weight, not part of the quotes (owner's choice). A QR code to the page (tablet and
  up; a phone can't scan its own screen) and a button linking to it. Text and address are
  `contests…` in `UI` in `js/data.js`. The QR code is `assets/icons/facebook-qr.svg`, made by
  `python tools/facebook-qr.py <address>`; remake it if the address changes.

## Videos (Kannada page)

- YouTube and Instagram embeds. **The editorial team keeps only a list of links** on the CMS
  page `/pages/karunadothsava-json` (`VIDEO_FEED`), served as JSON `{ "videos": [links] }`,
  in any order; the front end does the rest (owner's decision). `videoSource` in
  `js/main.js` reads each link: wide YouTube videos go to the big player plus list (the
  first in the player); YouTube Shorts and Instagram Reels to their own sideways row.
  YouTube titles come from YouTube's oEmbed (readable from any address), cut at the first
  " | " and without hashtags. Unknown links are skipped. If the list can't be read or is
  empty, the section shows its "coming soon" note. The starting file is
  `cms/karunadothsava-json.json`; the preview server uses it if the CMS page is empty. The
  CMS caches the page (`s-maxage=900`), so edits can take up to 15 minutes to show.
- YouTube shows its cover and loads the player (youtube-nocookie.com) only when tapped.
  The upright row ("ರೀಲ್ಸ್") is for **Instagram Reels only** (owner's decision). Instagram
  blocks other sites from showing its cover images, so each reel is Instagram's player,
  **cropped to the video** (owner's request, to lose the black side bars): a 240px 9:16
  window onto a larger player shifted past its 54px header, sized by 326/229.5 (its 4:5
  media box width / the video's width). If Instagram changes its player's layout, those
  numbers in css/styles.css need checking. A "ಇನ್‌ಸ್ಟಾಗ್ರಾಂನಲ್ಲಿ ನೋಡಿ ↗" link under each reel
  opens it on Instagram.
- **One video at a time** (owner's request): starting a video stops the one before.
  YouTube is told to pause (`enablejsapi=1` + postMessage); Instagram has no such API, so
  its frame is reloaded. Starting a reel happens inside Instagram's frame, so the page
  notices by which frame has the focus (`watchVideoFocus` in js/main.js).

## Photo stories (Kannada page)

- From the **"karunadotsava-photo"** collection (`COLLECTIONS.photo`), same reading as the
  carousel. The first 5 show (one large, four small fill the grid evenly), each opening the
  story on prajavani.net. If the collection can't be read, the section shows its "coming soon" note.

## "See all" buttons

- Every section with more stories than it shows ends with a "ಎಲ್ಲವನ್ನೂ ನೋಡಿ" button (owner's
  request). Stories and photo stories open the full list **on the same page**: the address
  becomes `#all/top` or `#all/photo` and the home content is swapped for every story in that
  collection (up to 500), newest first, 24 to a page with numbered page links (owner's request).
  The collection is read only when the list is opened, and with only the fields shown, so the
  home page stays light. If it can't be read, the list offers the collection's page on
  prajavani.net. Lists are `STORY_LISTS` in `js/data.js`; the code is `setupAllStories`.
- Videos (owner's requests): the home page shows the first 5 YouTube videos and 10 reels.
  Under each part, an outline button goes to the platform ("ಯೂಟ್ಯೂಬ್‌ನಲ್ಲಿ ಎಲ್ಲವನ್ನೂ ನೋಡಿ" to
  Prajavani's YouTube channel, "ಇನ್‌ಸ್ಟಾಗ್ರಾಂನಲ್ಲಿ ಎಲ್ಲವನ್ನೂ ನೋಡಿ" to its Instagram). When the
  CMS list has more than is shown, a yellow "ಎಲ್ಲವನ್ನೂ ನೋಡಿ" beside it opens all of that kind
  on the same page, 12 to a page with page numbers (`#all/videos`, `#all/reels`). Each goes
  with its part when that part is left out. The addresses are `seeAll…` in `UI` in `js/data.js`.

## Footer

- The newspaper's logo links to its home page (prajavani.net / deccanherald.com).
- "ಆರಂಭದ ದೃಶ್ಯ ಮತ್ತೆ ನೋಡಿ" (watch the opening again) in the bottom row reloads the page with
  `?intro`, which plays the opening animation (owner's request). The `<head>` script then
  takes `?intro` back out of the address.

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
  "ನನ್ನ ಹೆಮ್ಮೆ" (my pride), "ನನ್ನ ಕನಸು" (my dream for Kannada and Karnataka) or
  "ನನ್ನ ಸಮುದಾಯ" (my community; third tab, owner's request), with
  tap-to-use suggestions and an optional name and town. There is no longer-story box (owner
  removed it); sharing sends the poster with a message: the tab and the
  reader's line, their name and town, then "ನಿಮ್ಮ ರಾಜ್ಯೋತ್ಸವ ಪೋಸ್ಟರ್ ನೀವೂ ಮಾಡಿ: <address>" (owner's request). Set in `POSTER` in `js/data.js`.
- The maker's form runs: the tab ("ಯಾವುದರ ಬಗ್ಗೆ?"), the line, then the photo, because the
  photo follows the choice (owner's request). Under the tabs, each tab's `about` says what it
  means for Karunadotsava (owner's request).
- The poster is 1080×1920 (9:16) for WhatsApp status and Instagram stories. The words
  keep clear of the top and bottom strips WhatsApp covers. The Karunadotsava mark sits at
  the top (136px tall, 20% smaller than before, owner's request) with the date line beside
  it, one part per line ("ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ" / "ನವೆಂಬರ್ 1, 2026": `eventLine` split at " · ").
  The Prajavani logo is small, in a dark red "made at prajavani.net/rajyotsava" pill
  (owner's choice: readers write their own words, so the brand is a credit).
- The reader's line runs to 4 lines (90 characters), set smaller the more lines it takes
  (`LINE_SIZES` in js/poster.js: 104, 96, 84, 72px for 1 to 4 lines; owner's request).
- The photo opens filling the poster; the size slider zooms in, or out until the whole photo
  fits (a landscape photo at full width), on deep red, and it can be dragged (owner's request).
- A disclaimer at the end of the maker's form (`posterDisclaimer`): the tool only makes the
  poster; readers are responsible for the photo, words and how the poster is used, not the
  newspaper (owner's request).
- The section heading names all three tabs ("ನಿಮ್ಮ ಹೆಮ್ಮೆ, ನಿಮ್ಮ ಕನಸು, ನಿಮ್ಮ ಸಮುದಾಯ").
- The floating "make your poster" button copies the Dasara site's greeting button (owner's
  reference, `FE Experiments/Dasara`): a gold pill with a passing shine, a soft pulse and a
  nudge of the icon; it shrinks to the icon after a little scrolling and fades out over the
  poster section and on "See all" lists. On phones it sits just above the bottom bar.
- Drawn on a canvas entirely in the browser. **The photo is never
  uploaded.** Keep it that way, and keep the privacy note accurate.
- Colours on the canvas are read from the CSS tokens. Don't hard-code them in JS.

## English edition (Deccan Herald)

- `index-en.html` + `js/data-en.js`: the same site in English for Deccan Herald (DH),
  requested by the owner. It uses the DH Karunadotsava mark and DH logo (see Brand assets)
  in place of Prajavani's, spells the title "Karunadothsava" to match the mark, and DH's typefaces through `data-brand="dh"` on `<html>`.
- Owner's choices: no quotes banner, no videos, no photo stories, no facts; adds "From the
  archives" from DH's **"karunadothsava-archives"** collection (the first 6 in the desk's
  order, as clippings with photo, headline and subheadline; "See all" for the rest).
- Its collections are `COLLECTIONS` in `js/data-en.js` (api on deccanherald.com, photos from
  images.assettype.com); like Prajavani's, they can only be read from www.deccanherald.com.
- It shares `css/styles.css` and every script with the Kannada page. `js/main.js` runs
  each block only if the page has it. Never fork a script or stylesheet per edition;
  put the differences in the data file or a brand token.

## Tech and structure

- **Opening animation content is confirmed for both editions** (owner, 28 October): the seven
  personalities and their silhouettes, the closing message and the Karnataka map.
- **Opening animation (owner's choice):** once a day per reader (India time, remembered in the
  browser's localStorage, so a hard refresh doesn't replay it), and only on the home page: never
  when the page opens on a "See all" list (`#all/…`). To see it again, use the footer's "watch again"
  link (`?intro`); there is no replay-on-refresh switch.
- **Hosting (owner's setup), as on the Dasara site:**
  - The pages live in the CMS: `cms/index.cms.html` in the prajavani.net CMS and
    `cms/index-en.cms.html` in the deccanherald.com CMS. They are `index.html` and
    `index-en.html` with their `css/`, `js/` and `assets/` links rewritten by
    `python tools/build-cms.py` following `cms/hosting.json`. Regenerate them after any
    change to either page or to `hosting.json`; never edit them by hand.
  - `css/` and `js/` are served by **Cloudflare Pages** from this repository, at
    https://rajyothsava.pages.dev/ (`_headers` lets the CMS pages load them cross-site;
    every push to `main` redeploys). `hosting.json` `scripts` is its address.
  - **Every image goes in the CMS media gallery** (owner's decision); `hosting.json` `media`
    maps each `assets/` image to its gallery address. Until an image is uploaded, the CMS
    page takes it from Cloudflare. Scripts use no local image paths: the poster draws the
    mark the page's header shows.
  - **Vercel** hosts a test copy from the same repository: `vercel.json` passes
    `/api/v1/collections/…` (DH's two slugs to deccanherald.com, the rest to prajavani.net)
    and `/pages/karunadothsava-json` on to the live sites, so the test site reads live data.
    `.vercelignore` leaves out tools and notes. If DH's collection slugs change, update
    `vercel.json` too.
  - The collections' address in both data files is relative (`/api/v1/collections/`): the
    newspaper's own API on its site, a proxy everywhere else.
  - One page only (no extra HTML pages; new screens are views inside the page), and keep it
    light: load heavy data only when the reader asks for it.
- No existing codebase, so use plain **HTML + CSS + vanilla JavaScript** with no
  frameworks and no build step. `index.html` must open directly in a browser.
- Suggested layout:
  ```
  index.html
  css/styles.css
  js/data.js      ← page menu, carousel slides, cards (edit content here)
  js/main.js      ← menu, carousel, rendering
  assets/logo, assets/fonts
  README.md
  ```
- Keep all content in `js/data.js`, never hard-coded across the HTML.
- To test with the live collections, use `python tools/preview-server.py`
  (http://localhost:8123/). It forwards collection requests to prajavani.net and points
  only the copy of `js/data.js` it serves at itself. It's for testing only; the site's
  own files stay pointed at prajavani.net.
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
