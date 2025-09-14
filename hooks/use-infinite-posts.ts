"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getPosts } from "@/lib/api";

export function useInfinitePosts(
  limit = 10,
  category: string | null,
  sort: string,
) {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite", { category, sort }],
    queryFn: ({ pageParam = 1 }) =>
      getPosts({ page: pageParam, limit, category, sort }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === limit ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
