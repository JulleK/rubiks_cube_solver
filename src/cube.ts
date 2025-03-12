import { Cube2by2, Color } from "./cube_types";

interface CubeInterface {
  cubeState: Cube2by2;
}

class Cube implements CubeInterface {
  cubeState: Cube2by2;
  constructor() {
    this.cubeState = new Array(24);
    this.createInitialCube();
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
}

const cube = new Cube();

console.log(cube.cubeState);
