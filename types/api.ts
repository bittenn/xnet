export interface ListRequest {
  page: number;
  limit: number;
  category?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
