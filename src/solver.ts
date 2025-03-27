import { Cube } from "./cube.js";
import {
  cornerMappings,
  topRightCorner,
  topCornerSlots,
  correctCornerSlots,
} from "./utils/corners.js";
import type { Corner, Cube2by2, Move } from "./typings/cube_types.js";
import {
  diagonalYellowCornersSwap,
  moveWhiteBackLeftCornerFromBottom,
  moveWhiteBackRightCornerFromBottom,
  moveWhiteFrontLeftCornerFromBottom,
  moveWhiteFrontRightCornerFromBottom,
  orientBottomWhiteCornerCase1,
  orientBottomWhiteCornerCase2,
  orientBottomWhiteCornerCase3,
  orientBottomWhiteCornerCase4,
  orientBottomWhiteCornerCase5,
  orientBottomWhiteCornerCase6,
  orientBottomWhiteCornerCase7,
  orientBottomWhiteCornerCase8,
  orientTopRightWhiteCornerLongCase,
  orientTopRightWhiteCornerNormalCase,
  orientTopRightWhiteCornerReverseCase,
  threeYellowCornersSwap,
} from "./algorithms.js";

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
    this.solveLastLayer();
  }

  // ---- SOLVING BOTTOM LAYER ----

  private solveFirstLayer() {
    while (!this.areWhiteCornersCorrectlyPlaced()) {
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
      this.moveWhiteCornerFromBottom(corner);
    } else if (!this.isWhiteCornerOriented(corner)) {
      this.orientBottomWhiteCorner(corner);
    }
  }

  // Finds the correct bottom slot for a corner based on it's indices
  private getCorrectSlot(corner: Corner) {
    const cube = this.getCubeState();
    const [i1, i2, i3] = corner; // destructure corner indices

    // identify the three colors
    let colors = [cube[i1], cube[i2], cube[i3]];

    const slots = correctCornerSlots;
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

  private isWhiteCornerOriented(corner: Corner) {
    if (!this.isCornerInCorrectSlot(corner)) return false;
    const cube = this.getCubeState();

    // white at the bottom = corner correctly oriented
    if (cube[corner[2]] === "W") return true;

    return false;
  }

  private orientBottomWhiteCorner(corner: Corner) {
    const cube = this.getCubeState();
    let moves: Move[] | null = null;
    // that's a hell lot of algorithms
    if (corner[0] === 0 && cube[0] === "W") {
      moves = orientBottomWhiteCornerCase1;
    } else if (corner[0] === 3 && cube[3] === "W") {
      moves = orientBottomWhiteCornerCase2;
    } else if (corner[0] === 5 && cube[5] === "W") {
      moves = orientBottomWhiteCornerCase3;
    } else if (corner[0] === 14 && cube[14] === "W") {
      moves = orientBottomWhiteCornerCase4;
    } else if (corner[1] === 4 && cube[4] === "W") {
      moves = orientBottomWhiteCornerCase5;
    } else if (corner[1] === 15 && cube[15] === "W") {
      moves = orientBottomWhiteCornerCase6;
    } else if (corner[1] === 17 && cube[17] === "W") {
      moves = orientBottomWhiteCornerCase7;
    } else if (corner[1] === 18 && cube[18] === "W") {
      moves = orientBottomWhiteCornerCase8;
    }
    if (moves) this.solverApplyMoves(moves);
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
    let moves: Move[] | null = null;
    if (cube[topRightCorner[0]] === "W") {
      moves = orientTopRightWhiteCornerLongCase;
    } else if (cube[topRightCorner[1]] === "W") {
      moves = orientTopRightWhiteCornerReverseCase;
    } else if (cube[topRightCorner[2]] === "W") {
      moves = orientTopRightWhiteCornerNormalCase;
    }
    if (moves) this.solverApplyMoves(moves);
  }

  private moveWhiteCornerFromBottom(corner: Corner) {
    let moves: Move[] | null = null;
    switch (corner[0]) {
      case 0:
        moves = moveWhiteBackLeftCornerFromBottom;
        break;
      case 3:
        moves = moveWhiteFrontLeftCornerFromBottom;
        break;
      case 5:
        moves = moveWhiteBackRightCornerFromBottom;
        break;
      case 14:
        moves = moveWhiteFrontRightCornerFromBottom;
        break;
    }
    if (moves) this.solverApplyMoves(moves);
  }

  // ---- SOLVING TOP LAYER ----

  private solveSecondLayer() {
    this.mapCorners();

    let count = this.countCorrectlyPlacedYellowCorners();
    while (count !== 4) {
      if (count === 1) {
        this.swap3YellowCorners();
      } else if (count === 2) {
        this.swapDiagonalYellowCorners();
      } else {
        this.solverApplyMoves("U");
      }
      count = this.countCorrectlyPlacedYellowCorners();
    }
  }

  private countCorrectlyPlacedYellowCorners() {
    let count = 0;
    for (const corner of topCornerSlots) {
      if (this.isCornerInCorrectSlot(corner)) {
        count++;
      }
    }
    return count;
  }

  private swap3YellowCorners() {
    let correctCorner: Corner | null = null;
    let move: Move | null = null;

    // find the one correct corner
    for (const corner of topCornerSlots) {
      if (this.isCornerInCorrectSlot(corner)) {
        correctCorner = corner;
      }
    }

    // move the one correct corner top right corner [10, 13, 19]
    //  in order to always do the same algorithm
    if (correctCorner) {
      switch (correctCorner[0]) {
        case 1:
          move = "U2";
          break;
        case 2:
          move = "U'";
          break;
        case 6:
          move = "U";
          break;
      }
    }

    // apply the algorithm to swap three yellow corners
    this.solverApplyMoves(threeYellowCornersSwap);

    // when done, move back the top layer into it's previous position
    if (move === "U'") this.solverApplyMoves("U");
    else if (move === "U") this.solverApplyMoves("U'");
    else if (move === "U2") this.solverApplyMoves("U2");
  }

  private swapDiagonalYellowCorners() {
    // There should be two correct corners and
    //  we need to check if they are placed diagonally to each other
    const correctCorners: Corner[] = [];
    let move: Move | null = null;

    for (const corner of topCornerSlots) {
      if (this.isCornerInCorrectSlot(corner)) {
        correctCorners.push(corner);
      }
    }
    if (correctCorners.length !== 2) return;

    // if front top right corner and
    //  behind top left corners are in correct slots
    if (correctCorners[0][0] === 1 && correctCorners[1][0] === 10) {
      move = "U";
    } else if (correctCorners[0][0] !== 2 || correctCorners[1][0] !== 6) {
      // return because corners are adjacent to each other, not diagonal
      return;
    }

    this.solverApplyMoves(diagonalYellowCornersSwap);

    if (move === "U") this.solverApplyMoves("U'");
  }

  // ---- ROTATING YELLOW CORNERS ----

  private solveLastLayer() {
    // TODO
  }

  // ---- UTILITY METHODS ----

  private solverApplyMoves(moves: Move[] | Move) {
    if (typeof moves === "string") {
      this.applyMoves(moves);
      this.addMovesToHistory(moves);
    } else {
      this.applyMoves(...moves);
      this.addMovesToHistory(...moves);
    }
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
