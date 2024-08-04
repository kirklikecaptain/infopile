import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getCommunityByName } from "$lib/server/community";
import { ClientErrorCode } from "$lib/utils/status-codes";

export const load: PageServerLoad = async ({ params }) => {
  const community = await getCommunityByName(params.name);

  if (!community) {
    return error(ClientErrorCode.NotFound, { message: "Community not found" });
  }

  return {
    community
  };
};
