"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRetweet,
  FaCheckCircle,
  FaAngleRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import { HighlightedText } from "@/components/common/highlighted-text";
import { ImageViewer } from "@/components/common/image-viewer";
import { toggleLike } from "@/lib/api";
import { relTime } from "@/lib/reltime";
import { cn } from "@/lib/utils";
import { Post } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import "swiper/css";
import "swiper/css/pagination";
import { CommentBox } from "./comment-box";
import { CommentList } from "./comment-list";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [isRetweet, setIsRetweet] = useState(post.isRetweeted);
  const [retweet, setRetweet] = useState(post.retweets);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);
  const [comments, setComments] = useState(post.commentList);

  const router = useRouter();
  const actionSvgSize = "!w-4.5 !h-4.5";

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLiked((v) => !v);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      await toggleLike(post.id);
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };
  const handleRetweet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsRetweet((v) => !v);
      setRetweet((prev) => (isRetweet ? prev - 1 : prev + 1));
      await toggleLike(post.id);
    } catch (error) {
      console.error("리트윗 실패:", error);
    }
  };
  const handleCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/?category=${post.categoryName}`, { scroll: false });
  };

  const formattedTime = useMemo(
    () => relTime(new Date(post.createdAt)),
    [post.createdAt],
  );

  return (
    <article className={cn("px-5 py-2")}>
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
              <FaCheckCircle
                title="인증된 뱃지"
                className="h-[12px] w-[12px] text-blue-500"
              />
            )}
            <FaAngleRight className="h-3.5 w-3.5 text-gray-400" />
            <span
              className="cursor-pointer text-sm font-semibold text-gray-800 hover:underline"
              onClick={handleCategory}
            >
              {post.categoryName}
            </span>
            <span className="ml-0.5 text-sm text-gray-500">
              {formattedTime}
            </span>
          </div>

          <div className="mb-3 text-gray-900">
            <HighlightedText text={post.content} />
          </div>

          {post.images.length > 0 && (
            <div className="relative overflow-hidden rounded-md bg-black">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
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
                    <button
                      type="button"
                      className="relative block aspect-square w-full bg-black/70"
                      onClick={() => {
                        setViewerSrc(image);
                        setViewerOpen(true);
                      }}
                    >
                      <Image
                        draggable={false}
                        src={image}
                        alt={`게시물 이미지 ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 650px"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "auto"}
                      />
                    </button>
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
                <span className="text-sm font-medium">{comments.length}</span>
              </Button>
            </div>
          </div>

          {!!comments.length && <CommentList comments={comments} />}
          <CommentBox onAdd={(c) => setComments((prev) => [...prev, c])} />
        </div>
      </div>

      <ImageViewer
        open={!!viewerOpen && !!viewerSrc}
        src={viewerSrc || ""}
        alt="확대 이미지"
        onClose={() => setViewerOpen(false)}
      />
    </article>
  );
};
