import type { Color } from "../typings/cube_types.js";

export type ColorsANSI = Record<Color | "reset", string>;
export const textColors: ColorsANSI = {
  W: "\x1b[97m", // Bright White
  R: "\x1b[91m", // Bright Red
  B: "\x1b[94m", // Bright Blue
  O: "\x1b[38;5;208m", // Deep Orange
  G: "\x1b[92m", // Bright Green
  Y: "\x1b[93m", // Bright Yellow
  reset: "\x1b[0m", // Reset color
};

export const backgroundColors: ColorsANSI = {
  W: "\x1b[30;107m", // Black text on Bright White Background
  R: "\x1b[30;101m", // Black text on Bright Red Background
  B: "\x1b[30;104m", // Black text on Bright Blue Background
  O: "\x1b[30;48;5;208m", // Black text on Deep Orange Background
  G: "\x1b[30;102m", // Black text on Bright Green Background
  Y: "\x1b[30;103m", // Black text on Bright Yellow Background
  reset: "\x1b[0m", // Reset color
};
