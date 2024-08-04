import { prisma } from "./prisma";

export async function getCommunityByName(name: string) {
  return prisma.community.findUnique({
    where: {
      name
    },
    include: {
      creator: {
        select: {
          username: true
        }
      }
    }
  });
}

interface CreateCommunityInput {
  name: string;
  description: string;
  creatorId: string;
}

export async function createCommunity(input: CreateCommunityInput) {
  return await prisma.community.create({
    data: {
      name: input.name,
      description: input.description,
      creator: {
        connect: {
          id: input.creatorId
        }
      }
    }
  });
}
