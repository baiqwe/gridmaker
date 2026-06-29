# AnyGridMaker SEO Growth Plan - 2026-06

This plan is based on the Google Search Console export dated 2026-06-26.
The property is still in the early testing phase: roughly 302 impressions and
1 click, with live impressions mainly from 2026-06-15 to 2026-06-24.

## Week 1: Fix Signals And Strengthen Existing Demand

### 1. Force HTTP To HTTPS

- Problem: `http://anygridmaker.com/` appeared in GSC and returned `200`.
- Change: redirect every `http:` request to the equivalent `https:` URL at the
  Worker entry point.
- Acceptance: `curl -I http://anygridmaker.com/` returns `301` to HTTPS.

### 2. Strengthen The Homepage For Generic Grid Queries

- Target queries: `grid maker`, `image grid maker`, `online grid maker`,
  `free grid maker`, `grid tool`, `grid creator`, `photo grid maker`.
- Page: `/`.
- Content changes:
  - Make the intro explicitly cover image grids, photo grids, drawing grids,
    pixel grids, social grids, and craft grids.
  - Add common grid-size language: `3x3`, `4x5`, `8x8`, `10x10`, `16x16`,
    `24x24`, `32x32`, `30x30`, `40x40`.
  - Add FAQ coverage for image/photo grid maker usage.
- Internal links:
  - Prioritize links to Pixel, Drawing, Instagram, Add Grid, Crochet, and
    Cross Stitch pages.

### 3. Strengthen Pixel Grid Demand

- Target queries: `pixel art grid`, `grid pixel art`, `pixel grid maker`,
  `pixel art grid generator`, `grid pixel`.
- Page: `/pixel-grid-maker`.
- Content changes:
  - Reframe the page around pixel art grid creation from an image.
  - Add grid-size recommendations for icons, sprites, portraits, and craft
    references.
  - Expand FAQ for photo-to-pixel-art-grid use cases.
- Decision: do not create `/pixel-art-grid-maker` yet. Wait until the pixel
  cluster has more impressions to avoid cannibalization.

### 4. Strengthen Portuguese Homepage

- Target queries: `ferramenta de grade`, `colocar grade em imagem`,
  `dividir imagem em grade`.
- Page: `/pt`.
- Content changes:
  - Make title/H1 focus on `Ferramenta de Grade Online`.
  - Add Portuguese FAQ for putting a grid on an image and splitting an image
    into grid tiles.
  - Keep Brazil-friendly wording around desenho, crochê, Instagram, and pixel
    art.

## Week 2: Build On Early Vertical Signals

### 1. Strengthen Spanish Drawing Page

- Target queries: `cuadrícula para dibujar online`, `poner cuadrícula a foto`,
  `cuadricular imagen para dibujar`.
- Page: `/es/cuadricula-para-dibujar`.
- Content changes:
  - Make title and description explicit for online drawing grids.
  - Add printable drawing-grid language.
  - Expand HowTo and FAQ for putting a grid on a photo.

### 2. Strengthen Instagram Grid Page

- Target queries: `instagram crop grid online`, `grid maker for instagram free`,
  `3x3 Instagram grid`.
- Page: `/instagram-grid-maker`.
- Content changes:
  - Add crop-preview language.
  - Add FAQ about using the tool as an Instagram crop grid.
  - Keep `3x3`, `free`, `no watermark`, and `no registration` near the top.

### 3. Recheck GSC After Reindexing

- Submit sitemap again: `https://anygridmaker.com/sitemap.xml`.
- Request indexing for:
  - `/`
  - `/pixel-grid-maker`
  - `/pt`
  - `/es/cuadricula-para-dibujar`
  - `/instagram-grid-maker`
- Review the next 7-14 days by cluster, not by single-day changes.

## Next Split/Page Decisions

Only create new pSEO pages after a cluster shows repeated impressions:

- Consider `/pixel-art-grid-maker` after pixel terms exceed 100 impressions.
- Consider a dedicated Portuguese drawing or image-grid page after `/pt`
  receives stable clicks or top-20 impressions.
- Consider TikTok/carousel pages only after Instagram/social queries increase.
