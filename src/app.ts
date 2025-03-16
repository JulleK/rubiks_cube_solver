import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";

// Have fun with the cube in the terminal!
// const cli = new CliCube();
// cli.cube.scramble();
// cli.promptMove();

// Solve the cube
const solver = new Solver();

const corners = solver.findWhiteCorners();
log(solver.cube.visualizeCube());
const index = 3;
log(corners[index]);
log(solver.moveWhiteCornerToBottom(corners[index]));
log(solver.cube.visualizeCube());
