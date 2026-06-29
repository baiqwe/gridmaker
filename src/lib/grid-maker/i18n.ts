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
        title: 'Cuadrícula para Dibujar Online - Gratis',
        description:
          'Añade una cuadrícula para dibujar sobre una foto online. Ajusta filas, columnas, color, opacidad y etiquetas sin subir la imagen.',
        h1: 'Cuadrícula para Dibujar Online',
        keywords:
          'cuadrícula para dibujar online, poner cuadrícula a foto, cuadricular imagen para dibujar',
        intro:
          'Añade una cuadrícula proporcional sobre una foto de referencia para dibujar, pintar, imprimir una guía o transferir proporciones a papel, lienzo o tablet.',
        bestFor: [
          'Referencias para retratos',
          'Cuadrículas imprimibles para dibujo',
          'Cuadricular una imagen sin subir archivos',
        ],
        faq: [
          {
            question: '¿Cómo poner una cuadrícula a una foto para dibujar?',
            answer:
              'Sube una foto, usa Overlay, ajusta filas y columnas y descarga la imagen con la cuadrícula aplicada.',
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
          {
            question: '¿Puedo imprimir la cuadrícula para dibujar?',
            answer:
              'Sí. Descarga el PNG con la cuadrícula y luego imprímelo desde tu dispositivo.',
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
    tools: {
      home: {
        navLabel: 'Início',
        eyebrow: 'Ferramenta privada de grade para imagens',
        title: 'Ferramenta de Grade Online: Grátis e Privada',
        description:
          'Use uma ferramenta de grade online para colocar grade em imagem, dividir fotos e criar guias de desenho. Grátis, privada, sem upload e sem marca d agua.',
        h1: 'Ferramenta de Grade Online Grátis',
        keywords:
          'ferramenta de grade, grade online, colocar grade em imagem, dividir imagem em grade',
        intro:
          'Use esta ferramenta de grade para colocar grade em uma imagem, dividir uma foto em partes, criar uma grade para desenho ou preparar uma referência de pixel art. Tudo roda localmente no navegador, então a imagem não é enviada para um servidor.',
        bestFor: [
          'Colocar grade em imagem online',
          'Dividir imagem em grade para redes sociais',
          'Guias para desenho, crochê e pixel art',
        ],
        faq: [
          {
            question: 'Esta ferramenta de grade é grátis?',
            answer:
              'Sim. As ferramentas principais de grade, divisão e download são gratuitas, sem marca d agua e sem cadastro.',
          },
          {
            question: 'Como colocar grade em uma imagem?',
            answer:
              'Envie a imagem, escolha Overlay, defina linhas e colunas e baixe o PNG com a grade aplicada.',
          },
          {
            question: 'Como dividir uma imagem em grade?',
            answer:
              'Use o modo Split, escolha a quantidade de linhas e colunas e baixe todas as partes em ZIP.',
          },
          {
            question: 'Minhas imagens são enviadas?',
            answer:
              'Não. As imagens são processadas no navegador com Canvas e não são enviadas para um servidor.',
          },
        ],
      },
      'instagram-grid-maker': {
        navLabel: 'Instagram',
        eyebrow: 'Criador de grade para Instagram',
        title: 'Criador de Grade para Instagram: 3x3 Grátis',
        description:
          'Divida qualquer foto em uma grade 3x3 para Instagram. Grátis, privado, sem cadastro, sem marca d agua e sem upload.',
        h1: 'Criador de Grade para Instagram',
        keywords:
          'instagram grid maker, grade instagram, dividir imagem instagram, mosaico instagram',
        intro:
          'Transforme uma imagem em uma grade limpa para Instagram sem criar conta e sem adicionar marca d agua. O preset 3x3 gera nove partes ordenadas prontas para postar.',
        bestFor: [
          'Mosaicos 3x3 para perfis',
          'Planejamento de carrossel',
          'Campanhas visuais sem marca d agua',
        ],
        faq: [
          {
            question: 'Como faço uma grade 3x3 para Instagram?',
            answer:
              'Envie a imagem, mantenha o preset de 3 linhas por 3 colunas, confira a prévia e baixe as partes geradas.',
          },
          {
            question: 'Posso baixar todas as partes de uma vez?',
            answer:
              'Sim. O botão ZIP salva todas as imagens juntas na ordem de publicação.',
          },
          {
            question: 'A ferramenta adiciona marca d agua?',
            answer:
              'Não. Os downloads não têm marca d agua e não exigem conta.',
          },
        ],
      },
      'drawing-grid-maker': {
        navLabel: 'Desenho',
        eyebrow: 'Grade de referência para desenho',
        title: 'Grade para Desenho: Adicione Grade a Foto',
        description:
          'Adicione uma grade personalizável a qualquer imagem. Ajuste linhas, colunas, cor, opacidade e etiquetas. Grátis e privado.',
        h1: 'Grade para Desenho Online',
        keywords:
          'grade para desenho, grid maker for drawing, adicionar grade a imagem',
        intro:
          'Adicione uma grade proporcional sobre uma foto de referência para desenhar, pintar ou transferir proporções com mais precisão.',
        bestFor: [
          'Referências para retratos',
          'Transferência para tela',
          'Guias de proporção para imprimir',
        ],
        faq: [
          {
            question: 'Posso adicionar uma grade a uma foto para desenho?',
            answer:
              'Sim. Envie uma foto, use o modo Overlay e ajuste linhas e colunas para combinar com sua superfície de desenho.',
          },
          {
            question: 'Posso mudar cor e opacidade da grade?',
            answer:
              'Sim. Você pode ajustar cor, espessura e opacidade antes de baixar.',
          },
          {
            question: 'Posso mostrar etiquetas na grade?',
            answer:
              'Sim. Ative as etiquetas para mostrar coordenadas simples como A1 ou B2.',
          },
        ],
      },
      'crochet-grid-maker': {
        navLabel: 'Crochê',
        eyebrow: 'Grade para crochê e artesanato',
        title: 'Grade de Crochê: Imagem para Grade',
        description:
          'Crie uma grade densa sobre uma imagem para crochê, ponto cruz e artesanato. Grátis, privado e sem upload.',
        h1: 'Grade de Crochê Online',
        keywords:
          'crochet grid maker, grade croche, imagem para grade croche, padrão croche',
        intro:
          'Crie uma grade densa sobre uma imagem para planejar crochê, ponto cruz, miçangas ou outros trabalhos manuais contados.',
        bestFor: [
          'Planejamento de padrões de crochê',
          'Referências para ponto cruz',
          'Grades densas para artesanato',
        ],
        faq: [
          {
            question: 'Posso criar uma grade densa para crochê?',
            answer:
              'Sim. Aumente linhas e colunas para criar uma grade fina para planejamento de artesanato.',
          },
          {
            question: 'A ferramenta converte cores em tabela de fios?',
            answer:
              'A primeira versão foca em grades limpas. Paletas de fios e extração de cores são recursos avançados futuros.',
          },
          {
            question: 'Posso baixar a imagem com grade?',
            answer:
              'Sim. Você pode baixar o resultado como PNG depois de ajustar as configurações.',
          },
        ],
      },
      'pixel-grid-maker': {
        navLabel: 'Pixel',
        eyebrow: 'Criador de grade pixel',
        title: 'Pixel Grid Maker: Pixelize Imagens Online',
        description:
          'Pixelize uma imagem e adicione uma grade clara para pixel art, artesanato e referências em blocos.',
        h1: 'Pixel Grid Maker Online',
        keywords:
          'pixel grid maker, grade pixel, pixel art grid maker, pixelizar imagem',
        intro:
          'Visualize uma imagem como uma grade de pixels para pixel art, artesanato e planejamento em blocos. Ajuste o tamanho da grade para controlar o detalhe.',
        bestFor: [
          'Referências de pixel art',
          'Prévia de imagem em blocos',
          'Grades de artesanato simplificadas',
        ],
        faq: [
          {
            question: 'Posso pixelizar uma imagem online?',
            answer:
              'Sim. O modo Pixel redesenha a imagem na resolução de grade escolhida e adiciona linhas limpas.',
          },
          {
            question: 'Posso escolher o tamanho da grade pixel?',
            answer:
              'Sim. Altere linhas e colunas para deixar a prévia mais simples ou mais detalhada.',
          },
          {
            question: 'A grade pixel é processada no servidor?',
            answer: 'Não. A prévia pixel é gerada localmente no seu navegador.',
          },
        ],
      },
      'add-grid-to-photo': {
        navLabel: 'Adicionar grade',
        eyebrow: 'Adicionar grade a foto online',
        title: 'Adicionar Grade a Foto: Grátis e Privado',
        description:
          'Adicione uma grade ajustável a qualquer foto. Mude linhas, colunas, cor, opacidade e etiquetas sem enviar a imagem.',
        h1: 'Adicionar Grade a Foto Online',
        keywords:
          'adicionar grade a foto, adicionar grade a imagem, grade sobre foto',
        intro:
          'Adicione linhas de grade sobre uma foto sem cortar a imagem em partes. É ideal para referências, aulas, design e comentários visuais.',
        bestFor: [
          'Grades sobre fotos',
          'Referências para imprimir',
          'Comentários com coordenadas',
        ],
        faq: [
          {
            question: 'Como adiciono uma grade a uma foto?',
            answer:
              'Envie a foto, use Overlay, ajuste linhas e colunas e baixe o PNG com a grade aplicada.',
          },
          {
            question: 'Posso mudar o estilo das linhas?',
            answer:
              'Sim. Você pode mudar cor, espessura, opacidade e etiquetas.',
          },
          {
            question: 'A foto é enviada ao servidor?',
            answer:
              'Não. A imagem é processada localmente no navegador com Canvas.',
          },
        ],
      },
      'cross-stitch-grid-maker': {
        navLabel: 'Ponto cruz',
        eyebrow: 'Grade para ponto cruz',
        title: 'Grade de Ponto Cruz: Foto para Grade',
        description:
          'Crie uma grade densa para ponto cruz a partir de uma foto. Grátis, privada e processada no navegador.',
        h1: 'Grade de Ponto Cruz Online',
        keywords:
          'cross stitch grid maker, grade ponto cruz, imagem para ponto cruz',
        intro:
          'Transforme uma imagem em uma referência de quadrados contados para ponto cruz, miçangas e artesanato baseado em blocos.',
        bestFor: [
          'Referências de ponto cruz',
          'Planejamento de artesanato contado',
          'Desenhos densos a partir de fotos',
        ],
        faq: [
          {
            question: 'Posso fazer uma grade de ponto cruz a partir de foto?',
            answer:
              'Sim. Envie uma foto, use uma grade densa e baixe a referência como PNG.',
          },
          {
            question: 'A ferramenta gera uma tabela completa de linhas?',
            answer:
              'A primeira versão foca na grade. Paletas de linha são um recurso avançado futuro.',
          },
          {
            question: 'Posso imprimir a grade?',
            answer: 'Sim. Baixe o PNG e imprima pelo seu dispositivo.',
          },
        ],
      },
    },
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
    tools: {
      home: {
        navLabel: 'ホーム',
        eyebrow: 'ブラウザで使えるプライベートな画像グリッドツール',
        title: 'Grid Maker Online: 無料画像グリッドツール',
        description:
          '画像グリッドの作成、Instagram 投稿の分割、描画用グリッドの追加をブラウザで行えます。無料、非公開、透かしなし、アップロードなし。',
        h1: '無料オンライン Grid Maker',
        keywords:
          'grid maker, 画像グリッド, グリッド作成, 画像分割, 写真グリッド',
        intro:
          'Grid Maker は、写真をタイルに分割したり、画像の上に見やすい参照グリッドを追加したりできるブラウザツールです。処理はすべて端末内で行われ、画像はサーバーへ送信されません。',
        bestFor: [
          'SNS 用の画像グリッド',
          '描画用の参照グリッド',
          '手芸やピクセルアートの下準備',
        ],
        faq: [
          {
            question: 'この Grid Maker は無料ですか？',
            answer:
              'はい。基本的なグリッド作成、画像分割、ダウンロード機能は無料で使えます。透かしや登録も不要です。',
          },
          {
            question: '画像はアップロードされますか？',
            answer:
              'いいえ。画像は Canvas を使ってブラウザ内で処理され、サーバーへ送信されません。',
          },
          {
            question: '画像を複数ファイルに分割できますか？',
            answer:
              'はい。Split モードで行数と列数を指定し、生成されたタイルを ZIP としてまとめて保存できます。',
          },
        ],
      },
      'instagram-grid-maker': {
        navLabel: 'Instagram',
        eyebrow: 'Instagram グリッドメーカー',
        title: 'Instagram Grid Maker: 無料 3x3 分割',
        description:
          '写真を Instagram 用の 3x3 グリッドに分割できます。無料、非公開、登録不要、透かしなし、アップロードなし。',
        h1: 'Instagram グリッドメーカー',
        keywords:
          'instagram grid maker, インスタ グリッド, Instagram 3x3, 画像分割 Instagram',
        intro:
          '1 枚の画像を Instagram プロフィール用のきれいなグリッドに変換できます。デフォルトの 3x3 プリセットで、投稿順に使える 9 枚のタイルを作成します。',
        bestFor: [
          'Instagram プロフィールの 3x3 モザイク',
          'カルーセル構成の下準備',
          '透かしなしのキャンペーン画像',
        ],
        faq: [
          {
            question: 'Instagram 用の 3x3 グリッドはどう作りますか？',
            answer:
              '画像をアップロードし、3 行 3 列のプリセットを使ってプレビューを確認し、生成されたタイルをダウンロードします。',
          },
          {
            question: 'すべてのタイルを一括保存できますか？',
            answer:
              'はい。ZIP ダウンロードで投稿順の画像をまとめて保存できます。',
          },
          {
            question: '透かしは入りますか？',
            answer:
              'いいえ。ダウンロード画像に透かしは入りません。アカウント登録も不要です。',
          },
        ],
      },
      'drawing-grid-maker': {
        navLabel: '描画',
        eyebrow: '描画用リファレンスグリッド',
        title: 'Drawing Grid Maker: 写真にグリッドを追加',
        description:
          '任意の画像に描画用グリッドを追加できます。行、列、色、不透明度、ラベルを調整可能。無料で非公開です。',
        h1: '描画用グリッドメーカー',
        keywords:
          'drawing grid maker, 描画 グリッド, 写真にグリッド, デッサン グリッド',
        intro:
          '参照写真の上に比例グリッドを追加し、デッサン、絵画、下描き転写の精度を高められます。',
        bestFor: ['人物画の参照', 'キャンバスへの転写', '印刷できる比率ガイド'],
        faq: [
          {
            question: '写真に描画用グリッドを追加できますか？',
            answer:
              'はい。写真をアップロードし、Overlay モードで行数と列数を調整できます。',
          },
          {
            question: 'グリッドの色や不透明度は変えられますか？',
            answer:
              'はい。ダウンロード前に線の色、太さ、不透明度を調整できます。',
          },
          {
            question: '座標ラベルを表示できますか？',
            answer:
              'はい。ラベルを有効にすると A1、B2 のような簡単な座標を表示できます。',
          },
        ],
      },
      'crochet-grid-maker': {
        navLabel: 'かぎ針編み',
        eyebrow: 'かぎ針編みと手芸用グリッド',
        title: 'Crochet Grid Maker: 画像から手芸グリッド',
        description:
          '画像の上に細かいグリッドを作成し、かぎ針編み、クロスステッチ、手芸の計画に使えます。無料でアップロード不要。',
        h1: 'かぎ針編みグリッドメーカー',
        keywords:
          'crochet grid maker, かぎ針編み グリッド, 画像から編み図, 手芸 グリッド',
        intro:
          '画像に細かいグリッドを重ねて、かぎ針編み、クロスステッチ、ビーズ作品などのカウントしやすい参照を作れます。',
        bestFor: [
          'かぎ針編みパターンの計画',
          'クロスステッチ参照',
          '細かい手芸グリッド',
        ],
        faq: [
          {
            question: 'かぎ針編み用の細かいグリッドを作れますか？',
            answer:
              'はい。行数と列数を増やすことで、手芸向けの細かいグリッドを作成できます。',
          },
          {
            question: '糸色の表に変換できますか？',
            answer:
              '初期版では見やすいグリッド作成に集中しています。糸色パレットは今後の高度な機能です。',
          },
          {
            question: 'グリッド付き画像を保存できますか？',
            answer:
              'はい。設定を調整した後、結果を PNG としてダウンロードできます。',
          },
        ],
      },
      'pixel-grid-maker': {
        navLabel: 'Pixel',
        eyebrow: 'ピクセルグリッドメーカー',
        title: 'Pixel Grid Maker: 画像をピクセル化',
        description:
          '画像をピクセル風に変換し、ピクセルアート、手芸、ブロック型の参照に使えるグリッドを追加します。',
        h1: 'Pixel Grid Maker Online',
        keywords:
          'pixel grid maker, ピクセル グリッド, pixel art grid maker, 画像 ピクセル化',
        intro:
          '画像をブロック状のピクセルグリッドとしてプレビューし、ピクセルアート、手芸、ブロック配置の計画に使えます。',
        bestFor: [
          'ピクセルアート参照',
          'ブロック状プレビュー',
          '簡略化した手芸グリッド',
        ],
        faq: [
          {
            question: '画像をオンラインでピクセル化できますか？',
            answer:
              'はい。Pixel モードは選択したグリッド解像度で画像を再描画し、見やすい線を重ねます。',
          },
          {
            question: 'ピクセルグリッドのサイズを選べますか？',
            answer:
              'はい。行数と列数を変えることで、粗いプレビューにも細かいプレビューにもできます。',
          },
          {
            question: 'サーバーで処理されますか？',
            answer:
              'いいえ。ピクセルプレビューはブラウザ内でローカルに生成されます。',
          },
        ],
      },
      'add-grid-to-photo': {
        navLabel: 'グリッド追加',
        eyebrow: '写真にグリッドを追加',
        title: '写真にグリッドを追加: 無料オンライン',
        description:
          '任意の写真に調整可能なグリッドを追加できます。行、列、色、不透明度、ラベルを画像アップロードなしで変更できます。',
        h1: '写真にグリッドを追加',
        keywords:
          '写真にグリッド, 画像にグリッド, グリッド オーバーレイ, 写真 グリッド',
        intro:
          '写真を分割せずに、上からグリッド線を重ねられます。参照、授業、デザイン確認、視覚的なフィードバックに便利です。',
        bestFor: [
          '写真へのグリッドオーバーレイ',
          '印刷用リファレンス',
          '座標付きの画像確認',
        ],
        faq: [
          {
            question: '写真にグリッドを追加するには？',
            answer:
              '写真をアップロードし、Overlay モードで行数と列数を調整して、グリッド付き PNG をダウンロードします。',
          },
          {
            question: '線のスタイルは変更できますか？',
            answer: 'はい。線の色、太さ、不透明度、座標ラベルを調整できます。',
          },
          {
            question: '元の写真はアップロードされますか？',
            answer:
              'いいえ。写真はブラウザ内で読み込まれ、Canvas でローカル処理されます。',
          },
        ],
      },
      'cross-stitch-grid-maker': {
        navLabel: 'クロスステッチ',
        eyebrow: 'クロスステッチ用グリッド',
        title: 'Cross Stitch Grid Maker: 写真をグリッド化',
        description:
          '写真からクロスステッチ用の細かいグリッドを作成します。無料、非公開、ブラウザ内処理です。',
        h1: 'クロスステッチグリッドメーカー',
        keywords:
          'cross stitch grid maker, クロスステッチ グリッド, 写真 クロスステッチ, 手芸 グリッド',
        intro:
          '写真を、クロスステッチ、ビーズ、ブロック型手芸に使えるカウントしやすい正方形グリッドに変換します。',
        bestFor: [
          'クロスステッチ参照',
          'カウント式手芸の計画',
          '写真から細かい図案作成',
        ],
        faq: [
          {
            question: '写真からクロスステッチ用グリッドを作れますか？',
            answer:
              'はい。写真をアップロードし、細かい行列数を選んで、参照画像を PNG として保存できます。',
          },
          {
            question: '刺しゅう糸の完全な色表を作れますか？',
            answer:
              'この MVP は正確なグリッド表示に集中しています。色表や糸パレットは今後の高度な機能です。',
          },
          {
            question: 'グリッドを印刷できますか？',
            answer:
              'はい。PNG をダウンロードし、端末やデザインソフトから印刷できます。',
          },
        ],
      },
    },
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
    tools: {
      home: {
        navLabel: '首页',
        eyebrow: '浏览器端私密图片网格工具',
        title: '在线 Grid Maker：免费图片网格工具',
        description:
          '在浏览器中创建图片网格、切分 Instagram 帖子、给照片添加绘画参考线。免费、私密、无水印、不上传。',
        h1: '免费在线 Grid Maker',
        keywords: 'grid maker,在线网格工具,图片网格,照片网格,图片切图',
        intro:
          '使用 Grid Maker 可以把一张照片切成多个图片块，也可以在任意图片上添加清晰的参考网格。所有处理都在浏览器本地完成，图片不会上传到服务器。',
        bestFor: ['快速制作社交媒体网格', '绘画参考网格', '手作和像素画规划'],
        faq: [
          {
            question: '这个 Grid Maker 免费吗？',
            answer:
              '免费。核心的加网格、切图和下载功能都可以免费使用，不加水印，也不需要注册。',
          },
          {
            question: '我的图片会被上传吗？',
            answer:
              '不会。图片通过 Canvas 在你的浏览器中处理，不会发送到服务器。',
          },
          {
            question: '可以把一张图片切成多个文件吗？',
            answer:
              '可以。选择 Split 模式，设置行数和列数，然后把所有图片块打包下载为 ZIP。',
          },
        ],
      },
      'instagram-grid-maker': {
        navLabel: 'Instagram',
        eyebrow: 'Instagram 九宫格切图工具',
        title: 'Instagram Grid Maker：免费 3x3 切图',
        description:
          '把任意照片切成 Instagram 3x3 九宫格。免费、私密、无需注册、无水印，图片只在浏览器中处理。',
        h1: 'Instagram 九宫格切图工具',
        keywords:
          'instagram grid maker,instagram 九宫格,ig 九宫格切图,instagram 图片切分',
        intro:
          '把一张图片转换成适合 Instagram 主页展示的九宫格，不需要账号，也不会添加水印。默认 3x3 预设会生成 9 张按顺序排列的图片块。',
        bestFor: [
          'Instagram 3x3 主页九宫格',
          '轮播图内容规划',
          '无水印活动视觉图',
        ],
        faq: [
          {
            question: '如何制作 Instagram 3x3 九宫格？',
            answer:
              '上传图片，保留 3 行 3 列预设，检查预览效果，然后下载生成的图片块。',
          },
          {
            question: '可以一次下载全部九宫格图片吗？',
            answer: '可以。点击 ZIP 下载按钮即可按发布顺序保存所有图片。',
          },
          {
            question: '下载图片会有水印吗？',
            answer: '不会。下载结果无水印，也不需要注册账号。',
          },
        ],
      },
      'drawing-grid-maker': {
        navLabel: '绘画',
        eyebrow: '绘画参考网格',
        title: '绘画网格工具：给照片添加参考线',
        description:
          '给任意图片添加可自定义的绘画网格。支持调整行列、颜色、透明度和坐标标签。免费且私密。',
        h1: '在线绘画网格工具',
        keywords: '绘画网格,grid maker for drawing,给图片加网格,照片参考线',
        intro:
          '在参考照片上添加比例网格，帮助绘画、临摹、转稿和构图定位。你可以在下载前调整网格密度、颜色、透明度和标签。',
        bestFor: ['肖像绘画参考', '画布转稿规划', '可打印比例参考图'],
        faq: [
          {
            question: '可以给照片添加绘画参考网格吗？',
            answer:
              '可以。上传照片，选择 Overlay 模式，然后根据画纸或画布调整行数和列数。',
          },
          {
            question: '可以调整网格颜色和透明度吗？',
            answer: '可以。下载前可以设置线条颜色、线宽和透明度。',
          },
          {
            question: '可以显示坐标标签吗？',
            answer: '可以。打开标签后会显示 A1、B2 这类简单坐标。',
          },
        ],
      },
      'crochet-grid-maker': {
        navLabel: '钩针',
        eyebrow: '钩针和手作网格',
        title: '钩针网格工具：图片转手作参考格',
        description:
          '在图片上创建细密网格，用于钩针、十字绣和手作规划。免费、不上传、浏览器本地处理。',
        h1: '在线钩针网格工具',
        keywords: 'crochet grid maker,钩针网格,图片转钩针图案,手作网格',
        intro:
          '在图片上叠加细密网格，用于规划钩针、十字绣、串珠或其他需要按格计数的手作项目。',
        bestFor: ['钩针图案规划', '十字绣参考图', '高密度手作网格'],
        faq: [
          {
            question: '可以创建细密的钩针网格吗？',
            answer: '可以。提高行数和列数，就能生成适合手作规划的细密网格。',
          },
          {
            question: '能把颜色转换成毛线色号表吗？',
            answer:
              '第一版专注于清晰网格。颜色提取和毛线色板属于后续高级功能。',
          },
          {
            question: '可以下载钩针网格图片吗？',
            answer: '可以。调整设置后，可以把结果下载为 PNG。',
          },
        ],
      },
      'pixel-grid-maker': {
        navLabel: '像素',
        eyebrow: '像素网格工具',
        title: 'Pixel Grid Maker：在线图片像素化',
        description:
          '把图片像素化并添加清晰网格，适合像素画、手作和方块式参考图。',
        h1: '在线 Pixel Grid Maker',
        keywords: 'pixel grid maker,像素网格,像素画网格,图片像素化',
        intro:
          '把图片预览成方块状像素网格，用于像素画、手作和块状布局规划。调整网格尺寸即可控制细节程度。',
        bestFor: ['像素画参考', '方块化图片预览', '简化细节的手作网格'],
        faq: [
          {
            question: '可以在线把图片像素化吗？',
            answer:
              '可以。Pixel 模式会按照你选择的网格分辨率重绘图片，并叠加清晰网格线。',
          },
          {
            question: '可以选择像素网格大小吗？',
            answer: '可以。调整行数和列数即可让预览更粗略或更细致。',
          },
          {
            question: '像素网格会在服务器处理吗？',
            answer: '不会。像素预览会在你的浏览器本地生成。',
          },
        ],
      },
      'add-grid-to-photo': {
        navLabel: '加网格',
        eyebrow: '给照片添加网格',
        title: '给照片加网格：免费在线工具',
        description:
          '给任意照片添加可调网格。无需上传图片，即可修改行列、颜色、透明度和坐标标签。',
        h1: '在线给照片加网格',
        keywords: '给照片加网格,给图片加网格,照片网格覆盖,图片参考网格',
        intro:
          '在不切分图片的情况下，把网格线叠加到照片上。适合参考图、课堂讲义、设计检查和视觉反馈。',
        bestFor: ['照片网格覆盖', '可打印参考图', '带坐标的图片反馈'],
        faq: [
          {
            question: '如何给照片添加网格？',
            answer:
              '上传照片，使用 Overlay 模式，调整行数和列数，然后下载带网格的 PNG。',
          },
          {
            question: '可以改变网格线样式吗？',
            answer: '可以。你可以调整线条颜色、线宽、透明度和坐标标签。',
          },
          {
            question: '原始照片会上传吗？',
            answer: '不会。照片会在浏览器中加载，并通过 Canvas 本地处理。',
          },
        ],
      },
      'cross-stitch-grid-maker': {
        navLabel: '十字绣',
        eyebrow: '十字绣网格工具',
        title: '十字绣网格工具：照片转网格',
        description:
          '从照片创建细密十字绣参考网格。免费、私密、浏览器本地处理。',
        h1: '在线十字绣网格工具',
        keywords: 'cross stitch grid maker,十字绣网格,照片转十字绣,手作网格',
        intro: '把照片转换成适合十字绣、串珠和方块类手作的计数网格参考图。',
        bestFor: ['十字绣参考网格', '按格计数的手作规划', '从照片生成细密图案'],
        faq: [
          {
            question: '可以从照片制作十字绣网格吗？',
            answer:
              '可以。上传照片，选择较密的行列数，然后把参考图下载为 PNG。',
          },
          {
            question: '会生成完整绣线颜色表吗？',
            answer:
              '当前 MVP 专注于准确的网格叠加。颜色表和绣线色板属于后续高级功能。',
          },
          {
            question: '可以打印十字绣网格吗？',
            answer: '可以。下载 PNG 后，可以从设备或设计软件中打印。',
          },
        ],
      },
    },
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleConfig(locale: Locale) {
  return localeConfigs[locale];
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
