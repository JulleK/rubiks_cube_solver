import { log } from "console";
import { Cube } from "../cube.js";
import { Solver } from "../solver.js";
import { sleep } from "./sleep.js";
import { displayMoveAsAscii } from "./move_ascii.js";

export async function solveAndVisualize(cube: Cube, logHistory = false, delay = false) {
    const initialCubeState = cube.getCubeState()
    const solver = new Solver(cube);
    solver.solve();
  
    const moves = solver.getMoveHistory();
    console.clear();
  
    log(cube.visualizeCube());

    if (delay) await sleep(2000);
    
    for (const move of moves) {
      await sleep(300);
      console.clear();
      cube.applyMoves(move);
  
      log(cube.visualizeCube());
      displayMoveAsAscii(move);
    }
    log(cube.visualizeCube());
  
    if (logHistory) {
        await sleep(1500);
        log("Initial Cube State:");
        log(initialCubeState);
        log()
        log("Solver Move History:");
        log(solver.getMoveHistory());
    }
    return;
  }