import { fail, redirect } from "@sveltejs/kit";
import { validateInput } from "$lib/utils/validation";
import { createUser, findUser } from "$lib/server/user";
import { auth } from "$lib/server/auth";
import { ClientErrorCode, RedirectCode, ServerErrorCode } from "$lib/utils/status-codes";
import { hashPassword } from "$lib/utils/password";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(RedirectCode.Found, "/");
  }
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    const username = formData.get("username");
    const password = formData.get("password");

    if (!validateInput("username", username)) {
      return fail(ClientErrorCode.BadRequest, {
        message: "Invalid username"
      });
    }

    if (!validateInput("password", password)) {
      return fail(ClientErrorCode.BadRequest, {
        message: "Invalid password"
      });
    }

    const existingUser = await findUser(username);

    if (existingUser) {
      return fail(ClientErrorCode.BadRequest, {
        message: "Username already taken"
      });
    }

    const passwordHash = await hashPassword(password);
    const newUser = await createUser(username, passwordHash);

    if (!newUser) {
      return fail(ServerErrorCode.InternalServerError, {
        message: "Failed to create user"
      });
    }

    const session = await auth.createSession(newUser.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    return redirect(302, "/");
  }
};
