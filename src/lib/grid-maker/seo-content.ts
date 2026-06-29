import type { Locale } from '@/lib/grid-maker/i18n';

export type SeoContentSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type ToolSeoContent = {
  what: SeoContentSection;
  how: SeoContentSection;
  why: SeoContentSection;
  tips: SeoContentSection;
};

const sharedPrivacy =
  'All processing happens in your browser. The image is loaded into a local canvas, adjusted there, and exported from your device. That keeps the workflow fast on Cloudflare Workers and avoids sending personal photos, client artwork, campaign assets, or craft references to a remote image-processing server.';

const enContent: Record<string, ToolSeoContent> = {
  home: {
    what: {
      title: 'What is an online grid maker?',
      paragraphs: [
        'An online grid maker is a browser tool for turning a regular image into a structured reference. Depending on the mode you choose, it can split one image into several separate tiles, draw grid lines over the original image, or simplify a picture into a blocky pixel-style preview. That makes it useful for social media layouts, drawing references, crochet planning, cross-stitch charts, pixel art, and any workflow where a picture needs clear rows and columns.',
        'This tool is designed as a practical canvas workspace rather than a gallery or template library. You upload an image, decide whether you need a split grid, an overlay grid, or a pixel grid, then tune rows, columns, line color, opacity, and labels. The same engine powers each focused page, but the presets are tuned for different search intents so an Instagram creator, a portrait artist, and a craft maker do not have to start from a blank configuration.',
        'People use different names for the same job: grid maker, image grid maker, photo grid maker, grid tool, grid creator, or online grid maker. This page intentionally covers all of those basic workflows in one place so you can start from the broad tool and then move into a focused Instagram, drawing, crochet, cross-stitch, or pixel grid page when the task becomes more specific.',
        sharedPrivacy,
      ],
    },
    how: {
      title: 'How to use Grid Maker',
      items: [
        'Upload a JPG, PNG, or WebP image from your device.',
        'Choose Split mode when you need separate tiles, Overlay mode when you need guide lines, or Pixel mode when you want a block-based preview.',
        'Set the number of rows and columns. Small grids work well for social posts; dense grids work better for crafts and drawing references.',
        'Adjust line color, thickness, opacity, and labels so the grid is visible without hiding important details.',
        'Preview the result in the canvas. If the image looks too busy, reduce opacity or use a lighter line color.',
        'Use the related tool links when you need a tuned workflow, such as a pixel art grid, drawing grid, or Instagram 3x3 split.',
        'Download the final PNG, or use ZIP download on split-grid pages when you need every tile at once.',
      ],
    },
    why: {
      title: 'Why creators use a grid before exporting',
      paragraphs: [
        'A grid removes guesswork. Instead of relying on memory or freehand proportion, you can compare each part of the image with a visible row and column. For drawing, that helps transfer shapes more accurately. For social media, it helps preview how a single image will break across multiple posts. For crafts, it gives you a repeatable square structure that is easier to count and mark.',
        'The biggest advantage is speed. Traditional desktop editors can do the same work, but they often require layers, guides, export settings, and manual slicing. A focused grid maker turns that into a few controls. It also avoids account creation and watermark limitations, which matters when you only need to prepare one image quickly.',
      ],
    },
    tips: {
      title: 'Practical grid settings',
      items: [
        'Use 3x3 for Instagram profile mosaics and 3x1 or 1x3 for simple carousel planning.',
        'Use 4x5 or 5x4 when you need a portrait-style photo grid or worksheet layout.',
        'Use 8x8, 10x10, or 12x12 for most drawing references because the cells stay readable.',
        'Use 16x16, 24x24, or 32x32 for pixel art grids and icon-style block previews.',
        'Use 30x30, 40x40, or denser grids for crochet, cross-stitch, beadwork, and craft planning.',
        'Turn labels on when you need to discuss a reference with someone else, such as “adjust the shape in C4.”',
      ],
    },
  },
  'instagram-grid-maker': {
    what: {
      title: 'What is an Instagram grid maker?',
      paragraphs: [
        'An Instagram grid maker splits one image into ordered tiles that can be posted separately to create a larger picture on a profile grid or used as a structured carousel concept. The most common layout is 3x3 because Instagram profiles display posts in three columns, but smaller layouts can also work for announcements, product reveals, portfolio teasers, and campaign visuals.',
        'The goal is not only to cut an image. A good Instagram grid workflow helps you keep the tiles in the right order, preserve image quality, and avoid adding watermarks or unnecessary compression. This page starts with a 3x3 split preset so a creator can upload one image and quickly export nine pieces that line up cleanly when posted in sequence.',
        'You can also use the preview as an Instagram crop grid online. Before downloading, check whether text, faces, logos, or product details are split across tile borders. That small review step prevents the most common problem with profile mosaics: a large image that looks good as a whole but confusing as separate posts.',
        sharedPrivacy,
      ],
    },
    how: {
      title: 'How to make a 3x3 grid for Instagram',
      items: [
        'Start with a high-resolution square or portrait image so the final tiles remain sharp.',
        'Upload the image and keep the default 3 rows by 3 columns preset.',
        'Preview the crop and make sure faces, text, and product details do not land awkwardly on tile edges.',
        'Download the ZIP so every tile is saved together in the correct order.',
        'Post the last tile first and the first tile last if you want the full image to appear in the correct profile order.',
        'Use the crop preview before posting to make sure important details stay readable inside individual tiles.',
        'Check the profile after posting because captions, pinned posts, and deleted posts can shift the visual grid.',
      ],
    },
    why: {
      title: 'Why Instagram grids still work',
      paragraphs: [
        'A profile grid is useful when the image itself is the message: a launch poster, a travel photo, a product collection, a music release, or a visual campaign. It creates a stronger first impression than a single post because visitors see the complete composition when they open the profile. It can also make older posts feel connected instead of scattered.',
        'The risk is that each individual tile may look incomplete in the feed. That is why planning matters. Place important text and faces near the center of each tile when possible, and avoid tiny typography that becomes unreadable after splitting. If the image contains words, test the split before posting so letters are not cut in a confusing way.',
      ],
    },
    tips: {
      title: 'Instagram grid tips',
      items: [
        'Keep the original image simple; busy collages become hard to read after splitting.',
        'Avoid placing small text directly across tile borders.',
        'Use a 3x1 split for panoramic carousel concepts and a 3x3 split for profile mosaics.',
        'Save the ZIP before editing captions so the tile order stays predictable.',
      ],
    },
  },
  'drawing-grid-maker': {
    what: {
      title: 'What is a drawing grid maker?',
      paragraphs: [
        'A drawing grid maker adds rows and columns over a reference photo so an artist can compare proportions one small section at a time. The method is common for portraits, animals, architecture, still life, and any subject where scale and placement matter. Instead of trying to copy the whole image at once, you transfer what appears inside each square.',
        'This page is tuned for overlay work rather than cutting the image apart. You can choose the number of rows and columns, adjust line opacity, change the color, and add coordinate labels. Labels are useful when you are working from a printed reference or discussing corrections because each part of the image has a simple address.',
        sharedPrivacy,
      ],
    },
    how: {
      title: 'How to add a grid for drawing',
      items: [
        'Upload the reference photo you want to draw from.',
        'Start with 8x8 or 10x10 for portraits and general sketching.',
        'Match the same grid ratio on your paper, canvas, tablet layer, or worksheet.',
        'Lower the grid opacity if the lines distract from shadows and edges.',
        'Turn labels on when you want easy references such as A1, B2, or C4.',
        'Download the gridded image and keep the original nearby for final detail checks.',
      ],
    },
    why: {
      title: 'Why a grid improves drawing accuracy',
      paragraphs: [
        'Drawing from a grid trains the eye to measure relationships. You can compare where an eye sits inside one square, how a jawline crosses another square, or how much negative space appears around an object. This reduces the common problem of drawing one feature too large and then adjusting the entire sketch around that mistake.',
        'A grid also makes complex references less intimidating. Beginners can use it to build confidence, while experienced artists can use it to speed up layout before moving into freehand refinement. The grid is not meant to replace observation; it is a scaffold that helps you place major shapes before committing to detail.',
      ],
    },
    tips: {
      title: 'Drawing grid tips',
      items: [
        'Use fewer cells for loose sketching and more cells for realistic detail.',
        'Choose a red, blue, or white line if black disappears into the photo.',
        'Keep the grid ratio consistent between the photo and drawing surface.',
        'Erase or hide the construction grid after the main proportions are complete.',
      ],
    },
  },
  'crochet-grid-maker': {
    what: {
      title: 'What is a crochet grid maker?',
      paragraphs: [
        'A crochet grid maker places a dense square grid over an image so a maker can plan color blocks, stitches, or motif placement. It is useful for graphghan planning, tapestry crochet references, corner-to-corner ideas, bead crochet, and other craft projects where a picture needs to be interpreted as counted squares.',
        'This tool focuses on the first planning step: creating a clear visual grid from an image. It does not yet replace a full yarn chart with color counts, but it gives you a private way to test whether an image will work as a counted pattern. If the subject becomes unreadable at a dense grid size, you can simplify the image before committing to a long project.',
        sharedPrivacy,
      ],
    },
    how: {
      title: 'How to make a crochet grid from an image',
      items: [
        'Choose a reference image with strong shapes and limited tiny details.',
        'Upload it and start with a dense grid such as 30x30 or 40x40.',
        'Use thin lines and moderate opacity so the image remains visible under the grid.',
        'Zoom in before downloading to check whether important shapes still read clearly.',
        'Download the gridded PNG and mark colors or stitch notes in your preferred craft app.',
        'For large projects, test a small swatch before scaling the whole pattern.',
      ],
    },
    why: {
      title: 'Why crochet projects need planning grids',
      paragraphs: [
        'Crochet projects can take many hours, so a poor reference choice becomes expensive quickly. A grid preview helps you decide whether a photo has enough contrast, whether the shape fits the intended square count, and whether the final design will still look recognizable after being translated into stitches.',
        'A browser grid also lets you experiment before committing to yarn. You can try different row and column counts, adjust visibility, and compare versions. This is especially helpful for handmade gifts, logos, pets, portraits, or fandom designs where the subject needs to be recognizable from a distance.',
      ],
    },
    tips: {
      title: 'Crochet grid tips',
      items: [
        'Use high contrast references; subtle gradients are harder to translate into yarn.',
        'Start with fewer colors than the original photo to keep the project manageable.',
        'Use a square crop when the final project will be square.',
        'Print or save a backup before marking stitch notes on the image.',
      ],
    },
  },
  'pixel-grid-maker': {
    what: {
      title: 'What is a pixel grid maker?',
      paragraphs: [
        'A pixel grid maker converts a photo or illustration into a block-based preview with visible cells. It helps you see how an image might look as pixel art, a mosaic, a bead pattern, a block build, or a simplified craft layout. Instead of keeping every original detail, the image is redrawn at the selected grid resolution.',
        'This page is tuned for visual simplification. Rows and columns control how coarse or detailed the result becomes. A lower count creates large blocks and a more abstract preview; a higher count keeps more detail but can become harder to count. Grid lines make the blocks easier to inspect and transfer.',
        'For pixel art planning, the grid size is the creative decision. A 16x16 or 24x24 grid works for simple icons, 32x32 is useful for sprites and small characters, and 48x48 or higher can preserve more facial or object detail. Testing a few sizes before exporting is usually faster than redrawing a design in a pixel editor from scratch.',
        sharedPrivacy,
      ],
    },
    how: {
      title: 'How to create a pixel art grid from an image',
      items: [
        'Upload a photo, logo, or illustration with a clear subject.',
        'Start with 16x16 or 24x24 for a simple icon-style pixel art grid.',
        'Try 32x32 for sprites and 48x48 or higher for portraits, pets, and detailed objects.',
        'Use Pixel mode to redraw the image at the selected resolution.',
        'Adjust line opacity so you can see both the image and the cell boundaries.',
        'Compare several row and column counts before choosing a final version.',
        'Download the PNG and use it as a reference for pixel art, crafts, or block layouts.',
      ],
    },
    why: {
      title: 'Why pixel previews are useful',
      paragraphs: [
        'A normal photo contains too much detail for many square-based projects. Pixel previewing turns the image into a simpler structure before you spend time copying it manually. It is especially helpful when testing whether a face, logo, pet, or object will remain recognizable at a small size.',
        'Pixel grids also make creative decisions visible. You can see when a design needs more contrast, when a background should be removed, or when the grid count is too low. That makes the tool useful even before you open a dedicated pixel editor.',
      ],
    },
    tips: {
      title: 'Pixel grid tips',
      items: [
        'Crop tightly around the subject before uploading if the background is not important.',
        'Use fewer cells for icons and more cells for portraits or detailed objects.',
        'Avoid low-contrast images when you need a readable block pattern.',
        'Use the downloaded PNG as a planning reference, not as a replacement for final cleanup.',
      ],
    },
  },
  'add-grid-to-photo': {
    what: {
      title: 'What does it mean to add a grid to a photo?',
      paragraphs: [
        'Adding a grid to a photo means drawing evenly spaced horizontal and vertical lines over the original image. The result is still one image, but it now has a visual coordinate system. This is helpful for drawing, design review, classroom worksheets, image measurement, layout planning, and any situation where someone needs to refer to a specific area of a picture.',
        'Unlike an Instagram splitter, this page does not cut the photo into separate files. It keeps the image intact and adds guide lines on top. You can control the grid density, line thickness, opacity, color, and labels so the overlay fits the photo instead of overwhelming it.',
        sharedPrivacy,
      ],
    },
    how: {
      title: 'How to add a grid overlay',
      items: [
        'Upload the photo you want to annotate or use as a reference.',
        'Choose the row and column count based on how much detail you need.',
        'Use a dark line for light photos and a white or colored line for dark photos.',
        'Lower opacity when the grid is only a subtle guide.',
        'Enable labels when you need coordinates for teaching, feedback, or revision notes.',
        'Download the final PNG after checking that important details are still visible.',
      ],
    },
    why: {
      title: 'Why use a photo grid overlay?',
      paragraphs: [
        'A grid overlay makes visual feedback more precise. Instead of saying “move the object near the top left,” you can refer to a cell or row. Artists use this for proportion, teachers use it for worksheets, designers use it for layout notes, and craft makers use it to count details before converting an image into a pattern.',
        'The browser-based workflow is fast because it removes the need for photo editing software. There is no layer setup, no account gate, and no watermark. You can make a clean reference image in seconds, then use it in a sketchbook, PDF, slide, craft note, or shared design discussion.',
      ],
    },
    tips: {
      title: 'Photo grid overlay tips',
      items: [
        'Use labels for collaboration and turn them off for clean printable references.',
        'Keep line width thin on dense grids so the photo does not become hidden.',
        'Use a square grid when comparing proportions and a rectangular grid for layouts.',
        'Export several opacity versions if you are not sure how the print will look.',
      ],
    },
  },
  'cross-stitch-grid-maker': {
    what: {
      title: 'What is a cross-stitch grid maker?',
      paragraphs: [
        'A cross-stitch grid maker turns a reference image into a counted square guide. Each cell gives you a visual place to compare shape and color before creating a full pattern. It is useful for cross-stitch, plastic canvas, beadwork, perler beads, and any craft where the final design is built from small square units.',
        'This MVP focuses on grid clarity rather than automatic thread conversion. That is intentional for early planning: before choosing floss colors or stitch counts, you need to know whether the image works at the selected size. The grid preview helps you test subject readability, crop, and square density quickly.',
        sharedPrivacy,
      ],
    },
    how: {
      title: 'How to make a cross-stitch grid',
      items: [
        'Upload a reference image with a clear subject and strong contrast.',
        'Start with a dense grid such as 40x40, then adjust for your intended fabric count.',
        'Use thin grid lines so small details remain visible.',
        'Check the preview at full size to see whether edges and facial features still read well.',
        'Download the PNG and add color notes or stitch symbols in your preferred workflow.',
        'Test a small section before committing to a large stitched piece.',
      ],
    },
    why: {
      title: 'Why cross-stitch makers need a grid first',
      paragraphs: [
        'Cross-stitch is a counted craft, so the grid is the structure of the project. A photo may look beautiful, but it can fail when reduced to a limited number of squares. A grid preview shows whether the subject will survive that reduction and whether the crop should be changed before deeper pattern work begins.',
        'Using a browser grid maker also keeps experimentation lightweight. You can try multiple sizes, line colors, and crops without uploading private photos or installing software. That makes it a good first step for family portraits, pet designs, game sprites, icons, and gift projects.',
      ],
    },
    tips: {
      title: 'Cross-stitch grid tips',
      items: [
        'Simplify the image before uploading if it has a noisy background.',
        'Use a higher grid count for portraits and a lower count for icons or symbols.',
        'Keep a copy of the original image beside the gridded version for color judgment.',
        'Do not rely on a grid alone for final floss selection; use it as the planning base.',
      ],
    },
  },
};

