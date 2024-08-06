import type { RequestHandler } from "./$types";
import { auth } from "$/lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { RedirectCode } from "$/lib/utils/status-codes";

export const GET: RequestHandler = async ({ url, request, locals, cookies }) => {
  const referer = new URL(request.headers.get("referer") || "");
  const redirectPath = referer.host === url.host ? referer.pathname : "/";

  if (locals.session) {
    await auth.invalidateSession(locals.session.id);
    const sessionCookie = auth.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }

  return new Response(redirect(RedirectCode.Found, redirectPath));
};
