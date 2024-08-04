import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { getPostPath } from "$lib/utils/url";
import { RedirectCode, ServerErrorCode } from "$lib/utils/status-codes";
import { createPost } from "$lib/server/post";
import { getCommunityByName } from "$lib/server/community";

export const actions: Actions = {
  default: async (event) => {
    const user = event.locals.user;

    if (!user) {
      return fail(400, { message: "Sign in to create a post" });
    }

    const formData = await event.request.formData();
    const title = formData.get("title")?.toString();
    const communityName = formData.get("community")?.toString();
    const url = formData.get("url")?.toString();
    const description = formData.get("description")?.toString();

    if (!title || !communityName) {
      return fail(400, {
        message: "Title and Community are required"
      });
    }

    const community = await getCommunityByName(communityName);

    if (!community) {
      return fail(400, {
        message: "Community not found"
      });
    }

    const newPost = await createPost({
      title,
      communityName,
      url,
      description,
      authorId: user.id
    });

    if (!newPost) {
      return fail(ServerErrorCode.InternalServerError, { message: "Failed to create post" });
    }

    return redirect(RedirectCode.Found, getPostPath(communityName, newPost.id));
  }
};
