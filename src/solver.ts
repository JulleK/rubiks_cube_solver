import { Cube } from "./cube.js";
import {
  bottomWhiteCornerSlots,
  cornerMappings,
  topRightCorner,
  topCornerSlots,
} from "./corners.js";
import type { Color, Corner, Cube2by2, Move } from "./typings/cube_types.js";

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

export class Solver extends Cube {
  constructor(cube?: Cube2by2) {
    super();
    if (cube) this.setCubeState(cube);
  }

  public solveFirstLayer() {
    const whiteCorners = this.findWhiteCorners();

    for (const corner of whiteCorners) {
      this.insertWhiteCorner(corner);
    }

    // TODO!!!
  }

  // step 1 of solving - find white corners
  public findWhiteCorners(): Array<Corner> {
    const cube = this.getCubeState();
    const whiteCorners: Array<Corner> = [];
    for (const corner of cornerMappings) {
      if (corner.some((index) => cube[index] === "W")) {
        whiteCorners.push(corner);
      }
    }

    return whiteCorners;
  }

  private insertWhiteCorner(corner: Corner) {
    const cube = this.getCubeState();
    const [i1, i2, i3] = corner; // destructure corner indices

    // identify the two non-white colors
    let colors = [cube[i1], cube[i2], cube[i3]].filter((c) => c !== "W");

    let correctSlot = this.getCorrectSlot(colors);
    if (!correctSlot) return; // skip if no matching slot found

    if (this.isInTopLayer(corner)) {
      this.moveToTopRight(corner);
      this.insertTopRight(correctSlot);
    }

    // TODO!!!
  }

  // Finds the correct bottom slot for a corner based on its two non-white colors
  private getCorrectSlot(colors: Color[]) {
    const slots = bottomWhiteCornerSlots;
    const colorKey = colors.sort().join("-");
    if (colorKey in slots) {
      return slots[colorKey as keyof typeof slots];
    } else return null;
  }

  private isInTopLayer(corner: Corner) {
    return topCornerSlots.some(
      (position) => JSON.stringify(position) === JSON.stringify(corner)
    );
  }

  // private isInTopRight(corner: Corner) {
  //   return JSON.stringify(topRightCorner) === JSON.stringify(corner);
  // }

  private moveToTopRight(corner: Corner) {
    // these number values are the corner indices,
    // and come from mapping the cube array into actual cube
    let move: Move | null = null;
    switch (corner[0]) {
      case 1:
        move = "U2";
        break;
      case 2:
        move = "U'";
        break;
      case 6:
        move = "U";
    }

    if (move) {
      this.applyMove(move);
      this.mapCorners();
    }
  }

  private orientTopRightWhiteCorner() {
    const cube = this.getCubeState();
    if (cube[13] === "W") {
      this.applyMove("U", "R", "U'", "R'");
    } else if (cube[19] === "W") {
      this.applyMove("R", "U", "R'", "U'");
    } else if (cube[10] === "W") {
      this.applyMove("F'", "U2", "F", "U2", "R", "U'", "R'");
    }
    this.mapCorners();
  }

  private insertTopRight(correctSlot: Corner) {
    // move the bottom layer into position
    let move: Move | null = null;
    console.log(correctSlot);
    switch (correctSlot[0]) {
      case 0:
        move = "D2";
        break;
      case 3:
        move = "D";
        break;
      case 5:
        move = "D'";
    }

    if (move) this.applyMove(move);

    // insert the corner, with correct moves
    this.orientTopRightWhiteCorner();

    // move back the bottom layer
    if (move === "D") move = "D'";
    else if (move === "D'") move = "D";
    if (move) this.applyMove(move);
    this.mapCorners();
  }
}
