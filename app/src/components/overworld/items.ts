/**
 * Pixel item art (12x12) from the FigCraft design (build/overworld_o3.py). Used by the inventory, the advancement
 * tree and the trade screen. To give a new interest or skill an icon, add a sprite here and use its key in the data;
 * unknown keys fall back to `book`.
 */
export interface Item {
  rows: string[];
  pal: Record<string, string>;
}

export const ITEMS = {
  redstone_torch: {
    rows: ['.....rr.....', '....rRRr....', '....rRRr....', '.....rr.....', '.....bb.....', '.....bb.....', '.....bb.....',
      '.....bb.....', '.....bb.....', '.....bb.....', '............', '............'],
    pal: { r: '#FF2A1A', R: '#FFB0A0', b: '#6B4A24' },
  },
  camera: {
    rows: ['............', '..####......', '.#oooo#####.', '#kkkkkkkkkk#', '#kggggkkkkk#', '#kgwwgkkrrk#', '#kgwwgkkkkk#',
      '#kggggkkkkk#', '#kkkkkkkkkk#', '.##########.', '............', '............'],
    pal: { '#': '#1A1A1A', k: '#4A4A4A', g: '#222222', w: '#6AD0FF', o: '#888888', r: '#FF3030' },
  },
  book: {
    rows: ['..########..', '.#pppppppp#.', '.#pPPPPPPp#.', '.#pPppppPp#.', '.#pPpggpPp#.', '.#pPpggpPp#.', '.#pPppppPp#.',
      '.#pPPPPPPp#.', '.#pppppppp#.', '.#wwwwwwww#.', '..########..', '............'],
    pal: { '#': '#2A1450', p: '#6A3EA8', P: '#A978E0', g: '#FFD84A', w: '#E8E0D0' },
  },
  star: {
    rows: ['.....##.....', '.....ww.....', '....#ww#....', '#..#wwww#..#', '.#wwwyywww#.', '..#wyyyyw#..', '..#wyyyyw#..',
      '.#wwwyywww#.', '#..#wwww#..#', '....#ww#....', '.....ww.....', '.....##.....'],
    pal: { '#': '#C8C8E0', w: '#FFFFFF', y: '#FFE9A0' },
  },
  disc: {
    rows: ['....####....', '..##kkkk##..', '.#kkkkkkkk#.', '.#kkggggkk#.', '#kkgrrrrgkk#', '#kkgrwwrgkk#', '#kkgrwwrgkk#',
      '#kkgrrrrgkk#', '.#kkggggkk#.', '.#kkkkkkkk#.', '..##kkkk##..', '....####....'],
    pal: { '#': '#0E0E0E', k: '#2A2A2A', g: '#444444', r: '#E84AA0', w: '#111111' },
  },
  cup: {
    rows: ['............', '...w..w.....', '....w..w....', '..########..', '..#cccccc###', '..#cbbbbc#.#', '..#cbbbbc#.#',
      '..#cccccc###', '..#cccccc#..', '...######...', '.##########.', '............'],
    pal: { '#': '#555555', c: '#F0F0F0', b: '#6B3A1A', w: '#DDDDDD' },
  },
  sapling: {
    rows: ['....gg......', '...gGGg.gg..', '..gGGGggGGg.', '..gGgGGGGGg.', '...gGGgGGg..', '....gg.gg...', '.....bb.....',
      '.....bb.....', '....dbbd....', '...dddddd...', '..dddddddd..', '............'],
    pal: { g: '#3A8A1A', G: '#6ABE30', b: '#6B4A24', d: '#8A5A32' },
  },
  chest: {
    rows: ['............', '.##########.', '#oooooooooo#', '#oOOOOOOOOo#', '#oOOOOOOOOo#', '############', '#oOOOyyOOOo#',
      '#oOOOyyOOOo#', '#oOOOOOOOOo#', '#oOOOOOOOOo#', '.##########.', '............'],
    pal: { '#': '#3A2410', o: '#8A5A2A', O: '#B07A3A', y: '#E8C040' },
  },
  palette: {
    rows: ['...######...', '..#wwwwww#..', '.#wrwwwbww#.', '#wwwwwwwwww#', '#wgwwwwwyww#', '#wwwww##www#', '#wwww#..#ww#',
      '.#wwww##ww#.', '..#wwwwww#..', '...######...', '............', '............'],
    pal: { '#': '#5A3A1A', w: '#C89A5A', r: '#E82A2A', b: '#2A6AE8', g: '#3AC83A', y: '#F0D020' },
  },
  clock: {
    rows: ['...######...', '..#yyyyyy#..', '.#yybbbbyy#.', '#yybbbwbbyy#', '#ybbbbwbbby#', '#ybbbwwbbby#', '#ybbbbbbbby#',
      '#yybbbbbbyy#', '.#yybbbbyy#.', '..#yyyyyy#..', '...######...', '............'],
    pal: { '#': '#5A4010', y: '#E8C040', b: '#2A4A8A', w: '#FFFFFF' },
  },
  dye: {
    rows: ['............', '..rr..bb....', '.rRRr.bBBb..', '.rRRr.bBBb..', '..rr..bb....', '....yy..gg..', '...yYYygGGg.',
      '...yYYygGGg.', '....yy..gg..', '............', '............', '............'],
    pal: { r: '#B02020', R: '#E84040', b: '#2040B0', B: '#4070F0', y: '#C0A010', Y: '#F0D040', g: '#208020', G: '#40C040' },
  },
  emerald: {
    rows: ['....####....', '...#gGGg#...', '..#gGwGGg#..', '.#gGwGGGGg#.', '#gGGGGGGGGg#', '#ggGGGGGGgg#', '.#ggGGGGgg#.',
      '..#ggGGgg#..', '...#gggg#...', '....####....', '............', '............'],
    pal: { '#': '#0A5A28', g: '#17A34A', G: '#41F384', w: '#C8FFD8' },
  },
  paper: {
    rows: ['..########..', '..#wwwwww##.', '..#wkkkkw#w#', '..#wwwwwwww#', '..#wkkkkkkw#', '..#wwwwwwww#', '..#wkkkkkkw#',
      '..#wwwwwwww#', '..#wkkkkwww#', '..#wwwwwwww#', '..##########', '............'],
    pal: { '#': '#5A5A5A', w: '#F4F4F4', k: '#9A9A9A' },
  },
  arrow: {
    rows: ['............', '......#.....', '......##....', '#######w#...', '#wwwwwwww#..', '#wwwwwwwww#.', '#wwwwwwww#..',
      '#######w#...', '......##....', '......#.....', '............', '............'],
    pal: { '#': '#3B2A1A', w: '#F3E5C3' },
  },
  book_quill: {
    rows: ['..........ww....', '.........wWw....', '........wWw.....', '.......wWw......', '..####wWw####...',
      '.#bbbbwwbbbbb#..', '.#bBBBqBBBBBb#..', '.#bBBqBBBBBBb#..', '.#bBBBBBBBBBb#..', '.#bBBBBBBBBBb#..',
      '.#bBBBBBBBBBb#..', '.#bBBBBBBBBBb#..', '.#ppppppppppp#..', '..###########...', '................', '................'],
    pal: { '#': '#2A1408', b: '#6B3A1A', B: '#8A4E24', q: '#1A1A1A', p: '#F3E5C3', w: '#F0F0F0', W: '#C8C8C8' },
  },
} satisfies Record<string, Item>;

export type ItemKey = keyof typeof ITEMS;

export function item(key: string): Item {
  return (ITEMS as Record<string, Item>)[key] ?? ITEMS.book;
}
