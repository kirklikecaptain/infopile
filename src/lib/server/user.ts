import { prisma } from "./prisma";

export async function findUser(username: string) {
  return prisma.user.findUnique({
    where: {
      username
    }
  });
}

export async function createUser(username: string, passwordHash: string) {
  return prisma.user.create({
    data: {
      username,
      passwordHash
    }
  });
}
