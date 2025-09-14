"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useInfinitePosts } from "@/hooks/use-infinite-posts";

import { PostCard } from "./post-card";
import { PostCardListSkeleton } from "./post-skeleton";

interface InfinitePostsListProps {
  category: string | null;
  sort: string;
}
export function InfinitePostsList({ category, sort }: InfinitePostsListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePosts(10, category, sort);

  const { ref, inView } = useInView({ rootMargin: "200px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? [];
  if (isLoading) {
    return <PostCardListSkeleton count={5} />;
  }
  return (
    <div className="w-full [&>*]:border-t">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {hasNextPage && (
        <div ref={ref} className="">
          {isFetchingNextPage && <PostCardListSkeleton count={1} />}
        </div>
      )}
    </div>
  );
}
