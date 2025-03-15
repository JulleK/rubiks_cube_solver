import { Cube } from "./cube.js";
import { cornerMappings } from "./corners.js";

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
