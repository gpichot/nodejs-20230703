import express from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";

import { BadRequest } from "../errors";

const router = express.Router();
export default router;

export type Player = "X" | "O" | "";
export type Board = Player[][];

function createNewBoard(): Board {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

function getNextPlayer(board: Board) {
  const flattenedBoard = board.flat();
  const xCount = flattenedBoard.filter((cell) => cell === "X").length;
  const oCount = flattenedBoard.filter((cell) => cell === "O").length;

  return xCount === oCount ? "X" : "O";
}

function hasWinner(board: Board): Player {
  // Check rows
  for (const row of board) {
    if (row[0] === row[1] && row[1] === row[2] && row[0] !== "") {
      return row[0];
    }
  }

  // Check columns
  for (let x = 0; x < 3; x++) {
    if (
      board[0][x] === board[1][x] &&
      board[1][x] === board[2][x] &&
      board[0][x] !== ""
    ) {
      return board[0][x];
    }
  }

  // Check diagonals
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ""
  ) {
    return board[0][0];
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ""
  ) {
    return board[0][2];
  }
  return null;
}

const board = {
  current: createNewBoard(),
};

const validateMoveBody = validateRequestBody(
  z.object({
    x: z.number().min(0).max(2),
    y: z.number().min(0).max(2),
  })
);

router.get("/", (req, res) => {
  res.json(board.current);
});

router.post("/move", validateMoveBody, (req, res) => {
  const nextPlayer = getNextPlayer(board.current);

  const { x, y } = req.body;

  if (board.current[y][x] !== "") {
    throw new BadRequest("Invalid move: cell is already occupied");
  }

  board.current[y][x] = nextPlayer;

  if (hasWinner(board.current)) {
    res.json({ winner: hasWinner(board.current) });
    return;
  }

  res.json(board.current);
});

router.delete("/", (req, res) => {
  board.current = createNewBoard();
  res.status(204).send();
});
