# SEO and AdSense Readiness Notes

Last updated: 2026-07-06

## Current positioning

AnyGridMaker is a focused browser-based image grid utility. The first content cluster should stay narrow: grid maker, Instagram grid maker, drawing grid maker, crochet grid maker, pixel grid maker, add grid to photo, and cross stitch grid maker.

## AdSense low-value-content checklist

- Each tool page must provide a working browser tool above the fold.
- Each tool page needs distinct search intent, not only a rewritten title.
- Keep About, Privacy Policy, Terms of Service, and Cookie Policy reachable from the footer.
- Keep ads below the primary workflow until approval and early traffic quality are stable.
- Do not create thin blog or pricing pages before the product actually needs them.
- Avoid fake contact details. Use the public GitHub repository for feedback until a support inbox exists.

## Search Console loop

Review GSC every week:

1. Queries with impressions and no clicks: rewrite titles and descriptions for CTR.
2. Positions 11-50: add page-specific examples, FAQs, and internal links.
3. Crawled but not indexed: check duplicate intent, canonical, and page depth.
4. Indexed with low impressions: add one related internal link from the homepage, footer, or a stronger tool page.

## 2026-07-06 GSC optimization plan

The latest Search Console export shows early impressions but almost no click volume yet. The current priority is not publishing many new pages. The priority is making the pages already receiving impressions feel deeper, more useful, and more clearly matched to their query intent.

### Week 1 content actions

1. Portuguese homepage `/pt`
   - Target queries: `ferramenta de grade`, `grade online`, `colocar grade em imagem`, `dividir imagem em grade`.
   - Page job: act as the Portuguese entry point for all grid intents.
   - Implementation: keep the tool above the fold, add a homepage mode chooser, explain split/overlay/pixel/craft use cases, and link to localized drawing, pixel, crochet, and Instagram pages.
   - Success signal: impressions for Brazil and Portuguese queries move from homepage-only discovery into deeper tool pages.

2. Spanish pixel page `/es/cuadricula-pixel`
   - Target queries: `pixelar imagen con cuadrícula`, `pixelizar imagen con cuadrícula`, `cuadrícula pixel`, `pixel art grid`.
   - Page job: help users decide whether an image can become pixel art, a mosaic, a bead pattern, or a block reference.
   - Implementation: add what/how/why/examples/mistakes/tips content, cover 16x16, 24x24, 32x32, and 48x48 use cases, and clarify that the output is a planning reference.
   - Success signal: keep the current early Spanish impressions while improving CTR through a more specific title and richer page text.

3. Spanish crochet page `/es/cuadricula-crochet`
   - Target queries: `cuadrícula crochet`, `patrón crochet desde imagen`, `gráfico crochet`, `crochet grid maker`.
   - Page job: serve counted craft planning before yarn palette extraction exists.
   - Implementation: add examples for C2C, graphghan, point-by-point crafts, low-contrast photo warnings, and dense-grid settings.
   - Success signal: preserve the promising low average position while making the page substantial enough for AdSense review.

4. English pixel page `/pixel-grid-maker`
   - Target queries: `pixel grid`, `pixel art grid`, `pixel grid maker`, `pixel art grid generator`.
   - Page job: become the most focused English page for image-to-pixel-grid planning.
   - Implementation: tune Title/Description, add examples for sprites, icons, portraits, Perler bead layouts, block builds, and classroom activities.
   - Success signal: move average position upward from the current 40s and increase impressions beyond the homepage.

### Week 2 content actions

5. Homepage mode chooser
   - Target queries: `grid maker`, `grid maker online`, `grid tool`.
   - Page job: disambiguate the broad query and push users to the right pSEO page.
   - Implementation: add localized comparison cards for Split grid, Overlay grid, Pixel grid, and Craft grid with internal links to the relevant pages.
   - Success signal: lower bounce risk and improve internal link discovery for deeper pages.

6. Drawing grid page depth
   - Target queries: `grid method drawing`, `grid maker for drawing`, `add grid to image for drawing`.
   - Page job: explain the drawing grid method, not just “add lines”.
   - Implementation: add guidance for 8x8, 10x10, 12x12, and 16x16, explain matching paper/canvas ratio, and list common distortion mistakes.
   - Success signal: drawing queries begin appearing as page-specific impressions instead of only homepage impressions.

7. External distribution and trust signals
   - Target channels: Reddit, LinkedIn, GitHub, creator communities.
   - Page job: earn real discovery and feedback links without spam.
   - Implementation: share the pixel/crochet/drawing pages as practical tools, ask for feedback, and record communities, post URLs, and reactions below.
   - Success signal: first external referrers, first branded searches, and a few natural mentions that help overcome low-value-content review concerns.

### External distribution tracker

| Date | Channel | Page | Angle | URL | Result |
| --- | --- | --- | --- | --- | --- |
| TBD | Reddit | `/pixel-grid-maker` | Ask pixel art/craft users whether grid sizes are useful | TBD | TBD |
| TBD | Reddit | `/es/cuadricula-crochet` | Ask Spanish craft communities about C2C/graphghan planning | TBD | TBD |
| TBD | LinkedIn | `/` | Build note: privacy-first image tools processed in the browser | TBD | TBD |
| TBD | GitHub README | Core pages | Link to live tools and describe browser-only processing | TBD | TBD |

## External distribution

Use the page share links for real distribution, not spam:

- Reddit: ask for feedback in relevant design, drawing, crochet, pixel art, and Instagram creator communities.
- LinkedIn: publish build notes about the privacy-first browser-only workflow.
- GitHub: keep the README aligned with the live site and link to the main tool pages.

## Technical checks before each deploy

- `biome check`
- `vite build`
- `/robots.txt` allows public tool pages and links to `/sitemap.xml`.
- `/sitemap.xml` includes canonical tool URLs and localized alternates.
- `/ads.txt` is reachable. Before AdSense is configured, the placeholder response is expected.
