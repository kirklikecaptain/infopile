import { prisma } from "./prisma";

export async function getCommunityBySoftNameMatch(name: string) {
  const matches = await prisma.community.findMany({
    where: {
      name: {
        contains: name
      }
    },
    select: {
      name: true
    }
  });

  for (const match of matches) {
    if (match.name.toLowerCase() === name.toLowerCase()) {
      return match;
    }
  }

  return null;
}

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
      members: {
        connect: {
          id: input.creatorId
        }
      },
      creator: {
        connect: {
          id: input.creatorId
        }
      }
    }
  });
}
