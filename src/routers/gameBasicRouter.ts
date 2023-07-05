import express from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";

import { BadRequest } from "../errors";
import { createNewBoard, getNextPlayer, hasWinner } from "../tictactoe.utils";

const router = express.Router();
export default router;

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
