import { Cube } from "./cube.js";
import { cornerMappings } from "./corners.js";
import type { Color, Corner } from "./typings/cube_types.js";

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

  constructor(cube?: Cube) {
    if (!cube) this.cube = new Cube();
    else this.cube = cube;
  }

  // step 1 of solving - find white corners
  public findWhiteCorners(): Array<Corner> {
    const cube = this.cube.getCubeState();
    const whiteCorners: Array<Corner> = [];
    for (const corner of cornerMappings) {
      if (corner.some((index) => cube[index] === "W")) {
        whiteCorners.push(corner);
      }
    }

    return whiteCorners;
  }

  public moveWhiteCornerToBottom(corner: Corner) {
    const cube = this.cube.getCubeState();
    const [i1, i2, i3] = corner; // destructure corner indices

    // identify the two non-white colors
    let colors = [cube[i1], cube[i2], cube[i3]].filter((c) => c !== "W");

    let correctSlot = this.getCorrectSlot(colors);

    // const bottomIndices = [20, 21, 22, 23];

    // if the white corner is at the top, move it to the bottom
    // if (
    //   !bottomIndices.includes(i1) &&
    //   !bottomIndices.includes(i2) &&
    //   !bottomIndices.includes(i3)
    // ) {
    //   this.cube.applyMoves("R", "U", "R'");
    // }
  }

  // Finds the correct bottom slot for a corner based on its two non-white colors
  private getCorrectSlot(colors: Color[]) {
    const slots = {
      "B-R": [3, 15, 22], // blue red
      "G-R": [14, 18, 23], // green red
      "G-O": [5, 17, 20], // green orange
      "B-O": [0, 4, 21], // blue orange
    };
    const colorKey = colors.sort().join("-");
    if (colorKey in slots) {
      return slots[colorKey as keyof typeof slots];
    }
  }
}
