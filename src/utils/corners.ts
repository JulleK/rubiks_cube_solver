//         +-------+
//         | 8   9 |
//         | 11 10 |
//  +------+-------+-------+------+
//  | 1  2 | 12 13 | 19 16 | 6  7 |
//  | 0  3 | 15 14 | 18 17 | 5  4 |
//  +------+-------+-------+------+
//         | 22 23 |
//         | 21 20 |
//         +-------+

import type { Corner } from "../typings/cube_types.js";

type CornerMappings = Array<Corner>;

export const cornerMappings: CornerMappings = [
  [0, 4, 21],
  [1, 7, 8],
  [2, 11, 12],
  [3, 15, 22],
  [5, 17, 20],
  [6, 9, 16],
  [10, 13, 19],
  [14, 18, 23],
];

export const correctCornerSlots: Record<string, Corner> = {
  "B-R-W": [3, 15, 22], // blue red white
  "G-R-W": [14, 18, 23], // green red white
  "G-O-W": [5, 17, 20], // green orange white
  "B-O-W": [0, 4, 21], // blue orange white
  "B-R-Y": [2, 11, 12], // blue red yellow
  "G-R-Y": [10, 13, 19], // green red yellow
  "G-O-Y": [6, 9, 16], // green orange yellow
  "B-O-Y": [1, 7, 8], // blue orange yellow
};

export const topCornerSlots: Array<Corner> = [
  [1, 7, 8],
  [2, 11, 12],
  [6, 9, 16],
  [10, 13, 19],
];

export const topRightCorner = [10, 13, 19];
