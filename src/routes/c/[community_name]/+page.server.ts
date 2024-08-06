import { error } from "@sveltejs/kit";
import { getCommunityByName } from "$lib/server/community";
import { ClientErrorCode } from "$lib/utils/status-codes";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const community = await getCommunityByName(params.community_name);

  if (!community) {
    return error(ClientErrorCode.NotFound, { message: "Community not found" });
  }

  return {
    community
  };
};
