import { CliCube } from "./cli.js";
import { Cube } from "./cube.js";

const cube = new Cube();
cube.scramble();

const cli = new CliCube(cube);
cli.promptMove(true);
