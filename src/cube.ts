import type {
  Cube2by2,
  Color,
  Side,
  MoveDirection,
  CubeStickerIndex,
  Move,
} from "./typings/cube_types";

import { ColorsANSI, textColors } from "./utils/colors.js";
import { validMoves, parseMove, isValidMove } from "./utils/validate_move.js";
import { cornerMappings, Corners } from "./utils/corners.js";

export class Cube {
  private cubeState: Cube2by2;
  private colors: ColorsANSI;
  private corners: Corners;

  constructor(initialCube?: Cube2by2 | Cube) {
    if (initialCube) {
      this.cubeState = this.initiateCube(initialCube);
    } else {
      this.cubeState = new Array(24);
      this.createInitialCube();
    }

    this.corners = [];
    this.mapCorners();

    this.colors = textColors;
  }

  private initiateCube(initialCube: Cube | Cube2by2): Cube2by2 {
    if (initialCube instanceof Cube) {
      return [...initialCube.getCubeState()];
    } else {
      return [...initialCube];
    }
  }

  private createInitialCube() {
    this.createInitialFace("B");
    this.createInitialFace("O", 4);
    this.createInitialFace("Y", 8);
    this.createInitialFace("R", 12);
    this.createInitialFace("G", 16);
    this.createInitialFace("W", 20);
  }

  private createInitialFace(color: Color, initialIndex: number = 0) {
    for (let i = initialIndex; i < initialIndex + 4; i++) {
      this.cubeState[i] = color;
    }
  }

  public scramble() {
    for (let i = 0; i < 20; i++) {
      const randMove =
        validMoves[Math.floor(Math.random() * validMoves.length)];
      const randDirection = Math.random() < 0.5 ? 1 : -1;
      this.turn(randMove, randDirection);
    }

    this.mapCorners();
  }

  /**
   * maps the cubeState 1D array, like ['W', 'R', 'Y', ...] <-- sticker colors.
   * Into an array of corner coordinates, [ [0, 4, 21], [1, 7, 8], ... ].
   * With the colors corresponding to the index, [ ["W", ...], ["R", ...], ...].
   */
  protected mapCorners() {
    for (let i = 0; i < cornerMappings.length; i++) {
      this.corners[i] = [];
      for (let j = 0; j < cornerMappings[i].length; j++) {
        this.corners[i][j] = this.cubeState[cornerMappings[i][j]];
      }
    }
  }

  /**
   * Turns a side of the cube, for example left side.
   * @param side
   * @param direction 1 for clockwise moves, -1 for counterclockwise.
   * To do the L' move on the cube, side = "left", direction = -1
   */
  public turn(side: Side, direction: MoveDirection) {
    switch (side) {
      case "left":
        this.moveStickers(0, 1, 2, 3, direction);
        this.moveStickers(8, 12, 22, 4, direction);
        this.moveStickers(11, 15, 21, 7, direction);
        break;
      case "back":
        this.moveStickers(4, 5, 6, 7, direction);
        this.moveStickers(1, 21, 17, 9, direction);
        this.moveStickers(0, 20, 16, 8, direction);
        break;
      case "up":
        this.moveStickers(8, 9, 10, 11, direction);
        this.moveStickers(1, 6, 19, 12, direction);
        this.moveStickers(2, 7, 16, 13, direction);
        break;
      case "front":
        this.moveStickers(12, 13, 14, 15, direction);
        this.moveStickers(3, 11, 19, 23, direction);
        this.moveStickers(2, 10, 18, 22, direction);
        break;
      case "right":
        this.moveStickers(16, 17, 18, 19, direction);
        this.moveStickers(9, 5, 23, 13, direction);
        this.moveStickers(10, 6, 20, 14, direction);
        break;
      case "down":
        this.moveStickers(20, 21, 22, 23, direction);
        this.moveStickers(5, 0, 15, 18, direction);
        this.moveStickers(4, 3, 14, 17, direction);
        break;
      default:
        throw new Error("unknown side " + side);
    }

    this.mapCorners();
  }

  public turn2(side: Side) {
    this.turn(side, 1);
    this.turn(side, 1);
  }

  /**
   * apllies a sequence of moves to the cube
   * @param moves sequence of moves
   * example usage: this.applyMove("R", "U", "R'")
   */
  public applyMoves(...moves: Move[]) {
    for (let inputMove of moves) {
      const { move, direction, times } = parseMove(inputMove);
      if (isValidMove(move)) {
        if (times === 2) this.turn2(move);
        else this.turn(move, direction);
      }
    }
  }

  private moveStickers(
    a: CubeStickerIndex,
    b: CubeStickerIndex,
    c: CubeStickerIndex,
    d: CubeStickerIndex,
    direction: MoveDirection
  ) {
    const temp = this.cubeState[a];
    switch (direction) {
      case -1: // counter-clockwise
        this.cubeState[a] = this.cubeState[b];
        this.cubeState[b] = this.cubeState[c];
        this.cubeState[c] = this.cubeState[d];
        this.cubeState[d] = temp;
        break;
      case 1: // clockwise
        this.cubeState[a] = this.cubeState[d];
        this.cubeState[d] = this.cubeState[c];
        this.cubeState[c] = this.cubeState[b];
        this.cubeState[b] = temp;
        break;
      default:
        throw new Error("Unknown direction");
    }
  }

  private colorizeCube() {
    const cube: string[] = [...this.cubeState];
    for (let i = 0; i < cube.length; i++) {
      cube[i] = this.colorizeSticker(cube[i] as Color);
    }
    return cube;
  }

  // format a sticker to be displayed with color in the terminal
  private colorizeSticker(sticker: Color) {
    return `${this.colors[sticker]}${sticker}${this.colors.reset}`;
  }

  public getCubeState() {
    return [...this.cubeState];
  }

  protected setCubeState(cubeState: Cube2by2) {
    this.cubeState = cubeState;
    this.mapCorners();
  }

  public visualizeCube() {
    const cube = this.colorizeCube();
    return `
             +------+
             | ${cube[8]}  ${cube[9]} |
             | ${cube[11]}  ${cube[10]} |
      +------+------+------+------+
      | ${cube[1]}  ${cube[2]} | ${cube[12]}  ${cube[13]} | ${cube[19]}  ${cube[16]} | ${cube[6]}  ${cube[7]} |
      | ${cube[0]}  ${cube[3]} | ${cube[15]}  ${cube[14]} | ${cube[18]}  ${cube[17]} | ${cube[5]}  ${cube[4]} |
      +------+------+------+------+
             | ${cube[22]}  ${cube[23]} |
             | ${cube[21]}  ${cube[20]} |
             +------+
    `;
  }
}
