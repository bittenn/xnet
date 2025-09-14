export interface ListRequest {
  page: number;
  limit: number;
  category: string | null;
  sort: string;
}
