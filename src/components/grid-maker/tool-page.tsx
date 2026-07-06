import type { ToolPageConfig } from '@/lib/grid-maker/tool-pages';
import { landingToolPages } from '@/lib/grid-maker/tool-pages';
import type { Locale, ToolPageCopy } from '@/lib/grid-maker/i18n';
import { getSeoContent } from '@/lib/grid-maker/seo-content';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getCanonicalUrl } from '@/lib/urls';

type GridMakerToolComponent = typeof import('./grid-maker-tool').GridMakerTool;

const defaultCopy: ToolPageCopy = {
  homeLabel: 'Grid Maker',
  bestForLabel: 'Best for',
  privacyNote:
    'No uploads. No watermark. No registration. The image work stays in your browser.',
  aboutHeading: 'About this tool',
  workflowParagraph:
    'The workflow is intentionally simple: upload an image, choose the grid style, adjust the rows and columns, then download the result. For split grids, each tile is generated locally and bundled in a ZIP file. For drawing and craft grids, the exported PNG keeps the reference image and grid lines together.',
  privacyParagraph:
    'Because processing happens in the browser, the site can stay fast on Cloudflare Workers while avoiding server-side image storage. That also keeps the experience private for personal photos, artwork references, and campaign assets.',
  relatedToolsLabel: 'Related tools',
  faqHeading: 'Frequently asked questions',
  loadingLabel: 'Loading image tools...',
};

type ModeComparisonCopy = {
  title: string;
  description: string;
  rows: Array<{
    slug: string;
    mode: string;
    bestFor: string;
    setting: string;
  }>;
};

