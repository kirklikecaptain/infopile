import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const post = await db.post.findUnique({
    where: {
      id: params.postId
    },
    include: {
      author: {
        select: {
          username: true
        }
      }
    }
  });

  if (!post) {
    error(404, "Not Found");
  }

  return {
    post
  };
};
