import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";
import { Cube } from "./cube.js";
import { displayMoveAsAscii } from "./utils/move_ascii.js";
import { sleep } from "./utils/sleep.js";
import { scrambles } from "./utils/testScrambles.js";

const cube = new Cube();
// cube.scramble();
cube.setCubeState(scrambles[0]);

// scramble with all white corners at the bottom
// cube.applyMoves("R", "U2", "R'", "F", "U'", "F'", "U'", "R", "U", "R'");

console.clear();
console.log(cube.visualizeCube());

solveAndVisualize(cube);

async function solveAndVisualize(cube: Cube) {
  const solver = new Solver(cube);
  solver.solve();

  const moves = solver.getMoveHistory();
  console.clear();

  log(cube.visualizeCube());
  for (const move of moves) {
    await sleep(500);
    console.clear();
    cube.applyMoves(move);
    log(cube.visualizeCube());
    displayMoveAsAscii(move);
  }
}

// const cli = new CliCube(solver.getCubeState());
// cli.promptMove();
