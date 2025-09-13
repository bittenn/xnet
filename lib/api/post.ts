import { mockPosts } from "@/lib/mock";
import { Post } from "@/types";
import { ListRequest } from "@/types/api";

export const getPosts = async (request: ListRequest): Promise<Post[]> => {
  const { page, limit } = request;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return mockPosts.slice((page - 1) * limit, page * limit) as Post[];
};

export const toggleLike = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, postId };
};

export const toggleRetweet = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, postId };
};
