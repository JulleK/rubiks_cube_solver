import { log } from "console";
import { CliCube } from "./cli.js";
import { Solver } from "./solver.js";

const cli = new CliCube();
cli.cube.scramble();

const solver = new Solver(cli.cube);

log("O kurwa, białe!");
log(solver.findWhiteCorners());
log(solver.cube.visualizeCube());

// cli.promptMove();
