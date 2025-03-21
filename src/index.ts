import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";
import { Cube } from "./cube.js";

const cube = new Cube();

cube.applyMoves("F'", "U2", "F", "U2", "R", "U'", "R'");

const solver = new Solver(cube.getCubeState())

log(cube.visualizeCube());
solver.solveFirstLayer();

const moves = solver.getMoveHistory();

log(cube.visualizeCube());

// WHY IS DOES cube CHANGE WHEN solver CHANGES

// for (const move of moves) {
//     setTimeout(() => {
//         // console.clear()
//         log(move)
//         cube.applyMoves(move)
//         log(cube.visualizeCube())
//     }, 1000)
// }

// // const cli = new CliCube(solver.getCubeState());
// // cli.promptMove();
