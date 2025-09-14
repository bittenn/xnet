"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "./post-card";
import { useInfinitePosts } from "@/hooks/use-infinite-posts";

interface InfinitePostsListProps {
  category: string | null;
}
export function InfinitePostsList({ category }: InfinitePostsListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts(10, category);

  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? [];
  return (
    <div className="w-full [&>*]:border-t">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {hasNextPage && (
        <div ref={ref} className="flex h-20 items-center justify-center">
          {isFetchingNextPage && <div>더 불러오는 중...</div>}
        </div>
      )}
    </div>
  );
}
