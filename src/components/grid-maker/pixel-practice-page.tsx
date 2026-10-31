import { useRef, useState } from 'react';
import {
  IconPencil,
  IconEraser,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconTrash,
  IconDownload,
} from '@tabler/icons-react';
import {
  patternCells,
  practiceCopy,
  practicePalette,
  practicePatterns,
  type PracticeLocale,
} from '@/lib/grid-maker/pixel-practice';

const button =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700';

export function PixelPracticePage({
  locale = 'en',
}: {
  locale?: PracticeLocale;
}) {
  const c = practiceCopy[locale];
  const [size, setSize] = useState(8);
  const [pattern, setPattern] = useState(0);
  const [cells, setCells] = useState<number[]>(Array(64).fill(0));
  const [past, setPast] = useState<number[][]>([]);
  const [future, setFuture] = useState<number[][]>([]);
  const [color, setColor] = useState(2);
  const [erase, setErase] = useState(false);
  const [show, setShow] = useState(true);
  const [lines, setLines] = useState(true);
  const [error, setError] = useState('');
  const drawing = useRef(false);
  const target = patternCells(pattern, size);

  function remember() {
    setPast((p) => [...p.slice(-99), cells]);
    setFuture([]);
  }
  function paint(index: number) {
    setCells((old) =>
      old.map((v, i) => (i === index ? (erase ? 0 : color) : v))
    );
  }
  function replace(nextSize: number, nextPattern: number) {
    if (cells.some(Boolean) && !window.confirm(c.confirm)) return;
    setSize(nextSize);
    setPattern(nextPattern);
    setCells(Array(nextSize * nextSize).fill(0));
    setPast([]);
    setFuture([]);
  }
  function undo() {
    if (!past.length) return;
    setFuture((f) => [...f, cells]);
    setCells(past[past.length - 1]);
    setPast((p) => p.slice(0, -1));
  }
  function redo() {
    if (!future.length) return;
    setPast((p) => [...p, cells]);
    setCells(future[future.length - 1]);
    setFuture((f) => f.slice(0, -1));
  }
  function download(kind: 'drawing' | 'reference' | 'blank') {
    setError('');
    try {
      const data =
        kind === 'reference'
          ? target
          : kind === 'blank'
            ? Array(size * size).fill(0)
            : cells;
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas');
      const step = 512 / size;
      data.forEach((v, i) => {
        ctx.fillStyle = practicePalette[v];
        ctx.fillRect(
          (i % size) * step,
          Math.floor(i / size) * step,
          step,
          step
        );
      });
      if (lines || kind === 'blank') {
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 1;
        for (let i = 0; i <= size; i++) {
          const p = Math.min(511.5, i * step + 0.5);
          ctx.beginPath();
          ctx.moveTo(p, 0);
          ctx.lineTo(p, 512);
          ctx.moveTo(0, p);
          ctx.lineTo(512, p);
          ctx.stroke();
        }
      }
      canvas.toBlob((blob) => {
        if (!blob) {
          setError(c.error);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${practicePatterns[pattern].id}-${size}x${size}-${kind}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    } catch {
      setError(c.error);
    }
  }

  return (
    <main className="bg-white text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav
          aria-label={locale === 'pt' ? 'Navegação estrutural' : 'Breadcrumb'}
          className="mb-4 text-sm text-gray-600"
        >
          <a href={locale === 'pt' ? '/pt' : '/'} className="underline">
            {c.home}
          </a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{c.h1}</span>
        </nav>
        <h1 className="text-3xl font-bold sm:text-4xl">{c.h1}</h1>
        <p className="mt-3 max-w-2xl text-gray-600 leading-7">
          {c.description}
        </p>
        <div className="mt-6 flex flex-wrap items-end gap-4 border-y border-gray-200 py-4">
          <label className="grid gap-1 text-sm font-medium">
            {c.pattern}
            <select
              className={`${button} h-10`}
              value={pattern}
              onChange={(e) => replace(size, Number(e.target.value))}
            >
              {practicePatterns.map((p, i) => (
                <option key={p.id} value={i}>
                  {p.names[locale]}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium">
            {c.size}
            <select
              className={`${button} h-10`}
              value={size}
              onChange={(e) => replace(Number(e.target.value), pattern)}
            >
              <option value={8}>8 × 8</option>
              <option value={16}>16 × 16</option>
            </select>
          </label>
          <label className="flex min-h-10 items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={show}
              onChange={(e) => setShow(e.target.checked)}
            />
            {c.show}
          </label>
        </div>
        <div className="grid gap-8 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_210px]">
          <section>
            <h2 className="mb-3 text-base font-semibold">{c.reference}</h2>
            <div
              role="img"
              aria-label={`${c.reference}: ${practicePatterns[pattern].names[locale]}`}
              className="grid aspect-square overflow-hidden border border-gray-300 bg-gray-50"
              style={{ gridTemplateColumns: `repeat(${size},1fr)` }}
            >
              {target.map((v, i) => (
                <span
                  key={`${size}-${i}`}
                  className="border-b border-r border-gray-200"
                  style={{ background: show ? practicePalette[v] : '#f3f4f6' }}
                />
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-3 text-base font-semibold">{c.board}</h2>
            <div
              className="grid aspect-square touch-none overflow-hidden border border-gray-400"
              style={{ gridTemplateColumns: `repeat(${size},1fr)` }}
              onPointerDown={(e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                e.currentTarget.setPointerCapture(e.pointerId);
                drawing.current = true;
                remember();
                const r = e.currentTarget.getBoundingClientRect();
                paint(
                  Math.floor(((e.clientY - r.top) / r.height) * size) * size +
                    Math.floor(((e.clientX - r.left) / r.width) * size)
                );
              }}
              onPointerMove={(e) => {
                if (!drawing.current) return;
                const r = e.currentTarget.getBoundingClientRect();
                const x = Math.floor(((e.clientX - r.left) / r.width) * size),
                  y = Math.floor(((e.clientY - r.top) / r.height) * size);
                if (x >= 0 && x < size && y >= 0 && y < size)
                  paint(y * size + x);
              }}
              onPointerUp={() => {
                drawing.current = false;
              }}
              onPointerCancel={() => {
                drawing.current = false;
              }}
              onLostPointerCapture={() => {
                drawing.current = false;
              }}
            >
              {cells.map((v, i) => (
                <button
                  type="button"
                  key={`${size}-${i}`}
                  aria-label={`${c.board} ${Math.floor(i / size) + 1}, ${(i % size) + 1}: ${practicePalette[v]}`}
                  onClick={(e) => {
                    if (e.detail === 0) {
                      remember();
                      paint(i);
                    }
                  }}
                  className="min-h-0 min-w-0 border-b border-r border-gray-200 p-0 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-teal-700"
                  style={{ background: practicePalette[v] }}
                />
              ))}
            </div>
          </section>
          <aside className="space-y-5">
            <fieldset>
              <legend className="mb-3 text-sm font-semibold">{c.color}</legend>
              <div className="flex flex-wrap gap-2">
                {practicePalette.map((value, i) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`${c.color} ${value}`}
                    title={`${c.color} ${value}`}
                    aria-pressed={!erase && color === i}
                    onClick={() => {
                      setColor(i);
                      setErase(false);
                    }}
                    className={`size-9 rounded-full border-2 ${!erase && color === i ? 'border-gray-900 ring-2 ring-teal-600 ring-offset-2' : 'border-gray-300'}`}
                    style={{ background: value }}
                  />
                ))}
              </div>
            </fieldset>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  label: c.pen,
                  Icon: IconPencil,
                  active: !erase,
                  click: () => setErase(false),
                },
                {
                  label: c.eraser,
                  Icon: IconEraser,
                  active: erase,
                  click: () => setErase(true),
                },
              ].map(({ label, Icon, active, click }) => (
                <button
                  type="button"
                  key={label}
                  title={label}
                  aria-label={label}
                  aria-pressed={active}
                  onClick={click}
                  className={`${button} ${active ? 'ring-2 ring-teal-700' : ''}`}
                >
                  <Icon size={18} />
                </button>
              ))}
              <button
                type="button"
                className={button}
                title={c.undo}
                aria-label={c.undo}
                disabled={!past.length}
                onClick={undo}
              >
                <IconArrowBackUp size={18} />
              </button>
              <button
                type="button"
                className={button}
                title={c.redo}
                aria-label={c.redo}
                disabled={!future.length}
                onClick={redo}
              >
                <IconArrowForwardUp size={18} />
              </button>
              <button
                type="button"
                className={button}
                title={c.clear}
                aria-label={c.clear}
                disabled={!cells.some(Boolean)}
                onClick={() => {
                  if (
                    window.confirm(
                      locale === 'pt'
                        ? 'Limpar o desenho? Você pode desfazer esta ação.'
                        : 'Clear your drawing? You can undo this action.'
                    )
                  ) {
                    remember();
                    setCells(Array(size * size).fill(0));
                  }
                }}
              >
                <IconTrash size={18} />
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={lines}
                onChange={(e) => setLines(e.target.checked)}
              />
              {c.lines}
            </label>
            <div className="grid gap-2">
              <button
                type="button"
                className={button}
                onClick={() => download('drawing')}
              >
                <IconDownload size={18} />
                {c.download}
              </button>
              <button
                type="button"
                className={button}
                onClick={() => download('reference')}
              >
                {c.answer}
              </button>
              <button
                type="button"
                className={button}
                onClick={() => download('blank')}
              >
                {c.blank}
              </button>
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}
          </aside>
        </div>
        <div className="border-y border-gray-200 py-5">
          <a
            href={locale === 'pt' ? '/pt/grade-pixel' : '/pixel-grid-maker'}
            className="font-medium text-teal-800 underline"
          >
            {c.related}
          </a>
        </div>
        <div className="mx-auto max-w-3xl py-10 space-y-8">
          {c.sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 leading-8 text-gray-600">{s.body}</p>
            </section>
          ))}
          <section>
            <h2 className="text-xl font-semibold">
              {locale === 'pt'
                ? 'Perguntas frequentes'
                : 'Frequently asked questions'}
            </h2>
            <div className="mt-4 divide-y divide-gray-200">
              {c.faq.map(([q, a]) => (
                <details key={q} className="py-4">
                  <summary className="cursor-pointer font-medium">{q}</summary>
                  <p className="mt-3 leading-7 text-gray-600">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
