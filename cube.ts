// White, Yellow, Green, Blue, Red, Orange
type Color = "W" | "Y" | "G" | "B" | "R" | "O";

type Face2b2 = [Color, Color, Color, Color];

type Face3b3 = [Color, Color, Color, Color, Color, Color, Color, Color, Color];

type Cube2b2 = {
  U: Face2b2; // Up
  D: Face2b2; // Down
  L: Face2b2; // Left
  R: Face2b2; // Right
  F: Face2b2; // Front
  B: Face2b2; // Back
};

type Cube3b3 = {
  U: Face3b3; // Up
  D: Face3b3; // Down
  L: Face3b3; // Left
  R: Face3b3; // Right
  F: Face3b3; // Front
  B: Face3b3; // Back
};
