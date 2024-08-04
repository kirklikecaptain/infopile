import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getRecentPosts } from "$lib/server/post";
import { auth } from "$lib/server/auth";
import { ClientErrorCode } from "$lib/utils/status-codes";

export const load: PageServerLoad = async () => {
  const recentPosts = await getRecentPosts();

  return {
    recentPosts
  };
};

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(ClientErrorCode.Unauthorized);
    }

    await auth.invalidateSession(event.locals.session.id);

    const sessionCookie = auth.createBlankSessionCookie();

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }
};
