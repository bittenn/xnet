import { Post } from "@/types";
import { ListRequest } from "@/types/api";

import { mockPosts } from "../mock";

const TIME_OUT = 1000;
export const getPosts = async (request: ListRequest): Promise<Post[]> => {
  const { page, limit, category, sort } = request;
  let posts = mockPosts;
  await new Promise((resolve) => setTimeout(resolve, TIME_OUT));
  if (category?.length) {
    posts = posts.filter((v) => v.categoryName === category);
  }
  posts = posts.sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return sort === "asc" ? aTime - bTime : bTime - aTime;
  });

  return posts.slice((page - 1) * limit, page * limit);
};

export const toggleLike = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, TIME_OUT));
  console.log(postId);
  return { success: true };
};