const esContent: Record<string, ToolSeoContent> = {
  home: {
    what: {
      title: 'Qué es un creador de cuadrículas online',
      paragraphs: [
        'Un creador de cuadrículas online convierte una imagen normal en una referencia organizada por filas y columnas. Puede dividir una foto en piezas, añadir líneas sobre la imagen original o simplificarla como una vista de píxeles. Por eso sirve para redes sociales, dibujo, crochet, punto de cruz, pixel art y cualquier trabajo visual que necesite proporción.',
        'Grid Maker está pensado como una herramienta práctica, no como una plantilla pesada. Subes una imagen, eliges dividir, superponer o pixelizar, ajustas filas, columnas, color, opacidad y etiquetas, y descargas el resultado.',
        'Todo el procesamiento ocurre en tu navegador. La imagen no se sube a un servidor, lo que mejora la privacidad y mantiene la experiencia rápida.',
      ],
    },
    how: {
      title: 'Cómo usar Grid Maker',
      items: [
        'Sube una imagen JPG, PNG o WebP.',
        'Elige Split para cortar, Overlay para añadir líneas o Pixel para una vista por bloques.',
        'Ajusta filas y columnas según el uso final.',
        'Cambia color, grosor, opacidad y etiquetas.',
        'Revisa la vista previa y descarga PNG o ZIP.',
      ],
    },
    why: {
      title: 'Por qué usar una cuadrícula',
      paragraphs: [
        'Una cuadrícula reduce la incertidumbre. En dibujo ayuda a copiar proporciones; en redes sociales ayuda a prever cómo se verá una imagen dividida; en manualidades ayuda a contar y planificar áreas pequeñas.',
        'También ahorra tiempo frente a editores complejos. No necesitas capas, guías manuales, cuenta ni marca de agua.',
      ],
    },
    tips: {
      title: 'Consejos prácticos',
      items: [
        'Usa 3x3 para mosaicos de Instagram.',
        'Usa 8x8 o 10x10 para dibujo.',
        'Usa 30x30 o más para crochet y punto de cruz.',
        'Activa etiquetas cuando necesites comentar zonas como C4 o D6.',
      ],
    },
  },
  'instagram-grid-maker': {
    what: {
      title: 'Qué es un creador de cuadrícula para Instagram',
      paragraphs: [
        'Un creador de cuadrícula para Instagram divide una imagen en piezas ordenadas para formar una composición mayor en el perfil o preparar un carrusel visual. El formato 3x3 es el más común porque el perfil muestra tres columnas.',
        'Esta página empieza con un preset 3x3 para exportar nueve imágenes listas para publicar. La idea es cortar rápido, mantener calidad y evitar marcas de agua.',
      ],
    },
    how: {
      title: 'Cómo crear una cuadrícula 3x3',
      items: [
        'Usa una imagen cuadrada o de alta resolución.',
        'Sube la imagen y conserva 3 filas por 3 columnas.',
        'Revisa que textos, rostros o productos no queden cortados de forma incómoda.',
        'Descarga el ZIP con las piezas.',
        'Publica en orden inverso si quieres que el perfil muestre la imagen completa correctamente.',
      ],
    },
    why: {
      title: 'Por qué funciona en Instagram',
      paragraphs: [
        'Una cuadrícula de perfil crea una primera impresión fuerte para lanzamientos, campañas, portafolios y fotos de viaje. Hace que varias publicaciones se sientan conectadas.',
        'El reto es que cada pieza también debe funcionar por separado en el feed. Por eso conviene evitar textos pequeños y colocar detalles importantes lejos de los bordes.',
      ],
    },
    tips: {
      title: 'Consejos para Instagram',
      items: [
        'Evita collages demasiado recargados.',
        'No pongas texto pequeño sobre las líneas de corte.',
        'Guarda el ZIP antes de escribir captions.',
        'Revisa el perfil después de publicar.',
      ],
    },
  },
  'drawing-grid-maker': {
    what: {
      title: 'Qué es una cuadrícula para dibujar',
      paragraphs: [
        'Una cuadrícula para dibujar añade filas y columnas sobre una foto de referencia. Así puedes copiar proporciones por partes pequeñas en lugar de mirar toda la imagen a la vez.',
        'Es útil para retratos, animales, arquitectura, bodegones, transferencia a lienzo y ejercicios de dibujo. Puedes poner una cuadrícula a una foto, ajustar densidad, color, opacidad y etiquetas, y descargar una guía imprimible.',
        'La página está enfocada en cuadricular una imagen para dibujar sin subir archivos. La foto se procesa en tu navegador, por lo que puedes preparar referencias personales, trabajos de clase o bocetos privados con más tranquilidad.',
      ],
    },
    how: {
      title: 'Cómo poner una cuadrícula a una foto para dibujar',
      items: [
        'Sube la foto de referencia.',
        'Empieza con 8x8 o 10x10.',
        'Dibuja la misma proporción en papel, lienzo o tablet.',
        'Baja la opacidad si las líneas molestan.',
        'Activa etiquetas si necesitas coordenadas.',
        'Descarga el PNG y úsalo como cuadrícula imprimible para dibujo.',
      ],
    },
    why: {
      title: 'Por qué mejora la precisión',
      paragraphs: [
        'La cuadrícula entrena el ojo para medir relaciones. Puedes comparar dónde cae un ojo, una sombra o una línea dentro de cada cuadro.',
        'También hace menos intimidantes las imágenes complejas. Es una ayuda de construcción, no un reemplazo de la observación.',
      ],
    },
    tips: {
      title: 'Consejos de dibujo',
      items: [
        'Usa pocas celdas para bocetos rápidos.',
        'Usa más celdas para realismo.',
        'Mantén la misma proporción en la referencia y el soporte.',
        'Usa etiquetas cuando quieras comparar zonas concretas como B3 o C4.',
        'Oculta o borra la cuadrícula al terminar las proporciones principales.',
      ],
    },
  },
  'crochet-grid-maker': {
    what: {
      title: 'Qué es una cuadrícula para crochet',
      paragraphs: [
        'Una cuadrícula para crochet coloca cuadros densos sobre una imagen para planificar bloques de color, motivos o gráficos. Sirve para graphghan, tapestry crochet, C2C, cuentas y otras manualidades contadas.',
        'Esta versión se centra en crear una referencia visual clara antes de hacer una tabla completa de colores o hilos.',
      ],
    },
    how: {
      title: 'Cómo hacer una cuadrícula para crochet',
      items: [
        'Elige una imagen con formas claras.',
        'Empieza con 30x30 o 40x40.',
        'Usa líneas finas y opacidad media.',
        'Comprueba si el motivo sigue siendo reconocible.',
        'Descarga el PNG y añade notas de color en tu app favorita.',
      ],
    },
    why: {
      title: 'Por qué planificar antes de tejer',
      paragraphs: [
        'Los proyectos de crochet llevan mucho tiempo. Una vista con cuadrícula permite comprobar contraste, tamaño y legibilidad antes de invertir horas.',
        'También puedes comparar versiones y decidir si necesitas simplificar la imagen o reducir colores.',
      ],
    },
    tips: {
      title: 'Consejos para crochet',
      items: [
        'Usa referencias con alto contraste.',
        'Reduce colores para que el patrón sea manejable.',
        'Recorta en cuadrado si el proyecto final será cuadrado.',
        'Haz una muestra pequeña antes de escalar.',
      ],
    },
  },
  'pixel-grid-maker': {
    what: {
      title: 'Qué es un pixel grid maker',
      paragraphs: [
        'Un pixel grid maker transforma una imagen en una vista por bloques con celdas visibles. Ayuda a prever cómo se verá una foto como pixel art, mosaico, patrón de cuentas o diseño simplificado.',
        'Las filas y columnas controlan el nivel de detalle. Menos celdas dan un resultado más abstracto; más celdas conservan más información.',
      ],
    },
    how: {
      title: 'Cómo crear una cuadrícula pixel',
      items: [
        'Sube una imagen con un sujeto claro.',
        'Empieza con 24x24.',
        'Aumenta filas y columnas si necesitas más detalle.',
        'Ajusta opacidad de líneas.',
        'Descarga el PNG como referencia.',
      ],
    },
    why: {
      title: 'Por qué usar una vista pixel',
      paragraphs: [
        'Una foto normal tiene demasiado detalle para muchos proyectos por bloques. Pixelizar permite ver si el sujeto sigue siendo reconocible.',
        'También ayuda a decidir si necesitas más contraste, menos fondo o una cuadrícula más densa.',
      ],
    },
    tips: {
      title: 'Consejos pixel',
      items: [
        'Recorta cerca del sujeto.',
        'Usa menos celdas para iconos.',
        'Usa más celdas para retratos.',
        'No uses imágenes con poco contraste si necesitas un patrón claro.',
      ],
    },
  },
};

