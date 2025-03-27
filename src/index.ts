import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";
import { Cube } from "./cube.js";
import { displayMoveAsAscii } from "./utils/move_ascii.js";
import { sleep } from "./utils/sleep.js";

const cube = new Cube();
cube.scramble();

solveAndVisualize(cube);

async function solveAndVisualize(cube: Cube) {
  const solver = new Solver(cube);
  solver.solve();

  const moves = solver.getMoveHistory();
  console.clear();

  log(cube.visualizeCube());
  for (const move of moves) {
    await sleep(300);
    console.clear();
    cube.applyMoves(move);

    log(cube.visualizeCube());
    displayMoveAsAscii(move);
  }
  log(cube.visualizeCube());
}

// const cli = new CliCube(solver.getCubeState());
// cli.promptMove();
