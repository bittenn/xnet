export interface CreatePostRequest {
  content: string;
  images: File[];
  category: number;
}

export interface CreatePostData {
  content: string;
  imageUrls: string[];
  category: number;
}
