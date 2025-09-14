"use client";
import { Post } from "@/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRetweet,
  FaCheckCircle,
  FaAngleRight,
} from "react-icons/fa";
import { Button } from "../ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import type { Swiper as SwiperType } from "swiper";

import { useState } from "react";
import Link from "next/link";
import { toggleLike } from "@/lib/api";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Omit<Post, "commentList">;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);

  const [isRetweet, setIsRetweet] = useState(post.isRetweeted);
  const [retweet, setRetweet] = useState(post.retweets);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsLiked(!isLiked);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      await toggleLike(post.id);
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };
  const handleRetweet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsRetweet(!isRetweet);
      setRetweet((prev) => (isRetweet ? prev - 1 : prev + 1));
      await toggleLike(post.id);
    } catch (error) {
      console.error("리트윗 실패:", error);
    }
  };
  const router = useRouter();
  const handleCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/?category=${post.categoryName}`, { scroll: false });
  };
  let actionSvgSize = "!w-4.5 !h-4.5";
  return (
    <article className={cn("px-5 py-2")}>
      <Link href={`/post/${post.id}`} className="w-full">
        <div className="flex gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-1">
              <Avatar className="h-[36px] w-[36px]">
                <AvatarImage
                  src={post.author.profileImage}
                  alt={`${post.author.name} 프로필이미지`}
                />
                <AvatarFallback />
              </Avatar>
              <span className="ml-2 font-semibold text-gray-800">
                {post.author.name}
              </span>
              <span className="text-sm text-gray-500">
                @{post.author.nickname}
              </span>
              {post.author.verified && (
                <>
                  <FaCheckCircle
                    title="인증된 뱃지"
                    className="h-[12px] w-[12px] text-blue-500"
                  />
                </>
              )}

              <FaAngleRight className="h-3.5 w-3.5 text-gray-400" />
              <span
                className="cursor-pointer text-sm font-semibold text-gray-800 hover:underline"
                onClick={handleCategory}
              >
                {post.categoryName}
              </span>
              <span className="ml-0.5 text-sm text-gray-500">
                {relTime(new Date(post.createdAt))}
              </span>
            </div>

            <div className="mb-3 leading-relaxed whitespace-pre-wrap text-gray-900">
              {post.content}
            </div>

            {post.images.length > 0 && (
              <div className="relative overflow-hidden rounded-md bg-black">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  onSlideChange={(swiper) =>
                    setCurrentSlide(swiper.activeIndex)
                  }
                  pagination={{
                    clickable: true,
                    bulletClass:
                      "swiper-pagination-bullet !w-1.5 !h-1.5 !bg-white/60",
                    bulletActiveClass:
                      "swiper-pagination-bullet-active !bg-white",
                  }}
                  className="aspect-square w-full"
                >
                  {post.images.map((image, index) => (
                    <SwiperSlide key={`${post.id}-${index}`}>
                      <div className="relative aspect-square w-full bg-black/70">
                        <Image
                          draggable={false}
                          src={image}
                          alt={`게시물 이미지 ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 650px"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {post.images.length > 1 && (
                  <div className="absolute top-2 right-2 z-10 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                    {currentSlide + 1} / {post.images.length}
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1.5 text-gray-600 transition-colors"
                  onClick={handleLike}
                >
                  {isLiked ? (
                    <FaHeart className={`${actionSvgSize} text-red-500`} />
                  ) : (
                    <FaRegHeart className={actionSvgSize} />
                  )}
                  <span className="text-sm font-medium">{likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1.5 text-gray-600 transition-colors"
                  onClick={handleRetweet}
                >
                  <FaRetweet
                    className={cn(actionSvgSize, isRetweet && "text-blue-500")}
                  />
                  <span className="text-sm font-medium">{retweet}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1.5 text-gray-600 transition-colors"
                >
                  <FaRegComment className={`${actionSvgSize} scale-x-[-1]`} />
                  <span className="text-sm font-medium">{post.comments}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

const relTime = (input: Date): string => {
  const now = new Date();
  const diff = input.getTime() - now.getTime();
  const abs = Math.abs(diff);

  if (abs < 60 * 1000) return diff < 0 ? "방금 전" : "곧";

  const rtf = new Intl.RelativeTimeFormat("ko");
  if (abs < 60 * 60 * 1000)
    return rtf.format(Math.round(diff / 60000), "minute");
  if (abs < 24 * 60 * 60 * 1000)
    return rtf.format(Math.round(diff / 3600000), "hour");
  return rtf.format(Math.round(diff / 86400000), "day");
};
