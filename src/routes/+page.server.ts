import { getRecentPosts } from "$lib/server/post";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const recentPosts = await getRecentPosts();

  return {
    recentPosts
  };
};