const ptContent: Record<string, ToolSeoContent> = {
  home: {
    what: {
      title: 'O que é um criador de grades online?',
      paragraphs: [
        'Uma ferramenta de grade online transforma uma imagem comum em uma referência organizada por linhas e colunas. Ela pode colocar grade em uma imagem, dividir uma foto em partes separadas, desenhar linhas sobre a foto original ou simplificar a imagem em uma prévia pixelada.',
        'A ferramenta foi pensada para fluxos práticos no Brasil e em português: redes sociais, desenho, crochê, ponto cruz, pixel art e qualquer trabalho visual que precise de proporção clara. Você ajusta linhas, colunas, cor, opacidade e etiquetas sem abrir um editor pesado.',
        'Se você procura por ferramenta de grade, grade online, colocar grade em imagem ou dividir imagem em grade, o fluxo é o mesmo: escolha a imagem, ajuste a quantidade de linhas e colunas e baixe o resultado sem marca d agua.',
        'Todo o processamento acontece no navegador. A imagem é carregada em um canvas local e exportada pelo seu dispositivo, mantendo fotos pessoais, referências de clientes e materiais de campanha fora de servidores de processamento remoto.',
      ],
    },
    how: {
      title: 'Como usar o Grid Maker',
      items: [
        'Envie uma imagem JPG, PNG ou WebP do seu dispositivo.',
        'Use Split para criar partes separadas, Overlay para adicionar linhas ou Pixel para uma prévia em blocos.',
        'Defina linhas e colunas de acordo com o uso final.',
        'Para colocar grade em uma imagem, mantenha Overlay ativo e ajuste cor, espessura e opacidade.',
        'Para dividir imagem em grade, use Split e baixe as partes em um ZIP.',
        'Ajuste cor, espessura, opacidade e etiquetas para manter a imagem legível.',
        'Confira a prévia no canvas antes de exportar.',
        'Baixe o PNG final ou use ZIP quando precisar de todas as partes de uma divisão.',
      ],
    },
    why: {
      title: 'Por que usar uma grade antes de exportar',
      paragraphs: [
        'A grade reduz tentativa e erro. Para desenho, ela ajuda a comparar proporções. Para redes sociais, mostra como uma imagem será dividida. Para artesanato, cria uma estrutura contável que facilita marcar áreas pequenas.',
        'Também economiza tempo. Editores tradicionais exigem camadas, guias e configurações de exportação. Um grid maker focado transforma esse trabalho em poucos controles e não bloqueia o download com cadastro ou marca d agua.',
      ],
    },
    tips: {
      title: 'Configurações práticas de grade',
      items: [
        'Use 3x3 para mosaicos de Instagram.',
        'Use 8x8, 10x10 ou 12x12 para referências de desenho.',
        'Use 16x16, 24x24 ou 32x32 para pixel art.',
        'Use 30x30, 40x40 ou mais para crochê, ponto cruz e artesanato.',
        'Ative etiquetas quando precisar conversar sobre uma área específica, como C4.',
      ],
    },
  },
  'instagram-grid-maker': {
    what: {
      title: 'O que é um criador de grade para Instagram?',
      paragraphs: [
        'Um criador de grade para Instagram divide uma imagem em partes ordenadas para formar uma composição maior no perfil ou para planejar um carrossel visual. O formato 3x3 é o mais comum porque o perfil do Instagram mostra três colunas.',
        'O objetivo não é apenas cortar a imagem. Um bom fluxo mantém a ordem das partes, preserva a qualidade e evita marca d agua. Esta página já começa com o preset 3x3 para exportar nove arquivos prontos para postagem.',
      ],
    },
    how: {
      title: 'Como criar uma grade 3x3 para Instagram',
      items: [
        'Comece com uma imagem quadrada ou em alta resolução.',
        'Envie a imagem e mantenha o preset de 3 linhas por 3 colunas.',
        'Verifique se rostos, textos e produtos não ficam cortados nas bordas.',
        'Baixe o ZIP para salvar todas as partes juntas.',
        'Publique a última parte primeiro se quiser que o perfil mostre a imagem completa na ordem correta.',
      ],
    },
    why: {
      title: 'Por que grades de Instagram ainda funcionam',
      paragraphs: [
        'Uma grade de perfil cria impacto quando a imagem é a própria mensagem: lançamento, campanha, portfólio, música, produto ou foto de viagem. Ela faz várias postagens parecerem uma composição única.',
        'O cuidado principal é que cada parte também aparece isolada no feed. Por isso, evite textos pequenos sobre as linhas de corte e mantenha detalhes importantes longe das bordas dos tiles.',
      ],
    },
    tips: {
      title: 'Dicas para grade de Instagram',
      items: [
        'Use imagens simples; colagens muito cheias perdem leitura.',
        'Não posicione texto pequeno exatamente nas linhas de corte.',
        'Use 3x1 para carrosséis panorâmicos e 3x3 para mosaicos de perfil.',
        'Guarde o ZIP antes de escrever legendas para preservar a ordem.',
      ],
    },
  },
  'drawing-grid-maker': {
    what: {
      title: 'O que é uma grade para desenho?',
      paragraphs: [
        'Uma grade para desenho adiciona linhas e colunas sobre uma foto de referência para que o artista copie proporções por pequenas áreas. Em vez de observar a imagem inteira de uma vez, você compara o que acontece dentro de cada quadrado.',
        'Esse método é comum para retratos, animais, arquitetura, natureza morta e transferência para tela. A ferramenta permite ajustar densidade, cor, opacidade e etiquetas de coordenadas.',
      ],
    },
    how: {
      title: 'Como adicionar uma grade para desenho',
      items: [
        'Envie a foto de referência.',
        'Comece com 8x8 ou 10x10 para retratos e esboços gerais.',
        'Recrie a mesma proporção no papel, tela ou camada digital.',
        'Reduza a opacidade se as linhas atrapalharem sombras e bordas.',
        'Ative etiquetas para usar referências como A1, B2 ou C4.',
      ],
    },
    why: {
      title: 'Por que a grade melhora a precisão',
      paragraphs: [
        'A grade treina o olhar a medir relações. Você vê onde um olho cai em um quadrado, como uma sombra cruza outro e quanto espaço negativo existe ao redor do objeto.',
        'Ela também torna referências complexas menos intimidadoras. Iniciantes ganham confiança e artistas experientes aceleram a etapa de composição antes do acabamento livre.',
      ],
    },
    tips: {
      title: 'Dicas para desenho com grade',
      items: [
        'Use menos células para esboços soltos e mais células para detalhes realistas.',
        'Escolha linhas vermelhas, azuis ou brancas quando o preto sumir na foto.',
        'Mantenha a mesma proporção entre referência e superfície de desenho.',
        'Apague ou oculte a grade depois de posicionar as formas principais.',
      ],
    },
  },
  'crochet-grid-maker': {
    what: {
      title: 'O que é uma grade para crochê?',
      paragraphs: [
        'Uma grade para crochê coloca quadrados densos sobre uma imagem para planejar blocos de cor, pontos ou motivos. Ela ajuda em graphghan, tapeçaria em crochê, C2C, miçangas e outros projetos contados.',
        'Esta ferramenta cobre a primeira etapa: criar uma referência visual clara. Ela ainda não substitui uma tabela completa de fios, mas ajuda a decidir se a imagem funciona antes de investir muitas horas no projeto.',
      ],
    },
    how: {
      title: 'Como fazer uma grade de crochê a partir de imagem',
      items: [
        'Escolha uma imagem com formas fortes e poucos detalhes minúsculos.',
        'Envie a imagem e comece com 30x30 ou 40x40.',
        'Use linhas finas e opacidade moderada.',
        'Confira se o motivo ainda é reconhecível em tamanho real.',
        'Baixe o PNG e adicione notas de cor no seu fluxo favorito.',
      ],
    },
    why: {
      title: 'Por que projetos de crochê precisam de planejamento',
      paragraphs: [
        'Projetos de crochê podem levar muitas horas. Uma prévia com grade mostra contraste, tamanho e legibilidade antes que você compre materiais ou comece uma peça grande.',
        'Também permite comparar versões, ajustar a densidade e decidir se a imagem precisa ser simplificada para virar um padrão mais fácil de executar.',
      ],
    },
    tips: {
      title: 'Dicas para grade de crochê',
      items: [
        'Prefira referências com alto contraste.',
        'Reduza a quantidade de cores para manter o projeto manejável.',
        'Use corte quadrado se a peça final for quadrada.',
        'Faça uma amostra pequena antes de escalar o padrão inteiro.',
      ],
    },
  },
  'pixel-grid-maker': {
    what: {
      title: 'O que é um pixel grid maker?',
      paragraphs: [
        'Um pixel grid maker converte uma foto ou ilustração em uma prévia por blocos com células visíveis. Ele ajuda a imaginar a imagem como pixel art, mosaico, padrão de miçangas ou layout artesanal simplificado.',
        'As linhas e colunas controlam o nível de detalhe. Poucas células criam um resultado mais abstrato; mais células preservam detalhes, mas podem dificultar a contagem.',
      ],
    },
    how: {
      title: 'Como criar uma grade pixel',
      items: [
        'Envie uma foto, logotipo ou ilustração com sujeito claro.',
        'Comece com 24x24 para uma prévia simples.',
        'Use o modo Pixel para redesenhar a imagem na resolução escolhida.',
        'Ajuste a opacidade das linhas para ver imagem e células.',
        'Compare várias densidades antes de baixar o PNG final.',
      ],
    },
    why: {
      title: 'Por que prévias pixel são úteis',
      paragraphs: [
        'Uma foto normal tem detalhes demais para muitos projetos baseados em quadrados. A prévia pixel mostra se um rosto, objeto ou logo continua reconhecível em tamanho reduzido.',
        'Ela também revela decisões criativas: quando aumentar contraste, remover fundo ou escolher uma grade mais densa antes de abrir um editor dedicado.',
      ],
    },
    tips: {
      title: 'Dicas para pixel grid',
      items: [
        'Recorte perto do sujeito se o fundo não for importante.',
        'Use menos células para ícones e mais células para retratos.',
        'Evite imagens de baixo contraste quando precisar de padrão legível.',
        'Use o PNG como referência de planejamento, não como acabamento final.',
      ],
    },
  },
  'add-grid-to-photo': {
    what: {
      title: 'O que significa adicionar uma grade a uma foto?',
      paragraphs: [
        'Adicionar uma grade a uma foto significa desenhar linhas horizontais e verticais sobre a imagem original. O resultado continua sendo uma imagem única, mas com um sistema visual de coordenadas.',
        'Diferente de um divisor para Instagram, esta página não corta a foto. Ela mantém a imagem inteira e coloca guias por cima, com controle de densidade, espessura, opacidade, cor e etiquetas.',
      ],
    },
    how: {
      title: 'Como adicionar uma grade sobre a foto',
      items: [
        'Envie a foto que deseja anotar ou usar como referência.',
        'Escolha linhas e colunas conforme o nível de detalhe.',
        'Use linha escura em fotos claras e linha branca ou colorida em fotos escuras.',
        'Reduza a opacidade quando a grade for apenas um guia sutil.',
        'Ative etiquetas para ensino, feedback ou revisão visual.',
      ],
    },
    why: {
      title: 'Por que usar uma grade sobre a foto',
      paragraphs: [
        'A grade torna comentários visuais mais precisos. Em vez de dizer “mova para o canto superior”, você pode citar uma célula específica.',
        'Artistas usam para proporção, professores para atividades, designers para revisão e artesãos para contar detalhes antes de transformar uma imagem em padrão.',
      ],
    },
    tips: {
      title: 'Dicas de grade sobre foto',
      items: [
        'Use etiquetas para colaboração e desative para referências limpas.',
        'Mantenha linhas finas em grades densas.',
        'Use grade quadrada para proporção e retangular para layout.',
        'Exporte versões com opacidades diferentes se pretende imprimir.',
      ],
    },
  },
  'cross-stitch-grid-maker': {
    what: {
      title: 'O que é uma grade para ponto cruz?',
      paragraphs: [
        'Uma grade para ponto cruz transforma uma imagem em um guia de quadrados contados. Cada célula ajuda a comparar forma e cor antes de criar um padrão completo.',
        'Esta versão foca na clareza da grade, não na conversão automática de linhas. Antes de escolher cores, você precisa saber se a imagem funciona no tamanho selecionado.',
      ],
    },
    how: {
      title: 'Como criar uma grade para ponto cruz',
      items: [
        'Envie uma imagem com sujeito claro e bom contraste.',
        'Comece com 40x40 e ajuste conforme o tecido ou tamanho final.',
        'Use linhas finas para não esconder detalhes pequenos.',
        'Confira a prévia em tamanho maior.',
        'Baixe o PNG e adicione notas de cor ou símbolos no seu fluxo.',
      ],
    },
    why: {
      title: 'Por que começar pelo grid no ponto cruz',
      paragraphs: [
        'Ponto cruz é um trabalho contado, então a grade é a estrutura do projeto. Uma foto bonita pode perder leitura quando reduzida a poucos quadrados.',
        'A prévia em grade permite testar corte, densidade e legibilidade antes de avançar para seleção de fios e símbolos.',
      ],
    },
    tips: {
      title: 'Dicas para ponto cruz',
      items: [
        'Simplifique fundos muito ruidosos antes de enviar.',
        'Use mais células para retratos e menos para ícones.',
        'Mantenha a imagem original ao lado da versão com grade.',
        'Use a grade como base de planejamento, não como tabela final de fios.',
      ],
    },
  },
};

