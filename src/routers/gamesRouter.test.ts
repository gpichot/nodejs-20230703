import supertest from "supertest";

import app from "../app";
import { GameFactory } from "../factories/GameFactory";
import { getGames } from "../repositories/GameRepository";

jest.mock("../repositories/GameRepository");

const getGamesMock = jest.mocked(getGames);

describe("GET /games/", () => {
  const request = supertest(app);

  it("returns the list of games", async () => {
    getGamesMock.mockResolvedValue([GameFactory.createGame()]);
    const response = await request.get("/games/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        board: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
      }),
    ]);
  });
});
