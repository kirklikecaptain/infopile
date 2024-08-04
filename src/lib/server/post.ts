import { prisma } from "./prisma";

interface CreatePostInput {
  title: string;
  url?: string;
  description?: string;
  authorId: string;
  communityName: string;
}

export async function createPost(input: CreatePostInput) {
  return await prisma.post.create({
    data: {
      title: input.title,
      url: input.url,
      description: input.description,
      author: {
        connect: {
          id: input.authorId
        }
      },
      community: {
        connect: {
          name: input.communityName
        }
      }
    }
  });
}

export async function getPostById(postId: string) {
  return await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: {
      community: {
        select: {
          name: true
        }
      },
      author: {
        select: {
          username: true
        }
      }
    }
  });
}

export async function getRecentPosts() {
  return await prisma.post.findMany({
    take: 30,
    orderBy: {
      dateCreated: "desc"
    },
    include: {
      author: {
        select: {
          username: true
        }
      },
      community: {
        select: {
          name: true
        }
      }
    }
  });
}
