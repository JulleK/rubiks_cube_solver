import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";
import { Cube } from "./cube.js";
import { Move } from "./typings/cube_types.js";
import { displayMoveAsAscii } from "./utils/move_ascii.js";

const cube = new Cube();

// cube.applyMoves("F'", "U2", "F", "U2", "R", "U'", "R'");
cube.scramble();

const solver = new Solver(cube);
solver.solveFirstLayer();

const moves = solver.getMoveHistory();
console.clear();

log(cube.visualizeCube());
for (const move of moves) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.clear();
  cube.applyMoves(move);
  log(cube.visualizeCube());
  displayMoveAsAscii(move);
}

// const cli = new CliCube(solver.getCubeState());
// cli.promptMove();
