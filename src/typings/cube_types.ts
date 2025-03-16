import type { IntRange } from "./int_range";

// White, Yellow, Green, Blue, Red, Orange
export type Color = "W" | "Y" | "G" | "B" | "R" | "O";

// export type Side = "U" | "D" | "L" | "R" | "F" | "B";
export type Side = "up" | "down" | "left" | "right" | "front" | "back";
export type Corner = [number, number, number];

// 1 for clockwise moves, -1 for ' (prime) counterclockwise moves
export type MoveDirection = 1 | -1;

export type Cube2by2 = Color[];

// There are 24 stickers in a 2 by 2 rubiks cube
export type CubeStickerIndex = IntRange<0, 24>;
