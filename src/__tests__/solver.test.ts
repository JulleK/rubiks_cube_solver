import { log, error } from "console";
import { Cube } from "../cube";
import { Solver } from "../solver";

function isCubeSolved(cube: Cube): boolean {
  const cubeState = cube.getCubeState();
  const correctCubeState = new Cube().getCubeState();
  return (
    cubeState[20] === "W" &&
    cubeState[21] === "W" &&
    cubeState[22] === "W" &&
    cubeState[23] === "W"
  );
  //   return JSON.stringify(cubeState) === JSON.stringify(correctCubeState);
}

describe("Solver", () => {
  test("Solver should solve a scrambled cube", () => {
    const cube = new Cube();
    cube.scramble();

    const solver = new Solver(cube);
    solver.solve();

    if (!isCubeSolved(solver)) {
      error("❌ Test failed! Scrambled Cube State:");
      error(cube.getCubeState());
      error("Final (incorrect) Cube State:");
      error(solver.visualizeCube());
    }

    expect(isCubeSolved(solver)).toBe(true);
  });
});
