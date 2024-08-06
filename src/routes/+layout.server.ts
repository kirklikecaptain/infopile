import { getUserCommunities } from "$/lib/server/user";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  const user = event.locals.user;

  if (!user) {
    return {
      user: null,
      communities: []
    };
  }

  return {
    user,
    communities: await getUserCommunities(user.id)
  };
};