const modeComparisonByLocale: Record<string, ModeComparisonCopy> = {
  en: {
    title: 'Choose the right grid mode',
    description:
      'Grid maker searches can mean very different jobs. Use this quick guide to start with the mode that matches your image, then open the focused tool page for better presets.',
    rows: [
      {
        slug: 'instagram-grid-maker',
        mode: 'Split grid',
        bestFor:
          'Cut one image into separate tiles for Instagram profiles, carousel planning, and social media mosaics.',
        setting:
          'Start with 3x3 for profile grids or 3x1 for panoramic carousel ideas.',
      },
      {
        slug: 'drawing-grid-maker',
        mode: 'Overlay grid',
        bestFor:
          'Add guide lines over a photo for the grid method, drawing references, worksheets, and proportion transfer.',
        setting:
          'Use 8x8 or 10x10 for portraits; increase to 12x12 or 16x16 for detail.',
      },
      {
        slug: 'pixel-grid-maker',
        mode: 'Pixel grid',
        bestFor:
          'Pixelate an image with visible cells for pixel art, sprites, mosaics, beads, and block-based references.',
        setting:
          'Try 16x16 or 24x24 for icons, 32x32 for sprites, and 48x48 for portraits.',
      },
      {
        slug: 'crochet-grid-maker',
        mode: 'Craft grid',
        bestFor:
          'Create dense counted grids for crochet, C2C, graphghan, cross-stitch, beadwork, and handmade planning.',
        setting:
          'Begin around 30x30 or 40x40, then adjust until the subject remains readable.',
      },
    ],
  },
  es: {
    title: 'Elige el modo de cuadrícula correcto',
    description:
      'Una búsqueda de cuadrícula puede significar cortar una imagen, añadir líneas para dibujar o pixelizarla para manualidades. Usa esta guía para elegir el flujo adecuado.',
    rows: [
      {
        slug: 'instagram-grid-maker',
        mode: 'Dividir imagen',
        bestFor:
          'Cortar una foto en piezas para Instagram, carruseles y mosaicos de redes sociales.',
        setting: 'Empieza con 3x3 para perfil o 3x1 para ideas panorámicas.',
      },
      {
        slug: 'drawing-grid-maker',
        mode: 'Cuadrícula sobre foto',
        bestFor:
          'Poner líneas sobre una imagen para dibujo, proporción, láminas imprimibles y transferencia a papel.',
        setting:
          'Usa 8x8 o 10x10 para retratos; sube a 12x12 o 16x16 para más detalle.',
      },
      {
        slug: 'pixel-grid-maker',
        mode: 'Cuadrícula pixel',
        bestFor:
          'Pixelizar una imagen con celdas visibles para pixel art, mosaicos, cuentas y bloques.',
        setting:
          'Prueba 16x16 o 24x24 para iconos, 32x32 para sprites y 48x48 para retratos.',
      },
      {
        slug: 'crochet-grid-maker',
        mode: 'Cuadrícula manualidades',
        bestFor:
          'Crear cuadrículas densas para crochet, C2C, graphghan, punto de cruz y cuentas.',
        setting:
          'Empieza con 30x30 o 40x40 y ajusta hasta que el motivo sea legible.',
      },
    ],
  },
  pt: {
    title: 'Escolha o modo de grade certo',
    description:
      'Ferramenta de grade pode significar dividir imagem, colocar linhas para desenho ou pixelizar uma foto para artesanato. Use este guia para escolher o fluxo certo.',
    rows: [
      {
        slug: 'instagram-grid-maker',
        mode: 'Dividir imagem',
        bestFor:
          'Cortar uma foto em partes para Instagram, carrossel e mosaicos de redes sociais.',
        setting: 'Comece com 3x3 para perfil ou 3x1 para ideias panorâmicas.',
      },
      {
        slug: 'drawing-grid-maker',
        mode: 'Grade sobre foto',
        bestFor:
          'Adicionar linhas sobre uma imagem para desenho, proporção, impressão e transferência para papel ou tela.',
        setting:
          'Use 8x8 ou 10x10 para retratos; aumente para 12x12 ou 16x16 quando houver detalhes.',
      },
      {
        slug: 'pixel-grid-maker',
        mode: 'Grade pixel',
        bestFor:
          'Pixelizar imagem com células visíveis para pixel art, mosaicos, miçangas e blocos.',
        setting:
          'Teste 16x16 ou 24x24 para ícones, 32x32 para sprites e 48x48 para retratos.',
      },
      {
        slug: 'crochet-grid-maker',
        mode: 'Grade artesanal',
        bestFor:
          'Criar grades densas para crochê, C2C, graphghan, ponto cruz, miçangas e trabalhos contados.',
        setting:
          'Comece em 30x30 ou 40x40 e ajuste até o assunto continuar legível.',
      },
    ],
  },
  ja: {
    title: '目的に合うグリッドモードを選ぶ',
    description:
      '画像を分割する、写真に線を重ねる、ピクセル風にするなど、目的に応じて最適なページを選べます。',
    rows: [
      {
        slug: 'instagram-grid-maker',
        mode: '分割グリッド',
        bestFor:
          'Instagram 投稿、プロフィール用モザイク、カルーセル構成の準備。',
        setting: 'プロフィールには 3x3、横長の案には 3x1 から始めます。',
      },
      {
        slug: 'drawing-grid-maker',
        mode: '重ねるグリッド',
        bestFor: 'デッサン、比率確認、印刷用の参照画像、下描き転写。',
        setting: '人物画は 8x8 または 10x10、細部は 12x12 以上を試します。',
      },
      {
        slug: 'pixel-grid-maker',
        mode: 'ピクセルグリッド',
        bestFor: 'ピクセルアート、スプライト、モザイク、ビーズ、ブロック配置。',
        setting: 'アイコンは 16x16 や 24x24、人物は 48x48 以上を試します。',
      },
      {
        slug: 'crochet-grid-maker',
        mode: '手芸グリッド',
        bestFor: 'かぎ針編み、C2C、クロスステッチ、ビーズ作品の計画。',
        setting: '30x30 または 40x40 から始め、見やすさに合わせて調整します。',
      },
    ],
  },
  zh: {
    title: '选择合适的网格模式',
    description:
      '搜索网格工具时，用户可能想切图、加参考线，或把图片变成像素格。先选对模式，再进入对应工具页会更快。',
    rows: [
      {
        slug: 'instagram-grid-maker',
        mode: '切图网格',
        bestFor: '把一张图切成 Instagram 主页九宫格、轮播图或社媒拼图。',
        setting: '主页拼图从 3x3 开始，横向轮播可以试 3x1。',
      },
      {
        slug: 'drawing-grid-maker',
        mode: '叠加网格',
        bestFor: '给照片加绘画参考线，用于比例观察、打印练习和转描。',
        setting: '人像常用 8x8 或 10x10，细节多时试 12x12 或 16x16。',
      },
      {
        slug: 'pixel-grid-maker',
        mode: '像素网格',
        bestFor: '把图片像素化，用于 pixel art、马赛克、串珠和方块参考。',
        setting: '图标试 16x16 或 24x24，头像和宠物照试 48x48 以上。',
      },
      {
        slug: 'crochet-grid-maker',
        mode: '手作网格',
        bestFor: '为钩针、C2C、十字绣、串珠等计数类手作创建密集网格。',
        setting: '从 30x30 或 40x40 开始，调到主体仍然清晰为止。',
      },
    ],
  },
};

