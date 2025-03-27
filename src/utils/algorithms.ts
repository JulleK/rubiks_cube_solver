import { Move } from "../typings/cube_types";

export const orientBottomWhiteCornerCase1: Move[] = [
  "L",
  "U",
  "L'",
  "U'",
  "L",
  "U",
  "L'",
  "U'",
];
export const orientBottomWhiteCornerCase2: Move[] = [
  "F",
  "U'",
  "F'",
  "U",
  "F",
  "U'",
  "F'",
  "U",
];
export const orientBottomWhiteCornerCase3: Move[] = [
  "B",
  "U",
  "B'",
  "U'",
  "B",
  "U",
  "B'",
  "U'",
];
export const orientBottomWhiteCornerCase4: Move[] = [
  "R",
  "U'",
  "R'",
  "U",
  "R",
  "U'",
  "R'",
  "U",
];
export const orientBottomWhiteCornerCase5: Move[] = [
  "B'",
  "U'",
  "B",
  "U2",
  "L",
  "U'",
  "L'",
  "U",
];
export const orientBottomWhiteCornerCase6: Move[] = [
  "F",
  "U",
  "F'",
  "U'",
  "F",
  "U",
  "F'",
  "U'",
];
export const orientBottomWhiteCornerCase7: Move[] = [
  "R'",
  "U'",
  "R",
  "U2",
  "B",
  "U'",
  "B'",
];
export const orientBottomWhiteCornerCase8: Move[] = [
  "R",
  "U",
  "R'",
  "U'",
  "R",
  "U",
  "R'",
  "U'",
];

export const orientTopRightWhiteCornerNormalCase: Move[] = ["R", "U", "R'"];
export const orientTopRightWhiteCornerReverseCase: Move[] = [
  "U",
  "R",
  "U'",
  "R'",
];
export const orientTopRightWhiteCornerLongCase: Move[] = [
  "F'",
  "U2",
  "F",
  "U2",
  "R",
  "U'",
  "R'",
  "U",
];

export const moveWhiteBackLeftCornerFromBottom: Move[] = ["B'", "U'", "B"];
export const moveWhiteFrontLeftCornerFromBottom: Move[] = ["F", "U'", "F'"];
export const moveWhiteBackRightCornerFromBottom: Move[] = ["B", "U", "B'"];
export const moveWhiteFrontRightCornerFromBottom: Move[] = ["F'", "U'", "F"];

export const threeYellowCornersSwap: Move[] = [
  "U",
  "R",
  "U'",
  "L'",
  "U",
  "R'",
  "U'",
  "L",
];

export const diagonalYellowCornersSwap: Move[] = [
  "F",
  "R",
  "U'",
  "R'",
  "U'",
  "R",
  "U",
  "R'",
  "F'",
  "R",
  "U",
  "R'",
  "U'",
  "R'",
  "F",
  "R",
  "F'",
];

export const orientTopRightNormal: Move[] = [
  "R",
  "U",
  "R'",
  "U'",
  "R",
  "U",
  "R'",
  "U'",
];

export const orientTopRightReversed: Move[] = [
  "U",
  "R",
  "U'",
  "R'",
  "U",
  "R",
  "U'",
  "R'",
];
