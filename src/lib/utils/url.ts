export function getPostPath(community: string, postId: string): string {
  return `/community/${community}/post/${postId}`;
}

export function getCommunityPath(name: string): string {
  return `/community/${name}`;
}
