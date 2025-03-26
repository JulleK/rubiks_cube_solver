import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";
import { Cube } from "./cube.js";
import { displayMoveAsAscii } from "./utils/move_ascii.js";
import { sleep } from "./utils/sleep.js";
import { scrambles } from "./utils/testScrambles.js";

const cube = new Cube();
cube.scramble();
// cube.setCubeState(scrambles[0]);

solveAndVisualize(cube);

async function solveAndVisualize(cube: Cube) {
  const solver = new Solver(cube);
  solver.solve();

  const moves = solver.getMoveHistory();
  // console.clear();

  // log(cube.visualizeCube());
  for (const move of moves) {
    // await sleep(50);
    // console.clear();
    cube.applyMoves(move);

    // log(cube.visualizeCube());
    // displayMoveAsAscii(move);
  }
  cube.applyMoves("L", "R'");
  log(cube.visualizeCube());
}

// const cli = new CliCube(solver.getCubeState());
// cli.promptMove();