function ClientGridMakerTool({
  page,
  loadingLabel,
}: {
  page: ToolPageConfig;
  loadingLabel: string;
}) {
  const [Tool, setTool] = useState<GridMakerToolComponent | null>(null);

  useEffect(() => {
    let active = true;
    import('./grid-maker-tool').then((module) => {
      if (active) setTool(() => module.GridMakerTool);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!Tool) {
    return (
      <div className="relative grid min-h-[520px] overflow-hidden rounded-lg border border-black/10 bg-white text-sm text-[#70675d]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(rgba(21,21,21,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(21,21,21,0.08) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute inset-x-8 top-8 h-16 rounded-md border border-dashed border-black/15 bg-[#fbfaf7]/80" />
        <div className="absolute inset-x-8 bottom-8 grid grid-cols-3 gap-3">
          <div className="h-20 rounded-md border border-dashed border-black/15 bg-[#fbfaf7]/80" />
          <div className="h-20 rounded-md border border-dashed border-black/15 bg-[#fbfaf7]/80" />
          <div className="h-20 rounded-md border border-dashed border-black/15 bg-[#fbfaf7]/80" />
        </div>
        <div className="relative z-10 place-self-center rounded-md bg-white/90 px-4 py-2 shadow-sm">
          {loadingLabel}
        </div>
      </div>
    );
  }

  return <Tool key={page.slug} config={page} />;
}

export function ToolPage({
  page,
  copy = defaultCopy,
  relatedPages = landingToolPages,
  homePath = '/',
  locale = 'en',
}: {
  page: ToolPageConfig;
  copy?: ToolPageCopy;
  relatedPages?: ToolPageConfig[];
  homePath?: string;
  locale?: Locale | 'en';
}) {
  const seoContent = getSeoContent(page.slug, locale);
  const relatedPriority = [
    'pixel-grid-maker',
    'drawing-grid-maker',
    'instagram-grid-maker',
    'add-grid-to-photo',
    'crochet-grid-maker',
    'cross-stitch-grid-maker',
  ];
  const visibleRelatedPages = relatedPages
    .filter((item) => item.path !== page.path)
    .sort(
      (a, b) =>
        relatedPriority.indexOf(a.slug) - relatedPriority.indexOf(b.slug)
    );
  const canonicalUrl = getCanonicalUrl(page.path);
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(canonicalUrl)}&title=${encodeURIComponent(page.h1)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
  const modeComparison =
    modeComparisonByLocale[locale] ?? modeComparisonByLocale.en;
  const getRelatedPageBySlug = (slug: string) =>
    relatedPages.find((item) => item.slug === slug);

  return (
    <div className="bg-[#fbfaf7] text-[#151515]">
      <section className="border-b border-black/10">
        <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-6 lg:py-8">
          <div className="flex min-w-0 flex-col gap-5">
            <div className="max-w-3xl">
              <nav
                aria-label="Breadcrumb"
                className="mb-4 flex items-center gap-2 text-sm text-[#70675d]"
              >
                <Link
                  to={homePath}
                  className="font-medium hover:text-[#151515]"
                >
                  {copy.homeLabel}
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{page.navLabel}</span>
              </nav>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b84c16]">
                {page.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-[1.02] text-[#151515] md:text-6xl">
                {page.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b554d] md:text-lg">
                {page.description}
              </p>
            </div>
            <ClientGridMakerTool page={page} loadingLabel={copy.loadingLabel} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(21,21,21,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#70675d]">
                {copy.bestForLabel}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#2d2a26]">
                {page.bestFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-[#1c9b7a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-md bg-[#f4efe7] p-4 text-sm leading-6 text-[#514a42]">
                {copy.privacyNote}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 lg:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_280px]">
          <div>
            <h2 className="text-2xl font-bold text-[#151515]">
              {copy.aboutHeading}
            </h2>
            <p className="mt-4 text-base leading-8 text-[#514a42]">
              {page.intro}
            </p>
            <p className="mt-4 text-base leading-8 text-[#514a42]">
              {copy.workflowParagraph}
            </p>
            <p className="mt-4 text-base leading-8 text-[#514a42]">
              {copy.privacyParagraph}
            </p>
          </div>

          <div className="grid gap-4">
            <nav aria-label="Related tools" className="rounded-lg bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#70675d]">
                {copy.relatedToolsLabel}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {visibleRelatedPages.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="rounded-md px-3 py-2 text-sm font-medium text-[#2d2a26] transition hover:bg-[#f4efe7]"
                  >
                    {item.h1}
                  </Link>
                ))}
              </div>
            </nav>

            <aside
              aria-label="Share this tool"
              className="rounded-lg bg-white p-5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#70675d]">
                Share this tool
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={redditShareUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-md border border-black/10 px-3 py-2 text-sm font-medium text-[#2d2a26] transition hover:bg-[#f4efe7]"
                >
                  Reddit
                </a>
                <a
                  href={linkedinShareUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-md border border-black/10 px-3 py-2 text-sm font-medium text-[#2d2a26] transition hover:bg-[#f4efe7]"
                >
                  LinkedIn
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {page.slug === 'home' ? (
        <section className="border-t border-black/10 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-14 lg:px-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-[#151515]">
                {modeComparison.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[#514a42]">
                {modeComparison.description}
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {modeComparison.rows.map((row) => {
                const targetPage = getRelatedPageBySlug(row.slug);
                return (
                  <article
                    key={row.slug}
                    className="rounded-lg border border-black/10 bg-[#fbfaf7] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-[#151515]">
                        {row.mode}
                      </h3>
                      {targetPage ? (
                        <Link
                          to={targetPage.path}
                          className="shrink-0 rounded-md border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-[#2d2a26] transition hover:bg-[#f4efe7]"
                        >
                          {targetPage.navLabel}
                        </Link>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#514a42]">
                      {row.bestFor}
                    </p>
                    <p className="mt-3 rounded-md bg-white p-3 text-sm leading-7 text-[#5b554d]">
                      {row.setting}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-black/10 bg-[#fbfaf7]">
        <div className="mx-auto max-w-5xl px-4 py-14 lg:px-6">
          <div className="grid gap-8">
            {[
              seoContent.what,
              seoContent.how,
              seoContent.examples,
              seoContent.why,
              seoContent.mistakes,
              seoContent.tips,
            ]
              .filter((section) => section !== undefined)
              .map((section) => (
                <article
                  key={section.title}
                  className="rounded-lg bg-white p-6 shadow-[0_12px_35px_rgba(21,21,21,0.05)]"
                >
                  <h2 className="text-2xl font-bold text-[#151515]">
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-base leading-8 text-[#514a42]"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.items ? (
                    <ol className="mt-5 grid gap-3 text-base leading-7 text-[#514a42]">
                      {section.items.map((item, index) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f4efe7] text-sm font-semibold text-[#b84c16]">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 lg:px-6">
          <h2 className="text-2xl font-bold text-[#151515]">
            {copy.faqHeading}
          </h2>
          <div className="mt-6 divide-y divide-black/10 rounded-lg border border-black/10">
            {page.faq.map((item) => (
              <details key={item.question} className="group p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-[#151515]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[#514a42]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
