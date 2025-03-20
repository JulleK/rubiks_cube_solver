import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";

const solver = new Solver();
// solver.scramble();

// const corners = solver.findWhiteCorners();
// const index = 3;
// log(corners[index]);
// log(solver.moveWhiteCornerToBottom(corners[index]));
// solver.turn2("up");

// solver.applyMove("R", "U", "R'", "U'");
// solver.applyMove("D");
// log(solver.visualizeCube());
// solver.solveFirstLayer();
// log(solver.visualizeCube());

const cli = new CliCube(solver.getCubeState());
cli.promptMove();
