import readline from "readline";
import { Cube } from "./cube.js";
import { isValidMove, parseMove } from "./validate_move.js";
import { Cube2by2 } from "./typings/cube_types.js";

export class CliCube extends Cube {
  private rl: readline.Interface;
  constructor(cube?: Cube2by2) {
    super();
    if (cube) this.setCubeState(cube);

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  public promptMove(clear = true) {
    if (clear) console.clear();
    console.log(this.visualizeCube());
    this.rl.question("Enter your move: ", (userMove) => {
      if (userMove.toLowerCase() === "exit") {
        console.log("Goodbye!");
        this.rl.close();
        return;
      }

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
    });
  }
}
