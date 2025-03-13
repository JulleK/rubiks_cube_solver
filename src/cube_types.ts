import { IntRange } from "./int_range";

// White, Yellow, Green, Blue, Red, Orange
export type Color = "W" | "Y" | "G" | "B" | "R" | "O";

// export type Side = "U" | "D" | "L" | "R" | "F" | "B";
export type Side = "up" | "down" | "left" | "right" | "front" | "back";

// 1 for clockwise moves, -1 for ' (prime) counterclockwise moves
export type MoveDirection = 1 | -1;

export type Cube2by2 = Color[];

// There are 24 stickers in a 2 by 2 rubiks cube
export type CubeStickerIndex = IntRange<0, 24>;

// type Face2b2 = [Color, Color, Color, Color];
// type Face3b3 = [Color, Color, Color, Color, Color, Color, Color, Color, Color];

// export interface Cube2by2 {
//   U: Face2b2; // Up
//   D: Face2b2; // Down
//   L: Face2b2; // Left
//   R: Face2b2; // Right
//   F: Face2b2; // Front
//   B: Face2b2; // Back
// }

// export interface Cube3by3 {
//   U: Face3b3; // Up
//   D: Face3b3; // Down
//   L: Face3b3; // Left
//   R: Face3b3; // Right
//   F: Face3b3; // Front
//   B: Face3b3; // Back
// }
