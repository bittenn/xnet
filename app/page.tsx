import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { InfinitePostsList } from "@/components/feed/infinite-feed-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/api";
import { mcokUser } from "@/lib/mock";
import { Suspense } from "react";
import { PostCardListSkeleton } from "@/components/feed/post-skeleton";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const category = (await searchParams).category;
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "infinite", category],
    queryFn: () => getPosts({ page: 1, limit: 10, category: category ?? null }),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="mx-auto w-full py-5 md:max-w-[640px]">
      <div className="overflow-hidden rounded-md md:border md:border-t-0">
        <div className="flex items-center gap-2 px-5 pt-7 pb-5 md:border-t">
          <div>
            {
              <Avatar className="h-[36px] w-[36px]">
                <AvatarImage src={mcokUser.profileImage} />
                <AvatarFallback />
              </Avatar>
            }
          </div>
          <Link href={"/create"} className="w-full">
            <div className="flex w-full items-center justify-between">
              <div className="text-gray-500">새로운 소식이 있나요?</div>
              <Button variant={"outline"}>게시</Button>
            </div>
          </Link>
        </div>
        <HydrationBoundary state={dehydratedState}>
          <InfinitePostsList category={category ?? null} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
