"use client";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const PostCardSkeleton = () => {
  return (
    <article className="w-full px-5 py-2">
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-14 rounded" />
          <Skeleton className="h-3 w-10 rounded" />
        </div>

        <div className="mb-3 space-y-2">
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[75%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>

        <div className="relative overflow-hidden rounded-md">
          <Skeleton className="aspect-square w-full" />
          <div className="pointer-events-none absolute top-2 right-2">
            <Skeleton className="h-5 w-12 rounded-full opacity-80" />
          </div>
        </div>
      </div>
    </article>
  );
};

export const PostCardListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={cn("py-2")}>
          <PostCardSkeleton />
        </div>
      ))}
    </div>
  );
};
