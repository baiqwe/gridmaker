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
        'Use 8x8, 10x10, or 12x12 for most drawing references because the cells stay readable.',
        'Use 30x30 or denser grids for crochet, cross-stitch, beadwork, and pixel-style planning.',
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
        sharedPrivacy,
      ],
    },
    how: {
      title: 'How to create a pixel grid',
      items: [
        'Upload a photo, logo, or illustration with a clear subject.',
        'Start with 24x24 for a simple pixel preview or increase the grid for more detail.',
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
        'Es útil para retratos, animales, arquitectura, bodegones y transferencia a lienzo. Puedes ajustar densidad, color, opacidad y etiquetas.',
      ],
    },
    how: {
      title: 'Cómo añadir una cuadrícula para dibujo',
      items: [
        'Sube la foto de referencia.',
        'Empieza con 8x8 o 10x10.',
        'Dibuja la misma proporción en papel, lienzo o tablet.',
        'Baja la opacidad si las líneas molestan.',
        'Activa etiquetas si necesitas coordenadas.',
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

export function getSeoContent(slug: string, locale: Locale | 'en' = 'en') {
  if (locale === 'es' && esContent[slug]) {
    return esContent[slug];
  }
  return enContent[slug] ?? enContent.home;
}
