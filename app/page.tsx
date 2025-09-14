import { InfinitePostsList } from "@/components/feed/infinite-feed-list";
import { getPosts } from "@/lib/api";
import { mcokUser } from "@/lib/mock";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
/**
 * 
 * @returns 
 * 
 * {
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 */
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
    <div className="mx-auto w-full max-w-[640px] py-5">
      <div className="overflow-hidden rounded-md border border-t-0">
        <div className="flex items-center gap-2 border-t px-5 pt-7 pb-5">
          <div>
            {
              <Avatar className="h-[36px] w-[36px]">
                <AvatarImage src={mcokUser.profileImage} />
                <AvatarFallback />
              </Avatar>
            }
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="text-gray-500">새로운 소식이 있나요?</div>
            <Button variant={"outline"}>게시</Button>
          </div>
        </div>
        <HydrationBoundary state={dehydratedState}>
          <InfinitePostsList category={category ?? null} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
