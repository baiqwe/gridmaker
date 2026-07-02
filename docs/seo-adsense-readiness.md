# SEO and AdSense Readiness Notes

Last updated: 2026-07-02

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
