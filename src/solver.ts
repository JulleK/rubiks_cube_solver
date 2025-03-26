import { Cube } from "./cube.js";
import {
  bottomWhiteCornerSlots,
  cornerMappings,
  topRightCorner,
  topCornerSlots,
} from "./utils/corners.js";
import type { Corner, Cube2by2, Move } from "./typings/cube_types.js";

export class Solver extends Cube {
  private moveHistory: Move[];
  constructor(cube?: Cube | Cube2by2) {
    if (cube) super(cube);
    else {
      super();
      this.scramble();
    }
    this.moveHistory = [];
  }

  public solve() {
    this.solveFirstLayer();
    this.solveSecondLayer();
  }

  private solveFirstLayer() {
    while (
      !this.areWhiteCornersCorrectlyPlaced() &&
      this.moveHistory.length < 30
    ) {
      const whiteCorners = this.findWhiteCorners();
      for (const corner of whiteCorners) {
        this.insertWhiteCorner(corner);
      }
    }
  }

  // step 1 of solving - find white corners
  public findWhiteCorners(): Array<Corner> {
    const cube = this.getCubeState();
    const whiteCorners: Array<Corner> = [];
    for (const corner of cornerMappings) {
      if (corner.some((index: number) => cube[index] === "W")) {
        whiteCorners.push(corner);
      }
    }

    return whiteCorners;
  }

  // try to insert a white corner
  private insertWhiteCorner(corner: Corner) {
    let correctSlot = this.getCorrectSlot(corner);
    if (!correctSlot) return; // skip if no matching slot found

    if (this.isInTopLayer(corner)) {
      this.moveToTopRight(corner);
      this.insertTopRight(correctSlot);
    } else if (!this.isCornerInCorrectSlot(corner)) {
      // TODO: add checking if correctly oriented, not only if in correct slot
      this.moveWhiteCornerFromBottom(corner);
    }
  }

  // Finds the correct bottom slot for a corner
  private getCorrectSlot(corner: Corner) {
    const cube = this.getCubeState();
    const [i1, i2, i3] = corner; // destructure corner indices

    // identify the two non-white colors
    let colors = [cube[i1], cube[i2], cube[i3]].filter((c) => c !== "W");

    const slots = bottomWhiteCornerSlots;
    const colorKey = colors.sort().join("-");
    if (colorKey in slots) {
      return slots[colorKey as keyof typeof slots];
    } else return null;
  }

  private isCornerInCorrectSlot(corner: Corner) {
    const slot = this.getCorrectSlot(corner);
    return JSON.stringify(corner) === JSON.stringify(slot);
  }

  private isInTopLayer(corner: Corner) {
    return topCornerSlots.some(
      (position) => JSON.stringify(position) === JSON.stringify(corner)
    );
  }

  private areWhiteCornersCorrectlyPlaced() {
    const whiteCorners = this.findWhiteCorners();
    for (let corner of whiteCorners) {
      // return false: if in top layer
      if (this.isInTopLayer(corner)) return false;

      // or if in incorrect slot
      if (!this.isCornerInCorrectSlot(corner)) return false;
    }
    return true;
  }

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
      this.solverApplyMoves(move);
    }
  }

  private insertTopRight(correctSlot: Corner) {
    // move the bottom layer into position
    const move = this.prepareBottomForInsert(correctSlot);

    // insert the corner, with correct moves
    this.orientTopRightWhiteCorner();

    // move back the bottom layer
    if (move) this.unprepareBottomForInsert(move);
  }

  private prepareBottomForInsert(correctSlot: Corner) {
    let move: Move | null = null;
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

    if (move) this.solverApplyMoves(move);
    return move;
  }

  private unprepareBottomForInsert(move: Move) {
    let moveBack: Move | null = null;

    if (move === "D") moveBack = "D'";
    else if (move === "D'") moveBack = "D";
    else if (move === "D2") moveBack = "D2";

    if (moveBack) this.solverApplyMoves(moveBack);
  }

  // if white facing right, do RUR'U'
  // white facing left, do URU'R'
  // white facing up, do F'U2FU2RU'R'
  private orientTopRightWhiteCorner() {
    const cube = this.getCubeState();
    const moves: Move[] = [];
    if (cube[topRightCorner[0]] === "W") {
      moves.push("F'", "U2", "F", "U2", "R", "U'", "R'");
    } else if (cube[topRightCorner[1]] === "W") {
      moves.push("U", "R", "U'", "R'");
    } else if (cube[topRightCorner[2]] === "W") {
      moves.push("R", "U", "R'");
    }

    this.solverApplyMoves(...moves);
  }

  private moveWhiteCornerFromBottom(corner: Corner) {
    const moves: Move[] = [];
    switch (corner[0]) {
      case 0:
        moves.push("B'", "U'", "B");
        break;
      case 3:
        moves.push("F", "U'", "F'");
        break;
      case 5:
        moves.push("B", "U", "B'");
        break;
      case 14:
        moves.push("F'", "U'", "F");
        break;
    }

    this.solverApplyMoves(...moves);
  }

  // ---- SOLVING TOP LAYER ----

  private solveSecondLayer() {
    this.mapCorners();

    // TODO
    // find the one correct corner
    // if none or more than one correct:
    //   do "U" move
    // if exactly all correct:
    //   do the algorithm from LBL
    // if all correct:
    //   done!
  }

  // ---- UTILITY METHODS ----

  private solverApplyMoves(...moves: Move[]) {
    this.applyMoves(...moves);
    this.addMovesToHistory(...moves);
    this.mapCorners();
  }

  private addMovesToHistory(...moves: Move[]) {
    for (const move of moves) {
      this.moveHistory.push(move);
    }
  }

  public getMoveHistory() {
    return [...this.moveHistory];
  }
}
