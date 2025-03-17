import { Cube } from "./cube.js";
import { bottomWhiteCornerSlots, cornerMappings, topRightCorner, topCornerSlots } from "./corners.js";
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

  public solveFirstLayer() {
    const whiteCorners = this.findWhiteCorners()

    for (const corner of whiteCorners) {
      this.insertWhiteCorner(corner)
    }

    // TODO!!!
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

  private insertWhiteCorner(corner: Corner) {
    const cube = this.cube.getCubeState();
    const [i1, i2, i3] = corner; // destructure corner indices

    // identify the two non-white colors
    let colors = [cube[i1], cube[i2], cube[i3]].filter((c) => c !== "W");

    let correctSlot = this.getCorrectSlot(colors);
    if (!correctSlot) return // skip if no matching slot found


    if (this.isInTopLayer(corner)) {
      // NIE DZIALA, bo corner po zrobieniu ruchu nie jest updatowany i dalej ma te same kordynaty
      // move white corner to top-right
      console.log(`${corner} is in the top layer`)
        this.cube.applyMove("U2")
        console.log(corner)
        console.log(this.isInTopRight(corner))
    }

    // TODO!!!
  }

  // Finds the correct bottom slot for a corner based on its two non-white colors
  private getCorrectSlot(colors: Color[]) {
    const slots = bottomWhiteCornerSlots
    const colorKey = colors.sort().join("-");
    if (colorKey in slots) {
      return slots[colorKey as keyof typeof slots];
    }
    else return null
  }

  private isInTopLayer(corner: Corner) {
    return topCornerSlots.some(position => JSON.stringify(position) === JSON.stringify(corner))
  }

  private isInTopRight(corner: Corner) {
    return JSON.stringify(topRightCorner) === JSON.stringify(corner)
}
}
