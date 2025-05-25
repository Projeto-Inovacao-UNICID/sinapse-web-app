import { ReactionType } from "@/types";

// Métricas individuais de um post
export interface PostIndividualMetricsDto {
  postId: number;
  commentsCount: number;
  reactionsCount: number;
  reactionsByType: Record<ReactionType, number>;
  engagementRate: number;
}

// Métricas agregadas de posts
export interface PostMetricsDto {
  totalPosts: number;
  totalComments: number;
  totalReactions: number;
  reactionsByType: Record<ReactionType, number>;
  avgCommentsPerPost: number;
  avgReactionsPerPost: number;
  avgEngagementPerPost: number;
  postsWithNoComments: number;
  postsWithNoReactions: number;
  individualMetrics: PostIndividualMetricsDto[];
}
