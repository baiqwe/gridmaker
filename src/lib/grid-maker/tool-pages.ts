import { Routes } from '@/lib/routes';

export type GridMode = 'split' | 'overlay' | 'pixel';

export type ToolPageConfig = {
  slug: string;
  path: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  mode: GridMode;
  rows: number;
  columns: number;
  lineColor: string;
  lineWidth: number;
  opacity: number;
  labels: boolean;
  keywords: string;
  intro: string;
  bestFor: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const toolPages: ToolPageConfig[] = [
  {
    slug: 'home',
    path: Routes.Root,
    navLabel: 'Grid Maker',
    eyebrow: 'Private browser-based image grid tool',
    title: 'Grid Maker Online: Free Image Grid Tool',
    description:
      'Create image grids, photo grids, pixel grids, and drawing grids in your browser. Free, private, no watermark, and no uploads.',
    h1: 'Free Online Grid Maker',
    mode: 'overlay',
    rows: 3,
    columns: 3,
    lineColor: '#111827',
    lineWidth: 2,
    opacity: 70,
    labels: false,
    keywords:
      'grid maker, grid maker online, image grid maker, photo grid maker',
    intro:
      'Use Grid Maker as a free image grid maker, photo grid maker, drawing grid tool, and pixel grid creator. Split a photo into tiles, add a clean reference grid over an image, or preview a block-based pixel art grid. Everything runs locally in your browser, so your image is not uploaded to a server.',
    bestFor: [
      'Image grids and photo grid layouts',
      'Drawing reference grids',
      'Pixel art, craft, and social media grids',
    ],
    faq: [
      {
        question: 'Is this online grid maker free?',
        answer:
          'Yes. The core grid, split, and download tools are free to use with no watermark and no registration.',
      },
      {
        question: 'Are my images uploaded?',
        answer:
          'No. Images are processed in your browser with Canvas APIs and are not sent to a server.',
      },
      {
        question: 'Can I use it as an image grid maker or photo grid maker?',
        answer:
          'Yes. You can add a grid overlay to one image, create a photo grid reference, or split an image into separate tiles.',
      },
      {
        question: 'What grid sizes should I use?',
        answer:
          'Use 3x3 for social media grids, 8x8 or 10x10 for drawing references, and 24x24, 30x30, or 40x40 for pixel art and craft planning.',
      },
      {
        question: 'Can I split an image into multiple files?',
        answer:
          'Yes. Choose Split mode, set the rows and columns, then download all tiles as a ZIP file.',
      },
    ],
  },
  {
    slug: 'instagram-grid-maker',
    path: Routes.InstagramGridMaker,
    navLabel: 'Instagram',
    eyebrow: 'Instagram grid maker',
    title: 'Instagram Grid Maker: Free 3x3 Split',
    description:
      'Split any photo into a 3x3 Instagram grid or crop grid online. Free, private, no watermark, no registration, and browser-only processing.',
    h1: 'Free Online Instagram Grid Maker',
    mode: 'split',
    rows: 3,
    columns: 3,
    lineColor: '#ffffff',
    lineWidth: 2,
    opacity: 70,
    labels: false,
    keywords:
      'instagram grid maker, ig grid maker, instagram 3x3 grid, split image for instagram',
    intro:
      'Turn one image into a clean Instagram grid, 3x3 profile mosaic, or crop grid without signing up or adding a watermark. The default 3x3 preset creates nine ordered tiles that are ready to post.',
    bestFor: [
      'Instagram 3x3 profile grids',
      'Carousel planning',
      'Campaign images with no watermark',
    ],
    faq: [
      {
        question: 'How do I make a 3x3 grid for Instagram?',
        answer:
          'Upload your image, keep the 3 rows by 3 columns preset, preview the crop, then download the generated tiles.',
      },
      {
        question: 'Can I download all Instagram grid images at once?',
        answer:
          'Yes. The Download ZIP button saves all generated tiles in posting order.',
      },
      {
        question: 'Does this Instagram grid maker add a watermark?',
        answer:
          'No. Downloads are watermark-free and do not require an account.',
      },
      {
        question: 'Can I use it as an Instagram crop grid online?',
        answer:
          'Yes. Use the preview to check how the image is cropped into each tile before downloading the 3x3 grid.',
      },
    ],
  },
  {
    slug: 'drawing-grid-maker',
    path: Routes.DrawingGridMaker,
    navLabel: 'Drawing',
    eyebrow: 'Drawing reference grid',
    title: 'Drawing Grid Maker: Add Grid to Photo',
    description:
      'Add a customizable drawing grid to any image online. Adjust rows, columns, line color, opacity, and labels. Free and private.',
    h1: 'Drawing Grid Maker Online',
    mode: 'overlay',
    rows: 8,
    columns: 8,
    lineColor: '#111827',
    lineWidth: 2,
    opacity: 65,
    labels: true,
    keywords:
      'drawing grid maker, grid maker for drawing, add grid to image for drawing',
    intro:
      'Add a proportional grid over a reference photo for drawing, painting, and sketch transfer. Adjust the grid density, line color, opacity, and labels before downloading.',
    bestFor: [
      'Portrait drawing references',
      'Canvas transfer planning',
      'Printable proportion guides',
    ],
    faq: [
      {
        question: 'Can I add a grid to a photo for drawing?',
        answer:
          'Yes. Upload a photo, choose Overlay mode, then adjust the row and column counts to match your drawing surface.',
      },
      {
        question: 'Can I change the grid color and opacity?',
        answer:
          'Yes. You can tune the grid line color, width, and opacity before downloading the final image.',
      },
      {
        question: 'Can I show labels on the grid?',
        answer:
          'Yes. Turn on labels to add simple A1, A2, B1 style coordinates.',
      },
    ],
  },
  {
    slug: 'crochet-grid-maker',
    path: Routes.CrochetGridMaker,
    navLabel: 'Crochet',
    eyebrow: 'Crochet and craft grid',
    title: 'Crochet Grid Maker: Image Craft Grid',
    description:
      'Make a crochet grid from an image with dense rows and columns, adjustable lines, and browser-only processing. Free and no uploads.',
    h1: 'Crochet Grid Maker Online',
    mode: 'overlay',
    rows: 30,
    columns: 30,
    lineColor: '#111827',
    lineWidth: 1,
    opacity: 55,
    labels: false,
    keywords: 'crochet grid maker, crochet pattern grid, image to crochet grid',
    intro:
      'Create a dense grid over an image to plan crochet, cross-stitch, beadwork, or other handmade patterns. The browser-only workflow keeps references private and fast.',
    bestFor: [
      'Crochet pattern planning',
      'Cross-stitch references',
      'Dense craft grids',
    ],
    faq: [
      {
        question: 'Can I make a dense crochet grid?',
        answer:
          'Yes. Increase the rows and columns to create a fine grid for craft planning.',
      },
      {
        question: 'Does this convert colors into yarn charts?',
        answer:
          'The first version focuses on clean image grids. Color extraction and yarn palettes are planned as advanced features.',
      },
      {
        question: 'Can I download the crochet grid image?',
        answer:
          'Yes. Download the generated grid as a PNG after adjusting the settings.',
      },
    ],
  },
  {
    slug: 'pixel-grid-maker',
    path: Routes.PixelGridMaker,
    navLabel: 'Pixel',
    eyebrow: 'Pixel grid maker',
    title: 'Pixel Grid Maker: Pixelate Images Online',
    description:
      'Create a pixel art grid from an image online. Pixelate photos, add clear grid lines, and download a block-based reference.',
    h1: 'Pixel Grid Maker Online',
    mode: 'pixel',
    rows: 24,
    columns: 24,
    lineColor: '#111827',
    lineWidth: 1,
    opacity: 60,
    labels: false,
    keywords: 'pixel grid maker, pixel art grid maker, image pixel grid',
    intro:
      'Preview an image as a blocky pixel art grid for sprites, icons, crafts, and layout planning. Adjust the grid size to control pixel detail before downloading the reference.',
    bestFor: [
      'Pixel art grid references',
      'Block-based image previews',
      'Image-to-pixel craft grids',
    ],
    faq: [
      {
        question: 'Can I pixelate an image online?',
        answer:
          'Yes. Pixel mode redraws the image at the selected grid resolution and overlays clean grid lines.',
      },
      {
        question: 'Can I choose the pixel grid size?',
        answer:
          'Yes. Change rows and columns to make the pixel preview coarser or more detailed.',
      },
      {
        question: 'Can I make a pixel art grid from a photo?',
        answer:
          'Yes. Upload a photo, switch to Pixel mode, choose a grid size such as 24x24 or 32x32, and download the pixel art reference.',
      },
      {
        question: 'What grid size is best for pixel art?',
        answer:
          'Start with 16x16 or 24x24 for icons, 32x32 for simple sprites, and 48x48 or higher for portraits and detailed objects.',
      },
      {
        question: 'Is the pixel grid processed on the server?',
        answer: 'No. The pixel preview is generated locally in your browser.',
      },
    ],
  },
  {
    slug: 'add-grid-to-photo',
    path: Routes.AddGridToPhoto,
    navLabel: 'Add Grid',
    eyebrow: 'Add grid to photo online',
    title: 'Add Grid to Photo: Free Grid Overlay',
    description:
      'Add a clean, adjustable grid to any photo online. Choose rows, columns, line color, opacity, and labels with private browser-only processing.',
    h1: 'Add Grid to Photo Online',
    mode: 'overlay',
    rows: 10,
    columns: 10,
    lineColor: '#111827',
    lineWidth: 2,
    opacity: 62,
    labels: true,
    keywords:
      'add grid to photo, add grid to image, photo grid overlay, image grid overlay',
    intro:
      'Add Grid to Photo is a focused overlay tool for placing accurate grid lines over a reference image. It is useful when you want a proportional guide without splitting the image into separate files.',
    bestFor: [
      'Adding a grid overlay to photos',
      'Printable reference images',
      'Labeled image planning guides',
    ],
    faq: [
      {
        question: 'How do I add a grid to a photo?',
        answer:
          'Upload a photo, use Overlay mode, choose the number of rows and columns, then download the PNG with the grid applied.',
      },
      {
        question: 'Can I change the grid line style?',
        answer:
          'Yes. You can adjust line color, line width, opacity, and optional coordinate labels before exporting.',
      },
      {
        question: 'Will the original photo be uploaded?',
        answer:
          'No. The photo is loaded into your browser and processed locally with Canvas.',
      },
    ],
  },
  {
    slug: 'cross-stitch-grid-maker',
    path: Routes.CrossStitchGridMaker,
    navLabel: 'Cross Stitch',
    eyebrow: 'Cross-stitch grid maker',
    title: 'Cross Stitch Grid Maker: Photo to Grid',
    description:
      'Create a dense cross-stitch grid from a photo online. Add fine rows and columns for craft planning with private browser-based image processing.',
    h1: 'Cross Stitch Grid Maker Online',
    mode: 'overlay',
    rows: 40,
    columns: 40,
    lineColor: '#111827',
    lineWidth: 1,
    opacity: 52,
    labels: false,
    keywords:
      'cross stitch grid maker, cross stitch pattern grid, image to cross stitch grid, craft grid maker',
    intro:
      'Cross Stitch Grid Maker helps turn a reference image into a clear counted grid for stitch planning, beadwork, and other square-based craft layouts.',
    bestFor: [
      'Cross-stitch reference grids',
      'Counted craft planning',
      'Dense square layouts from images',
    ],
    faq: [
      {
        question: 'Can I make a cross-stitch grid from a photo?',
        answer:
          'Yes. Upload a photo, choose a dense row and column count, then download the image with grid lines for reference.',
      },
      {
        question: 'Does this generate a full thread-color chart?',
        answer:
          'This MVP focuses on accurate grid overlays. Color palettes and thread charts are planned as advanced features.',
      },
      {
        question: 'Can I print the cross-stitch grid?',
        answer:
          'Yes. Download the grid as a PNG and print it from your device or design software.',
      },
    ],
  },
];

export const landingToolPages = toolPages.filter((page) => page.path !== '/');

export function getToolPageByPath(path: string) {
  return toolPages.find((page) => page.path === path) ?? toolPages[0];
}
