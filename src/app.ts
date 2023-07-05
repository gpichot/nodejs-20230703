import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";

import gameBasicRouter from "./routers/gameBasicRouter";
import gamesRouter from "./routers/gamesRouter";
import { BadRequest } from "./errors";
import { fibonacci } from "./math";
import { Board } from "./tictactoe.utils";

const app = express();

app.use(express.json());

// app.use("/game-basic", gameBasicRouter);
app.use("/games", gamesRouter);

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
