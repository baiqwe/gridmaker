import {
  landingToolPages,
  toolPages,
  type ToolPageConfig,
} from '@/lib/grid-maker/tool-pages';

export type Locale = 'es' | 'pt' | 'ja' | 'zh';

export type ToolPageCopy = {
  homeLabel: string;
  bestForLabel: string;
  privacyNote: string;
  aboutHeading: string;
  workflowParagraph: string;
  privacyParagraph: string;
  relatedToolsLabel: string;
  faqHeading: string;
  loadingLabel: string;
};

type LocalizedToolCopy = Pick<
  ToolPageConfig,
  | 'navLabel'
  | 'eyebrow'
  | 'title'
  | 'description'
  | 'h1'
  | 'keywords'
  | 'intro'
  | 'bestFor'
  | 'faq'
>;

type LocaleConfig = {
  name: string;
  htmlLang: string;
  slugs: Record<string, string>;
  pageCopy: ToolPageCopy;
  tools: Record<string, LocalizedToolCopy>;
};

export const locales: Locale[] = ['es', 'pt', 'ja', 'zh'];

const localeConfigs: Record<Locale, LocaleConfig> = {
  es: {
    name: 'Español',
    htmlLang: 'es',
    slugs: {
      home: '',
      'instagram-grid-maker': 'creador-cuadricula-instagram',
      'drawing-grid-maker': 'cuadricula-para-dibujar',
      'crochet-grid-maker': 'cuadricula-crochet',
      'pixel-grid-maker': 'cuadricula-pixel',
      'add-grid-to-photo': 'agregar-cuadricula-a-foto',
      'cross-stitch-grid-maker': 'cuadricula-punto-de-cruz',
    },
    pageCopy: {
      homeLabel: 'Grid Maker',
      bestForLabel: 'Ideal para',
      privacyNote:
        'Sin subidas. Sin marca de agua. Sin registro. La imagen se procesa en tu navegador.',
      aboutHeading: 'Sobre esta herramienta',
      workflowParagraph:
        'El flujo es simple: sube una imagen, elige el estilo de cuadrícula, ajusta filas y columnas y descarga el resultado. En modo dividir, cada pieza se genera localmente y se agrupa en un archivo ZIP.',
      privacyParagraph:
        'Como el procesamiento ocurre en el navegador, el sitio se mantiene rápido en Cloudflare Workers y evita almacenar imágenes en el servidor.',
      relatedToolsLabel: 'Herramientas relacionadas',
      faqHeading: 'Preguntas frecuentes',
      loadingLabel: 'Cargando herramientas de imagen...',
    },
    tools: {
      home: {
        navLabel: 'Inicio',
        eyebrow: 'Herramienta privada de cuadrículas para imágenes',
        title: 'Grid Maker Online Gratis - Sin Marca de Agua ni Registro',
        description:
          'Crea cuadrículas, divide imágenes para redes sociales y añade guías para dibujo en tu navegador. Gratis, privado y sin subir archivos.',
        h1: 'Grid Maker Online Gratis',
        keywords:
          'grid maker, creador de cuadriculas, cuadrícula online, dividir imagen',
        intro:
          'Usa Grid Maker para dividir una foto en piezas o añadir una cuadrícula limpia sobre cualquier imagen. Todo funciona localmente en tu navegador.',
        bestFor: [
          'Cuadrículas rápidas para redes sociales',
          'Guías de referencia para dibujo',
          'Planificación de manualidades y pixel art',
        ],
        faq: [
          {
            question: '¿Grid Maker es gratis?',
            answer:
              'Sí. Las funciones principales de cuadrícula, división y descarga son gratis, sin marca de agua y sin registro.',
          },
          {
            question: '¿Se suben mis imágenes?',
            answer:
              'No. Las imágenes se procesan en tu navegador con Canvas y no se envían a un servidor.',
          },
          {
            question: '¿Puedo dividir una imagen en varios archivos?',
            answer:
              'Sí. Usa el modo Split, define filas y columnas y descarga las piezas en un ZIP.',
          },
        ],
      },
      'instagram-grid-maker': {
        navLabel: 'Instagram',
        eyebrow: 'Creador de cuadrícula para Instagram',
        title:
          'Creador de Cuadrícula para Instagram Gratis - Sin Marca de Agua',
        description:
          'Divide cualquier foto en una cuadrícula 3x3 para Instagram. Gratis, privado, sin registro y sin subir imágenes.',
        h1: 'Creador de Cuadrícula para Instagram',
        keywords:
          'instagram grid maker, cuadrícula instagram, dividir imagen instagram',
        intro:
          'Convierte una imagen en una cuadrícula limpia para Instagram sin crear cuenta ni añadir marca de agua.',
        bestFor: [
          'Cuadrículas 3x3 para perfiles',
          'Planificación de carruseles',
          'Campañas visuales sin marca de agua',
        ],
        faq: [
          {
            question: '¿Cómo hago una cuadrícula 3x3 para Instagram?',
            answer:
              'Sube tu imagen, deja el preset de 3 filas por 3 columnas y descarga las piezas generadas.',
          },
          {
            question: '¿Puedo descargar todas las piezas a la vez?',
            answer:
              'Sí. El botón ZIP descarga todas las imágenes en orden de publicación.',
          },
          {
            question: '¿Añade marca de agua?',
            answer:
              'No. Las descargas no tienen marca de agua ni requieren cuenta.',
          },
        ],
      },
      'drawing-grid-maker': {
        navLabel: 'Dibujo',
        eyebrow: 'Cuadrícula de referencia para dibujo',
        title: 'Cuadrícula para Dibujar Online - Añade Guías a una Foto',
        description:
          'Añade una cuadrícula personalizable a cualquier imagen. Ajusta filas, columnas, color, opacidad y etiquetas.',
        h1: 'Cuadrícula para Dibujar Online',
        keywords:
          'cuadrícula para dibujar, grid maker for drawing, añadir cuadrícula a imagen',
        intro:
          'Añade una cuadrícula proporcional sobre una foto de referencia para dibujar, pintar o transferir proporciones.',
        bestFor: [
          'Referencias para retratos',
          'Transferencia a lienzo',
          'Guías imprimibles de proporción',
        ],
        faq: [
          {
            question: '¿Puedo añadir una cuadrícula a una foto?',
            answer:
              'Sí. Sube una foto, usa Overlay y ajusta filas y columnas según tu superficie de dibujo.',
          },
          {
            question: '¿Puedo cambiar color y opacidad?',
            answer:
              'Sí. Puedes ajustar color, grosor y opacidad antes de descargar.',
          },
          {
            question: '¿Puedo mostrar etiquetas?',
            answer:
              'Sí. Activa las etiquetas para mostrar coordenadas simples como A1 o B2.',
          },
        ],
      },
      'crochet-grid-maker': {
        navLabel: 'Crochet',
        eyebrow: 'Cuadrícula para crochet y manualidades',
        title: 'Cuadrícula Crochet Online - Crea Patrones desde Imágenes',
        description:
          'Crea una cuadrícula densa sobre una imagen para crochet, punto de cruz y manualidades. Gratis y sin subir archivos.',
        h1: 'Cuadrícula Crochet Online',
        keywords:
          'crochet grid maker, cuadrícula crochet, patrón crochet desde imagen',
        intro:
          'Crea una cuadrícula densa sobre una imagen para planificar crochet, punto de cruz, cuentas u otras manualidades.',
        bestFor: [
          'Patrones de crochet',
          'Referencias de punto de cruz',
          'Cuadrículas densas para manualidades',
        ],
        faq: [
          {
            question: '¿Puedo crear una cuadrícula densa para crochet?',
            answer:
              'Sí. Aumenta filas y columnas para crear una cuadrícula fina.',
          },
          {
            question: '¿Convierte colores en paletas de hilo?',
            answer:
              'La primera versión se centra en cuadrículas limpias. Las paletas avanzadas llegarán después.',
          },
          {
            question: '¿Puedo descargar la imagen con cuadrícula?',
            answer: 'Sí. Puedes descargar el resultado como PNG.',
          },
        ],
      },
      'pixel-grid-maker': {
        navLabel: 'Pixel',
        eyebrow: 'Creador de cuadrícula pixel',
        title: 'Pixel Grid Maker Online - Pixeliza Imágenes con Cuadrícula',
        description:
          'Pixeliza una imagen y añade una cuadrícula clara para pixel art, manualidades y diseños por bloques.',
        h1: 'Pixel Grid Maker Online',
        keywords: 'pixel grid maker, cuadrícula pixel, pixel art grid maker',
        intro:
          'Previsualiza una imagen como cuadrícula de píxeles para pixel art, manualidades y planificación por bloques.',
        bestFor: [
          'Referencias de pixel art',
          'Vistas por bloques',
          'Manualidades con detalle simplificado',
        ],
        faq: [
          {
            question: '¿Puedo pixelizar una imagen online?',
            answer:
              'Sí. El modo Pixel redibuja la imagen con la resolución de cuadrícula elegida.',
          },
          {
            question: '¿Puedo elegir el tamaño de la cuadrícula?',
            answer:
              'Sí. Cambia filas y columnas para controlar el nivel de detalle.',
          },
          {
            question: '¿Se procesa en el servidor?',
            answer: 'No. La vista pixel se genera localmente en tu navegador.',
          },
        ],
      },
      'add-grid-to-photo': {
        navLabel: 'Añadir cuadrícula',
        eyebrow: 'Añade una cuadrícula a una foto',
        title: 'Añadir Cuadrícula a Foto Online - Gratis y Privado',
        description:
          'Añade una cuadrícula ajustable a cualquier foto. Cambia filas, columnas, color, opacidad y etiquetas sin subir la imagen.',
        h1: 'Añadir Cuadrícula a Foto Online',
        keywords:
          'añadir cuadrícula a foto, agregar cuadrícula a imagen, cuadrícula sobre foto',
        intro:
          'Añade líneas de cuadrícula sobre una foto sin cortar la imagen en piezas. Es ideal para referencias, clases, diseño y comentarios visuales.',
        bestFor: [
          'Cuadrículas sobre fotos',
          'Referencias imprimibles',
          'Comentarios con coordenadas',
        ],
        faq: [
          {
            question: '¿Cómo añado una cuadrícula a una foto?',
            answer:
              'Sube la foto, usa Overlay, ajusta filas y columnas y descarga el PNG con la cuadrícula aplicada.',
          },
          {
            question: '¿Puedo cambiar el estilo de las líneas?',
            answer: 'Sí. Puedes cambiar color, grosor, opacidad y etiquetas.',
          },
          {
            question: '¿La foto se sube al servidor?',
            answer:
              'No. La imagen se procesa localmente en tu navegador con Canvas.',
          },
        ],
      },
      'cross-stitch-grid-maker': {
        navLabel: 'Punto de cruz',
        eyebrow: 'Cuadrícula para punto de cruz',
        title: 'Cuadrícula Punto de Cruz Online - Desde una Foto',
        description:
          'Crea una cuadrícula densa para punto de cruz desde una imagen. Gratis, privada y sin subir archivos.',
        h1: 'Cuadrícula Punto de Cruz Online',
        keywords:
          'cross stitch grid maker, cuadrícula punto de cruz, imagen a punto de cruz',
        intro:
          'Convierte una imagen en una referencia de cuadros contados para punto de cruz, cuentas y manualidades por bloques.',
        bestFor: [
          'Referencias de punto de cruz',
          'Planificación de manualidades contadas',
          'Diseños densos desde fotos',
        ],
        faq: [
          {
            question:
              '¿Puedo hacer una cuadrícula de punto de cruz desde una foto?',
            answer:
              'Sí. Sube una foto, usa una cuadrícula densa y descarga la referencia como PNG.',
          },
          {
            question: '¿Genera una tabla completa de hilos?',
            answer:
              'La primera versión se centra en la cuadrícula. Las paletas de hilo son una función avanzada futura.',
          },
          {
            question: '¿Puedo imprimir la cuadrícula?',
            answer:
              'Sí. Descarga el PNG y luego imprímelo desde tu dispositivo.',
          },
        ],
      },
    },
  },
  pt: {
    name: 'Português',
    htmlLang: 'pt',
    slugs: {
      home: '',
      'instagram-grid-maker': 'criador-grade-instagram',
      'drawing-grid-maker': 'grade-para-desenho',
      'crochet-grid-maker': 'grade-croche',
      'pixel-grid-maker': 'grade-pixel',
      'add-grid-to-photo': 'adicionar-grade-a-foto',
      'cross-stitch-grid-maker': 'grade-ponto-cruz',
    },
    pageCopy: {
      homeLabel: 'Grid Maker',
      bestForLabel: 'Ideal para',
      privacyNote:
        'Sem upload. Sem marca d agua. Sem cadastro. A imagem fica no seu navegador.',
      aboutHeading: 'Sobre esta ferramenta',
      workflowParagraph:
        'O fluxo é simples: envie uma imagem, escolha o tipo de grade, ajuste linhas e colunas e baixe o resultado. No modo de corte, os arquivos são gerados localmente e reunidos em ZIP.',
      privacyParagraph:
        'Como o processamento acontece no navegador, o site fica rápido em Cloudflare Workers e evita armazenar imagens no servidor.',
      relatedToolsLabel: 'Ferramentas relacionadas',
      faqHeading: 'Perguntas frequentes',
      loadingLabel: 'Carregando ferramentas de imagem...',
    },
    tools: {},
  },
  ja: {
    name: '日本語',
    htmlLang: 'ja',
    slugs: {
      home: '',
      'instagram-grid-maker': 'instagram-grid-maker',
      'drawing-grid-maker': 'drawing-grid-maker',
      'crochet-grid-maker': 'crochet-grid-maker',
      'pixel-grid-maker': 'pixel-grid-maker',
      'add-grid-to-photo': 'add-grid-to-photo',
      'cross-stitch-grid-maker': 'cross-stitch-grid-maker',
    },
    pageCopy: {
      homeLabel: 'Grid Maker',
      bestForLabel: 'おすすめ用途',
      privacyNote:
        'アップロードなし。透かしなし。登録不要。画像処理はブラウザ内で完結します。',
      aboutHeading: 'このツールについて',
      workflowParagraph:
        '画像をアップロードし、グリッドの種類を選び、行と列を調整してダウンロードできます。分割モードではタイルをローカルで生成し、ZIP にまとめます。',
      privacyParagraph:
        '処理はブラウザ内で行われるため、Cloudflare Workers 上でも高速で、サーバーに画像を保存しません。',
      relatedToolsLabel: '関連ツール',
      faqHeading: 'よくある質問',
      loadingLabel: '画像ツールを読み込んでいます...',
    },
    tools: {},
  },
  zh: {
    name: '中文',
    htmlLang: 'zh-Hans',
    slugs: {
      home: '',
      'instagram-grid-maker': 'instagram-grid-maker',
      'drawing-grid-maker': 'drawing-grid-maker',
      'crochet-grid-maker': 'crochet-grid-maker',
      'pixel-grid-maker': 'pixel-grid-maker',
      'add-grid-to-photo': 'add-grid-to-photo',
      'cross-stitch-grid-maker': 'cross-stitch-grid-maker',
    },
    pageCopy: {
      homeLabel: 'Grid Maker',
      bestForLabel: '适合场景',
      privacyNote: '不上传图片。无水印。无需注册。图片处理全部在浏览器中完成。',
      aboutHeading: '关于这个工具',
      workflowParagraph:
        '使用流程很简单：上传图片，选择网格样式，调整行列数量，然后下载结果。切图模式会在本地生成图片块并打包成 ZIP。',
      privacyParagraph:
        '由于处理发生在浏览器中，网站可以保持快速，同时避免在服务器上存储你的图片。',
      relatedToolsLabel: '相关工具',
      faqHeading: '常见问题',
      loadingLabel: '正在加载图片工具...',
    },
    tools: {},
  },
};

