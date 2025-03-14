import readline from "readline";
import { Cube } from "./cube.js";
import { isValidMove, parseMove } from "./validate_move.js";

const cube = new Cube();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptMove() {
  console.clear();
  console.log(cube.visualizeCube());
  rl.question("Enter your move: ", (userMove) => {
    if (userMove.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    try {
      const { move, direction, times } = parseMove(userMove);
      if (isValidMove(move)) {
        if (times === 2) cube.turn2(move, direction);
        else cube.turn(move, direction);

        promptMove();
      } else {
        console.log("Invalid move. Try again.");
      }
    } catch (error) {
      console.log("An error occured!");
      console.error(error);
      return;
    }

    setTimeout(() => {
      promptMove();
    }, 500);
  });
}

promptMove();
