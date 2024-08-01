import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { hash } from "@node-rs/argon2";
import { db } from "$lib/server/db";

import type { Actions, PageServerLoad } from "./$types";
import { isValidPassword, isValidUsername } from "$lib/utils/validation";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/");
  }

  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (!isValidUsername(username)) {
      return fail(400, {
        message: "Invalid username"
      });
    }

    if (!isValidPassword(password)) {
      return fail(400, {
        message: "Invalid password"
      });
    }

    const userId = generateId(15);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });

    try {
      await db.user.create({
        data: {
          id: userId,
          username,
          passwordHash
        }
      });

      const session = await auth.createSession(userId, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } catch (e) {
      console.error(e);
      return fail(500, {
        message: "An unknown error occurred"
      });
    }

    return redirect(302, "/");
  }
};
