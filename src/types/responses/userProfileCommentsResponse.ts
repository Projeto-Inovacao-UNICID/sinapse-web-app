import { ProfileComment } from "../profileComment";

export interface UserProfileCommentsResponse {
  totalElements: number;
  size: number;
  content: ProfileComment[];
  page: number;
}