import { PostUser } from "./user";

export interface Comment {
  author: PostUser;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface Post {
  id: number;
  author: PostUser;
  content: string;
  images: string[];
  category: number;
  categoryName: string;
  createdAt: string;
  likes: number;
  retweets: number;
  comments: number;
  isLiked: boolean;
  isRetweeted: boolean;
  hasMoreComments?: boolean;
  commentList: Partial<Comment>[];
}
