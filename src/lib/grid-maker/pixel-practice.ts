export type PracticeLocale = 'en' | 'pt';
export const practicePaths = {
  en: '/easy-pixel-art-grid',
  pt: '/pt/pixel-art-facil',
} as const;
export const practicePalette = [
  '#ffffff',
  '#202824',
  '#e34d59',
  '#f2be38',
  '#22866d',
  '#4284d6',
  '#b76aba',
];

// Original 8x8 patterns; 0 is the white background, other digits index the palette.
export const practicePatterns = [
  {
    id: 'heart',
    names: { en: 'Heart', pt: 'Coração' },
    rows: [
      '00000000',
      '02200220',
      '22222222',
      '22222222',
      '02222220',
      '00222200',
      '00022000',
      '00000000',
    ],
  },
  {
    id: 'flower',
    names: { en: 'Flower', pt: 'Flor' },
    rows: [
      '00066000',
      '00666600',
      '06633660',
      '00666600',
      '00044000',
      '00444400',
      '00044000',
      '00044000',
    ],
  },
  {
    id: 'house',
    names: { en: 'House', pt: 'Casa' },
    rows: [
      '00011000',
      '00122100',
      '01222210',
      '11111111',
      '01333310',
      '01355310',
      '01311310',
      '01111110',
    ],
  },
  {
    id: 'diamond',
    names: { en: 'Diamond', pt: 'Diamante' },
    rows: [
      '00000000',
      '00555500',
      '05533550',
      '55555555',
      '05555550',
      '00555500',
      '00055000',
      '00000000',
    ],
  },
  {
    id: 'apple',
    names: { en: 'Apple', pt: 'Maçã' },
    rows: [
      '00014000',
      '00044000',
      '02202200',
      '22222220',
      '22222220',
      '22222220',
      '02222200',
      '00202000',
    ],
  },
  {
    id: 'cup',
    names: { en: 'Cup', pt: 'Caneca' },
    rows: [
      '00000000',
      '01111100',
      '01555110',
      '01555010',
      '01555110',
      '01555100',
      '00111000',
      '00000000',
    ],
  },
] as const;

export function patternCells(index: number, size: number) {
  const pattern = practicePatterns[index] ?? practicePatterns[0];
  return Array.from({ length: size * size }, (_, i) =>
    Number(
      pattern.rows[Math.floor((Math.floor(i / size) * 8) / size)][
        Math.floor(((i % size) * 8) / size)
      ]
    )
  );
}

