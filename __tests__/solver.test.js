import { Cube } from "../src/cube";
import { Solver } from "../src/solver";
function isCubeSolved(cube) {
    const cubeState = cube.getCubeState();
    const correctCubeState = new Cube().getCubeState();
    return JSON.stringify(cubeState) === JSON.stringify(correctCubeState);
}
describe("Solver", () => {
    test("Solver should solve a scrambled cube", () => {
        const cube = new Cube();
        cube.scramble();
        const solver = new Solver(cube);
        solver.solve();
        expect(isCubeSolved(solver)).toBe(true);
    });
});
