import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";

// Have fun with the cube in the terminal!
// const cli = new CliCube();
// cli.cube.scramble();
// cli.promptMove();

// Solve the cube
const solver = new Solver();
solver.scramble();

// const corners = solver.findWhiteCorners();
// const index = 3;
// log(corners[index]);
// log(solver.moveWhiteCornerToBottom(corners[index]));
// solver.turn("right", 1);
// solver.turn2("up");

log(solver.visualizeCube());
solver.solveFirstLayer();
