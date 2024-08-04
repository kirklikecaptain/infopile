import { fail, redirect } from "@sveltejs/kit";
import { ClientErrorCode, RedirectCode } from "$lib/utils/status-codes";
import { findUser } from "$lib/server/user";
import { checkPassword } from "$lib/utils/password";
import { auth } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(RedirectCode.Found, "/");
  }
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
      return fail(ClientErrorCode.BadRequest, {
        message: "Username and password are required"
      });
    }

    const user = await findUser(username);

    if (!user) {
      return fail(ClientErrorCode.BadRequest, {
        message: "Incorrect username or password"
      });
    }

    const correctPassword = await checkPassword(password, user.passwordHash);

    if (!correctPassword) {
      return fail(ClientErrorCode.BadRequest, {
        message: "Incorrect username or password"
      });
    }

    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    return redirect(RedirectCode.Found, "/");
  }
};