const jaContent: Record<string, ToolSeoContent> = {
  home: {
    what: {
      title: 'オンライン Grid Maker とは？',
      paragraphs: [
        'オンライン Grid Maker は、画像を行と列で整理された参照画像に変えるブラウザツールです。画像を複数のタイルに分割したり、元画像にグリッド線を重ねたり、ピクセル風のブロック表示に簡略化したりできます。',
        'SNS 投稿、デッサン、かぎ針編み、クロスステッチ、ピクセルアートなど、比率やマス目が必要な作業に向いています。行数、列数、線の色、不透明度、ラベルを数回の操作で調整できます。',
        '処理はすべてブラウザ内で行われます。画像はローカル canvas に読み込まれ、端末から書き出されるため、個人写真や制作資料を画像処理サーバーへ送る必要がありません。',
      ],
    },
    how: {
      title: 'Grid Maker の使い方',
      items: [
        '端末から JPG、PNG、WebP 画像をアップロードします。',
        '分割したい場合は Split、線を重ねたい場合は Overlay、ブロック表示にしたい場合は Pixel を選びます。',
        '目的に合わせて行数と列数を設定します。',
        '線の色、太さ、不透明度、ラベルを調整します。',
        'canvas 上でプレビューを確認します。',
        '最終画像を PNG として保存し、分割ページでは ZIP でまとめて保存します。',
      ],
    },
    why: {
      title: '書き出し前にグリッドを使う理由',
      paragraphs: [
        'グリッドは目分量を減らします。デッサンでは比率を比較しやすくなり、SNS では画像がどう分割されるかを確認でき、手芸では数えやすい構造を作れます。',
        '一般的な画像編集ソフトでも同じ作業はできますが、レイヤー、ガイド、書き出し設定が必要です。専用ツールなら登録や透かしなしで、必要な操作だけに集中できます。',
      ],
    },
    tips: {
      title: '実用的なグリッド設定',
      items: [
        'Instagram のプロフィールモザイクには 3x3 を使います。',
        '描画用の参照には 8x8、10x10、12x12 が読みやすいです。',
        'かぎ針編み、クロスステッチ、ピクセル計画には 30x30 以上が向いています。',
        '他の人と修正箇所を話す場合は、C4 のようなラベルを有効にします。',
      ],
    },
  },
  'instagram-grid-maker': {
    what: {
      title: 'Instagram グリッドメーカーとは？',
      paragraphs: [
        'Instagram グリッドメーカーは、1 枚の画像を順序付きのタイルに分割し、プロフィール上で大きな 1 枚絵に見せたり、カルーセルの構成を考えたりするためのツールです。',
        'よく使われる形式は 3x3 です。Instagram のプロフィールは 3 列で表示されるため、9 枚の画像を正しい順序で投稿すると、プロフィール全体に大きなビジュアルを作れます。',
      ],
    },
    how: {
      title: 'Instagram 用 3x3 グリッドの作り方',
      items: [
        '高解像度の正方形または縦長画像を用意します。',
        '画像をアップロードし、3 行 3 列のプリセットを使います。',
        '顔、文字、商品がタイル境界で不自然に切れないか確認します。',
        'ZIP をダウンロードして 9 枚の画像をまとめて保存します。',
        'プロフィール上で正しく見せる場合は、最後のタイルから投稿します。',
      ],
    },
    why: {
      title: 'Instagram グリッドが有効な理由',
      paragraphs: [
        'プロフィールグリッドは、リリース告知、旅行写真、商品コレクション、音楽作品、キャンペーンビジュアルなど、画像そのものがメッセージになる場面で強い第一印象を作れます。',
        'ただし各タイルはフィードでは単体でも表示されます。小さな文字を境界線に置かず、重要な要素はできるだけ各タイルの中央寄りに配置するのが安全です。',
      ],
    },
    tips: {
      title: 'Instagram グリッドのコツ',
      items: [
        '複雑すぎるコラージュは分割後に読みにくくなります。',
        '小さな文字をタイル境界の上に置かないようにします。',
        'プロフィールモザイクには 3x3、横長カルーセルには 3x1 が使いやすいです。',
        '投稿文を編集する前に ZIP を保存し、順序を保ちます。',
      ],
    },
  },
  'drawing-grid-maker': {
    what: {
      title: '描画用グリッドメーカーとは？',
      paragraphs: [
        '描画用グリッドメーカーは、参照写真に行と列を重ね、アーティストが小さな範囲ごとに比率を確認できるようにするツールです。',
        '人物、動物、建築、静物、キャンバス転写など、位置とスケールが重要な題材でよく使われます。線の色、不透明度、ラベルを調整できるので、印刷用にも画面参照にも使えます。',
      ],
    },
    how: {
      title: '描画用グリッドを追加する方法',
      items: [
        '描きたい参照写真をアップロードします。',
        '人物画や一般的なスケッチでは 8x8 または 10x10 から始めます。',
        '紙、キャンバス、タブレットのレイヤーに同じ比率のグリッドを用意します。',
        '線が影や輪郭を邪魔する場合は不透明度を下げます。',
        'A1、B2、C4 のように参照したい場合はラベルを有効にします。',
      ],
    },
    why: {
      title: 'グリッドが描画精度を上げる理由',
      paragraphs: [
        'グリッドは形同士の関係を測りやすくします。目がどのマスに入るか、顎の線がどこを通るか、対象の周囲にどれだけ余白があるかを確認できます。',
        '複雑な写真も小さな単位に分けると扱いやすくなります。グリッドは観察の代わりではなく、主要な形を置くための足場です。',
      ],
    },
    tips: {
      title: '描画グリッドのコツ',
      items: [
        'ラフなスケッチには少ないマス、写実的な作業には多いマスを使います。',
        '黒線が見えにくい写真では赤、青、白の線を試します。',
        '参照画像と描画面の比率を必ず一致させます。',
        '主要な形が取れたら、下描きグリッドは消すか薄くします。',
      ],
    },
  },
  'crochet-grid-maker': {
    what: {
      title: 'かぎ針編みグリッドメーカーとは？',
      paragraphs: [
        'かぎ針編みグリッドメーカーは、画像の上に細かい正方形グリッドを置き、色ブロック、ステッチ、モチーフ配置を計画するためのツールです。',
        'graphghan、タペストリークロシェ、C2C、ビーズ作品など、数えながら作る手芸の初期検討に役立ちます。完全な糸色表ではなく、まず画像が図案として成立するかを確認するためのプレビューです。',
      ],
    },
    how: {
      title: '画像からかぎ針編みグリッドを作る方法',
      items: [
        '形がはっきりして細部が多すぎない画像を選びます。',
        '画像をアップロードし、30x30 または 40x40 から試します。',
        '線は細く、不透明度は中程度にします。',
        '重要な形がまだ読めるか拡大して確認します。',
        'PNG を保存し、好みのアプリやノートで色やステッチのメモを追加します。',
      ],
    },
    why: {
      title: '手芸に事前グリッドが必要な理由',
      paragraphs: [
        'かぎ針編みの大きな作品は時間がかかります。グリッドプレビューは、コントラスト、サイズ、読みやすさを事前に確認し、失敗のコストを下げます。',
        '複数の行列数を試して、画像を簡略化すべきか、色数を減らすべきか、作品サイズを変えるべきかを判断できます。',
      ],
    },
    tips: {
      title: 'かぎ針編みグリッドのコツ',
      items: [
        '高コントラストの参照画像を使います。',
        '色数を減らすと実際の制作が楽になります。',
        '完成品が正方形なら、画像も正方形に切り抜きます。',
        '大きな作品に入る前に小さなサンプルを試します。',
      ],
    },
  },
  'pixel-grid-maker': {
    what: {
      title: 'Pixel Grid Maker とは？',
      paragraphs: [
        'Pixel Grid Maker は、写真やイラストをマス目付きのブロック表示に変換するツールです。ピクセルアート、モザイク、ビーズ図案、ブロック制作、簡略化した手芸レイアウトの検討に使えます。',
        '行数と列数を変えることで、どの程度粗く、または細かく表示するかを調整できます。少ないマスは抽象的に、多いマスは詳細に近づきます。',
      ],
    },
    how: {
      title: 'ピクセルグリッドの作り方',
      items: [
        '主題がはっきりした写真、ロゴ、イラストをアップロードします。',
        'シンプルなプレビューには 24x24 から始めます。',
        'Pixel モードで選んだ解像度に画像を再描画します。',
        '線の不透明度を調整して、画像とマス目の両方を見やすくします。',
        '複数の密度を比較してから PNG を保存します。',
      ],
    },
    why: {
      title: 'ピクセルプレビューが役立つ理由',
      paragraphs: [
        '通常の写真は、マス目ベースの制作には情報量が多すぎます。ピクセルプレビューにすると、顔、ロゴ、ペット、物体が小さいサイズでも認識できるか確認できます。',
        '背景を削るべきか、コントラストを上げるべきか、グリッド数を増やすべきかといった判断も早くできます。',
      ],
    },
    tips: {
      title: 'ピクセルグリッドのコツ',
      items: [
        '背景が重要でない場合は、主題の近くで切り抜きます。',
        'アイコンには少ないマス、人物や細かい物には多いマスを使います。',
        '読みやすい図案が必要な場合は低コントラスト画像を避けます。',
        'ダウンロードした PNG は最終仕上げではなく計画用参照として使います。',
      ],
    },
  },
  'add-grid-to-photo': {
    what: {
      title: '写真にグリッドを追加するとは？',
      paragraphs: [
        '写真にグリッドを追加するとは、元画像の上に等間隔の水平線と垂直線を描くことです。画像は 1 枚のままですが、視覚的な座標システムを持つ参照画像になります。',
        'Instagram 分割ツールとは違い、このページは写真を切り分けません。画像全体を保ったまま、密度、線の太さ、不透明度、色、ラベルを調整してガイドを重ねます。',
      ],
    },
    how: {
      title: '写真にグリッドを重ねる方法',
      items: [
        '注釈や参照に使いたい写真をアップロードします。',
        '必要な細かさに合わせて行数と列数を選びます。',
        '明るい写真には暗い線、暗い写真には白や色付きの線を使います。',
        '控えめなガイドにしたい場合は不透明度を下げます。',
        '授業、フィードバック、修正指示にはラベルを有効にします。',
      ],
    },
    why: {
      title: '写真グリッドを使う理由',
      paragraphs: [
        'グリッドがあると視覚的な指示が正確になります。「左上のあたり」ではなく、具体的なセルや行で場所を伝えられます。',
        'アーティストは比率確認に、教師は教材に、デザイナーはレイアウト確認に、手芸制作者は細部を数える準備に使えます。',
      ],
    },
    tips: {
      title: '写真グリッドのコツ',
      items: [
        '共同作業ではラベルを使い、きれいな印刷用にはラベルを外します。',
        '細かいグリッドでは線を細く保ちます。',
        '比率確認には正方形グリッド、レイアウトには長方形グリッドを使います。',
        '印刷する場合は不透明度の違う版を複数保存します。',
      ],
    },
  },
  'cross-stitch-grid-maker': {
    what: {
      title: 'クロスステッチグリッドメーカーとは？',
      paragraphs: [
        'クロスステッチグリッドメーカーは、参照画像をカウントしやすい正方形ガイドに変換するツールです。各セルを見ながら、完全な図案を作る前に形や色の配置を確認できます。',
        'この MVP は自動的な糸色変換よりも、グリッドの見やすさを重視しています。糸や記号を決める前に、選んだサイズで画像が成立するかを確認できます。',
      ],
    },
    how: {
      title: 'クロスステッチグリッドの作り方',
      items: [
        '主題がはっきりし、コントラストのある画像をアップロードします。',
        '40x40 から始め、布目や完成サイズに合わせて調整します。',
        '細部を隠さないように線は細くします。',
        '大きめにプレビューして輪郭や顔の特徴が読めるか確認します。',
        'PNG を保存し、好みの作業環境で色メモや記号を追加します。',
      ],
    },
    why: {
      title: 'クロスステッチで最初にグリッドを見る理由',
      paragraphs: [
        'クロスステッチはカウント式の手芸なので、グリッドが作品の構造になります。美しい写真でも、少ないマスに落とし込むと読みにくくなることがあります。',
        'グリッドプレビューは、切り抜き、密度、読みやすさを早く確認し、糸色や記号の細かい作業に入る前の判断を助けます。',
      ],
    },
    tips: {
      title: 'クロスステッチグリッドのコツ',
      items: [
        '背景が複雑な画像は先に簡略化します。',
        '人物には多めのマス、アイコンや記号には少なめのマスを使います。',
        '色判断のために元画像も横に置いておきます。',
        'グリッドは最終の糸色表ではなく計画の土台として使います。',
      ],
    },
  },
};

