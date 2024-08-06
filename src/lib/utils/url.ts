export function getPostPath(communityName: string, postId: string): string {
  return `/c/${communityName}/${postId}`;
}

export function getCommunityPath(communityName: string): string {
  return `/c/${communityName}`;
}
