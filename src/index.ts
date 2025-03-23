import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";
import { Cube } from "./cube.js";
import { displayMoveAsAscii } from "./utils/move_ascii.js";
import { sleep } from "./utils/sleep.js";

const cube = new Cube();
// cube.scramble();

cube.applyMoves("R", "U2", "R'", "F", "U'", "F'", "U'", "R", "U", "R'", "R");

solveAndVisualize(cube);

async function solveAndVisualize(cube: Cube) {
  const solver = new Solver(cube);
  solver.solveFirstLayer();

  const moves = solver.getMoveHistory();
  console.clear();

  log(cube.visualizeCube());
  for (const move of moves) {
    await sleep(1000);
    console.clear();
    cube.applyMoves(move);
    log(cube.visualizeCube());
    displayMoveAsAscii(move);
  }
}

// const cli = new CliCube(solver.getCubeState());
// cli.promptMove();
