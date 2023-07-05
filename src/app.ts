import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

import gameBasicRouter from "./routers/gameBasicRouter";
import { BadRequest } from "./errors";
import { fibonacci } from "./math";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

// app.use("/game-basic", gameBasicRouter);

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

type Board = string[][];
const board: Board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "X";

function getWinnerIfAny(board: Board) {
  // Check rows
  for (let i = 0; i < 3; i += 1) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }
  // Check columns
  for (let i = 0; i < 3; i += 1) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
    return board[2][0];
  }
  return null;
}

app.get("/", (req, res) => {
  res.send("Welcome to Tic Tac Toe");
});

app.get("/fibonacci/:n(\\d+)", (req, res) => {
  const n = Number(req.params.n);
  if (isNaN(n)) {
    res.status(400).send({ error: "Parameter must be a number." });
    return;
  }

  res.json({ result: fibonacci(n) });
});

app.get("/game", (req, res) => {
  res.json(board);
});

app.post("/game/move", (req, res) => {
  const { x, y } = req.body;

  if (board[x][y] !== "") {
    //throw new BadRequest(
    //  "Mouvement non valide: le copain/la copine a déjà joué ici"
    //);
    return res.status(400).json("Case déjà jouée");
  }
  if (getWinnerIfAny(board)) {
    return res.status(400).json("Partie déjà gagnée ou perdue");
  }

  board[x][y] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  const winner = getWinnerIfAny(board);
  if (winner) {
    return res.status(200).json(`Winner is ${winner}`);
  }

  res.json(board);
});

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BadRequest) {
    return res.status(400).json({ errorMessage: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).json({ errorMessage: err.message });
  }
  res.status(500).json("Internal error");
});

export default app;
