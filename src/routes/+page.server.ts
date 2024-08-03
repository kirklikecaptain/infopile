import { auth } from "$lib/server/db";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }

    await auth.invalidateSession(event.locals.session.id);

    const sessionCookie = auth.createBlankSessionCookie();

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }
};
