import type { MoveDirection, Side } from "./typings/cube_types";

const validMovesArray: Side[] = [
  "up",
  "down",
  "left",
  "right",
  "front",
  "back",
];

export function isValidMove(move: string): move is Side {
  return validMovesArray.includes(move as Side);
}

export function parseMove(move: string) {
  const direction = getMoveDirection(move);
  if (direction === -1) {
    move = move.slice(0, move.length - 1);
  }

  let times = 1;
  if (move[move.length - 1] === "2") {
    times = 2;
    move = move.slice(0, move.length - 1);
  }

  move = mapMove(move.toLowerCase());
  return { move, direction, times };
}

function getMoveDirection(move: string): MoveDirection {
  if (move[move.length - 1] === `'`) {
    return -1;
  } else {
    return 1;
  }
}

function mapMove(key: string) {
  const moves = {
    u: "up",
    d: "down",
    l: "left",
    r: "right",
    f: "front",
    b: "back",
  };

  if (key in moves) {
    return moves[key as keyof typeof moves];
  } else {
    return key;
  }
}
