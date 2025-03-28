import readline from "readline";
import { Cube } from "./cube.js";
import { isValidMove, parseMove } from "./utils/validate_move.js";
import { Cube2by2 } from "./typings/cube_types.js";
import { solveAndVisualize } from "./utils/solveAndVisualize.js";

export class CliCube extends Cube {
  private rl: readline.Interface;
  constructor(cube?: Cube | Cube2by2) {
    if (cube) super(cube);
    else super();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  public promptMove(logHistory = false, clear = true) {
    if (clear) console.clear();
    console.log(this.visualizeCube());
    this.rl.question("Enter your move: ", (userMove) => {
      if (userMove.trim().toLowerCase() === "exit") {
        console.log("Goodbye!");
        this.rl.close();
        return;
      } else if (userMove.trim().toLowerCase() === "solve") {
        solveAndVisualize(this, logHistory);
        return;
      } else if (userMove.trim().toLowerCase() === "scramble") {
        this.scramble();
        this.promptMove();
      } else {
        try {
          const { move, direction, times } = parseMove(userMove);
          if (!isValidMove(move)) {
            console.log("Invalid move. Try again.");
            return setTimeout(() => {
              this.promptMove();
            }, 1000);
          }

          times === 2 ? this.turn2(move) : this.turn(move, direction);

          this.promptMove();
        } catch (error) {
          console.log("An error occured!");
          console.error(error);
          return;
        }
      }
    });
  }
}
