import { FriendshipContent } from "../friendshipContent";

export interface FriendshipInvitationsResponse {
  content: FriendshipContent[];
  page: number;
  size: number;
  totalElements: number;
}