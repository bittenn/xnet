import { Post } from "@/types";
import { CreatePostData } from "@/types/post-create";

import { mockUser, mockCategories, mockPosts } from "../mock";

export const createPost = async (
  data: CreatePostData,
): Promise<{ success: boolean; postId?: number }> => {
  const newPost: Post = {
    id: Date.now(),
    author: mockUser,
    content: data.content,
    images: data.imageUrls,
    category: data.category,
    categoryName:
      mockCategories.find((cat) => cat.id === data.category)?.name || "",
    createdAt: new Date().toISOString(),
    likes: 0,
    retweets: 0,
    comments: 0,
    isLiked: false,
    isRetweeted: false,
    hasMoreComments: false,
    commentList: [],
  };

  mockPosts.unshift(newPost);

  return { success: true, postId: newPost.id };
};
