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

import type { Color, Corner } from "./typings/cube_types";

type CornerMappings = Array<Corner>;
export type Corners = Array<Color[]>;

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
