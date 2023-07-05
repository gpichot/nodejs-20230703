import { Game } from "@prisma/client";

export class GameFactory {
  static createGame(): Game {
    return {
      id: "123",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1,
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  }
}
