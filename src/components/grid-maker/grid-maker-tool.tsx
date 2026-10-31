import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { GridMode, ToolPageConfig } from '@/lib/grid-maker/tool-pages';
import { createZipBlob } from '@/lib/grid-maker/zip';
import { getToolCopy, getPixelOptionsCopy } from '@/lib/grid-maker/tool-copy';
import {
  IconDownload,
  IconFileZip,
  IconGrid3x3,
  IconPhotoUp,
  IconRefresh,
} from '@tabler/icons-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type ToolState = {
  mode: GridMode;
  rows: number;
  columns: number;
  lineColor: string;
  lineWidth: number;
  opacity: number;
  labels: boolean;
  squareCrop: boolean;
  showGrid: boolean;
};

const sampleSvg =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#f5d7a1"/>
        <stop offset=".5" stop-color="#e89f71"/>
        <stop offset="1" stop-color="#5aa896"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="900" fill="url(#sky)"/>
    <circle cx="900" cy="210" r="88" fill="#fff3c2"/>
    <path d="M0 660 C180 500 320 610 480 470 C630 340 760 440 900 330 C1020 238 1110 280 1200 220 L1200 900 L0 900Z" fill="#21443d"/>
    <path d="M0 760 C210 650 360 740 540 610 C720 482 900 600 1200 450 L1200 900 L0 900Z" fill="#112c2b"/>
    <rect x="120" y="120" width="360" height="110" rx="18" fill="rgba(255,255,255,.78)"/>
  </svg>`);

function initialState(config: ToolPageConfig): ToolState {
  return {
    squareCrop: false,
    showGrid: true,
    mode: config.mode,
    rows: config.rows,
    columns: config.columns,
    lineColor: config.lineColor,
    lineWidth: config.lineWidth,
    opacity: config.opacity,
    labels: config.labels,
  };
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Unable to export image.'));
    }, 'image/png');
  });
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: ToolState
) {
  ctx.save();
  ctx.globalAlpha = state.opacity / 100;
  ctx.strokeStyle = state.lineColor;
  ctx.lineWidth = state.lineWidth;

  for (let col = 0; col <= state.columns; col += 1) {
    const x = (width / state.columns) * col;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let row = 0; row <= state.rows; row += 1) {
    const y = (height / state.rows) * row;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  if (state.labels) {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = state.lineColor;
    ctx.font = `${Math.max(14, Math.round(width / 56))}px sans-serif`;
    for (let row = 0; row < state.rows; row += 1) {
      for (let col = 0; col < state.columns; col += 1) {
        const label = `${String.fromCharCode(65 + (row % 26))}${col + 1}`;
        ctx.fillText(
          label,
          (width / state.columns) * col + 8,
          (height / state.rows) * row + 22
        );
      }
    }
  }

  ctx.restore();
}

function drawImageToCanvas(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  state: ToolState
) {
  const crop = state.mode === 'pixel' && state.squareCrop;
  const sourceWidth = crop
    ? Math.min(image.naturalWidth, image.naturalHeight)
    : image.naturalWidth;
  const sourceHeight = crop ? sourceWidth : image.naturalHeight;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;
  const scale = Math.min(1, 1800 / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);

  if (state.mode === 'pixel') {
    const pixelCanvas = document.createElement('canvas');
    pixelCanvas.width = state.columns;
    pixelCanvas.height = state.rows;
    const pixelCtx = pixelCanvas.getContext('2d');
    if (pixelCtx) {
      pixelCtx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        state.columns,
        state.rows
      );
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(pixelCanvas, 0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
    }
  } else {
    ctx.drawImage(image, 0, 0, width, height);
  }

  if (state.mode !== 'pixel' || state.showGrid)
    drawGrid(ctx, width, height, state);
}

export function GridMakerTool({ config }: { config: ToolPageConfig }) {
  const copy = getToolCopy(config.path);
  const pixelCopy = getPixelOptionsCopy(config.path);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<ToolState>(() => initialState(config));
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('sample-image');
  const [status, setStatus] = useState(copy.ready);

  const tileCount = useMemo(
    () => state.rows * state.columns,
    [state.rows, state.columns]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setState(initialState(config));
    setStatus(copy.ready);
  }, [config, copy.ready]);

  useEffect(() => {
    if (!mounted) return;
    const preview = new Image();
    preview.onload = () => {
      setImage(preview);
      setFileName('sample-image');
    };
    preview.src = sampleSvg;
  }, [mounted]);

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    drawImageToCanvas(image, canvasRef.current, state);
  }, [image, state]);

  function patchState(patch: Partial<ToolState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function handleUpload(file: File | undefined) {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setStatus(copy.invalid);
      return;
    }

    const url = URL.createObjectURL(file);
    const uploaded = new Image();
    uploaded.onload = () => {
      setImage(uploaded);
      setFileName(file.name.replace(/\.[^.]+$/, '') || 'grid-maker-image');
      setStatus(copy.loaded);
      URL.revokeObjectURL(url);
    };
    uploaded.onerror = () => {
      setStatus(copy.error);
      URL.revokeObjectURL(url);
    };
    uploaded.src = url;
  }

  async function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blob = await canvasToBlob(canvas);
    downloadBlob(blob, `${fileName}-${state.mode}-grid.png`);
  }

  async function downloadZip() {
    if (!image) return;
    const files: Array<{ name: string; data: Uint8Array }> = [];
    if (
      state.columns > image.naturalWidth ||
      state.rows > image.naturalHeight
    ) {
      setStatus(copy.limit);
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let row = 0; row < state.rows; row += 1) {
      for (let col = 0; col < state.columns; col += 1) {
        const x = Math.floor((col * image.naturalWidth) / state.columns);
        const y = Math.floor((row * image.naturalHeight) / state.rows);
        const tileWidth =
          Math.floor(((col + 1) * image.naturalWidth) / state.columns) - x;
        const tileHeight =
          Math.floor(((row + 1) * image.naturalHeight) / state.rows) - y;
        canvas.width = tileWidth;
        canvas.height = tileHeight;
        ctx.clearRect(0, 0, tileWidth, tileHeight);
        ctx.drawImage(
          image,
          x,
          y,
          tileWidth,
          tileHeight,
          0,
          0,
          tileWidth,
          tileHeight
        );
        const blob = await canvasToBlob(canvas);
        const data = new Uint8Array(await blob.arrayBuffer());
        const index = row * state.columns + col + 1;
        files.push({
          name: `${String(index).padStart(2, '0')}-row-${row + 1}-col-${
            col + 1
          }.png`,
          data,
        });
      }
    }

    downloadBlob(
      createZipBlob(files),
      `${fileName}-${state.rows}x${state.columns}.zip`
    );
  }

  if (!mounted) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-lg border border-black/10 bg-white text-sm text-[#70675d]">
        {copy.loading}
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 rounded-lg border border-black/10 bg-white p-3 shadow-[0_18px_50px_rgba(21,21,21,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-2 pb-3">
          <div>
            <p className="text-sm font-semibold text-[#151515]">
              {copy.preview}
            </p>
            <p className="text-xs text-[#70675d]">{status}</p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <IconPhotoUp className="size-4" />
            {copy.upload}
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => handleUpload(event.target.files?.[0])}
          />
        </div>

        <div className="mt-3 grid min-h-[420px] place-items-center overflow-auto rounded-md bg-[linear-gradient(45deg,#f2eee7_25%,transparent_25%),linear-gradient(-45deg,#f2eee7_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f2eee7_75%),linear-gradient(-45deg,transparent_75%,#f2eee7_75%)] bg-[length:28px_28px] bg-[position:0_0,0_14px,14px_-14px,-14px_0] p-3">
          <canvas
            ref={canvasRef}
            className="max-h-[70svh] max-w-full rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.22)]"
          />
        </div>
      </div>

      <aside className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#151515]">
              {copy.controls}
            </p>
            <p className="text-xs text-[#70675d]">
              {tileCount} {copy.cells}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={copy.reset}
            onClick={() => setState(initialState(config))}
          >
            <IconRefresh className="size-4" />
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {(['split', 'overlay', 'pixel'] as GridMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`rounded-md border px-2 py-2 text-xs font-semibold capitalize transition ${
                state.mode === mode
                  ? 'border-[#151515] bg-[#151515] text-white'
                  : 'border-black/10 bg-[#f8f3eb] text-[#514a42] hover:bg-[#f1e8db]'
              }`}
              onClick={() => patchState({ mode })}
            >
              {copy[mode]}
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="rows">{copy.rows}</Label>
            <Input
              id="rows"
              type="number"
              min={1}
              max={80}
              value={state.rows}
              onChange={(event) =>
                patchState({ rows: clamp(Number(event.target.value), 1, 80) })
              }
            />
          </div>
          <div>
            <Label htmlFor="columns">{copy.columns}</Label>
            <Input
              id="columns"
              type="number"
              min={1}
              max={80}
              value={state.columns}
              onChange={(event) =>
                patchState({
                  columns: clamp(Number(event.target.value), 1, 80),
                })
              }
            />
          </div>
        </div>

        {state.mode === 'pixel' ? (
          <fieldset className="mt-4 space-y-3">
            <legend className="text-sm font-medium">{pixelCopy.preset}</legend>
            <div className="flex flex-wrap gap-2">
              {[16, 24, 32, 48].map((size) => (
                <button
                  type="button"
                  key={size}
                  className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-100"
                  onClick={() => patchState({ rows: size, columns: size })}
                >
                  {size} × {size}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={state.squareCrop}
                onChange={(e) => patchState({ squareCrop: e.target.checked })}
              />
              {pixelCopy.crop}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={state.showGrid}
                onChange={(e) => patchState({ showGrid: e.target.checked })}
              />
              {pixelCopy.grid}
            </label>
          </fieldset>
        ) : null}

        <div className="mt-4 grid grid-cols-[1fr_96px] gap-3">
          <div>
            <Label htmlFor="lineColor">{copy.color}</Label>
            <Input
              id="lineColor"
              type="color"
              value={state.lineColor}
              onChange={(event) =>
                patchState({ lineColor: event.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="lineWidth">{copy.width}</Label>
            <Input
              id="lineWidth"
              type="number"
              min={1}
              max={12}
              value={state.lineWidth}
              onChange={(event) =>
                patchState({
                  lineWidth: clamp(Number(event.target.value), 1, 12),
                })
              }
            />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="opacity">{copy.opacity}</Label>
          <Input
            id="opacity"
            type="range"
            min={10}
            max={100}
            value={state.opacity}
            onChange={(event) =>
              patchState({
                opacity: clamp(Number(event.target.value), 10, 100),
              })
            }
          />
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm font-medium text-[#2d2a26]">
          <input
            type="checkbox"
            checked={state.labels}
            onChange={(event) => patchState({ labels: event.target.checked })}
          />
          {copy.labels}
        </label>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button
            type="button"
            onClick={() =>
              downloadPng().catch(() => setStatus(copy.exportError))
            }
          >
            <IconDownload className="size-4" />
            PNG
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              downloadZip().catch(() => setStatus(copy.exportError))
            }
            disabled={tileCount > 120}
            title={tileCount > 120 ? copy.limit : undefined}
          >
            <IconFileZip className="size-4" />
            ZIP
          </Button>
        </div>

        <div className="mt-4 rounded-md bg-[#f4efe7] p-3 text-xs leading-5 text-[#5b554d]">
          <IconGrid3x3 className="mr-1 inline size-4" />
          {copy.help}
        </div>
      </aside>
    </div>
  );
}