function withFallbackTools(locale: Locale): LocaleConfig {
  const config = localeConfigs[locale];
  if (Object.keys(config.tools).length > 0) return config;

  const translatedPrefix =
    locale === 'pt'
      ? {
          title: 'Grátis e privado',
          desc: 'Use esta ferramenta no navegador, sem upload e sem marca d agua.',
        }
      : locale === 'ja'
        ? {
            title: '無料・プライベート',
            desc: 'ブラウザ内で画像を処理し、アップロードや透かしはありません。',
          }
        : {
            title: '免费且私密',
            desc: '在浏览器中处理图片，不上传服务器，无水印。',
          };

  const tools = Object.fromEntries(
    toolPages.map((page) => [
      page.slug,
      {
        navLabel: page.navLabel,
        eyebrow:
          locale === 'zh'
            ? `${page.navLabel} 工具`
            : locale === 'ja'
              ? `${page.navLabel} ツール`
              : page.eyebrow,
        title: `${page.h1} - ${translatedPrefix.title}`,
        description: `${page.description} ${translatedPrefix.desc}`,
        h1: page.h1,
        keywords: page.keywords,
        intro:
          locale === 'zh'
            ? `${page.intro} 这个页面提供本地化说明，并保持图片在浏览器中处理。`
            : locale === 'ja'
              ? `${page.intro} このページではローカライズされた説明を提供し、画像処理はブラウザ内で完結します。`
              : page.intro,
        bestFor: page.bestFor,
        faq: page.faq,
      },
    ])
  ) as Record<string, LocalizedToolCopy>;

  return { ...config, tools };
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleConfig(locale: Locale) {
  return withFallbackTools(locale);
}

export function getLocalizedToolPages(locale: Locale): ToolPageConfig[] {
  const config = getLocaleConfig(locale);
  return toolPages.map((page) => ({
    ...page,
    ...config.tools[page.slug],
    path: getLocalizedPath(locale, page.slug),
  }));
}

export function getLocalizedToolPage(locale: Locale, slug: string) {
  return getLocalizedToolPages(locale).find((page) => page.slug === slug);
}

export function getLocalizedPath(locale: Locale, pageSlug: string) {
  const slug = getLocaleConfig(locale).slugs[pageSlug];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function getPageSlugByLocalizedSlug(locale: Locale, localizedSlug = '') {
  const normalized = localizedSlug.replace(/^\/+|\/+$/g, '');
  const entries = Object.entries(getLocaleConfig(locale).slugs);
  return entries.find(([, slug]) => slug === normalized)?.[0];
}

export function getDefaultPath(pageSlug: string) {
  return toolPages.find((page) => page.slug === pageSlug)?.path ?? '/';
}

export function getHreflangLinks(pageSlug: string) {
  return [
    { lang: 'x-default', path: getDefaultPath(pageSlug) },
    { lang: 'en', path: getDefaultPath(pageSlug) },
    ...locales.map((locale) => ({
      lang: getLocaleConfig(locale).htmlLang,
      path: getLocalizedPath(locale, pageSlug),
    })),
  ];
}

export function getLocalizedLandingToolPages(locale: Locale) {
  return getLocalizedToolPages(locale).filter(
    (page) => page.path !== `/${locale}`
  );
}

export { localeConfigs };
