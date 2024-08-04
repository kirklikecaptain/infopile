import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getPostById } from "$lib/server/post";
import { ClientErrorCode } from "$lib/utils/status-codes";

export const load: PageServerLoad = async ({ params }) => {
  const post = await getPostById(params.id);

  if (!post) {
    return error(ClientErrorCode.NotFound, "Post Not Found");
  }

  return {
    post
  };
};
