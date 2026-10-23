# Website Build Handover Brief

## Project

Build a polished, responsive website with an elegant red-and-yellow
visual identity. This brief is intended to be handed to another AI
coding agent or developer for implementation.

## Objective

Create a rich, dignified, modern website with: - A red and yellow theme,
balanced with white/off-white backgrounds and dark grey typography. - A
top featured-story carousel containing exactly 10 images. - A
menu/navigation system covering exactly 18 sections. - A premium
editorial-style layout with clear hierarchy, attractive spacing,
consistent image treatment, subtle borders/shadows, and responsive
behaviour. - A mobile-friendly navigation menu. - Clean, maintainable
code suitable for further development.

## Design direction

-   Style: premium, elegant, editorial, professional, uncluttered.
-   Primary red: approximately `#A80F22`.
-   Dark red: approximately `#79091A`.
-   Accent yellow: approximately `#F6C744`.
-   Background: white and soft off-white, such as `#F7F7F5` or
    `#FFFAF0`.
-   Main text: approximately `#242424`.
-   Use yellow selectively for highlights, separators, badges and calls
    to action. Avoid filling large areas with intense yellow.
-   Use generous whitespace, readable typography, consistent card
    dimensions and restrained shadows.
-   Do not make the website look loud, tabloid-like or cluttered.

## Required page structure

1.  **Top strip:** Small welcome or utility message.
2.  **Brand header:** Logo/brand name on the left, short tagline below,
    and optional primary action on the right.
3.  **Main navigation:** 18 sections. On desktop, show a well-organised
    navigation bar. On smaller screens, use an accessible collapsible
    menu. If all 18 items make the bar crowded, show the key items and
    place the rest under a "More" dropdown or structured menu panel,
    while ensuring all 18 remain accessible.
4.  **Featured stories:** A large horizontal carousel with exactly 10
    featured images. Each slide should support an image, category label,
    headline and short description. Include previous/next controls and
    slide indicators. Automatic advance may be used, but it must pause
    on hover/focus and should respect reduced-motion preferences.
    Include a way to pause or stop automatic movement for accessibility.
5.  **Introductory banner:** Short welcome/mission statement.
6.  **Latest highlights:** Responsive grid of story/content cards.
7.  **Explore all sections:** A directory/grid showing all 18 sections.
8.  **Footer:** Brand, short description, copyright and space for
    important links.

## Initial 18 menu sections

Use these as placeholders until the project owner provides the final
names: 1. Home 2. News 3. Business 4. Technology 5. Education 6. Health
7. Lifestyle 8. Entertainment 9. Sports 10. Travel 11. Food 12. Culture
13. Environment 14. Opinion 15. Interviews 16. Special Reports 17. Photo
Stories 18. About Us

Keep section labels in one central data structure so they can be renamed
easily.

## Functional requirements

-   Exactly 10 carousel slides, with working previous/next buttons and
    indicators.
-   Carousel should not cause layout shifts as images load.
-   Navigation should work on desktop and mobile.
-   All 18 sections should appear in the menu system and section
    directory.
-   Use semantic HTML, keyboard-accessible controls, visible focus
    states and meaningful alt text.
-   Respect `prefers-reduced-motion`.
-   Use responsive layouts for desktop, tablet and mobile.
-   Optimise images: use appropriately sized images, modern formats
    where possible, lazy-load below-the-fold images and prioritise the
    first featured image.
-   Avoid broken links and dead controls. Where article/section pages do
    not yet exist, make this explicit and use sensible placeholder
    routes/anchors.
-   Keep CSS, JavaScript and data easy to maintain. Avoid unnecessary
    dependencies.
-   Do not embed secrets, API keys or credentials.
-   Do not invent company branding or claim this is ready for production
    without testing.

## Technical direction

Choose the simplest appropriate implementation unless the project owner
specifies otherwise: - For a simple static prototype: HTML, CSS and
vanilla JavaScript. - If a CMS is required: WordPress or the existing
CMS. - If the codebase already uses React or another framework: follow
the existing stack rather than introducing a new one unnecessarily.

If building a static prototype, provide a clear project structure and an
`index.html` that runs locally. If using a framework, include all
necessary source files, dependencies and run instructions.

## Content and assets

-   Use realistic sample headlines and descriptions only as
    placeholders.
-   Use licensed, public-domain or otherwise permitted images. Do not
    assume remote demo image URLs are production-ready.
-   Make it easy to replace sample images and copy.
-   Store the carousel slides, menu items and content cards in clear
    data structures rather than duplicating markup manually.
-   If the final site language has not been specified, use English
    placeholders and make the text easy to localise.

## Deliverables

1.  Complete working source code, not just a mock-up or code snippets.
2.  A responsive page implementing the design and all core interactions.
3.  A README with setup, run, customisation and deployment instructions.
4.  A clear list of placeholder content/assets and any decisions that
    require owner input.
5.  A brief test checklist covering desktop/mobile layout, carousel
    controls, all 18 menu sections, keyboard navigation, image loading
    and browser-console errors.
6.  If possible, a local preview or deployable build.

## Acceptance checklist

-   [ ] Red and yellow brand palette looks refined and balanced.
-   [ ] Header and navigation feel professional and uncluttered.
-   [ ] Exactly 10 featured images are present.
-   [ ] Carousel arrows and indicators work.
-   [ ] All 18 menu sections are accessible on desktop and mobile.
-   [ ] Main content cards and section directory are responsive.
-   [ ] Buttons and links have meaningful actions.
-   [ ] Keyboard access and visible focus are supported.
-   [ ] Reduced-motion preference is respected.
-   [ ] Images have appropriate alt text and sensible loading behaviour.
-   [ ] Setup instructions are complete and verified.
-   [ ] No obvious console errors or broken layout at common screen
    sizes.

## Instructions to the coding agent

Please implement the website, not merely describe how to build it. First
inspect the available project files and identify the existing stack. If
no codebase exists, create a minimal, maintainable project using the
simplest suitable technology. Do not overwrite existing work without
checking it. Make reasonable visual decisions where details are
unspecified, document assumptions, and ask only for information that is
genuinely blocking. Finish by reporting the files created/changed, how
to run the site, and any outstanding limitations.
