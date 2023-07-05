import { Game, PrismaClient } from "@prisma/client";
import express from "express";
import { object } from "zod";

import { BadRequest } from "../errors";
import { getGames } from "../repositories/GameRepository";
import { Board, getNextPlayer, hasWinner } from "../tictactoe.utils";
import { validateMoveBody } from "./gameBasicRouter";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => {
  const games = await getGames();

  res.json(games);
});
router.get("/:id", async (req, res) => {
  const gameId = req.params.id;
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  if (!game) return res.status(404).send("Not found");

  res.json(game);
});

router.post("/:id/move", validateMoveBody, async (req, res) => {
  const gameId = req.params.id;
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  if (!game) return res.status(404).send("Not found");

  const board = game.board as Board;
  const nextPlayer = getNextPlayer(board);

  const { x, y } = req.body;

  if (board[y][x] !== "") {
    throw new BadRequest("Invalid move: cell is already occupied");
  }

  board[y][x] = nextPlayer;

  await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      board,
    },
  });

  if (hasWinner(board)) {
    res.json({ winner: hasWinner(board) });
    return;
  }

  res.json(board);
});

export default router;
