import readline from "readline";
import { Cube } from "./cube.js";
import { isValidMove, parseMove } from "./validate_move.js";

export class CliCube {
  public cube: Cube;
  private rl: readline.Interface;
  constructor() {
    this.cube = new Cube();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  public promptMove() {
    console.clear();
    console.log(this.cube.visualizeCube());
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

        times === 2
          ? this.cube.turn2(move, direction)
          : this.cube.turn(move, direction);

        this.promptMove();
      } catch (error) {
        console.log("An error occured!");
        console.error(error);
        return;
      }
    });
  }
}