const zhContent: Record<string, ToolSeoContent> = {
  home: {
    what: {
      title: '什么是在线 Grid Maker？',
      paragraphs: [
        '在线 Grid Maker 是一种浏览器图片工具，可以把普通图片变成按行列组织的参考图。根据选择的模式，它可以把一张图片切成多个独立图片块，也可以在原图上叠加网格线，或者把图片简化成像素风格的方块预览。',
        '这个工具面向实际工作流，而不是模板库。你上传图片，选择切图、叠加网格或像素化，再调整行列、颜色、透明度和标签。Instagram 创作者、绘画用户和手作爱好者都可以从对应预设开始。',
        '所有处理都发生在浏览器中。图片会被加载到本地 canvas 里，并从你的设备导出，避免把个人照片、客户素材、活动视觉图或手作参考图发送到远程图片处理服务器。',
      ],
    },
    how: {
      title: '如何使用 Grid Maker',
      items: [
        '从设备上传 JPG、PNG 或 WebP 图片。',
        '需要独立图片块时选择 Split，需要参考线时选择 Overlay，需要方块化预览时选择 Pixel。',
        '根据用途设置行数和列数。',
        '调整线条颜色、粗细、透明度和坐标标签。',
        '在画布中检查预览，如果画面太乱，可以降低透明度或换成浅色线。',
        '下载最终 PNG；在切图页面可以使用 ZIP 一次保存所有图片块。',
      ],
    },
    why: {
      title: '为什么导出前要先使用网格',
      paragraphs: [
        '网格可以减少猜测。绘画时，它帮助你比较局部比例；社交媒体切图时，它帮助你预览一张图会如何拆分；手作时，它提供可计数的方格结构。',
        '它也比传统图片编辑器更快。桌面软件通常需要图层、参考线、导出设置和手动切片。专门的网格工具把这些步骤压缩成几个控件，并且不强制注册或加水印。',
      ],
    },
    tips: {
      title: '实用网格设置建议',
      items: [
        'Instagram 主页九宫格使用 3x3。',
        '绘画参考通常使用 8x8、10x10 或 12x12，格子仍然容易看清。',
        '钩针、十字绣、串珠和像素规划可以使用 30x30 或更密的网格。',
        '需要和别人讨论参考图时，打开标签可以直接说“调整 C4 的形状”。',
      ],
    },
  },
  'instagram-grid-maker': {
    what: {
      title: '什么是 Instagram Grid Maker？',
      paragraphs: [
        'Instagram Grid Maker 会把一张图片切成按顺序排列的图片块，用于在 Instagram 主页形成一张更大的视觉图，或用于规划结构化轮播内容。',
        '最常见的布局是 3x3，因为 Instagram 主页以三列展示帖子。这个页面默认使用 3x3 预设，让你上传一张图后快速导出 9 张能拼合的图片。',
      ],
    },
    how: {
      title: '如何制作 Instagram 3x3 九宫格',
      items: [
        '准备一张高分辨率的正方形或竖版图片。',
        '上传图片并保留默认 3 行 3 列设置。',
        '检查人脸、文字和产品细节是否被切在尴尬的位置。',
        '下载 ZIP，把所有图片块按顺序保存。',
        '如果要让主页显示完整大图，发布时通常需要从最后一张开始发。',
      ],
    },
    why: {
      title: '为什么 Instagram 九宫格仍然有效',
      paragraphs: [
        '当图片本身就是核心信息时，主页九宫格能制造更强的第一印象，比如新品发布、旅行照片、作品集预告、音乐发行或活动海报。',
        '风险在于每个图片块也会单独出现在 feed 中。因此需要避免把小字放在切割边界上，也要尽量让重要元素在单张图片里仍然能看懂。',
      ],
    },
    tips: {
      title: 'Instagram 九宫格技巧',
      items: [
        '原图尽量简洁，复杂拼贴切开后会很难读。',
        '不要把小字号文字放在切割线正上方。',
        '3x1 适合横向轮播构思，3x3 适合主页大图。',
        '先保存 ZIP，再处理文案和发布时间，避免图片顺序混乱。',
      ],
    },
  },
  'drawing-grid-maker': {
    what: {
      title: '什么是绘画网格工具？',
      paragraphs: [
        '绘画网格工具会在参考照片上叠加行列线，让画者可以一小块一小块地比较比例。你不需要一次观察整张图，而是看每个格子里形状的位置和大小。',
        '这个方法常用于肖像、动物、建筑、静物和画布转稿。你可以调整行列数量、线条透明度、颜色和坐标标签，方便打印或屏幕参考。',
      ],
    },
    how: {
      title: '如何添加绘画参考网格',
      items: [
        '上传要临摹或参考的照片。',
        '肖像和普通草图可以从 8x8 或 10x10 开始。',
        '在纸张、画布或数字绘画图层上画出相同比例的网格。',
        '如果线条影响观察阴影和边缘，就降低透明度。',
        '需要定位时打开标签，使用 A1、B2、C4 这样的坐标。',
      ],
    },
    why: {
      title: '为什么网格能提高绘画准确度',
      paragraphs: [
        '网格会训练眼睛测量关系。你可以观察眼睛落在哪个格子里，下颌线穿过哪些格子，物体周围的负空间占多少。',
        '它也能降低复杂参考图的压力。初学者可以用它建立信心，有经验的画者也可以用它快速完成构图，再进入自由修整。',
      ],
    },
    tips: {
      title: '绘画网格技巧',
      items: [
        '粗略草图用少一些格子，写实细节用更多格子。',
        '黑线在照片里看不清时，可以换成红色、蓝色或白色。',
        '参考图和绘画表面的比例必须保持一致。',
        '主要比例确定后，可以擦掉或隐藏施工网格。',
      ],
    },
  },
  'crochet-grid-maker': {
    what: {
      title: '什么是钩针网格工具？',
      paragraphs: [
        '钩针网格工具会在图片上放置细密方格，帮助规划色块、针法或图案位置。它适合 graphghan、挂毯钩针、C2C、串珠和其他需要按格计数的手作项目。',
        '这个工具专注于第一步规划：从图片创建清晰的视觉网格。它还不是完整的毛线颜色表，但可以帮助你判断图片是否适合做成按格图案。',
      ],
    },
    how: {
      title: '如何从图片制作钩针网格',
      items: [
        '选择形状清楚、细节不过多的参考图片。',
        '上传图片，从 30x30 或 40x40 这类密度开始尝试。',
        '使用较细线条和中等透明度，让图片仍然清楚可见。',
        '放大检查关键形状是否仍然能被识别。',
        '下载 PNG，然后在你习惯的手作软件或笔记中添加颜色说明。',
      ],
    },
    why: {
      title: '为什么钩针项目需要先做网格规划',
      paragraphs: [
        '钩针项目往往耗时很长。如果参考图选择不合适，错误会很昂贵。网格预览能提前检查对比度、尺寸和可读性。',
        '你可以在投入毛线之前尝试不同的行列数、裁剪和可见度，判断是否需要简化图片或减少颜色。',
      ],
    },
    tips: {
      title: '钩针网格技巧',
      items: [
        '使用高对比度参考图，细微渐变很难转成毛线。',
        '先减少颜色数量，让项目更容易完成。',
        '最终作品是正方形时，先把图片裁成正方形。',
        '大项目开始前，先做一小块样片验证效果。',
      ],
    },
  },
  'pixel-grid-maker': {
    what: {
      title: '什么是 Pixel Grid Maker？',
      paragraphs: [
        'Pixel Grid Maker 会把照片或插画转换成带可见格子的方块预览。它可以帮助你判断图片作为像素画、马赛克、串珠图案、积木作品或简化手作图时会是什么效果。',
        '行数和列数决定细节程度。较少的格子会更抽象，较多的格子能保留更多细节，但也更难计数和制作。',
      ],
    },
    how: {
      title: '如何创建像素网格',
      items: [
        '上传主体清晰的照片、Logo 或插画。',
        '简单像素预览可以从 24x24 开始。',
        '使用 Pixel 模式按照所选分辨率重绘图片。',
        '调整线条透明度，让图片和格子边界都能看清。',
        '对比多个行列数后，再下载最终 PNG。',
      ],
    },
    why: {
      title: '为什么像素预览有用',
      paragraphs: [
        '普通照片对方格类项目来说细节太多。像素预览能先把图片压缩成更简单的结构，让你判断人脸、Logo、宠物或物体在小尺寸下是否仍然可识别。',
        '它也能暴露设计问题：是否需要提高对比度、去掉背景，或者增加网格密度。',
      ],
    },
    tips: {
      title: '像素网格技巧',
      items: [
        '背景不重要时，先贴近主体裁剪。',
        '图标用较少格子，肖像和细节物体用更多格子。',
        '需要清晰图案时，避免低对比度图片。',
        '下载的 PNG 更适合做规划参考，而不是最终精修图。',
      ],
    },
  },
  'add-grid-to-photo': {
    what: {
      title: '给照片加网格是什么意思？',
      paragraphs: [
        '给照片加网格，就是在原图上绘制等距的水平线和垂直线。结果仍然是一张完整图片，但它拥有了一个可视化坐标系统。',
        '和 Instagram 切图工具不同，这个页面不会把照片切成多个文件，而是在图片上方叠加参考线。你可以控制网格密度、线宽、透明度、颜色和标签。',
      ],
    },
    how: {
      title: '如何给照片添加网格覆盖层',
      items: [
        '上传要标注或作为参考的照片。',
        '根据需要的细节程度选择行数和列数。',
        '浅色照片使用深色线，深色照片使用白色或彩色线。',
        '只需要轻微参考时，降低线条透明度。',
        '用于教学、反馈或修改说明时，打开坐标标签。',
      ],
    },
    why: {
      title: '为什么使用照片网格覆盖',
      paragraphs: [
        '网格覆盖能让视觉反馈更准确。相比“把物体往左上移一点”，你可以直接指出某一格或某一行。',
        '艺术家用它检查比例，老师用它制作讲义，设计师用它做版面反馈，手作爱好者用它在转成图案前数清细节。',
      ],
    },
    tips: {
      title: '照片网格技巧',
      items: [
        '协作时打开标签，干净打印参考图可以关闭标签。',
        '高密度网格要保持线条细，否则会遮住照片。',
        '比较比例时使用方形网格，检查版式时使用矩形网格。',
        '如果要打印，可以导出几种不同透明度版本。',
      ],
    },
  },
  'cross-stitch-grid-maker': {
    what: {
      title: '什么是十字绣网格工具？',
      paragraphs: [
        '十字绣网格工具会把参考图片转换成按格计数的方形指南。每个格子都能帮助你在制作完整图案前比较形状和颜色位置。',
        '这个 MVP 重点是网格清晰度，而不是自动生成绣线转换表。选择绣线颜色或针法符号之前，先确认图片在目标格数下是否仍然可读。',
      ],
    },
    how: {
      title: '如何制作十字绣网格',
      items: [
        '上传主体清楚、对比度足够的参考图片。',
        '从 40x40 开始，再根据布料 count 或最终尺寸调整。',
        '使用细线，避免遮住小细节。',
        '放大预览，检查边缘和脸部特征是否仍然清晰。',
        '下载 PNG，并在你习惯的流程中添加颜色备注或符号。',
      ],
    },
    why: {
      title: '为什么十字绣要先看网格',
      paragraphs: [
        '十字绣是按格计数的手作，网格就是项目结构。一张照片看起来很漂亮，但压缩到有限格数后可能会失去辨识度。',
        '网格预览能帮助你在深入做绣线选择前，先测试裁剪、密度和主体可读性。',
      ],
    },
    tips: {
      title: '十字绣网格技巧',
      items: [
        '背景杂乱的图片先简化再上传。',
        '肖像使用更高格数，图标或符号可以使用较低格数。',
        '把原图和网格版放在一起，方便判断颜色。',
        '不要只依赖网格做最终绣线选择，它更适合作为规划基础。',
      ],
    },
  },
};

export function getSeoContent(slug: string, locale: Locale | 'en' = 'en') {
  const localizedContent = {
    en: enContent,
    es: esContent,
    pt: ptContent,
    ja: jaContent,
    zh: zhContent,
  }[locale];

  return localizedContent[slug] ?? localizedContent.home;
}
