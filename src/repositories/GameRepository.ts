import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getGames() {
  return prisma.game.findMany();
}
