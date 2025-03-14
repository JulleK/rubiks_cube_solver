import type {
  Cube2by2,
  Color,
  Side,
  MoveDirection,
  CubeStickerIndex,
} from "./typings/cube_types";

import { ColorsANSI, textColors } from "./colors.js";
import { validMoves } from "./validate_move.js";

export class Cube {
  private cubeState: Cube2by2;
  private COLORS: ColorsANSI;

  constructor() {
    this.cubeState = new Array(24);
    this.createInitialCube();
    this.COLORS = textColors;
  }

  private createInitialCube() {
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
    this.createInitialFace("R");
    this.createInitialFace("Y", 4);
    this.createInitialFace("G", 8);
    this.createInitialFace("W", 12);
    this.createInitialFace("O", 16);
    this.createInitialFace("B", 20);
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
  }

  /**
   * Turns a side of the cube, for example left side
   * @param side
   * @param direction 1 for clockwise moves, -1 for counterclockwise
   * @param times how many times repeat the move, 1 by default.
   * To do the 2L' move on the cube, side = "left", direction = -1, times = 2
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
  }

  public turn2(side: Side, direction: MoveDirection) {
    this.turn(side, direction);
    this.turn(side, direction);
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
    return `${this.COLORS[sticker]}${sticker}${this.COLORS.reset}`;
  }

  public getCubeState() {
    return this.cubeState;
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
