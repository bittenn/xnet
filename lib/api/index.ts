import { Post } from "@/types";
import { mockPosts } from "../mock";
import { ListRequest } from "@/types/api";

let TIME_OUT = 500;
export const getPosts = async (request: ListRequest): Promise<Post[]> => {
  const { page, limit, category } = request;

  await new Promise((resolve) => setTimeout(resolve, TIME_OUT));
  if (category?.length) {
    return mockPosts
      .filter((v) => v.categoryName === category)
      .slice((page - 1) * limit, page * limit);
  }
  return mockPosts.slice((page - 1) * limit, page * limit);
};

export const toggleLike = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, TIME_OUT));
  return { success: true };
};
