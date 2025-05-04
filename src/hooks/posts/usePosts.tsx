import { useQuery } from '@tanstack/react-query';
import { PostService } from '@/service/posts/PostService';

const postService = new PostService();

export function useGetPosts() {
    return useQuery({
      queryKey: ["posts"],
      queryFn: postService.getPosts,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
  }