export const practiceCopy = {
  en: {
    title: 'Easy Pixel Art Grid: Draw Simple Patterns',
    h1: 'Easy Pixel Art Grid',
    description:
      'Choose an original pattern, fill an 8x8 or 16x16 grid, and download your pixel art, reference or blank worksheet. Free and browser-based.',
    pattern: 'Pattern',
    size: 'Grid size',
    reference: 'Reference',
    board: 'Your drawing',
    show: 'Show reference',
    color: 'Color',
    pen: 'Pencil',
    eraser: 'Eraser',
    undo: 'Undo',
    redo: 'Redo',
    clear: 'Clear drawing',
    confirm:
      'Replace your drawing? This will clear the current board and history.',
    download: 'Download PNG',
    answer: 'Reference PNG',
    blank: 'Blank grid PNG',
    lines: 'Include grid lines',
    error: 'Unable to download. Please try again.',
    home: 'Grid Maker',
    related: 'Convert a photo into a pixel grid',
    sections: [
      {
        title: 'Start with a small, recognizable pattern',
        body: 'A small grid makes it easier to see how a shape is built. Choose one of the six original patterns above and copy its colored squares onto your board. The 8x8 version has 64 cells, so you can count each row without losing your place. The 16x16 version enlarges the same motif into two-by-two blocks. It gives you room to add your own details without changing the basic outline.',
      },
      {
        title: 'How to complete your first drawing',
        body: 'Choose a pattern, keep the reference visible, and begin with the outline. Pick a color from the palette and select the matching cells on your board. Fill one row at a time, comparing the empty cells as well as the colored ones. Use the eraser for individual corrections or undo an entire stroke. Hide the reference when you want to try drawing the motif from memory.',
      },
      {
        title: 'Try the heart at two grid sizes',
        body: 'In the 8x8 heart, the first row is empty and the second row contains two red pairs separated by two empty cells. Copy those gaps first, then add the wider middle rows and the narrow point. Switch to 16x16 to start a new version: each original cell becomes four cells. Keep the outline, then try a darker edge or a light reflection using another palette color. Changing size or pattern starts a new board after confirmation when you have drawn something.',
      },
      {
        title: 'Choose the right download',
        body: 'Download PNG saves your current drawing, not the reference. Reference PNG saves the selected original pattern, and Blank grid PNG saves an empty worksheet. Files are 512x512 pixels with a white background. Grid size describes how many editable cells there are, not the pixel dimensions of the exported file. Turn off grid lines for a clean drawing; keep them on when you want a counted reference. For printing, choose a square print size and check your printer margins.',
      },
      {
        title: 'Make the pattern your own',
        body: 'Changing the palette is an easy first variation. Try a blue heart, a yellow cup or a different flower center, then alter one side of the outline. Check the silhouette before adding detail: a small shape needs clear edges more than subtle shading. All six starting patterns were created for this tool. You can use your downloaded variations as personal practice sheets or starting points for your own designs.',
      },
      {
        title: 'What this practice board does not do',
        body: 'This is a simple drawing exercise, not an image converter or a full animation editor. It does not upload pictures, assign thread or bead colors, or save projects to an account. Your drawing stays in this open page and is lost on refresh or navigation, so download it before leaving. If you already have a photograph and want to reduce it into colored cells, use the linked pixel grid converter instead.',
      },
    ],
    faq: [
      [
        'Which size is easiest?',
        'Start with 8x8. The 16x16 version uses the same pattern at twice the cell resolution and gives you more room to edit.',
      ],
      [
        'Can I undo a mistake?',
        'Yes. Undo restores the previous stroke or clear action; redo restores it again. Up to 100 actions are kept in the current page.',
      ],
      [
        'Do I need to upload an image?',
        'No. The six original reference patterns are included. Drawing and PNG generation run in your browser.',
      ],
      [
        'Will my drawing survive a refresh?',
        'No. Download your drawing before refreshing, changing pages or closing the browser.',
      ],
    ],
  },
  pt: {
    title: 'Pixel Art Fácil: Desenhe em uma Grade',
    h1: 'Pixel Art Fácil',
    description:
      'Escolha um desenho original, pinte uma grade 8x8 ou 16x16 e baixe sua arte, a referência ou uma folha em branco. Grátis, direto no navegador.',
    pattern: 'Modelo',
    size: 'Tamanho da grade',
    reference: 'Referência',
    board: 'Seu desenho',
    show: 'Mostrar referência',
    color: 'Cor',
    pen: 'Lápis',
    eraser: 'Borracha',
    undo: 'Desfazer',
    redo: 'Refazer',
    clear: 'Limpar desenho',
    confirm:
      'Substituir o desenho? A grade atual e o histórico serão apagados.',
    download: 'Baixar PNG',
    answer: 'PNG da referência',
    blank: 'PNG da grade vazia',
    lines: 'Incluir linhas',
    error: 'Não foi possível baixar. Tente novamente.',
    home: 'Ferramenta de grade',
    related: 'Converter uma foto em grade de pixels',
    sections: [
      {
        title: 'Comece com um desenho simples',
        body: 'Uma grade pequena ajuda a entender como as formas são construídas. Escolha um dos seis modelos originais e copie os quadrados coloridos para sua grade. A versão 8x8 tem 64 células, facilitando a contagem de cada linha. Na versão 16x16, cada célula do modelo ocupa um bloco de dois por dois. Assim você ganha espaço para acrescentar detalhes sem perder o contorno.',
      },
      {
        title: 'Como terminar seu primeiro desenho',
        body: 'Escolha um modelo, mantenha a referência visível e comece pelo contorno. Selecione uma cor na paleta e pinte as células correspondentes. Trabalhe uma linha por vez, comparando também os espaços vazios. Use a borracha para corrigir uma célula ou desfaça uma pincelada inteira. Oculte a referência quando quiser tentar desenhar de memória.',
      },
      {
        title: 'Experimente o coração em dois tamanhos',
        body: 'No coração 8x8, a primeira linha está vazia. A segunda contém dois pares vermelhos separados por duas células vazias. Copie esses espaços, acrescente as linhas centrais mais largas e termine com a ponta. Troque para 16x16 para começar uma nova versão: cada célula original passa a ocupar quatro células. Depois de copiar o contorno, experimente uma borda mais escura ou um reflexo com outra cor. Se você já pintou algo, trocar o modelo ou tamanho exige confirmação.',
      },
      {
        title: 'Qual arquivo baixar?',
        body: 'Baixar PNG salva o desenho que você pintou. PNG da referência salva o modelo escolhido. PNG da grade vazia gera uma folha para praticar. Os arquivos têm 512x512 pixels e fundo branco. O tamanho da grade indica a quantidade de células editáveis, não a resolução do arquivo. Desative as linhas para uma imagem limpa ou mantenha-as para contar as células. Ao imprimir, escolha um tamanho quadrado e confira as margens.',
      },
      {
        title: 'Crie uma variação',
        body: 'Trocar as cores é uma boa primeira experiência. Faça um coração azul, uma caneca amarela ou mude o centro da flor. Depois altere parte do contorno. Observe a silhueta antes de acrescentar sombras: em desenhos pequenos, bordas claras ajudam mais do que muitos detalhes. Os seis modelos foram criados para esta ferramenta. Use suas variações como exercícios pessoais ou como ponto de partida para seus próprios desenhos.',
      },
      {
        title: 'Limites da ferramenta',
        body: 'Esta grade é um exercício de desenho, não um conversor de fotos nem um editor de animação. Ela não envia imagens, não escolhe linhas de bordado ou contas e não salva projetos em uma conta. Seu desenho fica apenas nesta página e é perdido ao recarregar ou sair. Baixe o PNG antes de fechar. Para transformar uma fotografia em blocos coloridos, abra o conversor de grade de pixels no link abaixo.',
      },
    ],
    faq: [
      [
        'Qual tamanho é mais fácil?',
        'Comece com 8x8. A versão 16x16 amplia o mesmo modelo e oferece mais células para editar detalhes.',
      ],
      [
        'Posso desfazer um erro?',
        'Sim. Desfazer recupera o estado anterior à pincelada ou limpeza; refazer reaplica a ação. São mantidas até 100 ações nesta página.',
      ],
      [
        'Preciso enviar uma imagem?',
        'Não. Os seis modelos originais já estão disponíveis. O desenho e a geração do PNG acontecem no navegador.',
      ],
      [
        'O desenho fica salvo ao recarregar?',
        'Não. Baixe o desenho antes de recarregar, navegar para outra página ou fechar o navegador.',
      ],
    ],
  },
};
