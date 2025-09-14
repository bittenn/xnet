import Link from "next/link";

import { PostCardListSkeleton } from "@/components/feed/post-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/lib/mock";

export default function Loading() {
  return (
    <div className="mx-auto w-full py-5 md:max-w-[640px]">
      {/* <FilterBar /> */}
      <div className="overflow-hidden rounded-md md:border md:border-t-0">
        <div className="flex items-center gap-2 px-5 pt-7 pb-5 md:border-t">
          <div>
            {
              <Avatar className="h-[36px] w-[36px]">
                <AvatarImage src={mockUser.profileImage} />
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
        <PostCardListSkeleton count={5} />;
      </div>
    </div>
  );
}
