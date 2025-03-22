import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";
import { Cube } from "./cube.js";
import { displayMoveAsAscii } from "./utils/move_ascii.js";
import { sleep } from "./utils/sleep.js";

const cube = new Cube();
cube.scramble();

solveAndVisualize(cube);

// const cli = new CliCube(solver.getCubeState());
// cli.promptMove();

async function solveAndVisualize(cube: Cube) {
  const solver = new Solver(cube);
  solver.solveFirstLayer();

  const moves = solver.getMoveHistory();
  console.clear();

  log(cube.visualizeCube());
  for (const move of moves) {
    await sleep();
    console.clear();
    cube.applyMoves(move);
    log(cube.visualizeCube());
    displayMoveAsAscii(move);
  }
}
