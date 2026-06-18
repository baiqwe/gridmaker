import type { ToolPageConfig } from '@/lib/grid-maker/tool-pages';
import { landingToolPages } from '@/lib/grid-maker/tool-pages';
import type { Locale, ToolPageCopy } from '@/lib/grid-maker/i18n';
import { getSeoContent } from '@/lib/grid-maker/seo-content';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

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
  const visibleRelatedPages = relatedPages.filter(
    (item) => item.path !== page.path
  );

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
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#fbfaf7]">
        <div className="mx-auto max-w-5xl px-4 py-14 lg:px-6">
          <div className="grid gap-8">
            {[seoContent.what, seoContent.how, seoContent.why, seoContent.tips]
              .filter(Boolean)
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
