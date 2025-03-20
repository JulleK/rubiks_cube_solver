# 🧩 Rubik's Cube Solver

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## 📝 Overview

This project is a **Rubik's Cube Solver** written entirely in TypeScript. It takes a scrambled cube state as input and outputs an optimal solution using not very efficient (but my own) implementation of the LBL method

## 🚀 Features

- Cube visualization in the terminal

![Starting Position](./images/starting_position.png?raw=true)

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

Describe the solving algorithm here. Explain:
- How the cube state is represented.
- What method is used to solve the cube.
- Any optimizations applied.
- TODO!!!

## ⬇️ Installation

```sh
git clone https://github.com/your-username/rubiks-cube-solver.git
cd rubiks-cube-solver
npm install
```

## ▶️ Usage

```sh
tsc
npm start
```

Example usage:

Using the solving algorithm on a scrambled cube
```typescript
import { Solver } from "./src/solver.js";

const solver = new Solver();
solver.scramble();
solver.solve();
```

This code allows you to freely interact with the cube in the command line
```typescript
import { CliCube } from "./src/cli.js";

const cli = new CliCube();
cli.promptMove();
```

## 📜 License

[MIT](LICENSE)

