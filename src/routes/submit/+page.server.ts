import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { db } from "$lib/server/db";

export const actions: Actions = {
  default: async (event) => {
    const user = event.locals.user;

    if (!user) {
      return fail(401, { message: "Sign in to post" });
    }

    const formData = await event.request.formData();
    const title = formData.get("title")?.toString();
    const url = formData.get("url")?.toString();
    const description = formData.get("description")?.toString();

    if (!title) {
      return fail(400, {
        message: "Title is required"
      });
    }

    try {
      await db.post.create({
        data: {
          title: title,
          url: url,
          description: description,
          author: {
            connect: {
              id: user.id
            }
          }
        }
      });
    } catch (error) {
      console.error(error);
      return fail(400, { message: "Failed to create post" });
    }

    return redirect(302, "/");
  }
};
