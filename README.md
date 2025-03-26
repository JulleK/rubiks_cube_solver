# 🧩 Rubik's Cube Solver

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## 📝 Overview

This project is a **Rubik's Cube Solver** written entirely in TypeScript. Using an object oriented approach, the Solver class takes a scrambled cube as an input and solves it using my own implementation of the LBL method.

## 🚀 Features

- Cube visualization in the terminal
- You can interact with the cube in the CLI

![Cube in the terminal](./images/rubiks.gif)

- My implementaion of the LBL solving algorithm
- TypeScript for strong typing and maintainability

## 📂 Project Structure

```
📦 rubiks-cube-solver
├── 📁 src
│   ├── 📁 typings
│   │   ├── 🟦 cube_types.ts         # Type definitions for cube structure
│   │   ├── 🟦 int_range.ts          # Utility type for integer ranges
│   ├── 📁 utils
│   │   ├── 🟦 colors.ts             # Color-related utilities
│   │   ├── 🟦 corners.ts            # Corner mapping
│   │   ├── 🟦 validate_move.ts      # Move validation logic
│   ├── 🟦 cli.ts                   # Command-line interface logic
│   ├── 🟦 cube.ts                  # Cube representation and manipulation
│   ├── 🟦 solver.ts                # Core solving algorithm
│   ├── 🟦 index.ts                 # Entry point
├── 📄 package.json                 # Dependencies and scripts
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 README.md                    # This file
```

## 🔬 How It Works

- The cube state is stored in the `Cube` class. It is a 1D `array` of 24 colors representing each of the cube's stickers.
- To move the cube's sides, a `turn()` method is defined on the `Cube` class. It moves the stickers in the array, based on which side is turned.
- The `Solver` class takes in a `Cube` or a cube state as an argument, or generates a new one if none is given.
- The solving algorithm does these steps:
  - find the white corners positions
  - try to insert the white corner into it's correct slot
    - if white corner at the top apply the according algorithm
    - if white corner at the bottom in the wrong slot, move it to the top
    - if white corner in correct slot, but incorrectly rotated, rotate it so that white faces bottom
  - after the bottom layer is done, move to the top layer
    - if exactly one yellow corner is in the correct spot, apply an algorithm to swap the remaining 3 yellow corners
    - if either none or more than one yellow corners are in correct spot, move the top layer (U turn)
    - if all corners are in their correct slots, we are done
  - when the yellow corners are in the correct positions, we need to rotate them and we are done!

## ⬇️ Installation

```sh
git clone https://github.com/your-username/rubiks-cube-solver.git
cd rubiks-cube-solver
npm install
```

Compile the TypeScript files into JavaScript (Important!):

```sh
tsc
```

## ▶️ Usage

Start the app:

```sh
npm start
```

Which is equivalent to:

```sh
node dist/index.js
```

Example usage:

Using the solving algorithm on a scrambled cube
```typescript
import { Solver } from "./solver.js";

const solver = new Solver();
solver.scramble();
solver.solve();
```

This code allows you to freely interact with the cube in the command line
```typescript
import { CliCube } from "./cli.js";

const cli = new CliCube();
cli.promptMove();
```

## 📜 License

[MIT](LICENSE)

