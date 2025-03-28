import type { IntRange } from "./int_range.js";

// White, Yellow, Green, Blue, Red, Orange
export type Color = "W" | "Y" | "G" | "B" | "R" | "O";

export type Side = "up" | "down" | "left" | "right" | "front" | "back";
export type Move = "U" | "U'" | "D" | "D'" | "L" | "L'" | "R" | "R'" | "F" | "F'" |
 "B"| "B'"| "U2"| "D2"| "L2"| "R2"| "F2"| "B2"
export type Corner = [number, number, number];
export type Cube2by2 = Color[];

// 1 for clockwise moves, -1 for ' (prime) counterclockwise moves
export type MoveDirection = 1 | -1;

// There are 24 stickers in a 2 by 2 rubiks cube
export type CubeStickerIndex = IntRange<0, 24>;
