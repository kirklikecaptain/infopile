import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { ClientErrorCode, RedirectCode } from "$lib/utils/status-codes";
import { validateInput } from "$lib/utils/validation";
import { createCommunity, getCommunityBySoftNameMatch } from "$lib/server/community";
import { getCommunityPath } from "$lib/utils/url";

export const actions: Actions = {
  default: async (event) => {
    const user = event.locals.user;

    if (!user) {
      return fail(ClientErrorCode.Unauthorized, { message: "Sign in to create a community" });
    }

    const formData = await event.request.formData();
    const name = formData.get("name");
    const description = formData.get("description")?.toString();

    if (!validateInput("communityName", name)) {
      return fail(ClientErrorCode.BadRequest, {
        message: "Invalid community name"
      });
    }

    if (!description) {
      return fail(ClientErrorCode.BadRequest, {
        message: "A community description is required"
      });
    }

    const existingCommunity = await getCommunityBySoftNameMatch(name);

    if (existingCommunity) {
      return fail(ClientErrorCode.BadRequest, {
        message: `Community name is already exists: c/${existingCommunity.name} `
      });
    }

    const newCommunity = await createCommunity({ name, description, creatorId: user.id });

    if (!newCommunity) {
      return fail(ClientErrorCode.BadRequest, {
        message: "Failed to create community"
      });
    }

    return redirect(RedirectCode.Found, getCommunityPath(newCommunity.name));
  }
};
