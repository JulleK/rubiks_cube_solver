import { Cube } from "./cube.js";
import { cornerMappings } from "./corners.js";

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

export class Solver {
  public cube: Cube;

  constructor(cube: Cube) {
    this.cube = cube;
  }

  // step 1 of solving - find white corners
  public findWhiteCorners() {
    const cube = this.cube.getCubeState();
    const whiteCorners = [];
    for (const corner of cornerMappings) {
      if (corner.some((index) => cube[index] === "W")) {
        whiteCorners.push(corner);
      }
    }

    return whiteCorners;
  }
}
